import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { NOTIFICATION_BUS_MODULE } from "../../../modules/notification-bus"
import type NotificationBusService from "../../../modules/notification-bus/service"
import { adminContext } from "../../../lib/tenant/context"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const events = (req.body as any[]) ?? []
  const svc = req.scope.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)
  for (const e of events) {
    const tenantId = e.tenant_id ?? process.env.DEFAULT_TENANT_ID
    if (!tenantId) continue
    const ctx = adminContext(tenantId)
    const deliveryId = e.delivery_id ?? e.sg_message_id
    if (!deliveryId) continue
    if (e.event === "delivered") {
      await svc.markDelivered(ctx, deliveryId, { provider: "sendgrid", messageId: e.sg_message_id })
    } else if (["bounce", "dropped", "spamreport", "blocked"].includes(e.event)) {
      await svc.markFailed(ctx, deliveryId, e.reason ?? e.event)
      if (e.event === "bounce" || e.event === "spamreport") {
        await svc.suppress(ctx, e.email, "email", e.event)
      }
    }
  }
  return res.status(204).end()
}
