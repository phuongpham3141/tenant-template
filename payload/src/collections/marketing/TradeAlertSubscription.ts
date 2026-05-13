import type { CollectionConfig } from 'payload'
import { hasRole } from '../../access/rbac'
import { tenantIdField } from '../../access/fields'

export const TradeAlertSubscription: CollectionConfig = {
  slug: 'trade-alert-subscriptions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'industry', 'frequency', 'status', 'createdAt'],
    group: 'Marketing',
  },
  access: {
    create: () => true,
    read: hasRole('superadmin', 'tenant_admin', 'marketing_manager'),
    update: hasRole('superadmin', 'tenant_admin', 'marketing_manager'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  fields: [
    tenantIdField,
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'fullName', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'role', type: 'text' },
    {
      name: 'subscribedAs',
      type: 'select',
      defaultValue: 'buyer',
      options: ['buyer', 'supplier', 'analyst', 'journalist', 'other'],
    },
    {
      name: 'industry',
      type: 'relationship',
      relationTo: 'industry-channels',
      hasMany: true,
    },
    {
      name: 'productKeywords',
      type: 'array',
      fields: [{ name: 'keyword', type: 'text' }],
    },
    {
      name: 'frequency',
      type: 'select',
      defaultValue: 'weekly',
      options: ['daily', 'weekly', 'monthly', 'realtime'],
    },
    {
      name: 'channels',
      type: 'select',
      hasMany: true,
      defaultValue: ['email'],
      options: ['email', 'sms', 'whatsapp', 'zalo', 'wechat'],
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'vi',
      options: ['vi', 'en', 'cn'],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: ['active', 'paused', 'unsubscribed', 'bounced', 'complained'],
      index: true,
    },
    { name: 'unsubscribeToken', type: 'text', admin: { hidden: true } },
    { name: 'lastSentAt', type: 'date', admin: { readOnly: true } },
    { name: 'lastOpenedAt', type: 'date', admin: { readOnly: true } },
    { name: 'totalSent', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'totalOpened', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    {
      name: 'consentGdpr',
      type: 'group',
      fields: [
        { name: 'givenAt', type: 'date' },
        { name: 'ipAddress', type: 'text' },
        { name: 'consentVersion', type: 'text' },
      ],
    },
  ],
}
