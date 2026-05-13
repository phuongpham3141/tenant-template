import { api } from "../../api/client"

export type Processor = "stripe" | "vnpay" | "momo" | "zalopay" | "alipay" | "internal_escrow"

export interface PaymentMethod {
  processor: Processor
  display_name: string
  logo_url?: string
  supported_currencies: string[]
}

export const paymentApi = {
  methods: (params: { country?: string; currency?: string }) =>
    api<{ methods: PaymentMethod[] }>("/store/payment/methods", { query: params }),
  initiate: (input: { order_id?: string; escrow_id?: string; processor: Processor; method_token: string; amount_minor: number; currency: string; metadata?: Record<string, unknown> }) =>
    api<{ transaction: { id: string; processor_tx_id: string; status: string; three_ds_redirect_url?: string } }>("/store/payment/initiate", { method: "POST", body: input }),
  get: (txId: string) => api<{ transaction: any }>(`/store/payment/${txId}`),
}
