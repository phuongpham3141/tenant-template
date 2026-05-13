import { Module } from "@medusajs/framework/utils"
import VnSourcingService from "./service"
export const VN_SOURCING_MODULE = "vn-sourcing"
export default Module(VN_SOURCING_MODULE, { service: VnSourcingService })
export * from "./types"
export { default as VnSourcingService } from "./service"
