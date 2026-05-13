import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import type { Conversation, ConversationMessage, Negotiation, NegotiationOffer, MeetingSession, ConversationType, MessageType } from "./types"
import { NotFoundError } from "../../lib/errors"

class CommunicationService extends MedusaService({}) {
  async createConversation(ctx: TenantContext, input: Omit<Conversation, "id" | "tenantId" | "archived"> & { archived?: boolean }): Promise<Conversation> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO communication.conversation (
         id, tenant_id, type, title, participant_ids, rfq_id, order_id, archived, metadata, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4::uuid[], $5, $6, $7, $8::jsonb, NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.type, input.title ?? null, input.participantIds, input.rfqId ?? null, input.orderId ?? null, input.archived ?? false, JSON.stringify(input.metadata ?? {})]
    )
    return mapConv(rows[0])
  }

  async listConversations(ctx: TenantContext, userId: string, opts: { type?: ConversationType; archived?: boolean; limit?: number } = {}): Promise<Conversation[]> {
    const params: unknown[] = [userId]
    let where = `WHERE $1 = ANY(participant_ids)`
    if (opts.type) { params.push(opts.type); where += ` AND type = $${params.length}` }
    if (opts.archived !== undefined) { params.push(opts.archived); where += ` AND archived = $${params.length}` }
    params.push(Math.min(opts.limit ?? 50, 200))
    const rows = await queryT<any>(ctx, `SELECT * FROM communication.conversation ${where} ORDER BY last_message_at DESC NULLS LAST LIMIT $${params.length}`, params)
    return rows.map(mapConv)
  }

  async sendMessage(ctx: TenantContext, input: Omit<ConversationMessage, "id" | "tenantId" | "occurredAt" | "isPinned" | "attachmentIds"> & { attachmentIds?: string[] }): Promise<ConversationMessage> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO communication.conversation_message (
         id, tenant_id, conversation_id, sender_user_id, sender_role, message_type, body, source_locale,
         attachment_ids, is_pinned, occurred_at, created_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7,
         $8::uuid[], FALSE, NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.conversationId, input.senderUserId, input.senderRole, input.messageType, input.body, input.sourceLocale, input.attachmentIds ?? []]
    )
    await queryT(ctx, `UPDATE communication.conversation SET last_message_at = NOW(), updated_at = NOW() WHERE id = $1`, [input.conversationId])
    return mapMsg(rows[0])
  }

  async pinMessage(ctx: TenantContext, messageId: string, pinned: boolean): Promise<void> {
    await queryT(ctx, `UPDATE communication.conversation_message SET is_pinned = $1 WHERE id = $2`, [pinned, messageId])
  }

  async addTranslation(ctx: TenantContext, messageId: string, locale: string, translatedText: string): Promise<void> {
    await queryT(
      ctx,
      `UPDATE communication.conversation_message
       SET translated_body = COALESCE(translated_body, '{}'::jsonb) || jsonb_build_object($1::text, $2::text)
       WHERE id = $3`,
      [locale, translatedText, messageId]
    )
  }

  async openNegotiation(ctx: TenantContext, conversationId: string, topic: string): Promise<Negotiation> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO communication.negotiation (id, tenant_id, conversation_id, topic, state, created_at, updated_at)
       VALUES (public.uuidv7(), $1, $2, $3, 'open', NOW(), NOW()) RETURNING *`,
      [ctx.tenantId, conversationId, topic]
    )
    return { id: rows[0].id, conversationId, topic, state: "open", offers: [] }
  }

  async proposeOffer(ctx: TenantContext, input: Omit<NegotiationOffer, "id" | "accepted" | "proposedAt">): Promise<NegotiationOffer> {
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO communication.negotiation_offer (
         id, tenant_id, negotiation_id, by_user_id, price_minor, currency, quantity,
         payment_terms, shipping_terms, valid_until, accepted, proposed_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8, $9, FALSE, NOW()
       ) RETURNING *`,
      [
        ctx.tenantId, input.negotiationId, input.byUserId,
        String(input.priceMinor), input.currency, input.quantity,
        input.paymentTerms, input.shippingTerms, input.validUntil,
      ]
    )
    return {
      id: rows[0].id, negotiationId: input.negotiationId, byUserId: input.byUserId,
      priceMinor: BigInt(rows[0].price_minor), currency: input.currency,
      quantity: input.quantity, paymentTerms: input.paymentTerms, shippingTerms: input.shippingTerms,
      validUntil: input.validUntil, accepted: false, proposedAt: rows[0].proposed_at,
    }
  }

  async acceptOffer(ctx: TenantContext, offerId: string): Promise<void> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE communication.negotiation_offer SET accepted = TRUE WHERE id = $1 RETURNING negotiation_id`,
      [offerId]
    )
    if (!rows[0]) throw new NotFoundError("NegotiationOffer", offerId)
    await queryT(ctx, `UPDATE communication.negotiation SET state = 'settled', updated_at = NOW() WHERE id = $1`, [rows[0].negotiation_id])
  }

  async scheduleMeeting(ctx: TenantContext, input: Omit<MeetingSession, "id" | "tenantId" | "status" | "joinUrl">): Promise<MeetingSession> {
    const joinUrl = `https://meet.huayuesc.local/${ctx.tenantId}/${crypto.randomUUID()}`
    const rows = await queryT<any>(
      ctx,
      `INSERT INTO communication.meeting_session (
         id, tenant_id, conversation_id, host_user_id, scheduled_start_at, duration_minutes,
         mode, join_url, participant_ids, status, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, $8::uuid[], 'scheduled', NOW(), NOW()
       ) RETURNING *`,
      [ctx.tenantId, input.conversationId, input.hostUserId, input.scheduledStartAt, input.durationMinutes, input.mode, joinUrl, input.participantIds]
    )
    return mapMeeting(rows[0])
  }
}

function mapConv(r: any): Conversation {
  return {
    id: r.id, tenantId: r.tenant_id, type: r.type, title: r.title,
    participantIds: r.participant_ids ?? [], rfqId: r.rfq_id, orderId: r.order_id,
    lastMessageAt: r.last_message_at, unreadCounts: r.unread_counts ?? {},
    archived: r.archived, metadata: r.metadata ?? {},
  }
}
function mapMsg(r: any): ConversationMessage {
  return {
    id: r.id, tenantId: r.tenant_id, conversationId: r.conversation_id,
    senderUserId: r.sender_user_id, senderRole: r.sender_role,
    messageType: r.message_type as MessageType, body: r.body,
    translatedBody: r.translated_body ?? {},
    sourceLocale: r.source_locale, attachmentIds: r.attachment_ids ?? [],
    isPinned: r.is_pinned, reactions: r.reactions ?? {}, occurredAt: r.occurred_at,
  }
}
function mapMeeting(r: any): MeetingSession {
  return {
    id: r.id, tenantId: r.tenant_id, conversationId: r.conversation_id, hostUserId: r.host_user_id,
    scheduledStartAt: r.scheduled_start_at, durationMinutes: Number(r.duration_minutes), mode: r.mode,
    joinUrl: r.join_url, recordingUrl: r.recording_url,
    participantIds: r.participant_ids ?? [], status: r.status,
  }
}

export default CommunicationService
