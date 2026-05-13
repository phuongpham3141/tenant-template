export type MfaMethod = "totp" | "sms" | "passkey" | "backup_code" | "email_otp"
export type SessionStatus = "active" | "revoked" | "expired" | "suspicious"

export interface Session {
  id: string
  tenantId: string
  userId: string
  ipAddress: string
  userAgent: string
  deviceFingerprint?: string
  status: SessionStatus
  issuedAt: Date
  expiresAt: Date
  lastSeenAt: Date
  geoCountry?: string
  riskScore: number
}

export interface MfaEnrollment {
  id: string
  userId: string
  method: MfaMethod
  isPrimary: boolean
  enrolledAt: Date
  lastUsedAt?: Date
  metadata?: Record<string, unknown>
}

export interface LoginAttempt {
  id: string
  tenantId: string
  userId?: string
  identifier: string
  identifierType: "email" | "phone" | "username"
  authMethod: "password" | "magic_link" | "oauth" | "passkey" | "mfa"
  success: boolean
  failureReason?: string
  ipAddress: string
  userAgent: string
  riskScore: number
  occurredAt: Date
}

export interface PasswordResetToken {
  id: string
  userId: string
  token: string
  expiresAt: Date
  consumedAt?: Date
}
