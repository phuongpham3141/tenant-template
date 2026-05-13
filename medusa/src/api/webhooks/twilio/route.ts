import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { NOTIFICATION_BUS_MODULE } from "../../../modules/notification-bus"
import type NotificationBusService from "../../../modules/notification-bus/service"
import { adminContext } from "../../../lib/tenant/context"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as any
  const tenantId = process.env.DEFAULT_TENANT_ID
  if (!tenantId) return res.status(400).end()
  const svc = req.scope.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)
  const ctx = adminContext(tenantId)
  const deliveryId = body.MessageSid
  if (!deliveryId) return res.status(400).end()
  if (body.MessageStatus === "delivered") {
    await svc.markDelivered(ctx, deliveryId, { provider: "twilio", messageId: body.MessageSid })
  } else if (["failed", "undelivered"].includes(body.MessageStatus)) {
    await svc.markFailed(ctx, deliveryId, body.ErrorCode ?? body.MessageStatus)
  }
  return res.status(204).end()
}
