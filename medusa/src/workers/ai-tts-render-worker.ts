import { Worker, type ConnectionOptions } from "bullmq"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"
import { pickTtsProvider } from "../modules/ai-livestream/providers"
import { writeLedger } from "../modules/ai-livestream/cost-ledger"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

export interface TtsJobData {
  tenantId: string
  jobId: string
  sessionId: string
  segmentId: string
  voiceProfileId: string
  locale: "vi" | "en" | "cn"
  text: string
}

export function startAiTtsRenderWorker(container: any) {
  return new Worker<TtsJobData>(
    "ai-tts-render",
    async (job) => {
      const { tenantId, jobId, sessionId, voiceProfileId, locale, text } = job.data
      const ctx = adminContext(tenantId)
      const vp = await queryT<any>(ctx, `SELECT provider, provider_voice_id FROM live.voice_profile WHERE id = $1`, [voiceProfileId])
      if (!vp[0]) throw new Error(`voice_profile not found: ${voiceProfileId}`)

      await queryT(ctx, `UPDATE live.tts_render_job SET status = 'rendering', started_at = NOW(), attempts = attempts + 1 WHERE id = $1`, [jobId])
      const provider = pickTtsProvider(vp[0].provider)
      try {
        const result = await provider.synthesize({ text, voiceId: vp[0].provider_voice_id, locale })
        await queryT(
          ctx,
          `UPDATE live.tts_render_job
           SET status = 'completed', audio_url = $1, duration_ms = $2, cost_micros = $3, completed_at = NOW()
           WHERE id = $4`,
          [result.audioUrl, result.durationMs, String(result.costMicros), jobId]
        )
        await writeLedger(ctx, {
          tenantId,
          directorSessionId: sessionId,
          resourceType: "tts",
          provider: provider.id,
          units: text.length,
          unitLabel: "chars",
          unitMicros: text.length > 0 ? result.costMicros / BigInt(text.length) : 0n,
          totalMicros: result.costMicros,
          metadata: { jobId, durationMs: result.durationMs, locale },
        })
        // Enqueue video render for this audio
        const { Queue } = await import("bullmq")
        const videoQ = new Queue("ai-video-render", { connection: redisConn })
        try {
          await videoQ.add(
            "render",
            { tenantId, ttsJobId: jobId, sessionId, audioUrl: result.audioUrl, audioDurationMs: result.durationMs, locale },
            { jobId: `video:${jobId}`, removeOnComplete: 1000, removeOnFail: 500, attempts: 2 }
          )
        } finally {
          await videoQ.close()
        }
      } catch (err: any) {
        await queryT(
          ctx,
          `UPDATE live.tts_render_job SET status = 'failed', error_message = $1, completed_at = NOW() WHERE id = $2`,
          [err.message ?? "unknown", jobId]
        )
        throw err
      }
    },
    { connection: redisConn, concurrency: Number(process.env.AI_TTS_CONCURRENCY ?? 4) }
  ).on("failed", (job, err) => container.resolve("logger").error(`ai-tts-render failed: ${err.message}`))
}
