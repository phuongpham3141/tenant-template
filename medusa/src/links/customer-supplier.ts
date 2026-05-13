import { defineLink } from "@medusajs/framework/utils"
import CustomerModule from "@medusajs/medusa/customer"
import MarketplaceModule from "../modules/marketplace"

export default defineLink(
  CustomerModule.linkable.customer,
  MarketplaceModule.linkable.supplier,
)
