/**
 * Escrow module service (minimal stub)
 *
 * Sprint 10 Pha 2c v2 (D23-EXPANDED Option C2 drop)
 *
 * STATUS: All 8 service methods dropped do deep semantic gap giữa:
 * - Schema reality: production-grade banking system (segregated bank accounts,
 *   withholding tax, multi-step payout, date-range FX snapshots)
 * - Service implementation: simple POC (monolithic amounts, single FX rate,
 *   event-driven status, basic milestone)
 *
 * Sprint 11+ TODO (LOW priority):
 * - Rewrite full module khi payment provider/bank partner integration drives.
 * - Pattern reference: Pha 2a communication (raw-SQL + queryT/withTenant).
 * - Scope estimate: 12-18h (4 tables + 8 methods + cascade).
 * - Pre-requisite: business decision on POC vs production banking model.
 *
 * Schema tables PRESERVED (no migration):
 * - payment.escrow (18 cols)
 * - payment.escrow_milestone
 * - payment.fx_snapshot (10 cols, date-range design)
 * - payment.payout (24 cols, full fee breakdown)
 *
 * Cascade refs stubbed:
 * - workflows.ts (in module) — workflow code commented out
 * - jobs/fx-snapshot-poller.ts — captureFxSnapshot call commented
 * - subscribers/order-events.ts — fundEscrow call commented
 */

import { MedusaService } from "@medusajs/framework/utils"

class EscrowService extends MedusaService({}) {
  // STUB: All methods dropped Sprint 10 Pha 2c v2 D23-EXPANDED Option C2.
  // See class docstring above for rationale.
  // Sprint 11+ rewrite: Pha 2a communication pattern (raw-SQL + queryT/withTenant).
}

export default EscrowService
