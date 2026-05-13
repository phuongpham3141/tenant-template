import type { CollectionConfig } from 'payload'
import { isSuperAdmin, hasRole } from '../access/rbac'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'displayName', 'roles', 'tenantId', 'updatedAt'],
    group: 'Admin',
  },
  auth: {
    tokenExpiration: 28800,
    maxLoginAttempts: 8,
    lockTime: 600_000,
    useAPIKey: true,
    cookies: { sameSite: 'Lax' },
  },
  access: {
    create: isSuperAdmin,
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.roles?.includes?.('superadmin')) return true
      return { id: { equals: req.user.id } }
    },
    update: hasRole('superadmin', 'tenant_admin'),
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
    },
    {
      name: 'tenantId',
      type: 'text',
      index: true,
      admin: {
        description: 'PG tenant_id (UUID). null = global superadmin.',
      },
    },
    {
      name: 'medusaUserId',
      type: 'text',
      index: true,
      admin: {
        description: 'Link to Medusa identity.user.id for cross-system identity',
      },
    },
    {
      name: 'supplierId',
      type: 'text',
      index: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['content_editor'],
      options: [
        { label: 'Superadmin', value: 'superadmin' },
        { label: 'Tenant admin', value: 'tenant_admin' },
        { label: 'Content editor', value: 'content_editor' },
        { label: 'Marketing manager', value: 'marketing_manager' },
        { label: 'Support agent', value: 'support_agent' },
        { label: 'Supplier admin', value: 'supplier_admin' },
        { label: 'Supplier user', value: 'supplier_user' },
      ],
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'vi',
      options: [
        { label: 'Tiếng Việt', value: 'vi' },
        { label: 'English', value: 'en' },
        { label: '中文', value: 'cn' },
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'lastSignInAt',
      type: 'date',
      admin: { readOnly: true },
    },
  ],
}
