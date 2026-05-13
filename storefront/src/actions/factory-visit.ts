"use server"

import { revalidatePath } from "next/cache"
import { requireSession } from "@/lib/session"
import { vnSourcingApi } from "@/lib/sdk/vn-sourcing"

export async function scheduleFactoryVisitAction(formData: FormData) {
  await requireSession()
  const supplierId = String(formData.get("supplier_id") ?? "")
  const scheduledDate = String(formData.get("scheduled_date") ?? "")
  const attendees = Number(formData.get("attendees") ?? 1)
  const agenda = String(formData.get("agenda") ?? "")
  const interpreterSessionId = String(formData.get("interpreter_session_id") ?? "") || undefined
  if (!supplierId || !scheduledDate || !agenda) return { error: "invalid_input" }
  const { visit } = await vnSourcingApi.scheduleFactoryVisit({ supplier_id: supplierId, scheduled_date: scheduledDate, attendees, agenda, interpreter_session_id: interpreterSessionId })
  revalidatePath("/buyer-center/factory-visits")
  return { ok: true, visit }
}

export async function bookInterpreterAction(formData: FormData) {
  await requireSession()
  const interpreterId = String(formData.get("interpreter_id") ?? "")
  const scheduledStartAt = String(formData.get("scheduled_start_at") ?? "")
  const durationMinutes = Number(formData.get("duration_minutes") ?? 60)
  const mode = (String(formData.get("mode") ?? "video") as any)
  const contextType = String(formData.get("context_type") ?? "negotiation")
  const currency = String(formData.get("currency") ?? "USD")
  if (!interpreterId || !scheduledStartAt) return { error: "invalid_input" }
  const result = await vnSourcingApi.bookInterpreter({ interpreter_id: interpreterId, scheduled_start_at: scheduledStartAt, duration_minutes: durationMinutes, mode, context_type: contextType, currency })
  revalidatePath("/buyer-center/interpreter-sessions")
  return { ok: true, ...result }
}
