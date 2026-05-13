import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { NOTIFICATION_BUS_MODULE } from "../modules/notification-bus"
import type NotificationBusService from "../modules/notification-bus/service"
import { adminContext } from "../lib/tenant/context"

export default async function escrowEventsHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; buyer_user_id?: string; supplier_id?: string; milestone_id?: string; reason?: string }>) {
  const ctx = adminContext(event.data.tenant_id)
  const notif = container.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)

  if (event.name === "escrow.funded") {
    if (event.data.supplier_id) {
      await notif.send(ctx, {
        channel: "email", toUserId: event.data.supplier_id,
        templateCode: "escrow_funded_supplier", variables: { escrow_id: event.data.id }, priority: "high",
      })
    }
  }
  if (event.name === "escrow.milestone.released") {
    if (event.data.supplier_id) {
      await notif.send(ctx, {
        channel: "email", toUserId: event.data.supplier_id,
        templateCode: "escrow_milestone_released", variables: { escrow_id: event.data.id, milestone_id: event.data.milestone_id },
      })
    }
  }
  if (event.name === "escrow.refunded") {
    if (event.data.buyer_user_id) {
      await notif.send(ctx, {
        channel: "email", toUserId: event.data.buyer_user_id,
        templateCode: "escrow_refunded_buyer", variables: { escrow_id: event.data.id, reason: event.data.reason }, priority: "high",
      })
    }
  }
}

export const config: SubscriberConfig = {
  event: ["escrow.funded", "escrow.milestone.released", "escrow.refunded", "escrow.fully_released"],
}
