import { api } from "../../api/client"

export interface StreamCard {
  id: string
  supplier_id: string
  supplier_name?: string
  title: string
  thumbnail_url?: string
  status: "scheduled" | "live" | "paused" | "ended" | "vod"
  scheduled_start_at: string
  started_at?: string
  peak_concurrent_viewers: number
  total_unique_viewers: number
}

export interface StreamDetail extends StreamCard {
  hls_playback_url?: string
  recording_url?: string
  featured_products: Array<{ product_id: string; price_minor: string; currency: string; discount_pct?: number; stock_reserved: number; display_order: number }>
  currency: string
}

export const livestreamApi = {
  liveNow: () => api<{ streams: StreamCard[] }>("/store/livestreams/live-now"),
  upcoming: (limit = 20) => api<{ streams: StreamCard[] }>("/store/livestreams/upcoming", { query: { limit } }),
  get: (id: string) => api<{ stream: StreamDetail }>(`/store/livestreams/${id}`),
  follow: (streamId: string) => api(`/store/livestreams/${streamId}/follow`, { method: "POST" }),
}
