import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField } from '../../access/fields'
import { syncMedusaCategory } from '../../hooks/syncMedusaCategory'

export const CategoryContent: CollectionConfig = {
  slug: 'category-content',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'medusaCategoryId', '_status', 'updatedAt'],
    group: 'CMS',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    afterChange: [syncMedusaCategory],
  },
  fields: [
    tenantIdField,
    {
      name: 'medusaCategoryId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'PG catalog.category.id — content overlay for Medusa category' },
    },
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'shortDescription', type: 'textarea', localized: true },
    { name: 'longDescription', type: 'richText', localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroVideo', type: 'upload', relationTo: 'media' },
    {
      name: 'featuredSuppliers',
      type: 'array',
      fields: [
        { name: 'supplierId', type: 'text', required: true },
        { name: 'displayOrder', type: 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'featuredProducts',
      type: 'array',
      fields: [
        { name: 'productId', type: 'text', required: true },
        { name: 'displayOrder', type: 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'buyersGuide',
      type: 'richText',
      localized: true,
      admin: { description: 'Buying guide content shown to buyers' },
    },
    {
      name: 'industryStats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'value', type: 'text' },
        { name: 'unit', type: 'text' },
      ],
    },
    {
      name: 'relatedCategories',
      type: 'relationship',
      relationTo: 'category-content',
      hasMany: true,
    },
    seoGroup,
    statusField,
  ],
}
