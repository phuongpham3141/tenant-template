import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { resolveTenant } from "../../../../../lib/tenant/context"
import AiLivestreamService from "../../../../../modules/ai-livestream/service"
import { AI_LIVESTREAM_MODULE } from "../../../../../modules/ai-livestream"
import { enqueueDirectorTick } from "../../../../../workers/ai-director-worker"
import { queryT } from "../../../../../lib/db/pg"
import { checkMonthlyQuota } from "../../../../../modules/ai-livestream/cost-ledger"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const streamId = req.params.id
  const body = req.body as { script_id: string; persona_id: string; locales?: ("vi" | "en" | "cn")[] }
  if (!body.script_id || !body.persona_id) {
    return res.status(400).json({ error: "script_id_and_persona_id_required" })
  }

  const quota = await checkMonthlyQuota(ctx)
  if (quota.isOverQuota) {
    return res.status(402).json({ error: "quota_exceeded", percent_used: quota.percentUsed })
  }

  await queryT(
    ctx,
    `UPDATE live.livestream
     SET mode = COALESCE(NULLIF(mode, 'human'), 'ai_continuous'), persona_id = $1, active_script_id = $2,
         locales_simulcast = $3::text[], updated_at = NOW()
     WHERE id = $4`,
    [body.persona_id, body.script_id, body.locales ?? ["vi", "en", "cn"], streamId]
  )

  const svc = req.scope.resolve<AiLivestreamService>(AI_LIVESTREAM_MODULE)
  const session = await svc.startDirectorSession(ctx, { streamId, scriptId: body.script_id, personaId: body.persona_id })
  await enqueueDirectorTick(ctx.tenantId, session.id, 0)
  return res.status(201).json({ session })
}
