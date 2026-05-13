import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { statusField, tenantIdField } from '../../access/fields'

export const FAQItem: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'displayOrder', '_status'],
    group: 'Help',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor', 'support_agent'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor', 'support_agent'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: true },
  fields: [
    tenantIdField,
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'richText', required: true, localized: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'General', value: 'general' },
        { label: 'Account', value: 'account' },
        { label: 'Payment', value: 'payment' },
        { label: 'Shipping', value: 'shipping' },
        { label: 'Returns', value: 'returns' },
        { label: 'KYC', value: 'kyc' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'B2B', value: 'b2b' },
        { label: 'Live commerce', value: 'live' },
      ],
    },
    {
      name: 'audience',
      type: 'select',
      hasMany: true,
      defaultValue: ['all'],
      options: ['all', 'buyer', 'supplier', 'dealer'],
    },
    { name: 'helpfulYes', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'helpfulNo', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'displayOrder', type: 'number', defaultValue: 100 },
    statusField,
  ],
}
