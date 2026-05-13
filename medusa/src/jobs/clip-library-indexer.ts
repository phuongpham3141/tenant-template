import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"
import { analyzeImage, embedText } from "../lib/ai/vision"
import { upsertEmbedding } from "../lib/search/embeddings"

const BATCH_SIZE = 30
const EMBED_MODEL = "claude-sonnet-4-6+text-embed-3-small"

export default async function clipLibraryIndexer(container: MedusaContainer) {
  const sys = adminContext(process.env.SYSTEM_TENANT_ID ?? "")
  const tenants = await queryT<{ id: string }>(sys, `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])

  let totalProcessed = 0
  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const clips = await queryT<any>(
      ctx,
      `SELECT id, thumbnail_url, clip_url, use_case, tags
       FROM live.asset_clip_library
       WHERE deleted_at IS NULL AND embedding_doc_id IS NULL AND thumbnail_url IS NOT NULL
       ORDER BY created_at DESC LIMIT $1`,
      [BATCH_SIZE]
    ).catch(() => [])

    for (const clip of clips) {
      try {
        const analysis = await analyzeImage({ imageUrl: clip.thumbnail_url })
        const enrichedText = `${analysis.text_for_embedding} use_case:${clip.use_case ?? ""} tags:${(clip.tags ?? []).join(",")}`
        const embedding = await embedText(enrichedText)
        await upsertEmbedding(ctx, {
          scopeType: "live_clip",
          scopeId: clip.id,
          embedding,
          model: EMBED_MODEL,
          metadata: { analysis, use_case: clip.use_case, tags: clip.tags },
        })
        await queryT(
          ctx,
          `UPDATE live.asset_clip_library SET embedding_doc_id = (
             SELECT id FROM ai.ai_embedding_doc
             WHERE scope_type = 'live_clip' AND scope_id = $1 AND embedding_model = $2
             ORDER BY updated_at DESC LIMIT 1
           ), updated_at = NOW() WHERE id = $1`,
          [clip.id, EMBED_MODEL]
        ).catch(() => undefined)
        totalProcessed++
      } catch (err) {
        container.resolve("logger").warn(`clip-indexer failed clip=${clip.id}: ${(err as any).message}`)
      }
    }
  }
  if (totalProcessed > 0) container.resolve("logger").info(`clip-library-indexer: processed=${totalProcessed}`)
}

export const config = {
  name: "clip-library-indexer",
  schedule: "*/20 * * * *",
}
