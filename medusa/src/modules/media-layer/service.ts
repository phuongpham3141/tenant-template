/**
 * Media-layer module service (Sprint 11 Pha 2e Module 1 D-PARTIAL drop)
 *
 * D37 Path D-partial: dropped 3 methods touching media.processing_job (MISSING).
 *
 * DROPPED methods:
 * - queueProcessing (INSERT INTO media.processing_job — MISSING)
 * - markJobCompleted (UPDATE media.processing_job — MISSING)
 * - markJobFailed (UPDATE media.processing_job — MISSING)
 * - mapJob helper, ProcessingJob type
 *
 * PRESERVED methods (4 functional):
 * - register (INSERT INTO media.media_asset — EXISTS)
 * - addVariant (INSERT INTO media.media_variant — EXISTS)
 * - findByOwner (SELECT media.media_asset)
 * - archive (UPDATE media.media_asset)
 *
 * Sprint 12+ TODO: Re-implement processing pipeline when media processing
 * feature drives (transcode, thumbnail, watermark, AI tagging, moderation).
 */

import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import type { MediaAsset, MediaVariant } from "./types"

class MediaLayerService extends MedusaService({}) {
  async register(ctx: TenantContext, input: Omit<MediaAsset, "id" | "tenantId" | "createdAt" | "status">): Promise<MediaAsset> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO media.media_asset (
         id, tenant_id, owner_type, owner_id, media_type, filename, storage_key, cdn_url, status,
         mime_type, file_size_bytes, width, height, duration_ms, metadata, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, 'uploaded',
         $8, $9, $10, $11, $12, $13::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.ownerType, input.ownerId, input.mediaType, input.filename, input.storageKey, input.cdnUrl ?? null,
        input.mimeType, String(input.fileSizeBytes), input.width ?? null, input.height ?? null, input.durationMs ?? null,
        JSON.stringify(input.metadata ?? {}),
      ]
    )
    return mapAsset(rows[0])
  }

  async addVariant(ctx: TenantContext, input: Omit<MediaVariant, "id">): Promise<MediaVariant> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO media.media_variant (
         id, tenant_id, media_asset_id, variant_code, storage_key, cdn_url, width, height, bitrate_kbps, file_size_bytes, format, created_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.mediaAssetId, input.variantCode, input.storageKey, input.cdnUrl ?? null, input.width ?? null, input.height ?? null, input.bitrateKbps ?? null, String(input.fileSizeBytes), input.format]
    )
    return mapVariant(rows[0])
  }

  async findByOwner(ctx: TenantContext, ownerType: string, ownerId: string): Promise<MediaAsset[]> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM media.media_asset WHERE owner_type = $1 AND owner_id = $2 AND status != 'archived'
       ORDER BY created_at DESC`,
      [ownerType, ownerId]
    )
    return rows.map(mapAsset)
  }

  async archive(ctx: TenantContext, assetId: string): Promise<void> {
    await queryT(ctx, `UPDATE media.media_asset SET status = 'archived', updated_at = NOW() WHERE id = $1 AND tenant_id = $2`, [assetId, ctx.tenantId])
    await emitAudit(ctx, { actionCode: "media.archive", resourceType: "media.media_asset", resourceId: assetId })
  }
}

function mapAsset(r: any): MediaAsset {
  return {
    id: r.id, tenantId: r.tenant_id, ownerType: r.owner_type, ownerId: r.owner_id,
    mediaType: r.media_type, filename: r.filename, storageKey: r.storage_key, cdnUrl: r.cdn_url,
    status: r.status, mimeType: r.mime_type, fileSizeBytes: BigInt(r.file_size_bytes),
    width: r.width, height: r.height, durationMs: r.duration_ms,
    metadata: r.metadata ?? {}, createdAt: r.created_at,
  }
}
function mapVariant(r: any): MediaVariant {
  return {
    id: r.id, mediaAssetId: r.media_asset_id, variantCode: r.variant_code,
    storageKey: r.storage_key, cdnUrl: r.cdn_url,
    width: r.width, height: r.height, bitrateKbps: r.bitrate_kbps,
    fileSizeBytes: BigInt(r.file_size_bytes), format: r.format,
  }
}

export default MediaLayerService
