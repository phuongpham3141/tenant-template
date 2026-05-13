import { Module } from "@medusajs/framework/utils"
import CatalogExtService from "./service"

export const CATALOG_EXT_MODULE = "catalog-ext"

export default Module(CATALOG_EXT_MODULE, {
  service: CatalogExtService,
})

export * from "./types"
export { default as CatalogExtService } from "./service"
