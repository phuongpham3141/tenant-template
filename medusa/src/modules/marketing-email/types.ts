export interface EmailSegment {
  id: string
  tenantId: string
  name: string
  description?: string
  filterDsl: Record<string, unknown>
  estimatedSize?: number
  refreshIntervalMin: number
  lastBuiltAt?: Date
}

export interface EmailJourney {
  id: string
  tenantId: string
  name: string
  trigger: { event: string; conditions?: Record<string, unknown> }
  status: "draft" | "active" | "paused" | "archived"
  steps: JourneyStep[]
}

export interface JourneyStep {
  id: string
  journeyId: string
  order: number
  type: "send_email" | "send_sms" | "wait" | "condition" | "branch" | "end"
  config: Record<string, unknown>
  waitDurationMinutes?: number
}

export interface EmailCampaign {
  id: string
  tenantId: string
  name: string
  templateCode: string
  segmentId?: string
  scheduledAt?: Date
  sentAt?: Date
  status: "draft" | "scheduled" | "sending" | "sent" | "cancelled"
  abVariants?: Array<{ subject: string; previewText?: string; weight: number }>
  winnerMetric?: "open_rate" | "click_rate" | "conversion"
  sentCount: number
  openedCount: number
  clickedCount: number
}
