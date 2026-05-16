import { Module } from "@medusajs/framework/utils"
import NotificationBusService from "./service"
export const NOTIFICATION_BUS_MODULE = "notification_bus"
export default Module(NOTIFICATION_BUS_MODULE, { service: NotificationBusService })
export * from "./types"
export { default as NotificationBusService } from "./service"
