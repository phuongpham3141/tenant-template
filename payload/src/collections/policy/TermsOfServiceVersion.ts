import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { statusField, tenantIdField } from '../../access/fields'

export const TermsOfServiceVersion: CollectionConfig = {
  slug: 'tos-versions',
  admin: {
    useAsTitle: 'versionLabel',
    defaultColumns: ['versionLabel', 'audience', 'effectiveDate', '_status'],
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
    { name: 'versionLabel', type: 'text', required: true, unique: true },
    {
      name: 'audience',
      type: 'select',
      required: true,
      defaultValue: 'buyer',
      options: [
        { label: 'Buyer ToS', value: 'buyer' },
        { label: 'Supplier ToS', value: 'supplier' },
        { label: 'Dealer ToS', value: 'dealer' },
        { label: 'API developer', value: 'developer' },
        { label: 'Service provider', value: 'service_provider' },
      ],
    },
    {
      name: 'jurisdictionScope',
      type: 'select',
      hasMany: true,
      defaultValue: ['global'],
      options: ['global', 'VN', 'CN', 'EU', 'US'],
    },
    { name: 'effectiveDate', type: 'date', required: true, index: true },
    { name: 'content', type: 'richText', required: true, localized: true },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'sectionId', type: 'text', required: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'content', type: 'richText', localized: true },
      ],
    },
    {
      name: 'governingLaw',
      type: 'select',
      defaultValue: 'VN',
      options: [
        { label: 'Vietnam', value: 'VN' },
        { label: 'Singapore', value: 'SG' },
        { label: 'Hong Kong', value: 'HK' },
        { label: 'Mainland China', value: 'CN' },
      ],
    },
    { name: 'changeNotes', type: 'textarea' },
    { name: 'approvedBy', type: 'relationship', relationTo: 'users' },
    { name: 'approvedAt', type: 'date' },
    { name: 'requiresReAcceptance', type: 'checkbox', defaultValue: false },
    statusField,
  ],
}
