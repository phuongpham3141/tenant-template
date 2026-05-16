/**
 * Sprint 9A D10 fix: defineLink commented out
 *
 * Original intent: liên kết order ↔ escrow transaction.
 *
 * Lý do tạm disable: EscrowModule dùng raw SQL queries (schema escrow.*),
 *   KHÔNG dùng model.define() → EscrowModule.linkable.escrow undefined → server crash startup.
 *
 * Để restore: Sprint 10+ refactor EscrowModule dùng model.define()
 *   hoặc tạo manual .linkable accessor.
 *
 * Reference: docs/sprint-07-phase-1-blocked.md + sprint-roadmap.md D10
 */

// import { defineLink } from "@medusajs/framework/utils"
// import OrderModule from "@medusajs/medusa/order"
// import EscrowModule from "../modules/escrow"
//
// export default defineLink(
//   OrderModule.linkable.order,
//   EscrowModule.linkable.escrow,
// )

export default {}
