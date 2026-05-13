import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { NOTIFICATION_BUS_MODULE } from "../modules/notification-bus"
import type NotificationBusService from "../modules/notification-bus/service"
import { SEARCH_PLATFORM_MODULE } from "../modules/search-platform"
import type SearchPlatformService from "../modules/search-platform/service"
import { adminContext } from "../lib/tenant/context"

export default async function supplierVerificationHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; from_tier?: number; to_tier?: number; document_id?: string; rejection_reason?: string }>) {
  const ctx = adminContext(event.data.tenant_id)
  const notif = container.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)
  const search = container.resolve<SearchPlatformService>(SEARCH_PLATFORM_MODULE)

  if (event.name === "supplier.verification.promoted") {
    await search.indexDocument(ctx, "supplier", event.data.id, {
      tenant_id: event.data.tenant_id, supplier_id: event.data.id, verification_tier: event.data.to_tier,
      updated_at: new Date().toISOString(),
    })
    await notif.send(ctx, {
      channel: "email", toUserId: event.data.id,
      templateCode: "supplier_tier_promoted", variables: { from_tier: event.data.from_tier, to_tier: event.data.to_tier },
      priority: "high",
    })
  }
  if (event.name === "kyc.rejected") {
    await notif.send(ctx, {
      channel: "email", toUserId: event.data.id,
      templateCode: "kyc_document_rejected",
      variables: { document_id: event.data.document_id, reason: event.data.rejection_reason },
      priority: "high",
    })
  }
}

export const config: SubscriberConfig = {
  event: ["supplier.verification.promoted", "kyc.approved", "kyc.rejected"],
}
