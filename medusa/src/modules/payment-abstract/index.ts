import { Module } from "@medusajs/framework/utils"
import PaymentAbstractService from "./service"

export const PAYMENT_ABSTRACT_MODULE = "payment_abstract"
export default Module(PAYMENT_ABSTRACT_MODULE, { service: PaymentAbstractService })
export * from "./types"
export { default as PaymentAbstractService } from "./service"
