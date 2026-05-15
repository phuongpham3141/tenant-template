import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField, publishWindowGroup } from '../../access/fields'

export const AssociationEvent: CollectionConfig = {
  slug: 'association-events',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'association', 'eventType', 'startDate', '_status'],
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
    { name: 'association', type: 'relationship', relationTo: 'associations', required: true },
    {
      name: 'eventType',
      type: 'select',
      required: true,
      options: [
        { label: 'Conference', value: 'conference' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Networking', value: 'networking' },
        { label: 'B2B matchmaking', value: 'matchmaking' },
        { label: 'Awards', value: 'awards' },
      ],
    },
    {
      name: 'mode',
      type: 'select',
      required: true,
      defaultValue: 'hybrid',
      options: ['online', 'offline', 'hybrid'],
    },
    { name: 'startDate', type: 'date', required: true, index: true },
    { name: 'endDate', type: 'date' },
    {
      name: 'venue',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', localized: true },
        { name: 'address', type: 'textarea', localized: true },
        { name: 'city', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
    { name: 'streamUrl', type: 'text' },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'agenda',
      type: 'array',
      fields: [
        { name: 'time', type: 'text' },
        { name: 'title', type: 'text', localized: true },
        { name: 'speaker', type: 'text' },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'speakers',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'company', type: 'text' },
        { name: 'bio', type: 'textarea', localized: true },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'registrationUrl', type: 'text' },
    { name: 'registrationFeeUsd', type: 'number' },
    { name: 'memberDiscountPct', type: 'number' },
    { name: 'capacity', type: 'number' },
    publishWindowGroup,
    seoGroup,
    statusField,
  ],
}
