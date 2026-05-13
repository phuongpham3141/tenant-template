import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { statusField, tenantIdField } from '../../access/fields'

export const PrivacyPolicyVersion: CollectionConfig = {
  slug: 'privacy-policy-versions',
  admin: {
    useAsTitle: 'versionLabel',
    defaultColumns: ['versionLabel', 'effectiveDate', '_status', 'updatedAt'],
    group: 'Legal',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin'),
    delete: hasRole('superadmin'),
  },
  versions: { drafts: true, maxPerDoc: 100 },
  fields: [
    tenantIdField,
    { name: 'versionLabel', type: 'text', required: true, unique: true, admin: { description: 'e.g., v2.1, 2026-05-11' } },
    {
      name: 'jurisdictionScope',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['global'],
      options: ['global', 'EU', 'US', 'VN', 'CN', 'APAC'],
    },
    { name: 'effectiveDate', type: 'date', required: true, index: true },
    { name: 'expiresAt', type: 'date' },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'sectionId', type: 'text', required: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'content', type: 'richText', localized: true },
      ],
    },
    { name: 'changeNotes', type: 'textarea', admin: { description: 'Diff vs prior version (for audit)' } },
    { name: 'approvedBy', type: 'relationship', relationTo: 'users' },
    { name: 'approvedAt', type: 'date' },
    { name: 'requiresReConsent', type: 'checkbox', defaultValue: false },
    statusField,
  ],
}
