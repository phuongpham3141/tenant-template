import { Module } from "@medusajs/framework/utils"
import GdprService from "./service"
export const GDPR_MODULE = "gdpr"
export default Module(GDPR_MODULE, { service: GdprService })
export * from "./types"
export { default as GdprService } from "./service"
