import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

// Sprint 11 Pha 2b D28: notification-bus drop, all 3 notif.send calls stubbed.
// Note: Sprint 10 Pha 2c v2 already dropped escrow service. No active events expected.

export default async function escrowEventsHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; buyer_user_id?: string; supplier_id?: string; milestone_id?: string; reason?: string }>) {
  container.resolve("logger").debug(
    "[escrow-events] event " + event.name + " for " + event.data.id + " (notification + escrow service both stubbed)"
  )
}

export const config: SubscriberConfig = {
  event: ["escrow.funded", "escrow.milestone.released", "escrow.refunded", "escrow.fully_released"],
}
