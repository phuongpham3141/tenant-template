import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ValidationError } from "../../lib/errors"
import type {
  ProductExtension,
  MasterProduct,
  BuyBoxCandidate,
  CustomizationRequest,
  CustomizationRequestStatus,
  CreateCustomizationRequestInput,
  ListCustomizationRequestsFilters,
  ListCustomizationRequestsOpts,
} from "./types"

class CatalogExtService extends MedusaService({}) {
  async listProducts(
    ctx: TenantContext,
    opts: {
      supplierId?: string
      categoryId?: string
      status?: string
      q?: string
      limit?: number
      offset?: number
    } = {}
  ): Promise<ProductExtension[]> {
    const params: unknown[] = []
    let where = "WHERE deleted_at IS NULL"
    if (opts.supplierId) {
      params.push(opts.supplierId)
      where += ` AND supplier_id = $${params.length}`
    }
    if (opts.categoryId) {
      params.push(opts.categoryId)
      where += ` AND category_id = $${params.length}`
    }
    if (opts.status) {
      params.push(opts.status)
      where += ` AND status = $${params.length}`
    }
    if (opts.q) {
      params.push(`%${opts.q}%`)
      where += ` AND (sku ILIKE $${params.length} OR title_i18n::text ILIKE $${params.length})`
    }
    params.push(Math.min(opts.limit ?? 50, 200))
    params.push(opts.offset ?? 0)
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM catalog.product ${where}
       ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )
    return rows.map(mapProduct)
  }

  async getProduct(ctx: TenantContext, id: string): Promise<ProductExtension> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM catalog.product WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    )
    if (!rows[0]) throw new NotFoundError("Product", id)
    return mapProduct(rows[0])
  }

  async createProduct(ctx: TenantContext, input: Omit<ProductExtension, "id" | "createdAt" | "updatedAt" | "tenantId">): Promise<ProductExtension> {
    if (!/^[A-Z0-9-]{3,80}$/i.test(input.sku)) throw new ValidationError("Invalid SKU")
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO catalog.product (
         id, tenant_id, supplier_id, master_product_id, sku,
         title_i18n, description_i18n, status,
         base_price_minor, base_currency, moq_min, moq_max,
         hs_code, brand_id, gtin, category_id,
         attributes, tags, metadata,
         created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4,
         $5::jsonb, $6::jsonb, $7,
         $8, $9, $10, $11,
         $12, $13, $14, $15,
         $16::jsonb, $17::text[], $18::jsonb,
         NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId,
        input.supplierId,
        input.masterProductId ?? null,
        input.sku,
        JSON.stringify(input.titleI18n ?? {}),
        JSON.stringify(input.descriptionI18n ?? {}),
        input.status ?? "draft",
        input.basePriceMinor ? String(input.basePriceMinor) : null,
        input.baseCurrency ?? "USD",
        input.moqMin ?? 1,
        input.moqMax ?? null,
        input.hsCode ?? null,
        input.brandId ?? null,
        input.gtin ?? null,
        input.categoryId ?? null,
        JSON.stringify(input.attributes ?? {}),
        input.tags ?? [],
        JSON.stringify(input.metadata ?? {}),
      ]
    )
    const product = mapProduct(rows[0])
    await emitAudit(ctx, {
      actionCode: "product.create",
      resourceType: "catalog.product",
      resourceId: product.id,
      after: product,
    })
    return product
  }

  async listMasterProducts(ctx: TenantContext, opts: { q?: string; limit?: number } = {}): Promise<MasterProduct[]> {
    const params: unknown[] = []
    let where = "WHERE 1=1"
    if (opts.q) {
      params.push(`%${opts.q}%`)
      where += ` AND (canonical_sku ILIKE $${params.length} OR title_i18n::text ILIKE $${params.length})`
    }
    params.push(Math.min(opts.limit ?? 100, 500))
    const rows = await queryT<any>(
      ctx,
      `SELECT m.*, (SELECT COUNT(*) FROM catalog.product p WHERE p.master_product_id = m.id) AS variant_count
       FROM catalog.master_product m ${where}
       ORDER BY created_at DESC LIMIT $${params.length}`,
      params
    )
    return rows.map(mapMaster)
  }

  async computeBuyBox(ctx: TenantContext, masterProductId: string, opts: { quantity?: number; destinationCountry?: string } = {}): Promise<BuyBoxCandidate[]> {
    const qty = opts.quantity ?? 1
    const country = opts.destinationCountry ?? "VN"
    const rows = await queryT<any>(
      ctx,
      `SELECT p.id AS product_id, p.supplier_id, p.base_price_minor, p.base_currency,
              s.verification_tier, s.country_code
       FROM catalog.product p
       JOIN identity.supplier s ON s.id = p.supplier_id
       WHERE p.master_product_id = $1 AND p.deleted_at IS NULL AND p.status = 'active'
         AND s.status = 'active' AND p.moq_min <= $2`,
      [masterProductId, qty]
    )
    return rows.map((r) => {
      let score = 100 - Number(r.base_price_minor) / 1000
      const reasonCodes: string[] = []
      if (r.verification_tier >= 4) {
        score += 30
        reasonCodes.push("verified_premium")
      }
      if (r.country_code === country) {
        score += 10
        reasonCodes.push("local_supplier")
      }
      return {
        productId: r.product_id,
        supplierId: r.supplier_id,
        priceMinor: BigInt(r.base_price_minor ?? 0),
        currency: r.base_currency ?? "USD",
        score,
        reasonCodes,
      }
    }).sort((a, b) => b.score - a.score)
  }

  // =========================================================================
  // Sprint 10 Pha 2b v2 — D25 Option B refactor
  // CustomizationRequest CRUD (catalog.customization_request, 24 cols)
  // Pattern: Pha 2a communication repeat (raw-SQL + queryT/withTenant)
  // =========================================================================

  async createCustomizationRequest(
    ctx: TenantContext,
    input: CreateCustomizationRequestInput
  ): Promise<CustomizationRequest> {
    return withTenant(ctx, async (client) => {
      // Generate code từ sequence (mig 52)
      const { rows: codeRows } = await client.query<{ num: string }>(
        "SELECT nextval('catalog.customization_request_code_seq')::text AS num"
      )
      const code = `CUST-REQ-${codeRows[0].num}`

      const { rows } = await client.query<any>(
        `INSERT INTO catalog.customization_request (
          tenant_id, code,
          buyer_id, supplier_id,
          product_id, rfq_id,
          request_type, description_i18n,
          artwork_urls,
          target_quantity, unit_code,
          budget_min_usd_minor, budget_max_usd_minor,
          max_revisions,
          status,
          expires_at,
          metadata
        ) VALUES (
          $1, $2,
          $3, $4,
          $5, $6,
          $7, $8::jsonb,
          $9::text[],
          $10, $11,
          $12, $13,
          $14,
          'draft',
          $15,
          $16::jsonb
        ) RETURNING *`,
        [
          ctx.tenantId,
          code,
          input.buyer_id,
          input.supplier_id,
          input.product_id ?? null,
          input.rfq_id ?? null,
          input.request_type,
          JSON.stringify(input.description_i18n),
          input.artwork_urls ?? [],
          input.target_quantity,
          input.unit_code,
          input.budget_min_usd_minor
            ? input.budget_min_usd_minor.toString()
            : null,
          input.budget_max_usd_minor
            ? input.budget_max_usd_minor.toString()
            : null,
          input.max_revisions ?? 5,
          input.expires_at ?? null,
          JSON.stringify(input.metadata ?? {}),
        ]
      )
      return mapCustomizationRequest(rows[0])
    })
  }

  async listCustomizationRequests(
    ctx: TenantContext,
    filters: ListCustomizationRequestsFilters = {},
    opts: ListCustomizationRequestsOpts = {}
  ): Promise<{ requests: CustomizationRequest[]; count: number }> {
    const conditions: string[] = ["tenant_id = $1"]
    const params: unknown[] = [ctx.tenantId]
    let paramIdx = 2

    if (filters.buyer_id) {
      conditions.push(`buyer_id = $${paramIdx++}`)
      params.push(filters.buyer_id)
    }
    if (filters.supplier_id) {
      conditions.push(`supplier_id = $${paramIdx++}`)
      params.push(filters.supplier_id)
    }
    if (filters.product_id) {
      conditions.push(`product_id = $${paramIdx++}`)
      params.push(filters.product_id)
    }
    if (filters.rfq_id) {
      conditions.push(`rfq_id = $${paramIdx++}`)
      params.push(filters.rfq_id)
    }
    if (filters.request_type) {
      conditions.push(`request_type = $${paramIdx++}`)
      params.push(filters.request_type)
    }
    if (filters.status) {
      if (Array.isArray(filters.status)) {
        const placeholders = filters.status.map((_, i) => `$${paramIdx + i}`).join(",")
        conditions.push(`status IN (${placeholders})`)
        params.push(...filters.status)
        paramIdx += filters.status.length
      } else {
        conditions.push(`status = $${paramIdx++}`)
        params.push(filters.status)
      }
    }

    const where = conditions.join(" AND ")
    const allowedOrder = ["created_at", "updated_at", "code", "expires_at"]
    const orderBy = allowedOrder.includes(opts.order_by ?? "")
      ? opts.order_by
      : "created_at"
    const orderDir = opts.order_dir === "ASC" ? "ASC" : "DESC"
    const limit = Math.min(opts.limit ?? 20, 100)
    const offset = Math.max(opts.offset ?? 0, 0)

    return withTenant(ctx, async (client) => {
      const countRes = await client.query<{ total: string }>(
        `SELECT COUNT(*)::text AS total FROM catalog.customization_request WHERE ${where}`,
        params
      )
      const count = parseInt(countRes.rows[0].total, 10)

      const listRes = await client.query<any>(
        `SELECT * FROM catalog.customization_request WHERE ${where}
         ORDER BY ${orderBy} ${orderDir}
         LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
        [...params, limit, offset]
      )

      return {
        requests: listRes.rows.map((r) => mapCustomizationRequest(r)),
        count,
      }
    })
  }

  async retrieveCustomizationRequest(
    ctx: TenantContext,
    id: string
  ): Promise<CustomizationRequest | null> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM catalog.customization_request WHERE id = $1 AND tenant_id = $2`,
      [id, ctx.tenantId]
    )
    if (rows.length === 0) return null
    return mapCustomizationRequest(rows[0])
  }

  async updateCustomizationRequestStatus(
    ctx: TenantContext,
    id: string,
    status: CustomizationRequestStatus
  ): Promise<CustomizationRequest | null> {
    const workflowCols: string[] = []
    if (status === "approved") workflowCols.push("approval_gate_at = NOW()")

    const workflowSet = workflowCols.length > 0 ? `, ${workflowCols.join(", ")}` : ""

    const rows = await queryT<any>(
      ctx,
      `UPDATE catalog.customization_request
       SET status = $1, version = version + 1, updated_at = NOW()${workflowSet}
       WHERE id = $2 AND tenant_id = $3
       RETURNING *`,
      [status, id, ctx.tenantId]
    )
    if (rows.length === 0) return null
    return mapCustomizationRequest(rows[0])
  }
}

function mapProduct(row: any): ProductExtension {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    supplierId: row.supplier_id,
    masterProductId: row.master_product_id,
    sku: row.sku,
    titleI18n: row.title_i18n ?? {},
    descriptionI18n: row.description_i18n ?? {},
    status: row.status,
    basePriceMinor: row.base_price_minor ? BigInt(row.base_price_minor) : undefined,
    baseCurrency: row.base_currency ?? undefined,
    moqMin: row.moq_min,
    moqMax: row.moq_max,
    hsCode: row.hs_code,
    brandId: row.brand_id,
    gtin: row.gtin,
    categoryId: row.category_id,
    attributes: row.attributes ?? {},
    tags: row.tags ?? [],
    metadata: row.metadata ?? {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function mapMaster(row: any): MasterProduct {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    canonicalSku: row.canonical_sku,
    titleI18n: row.title_i18n ?? {},
    brandId: row.brand_id,
    gtin: row.gtin,
    attributes: row.attributes ?? {},
    variantCount: Number(row.variant_count ?? 0),
    createdAt: row.created_at,
  }
}


function mapCustomizationRequest(row: any): CustomizationRequest {
  return {
    id: row.id,
    tenant_id: row.tenant_id,
    code: row.code,
    buyer_id: row.buyer_id,
    supplier_id: row.supplier_id,
    product_id: row.product_id || undefined,
    rfq_id: row.rfq_id || undefined,
    request_type: row.request_type,
    description_i18n: row.description_i18n || {},
    artwork_urls: row.artwork_urls || [],
    target_quantity: row.target_quantity,
    unit_code: row.unit_code,
    budget_min_usd_minor: row.budget_min_usd_minor
      ? BigInt(row.budget_min_usd_minor)
      : undefined,
    budget_max_usd_minor: row.budget_max_usd_minor
      ? BigInt(row.budget_max_usd_minor)
      : undefined,
    revision_round: row.revision_round,
    max_revisions: row.max_revisions,
    status: row.status,
    approval_gate_at: row.approval_gate_at || undefined,
    converted_order_id: row.converted_order_id || undefined,
    expires_at: row.expires_at || undefined,
    version: row.version,
    metadata: row.metadata || {},
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export default CatalogExtService
