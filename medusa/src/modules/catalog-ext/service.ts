import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ValidationError } from "../../lib/errors"
import type { ProductExtension, MasterProduct, BuyBoxCandidate } from "./types"

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


export default CatalogExtService
