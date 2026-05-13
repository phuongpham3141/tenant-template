import { Module } from "@medusajs/framework/utils"
import DisputeService from "./service"
export const DISPUTE_MODULE = "dispute"
export default Module(DISPUTE_MODULE, { service: DisputeService })
export * from "./types"
export { default as DisputeService } from "./service"
