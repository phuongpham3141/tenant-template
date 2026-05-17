/**
 * GDPR DSR SLA monitor (Sprint 11 Pha 2b D28 stubbed)
 *
 * STATUS: Notification dispatch removed do notification-bus drop.
 * Now: query only (preserve audit trail), no email dispatch.
 *
 * Sprint 12+ TODO: Re-enable email when notification-bus rewrite.
 */
import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

export default async function gdprDsrSlaMonitor(container: MedusaContainer) {
  const tenants = await queryT<{ id: string }>(
    adminContext(process.env.SYSTEM_TENANT_ID ?? ""),
    "SELECT id FROM admin.tenant WHERE status = 'active'",
    []
  ).catch(() => [])

  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const breached = await queryT<{ id: string; user_id: string }>(
      ctx,
      "SELECT id, user_id FROM gdpr.data_subject_request WHERE status IN ('received','verifying_identity','in_progress') AND sla_due_at < NOW() + INTERVAL '5 days'",
      []
    ).catch(() => [])

    if (breached.length > 0) {
      container.resolve("logger").warn(
        "[gdpr-dsr-sla-monitor] " + breached.length + " DSR breaching SLA for tenant " + t.id + " (notification dispatch stubbed Sprint 11 Pha 2b)"
      )
    }
  }
}

export const config = {
  name: "gdpr-dsr-sla-monitor",
  schedule: "0 8 * * *",
}
