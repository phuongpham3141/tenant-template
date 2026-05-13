import { Module } from "@medusajs/framework/utils"
import RfqService from "./service"

export const RFQ_MODULE = "rfq"
export default Module(RFQ_MODULE, { service: RfqService })
export * from "./types"
export { default as RfqService } from "./service"
