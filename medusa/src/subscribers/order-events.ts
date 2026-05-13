import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ESCROW_MODULE } from "../modules/escrow"
import type EscrowService from "../modules/escrow/service"
import { SEARCH_PLATFORM_MODULE } from "../modules/search-platform"
import type SearchPlatformService from "../modules/search-platform/service"
import { NOTIFICATION_BUS_MODULE } from "../modules/notification-bus"
import type NotificationBusService from "../modules/notification-bus/service"
import { adminContext } from "../lib/tenant/context"

export default async function orderEventsHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; buyer_user_id?: string; supplier_id?: string }>) {
  const data = event.data
  const ctx = adminContext(data.tenant_id)

  if (event.name === "order.placed") {
    const search = container.resolve<SearchPlatformService>(SEARCH_PLATFORM_MODULE)
    await search.indexDocument(ctx, "order", data.id, {
      tenant_id: data.tenant_id, buyer_id: data.buyer_user_id, supplier_id: data.supplier_id, status: "placed", placed_at: new Date().toISOString(),
    })

    const notif = container.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)
    if (data.buyer_user_id) {
      await notif.send(ctx, {
        channel: "email", toUserId: data.buyer_user_id,
        templateCode: "order_confirmation_buyer",
        variables: { order_id: data.id }, groupingKey: `order_placed_${data.id}_buyer`,
      })
    }
    if (data.supplier_id) {
      await notif.send(ctx, {
        channel: "email", toUserId: data.supplier_id,
        templateCode: "order_received_supplier",
        variables: { order_id: data.id }, groupingKey: `order_placed_${data.id}_supplier`,
      })
    }
  }

  if (event.name === "order.payment_funded") {
    const escrow = container.resolve<EscrowService>(ESCROW_MODULE)
    await escrow.fundEscrow(ctx, (event.data as any).escrow_id, (event.data as any).payment_tx_id)
  }
}

export const config: SubscriberConfig = {
  event: ["order.placed", "order.payment_funded", "order.fulfilled", "order.cancelled"],
}
