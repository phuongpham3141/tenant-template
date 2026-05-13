import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { NOTIFICATION_BUS_MODULE } from "../modules/notification-bus"
import type NotificationBusService from "../modules/notification-bus/service"
import { adminContext } from "../lib/tenant/context"

export default async function gdprDsrSlaMonitor(container: MedusaContainer) {
  const notif = container.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)
  const tenants = await queryT<{ id: string }>(adminContext(process.env.SYSTEM_TENANT_ID ?? ""), `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])
  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const breached = await queryT<any>(
      ctx,
      `SELECT id, user_id FROM gdpr.data_subject_request
       WHERE status IN ('received','verifying_identity','in_progress')
         AND sla_due_at < NOW() + INTERVAL '5 days'`, []
    ).catch(() => [])
    for (const r of breached) {
      await notif.send(ctx, {
        channel: "email",
        toAddress: process.env.DPO_EMAIL ?? "dpo@huayuesc.vn",
        templateCode: "gdpr_dsr_sla_warning",
        variables: { dsr_id: r.id, user_id: r.user_id },
        priority: "critical",
        groupingKey: `gdpr_sla_${r.id}`,
      }).catch(() => undefined)
    }
  }
}

export const config = {
  name: "gdpr-dsr-sla-monitor",
  schedule: "0 8 * * *",
}
