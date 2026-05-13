import type { PaymentAdapter } from "../types"
import { IntegrationError } from "../../../lib/errors"

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY ?? ""

async function stripeFetch(path: string, body?: Record<string, unknown>, method: "POST" | "GET" = "POST") {
  if (!STRIPE_SECRET) throw new IntegrationError("stripe", "STRIPE_SECRET_KEY not configured")
  const form = body
    ? new URLSearchParams(Object.entries(body).map(([k, v]) => [k, String(v)])).toString()
    : undefined
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  })
  if (!res.ok) throw new IntegrationError("stripe", `${res.status} ${await res.text()}`)
  return res.json()
}

export const stripeAdapter: PaymentAdapter = {
  id: "stripe",
  async authorize({ amountMinor, currency, methodToken, metadata }) {
    const intent = await stripeFetch("/payment_intents", {
      amount: Number(amountMinor),
      currency: currency.toLowerCase(),
      payment_method: methodToken,
      confirm: "true",
      "automatic_payment_methods[enabled]": "true",
      ...(metadata ? Object.fromEntries(Object.entries(metadata).map(([k, v]) => [`metadata[${k}]`, String(v)])) : {}),
    })
    return {
      processorTxId: intent.id,
      status: intent.status === "requires_action" ? "initiated" : intent.status === "succeeded" ? "captured" : "authorized",
      threeDsRedirectUrl: intent.next_action?.redirect_to_url?.url,
    }
  },
  async capture(processorTxId, amountMinor) {
    const body: Record<string, unknown> = {}
    if (amountMinor !== undefined) body.amount_to_capture = Number(amountMinor)
    const intent = await stripeFetch(`/payment_intents/${processorTxId}/capture`, body)
    return { status: intent.status === "succeeded" ? "captured" : "failed" }
  },
  async refund(processorTxId, amountMinor, reason) {
    const refund = await stripeFetch("/refunds", {
      payment_intent: processorTxId,
      amount: Number(amountMinor),
      ...(reason ? { reason } : {}),
    })
    return { status: "refunded", refundId: refund.id }
  },
  async void(processorTxId) {
    const intent = await stripeFetch(`/payment_intents/${processorTxId}/cancel`)
    return { status: intent.status === "canceled" ? "voided" : "failed" }
  },
}
