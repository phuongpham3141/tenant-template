import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { seoGroup, statusField, publishWindowGroup, tenantIdField } from '../../access/fields'

export const BlogArticle: CollectionConfig = {
  slug: 'blog-articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', '_status', 'publishedAt'],
    group: 'CMS',
    livePreview: { url: ({ data }) => `http://shop.huayuesc.local/blog/${data.slug}` },
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor', 'marketing_manager'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor', 'marketing_manager'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: { autosave: { interval: 3000 } }, maxPerDoc: 30 },
  fields: [
    tenantIdField,
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, index: true, unique: true },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Market news', value: 'market_news' },
        { label: 'Industry trends', value: 'trends' },
        { label: 'Buyer guide', value: 'buyer_guide' },
        { label: 'Supplier story', value: 'supplier_story' },
        { label: 'Policy & regulation', value: 'policy' },
        { label: 'Trade show', value: 'trade_show' },
        { label: 'Product launch', value: 'product_launch' },
        { label: 'Success case', value: 'case_study' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', localized: true }],
    },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true },
    { name: 'content', type: 'richText', localized: true, required: true },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'blog-articles',
      hasMany: true,
      maxDepth: 1,
    },
    {
      name: 'industry',
      type: 'relationship',
      relationTo: 'industry-channels',
      hasMany: true,
    },
    { name: 'publishedAt', type: 'date', index: true },
    { name: 'readTimeMinutes', type: 'number', defaultValue: 5 },
    { name: 'allowComments', type: 'checkbox', defaultValue: true },
    publishWindowGroup,
    seoGroup,
    statusField,
  ],
}
