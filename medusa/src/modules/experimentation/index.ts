import { Module } from "@medusajs/framework/utils"
import ExperimentationService from "./service"
export const EXPERIMENTATION_MODULE = "experimentation"
export default Module(EXPERIMENTATION_MODULE, { service: ExperimentationService })
export * from "./types"
export { default as ExperimentationService } from "./service"
