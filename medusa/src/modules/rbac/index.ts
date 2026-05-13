import { Module } from "@medusajs/framework/utils"
import RbacService from "./service"
export const RBAC_MODULE = "rbac"
export default Module(RBAC_MODULE, { service: RbacService })
export * from "./types"
export { default as RbacService } from "./service"
