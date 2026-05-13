import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { queryT } from "../../../../lib/db/pg"
import { resolveTenant } from "../../../../lib/tenant/context"

interface TrackClickBody {
  query: string
  locale?: string
  suggestion_type: "query" | "trending" | "product" | "category" | "supplier" | "did_you_mean"
  suggestion_value: string
  position: number
  product_id?: string
  category_id?: string
  supplier_id?: string
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const body = req.body as TrackClickBody
  if (!body.query || typeof body.position !== "number") {
    return res.status(400).json({ error: "invalid_input" })
  }
  const locale = body.locale ?? "vi"

  // Update CTR on autocomplete_suggestion
  if (body.suggestion_type === "query") {
    await queryT(
      ctx,
      `UPDATE search.search_autocomplete_suggestion
       SET click_through_rate = COALESCE(click_through_rate, 0) * 0.9 + 0.1,
           last_seen_at = NOW()
       WHERE tenant_id = $1 AND locale = $2 AND completion = $3`,
      [ctx.tenantId, locale, body.suggestion_value]
    ).catch(() => undefined)
  }

  // Log impression with click context
  await queryT(
    ctx,
    `INSERT INTO search.search_query_log (
       id, tenant_id, executed_at, raw_query, processed_query, locale, hits_count,
       clicked_position, top_n_result_ids, ai_intent_classified
     ) VALUES (
       public.uuidv7(), $1, NOW(), $2, $3, $4, 1, $5, $6::uuid[], 'autocomplete_click'
     )`,
    [
      ctx.tenantId, body.query, body.suggestion_value.toLowerCase(), locale, body.position,
      [body.product_id, body.category_id, body.supplier_id].filter(Boolean),
    ]
  ).catch(() => undefined)

  return res.status(204).end()
}
