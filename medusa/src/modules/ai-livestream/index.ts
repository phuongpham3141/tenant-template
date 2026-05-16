import { Module } from "@medusajs/framework/utils"
import AiLivestreamService from "./service"

export const AI_LIVESTREAM_MODULE = "ai_livestream"
export default Module(AI_LIVESTREAM_MODULE, { service: AiLivestreamService })
export * from "./types"
export { default as AiLivestreamService } from "./service"
