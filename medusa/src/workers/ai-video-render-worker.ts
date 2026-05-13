import { Worker, type ConnectionOptions } from "bullmq"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"
import { pickAvatarProvider } from "../modules/ai-livestream/providers"
import { writeLedger } from "../modules/ai-livestream/cost-ledger"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

export interface VideoRenderJobData {
  tenantId: string
  ttsJobId: string
  sessionId: string
  audioUrl: string
  audioDurationMs: number
  locale: "vi" | "en" | "cn"
}

export function startAiVideoRenderWorker(container: any) {
  return new Worker<VideoRenderJobData>(
    "ai-video-render",
    async (job) => {
      const { tenantId, ttsJobId, sessionId, audioUrl, audioDurationMs } = job.data
      const ctx = adminContext(tenantId)

      // Look up avatar via persona via session
      const meta = await queryT<any>(
        ctx,
        `SELECT p.id AS persona_id, p.avatar_asset_id, a.provider AS avatar_provider, a.provider_asset_id, a.aspect_ratio, a.resolution
         FROM live.ai_director_session s
         JOIN live.ai_persona p ON p.id = s.persona_id
         LEFT JOIN live.avatar_asset a ON a.id = p.avatar_asset_id
         WHERE s.id = $1`,
        [sessionId]
      )
      if (!meta[0] || !meta[0].avatar_asset_id) return { skipped: "no_avatar" }

      const rows = await queryT<any>(
        ctx,
        `INSERT INTO live.video_render_job (
           id, tenant_id, director_session_id, avatar_asset_id, audio_url, audio_duration_ms,
           provider, status, queued_at, started_at
         ) VALUES (
           public.uuidv7(), $1, $2, $3, $4, $5, $6, 'rendering', NOW(), NOW()
         ) RETURNING id`,
        [tenantId, sessionId, meta[0].avatar_asset_id, audioUrl, audioDurationMs, meta[0].avatar_provider]
      )
      const videoJobId = rows[0].id

      const provider = pickAvatarProvider(meta[0].avatar_provider)
      try {
        const result = await provider.render({
          avatarAssetId: meta[0].avatar_asset_id,
          providerAssetId: meta[0].provider_asset_id,
          audioUrl,
          audioDurationMs,
          resolution: (meta[0].resolution as any) ?? "1080p",
          aspectRatio: (meta[0].aspect_ratio as any) ?? "16:9",
        })
        await queryT(
          ctx,
          `UPDATE live.video_render_job
           SET status = 'completed', video_url = $1, frame_count = $2, resolution = $3,
               cost_micros = $4, gpu_seconds = $5, completed_at = NOW()
           WHERE id = $6`,
          [result.videoUrl, result.frameCount, meta[0].resolution ?? "1080p", String(result.costMicros), result.gpuSeconds, videoJobId]
        )
        await writeLedger(ctx, {
          tenantId,
          directorSessionId: sessionId,
          personaId: meta[0].persona_id,
          resourceType: "avatar_render",
          provider: provider.id,
          units: audioDurationMs / 1000,
          unitLabel: "seconds",
          unitMicros: audioDurationMs > 0 ? (result.costMicros * 1000n) / BigInt(audioDurationMs) : 0n,
          totalMicros: result.costMicros,
          metadata: { ttsJobId, videoJobId, gpuSeconds: result.gpuSeconds },
        })
        // Notify mux worker that a new video chunk is ready
        const { Queue } = await import("bullmq")
        const muxQ = new Queue("ai-mux-feed", { connection: redisConn })
        try {
          await muxQ.add("feed", {
            tenantId, sessionId, videoUrl: result.videoUrl, audioUrl, locale: job.data.locale, durationMs: result.durationMs,
          }, { removeOnComplete: 1000, removeOnFail: 500 })
        } finally {
          await muxQ.close()
        }
        return { videoJobId }
      } catch (err: any) {
        await queryT(
          ctx,
          `UPDATE live.video_render_job SET status = 'failed', error_message = $1, completed_at = NOW() WHERE id = $2`,
          [err.message ?? "unknown", videoJobId]
        )
        throw err
      }
    },
    { connection: redisConn, concurrency: Number(process.env.AI_VIDEO_CONCURRENCY ?? 2) }
  ).on("failed", (job, err) => container.resolve("logger").error(`ai-video-render failed: ${err.message}`))
}
