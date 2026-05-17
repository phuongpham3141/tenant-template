/**
 * RBAC module service (Sprint 11 Pha 2e Module 2 D-PARTIAL drop)
 *
 * D38 Path D-partial: dropped 2 methods touching rbac.role (MISSING).
 *
 * DROPPED methods:
 * - listRoles (SELECT rbac.role — MISSING)
 * - createRole (INSERT rbac.role — MISSING)
 *
 * PRESERVED methods (6 functional):
 * - listPermissions (SELECT rbac.permission_master — EXISTS)
 * - assignRole (INSERT rbac.user_role_assignment — EXISTS)
 * - revokeRole (DELETE rbac.user_role_assignment)
 * - hasPermission (SELECT public.has_permission function)
 * - requirePermission (calls hasPermission)
 * - openBreakGlass (INSERT rbac.break_glass_access — EXISTS)
 *
 * Sprint 12+ TODO: Re-implement role CRUD when RBAC management UI drives.
 * Schema has role_permission_grant + user_role_assignment + break_glass_access
 * but no role table — may need migration to add or restructure.
 */

import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { PermissionDeniedError, NotFoundError } from "../../lib/errors"
import type { Permission, UserRoleAssignment, BreakGlassAccess } from "./types"

class RbacService extends MedusaService({}) {
  async listPermissions(ctx: TenantContext): Promise<Permission[]> {
    const rows = await queryT<any>(ctx, `SELECT * FROM rbac.permission_master ORDER BY resource, action`, [])
    return rows.map((r) => ({ code: r.code, resource: r.resource, action: r.action, description: r.description }))
  }

  async assignRole(ctx: TenantContext, input: Omit<UserRoleAssignment, "id" | "grantedAt" | "grantedBy">): Promise<UserRoleAssignment> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO rbac.user_role_assignment (
         id, tenant_id, user_id, role_id, scope_type, scope_id, expires_at,
         granted_by_user_id, granted_at, created_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.userId, input.roleId, input.scopeType ?? null, input.scopeId ?? null, input.expiresAt ?? null, ctx.userId]
    )
    await emitAudit(ctx, { actionCode: "rbac.role.assign", resourceType: "rbac.user_role_assignment", resourceId: rows[0].id, after: rows[0], severity: "high" })
    return mapAssignment(rows[0])
  }

  async revokeRole(ctx: TenantContext, assignmentId: string): Promise<void> {
    const rows = await queryT<any>(ctx, `DELETE FROM rbac.user_role_assignment WHERE id = $1 AND tenant_id = $2 RETURNING *`, [assignmentId, ctx.tenantId])
    if (!rows[0]) throw new NotFoundError("UserRoleAssignment", assignmentId)
    await emitAudit(ctx, { actionCode: "rbac.role.revoke", resourceType: "rbac.user_role_assignment", resourceId: assignmentId, severity: "high" })
  }

  async hasPermission(ctx: TenantContext, userId: string, permissionCode: string, scopeType?: string, scopeId?: string): Promise<boolean> {
    const rows = await queryT<any>(
      ctx,
      `SELECT public.has_permission($1::uuid, $2, $3, $4::uuid) AS allowed`,
      [userId, permissionCode, scopeType ?? null, scopeId ?? null]
    )
    return Boolean(rows[0]?.allowed)
  }

  async requirePermission(ctx: TenantContext, userId: string, permissionCode: string, scopeType?: string, scopeId?: string): Promise<void> {
    const ok = await this.hasPermission(ctx, userId, permissionCode, scopeType, scopeId)
    if (!ok) throw new PermissionDeniedError(permissionCode)
  }

  async openBreakGlass(ctx: TenantContext, input: { userId: string; reason: string; approverId: string; scopes: string[]; ttlMinutes: number }): Promise<BreakGlassAccess> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO rbac.break_glass_access (
         id, tenant_id, user_id, reason, approver_user_id, scopes, expires_at, used_actions, created_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5::text[], NOW() + ($6 || ' minutes')::interval, '{}', NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.userId, input.reason, input.approverId, input.scopes, String(input.ttlMinutes)]
    )
    await emitAudit(ctx, { actionCode: "rbac.break_glass.open", resourceType: "rbac.break_glass_access", resourceId: rows[0].id, after: rows[0], severity: "critical" })
    return {
      id: rows[0].id, userId: rows[0].user_id, reason: rows[0].reason, approvedBy: rows[0].approver_user_id,
      scopes: rows[0].scopes ?? [], expiresAt: rows[0].expires_at, usedActions: rows[0].used_actions ?? [],
    }
  }
}

function mapAssignment(r: any): UserRoleAssignment {
  return {
    id: r.id, userId: r.user_id, roleId: r.role_id, tenantId: r.tenant_id,
    scopeType: r.scope_type, scopeId: r.scope_id, expiresAt: r.expires_at,
    grantedBy: r.granted_by_user_id, grantedAt: r.granted_at,
  }
}

export default RbacService
