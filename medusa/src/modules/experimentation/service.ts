import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import type { Experiment, Variant, ExperimentExposure, ExperimentMetricValue } from "./types"
import crypto from "crypto"

class ExperimentationService extends MedusaService({}) {
  async create(ctx: TenantContext, input: Omit<Experiment, "id" | "tenantId" | "variants"> & { variants: Omit<Variant, "id" | "experimentId">[] }): Promise<Experiment> {
    const expRows = await queryT<any>(
      ctx,
      `INSERT INTO experiment.experiment (id, tenant_id, code, name, status, traffic_allocation,
         primary_metric, secondary_metrics, segmentation, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6, $7::text[], $8::jsonb, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.code, input.name, input.status, input.trafficAllocation, input.primaryMetric, input.secondaryMetrics, JSON.stringify(input.segmentation ?? {})]
    )
    const variants: Variant[] = []
    for (const v of input.variants) {
      const vr = await queryT<any>(
        ctx,
        `INSERT INTO experiment.variant (id, experiment_id, code, name, weight, is_control, config, created_at)
         VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6::jsonb, NOW()) RETURNING *`,
        [expRows[0].id, v.code, v.name, v.weight, v.isControl, JSON.stringify(v.config ?? {})]
      )
      variants.push({ id: vr[0].id, experimentId: expRows[0].id, code: v.code, name: v.name, weight: v.weight, isControl: v.isControl, config: v.config })
    }
    return { ...mapExperiment(expRows[0]), variants }
  }

  async assign(ctx: TenantContext, experimentCode: string, anonymousId: string, userId?: string): Promise<Variant | null> {
    const exp = await queryT<any>(ctx, `SELECT * FROM experiment.experiment WHERE code = $1 AND status = 'running'`, [experimentCode])
    if (!exp[0]) return null
    const variants = await queryT<any>(ctx, `SELECT * FROM experiment.variant WHERE experiment_id = $1`, [exp[0].id])
    const seed = userId ?? anonymousId
    const hash = parseInt(crypto.createHash("sha256").update(`${exp[0].id}:${seed}`).digest("hex").slice(0, 8), 16)
    const bucket = (hash % 10000) / 100
    if (bucket >= Number(exp[0].traffic_allocation)) return null
    let acc = 0
    const totalWeight = variants.reduce((s, v) => s + Number(v.weight), 0)
    const norm = bucket * totalWeight / Number(exp[0].traffic_allocation)
    let chosen = variants[0]
    for (const v of variants) {
      acc += Number(v.weight)
      if (norm < acc) { chosen = v; break }
    }
    await queryT(
      ctx,
      `INSERT INTO experiment.exposure (id, tenant_id, experiment_id, variant_id, user_id, anonymous_id, occurred_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, NOW())`,
      [ctx.tenantId, exp[0].id, chosen.id, userId ?? null, anonymousId]
    ).catch(() => undefined)
    return {
      id: chosen.id, experimentId: chosen.experiment_id, code: chosen.code, name: chosen.name,
      weight: Number(chosen.weight), isControl: chosen.is_control, config: chosen.config ?? {},
    }
  }

  async trackMetric(ctx: TenantContext, experimentId: string, variantId: string, metric: string, value: number, userId?: string): Promise<void> {
    await queryT(
      ctx,
      `INSERT INTO experiment.metric_event (id, tenant_id, experiment_id, variant_id, metric, value, user_id, occurred_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6, NOW())`,
      [ctx.tenantId, experimentId, variantId, metric, value, userId ?? null]
    )
  }

  async computeStats(ctx: TenantContext, experimentId: string, metric: string): Promise<ExperimentMetricValue[]> {
    const rows = await queryT<any>(
      ctx,
      `SELECT variant_id, COUNT(*)::bigint AS count, SUM(value)::numeric AS sum, AVG(value)::numeric AS mean, STDDEV_POP(value)::numeric AS std_dev
       FROM experiment.metric_event
       WHERE experiment_id = $1 AND metric = $2
       GROUP BY variant_id`,
      [experimentId, metric]
    )
    const control = rows.find((r) => Boolean(r.is_control))
    return rows.map((r) => ({
      experimentId, variantId: r.variant_id, metric,
      count: Number(r.count), sum: Number(r.sum ?? 0), mean: Number(r.mean ?? 0), stdDev: Number(r.std_dev ?? 0),
      liftPct: control && control.mean ? ((Number(r.mean) - Number(control.mean)) / Number(control.mean)) * 100 : undefined,
    }))
  }
}

function mapExperiment(r: any): Experiment {
  return {
    id: r.id, tenantId: r.tenant_id, code: r.code, name: r.name, status: r.status,
    trafficAllocation: Number(r.traffic_allocation), startedAt: r.started_at, endedAt: r.ended_at,
    primaryMetric: r.primary_metric, secondaryMetrics: r.secondary_metrics ?? [],
    variants: [], segmentation: r.segmentation ?? {},
  }
}

export default ExperimentationService
