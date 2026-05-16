/**
 * Sprint 9A D10 fix: defineLink commented out
 *
 * Original intent: liên kết customer ↔ supplier (marketplace module).
 *
 * Lý do tạm disable: MarketplaceModule dùng raw SQL queries (schema identity.supplier),
 *   KHÔNG dùng model.define() → MarketplaceModule.linkable.supplier undefined → server crash startup.
 *
 * Để restore: Sprint 10+ refactor MarketplaceModule dùng model.define()
 *   hoặc tạo manual .linkable accessor.
 *
 * Reference: docs/sprint-07-phase-1-blocked.md + sprint-roadmap.md D10
 */

// import { defineLink } from "@medusajs/framework/utils"
// import CustomerModule from "@medusajs/medusa/customer"
// import MarketplaceModule from "../modules/marketplace"
//
// export default defineLink(
//   CustomerModule.linkable.customer,
//   MarketplaceModule.linkable.supplier,
// )

export default {}
