/**
 * Marketplace workflows (stub Sprint 10 Pha 2d D24 Path D)
 *
 * STATUS: onboardSupplierWorkflow commented out do marketplace service drop.
 *
 * Original workflow (1):
 * - onboardSupplierWorkflow → createSupplierStep + uploadInitialDocsStep
 *   → service.createSupplier (dropped Bước 2)
 *   → service.softDeleteSupplier (compensation, dropped Bước 2)
 *   → service.uploadKycDocument (dropped Bước 2)
 *
 * Sprint 11+ TODO: Re-implement khi marketplace service rewrite drives.
 * Pattern reference: Pha 2a communication module workflows (nếu có).
 *
 * External consumers: 0 (verified grep Bước 0).
 */

export {}
