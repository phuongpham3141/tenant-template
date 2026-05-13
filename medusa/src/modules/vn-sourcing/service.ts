import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError } from "../../lib/errors"
import type { Interpreter, InterpreterSession, FactoryVisit, AuditReport, MouContract, SampleRequest, FreightQuote } from "./types"

class VnSourcingService extends MedusaService({}) {
  async listInterpreters(ctx: TenantContext, opts: { language?: string; specialty?: string } = {}): Promise<Interpreter[]> {
    const params: unknown[] = []
    let where = `WHERE status IN ('active','busy')`
    if (opts.language) { params.push(opts.language); where += ` AND $${params.length} = ANY(languages)` }
    if (opts.specialty) { params.push(opts.specialty); where += ` AND $${params.length} = ANY(specialties)` }
    const rows = await queryT<any>(ctx, `SELECT * FROM vn_sourcing.interpreter ${where} ORDER BY rating DESC, total_sessions DESC`, params)
    return rows.map(mapInterpreter)
  }

  async bookInterpreterSession(ctx: TenantContext, input: Omit<InterpreterSession, "id" | "tenantId" | "totalCostMinor" | "status">): Promise<InterpreterSession> {
    const inter = await queryT<any>(ctx, `SELECT * FROM vn_sourcing.interpreter WHERE id = $1`, [input.interpreterId])
    if (!inter[0]) throw new NotFoundError("Interpreter", input.interpreterId)
    const cost = BigInt(inter[0].hourly_rate_usd_minor) * BigInt(input.durationMinutes) / 60n
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO vn_sourcing.interpreter_session (
         id, tenant_id, customer_id, interpreter_id, scheduled_start_at, duration_minutes,
         mode, context_type, status, total_cost_minor, currency, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, 'requested', $8, $9, NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.customerId, input.interpreterId, input.scheduledStartAt, input.durationMinutes, input.mode, input.contextType, String(cost), input.currency]
    )
    return mapInterpreterSession(rows[0])
  }

  async scheduleFactoryVisit(ctx: TenantContext, input: Omit<FactoryVisit, "id" | "tenantId" | "status" | "photoUrls">): Promise<FactoryVisit> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO vn_sourcing.factory_visit (
         id, tenant_id, customer_id, supplier_id, scheduled_date, interpreter_session_id,
         attendees, agenda, status, photo_urls, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, 'scheduled', '{}', NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.customerId, input.supplierId, input.scheduledDate, input.interpreterSessionId ?? null, input.attendees, input.agenda]
    )
    return mapVisit(rows[0])
  }

  async createAuditReport(ctx: TenantContext, input: Omit<AuditReport, "id" | "tenantId" | "findings"> & { findings?: AuditReport["findings"] }): Promise<AuditReport> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO vn_sourcing.audit_report (
         id, tenant_id, supplier_id, audit_type, auditor_agency, scheduled_date, completed_date,
         overall_score, pass_fail, report_pdf_url, certificate_url, expires_at, findings, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.supplierId, input.auditType, input.auditorAgency, input.scheduledDate, input.completedDate ?? null,
        input.overallScore ?? null, input.passFail ?? null, input.reportPdfUrl ?? null, input.certificateUrl ?? null,
        input.expiresAt ?? null, JSON.stringify(input.findings ?? []),
      ]
    )
    await emitAudit(ctx, { actionCode: "vn.audit.create", resourceType: "vn_sourcing.audit_report", resourceId: rows[0].id, after: rows[0], severity: "high" })
    return mapAudit(rows[0])
  }

  async createMou(ctx: TenantContext, input: Omit<MouContract, "id" | "tenantId" | "status">): Promise<MouContract> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO vn_sourcing.mou (
         id, tenant_id, customer_id, supplier_id, status, start_date, end_date,
         terms, signed_pdf_url, total_committed_usd_minor, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, 'draft', $4, $5, $6::jsonb, $7, $8, NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.customerId, input.supplierId, input.startDate, input.endDate, JSON.stringify(input.terms), input.signedPdfUrl ?? null, String(input.totalCommittedUsdMinor)]
    )
    return mapMou(rows[0])
  }

  async requestSample(ctx: TenantContext, input: Omit<SampleRequest, "id" | "tenantId" | "status">): Promise<SampleRequest> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO vn_sourcing.sample_request (
         id, tenant_id, customer_id, supplier_id, product_id, description, quantity, shipping_address,
         sample_fee_minor, shipping_fee_minor, currency, status, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7::jsonb,
         $8, $9, $10, 'requested', NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.customerId, input.supplierId, input.productId ?? null, input.description, input.quantity,
        JSON.stringify(input.shippingAddress), String(input.sampleFeeMinor), String(input.shippingFeeMinor), input.currency,
      ]
    )
    return mapSample(rows[0])
  }

  async submitFreightQuote(ctx: TenantContext, input: Omit<FreightQuote, "id" | "tenantId">): Promise<FreightQuote> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO vn_sourcing.freight_quote (
         id, tenant_id, customer_id, origin_country, origin_port, dest_country, dest_port,
         container_type, volume_cbm, weight_kg, forwarder_name, price_usd_minor, transit_days, valid_until, created_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.customerId, input.originCountry, input.originPort, input.destCountry, input.destPort,
        input.containerType, input.volumeCbm ?? null, input.weightKg, input.forwarderName,
        String(input.priceUsdMinor), input.transitDays, input.validUntil,
      ]
    )
    return mapFreight(rows[0])
  }
}

function mapInterpreter(r: any): Interpreter {
  return {
    id: r.id, tenantId: r.tenant_id, userId: r.user_id, languages: r.languages ?? [],
    specialties: r.specialties ?? [], hourlyRateUsdMinor: BigInt(r.hourly_rate_usd_minor),
    rating: Number(r.rating ?? 0), totalSessions: Number(r.total_sessions ?? 0),
    status: r.status, bio: r.bio,
  }
}
function mapInterpreterSession(r: any): InterpreterSession {
  return {
    id: r.id, tenantId: r.tenant_id, customerId: r.customer_id, interpreterId: r.interpreter_id,
    scheduledStartAt: r.scheduled_start_at, durationMinutes: Number(r.duration_minutes),
    mode: r.mode, contextType: r.context_type, status: r.status,
    totalCostMinor: BigInt(r.total_cost_minor), currency: r.currency,
    feedbackRating: r.feedback_rating, recordingUrl: r.recording_url,
  }
}
function mapVisit(r: any): FactoryVisit {
  return {
    id: r.id, tenantId: r.tenant_id, customerId: r.customer_id, supplierId: r.supplier_id,
    scheduledDate: r.scheduled_date, interpreterSessionId: r.interpreter_session_id,
    attendees: Number(r.attendees), agenda: r.agenda, status: r.status,
    meetingNotes: r.meeting_notes, outcome: r.outcome,
    photoUrls: r.photo_urls ?? [], videoUrl: r.video_url,
  }
}
function mapAudit(r: any): AuditReport {
  return {
    id: r.id, tenantId: r.tenant_id, supplierId: r.supplier_id, auditType: r.audit_type,
    auditorAgency: r.auditor_agency, scheduledDate: r.scheduled_date, completedDate: r.completed_date,
    overallScore: r.overall_score, passFail: r.pass_fail,
    reportPdfUrl: r.report_pdf_url, certificateUrl: r.certificate_url, expiresAt: r.expires_at,
    findings: r.findings ?? [],
  }
}
function mapMou(r: any): MouContract {
  return {
    id: r.id, tenantId: r.tenant_id, customerId: r.customer_id, supplierId: r.supplier_id,
    status: r.status, startDate: r.start_date, endDate: r.end_date, terms: r.terms ?? {},
    signedPdfUrl: r.signed_pdf_url, totalCommittedUsdMinor: BigInt(r.total_committed_usd_minor),
  }
}
function mapSample(r: any): SampleRequest {
  return {
    id: r.id, tenantId: r.tenant_id, customerId: r.customer_id, supplierId: r.supplier_id,
    productId: r.product_id, description: r.description, quantity: Number(r.quantity),
    shippingAddress: r.shipping_address ?? {}, sampleFeeMinor: BigInt(r.sample_fee_minor),
    shippingFeeMinor: BigInt(r.shipping_fee_minor), currency: r.currency,
    status: r.status, trackingNumber: r.tracking_number,
    receivedAt: r.received_at, feedbackRating: r.feedback_rating,
  }
}
function mapFreight(r: any): FreightQuote {
  return {
    id: r.id, tenantId: r.tenant_id, customerId: r.customer_id,
    originCountry: r.origin_country, originPort: r.origin_port,
    destCountry: r.dest_country, destPort: r.dest_port,
    containerType: r.container_type, volumeCbm: r.volume_cbm,
    weightKg: Number(r.weight_kg), forwarderName: r.forwarder_name,
    priceUsdMinor: BigInt(r.price_usd_minor), transitDays: Number(r.transit_days), validUntil: r.valid_until,
  }
}

export default VnSourcingService
