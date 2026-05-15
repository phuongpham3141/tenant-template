import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { statusField, publishWindowGroup, tenantIdField } from '../../access/fields'

export const Banner: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'placement', 'priority', '_status', 'publishWindow'],
    group: 'CMS',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor', 'marketing_manager'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor', 'marketing_manager'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    tenantIdField,
    { name: 'name', type: 'text', required: true, admin: { description: 'Internal label' } },
    {
      name: 'placement',
      type: 'select',
      required: true,
      options: [
        { label: 'Home hero', value: 'home_hero' },
        { label: 'Home secondary', value: 'home_secondary' },
        { label: 'Category top', value: 'category_top' },
        { label: 'Search top', value: 'search_top' },
        { label: 'Product page side', value: 'product_side' },
        { label: 'Checkout banner', value: 'checkout' },
        { label: 'Email header', value: 'email_header' },
        { label: 'Supplier site', value: 'supplier_site' },
      ],
    },
    {
      name: 'targetType',
      type: 'select',
      required: true,
      defaultValue: 'global',
      options: [
        { label: 'Global', value: 'global' },
        { label: 'Category', value: 'category' },
        { label: 'Industry', value: 'industry' },
        { label: 'Supplier', value: 'supplier' },
        { label: 'Country', value: 'country' },
        { label: 'Locale', value: 'locale' },
      ],
    },
    { name: 'targetValue', type: 'text', admin: { description: 'Category id, country code, locale, etc.' } },
    {
      name: 'creatives',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'imageMobile', type: 'upload', relationTo: 'media' },
        { name: 'alt', type: 'text', localized: true },
        { name: 'headline', type: 'text', localized: true },
        { name: 'subheadline', type: 'text', localized: true },
        { name: 'ctaLabel', type: 'text', localized: true },
        { name: 'ctaUrl', type: 'text' },
        {
          name: 'locale',
          type: 'select',
          options: [
            { label: 'All', value: 'all' },
            { label: 'vi', value: 'vi' },
            { label: 'en', value: 'en' },
            { label: 'cn', value: 'cn' },
          ],
          defaultValue: 'all',
        },
      ],
    },
    { name: 'priority', type: 'number', defaultValue: 50, admin: { description: 'Higher = shown first' } },
    {
      name: 'rotationStrategy',
      type: 'select',
      defaultValue: 'priority',
      options: [
        { label: 'Priority order', value: 'priority' },
        { label: 'Random', value: 'random' },
        { label: 'Weighted', value: 'weighted' },
        { label: 'A/B test', value: 'ab_test' },
      ],
    },
    { name: 'weight', type: 'number', defaultValue: 1, min: 0, max: 100 },
    { name: 'experimentId', type: 'text', admin: { description: 'Link to A/B platform experiment_id' } },
    publishWindowGroup,
    statusField,
  ],
}
