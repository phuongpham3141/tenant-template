import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { queryT } from "../../../../lib/db/pg"
import { resolveTenant } from "../../../../lib/tenant/context"

type SuggestionType = "query" | "trending" | "product" | "category" | "supplier" | "did_you_mean"

interface Suggestion {
  type: SuggestionType
  label: string
  sublabel?: string
  url: string
  thumbnail?: string | null
  highlight?: string
  hits?: number
  category_id?: string | null
  supplier_id?: string | null
  product_id?: string | null
}

const MAX_PER_BUCKET = 5
const MAX_TOTAL = 12

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const q = String((req.query.q as string) ?? "").trim()
  const locale = (req.query.locale as string) ?? "vi"
  const includeProducts = req.query.include_products !== "false"
  const includeSuppliers = req.query.include_suppliers !== "false"
  const includeCategories = req.query.include_categories !== "false"

  if (q.length < 1) {
    const trending = await trendingTerms(ctx.tenantId, locale)
    return res.json({ query: q, locale, suggestions: trending, source: "trending_default" })
  }

  const prefix = q.toLowerCase()
  const pattern = `${prefix}%`
  const fuzzyPattern = `%${prefix}%`

  // Run all buckets in parallel
  const [autocompleteRows, trendingRows, productRows, categoryRows, supplierRows, didYouMeanRows] = await Promise.all([
    queryT<any>(
      ctx,
      `SELECT completion, popularity_score, click_through_rate, category_id_hint, supplier_id_hint
       FROM search.search_autocomplete_suggestion
       WHERE tenant_id = $1 AND locale = $2 AND query_prefix ILIKE $3
       ORDER BY popularity_score DESC NULLS LAST LIMIT $4`,
      [ctx.tenantId, locale, pattern, MAX_PER_BUCKET]
    ).catch(() => []),
    queryT<any>(
      ctx,
      `SELECT term, trend_score FROM search.trending_search_term
       WHERE tenant_id = $1 AND locale = $2 AND period = '24h' AND term ILIKE $3
       ORDER BY trend_score DESC LIMIT $4`,
      [ctx.tenantId, locale, fuzzyPattern, MAX_PER_BUCKET]
    ).catch(() => []),
    includeProducts ? queryT<any>(
      ctx,
      `SELECT p.id, p.sku, p.title_i18n->>$1 AS title, p.title_i18n,
              p.supplier_id, p.category_id, m.cdn_url AS thumb
       FROM catalog.product p
       LEFT JOIN LATERAL (
         SELECT cdn_url FROM media.media_asset
         WHERE owner_type = 'product' AND owner_id = p.id AND status = 'ready'
         ORDER BY created_at ASC LIMIT 1
       ) m ON TRUE
       WHERE p.deleted_at IS NULL AND p.status = 'active'
         AND (p.title_i18n->>$1 ILIKE $2 OR p.sku ILIKE $2 OR p.title_i18n::text ILIKE $2)
       ORDER BY similarity(coalesce(p.title_i18n->>$1, p.sku), $3) DESC
       LIMIT $4`,
      [locale, fuzzyPattern, q, MAX_PER_BUCKET]
    ).catch(() => []) : Promise.resolve([]),
    includeCategories ? queryT<any>(
      ctx,
      `SELECT id, slug, name_i18n->>$1 AS name, parent_category_id, depth
       FROM catalog.category
       WHERE deleted_at IS NULL AND status = 'active'
         AND (name_i18n->>$1 ILIKE $2 OR slug ILIKE $2 OR name_i18n::text ILIKE $2)
       ORDER BY depth ASC, similarity(coalesce(name_i18n->>$1, slug), $3) DESC
       LIMIT $4`,
      [locale, fuzzyPattern, q, MAX_PER_BUCKET]
    ).catch(() => []) : Promise.resolve([]),
    includeSuppliers ? queryT<any>(
      ctx,
      `SELECT id, slug, legal_name, display_name_i18n->>$1 AS display_name,
              country_code, verification_tier
       FROM identity.supplier
       WHERE deleted_at IS NULL AND status = 'active'
         AND (display_name_i18n->>$1 ILIKE $2 OR legal_name ILIKE $2 OR slug ILIKE $2 OR $3 = ANY(tags))
       ORDER BY verification_tier DESC, similarity(coalesce(display_name_i18n->>$1, legal_name), $4) DESC
       LIMIT $5`,
      [locale, fuzzyPattern, prefix, q, MAX_PER_BUCKET]
    ).catch(() => []) : Promise.resolve([]),
    queryT<any>(
      ctx,
      `SELECT suggested_query, confidence FROM search.search_did_you_mean
       WHERE tenant_id = $1 AND locale = $2 AND misspelled_input = $3
       ORDER BY confidence DESC LIMIT 1`,
      [ctx.tenantId, locale, prefix]
    ).catch(() => []),
  ])

  const suggestions: Suggestion[] = []

  // 1. Did-you-mean (highest priority)
  for (const r of didYouMeanRows) {
    suggestions.push({
      type: "did_you_mean",
      label: r.suggested_query,
      sublabel: locale === "vi" ? "Có phải bạn muốn tìm" : locale === "cn" ? "您是不是要找" : "Did you mean",
      url: `/search?q=${encodeURIComponent(r.suggested_query)}`,
    })
  }

  // 2. Curated autocomplete (popular completions)
  for (const r of autocompleteRows) {
    suggestions.push({
      type: "query",
      label: r.completion,
      url: `/search?q=${encodeURIComponent(r.completion)}`,
      hits: r.popularity_score ? Math.round(Number(r.popularity_score)) : undefined,
      category_id: r.category_id_hint,
      supplier_id: r.supplier_id_hint,
    })
  }

  // 3. Trending
  for (const r of trendingRows) {
    if (suggestions.find((s) => s.label.toLowerCase() === r.term.toLowerCase())) continue
    suggestions.push({
      type: "trending",
      label: r.term,
      url: `/search?q=${encodeURIComponent(r.term)}`,
    })
  }

  // 4. Categories
  for (const r of categoryRows) {
    suggestions.push({
      type: "category",
      label: r.name ?? r.slug,
      sublabel: locale === "vi" ? "Danh mục" : locale === "cn" ? "类别" : "Category",
      url: `/category/${r.slug}`,
      category_id: r.id,
    })
  }

  // 5. Suppliers
  for (const r of supplierRows) {
    suggestions.push({
      type: "supplier",
      label: r.display_name ?? r.legal_name,
      sublabel: `${r.country_code} · Tier ${r.verification_tier}`,
      url: `/supplier/${r.slug}`,
      supplier_id: r.id,
    })
  }

  // 6. Products
  for (const r of productRows) {
    suggestions.push({
      type: "product",
      label: r.title ?? r.sku,
      sublabel: r.sku,
      url: `/product/${r.id}`,
      thumbnail: r.thumb,
      product_id: r.id,
      category_id: r.category_id,
      supplier_id: r.supplier_id,
    })
  }

  // Log autocomplete impression (best-effort, non-blocking)
  queryT(
    ctx,
    `INSERT INTO search.search_query_log (id, tenant_id, executed_at, raw_query, processed_query, locale, hits_count, latency_ms, ai_intent_classified)
     VALUES (public.uuidv7(), $1, NOW(), $2, $3, $4, $5, 0, 'autocomplete')`,
    [ctx.tenantId, q, prefix, locale, suggestions.length]
  ).catch(() => undefined)

  return res.json({
    query: q,
    locale,
    suggestions: suggestions.slice(0, MAX_TOTAL),
    source: "live",
  })
}

async function trendingTerms(tenantId: string, locale: string): Promise<Suggestion[]> {
  const rows = await queryT<any>(
    { tenantId, bypassRls: true },
    `SELECT term FROM search.trending_search_term
     WHERE tenant_id = $1 AND locale = $2 AND period = '24h'
     ORDER BY trend_score DESC LIMIT $3`,
    [tenantId, locale, MAX_PER_BUCKET]
  ).catch(() => [])
  return rows.map((r) => ({
    type: "trending" as const,
    label: r.term,
    url: `/search?q=${encodeURIComponent(r.term)}`,
  }))
}
