import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError } from "../../lib/errors"
import type { AdCampaign, AdGroup, AdCreative, CampaignMetrics, CampaignStatus } from "./types"

class MarketingAdsService extends MedusaService({}) {
  async createCampaign(ctx: TenantContext, input: Omit<AdCampaign, "id" | "tenantId" | "status">): Promise<AdCampaign> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO advertising.ad_campaign (
         id, tenant_id, supplier_id, name, objective, status,
         budget_total_minor, budget_daily_minor, currency,
         start_date, end_date, bid_strategy, target_roas, target_cpa,
         metadata, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, 'draft',
         $5, $6, $7,
         $8, $9, $10, $11, $12,
         $13::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.supplierId, input.name, input.objective,
        String(input.budgetTotalMinor), input.budgetDailyMinor ? String(input.budgetDailyMinor) : null, input.currency,
        input.startDate, input.endDate ?? null, input.bidStrategy,
        input.targetRoas ?? null, input.targetCpa ?? null, JSON.stringify(input.metadata ?? {}),
      ]
    )
    await emitAudit(ctx, { actionCode: "ads.campaign.create", resourceType: "advertising.ad_campaign", resourceId: rows[0].id, after: rows[0] })
    return mapCampaign(rows[0])
  }

  async transitionCampaign(ctx: TenantContext, campaignId: string, to: CampaignStatus): Promise<AdCampaign> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE advertising.ad_campaign SET status = $1, updated_at = NOW() WHERE id = $2 AND tenant_id = $3 RETURNING *`,
      [to, campaignId, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("Campaign", campaignId)
    return mapCampaign(rows[0])
  }

  async createAdGroup(ctx: TenantContext, input: Omit<AdGroup, "id" | "status">): Promise<AdGroup> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO advertising.ad_group (id, tenant_id, campaign_id, name, targeting, default_bid_minor, status, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4::jsonb, $5, 'draft', NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.campaignId, input.name, JSON.stringify(input.targeting), String(input.defaultBidMinor)]
    )
    return mapGroup(rows[0])
  }

  async createCreative(ctx: TenantContext, input: Omit<AdCreative, "id" | "reviewStatus">): Promise<AdCreative> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO advertising.ad_creative (
         id, tenant_id, ad_group_id, format, headline, description, image_url, video_url, cta_text, landing_url, review_status, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.adGroupId, input.format, input.headline, input.description, input.imageUrl ?? null, input.videoUrl ?? null, input.ctaText, input.landingUrl]
    )
    return mapCreative(rows[0])
  }

  async recordImpression(ctx: TenantContext, input: { campaignId: string; adGroupId?: string; creativeId?: string; userId?: string; sessionId?: string; cpmMicros?: number }): Promise<void> {
    await queryT(
      ctx,
      `INSERT INTO advertising.ads_impression_log (id, tenant_id, occurred_at, campaign_id, ad_group_id, creative_id, user_id, session_id, cost_micros, created_at)
       VALUES (public.uuidv7(), $1, NOW(), $2, $3, $4, $5, $6, $7, NOW())`,
      [ctx.tenantId, input.campaignId, input.adGroupId ?? null, input.creativeId ?? null, input.userId ?? null, input.sessionId ?? null, input.cpmMicros ?? 0]
    ).catch(() => undefined)
  }

  async recordClick(ctx: TenantContext, input: { campaignId: string; adGroupId?: string; creativeId?: string; userId?: string; cpcMicros: number }): Promise<void> {
    await queryT(
      ctx,
      `INSERT INTO advertising.ads_click_log (id, tenant_id, occurred_at, campaign_id, ad_group_id, creative_id, user_id, cost_micros, created_at)
       VALUES (public.uuidv7(), $1, NOW(), $2, $3, $4, $5, $6, NOW())`,
      [ctx.tenantId, input.campaignId, input.adGroupId ?? null, input.creativeId ?? null, input.userId ?? null, input.cpcMicros]
    ).catch(() => undefined)
  }

  async getMetrics(ctx: TenantContext, campaignId: string, from: Date, to: Date): Promise<CampaignMetrics[]> {
    const rows = await queryT<any>(
      ctx,
      `SELECT date_trunc('day', occurred_at) AS bucket,
              COUNT(*) FILTER (WHERE _table = 'imp')::bigint AS impressions,
              COUNT(*) FILTER (WHERE _table = 'click')::bigint AS clicks,
              COUNT(*) FILTER (WHERE _table = 'conv')::bigint AS conversions,
              SUM(cost_micros) FILTER (WHERE _table = 'click') AS spend_micros,
              SUM(conversion_value_micros) FILTER (WHERE _table = 'conv') AS revenue_micros
       FROM (
         SELECT occurred_at, cost_micros, NULL::bigint AS conversion_value_micros, 'imp' AS _table FROM advertising.ads_impression_log WHERE campaign_id = $1 AND occurred_at BETWEEN $2 AND $3
         UNION ALL
         SELECT occurred_at, cost_micros, NULL, 'click' FROM advertising.ads_click_log WHERE campaign_id = $1 AND occurred_at BETWEEN $2 AND $3
         UNION ALL
         SELECT occurred_at, 0, value_micros, 'conv' FROM advertising.ads_conversion_log WHERE campaign_id = $1 AND occurred_at BETWEEN $2 AND $3
       ) e
       GROUP BY bucket ORDER BY bucket`,
      [campaignId, from, to]
    )
    return rows.map((r) => {
      const imps = Number(r.impressions)
      const clicks = Number(r.clicks)
      const spend = BigInt(r.spend_micros ?? 0)
      const revenue = BigInt(r.revenue_micros ?? 0)
      return {
        campaignId, bucket: r.bucket, impressions: imps, clicks, conversions: Number(r.conversions),
        spendMinor: spend, revenueMinor: revenue,
        cpc: clicks ? Number(spend) / clicks / 1_000_000 : 0,
        ctr: imps ? clicks / imps : 0,
        roas: spend ? Number(revenue) / Number(spend) : 0,
      }
    })
  }
}

function mapCampaign(r: any): AdCampaign {
  return {
    id: r.id, tenantId: r.tenant_id, supplierId: r.supplier_id, name: r.name,
    objective: r.objective, status: r.status,
    budgetTotalMinor: BigInt(r.budget_total_minor),
    budgetDailyMinor: r.budget_daily_minor ? BigInt(r.budget_daily_minor) : undefined,
    currency: r.currency, startDate: r.start_date, endDate: r.end_date,
    bidStrategy: r.bid_strategy, targetRoas: r.target_roas, targetCpa: r.target_cpa,
    metadata: r.metadata ?? {},
  }
}
function mapGroup(r: any): AdGroup {
  return {
    id: r.id, campaignId: r.campaign_id, name: r.name,
    targeting: r.targeting ?? {}, defaultBidMinor: BigInt(r.default_bid_minor), status: r.status,
  }
}
function mapCreative(r: any): AdCreative {
  return {
    id: r.id, adGroupId: r.ad_group_id, format: r.format,
    headline: r.headline, description: r.description, imageUrl: r.image_url, videoUrl: r.video_url,
    ctaText: r.cta_text, landingUrl: r.landing_url, reviewStatus: r.review_status,
  }
}

export default MarketingAdsService
