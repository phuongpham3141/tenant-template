import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import type { TaxCalculationInput, TaxCalculationResult, FtaRule, TaxJurisdiction, TaxRate } from "./types"

class TaxEngineService extends MedusaService({}) {
  async listJurisdictions(ctx: TenantContext, country?: string): Promise<TaxJurisdiction[]> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM tax.tax_jurisdiction ${country ? "WHERE country = $1" : ""} ORDER BY country, level, code`,
      country ? [country] : []
    )
    return rows.map((r) => ({ code: r.code, parentCode: r.parent_code, country: r.country, region: r.region, name: r.name, level: r.level }))
  }

  async listRates(ctx: TenantContext, jurisdictionCode: string, asOf?: Date): Promise<TaxRate[]> {
    const ref = asOf ?? new Date()
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM tax.tax_rate
       WHERE jurisdiction_code = $1
         AND applicable_from <= $2
         AND (applicable_to IS NULL OR applicable_to > $2)`,
      [jurisdictionCode, ref]
    )
    return rows.map((r) => ({
      id: r.id, jurisdictionCode: r.jurisdiction_code, taxType: r.tax_type, rate: Number(r.rate),
      applicableFrom: r.applicable_from, applicableTo: r.applicable_to,
      scope: r.scope, scopeValue: r.scope_value,
    }))
  }

  async lookupFta(ctx: TenantContext, originCountry: string, destCountry: string, hsCode: string, agreementCode?: string): Promise<FtaRule | null> {
    const params: unknown[] = [originCountry, destCountry, hsCode, new Date()]
    let where = "WHERE origin_country = $1 AND dest_country = $2 AND hs_code = $3 AND effective_from <= $4 AND (effective_to IS NULL OR effective_to > $4)"
    if (agreementCode) {
      params.push(agreementCode)
      where += ` AND agreement_code = $${params.length}`
    }
    const rows = await queryT<any>(ctx, `SELECT * FROM tax.fta_rule ${where} ORDER BY preferential_rate ASC LIMIT 1`, params)
    if (!rows[0]) return null
    return {
      id: rows[0].id, agreementCode: rows[0].agreement_code, originCountry: rows[0].origin_country,
      destCountry: rows[0].dest_country, hsCode: rows[0].hs_code, preferentialRate: Number(rows[0].preferential_rate),
      requiresCertificateOfOrigin: rows[0].requires_certificate_of_origin,
      effectiveFrom: rows[0].effective_from, effectiveTo: rows[0].effective_to,
    }
  }

  async calculate(ctx: TenantContext, input: TaxCalculationInput): Promise<TaxCalculationResult> {
    const currency = input.items[0]?.currency ?? "USD"
    const breakdown: TaxCalculationResult["breakdown"] = []
    let subtotal = 0n, duty = 0n, vat = 0n, tax = 0n

    const country = input.destCountry
    const jurisdictionCode = input.destRegion ? `${country}-${input.destRegion}` : country
    const rates = await this.listRates(ctx, jurisdictionCode)
    const vatRate = rates.find((r) => r.taxType === "vat" || r.taxType === "gst" || r.taxType === "sales")

    for (const item of input.items) {
      const lineSubtotal = item.unitPriceMinor * BigInt(item.quantity)
      subtotal += lineSubtotal

      // Customs duty (with FTA preference if available)
      let dutyRate = 0
      const fta = input.applyFtaAgreement
        ? await this.lookupFta(ctx, input.originCountry, input.destCountry, item.hsCode, input.applyFtaAgreement)
        : await this.lookupFta(ctx, input.originCountry, input.destCountry, item.hsCode)
      if (fta && (!fta.requiresCertificateOfOrigin || input.certificateOfOriginAvailable)) {
        dutyRate = fta.preferentialRate
      } else {
        const dutyMaster = await queryT<any>(ctx, `SELECT mfn_rate FROM tax.hs_code_master WHERE code = $1`, [item.hsCode])
        dutyRate = Number(dutyMaster[0]?.mfn_rate ?? 0)
      }
      const lineDuty = BigInt(Math.round(Number(lineSubtotal) * dutyRate / 100))
      duty += lineDuty
      breakdown.push({ taxType: "duty", rate: dutyRate, baseMinor: lineSubtotal, amountMinor: lineDuty, jurisdiction: `${input.originCountry}->${input.destCountry}` })

      // VAT (on subtotal + duty)
      if (vatRate) {
        const vatBase = lineSubtotal + lineDuty
        const lineVat = BigInt(Math.round(Number(vatBase) * vatRate.rate / 100))
        vat += lineVat
        breakdown.push({ taxType: vatRate.taxType, rate: vatRate.rate, baseMinor: vatBase, amountMinor: lineVat, jurisdiction: jurisdictionCode })
      }
    }
    tax = duty + vat
    return { subtotalMinor: subtotal, taxMinor: tax, dutyMinor: duty, vatMinor: vat, totalMinor: subtotal + tax, currency, breakdown }
  }
}

export default TaxEngineService
