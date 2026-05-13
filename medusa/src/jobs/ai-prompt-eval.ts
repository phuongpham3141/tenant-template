import type { MedusaContainer } from "@medusajs/framework"
import { queryT } from "../lib/db/pg"
import { adminContext } from "../lib/tenant/context"

export default async function aiPromptEval(container: MedusaContainer) {
  // Sample recent AI inferences and queue them for human evaluation.
  const tenants = await queryT<{ id: string }>(adminContext(process.env.SYSTEM_TENANT_ID ?? ""), `SELECT id FROM admin.tenant WHERE status = 'active'`, []).catch(() => [])
  for (const t of tenants) {
    const ctx = adminContext(t.id)
    const samples = await queryT<{ id: string; model_id: string; feature_code: string }>(
      ctx,
      `SELECT id, model_id, feature_code FROM ai.inference_log
       WHERE occurred_at > NOW() - INTERVAL '24 hours' AND success = TRUE
       ORDER BY RANDOM() LIMIT 20`, []
    ).catch(() => [])
    for (const s of samples) {
      await queryT(ctx, `INSERT INTO ai.evaluation_queue (id, tenant_id, inference_log_id, model_id, feature_code, status, queued_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, 'pending', NOW())
       ON CONFLICT (inference_log_id) DO NOTHING`,
        [ctx.tenantId, s.id, s.model_id, s.feature_code]
      ).catch(() => undefined)
    }
  }
}

export const config = {
  name: "ai-prompt-eval",
  schedule: "0 2 * * *",
}
