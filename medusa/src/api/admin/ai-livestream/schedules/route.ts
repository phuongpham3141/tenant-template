import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { resolveTenant } from "../../../../lib/tenant/context"
import { queryT } from "../../../../lib/db/pg"
import AiLivestreamService from "../../../../modules/ai-livestream/service"
import { AI_LIVESTREAM_MODULE } from "../../../../modules/ai-livestream"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const streamId = req.query.stream_id as string | undefined
  const params: unknown[] = []
  let where = "WHERE 1=1"
  if (streamId) { params.push(streamId); where += ` AND stream_id = $${params.length}` }
  const rows = await queryT<any>(
    ctx,
    `SELECT * FROM live.broadcast_schedule ${where} ORDER BY created_at DESC LIMIT 100`,
    params
  )
  return res.json({ schedules: rows })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const svc = req.scope.resolve<AiLivestreamService>(AI_LIVESTREAM_MODULE)
  const sched = await svc.createSchedule(ctx, req.body as any)
  return res.status(201).json({ schedule: sched })
}
