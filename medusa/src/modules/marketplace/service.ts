import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ValidationError } from "../../lib/errors"
import type {
  Supplier,
  CreateSupplierInput,
  UpdateSupplierInput,
  KycDocument,
  VerificationRecord,
  SupplierTier,
} from "./types"

class MarketplaceService extends MedusaService({}) {
  async listSuppliers(
    ctx: TenantContext,
    opts: { q?: string; status?: string; tierMin?: number; limit?: number; offset?: number } = {}
  ): Promise<Supplier[]> {
    const limit = Math.min(opts.limit ?? 50, 200)
    const offset = opts.offset ?? 0
    const params: unknown[] = []
    let where = "WHERE deleted_at IS NULL"
    if (opts.q) {
      params.push(`%${opts.q}%`)
      where += ` AND (legal_name ILIKE $${params.length} OR display_name_i18n::text ILIKE $${params.length})`
    }
    if (opts.status) {
      params.push(opts.status)
      where += ` AND status = $${params.length}`
    }
    if (typeof opts.tierMin === "number") {
      params.push(opts.tierMin)
      where += ` AND verification_tier >= $${params.length}`
    }
    params.push(limit, offset)
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM identity.supplier ${where}
       ORDER BY verification_tier DESC, created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )
    return rows.map(mapSupplier)
  }

  async getSupplier(ctx: TenantContext, id: string): Promise<Supplier> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM identity.supplier WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    )
    if (!rows[0]) throw new NotFoundError("Supplier", id)
    return mapSupplier(rows[0])
  }

  async createSupplier(ctx: TenantContext, input: CreateSupplierInput): Promise<Supplier> {
    if (!/^[a-z0-9-]{3,80}$/.test(input.slug)) {
      throw new ValidationError("Invalid slug")
    }
    const result = await withTenant(ctx, async (client) => {
      const { rows } = await client.query(
        `INSERT INTO identity.supplier (
           id, tenant_id, slug, legal_name, display_name_i18n,
           country_code, operation_mode,
           can_sell_wholesale, can_sell_retail, can_act_as_agent,
           year_established, primary_industry_code, status, verification_tier,
           created_at, updated_at, metadata
         ) VALUES (
           public.uuidv7(), $1, $2, $3, $4::jsonb,
           $5, $6,
           $7, $8, $9,
           $10, $11, 'pending', 0,
           NOW(), NOW(), $12::jsonb
         ) RETURNING *`,
        [
          ctx.tenantId,
          input.slug,
          input.legalName,
          JSON.stringify(input.displayName ?? {}),
          input.countryCode,
          input.operationMode ?? "intermediary",
          input.dealerCapabilities?.canSellWholesale ?? true,
          input.dealerCapabilities?.canSellRetail ?? false,
          input.dealerCapabilities?.canActAsAgent ?? false,
          input.yearEstablished ?? null,
          input.primaryIndustryCode ?? null,
          JSON.stringify(input.metadata ?? {}),
        ]
      )
      return rows[0]
    })
    const supplier = mapSupplier(result)
    await emitAudit(ctx, {
      actionCode: "supplier.create",
      resourceType: "identity.supplier",
      resourceId: supplier.id,
      after: supplier,
    })
    return supplier
  }

  async updateSupplier(ctx: TenantContext, id: string, input: UpdateSupplierInput): Promise<Supplier> {
    const before = await this.getSupplier(ctx, id)
    const sets: string[] = []
    const params: unknown[] = [id, ctx.tenantId]
    const add = (col: string, val: unknown, cast?: string) => {
      params.push(val)
      sets.push(`${col} = $${params.length}${cast ?? ""}`)
    }
    if (input.legalName !== undefined) add("legal_name", input.legalName)
    if (input.displayName !== undefined) add("display_name_i18n", JSON.stringify(input.displayName), "::jsonb")
    if (input.countryCode !== undefined) add("country_code", input.countryCode)
    if (input.operationMode !== undefined) add("operation_mode", input.operationMode)
    if (input.dealerCapabilities) {
      if ("canSellWholesale" in input.dealerCapabilities) add("can_sell_wholesale", input.dealerCapabilities.canSellWholesale)
      if ("canSellRetail" in input.dealerCapabilities) add("can_sell_retail", input.dealerCapabilities.canSellRetail)
      if ("canActAsAgent" in input.dealerCapabilities) add("can_act_as_agent", input.dealerCapabilities.canActAsAgent)
    }
    if (input.status !== undefined) add("status", input.status)
    if (input.verificationTier !== undefined) add("verification_tier", input.verificationTier)
    if (input.metadata !== undefined) add("metadata", JSON.stringify(input.metadata), "::jsonb")
    if (sets.length === 0) return before
    sets.push(`updated_at = NOW()`, `version = version + 1`)
    const rows = await queryT<any>(
      ctx,
      `UPDATE identity.supplier SET ${sets.join(", ")}
       WHERE id = $1 AND tenant_id = $2 RETURNING *`,
      params
    )
    if (!rows[0]) throw new NotFoundError("Supplier", id)
    const after = mapSupplier(rows[0])
    await emitAudit(ctx, {
      actionCode: "supplier.update",
      resourceType: "identity.supplier",
      resourceId: id,
      before,
      after,
    })
    return after
  }

  async softDeleteSupplier(ctx: TenantContext, id: string): Promise<void> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE identity.supplier SET deleted_at = NOW(), status = 'archived'
       WHERE id = $1 AND tenant_id = $2 AND deleted_at IS NULL RETURNING id`,
      [id, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("Supplier", id)
    await emitAudit(ctx, {
      actionCode: "supplier.delete",
      resourceType: "identity.supplier",
      resourceId: id,
      severity: "high",
    })
  }

  async uploadKycDocument(
    ctx: TenantContext,
    supplierId: string,
    input: { documentType: string; fileUrl: string; expiresAt?: Date | null; metadata?: Record<string, unknown> }
  ): Promise<KycDocument> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO identity.kyc_document (
        id, tenant_id, supplier_id, document_type, file_url, status, expires_at, created_at, updated_at, metadata
      ) VALUES (
        public.uuidv7(), $1, $2, $3, $4, 'pending', $5, NOW(), NOW(), $6::jsonb
      ) RETURNING *`,
      [ctx.tenantId, supplierId, input.documentType, input.fileUrl, input.expiresAt ?? null, JSON.stringify(input.metadata ?? {})]
    )
    const doc = mapKyc(rows[0])
    await emitAudit(ctx, {
      actionCode: "kyc.upload",
      resourceType: "identity.kyc_document",
      resourceId: doc.id,
      after: doc,
      severity: "medium",
    })
    return doc
  }

  async reviewKycDocument(
    ctx: TenantContext,
    documentId: string,
    decision: "approve" | "reject",
    rejectionReason?: string
  ): Promise<KycDocument> {
    if (decision === "reject" && !rejectionReason) {
      throw new ValidationError("rejectionReason is required when rejecting")
    }
    const rows = await queryT<any>(
      ctx,
      `UPDATE identity.kyc_document
       SET status = $1, reviewed_by_user_id = $2, reviewed_at = NOW(),
           rejection_reason = $3, updated_at = NOW()
       WHERE id = $4 AND tenant_id = $5 RETURNING *`,
      [decision === "approve" ? "approved" : "rejected", ctx.userId, rejectionReason ?? null, documentId, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("KycDocument", documentId)
    const doc = mapKyc(rows[0])
    await emitAudit(ctx, {
      actionCode: `kyc.${decision}`,
      resourceType: "identity.kyc_document",
      resourceId: doc.id,
      after: doc,
      severity: "high",
    })
    return doc
  }

  async promoteVerificationTier(
    ctx: TenantContext,
    supplierId: string,
    toTier: SupplierTier,
    evidenceDocumentIds: string[],
    notes?: string
  ): Promise<VerificationRecord> {
    const supplier = await this.getSupplier(ctx, supplierId)
    if (toTier <= supplier.verificationTier) {
      throw new ValidationError(`Tier ${toTier} not higher than current ${supplier.verificationTier}`)
    }
    const result = await withTenant(ctx, async (client) => {
      await client.query(
        `UPDATE identity.supplier SET verification_tier = $1, updated_at = NOW(), version = version + 1
         WHERE id = $2 AND tenant_id = $3`,
        [toTier, supplierId, ctx.tenantId]
      )
      const { rows } = await client.query(
        `INSERT INTO identity.verification_record (
           id, tenant_id, supplier_id, from_tier, to_tier,
           verifier_user_id, verified_at, evidence_document_ids, notes, created_at
         ) VALUES (
           public.uuidv7(), $1, $2, $3, $4, $5, NOW(), $6::uuid[], $7, NOW()
         ) RETURNING *`,
        [ctx.tenantId, supplierId, supplier.verificationTier, toTier, ctx.userId, evidenceDocumentIds, notes ?? null]
      )
      return rows[0]
    })
    await emitAudit(ctx, {
      actionCode: "supplier.verification_tier.promote",
      resourceType: "identity.supplier",
      resourceId: supplierId,
      after: { fromTier: supplier.verificationTier, toTier },
      severity: "high",
    })
    return mapVerification(result)
  }
}

function mapSupplier(row: any): Supplier {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    slug: row.slug,
    legalName: row.legal_name,
    displayNameI18n: row.display_name_i18n ?? {},
    countryCode: row.country_code,
    status: row.status,
    verificationTier: row.verification_tier as SupplierTier,
    operationMode: row.operation_mode,
    dealerCapabilities: {
      canSellWholesale: row.can_sell_wholesale,
      canSellRetail: row.can_sell_retail,
      canActAsAgent: row.can_act_as_agent,
    },
    yearEstablished: row.year_established ?? undefined,
    employeeCount: row.employee_count ?? undefined,
    annualRevenueUsdMinor: row.annual_revenue_usd_minor ? BigInt(row.annual_revenue_usd_minor) : undefined,
    exportRatioPct: row.export_ratio_pct ?? undefined,
    primaryIndustryCode: row.primary_industry_code ?? undefined,
    certifications: row.certifications ?? [],
    tags: row.tags ?? [],
    categoryIds: row.category_ids ?? [],
    metadata: row.metadata ?? {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function mapKyc(row: any): KycDocument {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    supplierId: row.supplier_id,
    documentType: row.document_type,
    fileUrl: row.file_url,
    status: row.status,
    reviewedBy: row.reviewed_by_user_id,
    reviewedAt: row.reviewed_at,
    rejectionReason: row.rejection_reason,
    expiresAt: row.expires_at,
    metadata: row.metadata ?? {},
  }
}

function mapVerification(row: any): VerificationRecord {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    supplierId: row.supplier_id,
    fromTier: row.from_tier,
    toTier: row.to_tier,
    verifierId: row.verifier_user_id,
    verifiedAt: row.verified_at,
    evidenceDocumentIds: row.evidence_document_ids ?? [],
    notes: row.notes,
  }
}

export default MarketplaceService
