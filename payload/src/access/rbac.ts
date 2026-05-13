import type { Access, FieldAccess } from 'payload'

export type UserRole =
  | 'superadmin'
  | 'tenant_admin'
  | 'content_editor'
  | 'marketing_manager'
  | 'support_agent'
  | 'supplier_admin'
  | 'supplier_user'
  | 'public'

export interface AppUser {
  id: string
  email: string
  roles?: UserRole[]
  tenantId?: string
  supplierId?: string
}

export const hasRole =
  (...allowed: UserRole[]): Access =>
  ({ req }) => {
    const user = req.user as AppUser | null
    if (!user) return false
    return (user.roles ?? []).some((r) => allowed.includes(r))
  }

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

export const isSuperAdmin: Access = ({ req }) => {
  const user = req.user as AppUser | null
  return Boolean(user?.roles?.includes('superadmin'))
}

export const isTenantScoped: Access = ({ req }) => {
  const user = req.user as AppUser | null
  if (!user) return false
  if (user.roles?.includes('superadmin')) return true
  if (!user.tenantId) return false
  return { tenantId: { equals: user.tenantId } }
}

export const fieldEditableBy =
  (...allowed: UserRole[]): FieldAccess =>
  ({ req }) => {
    const user = req.user as AppUser | null
    if (!user) return false
    return (user.roles ?? []).some((r) => allowed.includes(r))
  }

export const publishedReadable: Access = ({ req }) => {
  const user = req.user as AppUser | null
  if (user?.roles?.some((r) => ['superadmin', 'tenant_admin', 'content_editor'].includes(r))) {
    return true
  }
  return { _status: { equals: 'published' } }
}
