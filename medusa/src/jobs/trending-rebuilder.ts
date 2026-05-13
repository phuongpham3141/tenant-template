import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

const PERIODS: Array<{ code: "1h" | "24h" | "7d" | "30d"; interval: string; priorInterval: string; limit: number }> = [
  { code: "1h", interval: "1 hour", priorInterval: "2 hours", limit: 30 },
  { code: "24h", interval: "24 hours", priorInterval: "48 hours", limit: 50 },
  { code: "7d", interval: "7 days", priorInterval: "14 days", limit: 100 },
  { code: "30d", interval: "30 days", priorInterval: "60 days", limit: 200 },
]

export default async function trendingRebuilder(container: MedusaContainer) {
  const sys = adminContext(process.env.SYSTEM_TENANT_ID ?? "")
  const tenants = await queryT<{ id: string }>(sys, `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])

  for (const t of tenants) {
    const ctx = adminContext(t.id)
    for (const locale of ["vi", "en", "cn"]) {
      for (const p of PERIODS) {
        const current = await queryT<any>(
          ctx,
          `SELECT processed_query AS term, COUNT(*)::bigint AS cnt
           FROM search.search_query_log
           WHERE locale = $1
             AND executed_at > NOW() - ($2 || '')::interval
             AND processed_query IS NOT NULL AND length(processed_query) >= 2
             AND ai_intent_classified NOT IN ('autocomplete', 'autocomplete_click', 'visual_search', 'visual_search_upload')
           GROUP BY processed_query
           ORDER BY cnt DESC
           LIMIT $3`,
          [locale, p.interval, p.limit]
        ).catch(() => [])

        if (current.length === 0) continue

        const priorRows = await queryT<any>(
          ctx,
          `SELECT processed_query AS term, COUNT(*)::bigint AS cnt
           FROM search.search_query_log
           WHERE locale = $1
             AND executed_at > NOW() - ($2 || '')::interval
             AND executed_at <= NOW() - ($3 || '')::interval
             AND processed_query = ANY($4::text[])`,
          [locale, p.priorInterval, p.interval, current.map((r) => r.term)]
        ).catch(() => [])
        const priorMap = new Map<string, number>(priorRows.map((r) => [r.term, Number(r.cnt)]))

        // Wipe and rewrite this (tenant, locale, period) bucket
        await queryT(
          ctx,
          `DELETE FROM search.trending_search_term WHERE tenant_id = $1 AND locale = $2 AND period = $3 AND (geo_country IS NULL OR geo_country = '')`,
          [t.id, locale, p.code]
        ).catch(() => undefined)

        for (const r of current) {
          const cur = Number(r.cnt)
          const prior = priorMap.get(r.term) ?? 0
          const change_pct = prior > 0 ? ((cur - prior) / prior) * 100 : 100
          const score = Math.log(cur + 1) * (1 + Math.max(change_pct, 0) / 100)
          await queryT(
            ctx,
            `INSERT INTO search.trending_search_term (
               id, tenant_id, term, locale, period, trend_score, change_pct_vs_prior, geo_country, last_computed_at
             ) VALUES (
               public.uuidv7(), $1, $2, $3, $4, $5, $6, NULL, NOW()
             )
             ON CONFLICT (tenant_id, term, locale, period, geo_country) DO UPDATE
             SET trend_score = EXCLUDED.trend_score, change_pct_vs_prior = EXCLUDED.change_pct_vs_prior, last_computed_at = NOW()`,
            [t.id, r.term, locale, p.code, score, change_pct]
          ).catch(() => undefined)
        }
      }
    }
  }
  container.resolve("logger").info(`trending-rebuilder: completed for ${tenants.length} tenants`)
}

export const config = {
  name: "trending-rebuilder",
  schedule: "*/15 * * * *",
}
