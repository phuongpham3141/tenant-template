import { createWorkflow, createStep, WorkflowResponse, StepResponse } from "@medusajs/framework/workflows-sdk"
import { RFQ_MODULE } from "."
import type RfqService from "./service"
import type { CreateRfqInput, SubmitQuoteInput, Rfq, RfqQuote } from "./types"
import { adminContext } from "../../lib/tenant/context"

const createRfqStep = createStep("create-rfq",
  async ({ tenantId, input }: { tenantId: string; input: CreateRfqInput }, { container }): Promise<StepResponse<Rfq, string>> => {
    const svc = container.resolve<RfqService>(RFQ_MODULE)
    const rfq = await svc.createRfq(adminContext(tenantId), input)
    return new StepResponse(rfq, rfq.id)
  }
)

export const createRfqWorkflow = createWorkflow("create-rfq",
  (input: { tenantId: string; input: CreateRfqInput }) => {
    const rfq = createRfqStep(input)
    return new WorkflowResponse({ rfq })
  }
)

const submitQuoteStep = createStep("submit-quote",
  async ({ tenantId, input }: { tenantId: string; input: SubmitQuoteInput }, { container }): Promise<StepResponse<RfqQuote, string>> => {
    const svc = container.resolve<RfqService>(RFQ_MODULE)
    const q = await svc.submitQuote(adminContext(tenantId), input)
    return new StepResponse(q, q.id)
  }
)

export const submitQuoteWorkflow = createWorkflow("submit-rfq-quote",
  (input: { tenantId: string; input: SubmitQuoteInput }) => {
    const quote = submitQuoteStep(input)
    return new WorkflowResponse({ quote })
  }
)

const acceptQuoteStep = createStep("accept-quote",
  async ({ tenantId, quoteId }: { tenantId: string; quoteId: string }, { container }) => {
    const svc = container.resolve<RfqService>(RFQ_MODULE)
    const q = await svc.acceptQuote(adminContext(tenantId), quoteId)
    return new StepResponse(q, q.id)
  }
)

export const acceptQuoteWorkflow = createWorkflow("accept-rfq-quote",
  (input: { tenantId: string; quoteId: string }) => {
    const quote = acceptQuoteStep(input)
    return new WorkflowResponse({ quote })
  }
)
