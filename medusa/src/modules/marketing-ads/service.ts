/**
 * Marketing-ads module service (minimal stub)
 *
 * Sprint 11 Pha 2d Module 2 (D34 Path D drop)
 *
 * STATUS: All 8 service methods dropped:
 * - createCampaign, transitionCampaign, createAdGroup, createCreative,
 *   recordImpression, recordClick, getMetrics
 * - 3/5 INSERT target tables MISSING (ad_campaign + ad_creative + ad_group)
 *   + 2 existing (ads_click_log, ads_impression_log)
 * - UPDATE ad_campaign in transitionCampaign also broken
 * - L27 verified 0 UI consumers + 0 cascade
 *
 * Schema advertising.* PRESERVED (44 tables).
 *
 * Sprint 12+ TODO (LOW priority):
 * - Rewrite when ad campaign builder feature drives
 * - Pattern reference: Pha 2a communication
 */

import { MedusaService } from "@medusajs/framework/utils"

class MarketingAdsService extends MedusaService({}) {
  // STUB: All 8 methods dropped Sprint 11 Pha 2d Module 2 (D34).
}

export default MarketingAdsService
