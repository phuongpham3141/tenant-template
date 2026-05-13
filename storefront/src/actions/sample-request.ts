"use server"

import { requireSession } from "@/lib/session"
import { vnSourcingApi } from "@/lib/sdk/vn-sourcing"

export async function requestSampleAction(formData: FormData) {
  await requireSession()
  const supplierId = String(formData.get("supplier_id") ?? "")
  const productId = String(formData.get("product_id") ?? "") || undefined
  const description = String(formData.get("description") ?? "")
  const quantity = Number(formData.get("quantity") ?? 1)
  const currency = String(formData.get("currency") ?? "USD")
  const shippingAddress = {
    line1: String(formData.get("addr_line1") ?? ""),
    city: String(formData.get("addr_city") ?? ""),
    country: String(formData.get("addr_country") ?? "VN"),
    postalCode: String(formData.get("addr_postal_code") ?? ""),
    phone: String(formData.get("addr_phone") ?? ""),
  }
  if (!supplierId || !description) return { error: "invalid_input" }
  await vnSourcingApi.requestSample({ supplier_id: supplierId, product_id: productId, description, quantity, currency, shipping_address: shippingAddress })
  return { ok: true }
}
