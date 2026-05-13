import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../access/rbac'
import { seoGroup, statusField, publishWindowGroup, tenantIdField } from '../access/fields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'CMS',
    livePreview: { url: ({ data }) => `http://shop.huayuesc.local/${data.slug}` },
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: {
    drafts: { autosave: { interval: 2000 } },
    maxPerDoc: 50,
  },
  fields: [
    tenantIdField,
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, index: true, unique: true },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      defaultValue: 'landing',
      options: [
        { label: 'Landing', value: 'landing' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
        { label: 'Legal', value: 'legal' },
        { label: 'Help section', value: 'help' },
        { label: 'Campaign', value: 'campaign' },
      ],
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: [
        {
          slug: 'hero',
          fields: [
            { name: 'heading', type: 'text', localized: true, required: true },
            { name: 'subheading', type: 'text', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'ctaLabel', type: 'text', localized: true },
            { name: 'ctaUrl', type: 'text' },
          ],
        },
        {
          slug: 'richText',
          fields: [{ name: 'content', type: 'richText', localized: true }],
        },
        {
          slug: 'mediaBlock',
          fields: [
            { name: 'media', type: 'upload', relationTo: 'media' },
            { name: 'caption', type: 'text', localized: true },
          ],
        },
        {
          slug: 'cards',
          fields: [
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'link', type: 'text' },
              ],
            },
          ],
        },
        {
          slug: 'cta',
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'buttonLabel', type: 'text', localized: true },
            { name: 'buttonUrl', type: 'text' },
          ],
        },
      ],
    },
    publishWindowGroup,
    seoGroup,
    statusField,
  ],
}
