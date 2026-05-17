/**
 * RFQs SDK client — fetch GET /store/rfqs
 * Match Pha 1d-a v2 types (i18n + snake_case + dual-currency).
 *
 * NEW SDK (plural) — KHÔNG conflict với SDK cũ `../rfq` (singular)
 * dùng broken Sprint 1 R20 types. Pha 1d-b sẽ thay thế hoàn toàn.
 */

import { api } from "../../api/client"

// Status enums match schema CHECK constraint (L19)
export type RfqStatus =
  | "draft"
  | "published"
  | "quoting"
  | "awarded"
  | "converted"
  | "closed"
  | "expired"
  | "cancelled"

export type RfqUrgency = "normal" | "fast" | "urgent" | "immediate"

export type RfqVisibility = "public" | "targeted" | "invitation_only" | "private"

export interface Rfq {
  id: string
  tenant_id: string
  code: string
  buyer_id: string
  title_i18n: Record<string, string>
  description_i18n: Record<string, string>
  category_id?: string
  target_quantity: number
  unit_code: string
  desired_port?: string
  // BigInt fields serialized as string từ API (JSON safe)
  budget_min_usd_minor?: string
  budget_max_usd_minor?: string
  visibility: RfqVisibility
  urgency: RfqUrgency
  secured_trading_required: boolean
  status: RfqStatus
  expires_at: string
  published_at?: string
  awarded_at?: string
  closed_at?: string
  created_at: string
  updated_at: string
}

export interface ListRfqsResponse {
  rfqs: Rfq[]
  count: number
  limit: number
  offset: number
}

export interface RetrieveRfqResponse {
  rfq: Rfq
}

export const rfqsApi = {
  list: (params: { status?: RfqStatus; limit?: number; offset?: number } = {}) =>
    api<ListRfqsResponse>("/store/rfqs", { query: params }),

  get: (id: string) => api<RetrieveRfqResponse>(`/store/rfqs/${id}`),
}
