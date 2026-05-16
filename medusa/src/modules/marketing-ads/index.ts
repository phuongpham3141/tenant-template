import { Module } from "@medusajs/framework/utils"
import MarketingAdsService from "./service"
export const MARKETING_ADS_MODULE = "marketing_ads"
export default Module(MARKETING_ADS_MODULE, { service: MarketingAdsService })
export * from "./types"
export { default as MarketingAdsService } from "./service"
