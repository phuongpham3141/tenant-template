import type { Field } from 'payload'

export const tenantIdField: Field = {
  name: 'tenantId',
  type: 'text',
  required: true,
  index: true,
  admin: {
    description: 'Multi-tenant scope (UUID, mirrors PG tenant_id)',
  },
}

export const localizedTextField = (name: string, opts: { required?: boolean; admin?: any } = {}): Field => ({
  name,
  type: 'text',
  localized: true,
  required: opts.required ?? false,
  admin: opts.admin,
})

export const localizedRichTextField = (name: string, opts: { required?: boolean } = {}): Field => ({
  name,
  type: 'richText',
  localized: true,
  required: opts.required ?? false,
})

export const slugField: Field = {
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { description: 'URL slug (lowercase, dashes, no spaces)' },
}

export const seoGroup: Field = {
  name: 'seo',
  type: 'group',
  admin: { description: 'SEO metadata' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'keywords', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'noIndex', type: 'checkbox', defaultValue: false },
  ],
}

// Editorial lifecycle status (separate from Payload's built-in `_status` for drafts).
// Renamed to avoid collision with `_status` enum auto-created by versions.drafts.
export const statusField: Field = {
  name: 'editorialStatus',
  type: 'select',
  defaultValue: 'in_review',
  index: true,
  options: [
    { label: 'In review', value: 'in_review' },
    { label: 'Approved', value: 'approved' },
    { label: 'Archived', value: 'archived' },
  ],
}

export const publishWindowGroup: Field = {
  name: 'publishWindow',
  type: 'group',
  fields: [
    { name: 'startAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'endAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
  ],
}
