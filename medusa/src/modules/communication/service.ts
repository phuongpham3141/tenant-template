/**
 * Communication Service — raw-SQL pattern (Sprint 1 R20 era style retained).
 * Sprint 10 Pha 2a rewrite (D21 root cause fix).
 * Map sang schema communication.* thật (26 cols conversation + 20 cols message_partitioned).
 *
 * Pha 2a scope: CRUD methods (createConversation + listConversations + retrieveConversation
 *               + sendMessage + listMessages + markAsRead + updateStatus).
 * Pha 2c Sprint 11+ scope: Negotiation/Meeting/VoiceCall/Translation methods + cascade.
 */

import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"
import type {
  Conversation,
  ConversationMessage,
  CreateConversationInput,
  ListConversationsFilters,
  ListConversationsOpts,
  SendMessageInput,
  ConversationStatus,
} from "./types"

// Note: communication.conversation.id + conversation_message.id dùng DEFAULT uuidv7() (schema-level).

class CommunicationService extends MedusaService({}) {
  // ===== HELPERS =====

  private mapConversation(row: any): Conversation {
    return {
      id: row.id,
      tenant_id: row.tenant_id,
      code: row.code,
      context_type: row.context_type || undefined,
      context_entity_type: row.context_entity_type || undefined,
      context_entity_id: row.context_entity_id || undefined,
      subject_i18n: row.subject_i18n || undefined,
      initiator_user_id: row.initiator_user_id,
      initiator_type: row.initiator_type || undefined,
      supplier_id: row.supplier_id || undefined,
      assigned_to_user_id: row.assigned_to_user_id || undefined,
      related_product_id: row.related_product_id || undefined,
      related_order_id: row.related_order_id || undefined,
      related_rfq_id: row.related_rfq_id || undefined,
      status: row.status,
      priority: row.priority,
      last_message_at: row.last_message_at || undefined,
      last_message_preview: row.last_message_preview || undefined,
      unread_count_buyer: row.unread_count_buyer ?? 0,
      unread_count_supplier: row.unread_count_supplier ?? 0,
      sla_response_deadline: row.sla_response_deadline || undefined,
      sla_breached: row.sla_breached ?? false,
      language_primary: row.language_primary || undefined,
      language_detected: row.language_detected || undefined,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }
  }

  private mapMessage(row: any): ConversationMessage {
    return {
      id: row.id,
      tenant_id: row.tenant_id,
      conversation_id: row.conversation_id,
      sender_user_id: row.sender_user_id,
      sender_type: row.sender_type || undefined,
      content_text: row.content_text || undefined,
      content_html: row.content_html || undefined,
      reply_to_message_id: row.reply_to_message_id || undefined,
      thread_root_message_id: row.thread_root_message_id || undefined,
      original_language: row.original_language || undefined,
      is_system_message: row.is_system_message ?? false,
      is_auto_reply: row.is_auto_reply ?? false,
      is_ai_generated: row.is_ai_generated ?? false,
      pinned: row.pinned ?? false,
      important_flag: row.important_flag ?? false,
      edited_at: row.edited_at || undefined,
      deleted_at: row.deleted_at || undefined,
      mentions: row.mentions || undefined,
      structured_payload_jsonb: row.structured_payload_jsonb || undefined,
      created_at: row.created_at,
    }
  }

  // ===== CREATE =====

  async createConversation(
    ctx: TenantContext,
    input: CreateConversationInput
  ): Promise<Conversation> {
    return withTenant(ctx, async (client) => {
      // Generate code from sequence (mig 51)
      const { rows: codeRows } = await client.query<{ num: string }>(
        "SELECT nextval('communication.conversation_code_seq')::text AS num"
      )
      const code = `CONV-${codeRows[0].num}`

      const { rows } = await client.query<any>(
        `INSERT INTO communication.conversation (
          tenant_id, code,
          context_type, context_entity_type, context_entity_id,
          subject_i18n,
          initiator_user_id, initiator_type,
          supplier_id, assigned_to_user_id,
          related_product_id, related_order_id, related_rfq_id,
          status, priority,
          language_primary
        ) VALUES (
          $1, $2,
          $3, $4, $5,
          $6::jsonb,
          $7, $8,
          $9, $10,
          $11, $12, $13,
          'open', $14,
          $15
        ) RETURNING *`,
        [
          ctx.tenantId,
          code,
          input.context_type ?? null,
          input.context_entity_type ?? null,
          input.context_entity_id ?? null,
          input.subject_i18n ? JSON.stringify(input.subject_i18n) : null,
          input.initiator_user_id,
          input.initiator_type ?? "buyer",
          input.supplier_id ?? null,
          input.assigned_to_user_id ?? null,
          input.related_product_id ?? null,
          input.related_order_id ?? null,
          input.related_rfq_id ?? null,
          input.priority ?? "normal",
          input.language_primary ?? "vi",
        ]
      )

      return this.mapConversation(rows[0])
    })
  }

  // ===== LIST =====

  async listConversations(
    ctx: TenantContext,
    filters: ListConversationsFilters = {},
    opts: ListConversationsOpts = {}
  ): Promise<{ conversations: Conversation[]; count: number }> {
    const conditions: string[] = ["tenant_id = $1"]
    const params: unknown[] = [ctx.tenantId]
    let paramIdx = 2

    if (filters.user_id) {
      conditions.push(`(initiator_user_id = $${paramIdx} OR assigned_to_user_id = $${paramIdx})`)
      params.push(filters.user_id)
      paramIdx++
    }
    if (filters.supplier_id) {
      conditions.push(`supplier_id = $${paramIdx++}`)
      params.push(filters.supplier_id)
    }
    if (filters.context_type) {
      conditions.push(`context_type = $${paramIdx++}`)
      params.push(filters.context_type)
    }
    if (filters.related_rfq_id) {
      conditions.push(`related_rfq_id = $${paramIdx++}`)
      params.push(filters.related_rfq_id)
    }
    if (filters.related_order_id) {
      conditions.push(`related_order_id = $${paramIdx++}`)
      params.push(filters.related_order_id)
    }
    if (filters.related_product_id) {
      conditions.push(`related_product_id = $${paramIdx++}`)
      params.push(filters.related_product_id)
    }
    if (filters.status) {
      if (Array.isArray(filters.status)) {
        const placeholders = filters.status.map((_, i) => `$${paramIdx + i}`).join(",")
        conditions.push(`status IN (${placeholders})`)
        params.push(...filters.status)
        paramIdx += filters.status.length
      } else {
        conditions.push(`status = $${paramIdx++}`)
        params.push(filters.status)
      }
    }

    const where = conditions.join(" AND ")
    const allowedOrder = ["last_message_at", "created_at", "updated_at"]
    const orderBy = allowedOrder.includes(opts.order_by ?? "")
      ? opts.order_by
      : "last_message_at"
    const orderDir = opts.order_dir === "ASC" ? "ASC" : "DESC"
    const limit = Math.min(opts.limit ?? 20, 100)
    const offset = Math.max(opts.offset ?? 0, 0)

    return withTenant(ctx, async (client) => {
      const countRes = await client.query<{ total: string }>(
        `SELECT COUNT(*)::text AS total FROM communication.conversation WHERE ${where}`,
        params
      )
      const count = parseInt(countRes.rows[0].total, 10)

      const listRes = await client.query<any>(
        `SELECT * FROM communication.conversation WHERE ${where}
         ORDER BY ${orderBy} ${orderDir} NULLS LAST
         LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
        [...params, limit, offset]
      )

      return {
        conversations: listRes.rows.map((r) => this.mapConversation(r)),
        count,
      }
    })
  }

  // ===== RETRIEVE =====

  async retrieveConversation(
    ctx: TenantContext,
    id: string
  ): Promise<Conversation | null> {
    const rows = await queryT<any>(
      ctx,
      `SELECT * FROM communication.conversation WHERE id = $1 AND tenant_id = $2`,
      [id, ctx.tenantId]
    )
    if (rows.length === 0) return null
    return this.mapConversation(rows[0])
  }

  // ===== UPDATE STATUS =====

  async updateConversationStatus(
    ctx: TenantContext,
    id: string,
    status: ConversationStatus
  ): Promise<Conversation | null> {
    const rows = await queryT<any>(
      ctx,
      `UPDATE communication.conversation
       SET status = $1, updated_at = NOW()
       WHERE id = $2 AND tenant_id = $3
       RETURNING *`,
      [status, id, ctx.tenantId]
    )
    if (rows.length === 0) return null
    return this.mapConversation(rows[0])
  }

  // ===== SEND MESSAGE (atomic INSERT + UPDATE conversation) =====

  async sendMessage(
    ctx: TenantContext,
    input: SendMessageInput
  ): Promise<ConversationMessage> {
    if (!input.content_text && !input.content_html) {
      throw new Error("Tin nhắn phải có content_text hoặc content_html")
    }

    return withTenant(ctx, async (client) => {
      // Insert message (partition routes by created_at automatic)
      const { rows: msgRows } = await client.query<any>(
        `INSERT INTO communication.conversation_message (
          tenant_id, conversation_id,
          sender_user_id, sender_type,
          content_text, content_html,
          reply_to_message_id, thread_root_message_id,
          original_language,
          is_system_message, is_auto_reply, is_ai_generated,
          pinned, important_flag,
          mentions, structured_payload_jsonb
        ) VALUES (
          $1, $2,
          $3, $4,
          $5, $6,
          $7, $8,
          $9,
          $10, $11, $12,
          false, false,
          $13::uuid[], $14::jsonb
        ) RETURNING *`,
        [
          ctx.tenantId,
          input.conversation_id,
          input.sender_user_id,
          input.sender_type ?? "buyer",
          input.content_text ?? null,
          input.content_html ?? null,
          input.reply_to_message_id ?? null,
          input.thread_root_message_id ?? null,
          input.original_language ?? "vi",
          input.is_system_message ?? false,
          input.is_auto_reply ?? false,
          input.is_ai_generated ?? false,
          input.mentions ?? [],
          input.structured_payload_jsonb
            ? JSON.stringify(input.structured_payload_jsonb)
            : null,
        ]
      )

      // Update conversation last_message + unread counter
      const preview = (input.content_text ?? input.content_html ?? "")
        .replace(/<[^>]+>/g, "")
        .substring(0, 200)
      const isFromBuyer = (input.sender_type ?? "buyer") === "buyer"
      const unreadCol = isFromBuyer
        ? "unread_count_supplier"
        : "unread_count_buyer"

      await client.query(
        `UPDATE communication.conversation
         SET last_message_at = NOW(),
             last_message_preview = $1,
             ${unreadCol} = ${unreadCol} + 1,
             status = CASE WHEN status = 'closed' THEN 'open' ELSE status END,
             updated_at = NOW()
         WHERE id = $2 AND tenant_id = $3`,
        [preview, input.conversation_id, ctx.tenantId]
      )

      return this.mapMessage(msgRows[0])
    })
  }

  // ===== LIST MESSAGES =====

  async listMessages(
    ctx: TenantContext,
    conversationId: string,
    opts: { limit?: number; offset?: number; include_deleted?: boolean } = {}
  ): Promise<{ messages: ConversationMessage[]; count: number }> {
    const limit = Math.min(opts.limit ?? 50, 200)
    const offset = Math.max(opts.offset ?? 0, 0)
    const deletedFilter = opts.include_deleted ? "" : " AND deleted_at IS NULL"

    return withTenant(ctx, async (client) => {
      const countRes = await client.query<{ total: string }>(
        `SELECT COUNT(*)::text AS total FROM communication.conversation_message
         WHERE conversation_id = $1 AND tenant_id = $2${deletedFilter}`,
        [conversationId, ctx.tenantId]
      )
      const count = parseInt(countRes.rows[0].total, 10)

      const listRes = await client.query<any>(
        `SELECT * FROM communication.conversation_message
         WHERE conversation_id = $1 AND tenant_id = $2${deletedFilter}
         ORDER BY created_at ASC
         LIMIT $3 OFFSET $4`,
        [conversationId, ctx.tenantId, limit, offset]
      )

      return {
        messages: listRes.rows.map((r) => this.mapMessage(r)),
        count,
      }
    })
  }

  // ===== MARK AS READ =====

  async markAsRead(
    ctx: TenantContext,
    conversationId: string,
    role: "buyer" | "supplier"
  ): Promise<boolean> {
    const col = role === "buyer" ? "unread_count_buyer" : "unread_count_supplier"

    const rows = await queryT<any>(
      ctx,
      `UPDATE communication.conversation
       SET ${col} = 0, updated_at = NOW()
       WHERE id = $1 AND tenant_id = $2
       RETURNING id`,
      [conversationId, ctx.tenantId]
    )

    return rows.length > 0
  }

  // ===== Pha 2c Sprint 11+ TODO =====
  // openNegotiation, proposeOffer, acceptOffer (communication.negotiation_thread + negotiation_offer)
  // scheduleMeeting (communication.meeting_schedule)
  // addTranslation (communication.message_translation)
  // pinMessage (alias for updateMessage with pinned=true)
  // escalateConversation (SLA + status='escalated')
}

export default CommunicationService
