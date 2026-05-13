import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField } from '../../access/fields'

export const TourPackage: CollectionConfig = {
  slug: 'tour-packages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'durationDays', 'priceFromUsd', 'departureCity', '_status'],
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
    {
      name: 'tourType',
      type: 'select',
      required: true,
      options: [
        { label: 'Factory tour', value: 'factory_tour' },
        { label: 'Trade show + tour', value: 'show_tour' },
        { label: 'Sourcing trip', value: 'sourcing_trip' },
        { label: 'Industry study', value: 'study_tour' },
      ],
    },
    {
      name: 'tradeShow',
      type: 'relationship',
      relationTo: 'trade-shows',
      admin: { description: 'If show_tour type' },
    },
    { name: 'durationDays', type: 'number', required: true, min: 1 },
    { name: 'departureCity', type: 'text', required: true, localized: true },
    {
      name: 'destinations',
      type: 'array',
      fields: [
        { name: 'city', type: 'text', localized: true },
        { name: 'country', type: 'text' },
        { name: 'nights', type: 'number' },
      ],
    },
    {
      name: 'itinerary',
      type: 'array',
      fields: [
        { name: 'day', type: 'number', required: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'richText', localized: true },
        { name: 'meals', type: 'text', admin: { description: 'B/L/D codes' } },
        { name: 'accommodation', type: 'text' },
      ],
    },
    {
      name: 'inclusions',
      type: 'array',
      fields: [{ name: 'item', type: 'text', localized: true }],
    },
    {
      name: 'exclusions',
      type: 'array',
      fields: [{ name: 'item', type: 'text', localized: true }],
    },
    { name: 'priceFromUsd', type: 'number', required: true },
    { name: 'minGroupSize', type: 'number', defaultValue: 4 },
    { name: 'maxGroupSize', type: 'number', defaultValue: 20 },
    {
      name: 'departureDates',
      type: 'array',
      fields: [
        { name: 'date', type: 'date', required: true },
        { name: 'available', type: 'checkbox', defaultValue: true },
        { name: 'priceUsd', type: 'number' },
      ],
    },
    { name: 'visaRequired', type: 'checkbox', defaultValue: true },
    {
      name: 'interpreterLanguages',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Vietnamese', value: 'vi' },
        { label: 'English', value: 'en' },
        { label: 'Chinese (Mandarin)', value: 'zh' },
        { label: 'Cantonese', value: 'yue' },
      ],
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    { name: 'description', type: 'richText', localized: true },
    seoGroup,
    statusField,
  ],
}
