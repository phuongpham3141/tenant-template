import { Queue, type ConnectionOptions } from "bullmq"
import type { TenantContext } from "../../lib/db/pg"
import { queryT } from "../../lib/db/pg"
import AiLivestreamService from "./service"
import { pickNextSegment, renderDialogueTemplate, snapshotDirectorAsGraphCtx, pickStartSegment } from "./script-graph"
import { writeLedger } from "./cost-ledger"
import type { DirectorSession, Locale, ScriptSegment } from "./types"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

export interface DirectorTickOpts {
  ctx: TenantContext
  service: AiLivestreamService
  sessionId: string
}

/**
 * One tick of the director state machine.
 * - If no current segment: pick start
 * - If current segment elapsed: pick next via graph
 * - For each transition: dispatch TTS + video render jobs per locale
 * - Update session state + append decision log
 */
export async function tickDirector(opts: DirectorTickOpts): Promise<{ action: string; nextSegmentId: string | null }> {
  const { ctx, service, sessionId } = opts
  const session = await service.getDirector(ctx, sessionId)

  if (session.status === "ended" || session.status === "failed" || session.status === "quota_paused") {
    return { action: "noop_terminal", nextSegmentId: null }
  }
  if (session.status === "paused") return { action: "noop_paused", nextSegmentId: null }

  const persona = await service.getPersona(ctx, session.personaId)
  const { segments, transitions } = await service.getScriptGraph(ctx, session.scriptId)
  if (segments.length === 0) {
    await service.updateDirector(ctx, sessionId, { status: "failed", failureReason: "empty_script", endedAt: new Date() })
    return { action: "failed_empty", nextSegmentId: null }
  }

  const now = new Date()
  let currentSegmentId = session.currentSegmentId
  if (!currentSegmentId || session.status === "initializing") {
    const start = pickStartSegment(segments, segments.find((s) => true)?.scriptId ? null : null)
      ?? pickStartSegment(segments, session.currentSegmentId ?? null)
    if (!start) {
      await service.updateDirector(ctx, sessionId, { status: "failed", failureReason: "no_start_segment" })
      return { action: "failed_nostart", nextSegmentId: null }
    }
    await beginSegment(ctx, service, session, start, persona.supportedLocales)
    return { action: "started", nextSegmentId: start.id }
  }

  if (session.segmentEndsAt && session.segmentEndsAt > now) {
    return { action: "in_progress", nextSegmentId: currentSegmentId }
  }

  const graphCtx = snapshotDirectorAsGraphCtx(session, true)
  const { nextSegmentId, reason } = pickNextSegment(currentSegmentId, transitions, graphCtx)

  if (!nextSegmentId) {
    // Loop or end?
    const script = await queryT<any>(ctx, `SELECT loop_until_stop, start_segment_id FROM live.ai_stream_script WHERE id = $1`, [session.scriptId])
    if (script[0]?.loop_until_stop && script[0]?.start_segment_id) {
      const startSeg = segments.find((s) => s.id === script[0].start_segment_id)
      if (startSeg) {
        await service.appendDecision(ctx, sessionId, { from: currentSegmentId, to: startSeg.id, reason: `loop_iteration_${session.loopIteration + 1}` })
        await service.updateDirector(ctx, sessionId, { loopIteration: session.loopIteration + 1 })
        await beginSegment(ctx, service, session, startSeg, persona.supportedLocales)
        return { action: "looped", nextSegmentId: startSeg.id }
      }
    }
    await service.updateDirector(ctx, sessionId, { status: "ended", endedAt: now })
    await service.appendDecision(ctx, sessionId, { from: currentSegmentId, to: null, reason: "no_next_and_no_loop" })
    return { action: "ended", nextSegmentId: null }
  }

  const next = segments.find((s) => s.id === nextSegmentId)
  if (!next) {
    await service.updateDirector(ctx, sessionId, { status: "failed", failureReason: "next_segment_not_found" })
    return { action: "failed_lookup", nextSegmentId: null }
  }
  await service.appendDecision(ctx, sessionId, { from: currentSegmentId, to: next.id, reason })
  await beginSegment(ctx, service, session, next, persona.supportedLocales)
  return { action: "advanced", nextSegmentId: next.id }
}

async function beginSegment(
  ctx: TenantContext,
  service: AiLivestreamService,
  session: DirectorSession,
  segment: ScriptSegment,
  supportedLocales: Locale[]
): Promise<void> {
  const startedAt = new Date()
  const endsAt = new Date(startedAt.getTime() + segment.durationSecondsEstimate * 1000)
  await service.updateDirector(ctx, session.id, {
    status: "running",
    currentSegmentId: segment.id,
    segmentStartedAt: startedAt,
    segmentEndsAt: endsAt,
  })

  // Dispatch TTS render jobs per locale
  const ttsQ = new Queue("ai-tts-render", { connection: redisConn })
  const persona = await service.getPersona(ctx, session.personaId)

  try {
    for (const locale of supportedLocales) {
      const template = (segment.dialogueTemplateI18n as any)[locale] ?? (segment.dialogueTemplateI18n as any)[persona.primaryLocale] ?? ""
      if (!template) continue
      const text = renderDialogueTemplate(template, segment.variables ?? {})
      const voiceId = (persona.voiceProfileIds as any)[locale]
      if (!voiceId) continue

      const job = await queryT<any>(
        ctx,
        `INSERT INTO live.tts_render_job (
           id, tenant_id, director_session_id, segment_id, voice_profile_id, locale, provider, text, status, queued_at
         ) SELECT public.uuidv7(), $1, $2, $3, vp.id, $4, vp.provider, $5, 'queued', NOW()
         FROM live.voice_profile vp WHERE vp.id = $6
         RETURNING id`,
        [ctx.tenantId, session.id, segment.id, locale, text, voiceId]
      )
      if (job[0]) {
        await ttsQ.add(
          "render",
          { tenantId: ctx.tenantId, jobId: job[0].id, sessionId: session.id, segmentId: segment.id, voiceProfileId: voiceId, locale, text },
          { jobId: `tts:${job[0].id}`, removeOnComplete: 1000, removeOnFail: 500, attempts: 3, backoff: { type: "exponential", delay: 5_000 } }
        )
      }
    }
  } finally {
    await ttsQ.close()
  }
}

export async function recordSegmentCompute(
  ctx: TenantContext,
  service: AiLivestreamService,
  sessionId: string,
  costMicros: bigint,
  gpuSeconds: number
): Promise<void> {
  const cur = await service.getDirector(ctx, sessionId)
  await service.updateDirector(ctx, sessionId, {
    totalCostMicros: cur.totalCostMicros + costMicros,
    gpuSecondsConsumed: cur.gpuSecondsConsumed + BigInt(gpuSeconds),
  })
}
