/**
 * Marketplace module types (minimal stub)
 *
 * Sprint 10 Pha 2d (D24 Path D drop)
 *
 * STATUS: 9 type definitions dropped:
 * - SupplierTier (0-6)
 * - SupplierStatus enum
 * - OperationMode enum
 * - Supplier interface (broken cols dealerCapabilities, operationMode, yearEstablished, primaryIndustryCode)
 * - CreateSupplierInput (broken)
 * - UpdateSupplierInput (broken)
 * - KycDocument (clean NHƯNG context dropped với service)
 * - VerificationRecord (clean NHƯNG context dropped với service)
 *
 * See service.ts class docstring for full architectural rationale.
 *
 * Sprint 11+ TODO: Rewrite với schema reality cols matching:
 * - Supplier (60 plus cols, supplier_type, province, city, geo lat/lng, primary_currency,
 *   support_languages, is_audited, membership_tier, rolling_12m_gmv, 7 ratings, etc)
 * - DealerCapability (separate table identity.dealer_capability)
 * - KycDocument (10 plus cols matching identity.kyc_document)
 * - VerificationRecord (matching identity.verification_record)
 */

export {}
