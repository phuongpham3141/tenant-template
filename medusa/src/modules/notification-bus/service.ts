import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import type { NotificationRequest, NotificationDelivery, Channel } from "./types"

const DEDUP_WINDOW_MIN = 5

class NotificationBusService extends MedusaService({}) {
  async send(ctx: TenantContext, req: NotificationRequest): Promise<NotificationDelivery> {
    if (req.groupingKey) {
      const recent = await queryT<any>(
        ctx,
        `SELECT id FROM notification.notification_delivery
         WHERE tenant_id = $1 AND grouping_key = $2
           AND created_at > NOW() - ($3 || ' minutes')::interval
           AND status IN ('queued','sending','sent','delivered')
         LIMIT 1`,
        [ctx.tenantId, req.groupingKey, String(DEDUP_WINDOW_MIN)]
      )
      if (recent[0]) {
        return this.get(ctx, recent[0].id)
      }
    }
    if (req.toAddress) {
      const suppressed = await queryT<any>(
        ctx,
        `SELECT 1 FROM notification.suppression_list WHERE address = $1 AND channel = $2 LIMIT 1`,
        [req.toAddress, req.channel]
      )
      if (suppressed[0]) {
        return this.recordSuppressed(ctx, req)
      }
    }
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO notification.notification_delivery (
         id, tenant_id, channel, to_user_id, to_address, template_code, variables, locale, priority,
         scheduled_at, grouping_key, status, attempts, metadata, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6::jsonb, $7, $8,
         $9, $10, 'queued', 0, $11::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, req.channel, req.toUserId ?? null, req.toAddress ?? "", req.templateCode,
        JSON.stringify(req.variables ?? {}), req.locale ?? "vi", req.priority ?? "normal",
        req.scheduledAt ?? null, req.groupingKey ?? null, JSON.stringify(req.metadata ?? {}),
      ]
    )
    return mapDelivery(rows[0])
  }

  async sendBatch(ctx: TenantContext, requests: NotificationRequest[]): Promise<NotificationDelivery[]> {
    return Promise.all(requests.map((r) => this.send(ctx, r)))
  }

  async markDelivered(ctx: TenantContext, deliveryId: string, providerData: { provider: string; messageId?: string }): Promise<NotificationDelivery> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE notification.notification_delivery
       SET status = 'delivered', delivered_at = NOW(), provider = $1,
           metadata = metadata || jsonb_build_object('messageId', $2), updated_at = NOW()
       WHERE id = $3 AND tenant_id = $4 RETURNING *`,
      [providerData.provider, providerData.messageId ?? null, deliveryId, ctx.tenantId]
    )
    return mapDelivery(rows[0])
  }

  async markFailed(ctx: TenantContext, deliveryId: string, reason: string): Promise<NotificationDelivery> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE notification.notification_delivery
       SET status = 'failed', failure_reason = $1, attempts = attempts + 1, updated_at = NOW()
       WHERE id = $2 AND tenant_id = $3 RETURNING *`,
      [reason, deliveryId, ctx.tenantId]
    )
    return mapDelivery(rows[0])
  }

  async suppress(ctx: TenantContext, address: string, channel: Channel, reason: string): Promise<void> {
    await queryT(
      ctx,
      `INSERT INTO notification.suppression_list (tenant_id, address, channel, reason, created_at)
       VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING`,
      [ctx.tenantId, address, channel, reason]
    )
  }

  async get(ctx: TenantContext, id: string): Promise<NotificationDelivery> {
    const rows = await queryT<any>(ctx, `SELECT * FROM notification.notification_delivery WHERE id = $1`, [id])
    return mapDelivery(rows[0])
  }

  private async recordSuppressed(ctx: TenantContext, req: NotificationRequest): Promise<NotificationDelivery> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO notification.notification_delivery (id, tenant_id, channel, to_address, template_code, status, attempts, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, 'suppressed', 0, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, req.channel, req.toAddress, req.templateCode]
    )
    return mapDelivery(rows[0])
  }
}

function mapDelivery(r: any): NotificationDelivery {
  return {
    id: r.id, tenantId: r.tenant_id, channel: r.channel, toUserId: r.to_user_id, toAddress: r.to_address,
    templateCode: r.template_code, status: r.status, attempts: Number(r.attempts ?? 0),
    sentAt: r.sent_at, deliveredAt: r.delivered_at, failureReason: r.failure_reason, provider: r.provider,
  }
}

export default NotificationBusService
