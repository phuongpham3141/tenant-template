export interface TaxJurisdiction {
  code: string
  parentCode?: string | null
  country: string
  region?: string | null
  name: string
  level: "country" | "state" | "city"
}

export interface TaxRate {
  id: string
  jurisdictionCode: string
  taxType: "vat" | "gst" | "sales" | "customs_duty" | "excise" | "withholding"
  rate: number
  applicableFrom: Date
  applicableTo?: Date | null
  scope: "all" | "category" | "hs_code"
  scopeValue?: string | null
}

export interface FtaRule {
  id: string
  agreementCode: string
  originCountry: string
  destCountry: string
  hsCode: string
  preferentialRate: number
  requiresCertificateOfOrigin: boolean
  effectiveFrom: Date
  effectiveTo?: Date | null
}

export interface TaxCalculationInput {
  originCountry: string
  destCountry: string
  destRegion?: string
  items: Array<{
    sku: string
    hsCode: string
    categoryId?: string
    quantity: number
    unitPriceMinor: bigint
    currency: string
  }>
  applyFtaAgreement?: string
  certificateOfOriginAvailable?: boolean
}

export interface TaxCalculationResult {
  subtotalMinor: bigint
  taxMinor: bigint
  dutyMinor: bigint
  vatMinor: bigint
  totalMinor: bigint
  currency: string
  breakdown: Array<{ taxType: string; rate: number; baseMinor: bigint; amountMinor: bigint; jurisdiction: string }>
}
