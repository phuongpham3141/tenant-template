/**
 * VN-sourcing module service (minimal stub)
 *
 * Sprint 11 Pha 2d Module 4 (D36 Path D drop)
 *
 * STATUS: All 10 service methods dropped:
 * - listInterpreters, bookInterpreterSession, scheduleFactoryVisit,
 *   createAuditReport, createMou, requestSample, submitFreightQuote
 * - 6/6 INSERT target tables MISSING (audit_report + factory_visit + freight_quote
 *   + interpreter_session + mou + sample_request)
 * - 0 medusa-side cascade (jobs/subs/workers/api strict grep verified 0)
 *
 * Storefront-side dead code (NOT blocking drop):
 * - storefront/src/actions/sample-request.ts + factory-visit.ts import vnSourcingApi
 * - storefront/src/lib/sdk/vn-sourcing/index.ts SDK barrel
 * - SDK calls non-existent /api/store/vn-sourcing/* endpoints (already 404)
 * - Sprint 12+ rewrite will replace SDK + actions together with service
 *
 * Schema vn_sourcing.* PRESERVED (34 tables).
 *
 * Sprint 12+ TODO (LOW priority — VN-specific feature):
 * - Rewrite when VN-specific sourcing feature drives requirements
 * - Not in customer #1 scope
 * - Pattern reference: Pha 2a communication (raw-SQL pattern)
 * - Will also stub/rewrite storefront/src/actions + SDK
 */

import { MedusaService } from "@medusajs/framework/utils"

class VnSourcingService extends MedusaService({}) {
  // STUB: All 10 methods dropped Sprint 11 Pha 2d Module 4 (D36).
}

export default VnSourcingService
