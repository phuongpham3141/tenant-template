/**
 * Returns module service (minimal stub)
 *
 * Sprint 11 Pha 2a (D27 Path D drop, revised from Path B after Bước 0 audit)
 *
 * STATUS: All 4 service methods dropped do schema reality mismatch deep.
 *
 * Service was written cho simplistic RMA model:
 * - Cols: order_item_ids (text[]), buyer_user_id, reason (text), description,
 *   desired_outcome, evidence_photos, total_refund_minor, currency
 * - Status enum: requested/approved/rejected/shipped_by_buyer/received/
 *   inspecting/refunded/exchanged/closed (9 values)
 * - Service queried ord.return_request + ord.return_inspection
 *
 * Schema reality is 7 tables in returns schema (production-grade RMA system):
 * - returns.return_request (18 cols, NEW: code unique, requested_by_user_id,
 *   reason_code FK, description_i18n jsonb, photos_urls, video_url,
 *   requested_action 4-enum: refund/replace/exchange/credit,
 *   status 8-enum: submitted/approved/rejected/in_transit/received/inspected/
 *   resolved/cancelled, rma_window_expires_at)
 * - returns.return_item (6 cols, MOVED order items to separate table với
 *   quantity_returning + condition_claimed + unit_refund_amount_minor)
 * - returns.return_inspection (10 cols, condition_received 6-enum,
 *   accept_decision boolean, warehouse_facility_id FK)
 * - returns.refund_record (13 cols, fee breakdown, refund_method 5-enum,
 *   status 4-enum, escrow_transaction_id FK)
 * - returns.return_authorization (carrier label storage)
 * - returns.return_disposition (post-inspection routing)
 * - returns.return_reason_master (FK lookup, EMPTY needs seed)
 *
 * Two different business models:
 * - Service = simple RMA (1-table model với inline cols)
 * - Schema = production marketplace RMA (7-table normalized với FK chains)
 *
 * Cross-module Bước 0 verified (L25):
 * - 0 UI consumers (storefront actions + admin UI + SDK + API endpoints)
 * - 0 external RETURNS_MODULE refs medusa/src/
 * - 0 cascade (jobs/subs/workers)
 * - Pha 1 audit ActionRefs=2 = FALSE POSITIVE (text match "returns" keyword)
 * - 0 rows existing (all 7 returns.* tables)
 * - returns.return_reason_master EMPTY (FK lookup unseeded)
 *
 * Sprint 12+ TODO (MEDIUM priority — RMA UX flow drives):
 * - Rewrite full module với schema reality cols (~12-15h)
 * - Seed return_reason_master (defective/wrong_item/damaged/etc enum codes)
 * - 6 CRUD methods (request/list/retrieve/transition/inspect/refund)
 * - Pattern reference: Pha 2a communication (raw-SQL + queryT/withTenant)
 * - Pre-requisite: RMA UX design freeze + business decision on disposition workflow
 *
 * Schema tables PRESERVED (no migration):
 * - returns.return_request, return_item, return_inspection, refund_record
 * - returns.return_authorization, return_disposition, return_reason_master
 */

import { MedusaService } from "@medusajs/framework/utils"

class ReturnsService extends MedusaService({}) {
  // STUB: All methods dropped Sprint 11 Pha 2a D27 Path D.
  // See class docstring above for rationale.
  // Sprint 12+ rewrite: Pha 2a communication pattern + RMA UX freeze.
}

export default ReturnsService
