import { IntegrationError } from "../../../lib/errors"
import type { AvatarProvider, AvatarRenderRequest, AvatarRenderResult } from "."

const API_KEY = process.env.DID_API_KEY ?? ""
const BASE = "https://api.d-id.com"
const POLL_INTERVAL_MS = 2500
const TIMEOUT_MS = 90_000
const COST_PER_MINUTE_MICROS = 120_000n // $0.12/min

export const didAvatar: AvatarProvider = {
  id: "did",
  supportsRealtime: true,
  async render(req: AvatarRenderRequest): Promise<AvatarRenderResult> {
    if (!API_KEY) throw new IntegrationError("did", "DID_API_KEY missing")
    const auth = `Basic ${Buffer.from(API_KEY + ":").toString("base64")}`
    const create = await fetch(`${BASE}/talks`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        source_url: req.providerAssetId,
        script: { type: "audio", audio_url: req.audioUrl },
        config: { fluent: true, pad_audio: 0, stitch: true },
      }),
    })
    if (!create.ok) throw new IntegrationError("did", `create ${create.status} ${await create.text()}`)
    const cj = await create.json() as any
    const id = cj.id
    if (!id) throw new IntegrationError("did", `no id: ${JSON.stringify(cj)}`)

    const start = Date.now()
    while (Date.now() - start < TIMEOUT_MS) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
      const status = await fetch(`${BASE}/talks/${id}`, { headers: { Authorization: auth } })
      if (!status.ok) continue
      const sj = await status.json() as any
      if (sj.status === "done") {
        const minutes = Math.max(1, Math.round(req.audioDurationMs / 60000))
        return {
          videoUrl: sj.result_url,
          durationMs: req.audioDurationMs,
          frameCount: Math.round((req.audioDurationMs / 1000) * 25),
          costMicros: BigInt(minutes) * COST_PER_MINUTE_MICROS,
          gpuSeconds: Math.round(req.audioDurationMs / 1000),
        }
      }
      if (sj.status === "error" || sj.status === "rejected") {
        throw new IntegrationError("did", `render ${sj.status}: ${sj.error?.description ?? "unknown"}`)
      }
    }
    throw new IntegrationError("did", "render timeout")
  },
}
