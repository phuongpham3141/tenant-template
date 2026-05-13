import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { resolveTenant } from "../../../../lib/tenant/context"
import { queryT } from "../../../../lib/db/pg"
import AiLivestreamService from "../../../../modules/ai-livestream/service"
import { AI_LIVESTREAM_MODULE } from "../../../../modules/ai-livestream"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const personaId = req.query.persona_id as string | undefined
  const params: unknown[] = []
  let where = "WHERE deleted_at IS NULL"
  if (personaId) { params.push(personaId); where += ` AND persona_id = $${params.length}` }
  params.push(Math.min(Number(req.query.limit ?? 50), 200))
  const rows = await queryT<any>(
    ctx,
    `SELECT * FROM live.ai_stream_script ${where} ORDER BY created_at DESC LIMIT $${params.length}`,
    params
  )
  return res.json({ scripts: rows })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const svc = req.scope.resolve<AiLivestreamService>(AI_LIVESTREAM_MODULE)
  const body = req.body as { script: any; segments?: any[]; transitions?: any[] }
  const script = await svc.createScript(ctx, body.script)
  const segIdMap = new Map<string, string>() // tempId → real id
  if (body.segments) {
    for (const seg of body.segments) {
      const created = await svc.addSegment(ctx, script.id, seg)
      if (seg.temp_id) segIdMap.set(seg.temp_id, created.id)
    }
  }
  if (body.transitions) {
    for (const t of body.transitions) {
      await svc.addTransition(ctx, {
        fromSegmentId: segIdMap.get(t.from_temp_id) ?? t.from_segment_id,
        toSegmentId: segIdMap.get(t.to_temp_id) ?? t.to_segment_id,
        condition: t.condition ?? {},
        weight: t.weight ?? 1,
        priority: t.priority ?? 100,
        description: t.description,
      })
    }
  }
  if (body.script?.start_segment_temp_id && segIdMap.has(body.script.start_segment_temp_id)) {
    await svc.setStartSegment(ctx, script.id, segIdMap.get(body.script.start_segment_temp_id)!)
  }
  return res.status(201).json({ script })
}
