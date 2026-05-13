import { Worker, type ConnectionOptions } from "bullmq"
import { analyzeAndEmbed } from "../lib/ai/vision"
import { upsertEmbedding } from "../lib/search/embeddings"
import { adminContext } from "../lib/tenant/context"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

export interface VisualEmbedJob {
  tenantId: string
  scopeType: "product" | "supplier" | "media_asset"
  scopeId: string
  imageUrl: string
  imageAssetId?: string
}

export function startVisualEmbedWorker(container: any) {
  return new Worker<VisualEmbedJob>(
    "visual-embed",
    async (job) => {
      const { tenantId, scopeType, scopeId, imageUrl, imageAssetId } = job.data
      const ctx = adminContext(tenantId)
      const { analysis, embedding } = await analyzeAndEmbed({ imageUrl })
      await upsertEmbedding(ctx, {
        scopeType,
        scopeId,
        embedding,
        model: "claude-sonnet-4-6+text-embed-3-small",
        metadata: {
          source: "visual_embed_worker",
          image_asset_id: imageAssetId,
          analysis,
          generated_at: new Date().toISOString(),
        },
      })
      return { ok: true, dim: embedding.length, category: analysis.category }
    },
    { connection: redisConn, concurrency: Number(process.env.VISUAL_EMBED_CONCURRENCY ?? 2) }
  ).on("failed", (job, err) => {
    container.resolve("logger").error(`visual-embed failed (${job?.id}): ${err.message}`)
  })
}
