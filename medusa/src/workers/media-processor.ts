import { Worker, type ConnectionOptions } from "bullmq"
import { MEDIA_LAYER_MODULE } from "../modules/media-layer"
import type MediaLayerService from "../modules/media-layer/service"
import { adminContext } from "../lib/tenant/context"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

export function startMediaProcessorWorker(container: any) {
  const svc = container.resolve<MediaLayerService>(MEDIA_LAYER_MODULE)
  return new Worker(
    "media-processing",
    async (job) => {
      const { tenantId, jobId, mediaAssetId, jobType } = job.data as { tenantId: string; jobId: string; mediaAssetId: string; jobType: string }
      const ctx = adminContext(tenantId)
      try {
        // In real impl: shell out to ffmpeg / call AI service / generate spin viewer.
        await new Promise((r) => setTimeout(r, 100))
        await svc.markJobCompleted(ctx, jobId, [mediaAssetId])
      } catch (err: any) {
        await svc.markJobFailed(ctx, jobId, err.message ?? "unknown_error")
        throw err
      }
    },
    { connection: redisConn, concurrency: 4 }
  )
}
