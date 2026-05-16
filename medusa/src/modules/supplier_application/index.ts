import { Module } from "@medusajs/framework/utils"
import SupplierApplicationService from "./service"

// Underscore convention (Pha 0 v2 D14 lesson)
export const SUPPLIER_APPLICATION_MODULE = "supplier_application"

export default Module(SUPPLIER_APPLICATION_MODULE, {
  service: SupplierApplicationService,
})
