import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField } from '../../access/fields'

export const IndustryChannel: CollectionConfig = {
  slug: 'industry-channels',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'parentChannel', '_status'],
    group: 'CMS',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: true },
  fields: [
    tenantIdField,
    { name: 'code', type: 'text', required: true, unique: true, index: true },
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'parentChannel',
      type: 'relationship',
      relationTo: 'industry-channels',
      admin: { description: 'For sub-channels (e.g., electronics → consumer-electronics)' },
    },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'introduction', type: 'richText', localized: true },
    {
      name: 'majorCategories',
      type: 'array',
      fields: [
        { name: 'medusaCategoryId', type: 'text', required: true },
        { name: 'label', type: 'text', localized: true },
        { name: 'order', type: 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'spotlight',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'video', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'reportLinks',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'pdf', type: 'upload', relationTo: 'media' },
        { name: 'externalUrl', type: 'text' },
        { name: 'publishDate', type: 'date' },
      ],
    },
    {
      name: 'tradeShows',
      type: 'relationship',
      relationTo: 'trade-shows',
      hasMany: true,
    },
    { name: 'displayOrder', type: 'number', defaultValue: 100, index: true },
    seoGroup,
    statusField,
  ],
}
