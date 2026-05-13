export type ConversationType = "direct" | "group" | "rfq" | "negotiation" | "support" | "interpreter"
export type MessageType = "text" | "image" | "file" | "voice" | "video" | "system" | "quote_card" | "product_card"

export interface Conversation {
  id: string
  tenantId: string
  type: ConversationType
  title?: string
  participantIds: string[]
  rfqId?: string
  orderId?: string
  lastMessageAt?: Date
  unreadCounts?: Record<string, number>
  archived: boolean
  metadata?: Record<string, unknown>
}

export interface ConversationMessage {
  id: string
  tenantId: string
  conversationId: string
  senderUserId: string
  senderRole: "buyer" | "supplier" | "agent" | "interpreter" | "system"
  messageType: MessageType
  body: string
  translatedBody?: Record<string, string>
  sourceLocale: string
  attachmentIds: string[]
  isPinned: boolean
  reactions?: Record<string, string[]>
  occurredAt: Date
}

export interface Negotiation {
  id: string
  conversationId: string
  topic: string
  state: "open" | "settled" | "cancelled"
  offers: NegotiationOffer[]
}

export interface NegotiationOffer {
  id: string
  negotiationId: string
  byUserId: string
  priceMinor: bigint
  currency: string
  quantity: number
  paymentTerms: string
  shippingTerms: string
  validUntil: Date
  accepted: boolean
  proposedAt: Date
}

export interface MeetingSession {
  id: string
  tenantId: string
  conversationId: string
  hostUserId: string
  scheduledStartAt: Date
  durationMinutes: number
  mode: "audio" | "video" | "screen_share"
  joinUrl: string
  recordingUrl?: string
  participantIds: string[]
  status: "scheduled" | "live" | "ended" | "cancelled"
}
