/**
 * AI-platform module service (minimal stub)
 *
 * Sprint 11 Pha 2c Module 4 (D32 Path D drop)
 *
 * STATUS: All 14 service methods dropped (Pha 1 3/3 INSERT targets MISSING,
 * 0 UI consumers L27 verified, 1 cascade subscribers/catalog-indexer.ts).
 *
 * Schema ai.* PRESERVED (shared with ai-livestream module Pha 2f).
 * DO NOT drop ai.* schema until ai-livestream rewrite decision.
 *
 * Sprint 12+ TODO (LOW priority):
 * - Rewrite when AI feature suite drives requirements
 * - Pattern reference: Pha 2a communication (raw-SQL pattern)
 * - Likely consolidate with ai-livestream rewrite Pha 2f
 * - Schema ai.* shared (18 tables)
 */

import { MedusaService } from "@medusajs/framework/utils"

class AiPlatformService extends MedusaService({}) {
  // STUB: All 14 methods dropped Sprint 11 Pha 2c Module 4 (D32 Path D).
  // Schema ai.* PRESERVED for ai-livestream rewrite Pha 2f.
}

export default AiPlatformService
