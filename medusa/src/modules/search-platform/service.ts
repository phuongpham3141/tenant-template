import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import type { SearchQuery, SearchResult, SearchHit, Synonym, AutocompleteEntry } from "./types"
import { IntegrationError } from "../../lib/errors"

const ES_BASE = process.env.ELASTICSEARCH_URL ?? "http://elasticsearch:9200"
const ES_USER = process.env.ELASTICSEARCH_USER
const ES_PASS = process.env.ELASTICSEARCH_PASSWORD

class SearchPlatformService extends MedusaService({}) {
  private headers() {
    const h: Record<string, string> = { "Content-Type": "application/json" }
    if (ES_USER && ES_PASS) {
      h.Authorization = "Basic " + Buffer.from(`${ES_USER}:${ES_PASS}`).toString("base64")
    }
    return h
  }

  async search(ctx: TenantContext, indexName: string, q: SearchQuery): Promise<SearchResult> {
    const startedAt = Date.now()
    const body: Record<string, unknown> = {
      from: ((q.page ?? 1) - 1) * (q.perPage ?? 20),
      size: q.perPage ?? 20,
      query: {
        bool: {
          must: q.q ? [{ multi_match: { query: q.q, fields: [`title_${q.locale ?? "vi"}^3`, "description", "supplier_name"] } }] : [{ match_all: {} }],
          filter: [{ term: { tenant_id: ctx.tenantId } }, ...this.toFilterClauses(q.filters)],
        },
      },
      sort: q.sort?.map((s) => ({ [s.field]: { order: s.order } })) ?? ["_score"],
      aggs: this.toAggs(q.facets),
      highlight: { fields: { title_en: {}, description: {} } },
      track_total_hits: false,
    }
    const res = await fetch(`${ES_BASE}/${indexName}/_search`, { method: "POST", headers: this.headers(), body: JSON.stringify(body) })
    if (!res.ok) throw new IntegrationError("elasticsearch", `${res.status} ${await res.text()}`)
    const json: any = await res.json()
    const queryId = crypto.randomUUID()
    await queryT(
      ctx,
      `INSERT INTO search.search_query_log (id, tenant_id, occurred_at, query_text, locale, result_count, search_latency_ms)
       VALUES (public.uuidv7(), $1, NOW(), $2, $3, $4, $5)`,
      [ctx.tenantId, q.q ?? "", q.locale ?? "vi", json.hits.total?.value ?? json.hits.hits.length, Date.now() - startedAt]
    ).catch(() => undefined)
    return {
      hits: json.hits.hits.map((h: any): SearchHit => ({
        id: h._id, resourceType: indexName.replace(/_.*/, "") as any,
        score: h._score, snippet: h.highlight?.description?.[0],
        highlights: h.highlight, document: h._source,
      })),
      totalCount: json.hits.total?.value ?? json.hits.hits.length,
      totalCountIsEstimated: json.hits.total?.relation === "gte",
      facets: this.fromAggs(json.aggregations),
      queryId,
      latencyMs: Date.now() - startedAt,
    }
  }

  async indexDocument(_ctx: TenantContext, indexName: string, id: string, doc: Record<string, unknown>): Promise<void> {
    const res = await fetch(`${ES_BASE}/${indexName}/_doc/${encodeURIComponent(id)}`, {
      method: "PUT", headers: this.headers(), body: JSON.stringify(doc),
    })
    if (!res.ok) throw new IntegrationError("elasticsearch", `index failed ${res.status}`)
  }

  async bulkIndex(_ctx: TenantContext, indexName: string, docs: Array<{ id: string; doc: Record<string, unknown> }>): Promise<void> {
    const body = docs.flatMap((d) => [JSON.stringify({ index: { _index: indexName, _id: d.id } }), JSON.stringify(d.doc)]).join("\n") + "\n"
    const res = await fetch(`${ES_BASE}/_bulk`, { method: "POST", headers: { ...this.headers(), "Content-Type": "application/x-ndjson" }, body })
    if (!res.ok) throw new IntegrationError("elasticsearch", `bulk failed ${res.status}`)
  }

  async autocomplete(ctx: TenantContext, prefix: string, locale = "vi", limit = 10): Promise<AutocompleteEntry[]> {
    const rows = await queryT<any>(
      ctx,
      `SELECT query_text AS query, sum(weight) AS weight, count(*) AS hits
       FROM search.autocomplete_term
       WHERE locale = $1 AND query_text ILIKE $2 AND tenant_id = $3
       GROUP BY query_text ORDER BY weight DESC LIMIT $4`,
      [locale, `${prefix}%`, ctx.tenantId, limit]
    )
    return rows.map((r) => ({ query: r.query, hits: Number(r.hits), weight: Number(r.weight) }))
  }

  async listSynonyms(ctx: TenantContext, locale = "vi"): Promise<Synonym[]> {
    const rows = await queryT<any>(ctx, `SELECT * FROM search.synonym WHERE locale = $1 AND tenant_id = $2`, [locale, ctx.tenantId])
    return rows.map((r) => ({ id: r.id, terms: r.terms ?? [], oneWay: r.one_way, locale: r.locale }))
  }

  private toFilterClauses(filters?: Record<string, unknown>) {
    if (!filters) return []
    return Object.entries(filters).map(([k, v]) => Array.isArray(v) ? { terms: { [k]: v } } : { term: { [k]: v } })
  }

  private toAggs(facets?: string[]) {
    if (!facets?.length) return undefined
    const aggs: Record<string, unknown> = {}
    for (const f of facets) aggs[f] = { terms: { field: f, size: 50 } }
    return aggs
  }

  private fromAggs(aggs: any): SearchResult["facets"] {
    const out: SearchResult["facets"] = {}
    if (!aggs) return out
    for (const [k, v] of Object.entries<any>(aggs)) {
      out[k] = (v.buckets ?? []).map((b: any) => ({ value: String(b.key), count: b.doc_count }))
    }
    return out
  }
}

export default SearchPlatformService
