export interface Experiment {
  id: string
  tenantId: string
  code: string
  name: string
  status: "draft" | "running" | "paused" | "stopped" | "completed"
  trafficAllocation: number
  startedAt?: Date
  endedAt?: Date
  primaryMetric: string
  secondaryMetrics: string[]
  variants: Variant[]
  segmentation?: Record<string, unknown>
}

export interface Variant {
  id: string
  experimentId: string
  code: string
  name: string
  weight: number
  isControl: boolean
  config: Record<string, unknown>
}

export interface ExperimentExposure {
  id: string
  experimentId: string
  variantId: string
  userId?: string
  anonymousId?: string
  occurredAt: Date
}

export interface ExperimentMetricValue {
  experimentId: string
  variantId: string
  metric: string
  count: number
  sum: number
  mean: number
  stdDev: number
  pValue?: number
  liftPct?: number
}
