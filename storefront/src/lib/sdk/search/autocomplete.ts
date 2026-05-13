import { api } from "../../api/client"

export type SuggestionType = "query" | "trending" | "product" | "category" | "supplier" | "did_you_mean"

export interface Suggestion {
  type: SuggestionType
  label: string
  sublabel?: string
  url: string
  thumbnail?: string | null
  hits?: number
  category_id?: string | null
  supplier_id?: string | null
  product_id?: string | null
}

export interface AutocompleteResponse {
  query: string
  locale: string
  suggestions: Suggestion[]
  source: "trending_default" | "live"
}

export interface TrendingTerm {
  term: string
  score: number
  change_pct: number | null
  related_category_ids: string[]
  url: string
}

export const autocompleteApi = {
  async fetch(
    q: string,
    opts: {
      locale?: "vi" | "en" | "cn"
      includeProducts?: boolean
      includeSuppliers?: boolean
      includeCategories?: boolean
      signal?: AbortSignal
    } = {}
  ): Promise<AutocompleteResponse> {
    return api<AutocompleteResponse>("/store/search/autocomplete", {
      query: {
        q,
        locale: opts.locale,
        include_products: opts.includeProducts === false ? "false" : undefined,
        include_suppliers: opts.includeSuppliers === false ? "false" : undefined,
        include_categories: opts.includeCategories === false ? "false" : undefined,
      },
      headers: opts.signal ? { /* AbortController applied via fetch options below */ } : undefined,
      cache: "no-store",
    })
  },

  async trending(opts: { locale?: "vi" | "en" | "cn"; period?: "1h" | "24h" | "7d" | "30d"; country?: string; limit?: number } = {}): Promise<{ terms: TrendingTerm[] }> {
    return api<{ terms: TrendingTerm[] }>("/store/search/trending", {
      query: { locale: opts.locale, period: opts.period, country: opts.country, limit: opts.limit },
      next: { revalidate: 120, tags: ["search:trending"] },
    })
  },

  async trackClick(input: {
    query: string
    locale?: "vi" | "en" | "cn"
    suggestionType: SuggestionType
    suggestionValue: string
    position: number
    productId?: string
    categoryId?: string
    supplierId?: string
  }): Promise<void> {
    try {
      await api<void>("/store/search/track-click", {
        method: "POST",
        body: {
          query: input.query,
          locale: input.locale,
          suggestion_type: input.suggestionType,
          suggestion_value: input.suggestionValue,
          position: input.position,
          product_id: input.productId,
          category_id: input.categoryId,
          supplier_id: input.supplierId,
        },
      })
    } catch {
      // best-effort
    }
  },
}
