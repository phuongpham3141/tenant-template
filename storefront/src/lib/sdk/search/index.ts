import { api } from "../../api/client"

export interface SearchResult {
  hits: Array<{
    id: string
    resource_type: string
    score: number
    snippet?: string
    document: Record<string, unknown>
  }>
  total_count: number
  facets: Record<string, Array<{ value: string; count: number }>>
  query_id: string
  latency_ms: number
}

export const searchApi = {
  search: (params: { q?: string; type?: "product" | "supplier" | "blog"; locale?: string; filters?: Record<string, unknown>; sort?: Array<{ field: string; order: "asc" | "desc" }>; page?: number; per_page?: number }) =>
    api<SearchResult>("/store/search", { method: "POST", body: params }),
  autocomplete: (prefix: string, locale: "vi" | "en" | "cn" = "vi", limit = 10) =>
    api<{ entries: Array<{ query: string; hits: number }> }>("/store/search/autocomplete", { query: { q: prefix, locale, limit } }),
}
