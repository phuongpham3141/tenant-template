import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField, publishWindowGroup } from '../../access/fields'

export const TradeAlertContent: CollectionConfig = {
  slug: 'trade-alert-content',
  admin: {
    useAsTitle: 'headline',
    defaultColumns: ['headline', 'alertType', 'severity', 'industries', '_status'],
    group: 'Marketing',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor', 'marketing_manager'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor', 'marketing_manager'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: true },
  fields: [
    tenantIdField,
    { name: 'headline', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'alertType',
      type: 'select',
      required: true,
      options: [
        { label: 'Price movement', value: 'price' },
        { label: 'Market trend', value: 'trend' },
        { label: 'Policy / tariff', value: 'policy' },
        { label: 'Supply shortage', value: 'shortage' },
        { label: 'New supplier', value: 'new_supplier' },
        { label: 'Trade show', value: 'trade_show' },
        { label: 'Regulatory', value: 'regulatory' },
      ],
    },
    {
      name: 'severity',
      type: 'select',
      defaultValue: 'medium',
      options: ['info', 'low', 'medium', 'high', 'critical'],
    },
    {
      name: 'industries',
      type: 'relationship',
      relationTo: 'industry-channels',
      hasMany: true,
    },
    {
      name: 'productKeywords',
      type: 'array',
      fields: [{ name: 'keyword', type: 'text' }],
    },
    {
      name: 'countries',
      type: 'array',
      fields: [{ name: 'code', type: 'text' }],
    },
    { name: 'summary', type: 'textarea', required: true, localized: true },
    { name: 'fullContent', type: 'richText', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'dataPoints',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'value', type: 'text' },
        { name: 'unit', type: 'text' },
        { name: 'changePct', type: 'number' },
      ],
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', localized: true },
        { name: 'file', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'pushChannels',
      type: 'select',
      hasMany: true,
      defaultValue: ['email'],
      options: ['email', 'sms', 'whatsapp', 'zalo', 'wechat', 'in_app'],
    },
    { name: 'sentAt', type: 'date', admin: { readOnly: true } },
    { name: 'recipientCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    publishWindowGroup,
    seoGroup,
    statusField,
  ],
}
