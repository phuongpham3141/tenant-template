import { queryT, type TenantContext } from "../../lib/db/pg"
import type { ComputeLedgerEntry } from "./types"

export async function writeLedger(ctx: TenantContext, entry: ComputeLedgerEntry): Promise<void> {
  await queryT(
    ctx,
    `INSERT INTO live.ai_compute_ledger (
       id, tenant_id, stream_id, director_session_id, persona_id,
       resource_type, provider, units, unit_label, unit_micros, total_micros, occurred_at, metadata
     ) VALUES (
       public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), $11::jsonb
     )`,
    [
      ctx.tenantId, entry.streamId ?? null, entry.directorSessionId ?? null, entry.personaId ?? null,
      entry.resourceType, entry.provider ?? null, entry.units, entry.unitLabel,
      String(entry.unitMicros), String(entry.totalMicros), JSON.stringify(entry.metadata ?? {}),
    ]
  ).catch(() => undefined)
}

export interface QuotaCheckResult {
  consumed: bigint
  quota: bigint
  remaining: bigint
  percentUsed: number
  isOverQuota: boolean
  isApproachingLimit: boolean // > 80%
}

export async function checkMonthlyQuota(ctx: TenantContext): Promise<QuotaCheckResult> {
  const consumedRows = await queryT<{ total: string }>(
    ctx,
    `SELECT COALESCE(SUM(total_micros)::text, '0') AS total
     FROM live.ai_compute_ledger
     WHERE tenant_id = $1 AND occurred_at >= date_trunc('month', NOW())`,
    [ctx.tenantId]
  ).catch(() => [{ total: "0" }])
  const consumed = BigInt(consumedRows[0]?.total ?? "0")

  // Quota is in gpu_seconds equivalent; convert ledger micros (USD) at $0.50/gpu-second baseline
  const planRows = await queryT<{ features: any }>(
    { tenantId: ctx.tenantId, bypassRls: true },
    `SELECT sp.features FROM admin.tenant t JOIN admin.subscription_plan sp ON sp.code = t.plan_tier WHERE t.id = $1`,
    [ctx.tenantId]
  ).catch(() => [])
  const gpuSecondsQuota = BigInt(planRows[0]?.features?.gpu_seconds_quota_month ?? 0)
  const quotaMicros = gpuSecondsQuota * 500_000n // $0.50 per gpu-second
  const remaining = quotaMicros > consumed ? quotaMicros - consumed : 0n
  const percentUsed = quotaMicros === 0n ? 100 : Number((consumed * 100n) / quotaMicros)

  return {
    consumed,
    quota: quotaMicros,
    remaining,
    percentUsed,
    isOverQuota: quotaMicros > 0n && consumed >= quotaMicros,
    isApproachingLimit: percentUsed >= 80,
  }
}

export async function tenantsOverQuota(): Promise<string[]> {
  const rows = await queryT<{ tenant_id: string; total: string; quota_seconds: number }>(
    { tenantId: "", bypassRls: true },
    `SELECT l.tenant_id,
            COALESCE(SUM(l.total_micros)::text, '0') AS total,
            COALESCE((sp.features->>'gpu_seconds_quota_month')::bigint, 0) AS quota_seconds
     FROM live.ai_compute_ledger l
     JOIN admin.tenant t ON t.id = l.tenant_id
     JOIN admin.subscription_plan sp ON sp.code = t.plan_tier
     WHERE l.occurred_at >= date_trunc('month', NOW())
     GROUP BY l.tenant_id, sp.features
     HAVING COALESCE(SUM(l.total_micros), 0) >= COALESCE((sp.features->>'gpu_seconds_quota_month')::bigint, 0) * 500000`,
    []
  ).catch(() => [])
  return rows.map((r) => r.tenant_id)
}
