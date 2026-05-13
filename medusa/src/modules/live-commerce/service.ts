import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import { emitAudit } from "../../lib/audit/emit"
import { NotFoundError, ConflictError } from "../../lib/errors"
import type { LiveStream, StreamStatus, StreamFeaturedProduct, StreamGift, FlashAuction, LuckyDraw } from "./types"

class LiveCommerceService extends MedusaService({}) {
  async scheduleStream(ctx: TenantContext, input: Omit<LiveStream, "id" | "tenantId" | "status" | "peakConcurrentViewers" | "totalUniqueViewers" | "totalRevenueMinor">): Promise<LiveStream> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.livestream (
         id, tenant_id, supplier_id, host_user_id, title, scheduled_start_at,
         status, peak_concurrent_viewers, total_unique_viewers, total_revenue_minor, currency,
         rtmp_ingest_url, hls_playback_url, thumbnail_url, metadata, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, 'scheduled', 0, 0, 0, $6,
         $7, $8, $9, $10::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.supplierId, input.hostUserId, input.title, input.scheduledStartAt, input.currency,
        input.rtmpIngestUrl ?? null, input.hlsPlaybackUrl ?? null, input.thumbnailUrl ?? null,
        JSON.stringify(input.metadata ?? {}),
      ]
    )
    return mapStream(rows[0])
  }

  async startStream(ctx: TenantContext, streamId: string): Promise<LiveStream> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE live.livestream SET status = 'live', started_at = NOW(), updated_at = NOW()
       WHERE id = $1 AND tenant_id = $2 AND status = 'scheduled' RETURNING *`,
      [streamId, ctx.tenantId]
    )
    if (!rows[0]) throw new ConflictError("Stream not in scheduled state")
    await emitAudit(ctx, { actionCode: "livestream.start", resourceType: "live.livestream", resourceId: streamId })
    return mapStream(rows[0])
  }

  async endStream(ctx: TenantContext, streamId: string, recordingUrl?: string): Promise<LiveStream> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE live.livestream SET status = 'ended', ended_at = NOW(), recording_url = COALESCE($1, recording_url), updated_at = NOW()
       WHERE id = $2 AND tenant_id = $3 AND status IN ('live', 'paused') RETURNING *`,
      [recordingUrl ?? null, streamId, ctx.tenantId]
    )
    if (!rows[0]) throw new ConflictError("Stream not live")
    return mapStream(rows[0])
  }

  async pinProduct(ctx: TenantContext, input: Omit<StreamFeaturedProduct, "pinnedAt">): Promise<StreamFeaturedProduct> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.featured_product (
         stream_id, product_id, tenant_id, pinned_at, price_minor, currency,
         discount_pct, stock_reserved, display_order, created_at, updated_at
       ) VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7, $8, NOW(), NOW())
       ON CONFLICT (stream_id, product_id) DO UPDATE SET
         pinned_at = NOW(), price_minor = EXCLUDED.price_minor, currency = EXCLUDED.currency,
         discount_pct = EXCLUDED.discount_pct, stock_reserved = EXCLUDED.stock_reserved,
         display_order = EXCLUDED.display_order, updated_at = NOW()
       RETURNING *`,
      [input.streamId, input.productId, ctx.tenantId, String(input.priceMinor), input.currency, input.discountPct ?? null, input.stockReserved, input.displayOrder]
    )
    return mapFeatured(rows[0])
  }

  async recordGift(ctx: TenantContext, input: Omit<StreamGift, "id" | "occurredAt">): Promise<StreamGift> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.stream_gift (id, tenant_id, stream_id, user_id, gift_type, quantity, value_minor, currency, message, occurred_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *`,
      [ctx.tenantId, input.streamId, input.userId, input.giftType, input.quantity, String(input.valueMinor), input.currency, input.message ?? null]
    )
    return mapGift(rows[0])
  }

  async startFlashAuction(ctx: TenantContext, input: Omit<FlashAuction, "id" | "startedAt">): Promise<FlashAuction> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.flash_auction (id, tenant_id, stream_id, product_id, starting_price_minor, reserve_price_minor, currency, duration_seconds, started_at, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.streamId, input.productId, String(input.startingPriceMinor), String(input.reservePriceMinor), input.currency, input.durationSeconds]
    )
    return mapAuction(rows[0])
  }

  async createLuckyDraw(ctx: TenantContext, input: { streamId: string; prize: string; prizeValueMinor?: bigint }): Promise<LuckyDraw> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO live.lucky_draw (id, tenant_id, stream_id, prize, prize_value_minor, participant_count, winner_user_ids, status, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, $4, 0, '{}', 'open', NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, input.streamId, input.prize, input.prizeValueMinor ? String(input.prizeValueMinor) : null]
    )
    return mapDraw(rows[0])
  }

  async incrementMetrics(ctx: TenantContext, streamId: string, peakAdd = 0, uniqueAdd = 0, revenueMinor = 0n): Promise<void> {
    await queryT(
      ctx,
      `UPDATE live.livestream
       SET peak_concurrent_viewers = GREATEST(peak_concurrent_viewers, peak_concurrent_viewers + $1),
           total_unique_viewers = total_unique_viewers + $2,
           total_revenue_minor = total_revenue_minor + $3, updated_at = NOW()
       WHERE id = $4 AND tenant_id = $5`,
      [peakAdd, uniqueAdd, String(revenueMinor), streamId, ctx.tenantId]
    )
  }
}

function mapStream(r: any): LiveStream {
  return {
    id: r.id, tenantId: r.tenant_id, supplierId: r.supplier_id, hostUserId: r.host_user_id,
    title: r.title, scheduledStartAt: r.scheduled_start_at, startedAt: r.started_at, endedAt: r.ended_at,
    status: r.status, rtmpIngestUrl: r.rtmp_ingest_url, hlsPlaybackUrl: r.hls_playback_url,
    thumbnailUrl: r.thumbnail_url, recordingUrl: r.recording_url,
    peakConcurrentViewers: Number(r.peak_concurrent_viewers ?? 0),
    totalUniqueViewers: Number(r.total_unique_viewers ?? 0),
    totalRevenueMinor: BigInt(r.total_revenue_minor ?? 0), currency: r.currency,
    metadata: r.metadata ?? {},
  }
}
function mapFeatured(r: any): StreamFeaturedProduct {
  return {
    streamId: r.stream_id, productId: r.product_id, pinnedAt: r.pinned_at,
    priceMinor: BigInt(r.price_minor), currency: r.currency,
    discountPct: r.discount_pct, stockReserved: Number(r.stock_reserved), displayOrder: Number(r.display_order),
  }
}
function mapGift(r: any): StreamGift {
  return {
    id: r.id, streamId: r.stream_id, userId: r.user_id, giftType: r.gift_type,
    quantity: Number(r.quantity), valueMinor: BigInt(r.value_minor), currency: r.currency,
    message: r.message, occurredAt: r.occurred_at,
  }
}
function mapAuction(r: any): FlashAuction {
  return {
    id: r.id, streamId: r.stream_id, productId: r.product_id,
    startingPriceMinor: BigInt(r.starting_price_minor), reservePriceMinor: BigInt(r.reserve_price_minor),
    currency: r.currency, durationSeconds: Number(r.duration_seconds),
    startedAt: r.started_at, endedAt: r.ended_at,
    winnerUserId: r.winner_user_id, winningBidMinor: r.winning_bid_minor ? BigInt(r.winning_bid_minor) : undefined,
  }
}
function mapDraw(r: any): LuckyDraw {
  return {
    id: r.id, streamId: r.stream_id, prize: r.prize,
    prizeValueMinor: r.prize_value_minor ? BigInt(r.prize_value_minor) : undefined,
    participantCount: Number(r.participant_count), drawnAt: r.drawn_at, winnerUserIds: r.winner_user_ids ?? [],
    status: r.status,
  }
}

export default LiveCommerceService
