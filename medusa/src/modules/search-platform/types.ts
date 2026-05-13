export interface SearchQuery {
  q?: string
  filters?: Record<string, unknown>
  facets?: string[]
  sort?: { field: string; order: "asc" | "desc" }[]
  page?: number
  perPage?: number
  locale?: "vi" | "en" | "cn"
  visualSearchVectorId?: string
}

export interface SearchHit {
  id: string
  resourceType: "product" | "supplier" | "category" | "blog"
  score: number
  snippet?: string
  highlights?: Record<string, string[]>
  document: Record<string, unknown>
}

export interface SearchResult {
  hits: SearchHit[]
  totalCount: number
  totalCountIsEstimated: boolean
  facets: Record<string, Array<{ value: string; count: number }>>
  queryId: string
  latencyMs: number
}

export interface Synonym {
  id: string
  terms: string[]
  oneWay: boolean
  locale: string
}

export interface AutocompleteEntry {
  query: string
  hits: number
  weight: number
}
