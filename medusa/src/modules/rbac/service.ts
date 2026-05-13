import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { PermissionDeniedError, NotFoundError } from "../../lib/errors"
import type { Permission, Role, UserRoleAssignment, BreakGlassAccess } from "./types"

class RbacService extends MedusaService({}) {
  async listPermissions(ctx: TenantContext): Promise<Permission[]> {
    const rows = await queryT<any>(ctx, `SELECT * FROM rbac.permission_master ORDER BY resource, action`, [])
    return rows.map((r) => ({ code: r.code, resource: r.resource, action: r.action, description: r.description }))
  }

  async listRoles(ctx: TenantContext): Promise<Role[]> {
    const rows = await queryT<any>(ctx, `SELECT * FROM rbac.role WHERE tenant_id = $1 OR tenant_id IS NULL ORDER BY code`, [ctx.tenantId])
    return rows.map((r) => ({
      id: r.id, tenantId: r.tenant_id, code: r.code, name: r.name,
      description: r.description, isSystemRole: r.is_system_role, isAssignable: r.is_assignable,
    }))
  }

  async createRole(ctx: TenantContext, input: { code: string; name: string; description?: string; permissionCodes: string[] }): Promise<Role> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO rbac.role (id, tenant_id, code, name, description, is_system_role, is_assignable, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, FALSE, TRUE, NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.code, input.name, input.description ?? null]
    )
    const role = rows[0]
    for (const p of input.permissionCodes) {
      await queryT(ctx,
        `INSERT INTO rbac.role_permission_grant (role_id, permission_code, granted_at, granted_by_user_id) VALUES ($1, $2, NOW(), $3) ON CONFLICT DO NOTHING`,
        [role.id, p, ctx.userId])
    }
    await emitAudit(ctx, { actionCode: "rbac.role.create", resourceType: "rbac.role", resourceId: role.id, after: role, severity: "high" })
    return { id: role.id, tenantId: role.tenant_id, code: role.code, name: role.name, description: role.description, isSystemRole: false, isAssignable: true }
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
