import type { GlobalConfig } from 'payload'
import { hasRole } from '../access/rbac'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Globals' },
  access: {
    read: () => true,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor'),
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'url', type: 'text', required: true },
            { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'paymentMethods',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', localized: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'verifyUrl', type: 'text' },
      ],
    },
    {
      name: 'awards',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', localized: true },
        { name: 'year', type: 'number' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'enabled', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      defaultValue: '© 2026 Cybersilkroads',
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
