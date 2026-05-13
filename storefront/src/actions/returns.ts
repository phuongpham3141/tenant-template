"use server"

import { revalidatePath } from "next/cache"
import { requireSession } from "@/lib/session"
import { orderApi } from "@/lib/sdk/order"

export async function requestReturnAction(orderId: string, formData: FormData) {
  await requireSession()
  const orderItemIds = formData.getAll("order_item_id").map(String).filter(Boolean)
  const reason = String(formData.get("reason") ?? "other")
  const description = String(formData.get("description") ?? "")
  const desiredOutcome = (String(formData.get("desired_outcome") ?? "refund") as any)
  const evidencePhotos = formData.getAll("evidence_photo").map(String).filter(Boolean)
  if (orderItemIds.length === 0) return { error: "no_items_selected" }
  await orderApi.requestReturn(orderId, { order_item_ids: orderItemIds, reason: reason as any, description, desired_outcome: desiredOutcome, evidence_photos: evidencePhotos })
  revalidatePath(`/buyer-center/orders/${orderId}`)
  return { ok: true }
}
