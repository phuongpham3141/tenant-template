import type { GlobalConfig } from 'payload'
import { hasRole } from '../access/rbac'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: { group: 'Globals' },
  access: {
    read: () => true,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor'),
  },
  fields: [
    {
      name: 'mainNav',
      type: 'array',
      admin: { description: 'Top header navigation' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text' },
        {
          name: 'linkType',
          type: 'select',
          defaultValue: 'url',
          options: [
            { label: 'External URL', value: 'url' },
            { label: 'Page (CMS)', value: 'page' },
            { label: 'Category', value: 'category' },
            { label: 'Industry channel', value: 'industry' },
            { label: 'Mega menu', value: 'mega' },
          ],
        },
        { name: 'page', type: 'relationship', relationTo: 'pages' },
        { name: 'industry', type: 'relationship', relationTo: 'industry-channels' },
        {
          name: 'megaItems',
          type: 'array',
          fields: [
            { name: 'columnTitle', type: 'text', localized: true },
            {
              name: 'links',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', localized: true },
                { name: 'url', type: 'text' },
                { name: 'icon', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        { name: 'badge', type: 'text', localized: true, admin: { description: 'e.g., NEW, HOT' } },
        { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
        { name: 'displayOrder', type: 'number', defaultValue: 100 },
      ],
    },
    {
      name: 'utilityNav',
      type: 'array',
      admin: { description: 'Top utility nav (help, login, etc.)' },
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'url', type: 'text' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'sidebarFilters',
      type: 'array',
      admin: { description: 'Default filters shown on category/search pages' },
      fields: [
        { name: 'filterKey', type: 'text' },
        { name: 'label', type: 'text', localized: true },
        { name: 'order', type: 'number' },
        { name: 'expandedByDefault', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}
