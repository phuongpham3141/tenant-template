/**
 * Returns module types (minimal stub)
 *
 * Sprint 11 Pha 2a (D27 Path D drop)
 *
 * STATUS: 4 type definitions dropped:
 * - RmaStatus (9 values, broken vs schema 8 values different semantic)
 * - RmaReason (9 values, replaced by reason_code FK lookup)
 * - RmaRequest interface (broken cols ord.return_* mapping)
 * - RmaInspection interface (broken cols)
 *
 * See service.ts class docstring for full architectural rationale.
 *
 * Sprint 12+ TODO: Rewrite với schema reality cols matching:
 * - ReturnRequest (18 cols, status 8-enum, requested_action 4-enum)
 * - ReturnItem (6 cols, separate table for order items)
 * - ReturnInspection (10 cols, condition_received 6-enum)
 * - RefundRecord (13 cols, refund_method 5-enum)
 * - ReturnAuthorization (carrier label)
 * - ReturnDisposition (post-inspection)
 */

export {}
