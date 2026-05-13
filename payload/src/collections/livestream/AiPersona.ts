import type { CollectionConfig } from "payload"
import { hasRole, publishedReadable } from "../../access/rbac"
import { statusField, tenantIdField } from "../../access/fields"

export const AiPersona: CollectionConfig = {
  slug: "ai-personas",
  admin: {
    useAsTitle: "displayName",
    defaultColumns: ["displayName", "primaryLocale", "voiceStyle", "trainingStatus", "_status"],
    group: "AI Livestream",
  },
  access: {
    create: hasRole("superadmin", "tenant_admin", "supplier_admin", "marketing_manager"),
    read: publishedReadable,
    update: hasRole("superadmin", "tenant_admin", "supplier_admin", "marketing_manager"),
    delete: hasRole("superadmin", "tenant_admin"),
  },
  versions: { drafts: true, maxPerDoc: 30 },
  fields: [
    tenantIdField,
    { name: "supplierId", type: "text", index: true, admin: { description: "Owner supplier UUID (null = platform-managed)" } },
    { name: "medusaPersonaId", type: "text", index: true, admin: { description: "PG live.ai_persona.id (sync target)", readOnly: true } },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "displayName", type: "text", required: true, localized: true },
    { name: "personaDescription", type: "textarea", localized: true },
    {
      name: "voiceStyle", type: "select", defaultValue: "friendly_sales",
      options: [
        { label: "Friendly Sales", value: "friendly_sales" },
        { label: "Formal", value: "formal" },
        { label: "Energetic", value: "energetic" },
        { label: "Warm Advisor", value: "warm_advisor" },
        { label: "Professional News", value: "professional_news" },
        { label: "Casual Streamer", value: "casual_streamer" },
      ],
    },
    { name: "primaryLocale", type: "select", required: true, defaultValue: "vi", options: ["vi", "en", "cn"] },
    { name: "supportedLocales", type: "select", hasMany: true, defaultValue: ["vi", "en", "cn"], options: ["vi", "en", "cn"] },
    {
      name: "voiceSamples",
      type: "array",
      admin: { description: "Upload 30-120s voice samples per locale to clone" },
      fields: [
        { name: "locale", type: "select", options: ["vi", "en", "cn"], required: true },
        { name: "audio", type: "upload", relationTo: "media", required: true },
        { name: "transcript", type: "textarea" },
      ],
    },
    { name: "avatarImage", type: "upload", relationTo: "media", admin: { description: "Photo for D-ID / talking head provider" } },
    { name: "avatarReferenceVideo", type: "upload", relationTo: "media", admin: { description: "Optional reference video for HeyGen avatar clone" } },
    {
      name: "catchphrases", type: "array", admin: { description: "Phrases the persona uses frequently" },
      fields: [{ name: "phrase", type: "text", localized: true }],
    },
    { name: "systemPromptOverride", type: "textarea", admin: { description: "Override default system prompt for chat" } },
    {
      name: "brandColors", type: "group",
      fields: [
        { name: "primary", type: "text", defaultValue: "#7c3aed" },
        { name: "accent", type: "text", defaultValue: "#fbbf24" },
      ],
    },
    {
      name: "trainingStatus", type: "select", defaultValue: "draft",
      options: ["draft", "training", "active", "paused", "archived"],
      admin: { readOnly: true },
    },
    statusField,
  ],
}
