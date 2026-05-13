import { Module } from "@medusajs/framework/utils"
import MarketingEmailService from "./service"
export const MARKETING_EMAIL_MODULE = "marketing-email"
export default Module(MARKETING_EMAIL_MODULE, { service: MarketingEmailService })
export * from "./types"
export { default as MarketingEmailService } from "./service"
