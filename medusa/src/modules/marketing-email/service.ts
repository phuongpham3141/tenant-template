import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import type { EmailSegment, EmailJourney, JourneyStep, EmailCampaign } from "./types"
import { emitAudit } from "../../lib/audit/emit"

class MarketingEmailService extends MedusaService({}) {
  async createSegment(ctx: TenantContext, input: Omit<EmailSegment, "id" | "tenantId" | "estimatedSize" | "lastBuiltAt">): Promise<EmailSegment> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO email_mkt.segment (id, tenant_id, name, description, filter_dsl, refresh_interval_min, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4::jsonb, $5, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.name, input.description ?? null, JSON.stringify(input.filterDsl), input.refreshIntervalMin]
    )
    return mapSegment(rows[0])
  }

  async buildSegment(ctx: TenantContext, segmentId: string): Promise<{ memberCount: number }> {
    const seg = await queryT<any>(ctx, `SELECT * FROM email_mkt.segment WHERE id = $1`, [segmentId])
    if (!seg[0]) throw new Error("Segment not found")
    // In real impl, translate filter_dsl to SQL/ES query. Here we just rebuild count.
    const count = await queryT<any>(ctx, `SELECT COUNT(*)::int AS c FROM identity.user WHERE status = 'active' AND tenant_id = $1`, [ctx.tenantId])
    await queryT(ctx, `UPDATE email_mkt.segment SET estimated_size = $1, last_built_at = NOW() WHERE id = $2`, [count[0]?.c ?? 0, segmentId])
    return { memberCount: count[0]?.c ?? 0 }
  }

  async createJourney(ctx: TenantContext, input: Omit<EmailJourney, "id" | "tenantId" | "steps"> & { steps: Omit<JourneyStep, "id" | "journeyId">[] }): Promise<EmailJourney> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO email_mkt.journey (id, tenant_id, name, trigger, status, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3::jsonb, $4, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.name, JSON.stringify(input.trigger), input.status]
    )
    const steps: JourneyStep[] = []
    for (const [i, s] of input.steps.entries()) {
      const sr = await queryT<any>(
        ctx,
        `INSERT INTO email_mkt.journey_step (id, tenant_id, journey_id, "order", type, config, wait_duration_minutes, created_at)
         VALUES (public.uuidv7(), $1, $2, $3, $4, $5::jsonb, $6, NOW()) RETURNING *`,
        [ctx.tenantId, rows[0].id, i, s.type, JSON.stringify(s.config), s.waitDurationMinutes ?? null]
      )
      steps.push({ id: sr[0].id, journeyId: rows[0].id, order: i, type: s.type, config: s.config, waitDurationMinutes: s.waitDurationMinutes })
    }
    return { ...mapJourney(rows[0]), steps }
  }

  async createCampaign(ctx: TenantContext, input: Omit<EmailCampaign, "id" | "tenantId" | "sentCount" | "openedCount" | "clickedCount" | "status">): Promise<EmailCampaign> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO email_mkt.campaign (
         id, tenant_id, name, template_code, segment_id, scheduled_at, status,
         ab_variants, winner_metric, sent_count, opened_count, clicked_count, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, 'draft', $6::jsonb, $7, 0, 0, 0, NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.name, input.templateCode, input.segmentId ?? null, input.scheduledAt ?? null, JSON.stringify(input.abVariants ?? []), input.winnerMetric ?? null]
    )
    await emitAudit(ctx, { actionCode: "email.campaign.create", resourceType: "email_mkt.campaign", resourceId: rows[0].id })
    return mapCampaign(rows[0])
  }

  async incrementCampaignMetric(ctx: TenantContext, campaignId: string, metric: "sent" | "opened" | "clicked", count = 1): Promise<void> {
    const col = `${metric}_count`
    await queryT(ctx, `UPDATE email_mkt.campaign SET ${col} = ${col} + $1, updated_at = NOW() WHERE id = $2`, [count, campaignId])
  }
}

function mapSegment(r: any): EmailSegment {
  return {
    id: r.id, tenantId: r.tenant_id, name: r.name, description: r.description,
    filterDsl: r.filter_dsl ?? {}, estimatedSize: r.estimated_size,
    refreshIntervalMin: Number(r.refresh_interval_min), lastBuiltAt: r.last_built_at,
  }
}
function mapJourney(r: any): EmailJourney {
  return {
    id: r.id, tenantId: r.tenant_id, name: r.name, trigger: r.trigger ?? { event: "" }, status: r.status, steps: [],
  }
}
function mapCampaign(r: any): EmailCampaign {
  return {
    id: r.id, tenantId: r.tenant_id, name: r.name, templateCode: r.template_code,
    segmentId: r.segment_id, scheduledAt: r.scheduled_at, sentAt: r.sent_at, status: r.status,
    abVariants: r.ab_variants ?? [], winnerMetric: r.winner_metric,
    sentCount: Number(r.sent_count ?? 0), openedCount: Number(r.opened_count ?? 0), clickedCount: Number(r.clicked_count ?? 0),
  }
}

export default MarketingEmailService
