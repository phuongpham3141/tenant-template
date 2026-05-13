import { Module } from "@medusajs/framework/utils"
import AuditLogService from "./service"
export const AUDIT_LOG_MODULE = "audit-log"
export default Module(AUDIT_LOG_MODULE, { service: AuditLogService })
export * from "./types"
export { default as AuditLogService } from "./service"
