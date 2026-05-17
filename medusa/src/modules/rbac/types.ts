/**
 * RBAC module types (Sprint 11 Pha 2e Module 2 D-PARTIAL)
 *
 * DROPPED: Role (table missing)
 * PRESERVED: Permission, RolePermissionGrant, UserRoleAssignment, BreakGlassAccess
 */

export interface Permission {
  code: string
  resource: string
  action: string
  description?: string
}

export interface RolePermissionGrant {
  roleId: string
  permissionCode: string
  grantedAt: Date
  grantedBy: string
}

export interface UserRoleAssignment {
  id: string
  userId: string
  roleId: string
  tenantId: string
  scopeType?: "tenant" | "supplier" | "warehouse" | "category" | "country"
  scopeId?: string
  expiresAt?: Date
  grantedBy: string
  grantedAt: Date
}

export interface BreakGlassAccess {
  id: string
  userId: string
  reason: string
  approvedBy: string
  scopes: string[]
  expiresAt: Date
  usedActions: string[]
}
