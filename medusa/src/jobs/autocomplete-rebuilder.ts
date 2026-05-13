import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

const PREFIX_LENGTHS = [1, 2, 3, 4, 5, 6, 8, 10]
const TOP_PER_PREFIX = 5
const MIN_COUNT = 3

export default async function autocompleteRebuilder(container: MedusaContainer) {
  const sysCtx = adminContext(process.env.SYSTEM_TENANT_ID ?? "")
  const tenants = await queryT<{ id: string }>(sysCtx, `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])

  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const locales = ["vi", "en", "cn"]
    let inserted = 0
    for (const locale of locales) {
      // Top queries from last 7 days with hits > 0
      const topQueries = await queryT<any>(
        ctx,
        `SELECT processed_query AS q,
                COUNT(*)::bigint AS cnt,
                AVG(NULLIF(hits_count, 0))::numeric AS avg_hits,
                AVG(CASE WHEN clicked_position IS NOT NULL THEN 1 ELSE 0 END)::numeric AS ctr
         FROM search.search_query_log
         WHERE locale = $1
           AND executed_at > NOW() - INTERVAL '7 days'
           AND processed_query IS NOT NULL
           AND length(processed_query) >= 2
           AND ai_intent_classified NOT IN ('autocomplete', 'autocomplete_click', 'visual_search', 'visual_search_upload')
         GROUP BY processed_query
         HAVING COUNT(*) >= $2
         ORDER BY COUNT(*) DESC
         LIMIT 5000`,
        [locale, MIN_COUNT]
      ).catch(() => [])

      if (topQueries.length === 0) continue

      // Truncate stale curated entries for this locale (keep manually added ones via category_id_hint NOT NULL)
      await queryT(
        ctx,
        `DELETE FROM search.search_autocomplete_suggestion
         WHERE tenant_id = $1 AND locale = $2 AND category_id_hint IS NULL AND supplier_id_hint IS NULL`,
        [t.id, locale]
      ).catch(() => undefined)

      const bucket = new Map<string, { entries: Array<{ q: string; score: number; ctr: number }>; }>()
      for (const r of topQueries) {
        const q = String(r.q).trim().toLowerCase()
        const score = Math.log(Number(r.cnt) + 1) * (1 + Number(r.ctr ?? 0)) * Math.log(Number(r.avg_hits ?? 1) + 2)
        for (const len of PREFIX_LENGTHS) {
          if (q.length < len) continue
          const prefix = q.slice(0, len)
          const arr = bucket.get(prefix) ?? { entries: [] }
          arr.entries.push({ q, score, ctr: Number(r.ctr ?? 0) })
          bucket.set(prefix, arr)
        }
      }

      for (const [prefix, { entries }] of bucket) {
        entries.sort((a, b) => b.score - a.score)
        const top = entries.slice(0, TOP_PER_PREFIX)
        for (const e of top) {
          await queryT(
            ctx,
            `INSERT INTO search.search_autocomplete_suggestion (
               id, tenant_id, query_prefix, completion, popularity_score, locale, last_seen_at, click_through_rate
             ) VALUES (public.uuidv7(), $1, $2, $3, $4, $5, NOW(), $6)
             ON CONFLICT DO NOTHING`,
            [t.id, prefix, e.q, e.score, locale, e.ctr]
          ).catch(() => undefined)
          inserted++
        }
      }
    }

    if (inserted > 0) {
      container.resolve("logger").info(`autocomplete-rebuilder: tenant=${t.id} inserted=${inserted}`)
    }
  }
}

export const config = {
  name: "autocomplete-rebuilder",
  schedule: "0 * * * *",
}
