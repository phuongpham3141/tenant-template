import { Module } from "@medusajs/framework/utils"
import FulfillmentProService from "./service"

export const FULFILLMENT_PRO_MODULE = "fulfillment-pro"
export default Module(FULFILLMENT_PRO_MODULE, { service: FulfillmentProService })
export * from "./types"
export { default as FulfillmentProService } from "./service"
