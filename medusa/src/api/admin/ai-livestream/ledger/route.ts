import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { resolveTenant } from "../../../../lib/tenant/context"
import { queryT } from "../../../../lib/db/pg"
import { checkMonthlyQuota } from "../../../../modules/ai-livestream/cost-ledger"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const streamId = req.query.stream_id as string | undefined
  const from = req.query.from ? new Date(req.query.from as string) : new Date(Date.now() - 30 * 86400_000)
  const to = req.query.to ? new Date(req.query.to as string) : new Date()

  const params: unknown[] = [from, to]
  let where = `WHERE occurred_at BETWEEN $1 AND $2`
  if (streamId) { params.push(streamId); where += ` AND stream_id = $${params.length}` }

  const [rollup, latest, quota] = await Promise.all([
    queryT<any>(
      ctx,
      `SELECT resource_type, provider, SUM(units) AS units, SUM(total_micros)::text AS total_micros, COUNT(*) AS events
       FROM live.ai_compute_ledger ${where}
       GROUP BY resource_type, provider
       ORDER BY total_micros DESC`,
      params
    ),
    queryT<any>(
      ctx,
      `SELECT * FROM live.ai_compute_ledger ${where} ORDER BY occurred_at DESC LIMIT 50`,
      params
    ),
    checkMonthlyQuota(ctx),
  ])

  return res.json({
    rollup,
    latest,
    monthly_quota: {
      consumed_micros: quota.consumed.toString(),
      quota_micros: quota.quota.toString(),
      remaining_micros: quota.remaining.toString(),
      percent_used: quota.percentUsed,
      is_over_quota: quota.isOverQuota,
      is_approaching_limit: quota.isApproachingLimit,
    },
  })
}
