import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, tenantIdField } from '../../access/fields'

export const HelpArticle: CollectionConfig = {
  slug: 'help-articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'audience', 'viewCount', '_status'],
    group: 'Help',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor', 'support_agent'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor', 'support_agent'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: { autosave: { interval: 3000 } }, maxPerDoc: 30 },
  fields: [
    tenantIdField,
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'summary', type: 'textarea', localized: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Getting started', value: 'getting_started' },
        { label: 'Account & security', value: 'account_security' },
        { label: 'Buying', value: 'buying' },
        { label: 'Selling', value: 'selling' },
        { label: 'Orders', value: 'orders' },
        { label: 'Payments & escrow', value: 'payments' },
        { label: 'Shipping & customs', value: 'shipping' },
        { label: 'Disputes & returns', value: 'disputes' },
        { label: 'KYC & verification', value: 'kyc' },
        { label: 'Pricing & plans', value: 'pricing' },
        { label: 'API & developer', value: 'api' },
        { label: 'Trade alerts', value: 'trade_alerts' },
        { label: 'Live commerce', value: 'live' },
      ],
    },
    {
      name: 'audience',
      type: 'select',
      hasMany: true,
      defaultValue: ['all'],
      options: [
        { label: 'All', value: 'all' },
        { label: 'Buyer', value: 'buyer' },
        { label: 'Supplier', value: 'supplier' },
        { label: 'Dealer', value: 'dealer' },
        { label: 'Developer', value: 'developer' },
      ],
    },
    { name: 'content', type: 'richText', required: true, localized: true },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'help-articles',
      hasMany: true,
    },
    {
      name: 'relatedFaqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', localized: true },
        { name: 'file', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'viewCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'helpfulYes', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'helpfulNo', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'searchKeywords', type: 'text', localized: true },
    { name: 'displayOrder', type: 'number', defaultValue: 100 },
    seoGroup,
    statusField,
  ],
}
