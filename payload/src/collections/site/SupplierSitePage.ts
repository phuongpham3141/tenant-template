import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField } from '../../access/fields'
import { syncMedusaSupplier } from '../../hooks/syncMedusaSupplier'

export const SupplierSitePage: CollectionConfig = {
  slug: 'supplier-site-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'supplierId', 'pageType', '_status'],
    group: 'Site Builder',
    livePreview: { url: ({ data }) => `http://shop.huayuesc.local/supplier/${data.supplierSlug}/${data.slug}` },
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'supplier_admin', 'content_editor'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'supplier_admin', 'content_editor'),
    delete: hasRole('superadmin', 'tenant_admin', 'supplier_admin'),
  },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 30 },
  hooks: {
    afterChange: [syncMedusaSupplier],
  },
  fields: [
    tenantIdField,
    { name: 'supplierId', type: 'text', required: true, index: true },
    { name: 'supplierSlug', type: 'text', required: true, index: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, index: true },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      defaultValue: 'home',
      options: [
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Products', value: 'products' },
        { label: 'Factory', value: 'factory' },
        { label: 'Certifications', value: 'certifications' },
        { label: 'Contact', value: 'contact' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'site-templates',
      admin: { description: 'Base template, blocks can be customized after' },
    },
    {
      name: 'blocks',
      type: 'relationship',
      relationTo: 'site-blocks',
      hasMany: true,
      admin: { description: 'Block instances composing the page' },
    },
    {
      name: 'layoutJson',
      type: 'json',
      admin: { description: 'Computed layout config (grid positions, breakpoints, etc.)' },
    },
    seoGroup,
    statusField,
  ],
}
