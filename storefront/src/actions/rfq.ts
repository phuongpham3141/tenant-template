"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireSession } from "@/lib/session"
import { rfqApi } from "@/lib/sdk/rfq"

export async function createRfqAction(formData: FormData) {
  await requireSession()
  const title = {
    vi: String(formData.get("title_vi") ?? ""),
    en: String(formData.get("title_en") ?? ""),
    cn: String(formData.get("title_cn") ?? ""),
  }
  const description = {
    vi: String(formData.get("description_vi") ?? ""),
    en: String(formData.get("description_en") ?? ""),
    cn: String(formData.get("description_cn") ?? ""),
  }
  const targetQuantity = Number(formData.get("target_quantity") ?? 0)
  const targetUnitCode = String(formData.get("target_unit_code") ?? "pcs")
  const destinationCountry = String(formData.get("destination_country") ?? "VN")
  if (!targetQuantity || !destinationCountry) {
    return { error: "validation_failed" }
  }
  const budgetMinor = formData.get("budget_minor") ? Number(formData.get("budget_minor")) : undefined
  const budgetCurrency = budgetMinor ? String(formData.get("budget_currency") ?? "USD") : undefined
  const inviteMode = (String(formData.get("invite_mode") ?? "open") as any)
  const invitedSupplierIds = formData.getAll("invited_supplier_ids").map(String).filter(Boolean)

  const { rfq } = await rfqApi.create({
    title, description,
    category_id: String(formData.get("category_id") ?? "") || undefined,
    target_quantity: targetQuantity,
    target_unit_code: targetUnitCode,
    destination_country: destinationCountry,
    desired_delivery_date: String(formData.get("desired_delivery_date") ?? "") || undefined,
    budget_minor: budgetMinor,
    budget_currency: budgetCurrency,
    invite_mode: inviteMode,
    invited_supplier_ids: invitedSupplierIds.length ? invitedSupplierIds : undefined,
  })
  revalidatePath("/buyer-center/rfqs")
  redirect(`/buyer-center/rfqs/${rfq.id}`)
}

export async function submitQuoteAction(rfqId: string, formData: FormData) {
  await requireSession()
  const result = await rfqApi.submitQuote(rfqId, {
    price_per_unit_minor: Number(formData.get("price_per_unit_minor") ?? 0),
    currency: String(formData.get("currency") ?? "USD"),
    payment_terms: String(formData.get("payment_terms") ?? "T/T 30/70"),
    shipping_terms: String(formData.get("shipping_terms") ?? "FOB"),
    lead_time_days: Number(formData.get("lead_time_days") ?? 30),
    valid_until: String(formData.get("valid_until") ?? new Date(Date.now() + 14 * 86400000).toISOString()),
    notes: String(formData.get("notes") ?? "") || undefined,
  })
  revalidatePath(`/seller-center/rfqs`)
  return { ok: true, quote: result.quote }
}

export async function acceptQuoteAction(quoteId: string) {
  await requireSession()
  await rfqApi.acceptQuote(quoteId)
  revalidatePath("/buyer-center/rfqs")
  return { ok: true }
}
