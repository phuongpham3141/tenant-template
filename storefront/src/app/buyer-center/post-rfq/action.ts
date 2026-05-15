"use server"

import { createRfqAction } from "@/actions/rfq"

/**
 * Form-action adapter. createRfqAction returns {error} on validation failure
 * which is incompatible với Next.js form action prop (expects Promise<void>).
 * Throw on error so the global error.tsx boundary catches it.
 */
export async function submitRfqForm(formData: FormData): Promise<void> {
  const result = await createRfqAction(formData)
  if (result && typeof result === "object" && "error" in result) {
    throw new Error(`rfq_${result.error}`)
  }
}
