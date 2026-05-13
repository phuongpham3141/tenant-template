import { api } from "../../api/client"

export interface ConversationSummary {
  id: string
  type: string
  title?: string
  participant_ids: string[]
  last_message_at?: string
  unread_count: number
  archived: boolean
}

export interface ChatMessage {
  id: string
  conversation_id: string
  sender_user_id: string
  sender_role: string
  message_type: string
  body: string
  translated_body?: Record<string, string>
  source_locale: string
  attachment_ids: string[]
  occurred_at: string
}

export const communicationApi = {
  listConversations: (params: { type?: string; archived?: boolean; limit?: number } = {}) =>
    api<{ conversations: ConversationSummary[] }>("/store/conversations", { query: params }),
  getConversation: (id: string) =>
    api<{ conversation: ConversationSummary; messages: ChatMessage[] }>(`/store/conversations/${id}`),
  send: (conversationId: string, input: { message_type: "text" | "image" | "file" | "quote_card" | "product_card"; body: string; attachment_ids?: string[] }) =>
    api<{ message: ChatMessage }>(`/store/conversations/${conversationId}/messages`, { method: "POST", body: input }),
  startWithSupplier: (supplierId: string, productId?: string) =>
    api<{ conversation: ConversationSummary }>("/store/conversations/start", { method: "POST", body: { supplier_id: supplierId, product_id: productId } }),
  scheduleMeeting: (conversationId: string, input: { scheduled_start_at: string; duration_minutes: number; mode: "audio" | "video" | "screen_share" }) =>
    api(`/store/conversations/${conversationId}/meetings`, { method: "POST", body: input }),
}
