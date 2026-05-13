import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { statusField } from '../../access/fields'

export const SiteTemplate: CollectionConfig = {
  slug: 'site-templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'industry', 'minPlanTier', '_status'],
    group: 'Site Builder',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin'),
    delete: hasRole('superadmin'),
  },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'industry',
      type: 'relationship',
      relationTo: 'industry-channels',
      hasMany: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Modern', value: 'modern' },
        { label: 'Classic', value: 'classic' },
        { label: 'Industrial', value: 'industrial' },
        { label: 'Luxury', value: 'luxury' },
        { label: 'Minimalist', value: 'minimalist' },
        { label: 'Bold', value: 'bold' },
      ],
    },
    { name: 'previewImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'previewImages',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    { name: 'demoUrl', type: 'text' },
    {
      name: 'blockTemplate',
      type: 'json',
      required: true,
      admin: { description: 'Default page composition (array of block configs)' },
    },
    {
      name: 'defaultColors',
      type: 'group',
      fields: [
        { name: 'primary', type: 'text', defaultValue: '#1a73e8' },
        { name: 'secondary', type: 'text', defaultValue: '#34a853' },
        { name: 'accent', type: 'text', defaultValue: '#fbbc04' },
        { name: 'background', type: 'text', defaultValue: '#ffffff' },
        { name: 'text', type: 'text', defaultValue: '#202124' },
      ],
    },
    {
      name: 'defaultFonts',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Inter' },
        { name: 'body', type: 'text', defaultValue: 'Inter' },
      ],
    },
    {
      name: 'minPlanTier',
      type: 'select',
      defaultValue: 'starter',
      options: ['starter', 'growth', 'enterprise'],
    },
    { name: 'price', type: 'number', defaultValue: 0 },
    { name: 'usageCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    statusField,
  ],
}
