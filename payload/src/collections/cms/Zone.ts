import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField } from '../../access/fields'

export const Zone: CollectionConfig = {
  slug: 'zones',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'industry', 'country', '_status'],
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
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'industry',
      type: 'relationship',
      relationTo: 'industry-channels',
      required: true,
    },
    { name: 'country', type: 'text', required: true, admin: { description: 'ISO alpha-2' } },
    { name: 'region', type: 'text' },
    { name: 'city', type: 'text', localized: true },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
    },
    { name: 'description', type: 'richText', localized: true },
    { name: 'images', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] },
    {
      name: 'specialties',
      type: 'array',
      fields: [{ name: 'specialty', type: 'text', localized: true }],
    },
    {
      name: 'stats',
      type: 'group',
      fields: [
        { name: 'factoryCount', type: 'number' },
        { name: 'annualExportUsdMillions', type: 'number' },
        { name: 'yearsEstablished', type: 'number' },
        { name: 'workforce', type: 'number' },
      ],
    },
    {
      name: 'logistics',
      type: 'group',
      fields: [
        { name: 'nearestPort', type: 'text' },
        { name: 'nearestAirport', type: 'text' },
        { name: 'transitDaysToVN', type: 'number' },
        { name: 'transitDaysToUS', type: 'number' },
      ],
    },
    seoGroup,
    statusField,
  ],
}
