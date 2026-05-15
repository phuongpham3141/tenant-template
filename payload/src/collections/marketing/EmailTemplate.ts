import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { statusField, tenantIdField } from '../../access/fields'

export const EmailTemplate: CollectionConfig = {
  slug: 'email-templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'subject', 'usageCount', '_status'],
    group: 'Marketing',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'marketing_manager', 'content_editor'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'marketing_manager', 'content_editor'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: true, maxPerDoc: 50 },
  fields: [
    tenantIdField,
    { name: 'name', type: 'text', required: true },
    { name: 'code', type: 'text', required: true, unique: true, index: true, admin: { description: 'Unique key referenced by Medusa email service' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Transactional', value: 'transactional' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Welcome', value: 'welcome' },
        { label: 'Order', value: 'order' },
        { label: 'Payment', value: 'payment' },
        { label: 'Shipping', value: 'shipping' },
        { label: 'KYC', value: 'kyc' },
        { label: 'Security', value: 'security' },
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Promotional', value: 'promotional' },
      ],
    },
    { name: 'subject', type: 'text', required: true, localized: true },
    { name: 'preheader', type: 'text', localized: true },
    {
      name: 'mjmlSource',
      type: 'code',
      required: true,
      admin: { language: 'xml', description: 'MJML markup (compiled to HTML on send)' },
    },
    {
      name: 'textVersion',
      type: 'textarea',
      localized: true,
      admin: { description: 'Plain text fallback' },
    },
    {
      name: 'variables',
      type: 'array',
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'defaultValue', type: 'text' },
        { name: 'required', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'fromAddress',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Cybersilkroads' },
        { name: 'email', type: 'email', defaultValue: 'noreply@huayuesc.vn' },
      ],
    },
    { name: 'replyTo', type: 'email' },
    {
      name: 'attachments',
      type: 'array',
      fields: [{ name: 'file', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'transactional',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Bypass suppression list (e.g., password reset)' },
    },
    {
      name: 'unsubscribeFooter',
      type: 'checkbox',
      defaultValue: true,
    },
    { name: 'usageCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'lastSentAt', type: 'date', admin: { readOnly: true } },
    statusField,
  ],
}
