import { api } from "../../api/client"

export interface EscrowSummary {
  id: string
  order_id: string
  status: string
  total_amount_minor: string
  released_amount_minor: string
  refunded_amount_minor: string
  currency: string
  funded_at?: string
}

export interface EscrowMilestone {
  id: string
  escrow_id: string
  sequence: number
  milestone_type: string
  amount_minor: string
  currency: string
  status: string
  due_date?: string
  release_conditions: Record<string, unknown>
  released_at?: string
}

export const escrowApi = {
  get: (id: string) => api<{ escrow: EscrowSummary; milestones: EscrowMilestone[] }>(`/store/escrows/${id}`),
  listMilestones: (escrowId: string) =>
    api<{ milestones: EscrowMilestone[] }>(`/store/escrows/${escrowId}/milestones`),
  markReady: (milestoneId: string, evidence: Record<string, unknown>) =>
    api(`/store/milestones/${milestoneId}/ready`, { method: "POST", body: { evidence } }),
  approveRelease: (milestoneId: string) =>
    api(`/store/milestones/${milestoneId}/release`, { method: "POST" }),
  openDispute: (milestoneId: string, reason: string) =>
    api(`/store/milestones/${milestoneId}/dispute`, { method: "POST", body: { reason } }),
}
