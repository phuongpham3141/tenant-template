import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError } from "../../lib/errors"
import type { MediaAsset, MediaVariant, ProcessingJob } from "./types"

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

  async queueProcessing(ctx: TenantContext, mediaAssetId: string, jobType: ProcessingJob["jobType"]): Promise<ProcessingJob> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO media.processing_job (id, tenant_id, media_asset_id, job_type, status, output_asset_ids, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, 'queued', '{}', NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, mediaAssetId, jobType]
    )
    return mapJob(rows[0])
  }

  async markJobCompleted(ctx: TenantContext, jobId: string, outputAssetIds: string[]): Promise<ProcessingJob> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE media.processing_job SET status = 'completed', completed_at = NOW(), output_asset_ids = $1::uuid[], updated_at = NOW()
       WHERE id = $2 AND tenant_id = $3 RETURNING *`,
      [outputAssetIds, jobId, ctx.tenantId]
    )
    if (!rows[0]) throw new NotFoundError("ProcessingJob", jobId)
    await queryT(ctx, `UPDATE media.media_asset SET status = 'ready' WHERE id = $1`, [rows[0].media_asset_id])
    return mapJob(rows[0])
  }

  async markJobFailed(ctx: TenantContext, jobId: string, error: string): Promise<ProcessingJob> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE media.processing_job SET status = 'failed', completed_at = NOW(), error_message = $1, updated_at = NOW()
       WHERE id = $2 AND tenant_id = $3 RETURNING *`,
      [error, jobId, ctx.tenantId]
    )
    return mapJob(rows[0])
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
function mapJob(r: any): ProcessingJob {
  return {
    id: r.id, mediaAssetId: r.media_asset_id, jobType: r.job_type, status: r.status,
    startedAt: r.started_at, completedAt: r.completed_at,
    errorMessage: r.error_message, outputAssetIds: r.output_asset_ids ?? [],
  }
}

export default MediaLayerService
