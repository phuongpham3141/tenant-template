export type StreamStatus = "scheduled" | "live" | "paused" | "ended" | "vod" | "archived"

export interface LiveStream {
  id: string
  tenantId: string
  supplierId: string
  hostUserId: string
  title: string
  scheduledStartAt: Date
  startedAt?: Date | null
  endedAt?: Date | null
  status: StreamStatus
  rtmpIngestUrl?: string
  hlsPlaybackUrl?: string
  thumbnailUrl?: string
  recordingUrl?: string
  peakConcurrentViewers: number
  totalUniqueViewers: number
  totalRevenueMinor: bigint
  currency: string
  metadata?: Record<string, unknown>
}

export interface StreamFeaturedProduct {
  streamId: string
  productId: string
  pinnedAt?: Date | null
  priceMinor: bigint
  currency: string
  discountPct?: number
  stockReserved: number
  displayOrder: number
}

export interface StreamGift {
  id: string
  streamId: string
  userId: string
  giftType: string
  quantity: number
  valueMinor: bigint
  currency: string
  message?: string
  occurredAt: Date
}

export interface FlashAuction {
  id: string
  streamId: string
  productId: string
  startingPriceMinor: bigint
  reservePriceMinor: bigint
  currency: string
  durationSeconds: number
  startedAt: Date
  endedAt?: Date
  winnerUserId?: string
  winningBidMinor?: bigint
}

export interface LuckyDraw {
  id: string
  streamId: string
  prize: string
  prizeValueMinor?: bigint
  participantCount: number
  drawnAt?: Date
  winnerUserIds: string[]
  status: "open" | "drawn" | "cancelled"
}
