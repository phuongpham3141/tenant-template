import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { DISPUTE_MODULE } from "../modules/dispute"
import type DisputeService from "../modules/dispute/service"
import { adminContext } from "../lib/tenant/context"

export default async function fraudDetectionHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; entity_type?: string; entity_id?: string; risk_score?: number; rules_triggered?: string[] }>) {
  const ctx = adminContext(event.data.tenant_id)
  const score = Number(event.data.risk_score ?? 0)
  if (score < 0.7) return

  const dispute = container.resolve<DisputeService>(DISPUTE_MODULE)
  await dispute.raiseAmlFlag(ctx, {
    entityType: (event.data.entity_type ?? "order") as any,
    entityId: event.data.entity_id ?? event.data.id,
    flagType: score >= 0.95 ? "high_value" : "unusual_pattern",
    severity: score >= 0.95 ? "critical" : score >= 0.85 ? "high" : "medium",
    details: { rules: event.data.rules_triggered ?? [], score },
    raisedBy: "ml_model",
  })
}

export const config: SubscriberConfig = {
  event: ["fraud.score_high", "fraud.rule_triggered"],
}
