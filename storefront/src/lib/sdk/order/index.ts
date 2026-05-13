import { api } from "../../api/client"

export interface OrderSummary {
  id: string
  order_number: string
  status: string
  payment_status: string
  fulfillment_status: string
  total_minor: string
  currency: string
  created_at: string
  supplier_id?: string
  supplier_name?: string
}

export interface OrderDetail extends OrderSummary {
  items: Array<{ id: string; sku: string; title: string; quantity: number; unit_price_minor: string; total_minor: string }>
  shipping_address: any
  billing_address: any
  shipments?: Array<{ id: string; carrier: string; tracking_number?: string; status: string }>
  escrow?: { id: string; status: string; released_minor: string; total_minor: string; milestones: any[] }
}

export const orderApi = {
  list: (params: { status?: string; limit?: number; offset?: number } = {}) =>
    api<{ orders: OrderSummary[]; total: number }>("/store/orders", { query: params }),
  get: (id: string) => api<{ order: OrderDetail }>(`/store/orders/${id}`),
  cancel: (id: string, reason: string) =>
    api<{ order: OrderDetail }>(`/store/orders/${id}/cancel`, { method: "POST", body: { reason } }),
  requestReturn: (orderId: string, input: { order_item_ids: string[]; reason: string; description: string; desired_outcome: "refund" | "exchange" | "store_credit"; evidence_photos: string[] }) =>
    api(`/store/orders/${orderId}/returns`, { method: "POST", body: input }),
}
