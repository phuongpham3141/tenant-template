import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError } from "../../lib/errors"
import type { Warehouse, InventorySnapshot, Shipment, ShipmentStatus, CustomsDeclaration, QcInspection, InsurancePolicy } from "./types"

class FulfillmentProService extends MedusaService({}) {
  async listWarehouses(ctx: TenantContext): Promise<Warehouse[]> {
    const rows = await queryT<any>(ctx, `SELECT * FROM fulfillment.warehouse WHERE active = TRUE ORDER BY code`, [])
    return rows.map(mapWarehouse)
  }

  async createShipment(ctx: TenantContext, input: Omit<Shipment, "id" | "tenantId" | "status">): Promise<Shipment> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO fulfillment.shipment (
         id, tenant_id, order_id, from_warehouse_id, to_address,
         carrier, service_level, weight_kg, dimensions_cm,
         status, estimated_delivery_at, metadata, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4::jsonb,
         $5, $6, $7, $8::jsonb,
         'draft', $9, $10::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.orderId, input.fromWarehouseId, JSON.stringify(input.toAddress),
        input.carrier, input.serviceLevel, input.weightKg, JSON.stringify(input.dimensionsCm),
        input.estimatedDeliveryAt ?? null, JSON.stringify(input.metadata ?? {}),
      ]
    )
    const ship = mapShipment(rows[0])
    await emitAudit(ctx, { actionCode: "shipment.create", resourceType: "fulfillment.shipment", resourceId: ship.id, after: ship })
    return ship
  }

  async updateShipmentStatus(ctx: TenantContext, shipmentId: string, status: ShipmentStatus, trackingNumber?: string): Promise<Shipment> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE fulfillment.shipment
       SET status = $1, tracking_number = COALESCE($2, tracking_number),
           actual_delivery_at = CASE WHEN $1 = 'delivered' THEN NOW() ELSE actual_delivery_at END,
           updated_at = NOW()
       WHERE id = $3 AND tenant_id = $4 RETURNING *`,
      [status, trackingNumber ?? null, shipmentId, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("Shipment", shipmentId)
    await emitAudit(ctx, { actionCode: "shipment.status_update", resourceType: "fulfillment.shipment", resourceId: shipmentId, after: { status, trackingNumber } })
    return mapShipment(rows[0])
  }

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

  async getInventory(ctx: TenantContext, warehouseId: string, skuIds?: string[]): Promise<InventorySnapshot[]> {
    const params: unknown[] = [warehouseId]
    let where = "WHERE warehouse_id = $1"
    if (skuIds?.length) {
      params.push(skuIds)
      where += ` AND sku_id = ANY($${params.length}::uuid[])`
    }
    const rows = await queryT<any>(
      ctx,
      `SELECT warehouse_id, sku_id,
              COALESCE(on_hand,0) AS on_hand, COALESCE(reserved,0) AS reserved,
              COALESCE(on_hand,0) - COALESCE(reserved,0) AS available,
              COALESCE(inbound,0) AS inbound, COALESCE(damaged,0) AS damaged
       FROM fulfillment.inventory_level ${where}`,
      params
    )
    return rows.map((r) => ({
      warehouseId: r.warehouse_id,
      skuId: r.sku_id,
      onHand: Number(r.on_hand),
      reserved: Number(r.reserved),
      available: Number(r.available),
      inbound: Number(r.inbound),
      damaged: Number(r.damaged),
    }))
  }
}

function mapWarehouse(r: any): Warehouse {
  return {
    id: r.id, tenantId: r.tenant_id, code: r.code, name: r.name, type: r.type,
    addressLine1: r.address_line1, city: r.city, country: r.country, postalCode: r.postal_code,
    lat: r.lat, lng: r.lng, active: r.active, metadata: r.metadata ?? {},
  }
}
function mapShipment(r: any): Shipment {
  return {
    id: r.id, tenantId: r.tenant_id, orderId: r.order_id, fromWarehouseId: r.from_warehouse_id,
    toAddress: r.to_address, carrier: r.carrier, serviceLevel: r.service_level,
    trackingNumber: r.tracking_number, weightKg: Number(r.weight_kg), dimensionsCm: r.dimensions_cm,
    status: r.status, estimatedDeliveryAt: r.estimated_delivery_at, actualDeliveryAt: r.actual_delivery_at,
    metadata: r.metadata ?? {},
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
