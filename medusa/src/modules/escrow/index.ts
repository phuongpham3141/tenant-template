import { Module } from "@medusajs/framework/utils"
import EscrowService from "./service"

export const ESCROW_MODULE = "escrow"
export default Module(ESCROW_MODULE, { service: EscrowService })
export * from "./types"
export { default as EscrowService } from "./service"
