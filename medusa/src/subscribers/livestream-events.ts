import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

// Sprint 11 Pha 2b D28: notification-bus drop, sendBatch stubbed.
// Original: livestream.starting_soon push notifications to followers.

export default async function livestreamEventsHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; supplier_id?: string; follower_ids?: string[] }>) {
  if (event.name === "livestream.starting_soon") {
    container.resolve("logger").debug(
      "[livestream-events] livestream.starting_soon " + event.data.id + " " + (event.data.follower_ids?.length ?? 0) + " followers (notification dispatch stubbed Sprint 11 Pha 2b)"
    )
  }
}

export const config: SubscriberConfig = {
  event: ["livestream.starting_soon", "livestream.started", "livestream.ended"],
}
