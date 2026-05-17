# Sprint 10 Pha 2a — Communication rewrite ✅ DONE

**Ngày:** 2026-05-17
**Sprint:** 10 **Pha:** 2a (D21 resolve, RED #1 of 4 batch)
**Commit:** `1df8703` + report commit (sắp)
**Status:** ✅ Communication module CRUD functional, /buyer-center/messages UNBLOCKED

## 4 files changed (624 insertions + 167 deletions)

| File | Type | Lines |
|---|---|---|
| `medusa/migrations/51_communication_sequences.sql` | NEW | 21 |
| `medusa/src/modules/communication/types.ts` | REWRITE | 68 → 196 |
| `medusa/src/modules/communication/service.ts` | REWRITE | 146 → 391 |
| `CONVENTIONS.md` | UPDATE (L22 codify) | 248 → 303 |

## Pattern Pha 1d-a v2 repeat success

| Bước | Pha 1d-a v2 (rfq) | Pha 2a (communication) |
|---|---|---|
| 0 | Layer 0 STRICT audit | ✅ 26+20 cols + 3 enums + 24 tables |
| 1 | Backup + sequences | ✅ /tmp/sprint-10-pha-2a-bak/ + mig 51 |
| 2 | Rewrite types.ts | ✅ snake_case match schema |
| 3 | Rewrite service.ts | ✅ queryT/withTenant + MedusaService factory |
| 4 | Build + cascade | ✅ 0 communication errors, frontend PASS |
| 5 | SQL INSERT test | ✅ CONV-1000+ generated |
| 6 | Commit + report | ✅ |

## D26 NEW finding (Bước 0 STRICT)

Plan paste types.ts assumed `conversation_message` schema khác reality:

| Plan paste assumed | Schema thật |
|---|---|
| `sender_role` | `sender_type` |
| `body` | `content_text` + `content_html` |
| `parent_message_id` | `reply_to_message_id` |
| `source_locale` | `original_language` |
| `is_pinned` | `pinned` |
| `attachment_ids` | (via `conversation_attachment` table FK — defer Sprint 11+) |
| `read_by_recipient_at` | (via `message_read_receipt` table — defer) |
| `ai_translated_i18n` | (via `message_translation` table — defer) |

→ **L19 STRICT verify saved Sprint 11+ rework time** (giống Pha 1d-a v2 enum mismatch fire).

## Cascade audit (Bước 0 simpler than rfq case)

| Pattern | rfq (Pha 1d-a v2) | communication (Pha 2a) |
|---|:-:|:-:|
| FK constraints | Several | 0 |
| Medusa jobs cascade | 1 (rfq-expirer) | 0 |
| Medusa subscribers cascade | 1 (rfq-events) | 0 |
| workflows.ts in module | YES | NO |
| Storefront SDK refs | 2 (rfq + rfqs plural) | 2 (orphan, separate interfaces) |
| Total cascade complexity | HIGH (Pha 1d-b cascade defer) | LOW (clean rewrite) |

→ Communication rewrite **simpler than rfq**, no stubs needed.

## Schema mapping (audited Bước 0 + applied Bước 2-3)

### communication.conversation (26 cols)
- Identity: id (uuidv7 DEFAULT), tenant_id, code (NEW from mig 51 sequence)
- Context: context_type (CHECK 9 enums), context_entity_type/id
- Content: subject_i18n (jsonb)
- Participants: initiator_user_id (NOT NULL), initiator_type, supplier_id, assigned_to_user_id
- Related: related_product_id, related_order_id, related_rfq_id
- State: status (CHECK 6 enums, DEFAULT 'open'), priority (CHECK 5 enums, DEFAULT 'normal')
- Tracking: last_message_at, last_message_preview, unread_count_buyer/supplier (DEFAULT 0)
- SLA: sla_response_deadline, sla_breached (DEFAULT false)
- I18n: language_primary, language_detected (char)
- Timestamps: created_at + updated_at

### communication.conversation_message (20 cols, partitioned monthly)
- Identity: id (uuidv7 DEFAULT), tenant_id, conversation_id (NOT NULL)
- Sender: sender_user_id (NOT NULL), sender_type
- Content: content_text + content_html (at least one required — enforced service)
- Threading: reply_to_message_id, thread_root_message_id
- Localization: original_language
- Flags: is_system_message/is_auto_reply/is_ai_generated (DEFAULT false), pinned, important_flag
- Soft delete + edit: edited_at, deleted_at
- Extra: mentions (uuid[]), structured_payload_jsonb
- Timestamps: created_at (partition key)

## 7 service methods (Pha 2a CRUD)

1. `createConversation(ctx, input)` — code generated từ sequence, all defaults applied
2. `listConversations(ctx, filters, opts)` — 6 filter types + pagination + status array support
3. `retrieveConversation(ctx, id)` — tenant scoped
4. `updateConversationStatus(ctx, id, status)` — change workflow status
5. `sendMessage(ctx, input)` — atomic INSERT message + UPDATE conversation last_message + counter
6. `listMessages(ctx, conversationId, opts)` — partition table query, soft delete filter
7. `markAsRead(ctx, conversationId, role)` — reset unread counter

## CONVENTIONS.md L22 codified (section 9)

- 17 modules với MODULE_CONST ≠ DB schema name documented in table
- Pattern: extract service refs `FROM/INTO X.Y` trước assume schema
- Sprint 9A D14 fix = Medusa framework convention, DB schemas = Sprint 1 R20 design layer
- Two convention layers độc lập, không correlate

## Smoke results

```
=== SQL INSERT test ===
SELECT nextval('communication.conversation_code_seq')  → 1000
INSERT INTO communication.conversation (...)            → ROW (CONV-TEST-1001, open)
ROLLBACK                                                  (test only, no persist)

=== Sprint 9 + Pha 1 regression ===
POST /store/supplier-applications  → HTTP 201 ✓
POST /store/carts                   → HTTP 200 ✓
GET  /store/rfqs (no auth)          → HTTP 401 ✓

=== Build ===
Frontend admin: PASS
Backend: PASS (only pre-existing workers/jobs TS errors unchanged)
```

## HARD RULES Pha 2a compliance

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ 1 atomic commit (4 files) + report commit |
| Rule 2 — Backup trước rewrite | ✅ /tmp/sprint-10-pha-2a-bak/ |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 6 — Schema qua migration | ✅ mig 51 |
| Rule 7 — Multi-layer audit | ✅ Layer 0+1+1b STRICT |
| Rule 8 — No placeholder | ✅ Pha 2c Sprint 11+ TODO documented |
| Rule 8 phụ — Plan deviation handling | ✅ D26 NEW + L19 STRICT applied |
| Rule 9 — Tiếng Việt thuần | ✅ |

## Lessons applied Pha 2a

- L9 verify reality (Bước 0 STRICT)
- L13 atomic (single Pha 2a single commit + report)
- L15 service signature audit
- L16 Layer 0 STRICT cột-by-cột (CHECK + FK + seed + sequences)
- L17 cascade audit outside module (0 jobs/subs simplification confirmed)
- L18 cascade audit FULL system (24 tables audited but only 2 rewritten in scope)
- L19 CHECK + enum + seed (3 CHECK constraints applied, message schema discovery D26)
- L20 Sprint 1 R20 era debt (4/4 RED confirmed match Pha 0 v2 D10 prediction)
- L21 multi-module audit trước paste plan
- **L22 codify CONVENTIONS.md** (Sprint 10 Pha 1 finding now applied)

## Sprint 10 batch progress

| # | Module | Status | Commit |
|---|---|:-:|---|
| 1 | communication (D21) | ✅ DONE | `1df8703` |
| 2 | catalog-ext (D25) | ⏳ NEXT (Pha 2b) | — |
| 3 | escrow (D23) | ⏳ Pha 2c | — |
| 4 | marketplace (D24) | ⏳ Pha 2d | — |

## Sprint 9A defer item resolved

✅ **/buyer-center/messages wire UNBLOCKED**. Pha 3 (Sprint 10) hoặc Sprint 11+ build:
- `/store/conversations` route handler
- `/buyer-center/messages` Server Component wire (split layout)
- SDK adapt new types (replace ConversationSummary/ChatMessage interfaces)

## Next: Sprint 10 Pha 2b — catalog-ext

Coordinator quyết định D25 redesign approach:
- Option A: Rename `product_customization_option` → `customization_request`
- Option B: Verify customization_request fields match service INSERT cols
- Option C: New table mig nếu schema design intent differ

Estimate: 6-8h.
