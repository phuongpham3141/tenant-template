/**
 * Media-layer module types (Sprint 11 Pha 2e Module 1 D-PARTIAL)
 *
 * DROPPED: ProcessingJob (table missing)
 * PRESERVED: MediaType, MediaStatus, MediaAsset, MediaVariant
 */

export type MediaType = "image" | "video" | "spin_360" | "ar" | "panorama" | "audio" | "document" | "vector_3d"
export type MediaStatus = "uploaded" | "processing" | "ready" | "failed" | "archived"

export interface MediaAsset {
  id: string
  tenantId: string
  ownerType: "supplier" | "product" | "user" | "tenant"
  ownerId: string
  mediaType: MediaType
  filename: string
  storageKey: string
  cdnUrl?: string
  status: MediaStatus
  mimeType: string
  fileSizeBytes: bigint
  width?: number
  height?: number
  durationMs?: number
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface MediaVariant {
  id: string
  mediaAssetId: string
  variantCode: string
  storageKey: string
  cdnUrl?: string
  width?: number
  height?: number
  bitrateKbps?: number
  fileSizeBytes: bigint
  format: string
}
