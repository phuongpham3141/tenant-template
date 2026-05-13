import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { queryT } from "../../../../lib/db/pg"
import { resolveTenant } from "../../../../lib/tenant/context"
import { analyzeAndEmbed } from "../../../../lib/ai/vision"
import { searchSimilar } from "../../../../lib/search/embeddings"
import { AppError } from "../../../../lib/errors"

interface VisualSearchBody {
  image_url?: string
  image_base64?: string
  locale?: string
  limit?: number
  filter_category_id?: string
  filter_supplier_country?: string
  exclude_supplier_id?: string
}

const RATE_LIMIT_PER_MINUTE = 10

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const body = req.body as VisualSearchBody
  const locale = body.locale ?? "vi"

  if (!body.image_url && !body.image_base64) {
    return res.status(400).json({ error: "image_required", message: "Provide image_url or image_base64" })
  }
  const limit = Math.min(body.limit ?? 24, 60)

  if (ctx.userId) {
    const rl = await queryT<{ count: number }>(
      ctx,
      `SELECT COUNT(*)::int AS count FROM search.search_query_log
       WHERE user_id = $1 AND ai_intent_classified = 'visual_search'
         AND executed_at > NOW() - INTERVAL '1 minute'`,
      [ctx.userId]
    ).catch(() => [{ count: 0 }])
    if (Number(rl[0]?.count ?? 0) >= RATE_LIMIT_PER_MINUTE) {
      return res.status(429).json({ error: "rate_limited", message: `Max ${RATE_LIMIT_PER_MINUTE}/min` })
    }
  }

  const t0 = Date.now()
  let imageUrl = body.image_url
  if (!imageUrl && body.image_base64) {
    imageUrl = body.image_base64.startsWith("data:") ? body.image_base64 : `data:image/jpeg;base64,${body.image_base64}`
  }

  let analysis, embedding
  try {
    const result = await analyzeAndEmbed({ imageUrl: imageUrl! })
    analysis = result.analysis
    embedding = result.embedding
  } catch (err: any) {
    if (err instanceof AppError) throw err
    return res.status(502).json({ error: "ai_vision_failed", message: err.message })
  }

  const matches = await searchSimilar(ctx, {
    queryEmbedding: embedding,
    scopeType: "product",
    limit: limit * 2,
    minSimilarity: 0.5,
  })

  if (matches.length === 0) {
    await logVisualSearch(ctx, body, locale, analysis, 0, Date.now() - t0)
    return res.json({ analysis, hits: [], total: 0, latency_ms: Date.now() - t0 })
  }

  const productIds = matches.map((m) => m.resource_id)
  const productParams: unknown[] = [productIds, locale]
  let productWhere = `WHERE p.id = ANY($1::uuid[]) AND p.deleted_at IS NULL AND p.status = 'active'`
  if (body.filter_category_id) {
    productParams.push(body.filter_category_id)
    productWhere += ` AND p.category_id = $${productParams.length}`
  }
  if (body.exclude_supplier_id) {
    productParams.push(body.exclude_supplier_id)
    productWhere += ` AND p.supplier_id <> $${productParams.length}`
  }

  const products = await queryT<any>(
    ctx,
    `SELECT p.id, p.sku, p.supplier_id, p.category_id,
            p.title_i18n->>$2 AS title, p.title_i18n,
            p.base_price_minor, p.base_currency,
            s.legal_name AS supplier_name, s.country_code AS supplier_country, s.verification_tier,
            m.cdn_url AS thumbnail
     FROM catalog.product p
     JOIN identity.supplier s ON s.id = p.supplier_id
     LEFT JOIN LATERAL (
       SELECT cdn_url FROM media.media_asset
       WHERE owner_type = 'product' AND owner_id = p.id AND status = 'ready'
       ORDER BY created_at ASC LIMIT 1
     ) m ON TRUE
     ${productWhere}`,
    productParams
  )

  const productById = new Map(products.map((p) => [p.id, p]))
  const hits = matches
    .map((m) => {
      const p = productById.get(m.resource_id)
      if (!p) return null
      if (body.filter_supplier_country && p.supplier_country !== body.filter_supplier_country) return null
      return {
        product_id: p.id,
        sku: p.sku,
        title: p.title ?? p.sku,
        title_i18n: p.title_i18n,
        supplier_id: p.supplier_id,
        supplier_name: p.supplier_name,
        supplier_country: p.supplier_country,
        verification_tier: p.verification_tier,
        category_id: p.category_id,
        base_price_minor: p.base_price_minor,
        base_currency: p.base_currency,
        thumbnail: p.thumbnail,
        match_score: m.similarity,
        url: `/product/${p.id}`,
      }
    })
    .filter(Boolean)
    .slice(0, limit)

  await logVisualSearch(ctx, body, locale, analysis, hits.length, Date.now() - t0)

  return res.json({
    analysis,
    hits,
    total: hits.length,
    latency_ms: Date.now() - t0,
  })
}

async function logVisualSearch(
  ctx: { tenantId: string; userId?: string | null },
  body: VisualSearchBody,
  locale: string,
  analysis: any,
  hitsCount: number,
  latencyMs: number
): Promise<void> {
  await queryT(
    ctx as any,
    `INSERT INTO search.search_query_log (
       id, tenant_id, executed_at, user_id, raw_query, processed_query, locale,
       hits_count, latency_ms, ai_intent_classified, filters_applied_jsonb
     ) VALUES (
       public.uuidv7(), $1, NOW(), $2, $3, $4, $5, $6, $7, 'visual_search', $8::jsonb
     )`,
    [
      ctx.tenantId, ctx.userId ?? null,
      analysis?.category ?? "[visual search]",
      analysis?.text_for_embedding?.slice(0, 500) ?? "",
      locale, hitsCount, latencyMs,
      JSON.stringify({ colors: analysis?.colors, material: analysis?.material, filter_category_id: body.filter_category_id }),
    ]
  ).catch(() => undefined)
}
