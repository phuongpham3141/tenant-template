import type { CollectionConfig } from "payload"
import { hasRole, publishedReadable } from "../../access/rbac"
import { statusField } from "../../access/fields"

export const AvatarLibrary: CollectionConfig = {
  slug: "avatar-library",
  admin: {
    useAsTitle: "displayName",
    defaultColumns: ["displayName", "assetType", "provider", "readyForRealtime", "_status"],
    group: "AI Livestream",
  },
  access: {
    create: hasRole("superadmin", "tenant_admin"),
    read: publishedReadable,
    update: hasRole("superadmin", "tenant_admin"),
    delete: hasRole("superadmin"),
  },
  fields: [
    { name: "displayName", type: "text", required: true, localized: true },
    {
      name: "assetType", type: "select", required: true,
      options: ["2d_talking_head", "3d_full_body", "generated_photo", "live_actor_capture"],
    },
    {
      name: "provider", type: "select", required: true,
      options: [
        { label: "HeyGen", value: "heygen" },
        { label: "D-ID", value: "did" },
        { label: "Synthesia", value: "synthesia" },
        { label: "Wav2Lip (local)", value: "local_wav2lip" },
        { label: "Custom", value: "custom" },
      ],
    },
    { name: "providerAssetId", type: "text", admin: { description: "Provider's internal asset ID (e.g., HeyGen avatar_id)" } },
    { name: "thumbnail", type: "upload", relationTo: "media" },
    { name: "idleLoopVideo", type: "upload", relationTo: "media" },
    {
      name: "ethnicity", type: "select",
      options: ["asian_east", "asian_southeast", "caucasian", "african", "latin", "mixed", "stylized"],
    },
    { name: "ageBand", type: "select", options: ["20-30", "30-40", "40-50", "50+"] },
    { name: "gender", type: "select", options: ["female", "male", "non_binary"] },
    {
      name: "aspectRatio", type: "select", defaultValue: "16:9",
      options: ["16:9", "9:16", "1:1", "4:3"],
    },
    { name: "resolution", type: "select", defaultValue: "1080p", options: ["720p", "1080p", "4k"] },
    { name: "costPerMinuteUsd", type: "number", defaultValue: 0.15 },
    { name: "readyForRealtime", type: "checkbox", defaultValue: false },
    { name: "tags", type: "array", fields: [{ name: "tag", type: "text" }] },
    statusField,
  ],
}
