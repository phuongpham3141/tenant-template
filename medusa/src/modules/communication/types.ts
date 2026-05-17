/**
 * Communication module types — map sang schema communication.* thật.
 * Sprint 10 Pha 2a rewrite (D21 root cause fix).
 * Reference: P9B-PHA2B-ESCALATE-D21.md + docs/sprint-10/L20-audit-report.md
 *
 * Pha 2a: CRUD types (Conversation 26 cols + ConversationMessage 20 cols).
 * Defer Sprint 11+: Negotiation/Meeting/VoiceCall/Translation methods.
 *
 * Tenant canonical: 'csr' (Sprint 1 R20 design).
 */

import type { TenantContext } from "../../lib/db/pg"

// ===== Enum types (audited Sprint 10 Pha 2a Bước 0 CHECK constraints) =====

// communication.conversation CHECK enums
export type ConversationContextType =
  | "pre_sales_inquiry"
  | "product_question"
  | "negotiation"
  | "rfq_clarification"
  | "order_support"
  | "dispute"
  | "post_purchase"
  | "general"
  | "dispatcher"

export type ConversationPriority = "low" | "normal" | "high" | "urgent" | "p0"

export type ConversationStatus =
  | "open"
  | "pending_reply"
  | "active"
  | "archived"
  | "closed"
  | "escalated"

// Convention (not CHECK enforced — text column)
export type InitiatorType = "buyer" | "supplier" | "admin" | "system"
export type SenderType = "buyer" | "supplier" | "admin" | "system" | "ai_agent"

// ===== Core Conversation interface (communication.conversation — 26 cols) =====

export interface Conversation {
  // Identity
  id: string
  tenant_id: string
  code: string

  // Context
  context_type?: ConversationContextType
  context_entity_type?: string
  context_entity_id?: string

  // Content (i18n)
  subject_i18n?: Record<string, string>

  // Participants
  initiator_user_id: string
  initiator_type?: InitiatorType
  supplier_id?: string
  assigned_to_user_id?: string

  // Related entities
  related_product_id?: string
  related_order_id?: string
  related_rfq_id?: string

  // Workflow state
  status: ConversationStatus
  priority: ConversationPriority

  // Last message tracking
  last_message_at?: Date
  last_message_preview?: string

  // Unread counters
  unread_count_buyer: number
  unread_count_supplier: number

  // SLA tracking
  sla_response_deadline?: Date
  sla_breached: boolean

  // Language detection
  language_primary?: string
  language_detected?: string

  // Timestamps
  created_at: Date
  updated_at: Date
}

// ===== ConversationMessage (communication.conversation_message — 20 cols, partitioned) =====

export interface ConversationMessage {
  // Identity
  id: string
  tenant_id: string
  conversation_id: string

  // Sender
  sender_user_id: string
  sender_type?: SenderType

  // Content (plain text + optional HTML)
  content_text?: string
  content_html?: string

  // Threading
  reply_to_message_id?: string
  thread_root_message_id?: string

  // Localization
  original_language?: string

  // Message flags
  is_system_message: boolean
  is_auto_reply: boolean
  is_ai_generated: boolean
  pinned: boolean
  important_flag: boolean

  // Soft delete + edit tracking
  edited_at?: Date
  deleted_at?: Date

  // Mentions + structured data
  mentions?: string[]
  structured_payload_jsonb?: Record<string, unknown>

  // Timestamps (partition key created_at)
  created_at: Date
}

// ===== Service input types =====

export interface CreateConversationInput {
  // Required
  initiator_user_id: string

  // Optional (with defaults at INSERT time)
  context_type?: ConversationContextType
  context_entity_type?: string
  context_entity_id?: string
  subject_i18n?: Record<string, string>
  initiator_type?: InitiatorType
  supplier_id?: string
  related_product_id?: string
  related_order_id?: string
  related_rfq_id?: string
  priority?: ConversationPriority
  language_primary?: string
  assigned_to_user_id?: string
}

export interface ListConversationsFilters {
  user_id?: string                  // matches initiator_user_id OR assigned_to_user_id
  supplier_id?: string
  status?: ConversationStatus | ConversationStatus[]
  context_type?: ConversationContextType
  related_rfq_id?: string
  related_order_id?: string
  related_product_id?: string
}

export interface ListConversationsOpts {
  limit?: number
  offset?: number
  order_by?: "last_message_at" | "created_at" | "updated_at"
  order_dir?: "ASC" | "DESC"
}

export interface SendMessageInput {
  // Required
  conversation_id: string
  sender_user_id: string

  // Content (must have at least one)
  content_text?: string
  content_html?: string

  // Optional metadata
  sender_type?: SenderType
  reply_to_message_id?: string
  thread_root_message_id?: string
  original_language?: string
  is_system_message?: boolean
  is_auto_reply?: boolean
  is_ai_generated?: boolean
  mentions?: string[]
  structured_payload_jsonb?: Record<string, unknown>
}

// ===== Re-export TenantContext =====
export type { TenantContext }
