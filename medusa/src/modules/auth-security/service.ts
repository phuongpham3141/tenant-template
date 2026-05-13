import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, RateLimitError } from "../../lib/errors"
import crypto from "crypto"
import type { Session, MfaEnrollment, LoginAttempt, MfaMethod, PasswordResetToken } from "./types"

const LOCKOUT_THRESHOLD = 8
const LOCKOUT_WINDOW_MIN = 15

class AuthSecurityService extends MedusaService({}) {
  async recordLogin(ctx: TenantContext, input: Omit<LoginAttempt, "id" | "tenantId" | "occurredAt">): Promise<LoginAttempt> {
    if (!input.success) {
      const { rows: [{ count }] } = await this.runQuery(ctx, "login_lockout_check",
        `SELECT COUNT(*)::int AS count FROM auth.login_attempt_log
         WHERE identifier = $1 AND success = FALSE
           AND occurred_at > NOW() - ($2 || ' minutes')::interval`,
        [input.identifier, String(LOCKOUT_WINDOW_MIN)]
      )
      if (count >= LOCKOUT_THRESHOLD) {
        throw new RateLimitError(`Account locked after ${LOCKOUT_THRESHOLD} failed attempts`)
      }
    }
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO auth.login_attempt_log (
         id, tenant_id, user_id, identifier, identifier_type, auth_method,
         success, failure_reason, ip_address, user_agent, risk_score, occurred_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5,
         $6, $7, $8::inet, $9, $10, NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.userId ?? null, input.identifier, input.identifierType, input.authMethod, input.success, input.failureReason ?? null, input.ipAddress, input.userAgent, input.riskScore]
    )
    if (!input.success) {
      await emitAudit(ctx, { actionCode: "auth.login.fail", resourceType: "identity.user", resourceId: input.userId ?? input.identifier, severity: "medium", outcome: "failure" })
    }
    return mapLogin(rows[0])
  }

  async createSession(ctx: TenantContext, input: Omit<Session, "id" | "tenantId" | "issuedAt" | "lastSeenAt" | "status">): Promise<Session> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO auth.session (
         id, tenant_id, user_id, ip_address, user_agent, device_fingerprint,
         status, issued_at, expires_at, last_seen_at, geo_country, risk_score
       ) VALUES (
         public.uuidv7(), $1, $2, $3::inet, $4, $5,
         'active', NOW(), $6, NOW(), $7, $8
       ) RETURNING *`,
      [ctx.tenantId, input.userId, input.ipAddress, input.userAgent, input.deviceFingerprint ?? null, input.expiresAt, input.geoCountry ?? null, input.riskScore]
    )
    return mapSession(rows[0])
  }

  async revokeSession(ctx: TenantContext, sessionId: string, reason = "user_logout"): Promise<void> {
    await queryT(ctx, `UPDATE auth.session SET status = 'revoked', revoked_at = NOW(), metadata = metadata || jsonb_build_object('revoke_reason', $1) WHERE id = $2 AND tenant_id = $3`, [reason, sessionId, ctx.tenantId])
    await emitAudit(ctx, { actionCode: "auth.session.revoke", resourceType: "auth.session", resourceId: sessionId })
  }

  async enrollMfa(ctx: TenantContext, userId: string, method: MfaMethod, metadata: Record<string, unknown> = {}): Promise<MfaEnrollment> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO auth.mfa_enrollment (id, tenant_id, user_id, method, is_primary, enrolled_at, metadata, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3,
         NOT EXISTS (SELECT 1 FROM auth.mfa_enrollment WHERE user_id = $2),
         NOW(), $4::jsonb, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, userId, method, JSON.stringify(metadata)]
    )
    await emitAudit(ctx, { actionCode: "auth.mfa.enroll", resourceType: "auth.mfa_enrollment", resourceId: rows[0].id, after: { method }, severity: "high" })
    return mapMfa(rows[0])
  }

  async createPasswordResetToken(ctx: TenantContext, userId: string, ttlMinutes = 30): Promise<PasswordResetToken> {
    const token = crypto.randomBytes(32).toString("hex")
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex")
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO auth.password_reset_token (id, tenant_id, user_id, token_hash, expires_at, created_at)
       VALUES (public.uuidv7(), $1, $2, $3, NOW() + ($4 || ' minutes')::interval, NOW()) RETURNING *`,
      [ctx.tenantId, userId, tokenHash, String(ttlMinutes)]
    )
    return { id: rows[0].id, userId, token, expiresAt: rows[0].expires_at }
  }

  async consumePasswordResetToken(ctx: TenantContext, token: string): Promise<string> {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex")
    const rows = await queryT<any>(
      ctx,
      `UPDATE auth.password_reset_token SET consumed_at = NOW()
       WHERE token_hash = $1 AND consumed_at IS NULL AND expires_at > NOW() RETURNING user_id`,
      [tokenHash]
    )
    if (!rows[0]) throw new NotFoundError("Valid reset token")
    return rows[0].user_id
  }

  private async runQuery(ctx: TenantContext, _label: string, sql: string, params: unknown[]) {
    const rows = await queryT<any>(ctx, sql, params)
    return { rows }
  }
}

function mapSession(r: any): Session {
  return {
    id: r.id, tenantId: r.tenant_id, userId: r.user_id, ipAddress: r.ip_address, userAgent: r.user_agent,
    deviceFingerprint: r.device_fingerprint, status: r.status, issuedAt: r.issued_at, expiresAt: r.expires_at,
    lastSeenAt: r.last_seen_at, geoCountry: r.geo_country, riskScore: Number(r.risk_score),
  }
}
function mapMfa(r: any): MfaEnrollment {
  return {
    id: r.id, userId: r.user_id, method: r.method, isPrimary: r.is_primary,
    enrolledAt: r.enrolled_at, lastUsedAt: r.last_used_at, metadata: r.metadata ?? {},
  }
}
function mapLogin(r: any): LoginAttempt {
  return {
    id: r.id, tenantId: r.tenant_id, userId: r.user_id, identifier: r.identifier, identifierType: r.identifier_type,
    authMethod: r.auth_method, success: r.success, failureReason: r.failure_reason,
    ipAddress: r.ip_address, userAgent: r.user_agent, riskScore: Number(r.risk_score), occurredAt: r.occurred_at,
  }
}

export default AuthSecurityService
