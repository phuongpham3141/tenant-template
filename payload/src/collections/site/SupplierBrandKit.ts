import type { CollectionConfig } from 'payload'
import { hasRole } from '../../access/rbac'
import { tenantIdField } from '../../access/fields'

export const SupplierBrandKit: CollectionConfig = {
  slug: 'supplier-brand-kits',
  admin: {
    useAsTitle: 'supplierName',
    defaultColumns: ['supplierName', 'supplierId', 'updatedAt'],
    group: 'Site Builder',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'supplier_admin'),
    read: hasRole('superadmin', 'tenant_admin', 'supplier_admin', 'content_editor'),
    update: hasRole('superadmin', 'tenant_admin', 'supplier_admin'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  fields: [
    tenantIdField,
    { name: 'supplierId', type: 'text', required: true, unique: true, index: true },
    { name: 'supplierName', type: 'text', required: true },
    {
      name: 'logos',
      type: 'group',
      fields: [
        { name: 'primary', type: 'upload', relationTo: 'media' },
        { name: 'horizontal', type: 'upload', relationTo: 'media' },
        { name: 'vertical', type: 'upload', relationTo: 'media' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'monochrome', type: 'upload', relationTo: 'media' },
        { name: 'favicon', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'colors',
      type: 'group',
      fields: [
        { name: 'primary', type: 'text', required: true, defaultValue: '#1a73e8' },
        { name: 'secondary', type: 'text', defaultValue: '#34a853' },
        { name: 'accent', type: 'text', defaultValue: '#fbbc04' },
        { name: 'success', type: 'text', defaultValue: '#0f9d58' },
        { name: 'warning', type: 'text', defaultValue: '#f29900' },
        { name: 'error', type: 'text', defaultValue: '#d93025' },
        { name: 'background', type: 'text', defaultValue: '#ffffff' },
        { name: 'foreground', type: 'text', defaultValue: '#202124' },
      ],
    },
    {
      name: 'typography',
      type: 'group',
      fields: [
        { name: 'headingFont', type: 'text', defaultValue: 'Inter' },
        { name: 'bodyFont', type: 'text', defaultValue: 'Inter' },
        { name: 'monoFont', type: 'text', defaultValue: 'JetBrains Mono' },
        {
          name: 'headingFontWeight',
          type: 'select',
          options: ['400', '500', '600', '700', '800', '900'],
          defaultValue: '600',
        },
        {
          name: 'bodyFontWeight',
          type: 'select',
          options: ['300', '400', '500'],
          defaultValue: '400',
        },
      ],
    },
    {
      name: 'voiceAndTone',
      type: 'group',
      fields: [
        { name: 'voiceDescription', type: 'textarea', localized: true },
        { name: 'doList', type: 'array', fields: [{ name: 'item', type: 'text', localized: true }] },
        { name: 'dontList', type: 'array', fields: [{ name: 'item', type: 'text', localized: true }] },
      ],
    },
    {
      name: 'brandAssets',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'asset', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'brandGuidelinesPdf',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
