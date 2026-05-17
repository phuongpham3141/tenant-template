import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

// Sprint 11 Pha 2b D28: notification-bus drop, all 3 notif.send calls stubbed.
// Original: escrow.funded supplier email + escrow.milestone.released supplier email +
// escrow.refunded buyer email.
// Note: Pha 2c v2 (Sprint 10) already dropped escrow service. This subscriber
// further stubs notification side. No active escrow events expected runtime.

export default async function escrowEventsHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; buyer_user_id?: string; supplier_id?: string; milestone_id?: string; reason?: string }>) {
  container.resolve("logger").debug(
    \`[escrow-events] event \${event.name} for \${event.data.id} (notification + escrow service both stubbed)\`
  )
  // Sprint 12+ TODO: re-enable when notification-bus AND escrow rewrite.
}

export const config: SubscriberConfig = {
  event: ["escrow.funded", "escrow.milestone.released", "escrow.refunded", "escrow.fully_released"],
}
