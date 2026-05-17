/**
 * Marketplace module service (minimal stub)
 *
 * Sprint 10 Pha 2d (D24 Path D drop)
 *
 * STATUS: All 8 service methods dropped do schema reality mismatch.
 *
 * Service was written cho simplistic supplier model:
 * - Cols: operation_mode, can_sell_wholesale/retail/agent, year_established,
 *   primary_industry_code, status
 * - Helper mapSupplier maps row → Supplier interface assuming these cols
 *
 * Schema reality identity.supplier (60+ cols production-grade):
 * - supplier_type (factory/dealer_distributor/dealer_broker/trading_company/service_vendor)
 * - province/city/address_line/geo_lat/geo_lng (VN-specific địa lý)
 * - primary_currency/support_languages (i18n)
 * - is_audited/audit_expires_at/audit_organization (audit verification)
 * - verification_tier 0-6 (Unverified/Email/Business/Audited/Gold/Titan/Diamond)
 * - membership_tier (free/gold/titan/diamond) + GMV rolling 12m
 * - rating_overall/quality/response_time/shipping/communication/pricing/customization
 * - response_rate_pct, avg_response_hours, on_time_shipping_pct, dispute_rate_pct
 * - opt_out_intermediary, accepts_oem_odm, accepts_sample_orders
 * - sells_b2c, sells_b2b, approved_at, suspended_at
 *
 * Dealer capabilities = SEPARATE TABLE identity.dealer_capability (KHÔNG cols).
 *
 * Cascade Bước 0 verified:
 * - 0 UI consumers (Admin supplier-applications uses public.supplier_application not MarketplaceService)
 * - 0 external MARKETPLACE_MODULE refs medusa/src
 * - 0 storefront refs to MarketplaceService
 * - workflows.ts onboardSupplierWorkflow has 0 external consumers
 * - 7 rows existing identity.supplier seed (Sprint 1 R20)
 * - 0 rows identity.kyc_document, verification_record, dealer_capability
 *
 * Sprint 11+ TODO (MEDIUM priority — seller-center UI flow drives requirement):
 * - Rewrite service với schema reality cols (60+ cols match)
 * - Separate dealer_capability CRUD module
 * - Pattern reference: Pha 2a communication (raw-SQL + queryT/withTenant)
 * - Scope estimate: 12-16h
 * - Pre-requisite: seller-center onboarding UX design freeze
 *
 * Schema tables PRESERVED (no migration):
 * - identity.supplier (60+ cols, 7 rows seed)
 * - identity.kyc_document (0 rows)
 * - identity.verification_record (0 rows)
 * - identity.dealer_capability (0 rows)
 * - identity.supplier_user (FK constraint)
 */

import { MedusaService } from "@medusajs/framework/utils"

class MarketplaceService extends MedusaService({}) {
  // STUB: All methods dropped Sprint 10 Pha 2d D24 Path D.
  // See class docstring above for rationale.
  // Sprint 11+ rewrite: Pha 2a pattern + seller-center UX freeze.
}

export default MarketplaceService
