export type ConsentScope = "marketing_email" | "marketing_sms" | "marketing_whatsapp" | "personalization" | "analytics" | "third_party_share" | "cookies_functional" | "cookies_analytics" | "cookies_marketing"
export type DsrType = "access" | "deletion" | "rectification" | "restriction" | "portability" | "objection"
export type DsrStatus = "received" | "verifying_identity" | "in_progress" | "completed" | "rejected" | "expired"

export interface ConsentRecord {
  id: string
  tenantId: string
  userId: string
  scope: ConsentScope
  granted: boolean
  policyVersion: string
  source: "signup" | "preference_center" | "checkout" | "popup" | "import"
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  supersededById?: string | null
}

export interface DsrRequest {
  id: string
  tenantId: string
  userId: string
  type: DsrType
  status: DsrStatus
  receivedAt: Date
  slaDueAt: Date
  completedAt?: Date
  evidenceUrls: string[]
  notes?: string
}

export interface DataBreachIncident {
  id: string
  tenantId: string
  detectedAt: Date
  reportedAt?: Date
  severity: "low" | "medium" | "high" | "critical"
  affectedUserCount: number
  dataCategories: string[]
  description: string
  rootCause?: string
  containmentActions: string[]
  notificationsSent: number
  closedAt?: Date
}
