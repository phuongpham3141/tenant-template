import { api } from "../../api/client"

export type Locale = "vi" | "en" | "cn"
export type LivestreamMode = "human" | "ai_segment" | "ai_continuous"

export interface AudioTrack {
  locale: Locale
  hls_url: string
  status: "active" | "degraded" | "stopped"
  bitrate_kbps: number
  last_chunk_at: string | null
}

export interface AiStreamMeta {
  stream_id: string
  mode: LivestreamMode | null
  persona_id: string | null
  status: string | null
  locales_simulcast: Locale[]
  audio_tracks: AudioTrack[]
}

export const aiLivestreamApi = {
  async getAudioTracks(streamId: string): Promise<AiStreamMeta> {
    return api<AiStreamMeta>(`/store/ai-livestream/${streamId}/audio-tracks`, {
      next: { revalidate: 5, tags: [`ai-livestream:${streamId}`] },
    })
  },

  async sendChat(streamId: string, input: { message: string; locale?: Locale }): Promise<{ accepted: boolean; session_id: string }> {
    return api(`/store/ai-livestream/${streamId}/chat`, {
      method: "POST",
      body: input,
    })
  },
}
