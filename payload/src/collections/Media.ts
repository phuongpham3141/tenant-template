import type { CollectionConfig } from 'payload'
import { hasRole, isAuthenticated } from '../access/rbac'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    group: 'Admin',
  },
  access: {
    create: isAuthenticated,
    read: () => true,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor', 'marketing_manager'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  upload: {
    staticDir: 'media',
    mimeTypes: [
      'image/*',
      'video/mp4',
      'video/webm',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    imageSizes: [
      { name: 'thumb', width: 200, height: 200, position: 'centre' },
      { name: 'card', width: 480, height: 360, position: 'centre' },
      { name: 'tablet', width: 1024, height: undefined, position: 'centre' },
      { name: 'desktop', width: 1920, height: undefined, position: 'centre' },
    ],
    formatOptions: { format: 'webp', options: { quality: 82 } },
    adminThumbnail: 'thumb',
  },
  fields: [
    { name: 'alt', type: 'text', required: true, localized: true },
    { name: 'caption', type: 'text', localized: true },
    { name: 'credit', type: 'text' },
    {
      name: 'mediaAssetId',
      type: 'text',
      index: true,
      admin: {
        description: 'PG media.media_asset.id (sync target via afterChange hook)',
        readOnly: true,
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'tenantId',
      type: 'text',
      index: true,
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
  ],
}
