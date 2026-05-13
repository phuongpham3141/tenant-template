import { api } from "../../api/client"

export interface SupplierCard {
  id: string
  slug: string
  legal_name: string
  display_name_i18n: Record<string, string>
  country_code: string
  verification_tier: number
  year_established?: number
  primary_industry_code?: string
  logo_url?: string
  cover_url?: string
  tags?: string[]
}

export interface SupplierDetail extends SupplierCard {
  description_i18n?: Record<string, string>
  employee_count?: number
  annual_revenue_usd_minor?: string
  export_ratio_pct?: number
  certifications?: string[]
  operation_mode: "direct" | "intermediary"
  can_sell_wholesale: boolean
  can_sell_retail: boolean
  can_act_as_agent: boolean
  factory_tour_url?: string
  recent_orders_count?: number
  total_response_time_hours?: number
}

export const supplierApi = {
  list: (params: { q?: string; country?: string; industry?: string; tier_min?: number; limit?: number; offset?: number } = {}) =>
    api<{ suppliers: SupplierCard[]; total: number }>("/store/suppliers", { query: params }),
  get: (id: string) => api<{ supplier: SupplierDetail }>(`/store/suppliers/${id}`),
  getBySlug: (slug: string) => api<{ supplier: SupplierDetail }>(`/store/suppliers/by-slug/${slug}`),
  follow: (supplierId: string) => api(`/store/suppliers/${supplierId}/follow`, { method: "POST" }),
  unfollow: (supplierId: string) => api(`/store/suppliers/${supplierId}/follow`, { method: "DELETE" }),
}
