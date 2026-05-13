import type { MedusaRequest } from "@medusajs/framework"
import type { TenantContext } from "../db/pg"

export function resolveTenant(req: MedusaRequest): TenantContext {
  const tenantId =
    (req.headers["x-tenant-id"] as string | undefined) ||
    (req as any).auth_context?.actor_id ||
    process.env.DEFAULT_TENANT_ID ||
    ""
  if (!tenantId) {
    throw new Error("Tenant context missing — set X-Tenant-Id header or DEFAULT_TENANT_ID")
  }
  const userId = (req as any).auth_context?.app_metadata?.user_id ?? null
  return { tenantId, userId }
}

export function adminContext(tenantId: string): TenantContext {
  return { tenantId, bypassRls: true }
}
