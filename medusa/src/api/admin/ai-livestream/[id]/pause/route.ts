import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { resolveTenant } from "../../../../../lib/tenant/context"
import { queryT } from "../../../../../lib/db/pg"
import { stopMux } from "../../../../../modules/ai-livestream/simulcast-mux"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const streamId = req.params.id
  const stop = (req.query.stop ?? "false") === "true"

  const sessions = await queryT<any>(
    ctx,
    `UPDATE live.ai_director_session
     SET status = $1, paused_at = NOW()
     WHERE stream_id = $2 AND status IN ('running','initializing')
     RETURNING id`,
    [stop ? "ended" : "paused", streamId]
  )

  await queryT(
    ctx,
    `UPDATE live.broadcast_schedule SET paused = TRUE, pause_reason = $1, updated_at = NOW() WHERE stream_id = $2 AND paused = FALSE`,
    [stop ? "manual_stop" : "manual_pause", streamId]
  ).catch(() => undefined)

  if (stop) stopMux(streamId)
  return res.json({ paused_sessions: sessions.length, stopped: stop })
}
