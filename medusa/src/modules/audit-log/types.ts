export interface AuditEvent {
  id: string
  tenantId: string
  occurredAt: Date
  actorUserId?: string | null
  actorIp?: string
  actorUserAgent?: string
  actionCode: string
  resourceType: string
  resourceId?: string
  beforeState?: unknown
  afterState?: unknown
  severity: "info" | "low" | "medium" | "high" | "critical"
  outcome: "success" | "failure" | "denied"
  correlationId?: string
  metadata?: Record<string, unknown>
}

export interface AuditQueryFilter {
  tenantId?: string
  actorUserId?: string
  resourceType?: string
  resourceId?: string
  actionCode?: string
  severity?: string
  from?: Date
  to?: Date
  limit?: number
  offset?: number
}

export interface AggregateSnapshot {
  resourceType: string
  resourceId: string
  asOfVersion: number
  state: unknown
  builtAt: Date
}
