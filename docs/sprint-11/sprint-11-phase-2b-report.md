# Sprint 11 Pha 2b — Notification-bus D28 Path D drop ✅ DONE

**Ngày:** 2026-05-17
**Sprint:** 11 Pha 2b (D28 Path D drop, highest cascade module)
**Commits:** 4 (service+types + cascade stubs + cascade fix + close report)
**Time actual:** ~2h (vs 3-4h estimate, scaled Pha 2c v2 pattern)
**Status:** ✅ notification-bus stubbed, 10 cascade stubs verified

## Decision rationale

Pha 1 audit revealed notification-bus = highest cascade RED module (10 refs) với
2/2 INSERT targets MISSING + 0 UI consumers (L27 verified).

Path D drop chosen (vs A/B no schema match, C no architectural mismatch).

## 4 commits

| Commit | Mô tả |
|---|---|
| `03b9dea` | service.ts drop 6 methods + types.ts 3 interfaces |
| `fa6bdd0` | cascade stubs (had backslash escape bug) |
| `78ca428` | cascade re-stub clean (Python script) |
| (close) | report |

## Achievements

| Item | Status |
|---|:-:|
| D28 notification-bus stubbed | ✅ |
| service.ts 6 methods dropped | ✅ |
| types.ts 3 interfaces dropped (TenantContext via aliases) | ✅ |
| 10 cascade files stubbed cleanly | ✅ |
| Subscribers preserve non-notification logic (search.indexDocument) | ✅ |
| Webhooks return HTTP 204 (Twilio + SendGrid compatibility) | ✅ |
| Schema PRESERVED (9 notification.* tables) | ✅ |
| Module loads OK post-restart | ✅ |
| Health 3x HTTP 200 | ✅ |
| Sprint 9/10/2a regression consistent | ✅ |

## 10 cascade files breakdown

### 1 Job
- `gdpr-dsr-sla-monitor.ts` — Preserved DSR query, removed notif.send DPO email

### 1 Worker
- `notification-dispatcher.ts` — Entire BullMQ worker stubbed (SendGrid+Twilio integration preserved in backup)

### 2 Webhooks (return 204)
- `webhooks/twilio/route.ts` — No-op stub
- `webhooks/sendgrid/route.ts` — No-op stub

### 6 Subscribers
- `supplier-verification.ts` — PRESERVED search.indexDocument, removed 2 notif.send
- `rfq-events.ts` — Stubbed entirely (3 notif.send removed)
- `livestream-events.ts` — Stubbed sendBatch
- `escrow-events.ts` — Stubbed 3 notif.send (escrow also dropped Sprint 10)
- `ai-livestream-events.ts` — Stubbed 3 notif.send
- `order-events.ts` — PRESERVED search.indexDocument, removed 2 notif.send

## L28 NEW proposed (heredoc backtick trap)

**Issue Bước 4:** Initial cascade stubs used template literals `` `...${var}...` ``
inside `ssh "..." <<'EOF'` heredoc. Bash single-quoted heredoc preserves backslashes
literally, so `\`` became literal `\` + backtick in output. SWC parser failed with
"Unterminated template" error. Subsequent sed attempt prepended `` ` `` to every line.

**Fix:** Rewrote files via Python script + scp instead of bash heredoc. Replaced
template literals with plain string concatenation (no backticks).

**L28 (proposed):** When writing files via SSH heredoc, AVOID template literals
(backticks). Use Python/scp for complex content OR plain string + concat.

L24 extended: SWC silent failure pattern not just JSDoc `*/` but also unescaped
heredoc backticks in template literals.

## Schema PRESERVED

Backup: `/tmp/sprint-11-pha-2b-bak/notification-schema-pre.sql`

9 notification.* tables (all 0 rows):
- notification_batch, notification_dead_letter_queue, notification_dedup_record
- notification_delivery_attempt, notification_event, notification_event_type_master
- notification_subscription_rule, notification_template_per_channel, notification_throttle_state

Sprint 12+ rewrite will use these (NOT notification_delivery + suppression_list which service expected).

## L23 reinforced 6th time

Pha 1 cascade count = 10 (verified accurate). Pha 1 cascade depth metric RELIABLE
(structural intra-module). Pha 1 UI consumer metric UNRELIABLE (Pha 2a returns
revealed L27 text-match false positive issue).

## Sprint 11 Pha 2 batch progress

| # | Module | Path | Status | Time |
|---|---|---|:-:|---|
| 1 | returns (D27) | Path D drop | ✅ | 1.5h |
| 2 | **notification-bus (D28)** | **Path D + 10 stubs** | **✅** | **~2h** |
| 3-10 | 8 clean drops Tier 3 | Path D batch | ⏳ Pha 2c-d | 12-18h |
| 11-13 | 3 YELLOW quick fix | Path D-partial | ⏳ Pha 2e | 3-6h |
| 14 | ai-livestream | Path A/B | ⏳ Pha 2f | 8-12h |

**Cumulative Sprint 11: 6.5h** (Pha 1 3h + Pha 2a 1.5h + Pha 2b 2h) vs estimate 35-50h = ~85% time savings projected.

## Sprint 12+ TODO

Notification-bus rewrite khi event bus implementation chosen:
- Postgres pub/sub (simple, 6-8h)
- Redis pub/sub (medium, 8-10h)
- Kafka/RabbitMQ (production scale, 12-18h)
- Pre-requisite: business decision on pub/sub strategy
- Pattern: Pha 2a communication module

## Next: Pha 2c Tier 3 batch drops

4 modules clean drop (live-commerce + marketing-email + experimentation + ai-platform).
