/**
 * RFQ expirer job (stub Sprint 12 Pha 6)
 *
 * STATUS: Job stubbed — RfqService.expireRfqs KHONG ton tai sau Sprint 9B
 * Pha 1d-a v2 rewrite (expire/quote workflow = Pha 1d-b DEFERRED).
 * Phat hien khi production build staging.
 *
 * Sprint 13 TODO: Pha 1d-b implement expireRfqs (UPDATE rfq.rfq SET status=expired
 * WHERE expires_at < NOW() AND status IN (published, quoting)) + re-enable job.
 */
import type { MedusaContainer } from "@medusajs/framework"

export default async function rfqExpirer(container: MedusaContainer) {
  container.resolve("logger").debug(
    "[rfq-expirer] No-op stub (Sprint 12 Pha 6, Pha 1d-b deferred)"
  )
}

export const config = {
  name: "rfq-expirer",
  schedule: "*/10 * * * *",
}
