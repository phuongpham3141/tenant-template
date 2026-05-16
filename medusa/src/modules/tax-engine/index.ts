import { Module } from "@medusajs/framework/utils"
import TaxEngineService from "./service"
export const TAX_ENGINE_MODULE = "tax_engine"
export default Module(TAX_ENGINE_MODULE, { service: TaxEngineService })
export * from "./types"
export { default as TaxEngineService } from "./service"
