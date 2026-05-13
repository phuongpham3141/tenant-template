import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { resolveTenant } from "../../../../lib/tenant/context"
import AiLivestreamService from "../../../../modules/ai-livestream/service"
import { AI_LIVESTREAM_MODULE } from "../../../../modules/ai-livestream"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const svc = req.scope.resolve<AiLivestreamService>(AI_LIVESTREAM_MODULE)
  const personas = await svc.listPersonas(ctx, {
    supplierId: req.query.supplier_id as string | undefined,
    status: req.query.status as string | undefined,
    limit: Number(req.query.limit ?? 50),
  })
  return res.json({ personas })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const svc = req.scope.resolve<AiLivestreamService>(AI_LIVESTREAM_MODULE)
  const persona = await svc.createPersona(ctx, req.body as any)
  return res.status(201).json({ persona })
}
