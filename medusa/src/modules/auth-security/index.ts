import { Module } from "@medusajs/framework/utils"
import AuthSecurityService from "./service"
export const AUTH_SECURITY_MODULE = "auth_security"
export default Module(AUTH_SECURITY_MODULE, { service: AuthSecurityService })
export * from "./types"
export { default as AuthSecurityService } from "./service"
