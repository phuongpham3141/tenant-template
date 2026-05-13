"use server"

import { revalidatePath } from "next/cache"
import { requireSession } from "@/lib/session"
import { communicationApi } from "@/lib/sdk/communication"

export async function startConversationAction(supplierId: string, productId?: string) {
  await requireSession()
  const { conversation } = await communicationApi.startWithSupplier(supplierId, productId)
  revalidatePath(`/buyer-center/messages`)
  return { conversationId: conversation.id }
}

export async function sendMessageAction(conversationId: string, formData: FormData) {
  await requireSession()
  const body = String(formData.get("body") ?? "").trim()
  if (!body) return { error: "empty_message" }
  const attachmentIds = formData.getAll("attachment_ids").map(String).filter(Boolean)
  const { message } = await communicationApi.send(conversationId, { message_type: "text", body, attachment_ids: attachmentIds })
  revalidatePath(`/buyer-center/messages/${conversationId}`)
  return { ok: true, message }
}
