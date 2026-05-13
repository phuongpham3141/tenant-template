import { Module } from "@medusajs/framework/utils"
import CommunicationService from "./service"
export const COMMUNICATION_MODULE = "communication"
export default Module(COMMUNICATION_MODULE, { service: CommunicationService })
export * from "./types"
export { default as CommunicationService } from "./service"
