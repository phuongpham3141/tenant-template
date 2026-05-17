/**
 * Tenant module service (minimal stub)
 *
 * Sprint 11 Pha 2d Module 3 (D35 Path D drop CRITICAL)
 *
 * STATUS: All 11 service methods dropped:
 * - create, get, listDomains, setBranding, listPlans, recordUsage, getUsage
 * - 3/3 INSERT targets MISSING (admin.tenant + admin.tenant_branding +
 *   admin.usage_meter) — service queried wrong schema admin.* (only 2 tables)
 *   vs reality tenant_master.* (11 tables)
 * - L27 verified 0 UI consumers + 0 cascade
 *
 * CRITICAL safety verified (Bước 0d):
 * - Multi-tenant infrastructure UNAFFECTED by this drop
 * - withTenant() helper in lib/db/pg.ts uses SET LOCAL app.current_tenant
 *   PostgreSQL session variable (NOT tenant service)
 * - 282 RLS policies use tenant_id column directly (NOT service)
 * - tenant_master.tenant_master canonical seed (csr) accessible via raw SQL
 *
 * Schema tenant_master.* PRESERVED (11 tables, csr canonical seed intact).
 *
 * Sprint 12+ TODO (LOW priority):
 * - Rewrite when tenant management UI drives (provisioning, billing, quotas)
 * - Pattern reference: Pha 2a communication (raw-SQL pattern)
 * - Will query tenant_master.* (correct schema) not admin.* (broken)
 */

import { MedusaService } from "@medusajs/framework/utils"

class TenantService extends MedusaService({}) {
  // STUB: All 11 methods dropped Sprint 11 Pha 2d Module 3 (D35).
  // Multi-tenant infra UNAFFECTED — withTenant() column-based resolution.
}

export default TenantService
