import { createWorkflow, createStep, WorkflowResponse, StepResponse } from "@medusajs/framework/workflows-sdk"
import { ESCROW_MODULE } from "."
import type EscrowService from "./service"
import type { CreateEscrowInput, Escrow } from "./types"
import { adminContext } from "../../lib/tenant/context"

const createStep_ = createStep("create-escrow",
  async ({ tenantId, input }: { tenantId: string; input: CreateEscrowInput }, { container }): Promise<StepResponse<Escrow, string>> => {
    const svc = container.resolve<EscrowService>(ESCROW_MODULE)
    const e = await svc.createEscrow(adminContext(tenantId), input)
    return new StepResponse(e, e.id)
  }
)

export const createEscrowWorkflow = createWorkflow("create-escrow",
  (input: { tenantId: string; input: CreateEscrowInput }) => {
    const escrow = createStep_(input)
    return new WorkflowResponse({ escrow })
  }
)

const releaseMilestoneStep = createStep("release-milestone",
  async ({ tenantId, milestoneId }: { tenantId: string; milestoneId: string }, { container }) => {
    const svc = container.resolve<EscrowService>(ESCROW_MODULE)
    const m = await svc.releaseMilestone(adminContext(tenantId), milestoneId)
    return new StepResponse(m, m.id)
  }
)

export const releaseMilestoneWorkflow = createWorkflow("release-escrow-milestone",
  (input: { tenantId: string; milestoneId: string }) => {
    const milestone = releaseMilestoneStep(input)
    return new WorkflowResponse({ milestone })
  }
)
