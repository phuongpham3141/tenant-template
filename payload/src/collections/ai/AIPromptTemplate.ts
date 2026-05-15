import type { CollectionConfig } from 'payload'
import { hasRole, publishedReadable } from '../../access/rbac'
import { statusField, tenantIdField } from '../../access/fields'

export const AIPromptTemplate: CollectionConfig = {
  slug: 'ai-prompt-templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'feature', 'model', 'usageCount', '_status'],
    group: 'AI',
  },
  access: {
    create: hasRole('superadmin', 'tenant_admin', 'content_editor'),
    read: publishedReadable,
    update: hasRole('superadmin', 'tenant_admin', 'content_editor'),
    delete: hasRole('superadmin', 'tenant_admin'),
  },
  versions: { drafts: true, maxPerDoc: 50 },
  fields: [
    tenantIdField,
    { name: 'name', type: 'text', required: true },
    { name: 'code', type: 'text', required: true, unique: true, index: true, admin: { description: 'Referenced by AI service' } },
    { name: 'description', type: 'textarea' },
    {
      name: 'feature',
      type: 'select',
      required: true,
      options: [
        { label: 'Product translation', value: 'product_translation' },
        { label: 'Product description', value: 'product_description' },
        { label: 'SEO meta generation', value: 'seo_meta' },
        { label: 'Image alt text', value: 'image_alt' },
        { label: 'RFQ matching', value: 'rfq_matching' },
        { label: 'Conversation summarization', value: 'chat_summary' },
        { label: 'Conversation translation', value: 'chat_translate' },
        { label: 'Visual search', value: 'visual_search' },
        { label: 'Sentiment analysis', value: 'sentiment' },
        { label: 'Spam / fraud detection', value: 'spam_fraud' },
        { label: 'Auto-categorization', value: 'auto_category' },
        { label: 'Live commerce highlight', value: 'live_highlight' },
        { label: 'Email subject A/B', value: 'email_subject_ab' },
        { label: 'Personalization rec', value: 'personalization' },
        { label: 'Compliance check', value: 'compliance' },
      ],
    },
    {
      name: 'model',
      type: 'select',
      required: true,
      defaultValue: 'claude-sonnet-4-6',
      options: [
        { label: 'Claude Opus 4.7', value: 'claude-opus-4-7' },
        { label: 'Claude Sonnet 4.6', value: 'claude-sonnet-4-6' },
        { label: 'Claude Haiku 4.5', value: 'claude-haiku-4-5' },
        { label: 'GPT-5', value: 'gpt-5' },
        { label: 'GPT-5-mini', value: 'gpt-5-mini' },
        { label: 'Gemini 2.5 Pro', value: 'gemini-2-5-pro' },
        { label: 'Local Qwen', value: 'qwen-local' },
      ],
    },
    {
      name: 'modelFallback',
      type: 'select',
      options: ['claude-haiku-4-5', 'gpt-5-mini', 'qwen-local'],
    },
    {
      name: 'systemPrompt',
      type: 'textarea',
      admin: { description: 'Used as system message' },
    },
    {
      name: 'userPromptTemplate',
      type: 'textarea',
      required: true,
      admin: { description: 'Mustache-style {{variable}} placeholders' },
    },
    {
      name: 'inputSchema',
      type: 'json',
      admin: { description: 'JSONSchema for input validation' },
    },
    {
      name: 'outputSchema',
      type: 'json',
      admin: { description: 'JSONSchema for output validation' },
    },
    {
      name: 'parameters',
      type: 'group',
      fields: [
        { name: 'temperature', type: 'number', defaultValue: 0.3, min: 0, max: 2 },
        { name: 'maxTokens', type: 'number', defaultValue: 1024 },
        { name: 'topP', type: 'number', defaultValue: 1, min: 0, max: 1 },
        { name: 'enableStreaming', type: 'checkbox', defaultValue: false },
        { name: 'cacheTtlSeconds', type: 'number', defaultValue: 0, admin: { description: '0 = no cache' } },
      ],
    },
    {
      name: 'evaluationRubric',
      type: 'textarea',
      admin: { description: 'Criteria for human reviewers to score outputs' },
    },
    {
      name: 'examples',
      type: 'array',
      admin: { description: 'Few-shot examples (will be inlined)' },
      fields: [
        { name: 'input', type: 'json' },
        { name: 'output', type: 'json' },
      ],
    },
    { name: 'usageCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'lastUsedAt', type: 'date', admin: { readOnly: true } },
    { name: 'estimatedCostPerCallUsd', type: 'number' },
    statusField,
  ],
}
