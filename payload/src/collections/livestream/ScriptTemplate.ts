import type { CollectionConfig } from "payload"
import { hasRole, publishedReadable } from "../../access/rbac"
import { statusField, tenantIdField } from "../../access/fields"

export const ScriptTemplate: CollectionConfig = {
  slug: "ai-script-templates",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "estimatedDurationMin", "_status"],
    group: "AI Livestream",
  },
  access: {
    create: hasRole("superadmin", "tenant_admin", "marketing_manager", "content_editor"),
    read: publishedReadable,
    update: hasRole("superadmin", "tenant_admin", "marketing_manager", "content_editor"),
    delete: hasRole("superadmin", "tenant_admin"),
  },
  versions: { drafts: true, maxPerDoc: 50 },
  fields: [
    tenantIdField,
    { name: "name", type: "text", required: true, localized: true },
    { name: "description", type: "textarea", localized: true },
    {
      name: "category", type: "select", required: true,
      options: [
        { label: "Product Showcase", value: "product_showcase" },
        { label: "Flash Sale", value: "flash_sale" },
        { label: "New Arrival", value: "new_arrival" },
        { label: "Q&A Marathon", value: "qa_marathon" },
        { label: "Brand Story", value: "brand_story" },
        { label: "Tutorial / How-to", value: "tutorial" },
        { label: "Event Coverage", value: "event_coverage" },
      ],
    },
    {
      name: "industryChannel", type: "relationship", relationTo: "industry-channels",
      hasMany: true, admin: { description: "Auto-suggest this template to suppliers in these industries" },
    },
    { name: "estimatedDurationMin", type: "number", min: 5, max: 240, defaultValue: 30 },
    { name: "loopable", type: "checkbox", defaultValue: true },
    {
      name: "segments", type: "array", required: true, minRows: 1,
      fields: [
        { name: "tempId", type: "text", required: true, admin: { description: "Unique within this script" } },
        {
          name: "segmentType", type: "select", required: true,
          options: ["intro", "product_showcase", "qa", "cta", "auction", "flash_sale", "break", "outro", "transition", "testimonial", "news_update", "poll"],
        },
        { name: "orderHint", type: "number", defaultValue: 0 },
        { name: "dialogue", type: "textarea", required: true, localized: true, admin: { description: "Mustache {{var}} interpolation supported" } },
        { name: "durationSecondsEstimate", type: "number", defaultValue: 60 },
        { name: "productId", type: "text", admin: { description: "Optional PG product UUID to feature" } },
        { name: "ctaUrl", type: "text" },
      ],
    },
    {
      name: "transitions", type: "array",
      fields: [
        { name: "fromTempId", type: "text", required: true },
        { name: "toTempId", type: "text", required: true },
        {
          name: "condition", type: "json",
          admin: { description: 'JSONSchema-shaped condition. e.g. {"viewerCountGt": 100, "hourOfDayIn": [9,10,11]}' },
        },
        { name: "weight", type: "number", defaultValue: 1 },
        { name: "priority", type: "number", defaultValue: 100 },
      ],
    },
    { name: "startSegmentTempId", type: "text", required: true },
    statusField,
  ],
}
