"use server"

import { requireSession } from "@/lib/session"
import { paymentApi } from "@/lib/sdk/payment"
import { redirect } from "next/navigation"

export async function initiatePaymentAction(formData: FormData) {
  await requireSession()
  const orderId = String(formData.get("order_id") ?? "") || undefined
  const escrowId = String(formData.get("escrow_id") ?? "") || undefined
  const processor = (String(formData.get("processor") ?? "stripe") as any)
  const methodToken = String(formData.get("method_token") ?? "")
  const amountMinor = Number(formData.get("amount_minor") ?? 0)
  const currency = String(formData.get("currency") ?? "USD")
  if ((!orderId && !escrowId) || !methodToken || !amountMinor) {
    return { error: "invalid_input" }
  }
  const result = await paymentApi.initiate({
    order_id: orderId, escrow_id: escrowId, processor,
    method_token: methodToken, amount_minor: amountMinor, currency,
  })
  if (result.transaction.three_ds_redirect_url) {
    redirect(result.transaction.three_ds_redirect_url)
  }
  return { ok: true, transaction: result.transaction }
}
