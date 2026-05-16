import { MedusaService } from "@medusajs/framework/utils"
import { SupplierApplication } from "./models/supplier-application"

class SupplierApplicationService extends MedusaService({
  SupplierApplication,
}) {}

export default SupplierApplicationService
