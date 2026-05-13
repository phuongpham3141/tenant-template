import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { NOTIFICATION_BUS_MODULE } from "../modules/notification-bus"
import type NotificationBusService from "../modules/notification-bus/service"
import { LIVE_COMMERCE_MODULE } from "../modules/live-commerce"
import type LiveCommerceService from "../modules/live-commerce/service"
import { adminContext } from "../lib/tenant/context"

export default async function livestreamEventsHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; supplier_id?: string; follower_ids?: string[] }>) {
  const ctx = adminContext(event.data.tenant_id)
  const notif = container.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)

  if (event.name === "livestream.starting_soon") {
    const followers = event.data.follower_ids ?? []
    await notif.sendBatch(ctx, followers.map((uid) => ({
      channel: "push" as const, toUserId: uid, templateCode: "livestream_starting_soon",
      variables: { stream_id: event.data.id }, priority: "high" as const,
      groupingKey: `live_starting_${event.data.id}_${uid}`,
    })))
  }

  if (event.name === "livestream.ended") {
    const svc = container.resolve<LiveCommerceService>(LIVE_COMMERCE_MODULE)
    void svc // future: post-stream analytics rollup
  }
}

export const config: SubscriberConfig = {
  event: ["livestream.starting_soon", "livestream.started", "livestream.ended"],
}
