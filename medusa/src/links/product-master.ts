/**
 * Sprint 9A D10 fix: defineLink commented out
 *
 * Original intent: liên kết product ↔ master product (catalog-ext module).
 *
 * Lý do tạm disable: CatalogExtModule dùng raw SQL queries (schema catalog.*),
 *   KHÔNG dùng model.define() → CatalogExtModule.linkable.masterProduct undefined → server crash startup.
 *
 * Để restore: Sprint 10+ refactor CatalogExtModule dùng model.define()
 *   hoặc tạo manual .linkable accessor.
 *
 * Reference: docs/sprint-07-phase-1-blocked.md + sprint-roadmap.md D10
 */

// import { defineLink } from "@medusajs/framework/utils"
// import ProductModule from "@medusajs/medusa/product"
// import CatalogExtModule from "../modules/catalog-ext"
//
// export default defineLink(
//   ProductModule.linkable.product,
//   CatalogExtModule.linkable.masterProduct,
// )

export default {}
