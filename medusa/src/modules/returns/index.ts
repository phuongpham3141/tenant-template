import { Module } from "@medusajs/framework/utils"
import ReturnsService from "./service"
export const RETURNS_MODULE = "returns"
export default Module(RETURNS_MODULE, { service: ReturnsService })
export * from "./types"
export { default as ReturnsService } from "./service"
