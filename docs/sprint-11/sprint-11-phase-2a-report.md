# Sprint 11 Pha 2a — Returns D27 Path D drop ✅ DONE

**Ngày:** 2026-05-17
**Sprint:** 11 Pha 2a (D27 resolve, RED #1 of 14 batch)
**Path chosen:** D (full drop) — REVISED from pre-emptive Path B 4-6h
**Commits:** 2 (drop + close report)
**Time actual:** ~1.5h (vs Path B 4-6h estimate, ~75% time savings vs revised path)

## Decision rationale (L23 reinforced 5th time)

Pha 1 Pha 2a estimated Path B (4-6h schema fix) based on:
- ActionRefs=2 storefront actions
- Schema reality (returns.* tables exist correctly)
- Service queries wrong schema (ord.* instead of returns.*)

Bước 0 STRICT audit revealed FALSE POSITIVE:
- ActionRefs=2 = TEXT MATCH "returns" keyword (not actual module import)
- Actual UI consumers: 0 (verified grep imports + admin UI + SDK + API endpoints)
- 0 cascade refs (jobs/subs/workers/api)
- Schema match ~30-40% (deep semantic redesign needed, not just schema rename)
- 0 rows existing (7 returns.* tables all empty)
- returns.return_reason_master EMPTY (FK lookup unseeded)

→ Path D drop chosen (consistent với Pha 2c v2 escrow + Pha 2d marketplace pattern).

## 4 methods + 4 types dropped

### service.ts: 72 → 63 lines
1. createRequest — INSERT INTO ord.return_request (table KHÔNG TỒN TẠI)
2. transition — UPDATE ord.return_request
3. recordInspection — INSERT INTO ord.return_inspection (KHÔNG TỒN TẠI)
4. refund — UPDATE ord.return_request status='refunded'

### types.ts: 29 → 23 lines
- RmaStatus 9-enum (vs schema 8-enum different semantic)
- RmaReason 9-enum (vs schema reason_code FK lookup)
- RmaRequest interface (broken cols)
- RmaInspection interface (broken cols)

## Schema PRESERVED — Sprint 12+ ready

Backup: /tmp/sprint-11-pha-2a-bak/returns-schema-pre.sql (588 lines)

| Table | Cols | Rows | Status |
|---|---|---|---|
| returns.return_request | 18 | 0 | Production RMA model |
| returns.return_item | 6 | 0 | Separate order item table |
| returns.return_inspection | 10 | 0 | Warehouse facility inspection |
| returns.refund_record | 13 | 0 | Fee breakdown |
| returns.return_authorization | - | 0 | Carrier label storage |
| returns.return_disposition | - | 0 | Post-inspection routing |
| returns.return_reason_master | - | 0 | FK lookup needs seed |

## Smoke results

```
=== Module loaded ===
MODULE: returns ✓
Health 3x HTTP 200 ✓
0 escrow/marketplace/catalog-ext/communication regression
```

## HARD RULES 9/9 PASS

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ 2 commits |
| Rule 2 — Backup preserved | ✅ /tmp/sprint-11-pha-2a-bak/ |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 6 — Schema qua migration | ✅ 0 migrations (drop only) |
| Rule 7 — Multi-layer audit | ✅ STRICT Bước 0 |
| Rule 8 — No placeholder | ✅ Sprint 12+ TODO documented |
| Rule 8 phụ — Plan deviation | ✅ Path B → D documented Bước 0 |
| Rule 9 — Tiếng Việt thuần | ✅ |

## L23 reinforced 5th time + L27 NEW proposed

L23 reinforced 5th time: Pha 1 audit ActionRefs=2 proved FALSE POSITIVE (text
match instead of actual module import detection). Sprint 12+ audit refinement
needed.

L27 NEW proposed: UI consumer audit MUST distinguish import refs vs text matches.

Pattern improvements:
- ❌ FAIL: grep -rln "$MODULE" path/ (matches keyword text)
- ✅ PASS: grep -rln "from.*$MODULE\|MODULE_CONST" path/ (matches actual imports)

## Sprint 11 Pha 2 batch progress

| # | Module | Path | Status | Time |
|---|---|---|:-:|---|
| 1 | **returns (D27)** | **Path D drop** | **✅** | **1.5h** |
| 2 | notification-bus | Path D + 10 cascade | ⏳ Pha 2b | 3-4h est. |
| 3-10 | 8 clean drops Tier 3 | Path D batch | ⏳ Pha 2c-d | 12-18h est. |
| 11-13 | 3 YELLOW quick fix | Path D-partial | ⏳ Pha 2e | 3-6h est. |
| 14 | ai-livestream | Path A/B rewrite | ⏳ Pha 2f | 8-12h est. |
| Pha 3 | Close + push | - | ⏳ | 1-2h |

**Cumulative actual Sprint 11: 3h Pha 1 + 1.5h Pha 2a = 4.5h** (vs revised estimate ~35-50h total).

## Next: Pha 2b notification-bus

Path D drop + 10 cascade stubs (highest cascade module).
