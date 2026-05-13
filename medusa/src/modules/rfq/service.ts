import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ValidationError, ConflictError } from "../../lib/errors"
import type { Rfq, RfqQuote, CreateRfqInput, SubmitQuoteInput, InvitedSupplier } from "./types"

class RfqService extends MedusaService({}) {
  async createRfq(ctx: TenantContext, input: CreateRfqInput): Promise<Rfq> {
    if (input.targetQuantity <= 0) throw new ValidationError("targetQuantity must be positive")
    const result = await withTenant(ctx, async (client) => {
      const { rows: [rfqNumberRow] } = await client.query(
        `SELECT 'RFQ-' || TO_CHAR(NOW(),'YYYYMM') || '-' || LPAD(NEXTVAL('admin.rfq_number_seq')::text,6,'0') AS num`
      )
      const expiresAt = input.expiresAt ?? new Date(Date.now() + 14 * 86_400_000)
      const { rows } = await client.query(
        `INSERT INTO ord.rfq (
           id, tenant_id, customer_id, rfq_number,
           title_i18n, description_i18n, category_id,
           target_quantity, target_unit_code,
           destination_country, desired_delivery_date,
           budget_minor, budget_currency,
           invite_mode, status, expires_at, attachments,
           created_at, updated_at
         ) VALUES (
           public.uuidv7(), $1, $2, $3,
           $4::jsonb, $5::jsonb, $6,
           $7, $8,
           $9, $10,
           $11, $12,
           $13, 'open', $14, $15::text[],
           NOW(), NOW()
         ) RETURNING *`,
        [
          ctx.tenantId,
          input.customerId,
          rfqNumberRow.num,
          JSON.stringify(input.title ?? {}),
          JSON.stringify(input.description ?? {}),
          input.categoryId ?? null,
          input.targetQuantity,
          input.targetUnitCode,
          input.destinationCountry,
          input.desiredDeliveryDate ?? null,
          input.budgetMinor ? String(input.budgetMinor) : null,
          input.budgetCurrency ?? null,
          input.inviteMode ?? "open",
          expiresAt,
          input.attachments ?? [],
        ]
      )
      const rfq = rows[0]
      if (input.invitedSupplierIds?.length) {
        for (const sid of input.invitedSupplierIds) {
          await client.query(
            `INSERT INTO ord.rfq_invited_supplier (rfq_id, supplier_id, tenant_id, invited_at)
             VALUES ($1, $2, $3, NOW()) ON CONFLICT DO NOTHING`,
            [rfq.id, sid, ctx.tenantId]
          )
        }
      }
      return rfq
    })
    const rfq = mapRfq(result)
    await emitAudit(ctx, {
      actionCode: "rfq.create",
      resourceType: "ord.rfq",
      resourceId: rfq.id,
      after: rfq,
    })
    return rfq
  }

  async getRfq(ctx: TenantContext, id: string): Promise<Rfq> {
    const rows = await queryT<any>(ctx, `SELECT * FROM ord.rfq WHERE id = $1`, [id])
    if (!rows[0]) throw new NotFoundError("Rfq", id)
    return mapRfq(rows[0])
  }

  async listRfqs(ctx: TenantContext, opts: { customerId?: string; status?: string; supplierVisibleId?: string; limit?: number } = {}): Promise<Rfq[]> {
    const params: unknown[] = []
    let where = "WHERE 1=1"
    if (opts.customerId) { params.push(opts.customerId); where += ` AND customer_id = $${params.length}` }
    if (opts.status) { params.push(opts.status); where += ` AND status = $${params.length}` }
    if (opts.supplierVisibleId) {
      params.push(opts.supplierVisibleId)
      where += ` AND (
        invite_mode = 'open'
        OR EXISTS (SELECT 1 FROM ord.rfq_invited_supplier i WHERE i.rfq_id = ord.rfq.id AND i.supplier_id = $${params.length})
      )`
    }
    params.push(Math.min(opts.limit ?? 50, 200))
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM ord.rfq ${where} ORDER BY created_at DESC LIMIT $${params.length}`,
      params
    )
    return rows.map(mapRfq)
  }

  async listInvitedSuppliers(ctx: TenantContext, rfqId: string): Promise<InvitedSupplier[]> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM ord.rfq_invited_supplier WHERE rfq_id = $1 ORDER BY invited_at DESC`,
      [rfqId]
    )
    return rows.map((r) => ({
      rfqId: r.rfq_id,
      supplierId: r.supplier_id,
      invitedAt: r.invited_at,
      respondedAt: r.responded_at,
      declineReason: r.decline_reason,
    }))
  }

  async submitQuote(ctx: TenantContext, input: SubmitQuoteInput): Promise<RfqQuote> {
    const rfq = await this.getRfq(ctx, input.rfqId)
    if (rfq.status !== "open" && rfq.status !== "quoting" && rfq.status !== "negotiating") {
      throw new ConflictError(`Cannot quote on RFQ in status ${rfq.status}`)
    }
    if (rfq.expiresAt < new Date()) throw new ConflictError("RFQ expired")
    const total = input.pricePerUnitMinor * BigInt(rfq.targetQuantity)
    const result = await withTenant(ctx, async (client) => {
      const { rows: [num] } = await client.query(
        `SELECT 'Q-' || TO_CHAR(NOW(),'YYYYMM') || '-' || LPAD(NEXTVAL('admin.quote_number_seq')::text,6,'0') AS num`
      )
      const { rows } = await client.query(
        `INSERT INTO ord.rfq_quote (
           id, tenant_id, rfq_id, supplier_id, quote_number,
           price_per_unit_minor, currency, total_price_minor,
           payment_terms, shipping_terms, lead_time_days, valid_until,
           notes, attachments, status, created_at, updated_at
         ) VALUES (
           public.uuidv7(), $1, $2, $3, $4,
           $5, $6, $7,
           $8, $9, $10, $11,
           $12, $13::text[], 'submitted', NOW(), NOW()
         ) RETURNING *`,
        [
          ctx.tenantId, input.rfqId, input.supplierId, num.num,
          String(input.pricePerUnitMinor), input.currency, String(total),
          input.paymentTerms, input.shippingTerms, input.leadTimeDays, input.validUntil,
          input.notes ?? null, input.attachments ?? [],
        ]
      )
      await client.query(`UPDATE ord.rfq SET status = 'quoting', updated_at = NOW() WHERE id = $1 AND status = 'open'`, [input.rfqId])
      return rows[0]
    })
    const quote = mapQuote(result)
    await emitAudit(ctx, {
      actionCode: "quote.submit",
      resourceType: "ord.rfq_quote",
      resourceId: quote.id,
      after: quote,
    })
    return quote
  }

  async acceptQuote(ctx: TenantContext, quoteId: string): Promise<RfqQuote> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE ord.rfq_quote SET status = 'accepted', accepted_at = NOW(), updated_at = NOW()
       WHERE id = $1 AND tenant_id = $2 AND status = 'submitted' RETURNING *`,
      [quoteId, ctx.tenantId]
    )
    if (!rows[0]) throw new ConflictError("Quote not in submitted state")
    await queryT(
      ctx,
      `UPDATE ord.rfq SET status = 'awarded', updated_at = NOW() WHERE id = $1`,
      [rows[0].rfq_id]
    )
    await emitAudit(ctx, {
      actionCode: "quote.accept",
      resourceType: "ord.rfq_quote",
      resourceId: quoteId,
      severity: "high",
    })
    return mapQuote(rows[0])
  }

  async counterOffer(ctx: TenantContext, originalQuoteId: string, input: Omit<SubmitQuoteInput, "rfqId" | "supplierId">): Promise<RfqQuote> {
    const orig = await queryT<any>(ctx, `SELECT * FROM ord.rfq_quote WHERE id = $1`, [originalQuoteId])
    if (!orig[0]) throw new NotFoundError("RfqQuote", originalQuoteId)
    await queryT(ctx, `UPDATE ord.rfq_quote SET status = 'counter_offered' WHERE id = $1`, [originalQuoteId])
    return this.submitQuote(ctx, {
      ...input,
      rfqId: orig[0].rfq_id,
      supplierId: orig[0].supplier_id,
    })
  }

  async expireRfqs(ctx: TenantContext): Promise<number> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE ord.rfq SET status = 'expired', updated_at = NOW()
       WHERE status IN ('open', 'quoting', 'negotiating') AND expires_at < NOW() RETURNING id`,
      []
    )
    return rows.length
  }
}

function mapRfq(row: any): Rfq {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    customerId: row.customer_id,
    rfqNumber: row.rfq_number,
    titleI18n: row.title_i18n ?? {},
    descriptionI18n: row.description_i18n ?? {},
    categoryId: row.category_id,
    productCategoryHint: row.product_category_hint,
    targetQuantity: row.target_quantity,
    targetUnitCode: row.target_unit_code,
    destinationCountry: row.destination_country,
    destinationCity: row.destination_city,
    desiredDeliveryDate: row.desired_delivery_date,
    budgetMinor: row.budget_minor ? BigInt(row.budget_minor) : undefined,
    budgetCurrency: row.budget_currency,
    paymentTermsPreference: row.payment_terms_preference,
    shippingTermsPreference: row.shipping_terms_preference,
    inviteMode: row.invite_mode,
    status: row.status,
    expiresAt: row.expires_at,
    attachments: row.attachments,
    metadata: row.metadata ?? {},
    createdAt: row.created_at,
  }
}

function mapQuote(row: any): RfqQuote {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    rfqId: row.rfq_id,
    supplierId: row.supplier_id,
    status: row.status,
    quoteNumber: row.quote_number,
    pricePerUnitMinor: BigInt(row.price_per_unit_minor),
    currency: row.currency,
    totalPriceMinor: BigInt(row.total_price_minor),
    paymentTerms: row.payment_terms,
    shippingTerms: row.shipping_terms,
    leadTimeDays: row.lead_time_days,
    validUntil: row.valid_until,
    notes: row.notes,
    attachments: row.attachments,
    counterOfferOf: row.counter_offer_of,
    acceptedAt: row.accepted_at,
    rejectedAt: row.rejected_at,
    createdAt: row.created_at,
  }
}

export default RfqService
