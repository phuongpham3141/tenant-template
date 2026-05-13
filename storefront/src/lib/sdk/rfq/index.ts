import { api } from "../../api/client"

export interface RfqSummary {
  id: string
  rfq_number: string
  title_i18n: Record<string, string>
  target_quantity: number
  target_unit_code: string
  destination_country: string
  status: string
  expires_at: string
  created_at: string
}

export interface RfqDetail extends RfqSummary {
  description_i18n: Record<string, string>
  category_id?: string
  budget_minor?: string
  budget_currency?: string
  invite_mode: "open" | "invited_only" | "hybrid"
  attachments?: string[]
  quotes?: Array<{
    id: string
    quote_number: string
    supplier_id: string
    price_per_unit_minor: string
    currency: string
    total_price_minor: string
    payment_terms: string
    shipping_terms: string
    lead_time_days: number
    valid_until: string
    status: string
  }>
}

export interface CreateRfqRequest {
  title: Record<string, string>
  description: Record<string, string>
  category_id?: string
  target_quantity: number
  target_unit_code: string
  destination_country: string
  desired_delivery_date?: string
  budget_minor?: number
  budget_currency?: string
  invite_mode?: "open" | "invited_only" | "hybrid"
  invited_supplier_ids?: string[]
}

export const rfqApi = {
  list: (params: { status?: string; limit?: number; offset?: number } = {}) =>
    api<{ rfqs: RfqSummary[]; total: number }>("/store/rfqs", { query: params }),
  get: (id: string) => api<{ rfq: RfqDetail }>(`/store/rfqs/${id}`),
  create: (input: CreateRfqRequest) =>
    api<{ rfq: RfqDetail }>("/store/rfqs", { method: "POST", body: input }),
  submitQuote: (rfqId: string, input: { price_per_unit_minor: number; currency: string; payment_terms: string; shipping_terms: string; lead_time_days: number; valid_until: string; notes?: string }) =>
    api<{ quote: any }>(`/store/rfqs/${rfqId}/quotes`, { method: "POST", body: input }),
  acceptQuote: (quoteId: string) =>
    api<{ quote: any }>(`/store/quotes/${quoteId}/accept`, { method: "POST" }),
  counterOffer: (quoteId: string, input: { price_per_unit_minor: number; currency: string; payment_terms: string; shipping_terms: string; lead_time_days: number; valid_until: string; notes?: string }) =>
    api<{ quote: any }>(`/store/quotes/${quoteId}/counter`, { method: "POST", body: input }),
}
