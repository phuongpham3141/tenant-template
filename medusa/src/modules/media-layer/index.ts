import { Module } from "@medusajs/framework/utils"
import MediaLayerService from "./service"
export const MEDIA_LAYER_MODULE = "media_layer"
export default Module(MEDIA_LAYER_MODULE, { service: MediaLayerService })
export * from "./types"
export { default as MediaLayerService } from "./service"
