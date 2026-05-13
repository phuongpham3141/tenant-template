import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withClient } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError } from "../../lib/errors"
import type { Tenant, TenantDomain, TenantBranding, SubscriptionPlan, UsageMetering } from "./types"
import { adminContext } from "../../lib/tenant/context"

class TenantService extends MedusaService({}) {
  async create(input: Omit<Tenant, "id" | "createdAt">): Promise<Tenant> {
    const rows = await withClient(async (c) => {
      await c.query("SET LOCAL role = 'csr_admin'")
      const { rows } = await c.query<any>(
        `INSERT INTO admin.tenant (
           id, slug, legal_name, display_name_i18n, default_locale, default_currency,
           status, plan_tier, contact_email, metadata, created_at, updated_at
         ) VALUES (
           public.uuidv7(), $1, $2, $3::jsonb, $4, $5, $6, $7, $8, $9::jsonb, NOW(), NOW()
         ) RETURNING *`,
        [
          input.slug, input.legalName, JSON.stringify(input.displayNameI18n),
          input.defaultLocale, input.defaultCurrency, input.status, input.planTier, input.contactEmail,
          JSON.stringify(input.metadata ?? {}),
        ]
      )
      return rows
    })
    const tenant = mapTenant(rows[0])
    await emitAudit(adminContext(tenant.id), {
      actionCode: "tenant.create", resourceType: "admin.tenant", resourceId: tenant.id, after: tenant, severity: "critical",
    })
    return tenant
  }

  async get(id: string): Promise<Tenant> {
    const rows = await withClient(async (c) => {
      await c.query("SET LOCAL role = 'csr_admin'")
      const r = await c.query(`SELECT * FROM admin.tenant WHERE id = $1`, [id])
      return r.rows
    })
    if (!rows[0]) throw new NotFoundError("Tenant", id)
    return mapTenant(rows[0])
  }

  async listDomains(tenantId: string): Promise<TenantDomain[]> {
    const rows = await queryT<any>(adminContext(tenantId), `SELECT * FROM admin.tenant_domain WHERE tenant_id = $1 ORDER BY is_primary DESC, domain_purpose`, [tenantId])
    return rows.map(mapDomain)
  }

  async setBranding(tenantId: string, branding: Omit<TenantBranding, "tenantId">): Promise<TenantBranding> {
    const rows = await queryT<any>(
      adminContext(tenantId),
      `INSERT INTO admin.tenant_branding (
         tenant_id, primary_color, secondary_color, accent_color, logo_url, favicon_url, og_image_url, heading_font, body_font, updated_at
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       ON CONFLICT (tenant_id) DO UPDATE SET
         primary_color = EXCLUDED.primary_color,
         secondary_color = EXCLUDED.secondary_color,
         accent_color = EXCLUDED.accent_color,
         logo_url = EXCLUDED.logo_url,
         favicon_url = EXCLUDED.favicon_url,
         og_image_url = EXCLUDED.og_image_url,
         heading_font = EXCLUDED.heading_font,
         body_font = EXCLUDED.body_font,
         updated_at = NOW()
       RETURNING *`,
      [tenantId, branding.primaryColor, branding.secondaryColor, branding.accentColor, branding.logoUrl ?? null, branding.faviconUrl ?? null, branding.ogImageUrl ?? null, branding.headingFont, branding.bodyFont]
    )
    return { tenantId, ...branding }
  }

  async listPlans(): Promise<SubscriptionPlan[]> {
    const rows = await withClient(async (c) => {
      await c.query("SET LOCAL role = 'csr_admin'")
      const r = await c.query(`SELECT * FROM admin.subscription_plan WHERE is_active = TRUE ORDER BY monthly_usd_minor`)
      return r.rows
    })
    return rows.map((r) => ({
      id: r.id, code: r.code, name: r.name,
      monthlyUsdMinor: BigInt(r.monthly_usd_minor), features: r.features ?? {},
    }))
  }

  async recordUsage(tenantId: string, metricKey: string, quantity: number, unit: string): Promise<void> {
    await queryT(
      adminContext(tenantId),
      `INSERT INTO admin.usage_meter (tenant_id, bucket, metric_key, quantity, unit, recorded_at)
       VALUES ($1, date_trunc('day', NOW()), $2, $3, $4, NOW())
       ON CONFLICT (tenant_id, bucket, metric_key) DO UPDATE
       SET quantity = admin.usage_meter.quantity + EXCLUDED.quantity, recorded_at = NOW()`,
      [tenantId, metricKey, quantity, unit]
    )
  }

  async getUsage(tenantId: string, since?: Date): Promise<UsageMetering[]> {
    const rows = await queryT<any>(
      adminContext(tenantId),
      `SELECT * FROM admin.usage_meter WHERE tenant_id = $1 AND bucket >= COALESCE($2, NOW() - INTERVAL '30 days') ORDER BY bucket DESC`,
      [tenantId, since ?? null]
    )
    return rows.map((r) => ({
      tenantId: r.tenant_id, bucket: r.bucket, metricKey: r.metric_key,
      quantity: Number(r.quantity), unit: r.unit,
    }))
  }
}

function mapTenant(r: any): Tenant {
  return {
    id: r.id, slug: r.slug, legalName: r.legal_name, displayNameI18n: r.display_name_i18n ?? {},
    defaultLocale: r.default_locale, defaultCurrency: r.default_currency,
    status: r.status, planTier: r.plan_tier, contactEmail: r.contact_email,
    metadata: r.metadata ?? {}, createdAt: r.created_at,
  }
}
function mapDomain(r: any): TenantDomain {
  return {
    id: r.id, tenantId: r.tenant_id, domain: r.domain, domainPurpose: r.domain_purpose,
    isPrimary: r.is_primary, sslIssuedAt: r.ssl_issued_at, sslExpiresAt: r.ssl_expires_at,
    metadata: r.metadata ?? {},
  }
}

export default TenantService
