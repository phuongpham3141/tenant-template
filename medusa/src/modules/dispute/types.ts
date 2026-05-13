export type DisputeTier = "T1_buyer_supplier" | "T2_platform_mediator" | "T3_arbitration" | "T4_external_court"
export type DisputeStatus = "open" | "in_negotiation" | "evidence_collection" | "mediator_review" | "arbitration_filed" | "resolved" | "withdrawn" | "court_referred"

export interface Dispute {
  id: string
  tenantId: string
  orderId: string
  initiatorId: string
  respondentId: string
  type: "quality" | "delivery" | "payment" | "fraud" | "service" | "other"
  tier: DisputeTier
  status: DisputeStatus
  description: string
  claimAmountMinor?: bigint
  currency?: string
  evidenceItemIds: string[]
  mediatorUserId?: string | null
  arbitratorUserId?: string | null
  slaDueAt?: Date | null
  resolvedAt?: Date | null
  outcome?: "for_initiator" | "for_respondent" | "split" | "no_award"
  createdAt: Date
}

export interface AmlFlag {
  id: string
  tenantId: string
  entityType: "user" | "supplier" | "order" | "payment"
  entityId: string
  flagType: "high_value" | "structuring" | "sanctioned_party" | "pep" | "unusual_pattern" | "geo_risk"
  severity: "low" | "medium" | "high" | "critical"
  details: Record<string, unknown>
  raisedBy: "rule_engine" | "ml_model" | "analyst" | "external_provider"
  reviewedBy?: string | null
  resolution?: "false_positive" | "confirmed" | "escalated" | "blocked"
  createdAt: Date
}
