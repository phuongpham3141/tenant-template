/**
 * Twilio webhook (Sprint 11 Pha 2b D28 stubbed)
 *
 * STATUS: Webhook accepts payloads to keep Twilio happy, no-op processing.
 *
 * Sprint 12+ TODO: Re-enable when notification-bus rewrite.
 */
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(_req: MedusaRequest, res: MedusaResponse) {
  return res.status(204).end()
}
