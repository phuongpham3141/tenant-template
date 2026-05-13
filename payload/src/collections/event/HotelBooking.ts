import type { CollectionConfig } from 'payload'
import { hasRole } from '../../access/rbac'
import { tenantIdField } from '../../access/fields'

export const HotelBooking: CollectionConfig = {
  slug: 'hotel-bookings',
  admin: {
    useAsTitle: 'hotelName',
    defaultColumns: ['hotelName', 'checkInDate', 'checkOutDate', 'guestCount', 'status'],
    group: 'Event',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'support_agent', 'content_editor'),
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.roles?.some?.((r: string) => ['superadmin', 'tenant_admin', 'support_agent'].includes(r))) {
        return true
      }
      return { customerId: { equals: req.user.id } }
    },
    update: hasRole('superadmin', 'tenant_admin', 'support_agent'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  fields: [
    tenantIdField,
    { name: 'customerId', type: 'text', required: true, index: true },
    { name: 'tourPackage', type: 'relationship', relationTo: 'tour-packages' },
    { name: 'tradeShow', type: 'relationship', relationTo: 'trade-shows' },
    { name: 'hotelName', type: 'text', required: true, localized: true },
    {
      name: 'hotelAddress',
      type: 'group',
      fields: [
        { name: 'line1', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'country', type: 'text', required: true },
      ],
    },
    { name: 'starRating', type: 'number', min: 1, max: 5 },
    { name: 'checkInDate', type: 'date', required: true, index: true },
    { name: 'checkOutDate', type: 'date', required: true },
    { name: 'roomCount', type: 'number', defaultValue: 1 },
    {
      name: 'roomType',
      type: 'select',
      options: ['single', 'twin', 'double', 'triple', 'suite', 'family'],
    },
    { name: 'guestCount', type: 'number', defaultValue: 1 },
    {
      name: 'guestList',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'passportNumber', type: 'text' },
      ],
    },
    {
      name: 'mealPlan',
      type: 'select',
      defaultValue: 'breakfast',
      options: ['none', 'breakfast', 'half_board', 'full_board'],
    },
    {
      name: 'specialRequests',
      type: 'textarea',
      localized: true,
    },
    { name: 'totalPriceUsd', type: 'number' },
    { name: 'confirmationNumber', type: 'text', index: true },
    { name: 'cancellationDeadline', type: 'date' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: ['pending', 'confirmed', 'cancelled', 'no_show', 'completed'],
      index: true,
    },
  ],
}
