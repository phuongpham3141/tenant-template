import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { queryT } from "../../../../../lib/db/pg"
import { resolveTenant } from "../../../../../lib/tenant/context"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const streamId = req.params.id
  const rows = await queryT<any>(
    ctx,
    `SELECT locale, hls_url, status, bitrate_kbps, last_chunk_at
     FROM live.stream_audio_track
     WHERE stream_id = $1 AND status IN ('active','degraded')
     ORDER BY locale`,
    [streamId]
  )
  const stream = await queryT<any>(
    ctx,
    `SELECT mode, persona_id, locales_simulcast, status FROM live.livestream WHERE id = $1`,
    [streamId]
  )
  return res.json({
    stream_id: streamId,
    mode: stream[0]?.mode ?? null,
    persona_id: stream[0]?.persona_id ?? null,
    status: stream[0]?.status ?? null,
    locales_simulcast: stream[0]?.locales_simulcast ?? [],
    audio_tracks: rows.map((r) => ({
      locale: r.locale,
      hls_url: r.hls_url,
      status: r.status,
      bitrate_kbps: r.bitrate_kbps,
      last_chunk_at: r.last_chunk_at,
    })),
  })
}
