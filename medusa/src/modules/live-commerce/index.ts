import { Module } from "@medusajs/framework/utils"
import LiveCommerceService from "./service"
export const LIVE_COMMERCE_MODULE = "live_commerce"
export default Module(LIVE_COMMERCE_MODULE, { service: LiveCommerceService })
export * from "./types"
export { default as LiveCommerceService } from "./service"
