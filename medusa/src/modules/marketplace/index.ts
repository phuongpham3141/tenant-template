import { Module } from "@medusajs/framework/utils"
import MarketplaceService from "./service"

export const MARKETPLACE_MODULE = "marketplace"

export default Module(MARKETPLACE_MODULE, {
  service: MarketplaceService,
})

export * from "./types"
export { default as MarketplaceService } from "./service"
