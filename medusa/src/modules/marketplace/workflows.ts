import { createWorkflow, createStep, WorkflowResponse, StepResponse } from "@medusajs/framework/workflows-sdk"
import { MARKETPLACE_MODULE } from "."
import type { CreateSupplierInput, Supplier } from "./types"
import type MarketplaceService from "./service"
import { adminContext } from "../../lib/tenant/context"

interface OnboardSupplierInput {
  tenantId: string
  supplier: CreateSupplierInput
  initialDocuments?: { documentType: string; fileUrl: string }[]
  contactUserId?: string
}

const createSupplierStep = createStep(
  "create-supplier",
  async (input: OnboardSupplierInput, { container }): Promise<StepResponse<Supplier, string>> => {
    const service = container.resolve<MarketplaceService>(MARKETPLACE_MODULE)
    const created = await service.createSupplier(adminContext(input.tenantId), input.supplier)
    return new StepResponse(created, created.id)
  },
  async (supplierId, { container }) => {
    if (!supplierId) return
    const service = container.resolve<MarketplaceService>(MARKETPLACE_MODULE)
    await service.softDeleteSupplier(adminContext(""), supplierId).catch(() => {})
  }
)

const uploadInitialDocsStep = createStep(
  "upload-initial-kyc-docs",
  async (
    { supplier, input }: { supplier: Supplier; input: OnboardSupplierInput },
    { container }
  ) => {
    if (!input.initialDocuments?.length) return new StepResponse([])
    const service = container.resolve<MarketplaceService>(MARKETPLACE_MODULE)
    const ctx = adminContext(input.tenantId)
    const docs = await Promise.all(
      input.initialDocuments.map((d) => service.uploadKycDocument(ctx, supplier.id, d))
    )
    return new StepResponse(docs)
  }
)

export const onboardSupplierWorkflow = createWorkflow(
  "onboard-supplier",
  (input: OnboardSupplierInput) => {
    const supplier = createSupplierStep(input)
    const docs = uploadInitialDocsStep({ supplier, input })
    return new WorkflowResponse({ supplier, docs })
  }
)
