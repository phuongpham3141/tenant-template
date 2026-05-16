import { Module } from "@medusajs/framework/utils"
import SearchPlatformService from "./service"
export const SEARCH_PLATFORM_MODULE = "search_platform"
export default Module(SEARCH_PLATFORM_MODULE, { service: SearchPlatformService })
export * from "./types"
export { default as SearchPlatformService } from "./service"
