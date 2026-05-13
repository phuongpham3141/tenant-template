import type { CollectionConfig } from 'payload'
import { hasRole } from '../../access/rbac'
import { statusField, tenantIdField } from '../../access/fields'

export const EmailCampaign: CollectionConfig = {
  slug: 'email-campaigns',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'template', 'segmentLabel', 'scheduleAt', 'sentCount', '_status'],
    group: 'Marketing',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'marketing_manager'),
    read: hasRole('superadmin', 'tenant_admin', 'marketing_manager'),
    update: hasRole('superadmin', 'tenant_admin', 'marketing_manager'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: true },
  fields: [
    tenantIdField,
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'template', type: 'relationship', relationTo: 'email-templates', required: true },
    {
      name: 'segmentSource',
      type: 'select',
      required: true,
      defaultValue: 'medusa',
      options: [
        { label: 'Medusa marketing segment', value: 'medusa' },
        { label: 'Trade alert subscribers', value: 'trade_alert' },
        { label: 'Manual list', value: 'manual' },
        { label: 'Industry channel', value: 'industry' },
      ],
    },
    { name: 'segmentId', type: 'text', admin: { description: 'PG marketing.segment.id or industry id' } },
    { name: 'segmentLabel', type: 'text' },
    {
      name: 'recipientFilter',
      type: 'group',
      admin: { description: 'Additional filters layered on top of segment' },
      fields: [
        { name: 'country', type: 'text' },
        { name: 'locale', type: 'select', options: ['vi', 'en', 'cn'] },
        { name: 'lastOrderAfter', type: 'date' },
      ],
    },
    {
      name: 'abTest',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'variants', type: 'array', fields: [
          { name: 'subject', type: 'text', localized: true },
          { name: 'previewText', type: 'text', localized: true },
          { name: 'weight', type: 'number', defaultValue: 50 },
        ] },
        { name: 'winnerMetric', type: 'select', defaultValue: 'open_rate', options: ['open_rate', 'click_rate', 'conversion'] },
        { name: 'testWindowHours', type: 'number', defaultValue: 24 },
      ],
    },
    { name: 'scheduleAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'timezone', type: 'text', defaultValue: 'Asia/Ho_Chi_Minh' },
    {
      name: 'sendStrategy',
      type: 'select',
      defaultValue: 'all_at_once',
      options: [
        { label: 'All at once', value: 'all_at_once' },
        { label: 'Throttled', value: 'throttled' },
        { label: 'Send-time optimized', value: 'optimized' },
      ],
    },
    { name: 'throttlePerMinute', type: 'number', defaultValue: 1000 },
    { name: 'sentCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'deliveredCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'openedCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'clickedCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'unsubscribedCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'sentAt', type: 'date', admin: { readOnly: true } },
    statusField,
  ],
}
