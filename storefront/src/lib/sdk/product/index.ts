import { api } from "../../api/client"

export interface ProductCard {
  id: string
  sku: string
  title_i18n: Record<string, string>
  hero_image?: string
  base_price_minor?: string
  base_currency?: string
  moq_min: number
  moq_max?: number
  hs_code?: string
  supplier_id: string
  supplier_name?: string
  supplier_country?: string
  supplier_tier?: number
  category_id?: string
  tags?: string[]
}

export interface ProductDetail extends ProductCard {
  description_i18n: Record<string, string>
  attributes?: Record<string, unknown>
  variants?: Array<{ id: string; sku: string; price_minor: string; attributes: Record<string, unknown> }>
  customization_options?: Array<{ id: string; option_type: string; label: Record<string, string>; required: boolean; values?: Array<{ value: string; label_i18n: Record<string, string>; upcharge_minor?: string }> }>
  media?: Array<{ id: string; type: string; url: string; alt?: string }>
  bulk_pricing?: Array<{ min_qty: number; max_qty?: number; price_minor: string; currency: string }>
}

export const productApi = {
  search: (params: { q?: string; category?: string; supplier?: string; country?: string; price_min?: number; price_max?: number; sort?: string; locale?: string; page?: number; per_page?: number }) =>
    api<{ products: ProductCard[]; total: number; facets: Record<string, Array<{ value: string; count: number }>> }>("/store/products/search", { query: params }),
  get: (id: string) => api<{ product: ProductDetail }>(`/store/products/${id}`),
  related: (id: string) => api<{ products: ProductCard[] }>(`/store/products/${id}/related`),
  buyBox: (masterProductId: string, params: { quantity?: number; destination_country?: string } = {}) =>
    api<{ candidates: Array<{ product_id: string; supplier_id: string; price_minor: string; currency: string; score: number; reason_codes: string[] }> }>(`/store/master-products/${masterProductId}/buy-box`, { query: params as any }),
}
