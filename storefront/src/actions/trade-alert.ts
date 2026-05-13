"use server"

import { api } from "@/lib/api/client"

export async function subscribeTradeAlertAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
  const name = String(formData.get("name") ?? "")
  const company = String(formData.get("company") ?? "")
  const country = String(formData.get("country") ?? "VN")
  const industries = formData.getAll("industries").map(String)
  const consent = formData.get("consent_gdpr") === "on"
  if (!email) return { error: "email_required" }
  if (!consent) return { error: "consent_required" }
  try {
    await api("/store/trade-alerts/subscribe", { method: "POST", body: { email, full_name: name, company, country, industries, consent_gdpr: consent } })
    return { ok: true }
  } catch (err: any) {
    return { error: err.code ?? "subscription_failed" }
  }
}
