import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"
import CatalogExtModule from "../modules/catalog-ext"

export default defineLink(
  ProductModule.linkable.product,
  CatalogExtModule.linkable.masterProduct,
)
