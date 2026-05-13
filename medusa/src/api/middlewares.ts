import { defineMiddlewares } from "@medusajs/framework/http"
import type { MedusaNextFunction, MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

const requireTenant = (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
  const hdr = req.headers["x-tenant-id"] as string | undefined
  if (!hdr && !process.env.DEFAULT_TENANT_ID) {
    return res.status(400).json({ error: "missing_tenant_header", message: "X-Tenant-Id header required" })
  }
  next()
}

const rateLimitHeaders = (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
  res.setHeader("X-RateLimit-Limit", "1000")
  next()
}

export default defineMiddlewares({
  routes: [
    { matcher: "/store/*", middlewares: [requireTenant, rateLimitHeaders] },
    { matcher: "/admin/*", middlewares: [requireTenant] },
    { matcher: "/internal/*", middlewares: [] }, // internal token auth handled in route
    { matcher: "/webhooks/*", middlewares: [] }, // provider-signature based auth
  ],
})
