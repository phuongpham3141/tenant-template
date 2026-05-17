/**
 * Fulfillment-pro module service (Sprint 11 Pha 2e Module 3 D-PARTIAL drop)
 *
 * D39 Path D-partial: dropped 4 methods touching MISSING tables.
 *
 * BƯỚC 0 audit revealed worse than Pha 1 (Pha 1 said 1/4 broken, actual 4/8):
 * MISSING tables: warehouse, shipment, inventory_level
 *
 * DROPPED methods (4):
 * - listWarehouses (SELECT fulfillment.warehouse — MISSING)
 * - createShipment (INSERT fulfillment.shipment — MISSING)
 * - updateShipmentStatus (UPDATE fulfillment.shipment — MISSING)
 * - getInventory (SELECT fulfillment.inventory_level — MISSING)
 *
 * PRESERVED methods (4 functional):
 * - submitCustomsDeclaration (INSERT customs_declaration — EXISTS)
 * - startQcInspection (INSERT qc_inspection — EXISTS)
 * - completeQc (UPDATE qc_inspection)
 * - issueInsurance (INSERT insurance_policy — EXISTS)
 *
 * Sprint 12+ TODO: Re-implement warehouse + shipment + inventory tables
 * when shipping/warehouse management feature drives.
 */

import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError } from "../../lib/errors"
import type { CustomsDeclaration, QcInspection, InsurancePolicy } from "./types"

class FulfillmentProService extends MedusaService({}) {
  async submitCustomsDeclaration(ctx: TenantContext, input: Omit<CustomsDeclaration, "id" | "status">): Promise<CustomsDeclaration> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO fulfillment.customs_declaration (
         id, tenant_id, shipment_id, origin_country, dest_country, hs_codes,
         declared_value_usd_minor, content_description, inco_term, duties, status, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5::text[],
         $6, $7, $8, $9::jsonb, 'submitted', NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.shipmentId, input.originCountry, input.destCountry, input.hsCodes,
        String(input.declaredValueUsdMinor), input.contentDescription, input.inco, JSON.stringify(input.duties),
      ]
    )
    return mapCustoms(rows[0])
  }

  async startQcInspection(ctx: TenantContext, shipmentId: string, inspectorUserId: string): Promise<QcInspection> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO fulfillment.qc_inspection (
         id, tenant_id, shipment_id, inspector_user_id, status, defects_found, photo_urls, started_at, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, 'in_progress', '[]'::jsonb, '{}', NOW(), NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, shipmentId, inspectorUserId]
    )
    return mapQc(rows[0])
  }

  async completeQc(ctx: TenantContext, inspectionId: string, decision: { status: QcInspection["status"]; defects?: QcInspection["defectsFound"]; photoUrls?: string[]; reportUrl?: string }): Promise<QcInspection> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE fulfillment.qc_inspection
       SET status = $1, defects_found = $2::jsonb, photo_urls = $3::text[], report_url = $4, completed_at = NOW(), updated_at = NOW()
       WHERE id = $5 AND tenant_id = $6 RETURNING *`,
      [decision.status, JSON.stringify(decision.defects ?? []), decision.photoUrls ?? [], decision.reportUrl ?? null, inspectionId, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("QcInspection", inspectionId)
    await emitAudit(ctx, { actionCode: "qc.complete", resourceType: "fulfillment.qc_inspection", resourceId: inspectionId, after: { status: decision.status, defectCount: (decision.defects ?? []).length }, severity: decision.status === "failed" ? "high" : "info" })
    return mapQc(rows[0])
  }

  async issueInsurance(ctx: TenantContext, input: Omit<InsurancePolicy, "id">): Promise<InsurancePolicy> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO fulfillment.insurance_policy (
         id, tenant_id, shipment_id, insurer, policy_number,
         coverage_usd_minor, premium_usd_minor, deductible_usd_minor,
         coverage_type, effective_date, expiry_date, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4,
         $5, $6, $7, $8, $9, $10, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.shipmentId, input.insurer, input.policyNumber,
        String(input.coverageUsdMinor), String(input.premiumUsdMinor), String(input.deductibleUsdMinor),
        input.coverageType, input.effectiveDate, input.expiryDate,
      ]
    )
    return mapInsurance(rows[0])
  }
}

function mapCustoms(r: any): CustomsDeclaration {
  return {
    id: r.id, shipmentId: r.shipment_id, originCountry: r.origin_country, destCountry: r.dest_country,
    hsCodes: r.hs_codes, declaredValueUsdMinor: BigInt(r.declared_value_usd_minor),
    contentDescription: r.content_description, inco: r.inco_term,
    duties: r.duties, status: r.status,
  }
}
function mapQc(r: any): QcInspection {
  return {
    id: r.id, shipmentId: r.shipment_id, inspectorUserId: r.inspector_user_id,
    status: r.status, defectsFound: r.defects_found ?? [], photoUrls: r.photo_urls ?? [],
    reportUrl: r.report_url, startedAt: r.started_at, completedAt: r.completed_at,
  }
}
function mapInsurance(r: any): InsurancePolicy {
  return {
    id: r.id, shipmentId: r.shipment_id, insurer: r.insurer, policyNumber: r.policy_number,
    coverageUsdMinor: BigInt(r.coverage_usd_minor), premiumUsdMinor: BigInt(r.premium_usd_minor),
    deductibleUsdMinor: BigInt(r.deductible_usd_minor),
    coverageType: r.coverage_type, effectiveDate: r.effective_date, expiryDate: r.expiry_date,
  }
}

export default FulfillmentProService
