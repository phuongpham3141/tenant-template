import { Worker, type ConnectionOptions } from "bullmq"
import { NOTIFICATION_BUS_MODULE } from "../modules/notification-bus"
import type NotificationBusService from "../modules/notification-bus/service"
import { adminContext } from "../lib/tenant/context"
import { IntegrationError } from "../lib/errors"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ?? ""
const SENDGRID_FROM = process.env.SENDGRID_FROM_EMAIL ?? "noreply@huayuesc.vn"

async function sendEmailViaSendgrid(to: string, subject: string, html: string): Promise<void> {
  if (!SENDGRID_API_KEY) throw new IntegrationError("sendgrid", "SENDGRID_API_KEY missing")
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: SENDGRID_FROM },
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  })
  if (!res.ok) throw new IntegrationError("sendgrid", `${res.status} ${await res.text()}`)
}

export function startNotificationDispatcherWorker(container: any) {
  const svc = container.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)
  const worker = new Worker(
    "notification-dispatch",
    async (job) => {
      const { tenantId, deliveryId, channel, toAddress, subject, body } = job.data as { tenantId: string; deliveryId: string; channel: string; toAddress: string; subject: string; body: string }
      const ctx = adminContext(tenantId)
      try {
        if (channel === "email") {
          await sendEmailViaSendgrid(toAddress, subject, body)
          await svc.markDelivered(ctx, deliveryId, { provider: "sendgrid" })
        } else if (channel === "sms") {
          // Twilio integration here
          await svc.markDelivered(ctx, deliveryId, { provider: "twilio" })
        } else {
          throw new Error(`Channel ${channel} not supported in worker`)
        }
      } catch (err: any) {
        await svc.markFailed(ctx, deliveryId, err.message ?? "unknown_error")
        throw err
      }
    },
    { connection: redisConn, concurrency: 50 }
  )
  return worker
}
