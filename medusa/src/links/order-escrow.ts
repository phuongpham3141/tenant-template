import { defineLink } from "@medusajs/framework/utils"
import OrderModule from "@medusajs/medusa/order"
import EscrowModule from "../modules/escrow"

export default defineLink(
  OrderModule.linkable.order,
  EscrowModule.linkable.escrow,
)
