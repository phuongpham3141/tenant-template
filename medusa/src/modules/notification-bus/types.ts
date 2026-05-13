export type Channel = "email" | "sms" | "whatsapp" | "zalo" | "wechat" | "push" | "in_app" | "webhook"

export interface NotificationRequest {
  channel: Channel
  toUserId?: string
  toAddress?: string
  templateCode: string
  variables?: Record<string, unknown>
  locale?: "vi" | "en" | "cn"
  priority?: "low" | "normal" | "high" | "critical"
  scheduledAt?: Date
  groupingKey?: string
  metadata?: Record<string, unknown>
}

export interface NotificationDelivery {
  id: string
  tenantId: string
  channel: Channel
  toUserId?: string
  toAddress: string
  templateCode: string
  status: "pending" | "queued" | "sending" | "sent" | "delivered" | "failed" | "bounced" | "suppressed"
  attempts: number
  sentAt?: Date
  deliveredAt?: Date
  failureReason?: string
  provider?: string
}
