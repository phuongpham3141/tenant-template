import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { queryT } from "../../../../lib/db/pg"
import { resolveTenant } from "../../../../lib/tenant/context"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const locale = (req.query.locale as string) ?? "vi"
  const period = (req.query.period as string) ?? "24h"
  const geo = (req.query.country as string) ?? null
  const limit = Math.min(Number(req.query.limit ?? 20), 50)

  if (!["1h", "24h", "7d", "30d"].includes(period)) {
    return res.status(400).json({ error: "invalid_period" })
  }

  const params: unknown[] = [ctx.tenantId, locale, period]
  let where = `WHERE tenant_id = $1 AND locale = $2 AND period = $3`
  if (geo) { params.push(geo); where += ` AND (geo_country = $${params.length} OR geo_country IS NULL)` }
  params.push(limit)

  const rows = await queryT<any>(
    ctx,
    `SELECT term, trend_score, change_pct_vs_prior, related_category_ids
     FROM search.trending_search_term ${where}
     ORDER BY trend_score DESC LIMIT $${params.length}`,
    params
  ).catch(() => [])

  return res.json({
    locale, period,
    terms: rows.map((r) => ({
      term: r.term,
      score: Number(r.trend_score ?? 0),
      change_pct: r.change_pct_vs_prior ? Number(r.change_pct_vs_prior) : null,
      related_category_ids: r.related_category_ids ?? [],
      url: `/search?q=${encodeURIComponent(r.term)}`,
    })),
  })
}
