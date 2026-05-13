import type { I18nText } from "../../lib/i18n"

export type Locale = "vi" | "en" | "cn"
export type LivestreamMode = "human" | "ai_segment" | "ai_continuous"

export type SegmentType =
  | "intro" | "product_showcase" | "qa" | "cta" | "auction" | "flash_sale"
  | "break" | "outro" | "transition" | "testimonial" | "news_update" | "poll"

export type DirectorStatus = "initializing" | "running" | "paused" | "quota_paused" | "ended" | "failed"
export type RenderStatus = "queued" | "rendering" | "completed" | "failed" | "cached_hit"

export interface AiPersona {
  id: string
  tenantId: string
  supplierId?: string | null
  slug: string
  displayNameI18n: I18nText
  personaDescriptionI18n: I18nText
  voiceStyle: "friendly_sales" | "formal" | "energetic" | "warm_advisor" | "professional_news" | "casual_streamer"
  primaryLocale: Locale
  supportedLocales: Locale[]
  avatarAssetId?: string | null
  voiceProfileIds: Record<Locale, string>
  brandKitJsonb: Record<string, unknown>
  systemPromptOverride?: string | null
  catchphrases: string[]
  status: "draft" | "training" | "active" | "paused" | "archived"
  createdAt: Date
  metadata: Record<string, unknown>
}

export interface VoiceProfile {
  id: string
  tenantId: string
  personaId: string
  locale: Locale
  provider: "elevenlabs" | "azure" | "coqui" | "openai" | "playht"
  providerVoiceId: string
  sampleAudioUrl?: string | null
  gender?: string
  ageBand?: string
  accent?: string
  isClone: boolean
  trainingStatus: "pending" | "training" | "ready" | "failed"
  trainingError?: string | null
  costPer1kCharsMicros: bigint
}

export interface AvatarAsset {
  id: string
  tenantId: string
  assetType: "2d_talking_head" | "3d_full_body" | "generated_photo" | "live_actor_capture"
  provider: "heygen" | "did" | "synthesia" | "local_wav2lip" | "custom"
  providerAssetId?: string | null
  displayName: string
  thumbnailUrl?: string | null
  idleLoopUrl?: string | null
  baseVideoUrl?: string | null
  resolution: string
  aspectRatio: "16:9" | "9:16" | "1:1" | "4:3"
  costPerMinuteMicros: bigint
  readyForRealtime: boolean
  metadata: Record<string, unknown>
}

export interface AiStreamScript {
  id: string
  tenantId: string
  supplierId?: string | null
  personaId?: string | null
  name: string
  description?: string | null
  supportedLocales: Locale[]
  totalDurationEstimateSeconds: number
  version: number
  status: "draft" | "approved" | "archived"
  startSegmentId?: string | null
  loopUntilStop: boolean
  metadata: Record<string, unknown>
}

export interface ScriptSegment {
  id: string
  tenantId: string
  scriptId: string
  segmentType: SegmentType
  orderHint: number
  dialogueTemplateI18n: I18nText
  variables: Record<string, unknown>
  durationSecondsEstimate: number
  productId?: string | null
  categoryId?: string | null
  bRollClipIds: string[]
  ctaUrl?: string | null
  metadata: Record<string, unknown>
}

export interface TransitionRule {
  id: string
  fromSegmentId: string
  toSegmentId: string
  condition: TransitionCondition
  weight: number
  priority: number
  description?: string
}

export interface TransitionCondition {
  viewerCountGt?: number
  viewerCountLt?: number
  hourOfDayIn?: number[]
  dayOfWeekIn?: number[]
  productInStock?: boolean
  engagementScoreGt?: number
  loopIterationMod?: { mod: number; eq: number }
  randomFallback?: boolean
}

export interface DirectorSession {
  id: string
  tenantId: string
  streamId: string
  scriptId: string
  personaId: string
  status: DirectorStatus
  currentSegmentId?: string | null
  nextSegmentId?: string | null
  segmentStartedAt?: Date | null
  segmentEndsAt?: Date | null
  loopIteration: number
  viewerCount: number
  engagementScore: number
  decisionsLog: Array<{ at: string; from: string | null; to: string | null; reason: string }>
  gpuSecondsConsumed: bigint
  totalCostMicros: bigint
  startedAt: Date
  pausedAt?: Date | null
  endedAt?: Date | null
  failureReason?: string | null
}

export interface ComputeLedgerEntry {
  tenantId: string
  streamId?: string
  directorSessionId?: string
  personaId?: string
  resourceType: "tts" | "video_render" | "llm_realtime" | "llm_batch" | "avatar_render" | "mux_compute" | "storage_egress"
  provider?: string
  units: number
  unitLabel: string
  unitMicros: bigint
  totalMicros: bigint
  metadata?: Record<string, unknown>
}

export interface BroadcastSchedule {
  id: string
  tenantId: string
  streamId: string
  scheduleType: "loop" | "playlist" | "cron"
  scriptIds: string[]
  currentScriptId?: string | null
  currentScriptIndex: number
  currentLoopIteration: number
  cronExpression?: string | null
  activeHoursJsonb: Record<string, unknown>
  nextCheckAt: Date
  paused: boolean
  pauseReason?: string | null
}

export interface ChatResponseCacheEntry {
  id: string
  personaId: string
  locale: Locale
  questionHash: string
  questionText: string
  responseText: string
  audioUrl?: string | null
  hitCount: number
  expiresAt?: Date | null
}
