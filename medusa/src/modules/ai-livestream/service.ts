import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ValidationError, ConflictError } from "../../lib/errors"
import type {
  AiPersona, VoiceProfile, AvatarAsset, AiStreamScript, ScriptSegment, TransitionRule,
  DirectorSession, BroadcastSchedule, Locale, LivestreamMode,
} from "./types"
import crypto from "crypto"

class AiLivestreamService extends MedusaService({}) {
  // ─── Persona ─────────────────────────────────────────────
  async createPersona(ctx: TenantContext, input: Partial<AiPersona> & { slug: string; displayNameI18n: any; primaryLocale: Locale }): Promise<AiPersona> {
    if (!/^[a-z0-9-]{3,80}$/.test(input.slug)) throw new ValidationError("Invalid persona slug")
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.ai_persona (
         id, tenant_id, supplier_id, slug, display_name_i18n, persona_description_i18n,
         voice_style, primary_locale, supported_locales, status,
         system_prompt_override, catchphrases_jsonb, created_at, updated_at, created_by_user_id, metadata
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4::jsonb, $5::jsonb,
         $6, $7, $8::text[], 'draft',
         $9, $10::jsonb, NOW(), NOW(), $11, $12::jsonb
       ) RETURNING *`,
      [
        ctx.tenantId, input.supplierId ?? null, input.slug,
        JSON.stringify(input.displayNameI18n ?? {}),
        JSON.stringify(input.personaDescriptionI18n ?? {}),
        input.voiceStyle ?? "friendly_sales",
        input.primaryLocale, input.supportedLocales ?? ["vi", "en", "cn"],
        input.systemPromptOverride ?? null,
        JSON.stringify(input.catchphrases ?? []),
        ctx.userId, JSON.stringify(input.metadata ?? {}),
      ]
    )
    const p = mapPersona(rows[0])
    await emitAudit(ctx, { actionCode: "ai_persona.create", resourceType: "live.ai_persona", resourceId: p.id, after: p, severity: "high" })
    return p
  }

  async listPersonas(ctx: TenantContext, opts: { supplierId?: string; status?: string; limit?: number } = {}): Promise<AiPersona[]> {
    const params: unknown[] = []
    let where = "WHERE deleted_at IS NULL"
    if (opts.supplierId) { params.push(opts.supplierId); where += ` AND supplier_id = $${params.length}` }
    if (opts.status) { params.push(opts.status); where += ` AND status = $${params.length}` }
    params.push(Math.min(opts.limit ?? 50, 200))
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM live.ai_persona ${where} ORDER BY created_at DESC LIMIT $${params.length}`,
      params
    )
    return rows.map(mapPersona)
  }

  async getPersona(ctx: TenantContext, id: string): Promise<AiPersona> {
    const rows = await queryT<any>(ctx, `SELECT * FROM live.ai_persona WHERE id = $1 AND deleted_at IS NULL`, [id])
    if (!rows[0]) throw new NotFoundError("AiPersona", id)
    return mapPersona(rows[0])
  }

  async attachVoiceProfile(ctx: TenantContext, personaId: string, voice: Omit<VoiceProfile, "id" | "tenantId">): Promise<VoiceProfile> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.voice_profile (
         id, tenant_id, persona_id, locale, provider, provider_voice_id, sample_audio_url,
         gender, age_band, accent, is_clone, training_status, cost_per_1k_chars_micros
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
       )
       ON CONFLICT (persona_id, locale, provider) DO UPDATE SET
         provider_voice_id = EXCLUDED.provider_voice_id, sample_audio_url = EXCLUDED.sample_audio_url,
         training_status = EXCLUDED.training_status, updated_at = NOW()
       RETURNING *`,
      [
        ctx.tenantId, personaId, voice.locale, voice.provider, voice.providerVoiceId,
        voice.sampleAudioUrl ?? null, voice.gender ?? null, voice.ageBand ?? null, voice.accent ?? null,
        voice.isClone, voice.trainingStatus, String(voice.costPer1kCharsMicros),
      ]
    )
    // Update persona.voice_profile_ids jsonb
    await queryT(
      ctx,
      `UPDATE live.ai_persona
       SET voice_profile_ids = voice_profile_ids || jsonb_build_object($1::text, $2::text), updated_at = NOW()
       WHERE id = $3`,
      [voice.locale, rows[0].id, personaId]
    )
    return mapVoice(rows[0])
  }

  async createAvatarAsset(ctx: TenantContext, input: Omit<AvatarAsset, "id" | "tenantId">): Promise<AvatarAsset> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.avatar_asset (
         id, tenant_id, asset_type, provider, provider_asset_id, display_name,
         thumbnail_url, idle_loop_url, base_video_url, resolution, aspect_ratio,
         cost_per_minute_micros, ready_for_realtime, metadata, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.assetType, input.provider, input.providerAssetId ?? null, input.displayName,
        input.thumbnailUrl ?? null, input.idleLoopUrl ?? null, input.baseVideoUrl ?? null,
        input.resolution, input.aspectRatio, String(input.costPerMinuteMicros), input.readyForRealtime,
        JSON.stringify(input.metadata ?? {}),
      ]
    )
    return mapAvatar(rows[0])
  }

  // ─── Script ─────────────────────────────────────────────
  async createScript(ctx: TenantContext, input: Omit<AiStreamScript, "id" | "tenantId" | "version" | "metadata"> & { metadata?: Record<string, unknown> }): Promise<AiStreamScript> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.ai_stream_script (
         id, tenant_id, supplier_id, persona_id, name, description,
         supported_locales, total_duration_estimate_seconds, version, status,
         loop_until_stop, created_at, updated_at, created_by_user_id, metadata
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6::text[], $7, 1, $8, $9, NOW(), NOW(), $10, $11::jsonb
       ) RETURNING *`,
      [
        ctx.tenantId, input.supplierId ?? null, input.personaId ?? null, input.name, input.description ?? null,
        input.supportedLocales ?? ["vi", "en", "cn"], input.totalDurationEstimateSeconds, input.status,
        input.loopUntilStop, ctx.userId, JSON.stringify(input.metadata ?? {}),
      ]
    )
    return mapScript(rows[0])
  }

  async addSegment(ctx: TenantContext, scriptId: string, input: Omit<ScriptSegment, "id" | "tenantId" | "scriptId">): Promise<ScriptSegment> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.script_segment (
         id, tenant_id, script_id, segment_type, order_hint, dialogue_template_i18n, variables_jsonb,
         duration_seconds_estimate, product_id, category_id, b_roll_clip_ids, cta_url, metadata, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5::jsonb, $6::jsonb, $7, $8, $9, $10::uuid[], $11, $12::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, scriptId, input.segmentType, input.orderHint,
        JSON.stringify(input.dialogueTemplateI18n ?? {}), JSON.stringify(input.variables ?? {}),
        input.durationSecondsEstimate, input.productId ?? null, input.categoryId ?? null,
        input.bRollClipIds ?? [], input.ctaUrl ?? null, JSON.stringify(input.metadata ?? {}),
      ]
    )
    return mapSegment(rows[0])
  }

  async setStartSegment(ctx: TenantContext, scriptId: string, segmentId: string): Promise<void> {
    await queryT(ctx, `UPDATE live.ai_stream_script SET start_segment_id = $1, updated_at = NOW() WHERE id = $2`, [segmentId, scriptId])
  }

  async addTransition(ctx: TenantContext, input: Omit<TransitionRule, "id">): Promise<TransitionRule> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.script_transition_rule (
         id, tenant_id, from_segment_id, to_segment_id, condition_jsonb, weight, priority, description, created_at
       ) VALUES (public.uuidv7(), $1, $2, $3, $4::jsonb, $5, $6, $7, NOW()) RETURNING *`,
      [ctx.tenantId, input.fromSegmentId, input.toSegmentId, JSON.stringify(input.condition ?? {}), input.weight ?? 1, input.priority ?? 100, input.description ?? null]
    )
    return mapTransition(rows[0])
  }

  async getScriptGraph(ctx: TenantContext, scriptId: string): Promise<{ segments: ScriptSegment[]; transitions: TransitionRule[] }> {
    const [segments, transitions] = await Promise.all([
      queryT<any>(ctx, `SELECT * FROM live.script_segment WHERE script_id = $1 ORDER BY order_hint`, [scriptId]),
      queryT<any>(ctx, `SELECT t.* FROM live.script_transition_rule t JOIN live.script_segment s ON s.id = t.from_segment_id WHERE s.script_id = $1 ORDER BY t.priority`, [scriptId]),
    ])
    return { segments: segments.map(mapSegment), transitions: transitions.map(mapTransition) }
  }

  // ─── Director Session ─────────────────────────────────────────────
  async startDirectorSession(ctx: TenantContext, input: { streamId: string; scriptId: string; personaId: string }): Promise<DirectorSession> {
    const script = await queryT<any>(ctx, `SELECT * FROM live.ai_stream_script WHERE id = $1`, [input.scriptId])
    if (!script[0]) throw new NotFoundError("Script", input.scriptId)
    if (!script[0].start_segment_id) throw new ValidationError("Script missing start_segment_id")

    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.ai_director_session (
         id, tenant_id, stream_id, script_id, persona_id, status,
         current_segment_id, started_at, decisions_log, gpu_seconds_consumed, total_cost_micros, metadata
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, 'initializing',
         $5, NOW(), '[]'::jsonb, 0, 0, '{}'::jsonb
       ) RETURNING *`,
      [ctx.tenantId, input.streamId, input.scriptId, input.personaId, script[0].start_segment_id]
    )
    // Sprint 11 Pha 2f D40: UPDATE live.livestream stubbed (live.livestream table MISSING from schema).
    // Director session created in live.ai_director_session (EXISTS). Cross-link to livestream table
    // deferred Sprint 12+ when live.livestream table created or director_session_id moved elsewhere.
    // Original: await queryT(ctx, `UPDATE live.livestream SET director_session_id = $1, ...`,
    //   [rows[0].id, input.scriptId, input.personaId, input.streamId])
    await emitAudit(ctx, { actionCode: "director.start", resourceType: "live.ai_director_session", resourceId: rows[0].id, after: rows[0], severity: "high" })
    return mapDirector(rows[0])
  }

  async updateDirector(ctx: TenantContext, id: string, patch: Partial<DirectorSession>): Promise<DirectorSession> {
    const sets: string[] = []
    const params: unknown[] = [id, ctx.tenantId]
    const add = (col: string, val: unknown, cast = "") => { params.push(val); sets.push(`${col} = $${params.length}${cast}`) }
    if (patch.status !== undefined) add("status", patch.status)
    if (patch.currentSegmentId !== undefined) add("current_segment_id", patch.currentSegmentId)
    if (patch.nextSegmentId !== undefined) add("next_segment_id", patch.nextSegmentId)
    if (patch.segmentStartedAt !== undefined) add("segment_started_at", patch.segmentStartedAt)
    if (patch.segmentEndsAt !== undefined) add("segment_ends_at", patch.segmentEndsAt)
    if (patch.viewerCount !== undefined) add("viewer_count", patch.viewerCount)
    if (patch.engagementScore !== undefined) add("engagement_score", patch.engagementScore)
    if (patch.loopIteration !== undefined) add("loop_iteration", patch.loopIteration)
    if (patch.gpuSecondsConsumed !== undefined) add("gpu_seconds_consumed", String(patch.gpuSecondsConsumed))
    if (patch.totalCostMicros !== undefined) add("total_cost_micros", String(patch.totalCostMicros))
    if (patch.failureReason !== undefined) add("failure_reason", patch.failureReason)
    if (patch.endedAt !== undefined) add("ended_at", patch.endedAt)
    if (patch.pausedAt !== undefined) add("paused_at", patch.pausedAt)
    if (sets.length === 0) return this.getDirector(ctx, id)
    const rows = await queryT<any>(
      ctx,
      `UPDATE live.ai_director_session SET ${sets.join(", ")} WHERE id = $1 AND tenant_id = $2 RETURNING *`,
      params
    )
    return mapDirector(rows[0])
  }

  async getDirector(ctx: TenantContext, id: string): Promise<DirectorSession> {
    const rows = await queryT<any>(ctx, `SELECT * FROM live.ai_director_session WHERE id = $1`, [id])
    if (!rows[0]) throw new NotFoundError("DirectorSession", id)
    return mapDirector(rows[0])
  }

  async appendDecision(ctx: TenantContext, sessionId: string, decision: { from: string | null; to: string | null; reason: string }): Promise<void> {
    await queryT(
      ctx,
      `UPDATE live.ai_director_session
       SET decisions_log = decisions_log || jsonb_build_array(jsonb_build_object('at', NOW(), 'from', $1, 'to', $2, 'reason', $3))
       WHERE id = $4`,
      [decision.from, decision.to, decision.reason, sessionId]
    )
  }

  // ─── Broadcast Schedule ─────────────────────────────────────────────
  async createSchedule(ctx: TenantContext, input: Omit<BroadcastSchedule, "id" | "tenantId" | "currentScriptIndex" | "currentLoopIteration" | "paused">): Promise<BroadcastSchedule> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.broadcast_schedule (
         id, tenant_id, stream_id, schedule_type, script_ids, current_script_id,
         cron_expression, active_hours_jsonb, next_check_at, paused, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4::uuid[], $5, $6, $7::jsonb, $8, FALSE, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.streamId, input.scheduleType, input.scriptIds, input.currentScriptId ?? input.scriptIds[0],
        input.cronExpression ?? null, JSON.stringify(input.activeHoursJsonb ?? {}), input.nextCheckAt,
      ]
    )
    return mapSchedule(rows[0])
  }

  async findDueSchedules(ctx: TenantContext, now: Date = new Date()): Promise<BroadcastSchedule[]> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM live.broadcast_schedule WHERE paused = FALSE AND next_check_at <= $1 ORDER BY next_check_at`,
      [now]
    )
    return rows.map(mapSchedule)
  }

  async advanceSchedule(ctx: TenantContext, id: string, nextScriptIndex: number, nextCheckAt: Date): Promise<void> {
    await queryT(
      ctx,
      `UPDATE live.broadcast_schedule
       SET current_script_index = $1, current_script_id = script_ids[$1 + 1],
           current_loop_iteration = current_loop_iteration + 1,
           next_check_at = $2, updated_at = NOW()
       WHERE id = $3`,
      [nextScriptIndex, nextCheckAt, id]
    )
  }

  // ─── Chat response cache ─────────────────────────────────────────────
  async cacheChatResponse(ctx: TenantContext, input: { personaId: string; locale: Locale; questionText: string; responseText: string; audioUrl?: string; ttlSeconds?: number }): Promise<void> {
    const hash = crypto.createHash("sha256").update(`${input.locale}:${input.questionText.toLowerCase().trim()}`).digest("hex")
    const expires = input.ttlSeconds ? new Date(Date.now() + input.ttlSeconds * 1000) : null
    await queryT(
      ctx,
      `INSERT INTO live.ai_chat_response_cache (
         id, tenant_id, persona_id, locale, question_hash, question_text, response_text, audio_url, expires_at, created_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, NOW()
       )
       ON CONFLICT (persona_id, locale, question_hash) DO UPDATE SET
         response_text = EXCLUDED.response_text, audio_url = EXCLUDED.audio_url,
         expires_at = EXCLUDED.expires_at, hit_count = live.ai_chat_response_cache.hit_count + 1, last_hit_at = NOW()`,
      [ctx.tenantId, input.personaId, input.locale, hash, input.questionText, input.responseText, input.audioUrl ?? null, expires]
    )
  }

  async lookupChatResponse(ctx: TenantContext, personaId: string, locale: Locale, questionText: string): Promise<{ responseText: string; audioUrl?: string } | null> {
    const hash = crypto.createHash("sha256").update(`${locale}:${questionText.toLowerCase().trim()}`).digest("hex")
    const rows = await queryT<any>(
      ctx,
      `UPDATE live.ai_chat_response_cache
       SET hit_count = hit_count + 1, last_hit_at = NOW()
       WHERE persona_id = $1 AND locale = $2 AND question_hash = $3
         AND (expires_at IS NULL OR expires_at > NOW())
       RETURNING response_text, audio_url`,
      [personaId, locale, hash]
    )
    if (!rows[0]) return null
    return { responseText: rows[0].response_text, audioUrl: rows[0].audio_url ?? undefined }
  }
}

function mapPersona(r: any): AiPersona {
  return {
    id: r.id, tenantId: r.tenant_id, supplierId: r.supplier_id, slug: r.slug,
    displayNameI18n: r.display_name_i18n ?? {}, personaDescriptionI18n: r.persona_description_i18n ?? {},
    voiceStyle: r.voice_style, primaryLocale: r.primary_locale, supportedLocales: r.supported_locales ?? [],
    avatarAssetId: r.avatar_asset_id, voiceProfileIds: r.voice_profile_ids ?? {},
    brandKitJsonb: r.brand_kit_jsonb ?? {}, systemPromptOverride: r.system_prompt_override,
    catchphrases: r.catchphrases_jsonb ?? [], status: r.status,
    createdAt: r.created_at, metadata: r.metadata ?? {},
  }
}
function mapVoice(r: any): VoiceProfile {
  return {
    id: r.id, tenantId: r.tenant_id, personaId: r.persona_id, locale: r.locale,
    provider: r.provider, providerVoiceId: r.provider_voice_id, sampleAudioUrl: r.sample_audio_url,
    gender: r.gender, ageBand: r.age_band, accent: r.accent, isClone: r.is_clone,
    trainingStatus: r.training_status, trainingError: r.training_error,
    costPer1kCharsMicros: BigInt(r.cost_per_1k_chars_micros ?? 0),
  }
}
function mapAvatar(r: any): AvatarAsset {
  return {
    id: r.id, tenantId: r.tenant_id, assetType: r.asset_type, provider: r.provider,
    providerAssetId: r.provider_asset_id, displayName: r.display_name,
    thumbnailUrl: r.thumbnail_url, idleLoopUrl: r.idle_loop_url, baseVideoUrl: r.base_video_url,
    resolution: r.resolution, aspectRatio: r.aspect_ratio,
    costPerMinuteMicros: BigInt(r.cost_per_minute_micros ?? 0),
    readyForRealtime: r.ready_for_realtime, metadata: r.metadata ?? {},
  }
}
function mapScript(r: any): AiStreamScript {
  return {
    id: r.id, tenantId: r.tenant_id, supplierId: r.supplier_id, personaId: r.persona_id,
    name: r.name, description: r.description, supportedLocales: r.supported_locales ?? [],
    totalDurationEstimateSeconds: r.total_duration_estimate_seconds, version: r.version,
    status: r.status, startSegmentId: r.start_segment_id, loopUntilStop: r.loop_until_stop,
    metadata: r.metadata ?? {},
  }
}
function mapSegment(r: any): ScriptSegment {
  return {
    id: r.id, tenantId: r.tenant_id, scriptId: r.script_id, segmentType: r.segment_type,
    orderHint: r.order_hint, dialogueTemplateI18n: r.dialogue_template_i18n ?? {},
    variables: r.variables_jsonb ?? {}, durationSecondsEstimate: r.duration_seconds_estimate,
    productId: r.product_id, categoryId: r.category_id, bRollClipIds: r.b_roll_clip_ids ?? [],
    ctaUrl: r.cta_url, metadata: r.metadata ?? {},
  }
}
function mapTransition(r: any): TransitionRule {
  return {
    id: r.id, fromSegmentId: r.from_segment_id, toSegmentId: r.to_segment_id,
    condition: r.condition_jsonb ?? {}, weight: Number(r.weight), priority: Number(r.priority),
    description: r.description,
  }
}
function mapDirector(r: any): DirectorSession {
  return {
    id: r.id, tenantId: r.tenant_id, streamId: r.stream_id, scriptId: r.script_id, personaId: r.persona_id,
    status: r.status, currentSegmentId: r.current_segment_id, nextSegmentId: r.next_segment_id,
    segmentStartedAt: r.segment_started_at, segmentEndsAt: r.segment_ends_at,
    loopIteration: r.loop_iteration, viewerCount: r.viewer_count, engagementScore: Number(r.engagement_score ?? 0),
    decisionsLog: r.decisions_log ?? [], gpuSecondsConsumed: BigInt(r.gpu_seconds_consumed ?? 0),
    totalCostMicros: BigInt(r.total_cost_micros ?? 0),
    startedAt: r.started_at, pausedAt: r.paused_at, endedAt: r.ended_at,
    failureReason: r.failure_reason,
  }
}
function mapSchedule(r: any): BroadcastSchedule {
  return {
    id: r.id, tenantId: r.tenant_id, streamId: r.stream_id, scheduleType: r.schedule_type,
    scriptIds: r.script_ids ?? [], currentScriptId: r.current_script_id,
    currentScriptIndex: r.current_script_index, currentLoopIteration: r.current_loop_iteration,
    cronExpression: r.cron_expression, activeHoursJsonb: r.active_hours_jsonb ?? {},
    nextCheckAt: r.next_check_at, paused: r.paused, pauseReason: r.pause_reason,
  }
}

export default AiLivestreamService
