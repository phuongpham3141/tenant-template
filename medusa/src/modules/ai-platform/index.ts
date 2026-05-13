import { Module } from "@medusajs/framework/utils"
import AiPlatformService from "./service"
export const AI_PLATFORM_MODULE = "ai-platform"
export default Module(AI_PLATFORM_MODULE, { service: AiPlatformService })
export * from "./types"
export { default as AiPlatformService } from "./service"
