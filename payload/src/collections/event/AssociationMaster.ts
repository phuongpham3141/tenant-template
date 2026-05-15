import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField } from '../../access/fields'

export const AssociationMaster: CollectionConfig = {
  slug: 'associations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'industry', 'memberCount', '_status'],
    group: 'Event',
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
    { name: 'shortName', type: 'text', admin: { description: 'Abbreviation, e.g., VINASA, CCCME' } },
    {
      name: 'country',
      type: 'select',
      required: true,
      options: ['VN', 'CN', 'TH', 'ID', 'PH', 'MY', 'SG', 'LA', 'KH', 'MM'],
    },
    {
      name: 'associationType',
      type: 'select',
      required: true,
      options: [
        { label: 'Industry chamber', value: 'industry_chamber' },
        { label: 'Trade promotion', value: 'trade_promotion' },
        { label: 'Standards body', value: 'standards' },
        { label: 'Cooperative', value: 'cooperative' },
        { label: 'Export council', value: 'export_council' },
      ],
    },
    {
      name: 'industry',
      type: 'relationship',
      relationTo: 'industry-channels',
      hasMany: true,
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'website', type: 'text' },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea', localized: true },
      ],
    },
    { name: 'memberCount', type: 'number' },
    { name: 'foundedYear', type: 'number' },
    {
      name: 'partnership',
      type: 'group',
      admin: { description: 'Cybersilkroads tenant partnership info' },
      fields: [
        { name: 'isPartner', type: 'checkbox', defaultValue: false },
        { name: 'partnershipStartDate', type: 'date' },
        { name: 'mou', type: 'upload', relationTo: 'media' },
        { name: 'contactPerson', type: 'text' },
        { name: 'preferredMemberDiscount', type: 'number', admin: { description: 'Percentage discount for members' } },
      ],
    },
    seoGroup,
    statusField,
  ],
}
