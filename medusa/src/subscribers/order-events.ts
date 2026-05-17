import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { SEARCH_PLATFORM_MODULE } from "../modules/search-platform"
import type SearchPlatformService from "../modules/search-platform/service"
import { adminContext } from "../lib/tenant/context"

// Sprint 11 Pha 2b D28: notification-bus drop, 2 notif.send calls stubbed.
// Sprint 10 Pha 2c v2 D23-EXPANDED: escrow.fundEscrow already stubbed.
// PRESERVED: order.placed search.indexDocument logic intact.

export default async function orderEventsHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; buyer_user_id?: string; supplier_id?: string }>) {
  const data = event.data
  const ctx = adminContext(data.tenant_id)

  if (event.name === "order.placed") {
    const search = container.resolve<SearchPlatformService>(SEARCH_PLATFORM_MODULE)
    await search.indexDocument(ctx, "order", data.id, {
      tenant_id: data.tenant_id, buyer_id: data.buyer_user_id, supplier_id: data.supplier_id, status: "placed", placed_at: new Date().toISOString(),
    })
    // Sprint 12+ TODO: re-enable order_confirmation_buyer + order_received_supplier
    // notification emails when notification-bus rewrite.
  }

  if (event.name === "order.payment_funded") {
    container.resolve("logger").debug(
      "[order-events] order.payment_funded no-op for order " + data.id + " (escrow + notification both stubbed)"
    )
  }
}

export const config: SubscriberConfig = {
  event: ["order.placed", "order.payment_funded", "order.fulfilled", "order.cancelled"],
}
