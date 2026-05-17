/**
 * Escrow module types (minimal stub)
 *
 * Sprint 10 Pha 2c v2 (D23-EXPANDED Option C2 drop)
 *
 * STATUS: 5 entity interfaces + input shape dropped (Escrow, EscrowMilestone,
 * CreateEscrowInput, FxSnapshot, Payout, EscrowStatus, MilestoneStatus).
 * See service.ts class docstring for full architectural rationale.
 *
 * Sprint 11+ TODO: Rewrite với schema reality cols matching:
 * - Escrow (18 cols, holding_bank_account_id, amount_held_minor, withholding_*)
 * - EscrowMilestone (trigger_event + grace_period_hours + release_mode + position)
 * - FxSnapshot (10 cols, date-range với rates jsonb + applied_from_at/until_at)
 * - Payout (24 cols, full fee breakdown gross/commission/withholding/fee/net)
 */

export {}
