export type CampaignStatus = "draft" | "scheduled" | "active" | "paused" | "completed" | "archived"
export type Objective = "awareness" | "traffic" | "engagement" | "leads" | "sales" | "app_install"
export type BidStrategy = "manual_cpc" | "auto_cpc" | "cpm" | "cpa" | "roas"

export interface AdCampaign {
  id: string
  tenantId: string
  supplierId: string
  name: string
  objective: Objective
  status: CampaignStatus
  budgetTotalMinor: bigint
  budgetDailyMinor?: bigint
  currency: string
  startDate: Date
  endDate?: Date
  bidStrategy: BidStrategy
  targetRoas?: number
  targetCpa?: number
  metadata?: Record<string, unknown>
}

export interface AdGroup {
  id: string
  campaignId: string
  name: string
  targeting: {
    locations?: string[]
    languages?: string[]
    interests?: string[]
    industries?: string[]
    audienceIds?: string[]
    deviceTypes?: string[]
    keywords?: string[]
    negativeKeywords?: string[]
  }
  defaultBidMinor: bigint
  status: CampaignStatus
}

export interface AdCreative {
  id: string
  adGroupId: string
  format: "image" | "video" | "carousel" | "collection" | "rich_media"
  headline: string
  description: string
  imageUrl?: string
  videoUrl?: string
  ctaText: string
  landingUrl: string
  reviewStatus: "pending" | "approved" | "rejected"
}

export interface AttributionConfig {
  model: "last_click" | "first_click" | "linear" | "time_decay" | "data_driven"
  windowDays: number
}

export interface CampaignMetrics {
  campaignId: string
  bucket: Date
  impressions: number
  clicks: number
  conversions: number
  spendMinor: bigint
  revenueMinor: bigint
  cpc: number
  ctr: number
  roas: number
}
