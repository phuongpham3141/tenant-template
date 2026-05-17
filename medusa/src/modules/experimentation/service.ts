/**
 * Experimentation module service (minimal stub)
 *
 * Sprint 11 Pha 2c Module 3 (D31 Path D drop)
 *
 * STATUS: All 9 service methods dropped (Pha 1 4/4 INSERT targets MISSING,
 * 0 UI consumers L27 verified, 1 cascade jobs/experiment-stats-rollup.ts).
 *
 * Schema experiment.* PRESERVED (standalone, 8 tables).
 *
 * Sprint 12+ TODO (LOW priority):
 * - Rewrite when A/B testing feature drives requirements
 * - Pattern reference: Pha 2a communication (raw-SQL pattern)
 */

import { MedusaService } from "@medusajs/framework/utils"

class ExperimentationService extends MedusaService({}) {
  // STUB: All 9 methods dropped Sprint 11 Pha 2c Module 3 (D31 Path D).
}

export default ExperimentationService
