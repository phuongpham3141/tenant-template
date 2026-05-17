/**
 * Auth-security module service (minimal stub)
 *
 * Sprint 11 Pha 2d Module 1 (D33 Path D drop)
 *
 * STATUS: All 6 service methods dropped:
 * - recordLogin, createSession, revokeSession, enrollMfa,
 *   createPasswordResetToken, consumePasswordResetToken
 * - 3/4 INSERT target tables MISSING (mfa_enrollment + password_reset_token + session)
 *   + 1 existing (login_attempt_log used by recordLogin)
 * - L27 verified 0 storefront/admin/SDK imports
 * - 0 cascade refs (medusa-side)
 *
 * Sprint 9A auth flow safety: Uses Medusa built-in /auth/customer/emailpass/*
 * endpoints, NOT custom auth-security service. Verified Bước 0.
 *
 * Schema auth.* PRESERVED (29 tables).
 *
 * Sprint 12+ TODO (LOW priority):
 * - Rewrite when advanced auth features drive (MFA, SSO, brute-force protection)
 * - Pattern reference: Pha 2a communication (raw-SQL pattern)
 */

import { MedusaService } from "@medusajs/framework/utils"

class AuthSecurityService extends MedusaService({}) {
  // STUB: All 6 methods dropped Sprint 11 Pha 2d Module 1 (D33).
  // Sprint 9A auth flow uses Medusa built-in, NOT this module.
}

export default AuthSecurityService
