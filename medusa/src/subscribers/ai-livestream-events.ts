import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { NOTIFICATION_BUS_MODULE } from "../modules/notification-bus"
import type NotificationBusService from "../modules/notification-bus/service"
import { adminContext } from "../lib/tenant/context"

interface EventData {
  id: string
  tenant_id: string
  stream_id?: string
  persona_id?: string
  supplier_id?: string
  percent_used?: number
}

export default async function aiLivestreamEventsHandler({ event, container }: SubscriberArgs<EventData>) {
  const ctx = adminContext(event.data.tenant_id)
  const notif = container.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)

  if (event.name === "ai_livestream.quota_warning" && event.data.supplier_id) {
    await notif.send(ctx, {
      channel: "email", toUserId: event.data.supplier_id,
      templateCode: "ai_livestream_quota_warning",
      variables: { percent_used: event.data.percent_used }, priority: "high",
      groupingKey: `quota_${event.data.tenant_id}_${new Date().toISOString().slice(0, 10)}`,
    })
  }
  if (event.name === "ai_livestream.quota_paused" && event.data.supplier_id) {
    await notif.send(ctx, {
      channel: "email", toUserId: event.data.supplier_id,
      templateCode: "ai_livestream_quota_paused",
      variables: { stream_id: event.data.stream_id }, priority: "critical",
    })
  }
  if (event.name === "ai_livestream.persona_ready" && event.data.supplier_id) {
    await notif.send(ctx, {
      channel: "email", toUserId: event.data.supplier_id,
      templateCode: "ai_persona_training_complete",
      variables: { persona_id: event.data.persona_id },
    })
  }
}

export const config: SubscriberConfig = {
  event: [
    "ai_livestream.quota_warning",
    "ai_livestream.quota_paused",
    "ai_livestream.persona_ready",
    "ai_livestream.session_failed",
  ],
}
