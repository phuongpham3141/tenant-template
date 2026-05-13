import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { NOTIFICATION_BUS_MODULE } from "../modules/notification-bus"
import type NotificationBusService from "../modules/notification-bus/service"
import { RFQ_MODULE } from "../modules/rfq"
import type RfqService from "../modules/rfq/service"
import { adminContext } from "../lib/tenant/context"

export default async function rfqEventsHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; customer_id?: string; supplier_id?: string }>) {
  const ctx = adminContext(event.data.tenant_id)
  const notif = container.resolve<NotificationBusService>(NOTIFICATION_BUS_MODULE)

  if (event.name === "rfq.created") {
    const rfq = container.resolve<RfqService>(RFQ_MODULE)
    const invited = await rfq.listInvitedSuppliers(ctx, event.data.id)
    for (const inv of invited) {
      await notif.send(ctx, {
        channel: "email", toUserId: inv.supplierId,
        templateCode: "rfq_invitation",
        variables: { rfq_id: event.data.id }, groupingKey: `rfq_invite_${event.data.id}_${inv.supplierId}`,
        priority: "high",
      })
    }
  }

  if (event.name === "rfq.quote_submitted" && event.data.customer_id) {
    await notif.send(ctx, {
      channel: "email", toUserId: event.data.customer_id,
      templateCode: "rfq_new_quote",
      variables: { rfq_id: event.data.id },
      groupingKey: `rfq_quote_${event.data.id}_${event.data.supplier_id}`,
    })
  }

  if (event.name === "rfq.quote_accepted" && event.data.supplier_id) {
    await notif.send(ctx, {
      channel: "email", toUserId: event.data.supplier_id,
      templateCode: "rfq_quote_accepted",
      variables: { rfq_id: event.data.id }, priority: "high",
    })
  }
}

export const config: SubscriberConfig = {
  event: ["rfq.created", "rfq.quote_submitted", "rfq.quote_accepted", "rfq.expired"],
}
