import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField } from '../../access/fields'

export const TradeShow: CollectionConfig = {
  slug: 'trade-shows',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'venue', 'startDate', 'endDate', '_status'],
    group: 'Event',
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
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'shortName', type: 'text' },
    { name: 'editionNumber', type: 'text', admin: { description: 'e.g., 2026 Spring, 134th edition' } },
    {
      name: 'organizer',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', localized: true },
        { name: 'website', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'industry',
      type: 'relationship',
      relationTo: 'industry-channels',
      hasMany: true,
    },
    {
      name: 'venue',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', localized: true },
        { name: 'addressLine1', type: 'text', localized: true },
        { name: 'city', type: 'text', localized: true },
        { name: 'country', type: 'text', required: true },
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
    },
    { name: 'startDate', type: 'date', required: true, index: true },
    { name: 'endDate', type: 'date', required: true, index: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    { name: 'introduction', type: 'richText', localized: true },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      fields: [
        { name: 'exhibitorCount', type: 'number' },
        { name: 'visitorCount', type: 'number' },
        { name: 'boothSpaceSqm', type: 'number' },
        { name: 'pavilionCount', type: 'number' },
      ],
    },
    {
      name: 'pavilions',
      type: 'array',
      fields: [
        { name: 'code', type: 'text' },
        { name: 'name', type: 'text', localized: true },
        { name: 'theme', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'registrationUrl',
      type: 'text',
    },
    {
      name: 'price',
      type: 'group',
      fields: [
        { name: 'visitorTicketUsd', type: 'number' },
        { name: 'boothRentUsdPerSqm', type: 'number' },
      ],
    },
    { name: 'website', type: 'text' },
    {
      name: 'relatedTours',
      type: 'relationship',
      relationTo: 'tour-packages',
      hasMany: true,
    },
    seoGroup,
    statusField,
  ],
}
