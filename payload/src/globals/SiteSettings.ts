import type { GlobalConfig } from 'payload'
import { hasRole } from '../access/rbac'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Globals',
  },
  access: {
    read: () => true,
    update: hasRole('superadmin', 'tenant_admin'),
  },
  fields: [
    {
      name: 'tenantId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'branding',
      type: 'group',
      fields: [
        { name: 'siteName', type: 'text', required: true, localized: true },
        { name: 'tagline', type: 'text', localized: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'logoDark', type: 'upload', relationTo: 'media' },
        { name: 'favicon', type: 'upload', relationTo: 'media' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'defaultLocale',
      type: 'select',
      defaultValue: 'vi',
      options: ['vi', 'en', 'cn'],
    },
    {
      name: 'supportedLocales',
      type: 'select',
      hasMany: true,
      defaultValue: ['vi', 'en', 'cn'],
      options: ['vi', 'en', 'cn'],
    },
    {
      name: 'defaultCurrency',
      type: 'select',
      defaultValue: 'VND',
      options: ['VND', 'USD', 'CNY', 'EUR'],
    },
    {
      name: 'supportedCurrencies',
      type: 'select',
      hasMany: true,
      defaultValue: ['VND', 'USD', 'CNY'],
      options: ['VND', 'USD', 'CNY', 'EUR', 'JPY', 'KRW', 'SGD', 'THB'],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text' },
        { name: 'zalo', type: 'text' },
        { name: 'wechat', type: 'text' },
        { name: 'address', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'tiktok', type: 'text' },
        { name: 'weibo', type: 'text' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        { name: 'googleAnalyticsId', type: 'text' },
        { name: 'gtmId', type: 'text' },
        { name: 'facebookPixelId', type: 'text' },
        { name: 'hotjarId', type: 'text' },
      ],
    },
    {
      name: 'featureFlags',
      type: 'array',
      fields: [
        { name: 'flagKey', type: 'text', required: true },
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'rolloutPercentage', type: 'number', min: 0, max: 100, defaultValue: 0 },
        { name: 'description', type: 'text' },
      ],
    },
    {
      name: 'maintenance',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'message', type: 'textarea', localized: true },
        { name: 'estimatedEndAt', type: 'date' },
      ],
    },
  ],
}
