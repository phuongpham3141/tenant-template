import type { MedusaContainer } from "@medusajs/framework"
import { Queue, type ConnectionOptions } from "bullmq"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any
const BATCH_SIZE = 50
const EMBED_MODEL = "claude-sonnet-4-6+text-embed-3-small"

export default async function embedProductsBackfill(container: MedusaContainer) {
  const sys = adminContext(process.env.SYSTEM_TENANT_ID ?? "")
  const tenants = await queryT<{ id: string }>(sys, `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])

  const queue = new Queue("visual-embed", { connection: redisConn })

  let totalQueued = 0
  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const candidates = await queryT<any>(
      ctx,
      `SELECT p.id AS product_id, m.cdn_url, m.id AS asset_id
       FROM catalog.product p
       JOIN LATERAL (
         SELECT id, cdn_url FROM media.media_asset
         WHERE owner_type = 'product' AND owner_id = p.id AND status = 'ready' AND cdn_url IS NOT NULL
         ORDER BY created_at ASC LIMIT 1
       ) m ON TRUE
       WHERE p.deleted_at IS NULL AND p.status = 'active'
         AND NOT EXISTS (
           SELECT 1 FROM ai.ai_embedding_doc e
           WHERE e.scope_type = 'product' AND e.scope_id = p.id AND e.embedding_model = $1
         )
       ORDER BY p.created_at DESC
       LIMIT $2`,
      [EMBED_MODEL, BATCH_SIZE]
    ).catch(() => [])

    for (const c of candidates) {
      await queue.add(
        "embed-product",
        {
          tenantId: t.id,
          scopeType: "product",
          scopeId: c.product_id,
          imageUrl: c.cdn_url,
          imageAssetId: c.asset_id,
        },
        {
          jobId: `embed:product:${c.product_id}`,
          removeOnComplete: 1000,
          removeOnFail: 500,
          attempts: 3,
          backoff: { type: "exponential", delay: 30_000 },
        }
      ).catch(() => undefined)
      totalQueued++
    }
  }
  await queue.close()
  if (totalQueued > 0) {
    container.resolve("logger").info(`embed-products-backfill: queued=${totalQueued}`)
  }
}

export const config = {
  name: "embed-products-backfill",
  schedule: "*/30 * * * *",
}
