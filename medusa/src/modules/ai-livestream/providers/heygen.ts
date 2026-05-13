import { IntegrationError } from "../../../lib/errors"
import type { AvatarProvider, AvatarRenderRequest, AvatarRenderResult } from "."

const API_KEY = process.env.HEYGEN_API_KEY ?? ""
const BASE = "https://api.heygen.com/v2"
const POLL_INTERVAL_MS = 3000
const TIMEOUT_MS = 120_000
const COST_PER_MINUTE_MICROS = 150_000n // $0.15/min

export const heygenAvatar: AvatarProvider = {
  id: "heygen",
  supportsRealtime: true,
  async render(req: AvatarRenderRequest): Promise<AvatarRenderResult> {
    if (!API_KEY) throw new IntegrationError("heygen", "HEYGEN_API_KEY missing")
    const create = await fetch(`${BASE}/video/generate`, {
      method: "POST",
      headers: { "X-Api-Key": API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        video_inputs: [{
          character: { type: "avatar", avatar_id: req.providerAssetId, avatar_style: "normal" },
          voice: { type: "audio", audio_url: req.audioUrl },
          background: { type: "color", value: "#ffffff" },
        }],
        dimension: req.aspectRatio === "9:16"
          ? { width: 1080, height: 1920 }
          : req.aspectRatio === "1:1"
          ? { width: 1080, height: 1080 }
          : { width: 1920, height: 1080 },
      }),
    })
    if (!create.ok) throw new IntegrationError("heygen", `create ${create.status} ${await create.text()}`)
    const cj = await create.json() as any
    const videoId = cj.data?.video_id
    if (!videoId) throw new IntegrationError("heygen", `no video_id: ${JSON.stringify(cj)}`)

    const start = Date.now()
    while (Date.now() - start < TIMEOUT_MS) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
      const status = await fetch(`${BASE}/video_status.get?video_id=${videoId}`, { headers: { "X-Api-Key": API_KEY } })
      if (!status.ok) continue
      const sj = await status.json() as any
      const s = sj.data?.status
      if (s === "completed") {
        const minutes = Math.max(1, Math.round(req.audioDurationMs / 60000))
        return {
          videoUrl: sj.data.video_url,
          durationMs: sj.data.duration ? Math.round(sj.data.duration * 1000) : req.audioDurationMs,
          frameCount: sj.data.frame_count ?? Math.round((req.audioDurationMs / 1000) * 30),
          costMicros: BigInt(minutes) * COST_PER_MINUTE_MICROS,
          gpuSeconds: Math.round(req.audioDurationMs / 1000),
        }
      }
      if (s === "failed") throw new IntegrationError("heygen", `render failed: ${sj.data?.error?.message ?? "unknown"}`)
    }
    throw new IntegrationError("heygen", "render timeout")
  },
}
