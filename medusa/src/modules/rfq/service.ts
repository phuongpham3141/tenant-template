/**
 * RFQ Service — raw-SQL pattern (Sprint 1 R20 era style retained).
 * Sprint 9B Pha 1d-a v2 rewrite (D19 + D20 root cause fix).
 * Map sang schema rfq.* thật, tenant canonical 'csr'.
 *
 * Pha 1d-a v2 scope: CRUD methods (createRfq + listRfqs + retrieveRfq + updateStatus + softDelete).
 * Pha 1d-b scope: submitQuote + acceptQuote + listQuotesForRfq + workflow integration.
 */

import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import type {
  Rfq,
  CreateRfqInput,
  ListRfqsFilters,
  ListRfqsOpts,
  RfqStatus,
} from "./types"

// Note: rfq.rfq.id uses DEFAULT uuidv7() (schema-level), không cần generate trong service.

class RfqService extends MedusaService({}) {
  // ===== HELPERS =====

  private mapRfq(row: any): Rfq {
    return {
      id: row.id,
      tenant_id: row.tenant_id,
      code: row.code,
      buyer_id: row.buyer_id,
      title_i18n: row.title_i18n || {},
      description_i18n: row.description_i18n || {},
      category_id: row.category_id || undefined,
      target_quantity: row.target_quantity,
      unit_code: row.unit_code,
      desired_port: row.desired_port || undefined,
      budget_min_usd_minor: row.budget_min_usd_minor
        ? BigInt(row.budget_min_usd_minor)
        : undefined,
      budget_max_usd_minor: row.budget_max_usd_minor
        ? BigInt(row.budget_max_usd_minor)
        : undefined,
      visibility: row.visibility,
      target_supplier_country_codes: row.target_supplier_country_codes || [],
      target_verification_tier_min: row.target_verification_tier_min || undefined,
      target_category_ids: row.target_category_ids || [],
      attachment_urls: row.attachment_urls || [],
      urgency: row.urgency,
      secured_trading_required: row.secured_trading_required,
      status: row.status,
      awarded_quote_id: row.awarded_quote_id || undefined,
      converted_order_id: row.converted_order_id || undefined,
      published_at: row.published_at || undefined,
      awarded_at: row.awarded_at || undefined,
      closed_at: row.closed_at || undefined,
      expires_at: row.expires_at,
      version: row.version,
      metadata: row.metadata || {},
      deleted_at: row.deleted_at || undefined,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }
  }

  // ===== CREATE =====

  async createRfq(ctx: TenantContext, input: CreateRfqInput): Promise<Rfq> {
    return withTenant(ctx, async (client) => {
      // Get next code from sequence
      const { rows: codeRows } = await client.query<{ num: string }>(
        "SELECT nextval('admin.rfq_number_seq')::text AS num"
      )
      const code = `RFQ-${codeRows[0].num}`

      const { rows } = await client.query<any>(
        `INSERT INTO rfq.rfq (
          tenant_id, code, buyer_id,
          title_i18n, description_i18n,
          category_id,
          target_quantity, unit_code,
          desired_port,
          budget_min_usd_minor, budget_max_usd_minor,
          visibility,
          target_supplier_country_codes,
          target_verification_tier_min,
          target_category_ids,
          attachment_urls,
          urgency, secured_trading_required,
          status,
          expires_at,
          metadata
        ) VALUES (
          $1, $2, $3,
          $4::jsonb, $5::jsonb,
          $6,
          $7, $8,
          $9,
          $10, $11,
          $12,
          $13::text[],
          $14,
          $15::uuid[],
          $16::text[],
          $17, $18,
          'draft',
          $19,
          $20::jsonb
        ) RETURNING *`,
        [
          ctx.tenantId,
          code,
          input.buyer_id,
          JSON.stringify(input.title_i18n),
          JSON.stringify(input.description_i18n),
          input.category_id ?? null,
          input.target_quantity,
          input.unit_code,
          input.desired_port ?? null,
          input.budget_min_usd_minor ? input.budget_min_usd_minor.toString() : null,
          input.budget_max_usd_minor ? input.budget_max_usd_minor.toString() : null,
          input.visibility ?? "invitation_only",
          input.target_supplier_country_codes ?? [],
          input.target_verification_tier_min ?? null,
          input.target_category_ids ?? [],
          input.attachment_urls ?? [],
          input.urgency ?? "normal",
          input.secured_trading_required ?? false,
          input.expires_at,
          JSON.stringify(input.metadata ?? {}),
        ]
      )

      return this.mapRfq(rows[0])
    })
  }

  // ===== LIST =====

  async listRfqs(
    ctx: TenantContext,
    filters: ListRfqsFilters = {},
    opts: ListRfqsOpts = {}
  ): Promise<{ rfqs: Rfq[]; count: number }> {
    const conditions: string[] = ["tenant_id = $1"]
    const params: unknown[] = [ctx.tenantId]
    let paramIdx = 2

    if (filters.buyer_id) {
      conditions.push(`buyer_id = $${paramIdx++}`)
      params.push(filters.buyer_id)
    }

    if (filters.category_id) {
      conditions.push(`category_id = $${paramIdx++}`)
      params.push(filters.category_id)
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

    if (!filters.include_deleted) {
      conditions.push("deleted_at IS NULL")
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
        `SELECT COUNT(*)::text AS total FROM rfq.rfq WHERE ${where}`,
        params
      )
      const count = parseInt(countRes.rows[0].total, 10)

      const listRes = await client.query<any>(
        `SELECT * FROM rfq.rfq WHERE ${where}
         ORDER BY ${orderBy} ${orderDir}
         LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
        [...params, limit, offset]
      )

      return {
        rfqs: listRes.rows.map((r) => this.mapRfq(r)),
        count,
      }
    })
  }

  // ===== RETRIEVE =====

  async retrieveRfq(
    ctx: TenantContext,
    id: string,
    includeDeleted = false
  ): Promise<Rfq | null> {
    let query = `SELECT * FROM rfq.rfq WHERE id = $1 AND tenant_id = $2`
    if (!includeDeleted) query += " AND deleted_at IS NULL"

    const rows = await queryT<any>(ctx, query, [id, ctx.tenantId])
    if (rows.length === 0) return null
    return this.mapRfq(rows[0])
  }

  // ===== UPDATE STATUS =====

  async updateRfqStatus(
    ctx: TenantContext,
    id: string,
    status: RfqStatus
  ): Promise<Rfq | null> {
    const workflowCols: string[] = []
    if (status === "published") workflowCols.push("published_at = NOW()")
    if (status === "awarded") workflowCols.push("awarded_at = NOW()")
    if (["expired", "cancelled", "awarded", "closed", "converted"].includes(status)) {
      workflowCols.push("closed_at = NOW()")
    }

    const workflowSet = workflowCols.length > 0 ? `, ${workflowCols.join(", ")}` : ""

    const rows = await queryT<any>(
      ctx,
      `UPDATE rfq.rfq
       SET status = $1, version = version + 1, updated_at = NOW()${workflowSet}
       WHERE id = $2 AND tenant_id = $3 AND deleted_at IS NULL
       RETURNING *`,
      [status, id, ctx.tenantId]
    )

    if (rows.length === 0) return null
    return this.mapRfq(rows[0])
  }

  // ===== SOFT DELETE =====

  async softDeleteRfq(ctx: TenantContext, id: string): Promise<boolean> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE rfq.rfq
       SET deleted_at = NOW(), updated_at = NOW()
       WHERE id = $1 AND tenant_id = $2 AND deleted_at IS NULL
       RETURNING id`,
      [id, ctx.tenantId]
    )
    return rows.length > 0
  }

  // ===== Pha 1d-b TODO =====
  // submitQuote, listQuotesForRfq, acceptQuote, rejectQuote, listInvitedSuppliers
  // Will be added in Pha 1d-b along với workflows + jobs + subscribers cascade.
}

export default RfqService
