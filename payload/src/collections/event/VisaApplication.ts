import type { CollectionConfig } from 'payload'
import { hasRole } from '../../access/rbac'
import { tenantIdField } from '../../access/fields'

export const VisaApplication: CollectionConfig = {
  slug: 'visa-applications',
  admin: {
    useAsTitle: 'applicantName',
    defaultColumns: ['applicantName', 'destinationCountry', 'tourPackage', 'status', 'submittedAt'],
    group: 'Event',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'support_agent', 'content_editor', 'supplier_user'),
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
    { name: 'applicantName', type: 'text', required: true },
    {
      name: 'passportNumber',
      type: 'text',
      required: true,
      admin: { description: 'Encrypted at rest in PG, stored hash here for indexing' },
    },
    { name: 'nationality', type: 'text', required: true },
    { name: 'dateOfBirth', type: 'date', required: true },
    { name: 'gender', type: 'select', options: ['male', 'female', 'other'] },
    {
      name: 'destinationCountry',
      type: 'select',
      required: true,
      options: ['CN', 'HK', 'TW', 'TH', 'JP', 'KR', 'SG', 'MY', 'ID', 'PH'],
    },
    { name: 'travelStartDate', type: 'date', required: true },
    { name: 'travelEndDate', type: 'date', required: true },
    {
      name: 'visaType',
      type: 'select',
      required: true,
      options: [
        { label: 'Tourist (L)', value: 'tourist' },
        { label: 'Business (M)', value: 'business' },
        { label: 'Multi-entry', value: 'multi' },
        { label: 'Group tour', value: 'group' },
      ],
    },
    {
      name: 'documents',
      type: 'array',
      fields: [
        {
          name: 'docType',
          type: 'select',
          options: ['passport', 'photo', 'invitation', 'employment', 'bank_statement', 'flight_booking', 'hotel_booking', 'itinerary'],
        },
        { name: 'file', type: 'upload', relationTo: 'media' },
        { name: 'uploadedAt', type: 'date', admin: { readOnly: true } },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Under review', value: 'review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      index: true,
    },
    { name: 'submittedAt', type: 'date', admin: { readOnly: true } },
    { name: 'approvedAt', type: 'date', admin: { readOnly: true } },
    { name: 'rejectionReason', type: 'textarea' },
    { name: 'visaServiceFeeUsd', type: 'number' },
    {
      name: 'assignedAgent',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'Support agent handling this application' },
    },
    { name: 'internalNotes', type: 'textarea', admin: { description: 'Not visible to applicant' } },
  ],
}
