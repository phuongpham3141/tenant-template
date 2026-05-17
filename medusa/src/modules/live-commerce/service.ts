/**
 * Live-commerce module service (minimal stub)
 *
 * Sprint 11 Pha 2c Module 1 (D29 Path D drop)
 *
 * STATUS: All 10 service methods dropped (Pha 1 5/5 INSERT targets MISSING,
 * 0 UI consumers L27 verified, 1 cascade workers/livestream-aggregator.ts).
 *
 * Schema live.* PRESERVED (shared with ai-livestream module Pha 2f).
 * DO NOT drop live.* schema until ai-livestream rewrite decision.
 *
 * Sprint 12+ TODO (LOW priority):
 * - Rewrite when live-commerce feature drives requirements
 * - Pattern reference: Pha 2a communication (raw-SQL pattern)
 * - Schema shared with ai-livestream (live.* 78 tables)
 */

import { MedusaService } from "@medusajs/framework/utils"

class LiveCommerceService extends MedusaService({}) {
  // STUB: All 10 methods dropped Sprint 11 Pha 2c Module 1 (D29 Path D).
  // Schema live.* PRESERVED for ai-livestream rewrite Pha 2f.
}

export default LiveCommerceService
