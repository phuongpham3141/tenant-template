import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"
import AiLivestreamService from "../modules/ai-livestream/service"
import { AI_LIVESTREAM_MODULE } from "../modules/ai-livestream"
import { enqueueDirectorTick } from "../workers/ai-director-worker"

export default async function ai247Scheduler(container: MedusaContainer) {
  const sys = adminContext(process.env.SYSTEM_TENANT_ID ?? "")
  const tenants = await queryT<{ id: string }>(sys, `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])

  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const svc = container.resolve<AiLivestreamService>(AI_LIVESTREAM_MODULE)
    const due = await svc.findDueSchedules(ctx)
    for (const sch of due) {
      if (!sch.currentScriptId) continue

      // Find or create director session for this stream + current script
      let session = await queryT<any>(
        ctx,
        `SELECT * FROM live.ai_director_session
         WHERE stream_id = $1 AND script_id = $2 AND status IN ('running','paused','initializing')
         ORDER BY started_at DESC LIMIT 1`,
        [sch.streamId, sch.currentScriptId]
      )

      if (session.length === 0) {
        const stream = await queryT<any>(ctx, `SELECT persona_id FROM live.livestream WHERE id = $1`, [sch.streamId])
        if (!stream[0]?.persona_id) {
          container.resolve("logger").warn(`247-scheduler: stream ${sch.streamId} has no persona; skip`)
          continue
        }
        const newSession = await svc.startDirectorSession(ctx, {
          streamId: sch.streamId,
          scriptId: sch.currentScriptId,
          personaId: stream[0].persona_id,
        })
        await enqueueDirectorTick(t.id, newSession.id, 0)
      } else if (session[0].status === "paused") {
        await svc.updateDirector(ctx, session[0].id, { status: "running" })
        await enqueueDirectorTick(t.id, session[0].id, 0)
      }

      // Advance schedule: rotate to next script in playlist
      const nextIndex = sch.scheduleType === "loop"
        ? sch.currentScriptIndex
        : (sch.currentScriptIndex + 1) % sch.scriptIds.length
      const nextCheck = new Date(Date.now() + 60_000)
      await svc.advanceSchedule(ctx, sch.id, nextIndex, nextCheck)
    }
  }
}

export const config = {
  name: "ai-247-scheduler",
  schedule: "* * * * *",
}
