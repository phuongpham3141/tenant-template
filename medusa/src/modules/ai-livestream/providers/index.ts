import type { Locale } from "../types"

export interface TtsRequest {
  text: string
  voiceId: string
  locale: Locale
  speed?: number
  format?: "mp3" | "wav" | "ogg" | "opus"
}

export interface TtsResult {
  audioUrl: string
  durationMs: number
  bytes: number
  costMicros: bigint
}

export interface VoiceCloneRequest {
  name: string
  description?: string
  sampleAudioUrls: string[]
  locale: Locale
}

export interface VoiceCloneResult {
  providerVoiceId: string
  status: "ready" | "training" | "failed"
  error?: string
}

export interface TtsProvider {
  id: string
  synthesize(req: TtsRequest): Promise<TtsResult>
  cloneVoice?(req: VoiceCloneRequest): Promise<VoiceCloneResult>
}

export interface AvatarRenderRequest {
  avatarAssetId: string
  providerAssetId: string
  audioUrl: string
  audioDurationMs: number
  resolution?: "720p" | "1080p" | "4k"
  aspectRatio?: "16:9" | "9:16" | "1:1"
}

export interface AvatarRenderResult {
  videoUrl: string
  durationMs: number
  frameCount: number
  costMicros: bigint
  gpuSeconds: number
}

export interface AvatarProvider {
  id: string
  render(req: AvatarRenderRequest): Promise<AvatarRenderResult>
  supportsRealtime: boolean
}

export interface RealtimeChatRequest {
  systemPrompt: string
  message: string
  locale: Locale
  voiceId?: string
  conversationContext?: Array<{ role: "user" | "assistant"; content: string }>
}

export interface RealtimeChatResult {
  responseText: string
  audioUrl?: string
  audioBuffer?: ArrayBuffer
  durationMs?: number
  latencyMs: number
  costMicros: bigint
}

export interface RealtimeChatProvider {
  id: string
  respond(req: RealtimeChatRequest): Promise<RealtimeChatResult>
}

import { elevenLabsTts } from "./elevenlabs"
import { coquiTts } from "./local-coqui"
import { heygenAvatar } from "./heygen"
import { didAvatar } from "./did"
import { wav2lipAvatar } from "./local-wav2lip"
import { openaiRealtimeChat } from "./openai-realtime"

export const ttsProviders: Record<string, TtsProvider> = {
  elevenlabs: elevenLabsTts,
  coqui: coquiTts,
}

export const avatarProviders: Record<string, AvatarProvider> = {
  heygen: heygenAvatar,
  did: didAvatar,
  local_wav2lip: wav2lipAvatar,
}

export const realtimeChatProviders: Record<string, RealtimeChatProvider> = {
  "openai-realtime": openaiRealtimeChat,
}

export function pickTtsProvider(preferred?: string): TtsProvider {
  if (preferred && ttsProviders[preferred]) return ttsProviders[preferred]
  return process.env.ELEVENLABS_API_KEY ? ttsProviders.elevenlabs : ttsProviders.coqui
}

export function pickAvatarProvider(preferred?: string): AvatarProvider {
  if (preferred && avatarProviders[preferred]) return avatarProviders[preferred]
  if (process.env.HEYGEN_API_KEY) return avatarProviders.heygen
  if (process.env.DID_API_KEY) return avatarProviders.did
  return avatarProviders.local_wav2lip
}
