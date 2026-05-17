import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

// Sprint 11 Pha 2b D28: notification-bus drop, all 3 notif.send calls stubbed.
// Original: ai_livestream quota_warning + quota_paused + persona_ready emails.

interface EventData {
  id: string
  tenant_id: string
  stream_id?: string
  persona_id?: string
  supplier_id?: string
  percent_used?: number
}

export default async function aiLivestreamEventsHandler({ event, container }: SubscriberArgs<EventData>) {
  container.resolve("logger").debug(
    "[ai-livestream-events] event " + event.name + " for " + event.data.id + " (notification dispatch stubbed Sprint 11 Pha 2b)"
  )
}

export const config: SubscriberConfig = {
  event: [
    "ai_livestream.quota_warning",
    "ai_livestream.quota_paused",
    "ai_livestream.persona_ready",
    "ai_livestream.session_failed",
  ],
}
