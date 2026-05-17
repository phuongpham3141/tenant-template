import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { SEARCH_PLATFORM_MODULE } from "../modules/search-platform"
import type SearchPlatformService from "../modules/search-platform/service"
import { adminContext } from "../lib/tenant/context"

// Sprint 11 Pha 2b D28: notification-bus drop, notif.send calls stubbed.
// PRESERVED: search.indexDocument logic intact.

export default async function supplierVerificationHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; from_tier?: number; to_tier?: number; document_id?: string; rejection_reason?: string }>) {
  const ctx = adminContext(event.data.tenant_id)
  const search = container.resolve<SearchPlatformService>(SEARCH_PLATFORM_MODULE)

  if (event.name === "supplier.verification.promoted") {
    await search.indexDocument(ctx, "supplier", event.data.id, {
      tenant_id: event.data.tenant_id, supplier_id: event.data.id, verification_tier: event.data.to_tier,
      updated_at: new Date().toISOString(),
    })
    // Sprint 12+ TODO: re-enable notif.send supplier_tier_promoted email
  }
  if (event.name === "kyc.rejected") {
    // Sprint 12+ TODO: re-enable notif.send kyc_document_rejected email
  }
}

export const config: SubscriberConfig = {
  event: ["supplier.verification.promoted", "kyc.approved", "kyc.rejected"],
}
