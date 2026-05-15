import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { statusField, tenantIdField } from '../../access/fields'

export const TradeShowBooth: CollectionConfig = {
  slug: 'trade-show-booths',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'tradeShow', 'supplierId', 'boothNumber', '_status'],
    group: 'Event',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor', 'supplier_admin'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor', 'supplier_admin'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: true },
  fields: [
    tenantIdField,
    { name: 'displayName', type: 'text', required: true, localized: true },
    { name: 'tradeShow', type: 'relationship', relationTo: 'trade-shows', required: true },
    { name: 'supplierId', type: 'text', required: true, index: true },
    { name: 'boothNumber', type: 'text' },
    { name: 'pavilion', type: 'text' },
    { name: 'boothSizeSqm', type: 'number' },
    {
      name: 'mapPosition',
      type: 'group',
      fields: [
        { name: 'x', type: 'number' },
        { name: 'y', type: 'number' },
        { name: 'floor', type: 'text' },
      ],
    },
    { name: 'description', type: 'richText', localized: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'featuredProducts',
      type: 'array',
      fields: [
        { name: 'productId', type: 'text', required: true },
        { name: 'displayOrder', type: 'number' },
      ],
    },
    {
      name: 'video360',
      type: 'group',
      fields: [
        { name: 'tourUrl', type: 'text' },
        { name: 'previewImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'staffOnDuty',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'languages', type: 'text', admin: { description: 'Comma separated, e.g., zh,en,vi' } },
        { name: 'whatsapp', type: 'text' },
        { name: 'wechat', type: 'text' },
      ],
    },
    {
      name: 'appointmentEnabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'appointmentSlots',
      type: 'array',
      fields: [
        { name: 'startAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'durationMinutes', type: 'number', defaultValue: 30 },
        { name: 'capacity', type: 'number', defaultValue: 1 },
      ],
    },
    statusField,
  ],
}
