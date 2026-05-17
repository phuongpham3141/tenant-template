import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

// Sprint 11 Pha 2b D28: notification-bus drop, all 3 notif.send calls stubbed.
// Original: rfq.created invitations + rfq.quote_submitted + rfq.quote_accepted.

export default async function rfqEventsHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; customer_id?: string; supplier_id?: string }>) {
  container.resolve("logger").debug(
    "[rfq-events] event " + event.name + " for " + event.data.id + " (notification dispatch stubbed Sprint 11 Pha 2b)"
  )
  // Sprint 12+ TODO: re-enable when notification-bus rewrite.
}

export const config: SubscriberConfig = {
  event: ["rfq.created", "rfq.quote_submitted", "rfq.quote_accepted", "rfq.expired"],
}
