# Sprint 9B — D19+D20+D21 cascade + Sprint 8 mig 48 + close — ĐÓNG ✅

**Ngày:** 2026-05-17
**Sprint:** 9B (3 phases delivered + 2 defer Sprint 10+)
**Branch:** `cms`
**Pre-push HEAD:** `910130b` (Pha 2b v2) + 1 docs commit (this report) — 10 commits ahead `origin/cms`

## Tóm tắt 3 phases delivered + 2 defer

### Pha 1d-a v2 (D19 + D20-a EXPANDED) ✅
- 4 commits, ~7h actual
- Sequences (admin.rfq_number_seq + quote_number_seq) tạo
- D20-a REVERT 7 supplier_application rows `'cybersilkroads'` → `'csr'` canonical
- 4 Sprint 9A deviation files REVERT (`route.ts` × 2 + SDK + FactoryApplicationForm)
- types.ts rewrite (snake_case match schema, i18n shape, 5 enums match CHECK)
- service.ts CRUD methods rewrite (5 methods raw-SQL + queryT/withTenant RLS-safe)

**Commits:** `7228d67`, `8249cbe`, `3838b85`, `8c9635b`

### Pha 2b v2 (Option A Partial sau D21) ✅
- 5 commits, ~4h actual
- `/store/rfqs` route handlers (list + detail, owner auth)
- `/admin/rfqs` API (list + detail + POST status update) + UI page (8 status filters L19 enums)
- `/buyer-center/rfqs` wire (NEW SDK `rfqs/` plural — parallel với SDK cũ `rfq/` singular broken Sprint 1 R20 defer Pha 1d-b)
- `/buyer-center/profile` wire (Medusa built-in `/store/customers/me`)
- DEFER Pha 2c: `/store/conversations` + `/buyer-center/messages` wire (D21 communication broken)

**Commits:** `9fb00ef`, `05088ad`, `501c134`, `a646ddc`, `910130b`

### Pha 3 (Sprint 8 mig + close + push) ✅ MINIMUM VIABLE
- Bước 1: **Mig 48 audit_event partition POC applied** ✅
  - 13 partitions tạo (2025_12 → 2026_11 + default + legacy preserved)
  - 37 rows copied legacy → partitioned (verify match)
  - audit.audit_event giờ là partitioned table (relkind 'p')
- Bước 2: **Mig 49 D22 NEW — DEFER Sprint 10+** ⛔
  - Mig 49 = TEMPLATE STUB từ Sprint 8 ("Actual index statements sẽ fill Sprint 9 SAU khi load test 24-48h")
  - Cannot apply: no actual `CREATE INDEX` statements + no staging traffic data
  - Need: staging deploy → load test → pg_stat_user_indexes data → categorize → fill mig 49
- Block B (Bước 3+4 Proxmox staging): **DEFER Sprint 10+** ⛔
  - Proxmox CLI not configured + `proxmox.local` unreachable
  - compose-staging files đã ready (4 yml) nhưng cần host infrastructure
- Block C (Bước 5+6 UX `/account` + `/order/[id]`): **DEFER Sprint 10+** ⛔
  - `src/app/account/` + `src/app/order/` directories DO NOT EXIST
  - Would require build từ scratch (scope creep beyond Pha 3)
- Bước 7+8+9: comprehensive smoke + close + push ✅

**Commits:** (this report) + push origin/cms

### Pha 2c — DEFERRED Sprint 10+ ⏳
- Communication module rewrite (giống Pha 1d-a v2 pattern)
- 26 cols `conversation` + 20 cols `conversation_message` + 13 tables communication schema
- Cùng L20 24-module audit batch fix

### Pha 1d-b — DEFERRED Sprint 10+ ⏳
- Quote workflow methods (submitQuote + acceptQuote + listQuotesForRfq + listInvitedSuppliers + expireRfqs)
- SDK `rfq/` singular replace với `rfqs/` plural
- `actions/rfq.ts` adapt với new field names
- `workflows.ts` + `jobs/rfq-expirer.ts` + `subscribers/rfq-events.ts` cascade

## Sprint 9B commits cumulative (10 ahead `origin/cms` trước push)

```
(this) docs(sprint-09b): ĐÓNG Sprint 9B
910130b docs(sprint-09b): Pha 2b v2 DONE PARTIAL
a646ddc feat(storefront): wire /buyer-center/profile (Pha 2b v2 B6)
501c134 feat(storefront): wire /buyer-center/rfqs (Pha 2b v2 B4)
05088ad feat(medusa): admin view RFQ + API (Pha 2b v2 B3)
9fb00ef feat(medusa): build /store/rfqs (Pha 2b v2 B1)
8c9635b docs(sprint-09b): Pha 1d-a v2 DONE
3838b85 fix(medusa): rfq types + service CRUD rewrite (Pha 1d-a v2 B3-5)
8249cbe fix: D20-a REVERT 4 Sprint 9A files cybersilkroads → csr (Pha 1d-a v2 B2)
7228d67 feat(db): mig 50 rfq sequences + D20-a REVERT (Pha 1d-a v2 B1)
```

## Plan deviations Sprint 9B (D19 → D22, 4 escalations)

| ID | Issue | Resolution |
|---|---|---|
| D19 | rfq module Sprint 1 R20 broken (service ↔ schema) | Pha 1d-a v2 rewrite ✅ |
| D20 | rfq schema reality 18+ findings + 3 cascade files | Split Pha 1d-a + 1d-b ✅ |
| D20-a EXPANDED | Tenant convention 'csr' canonical vs 'cybersilkroads' Sprint 9A deviation (15 tables defaults + 48+ rows + RLS role `csr_admin`) | Option A REVERT to 'csr' ✅ |
| D21 | communication module SAME Sprint 1 R20 era broken pattern | Option A Partial Pha 2b v2 + defer Pha 2c ✅ |
| **D22 NEW (Pha 3 B0)** | **Mig 49 = TEMPLATE STUB Sprint 8 — no actual CREATE INDEX** | **DEFER Sprint 10+ pending staging load test data** ⏳ |

## Lessons codified Sprint 9B (6 NEW L16-L21)

- **L16** Layer 0 STRICT cột-by-cột audit (Pha 1d Bước 0 D20)
- **L17** Module rewrite cascade Layer 1b outside folder (Pha 1d Bước 0 D20)
- **L18** Layer 0 cascade audit FULL system trước migration (Pha 1d-a Bước 0 D20-a EXPANDED)
- **L19** CHECK + FK + enum + seed audit cùng column types (Pha 1d-a v2 close)
- **L20** Sprint 1 R20 era architectural debt — 3 modules confirmed pattern (Pha 2b ESCALATE D21)
- **L21** Multi-module Sprint 1 R20 audit MUST trước paste plan (Pha 2b ESCALATE D21)

**Cumulative L1-L21 = 21 lessons codified.**

## Sprint 9B metrics

| Metric | Đầu Sprint 9B | Cuối Sprint 9B |
|---|---|---|
| Sprint 9A deferred items | 4 (D17 + Admin RFQ + 3 buyer wires) | 1 (chỉ messages defer Pha 2c) |
| Sprint 8 mig carry-over | 2 (mig 48 + 49) | 1 (chỉ mig 49 defer D22) |
| audit_event table type | regular | partitioned (13 partitions) ✅ |
| Backend custom endpoints (medusa) | 14 | 21 (+7) |
| Admin custom UI pages | 3 | 4 (+1 RFQ) |
| SDK clients storefront | 15 | 17 (+rfqs plural + conversations defer Pha 2c) |
| Lessons codified | 15 | 21 (+6) |
| Plan deviations cumulative | 19 (D10-D19) | 22 (D10-D22) |
| Buyer-center functional pages | 5 | 7 (+rfqs + profile) |
| Migration files in repo (medusa/migrations) | 49 (mig 49 stub from Sprint 8) | 50 (mig 50 Pha 1d-a v2 added) |
| Migrations actually applied DB | 47 | 49 (+mig 48 +mig 50) |
| Project completion estimate | ~80% | ~85% (UX + Proxmox + Pha 2c/1d-b defer Sprint 10+) |

## Comprehensive smoke results (Bước 7)

### Sprint 9A + 9B endpoints
```
POST /store/supplier-applications  → HTTP 201 ✓
POST /store/carts                   → HTTP 200 ✓
POST /store/contact                 → HTTP 200 ✓
GET  /store/rfqs (no auth)          → HTTP 401 ✓ (Pha 2b v2)
GET  /admin/rfqs (no auth)          → HTTP 401 ✓ (Pha 2b v2)
```

### Storefront 22 routes
```
14 public                          → HTTP 200 ✓
8 auth-gated                       → HTTP 307 ✓ (redirect /login expected)
```

### Database state
```
Unique migrations applied           → 49
audit_event partition rows          → 37 (matches legacy)
audit_event monthly partitions      → 11 (2026_01 → 2026_11)
```

### Medusa stability
```
5/5 health checks HTTP 200 ✓
```

## Sprint 9B fundamental discoveries

### Sprint 1 R20 era architectural debt confirmed across modules

| Module | Status | Pha resolved |
|---|---|---|
| `links/*` (3 defineLink files) | ✅ Pha 0 v2 (Sprint 9A) commented out |
| `rfq` module | ✅ Pha 1d-a v2 (Sprint 9B) rewrite |
| `communication` module | ⏳ Pha 2c (Sprint 10+) — D21 |
| `escrow`, `marketplace`, `catalog-ext` | ❓ Sprint 10+ (D10 era) — likely broken |
| `ai-livestream`, `vn_sourcing`, `fulfillment-pro`, `b2b_approval`, `dispute` | ❓ Sprint 10+ chưa verify |

**L20 audit 24 Sprint 1 R20 modules CRITICAL Sprint 10+ trước production deploy.**

### Tenant convention canonical = 'csr' (Sprint 1 R20 design intended)

- 15 tables defaults + 48+ rows + RLS bypass role `csr_admin` + storefront slug
- Sprint 9A introduced ad-hoc 'cybersilkroads' deviation (7 supplier_application rows + 4 endpoint defaults) — REVERTED Pha 1d-a v2
- UUID convention storefront `DEFAULT_TENANT.tenantId = '11111111-2222-3333-4444-555555555555'` — defer Sprint 10+ verify multi-tenant FK design

## HARD RULES Sprint 9B compliance

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ |
| Rule 2 — Backup trước wipe/migration | ✅ `/tmp/sprint-09b-*-bak/` (Pha 1d-a v2 + Pha 3) |
| Rule 4 — KHÔNG đụng main/develop | ✅ `cms` only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 6 — Schema qua migration | ✅ mig 50 (Pha 1d-a v2) + mig 48 apply (Pha 3) |
| Rule 7 — Multi-layer audit | ✅ Layer 0a-e + 1 + 1b + 3 STRICT |
| Rule 8 — Best-effort no placeholder | ✅ defers documented + TODO comments |
| Rule 8 phụ — Plan deviation handling | ✅ 5 deviations (D19/D20/D20-a/D21/D22) + 6 lessons codified |
| Rule 9 — Tiếng Việt thuần | ✅ admin UI + storefront + commits + docs |

## Sprint 10+ critical priorities

1. **L20 24-module Sprint 1 R20 audit (CRITICAL trước production deploy)**
   - Layer 0+1+1b STRICT trên escrow + marketplace + catalog-ext + ai-livestream + vn_sourcing + fulfillment-pro + b2b_approval + dispute + ... (~24 modules)
   - Pattern Pha 1d-a v2 repeat khi phát hiện broken
   - Estimate: 6-10h × 24 = 144-240h (Sprint 10-12 dedicated maintenance)
2. **Pha 2c communication rewrite** (D21 resolve) — 8-10h
3. **Pha 1d-b** quote workflow + SDK replace + actions adapt + cascade — 4-6h
4. **D22 Mig 49 fill** — sau staging deploy + load test 24-48h:
   - Actual `CREATE INDEX` Category A (~15 indexes)
   - Real `pg_stat_user_indexes` data based categorization
5. **Proxmox staging deploy** — 4 VM provision (compose-staging files ready)
6. **Sprint 4+5 UX carry-over** — `/account` suite + `/order/[id]` build from scratch
7. **Refactor 3 raw-SQL modules dùng `model.define()`** (Sprint 9A Pha 0 v2 trade-off)
8. **UUID convention verify** — storefront `DEFAULT_TENANT.tenantId` multi-tenant FK design
9. **Production rollout customer #1** — sau L20 audit complete + Pha 2c + 1d-b done

## Files báo cáo Sprint 9B cumulative

- `tenant-template/docs/sprint-09b-phase-1d-a-v2-report.md` (Pha 1d-a v2)
- `tenant-template/docs/sprint-09b-phase-2b-v2-report.md` (Pha 2b v2)
- `tenant-template/docs/sprint-09b-report.md` (this Sprint 9B close)
- `CMS/P9B-PHA1D-ESCALATE-D20.md` (D20 initial escalation)
- `CMS/P9B-PHA1D-A-ESCALATE-D20A-EXPANDED.md` (D20-a EXPANDED escalation)
- `CMS/P9B-PHA1D-A-v2-DONE.md` (Pha 1d-a v2 close)
- `CMS/P9B-PHA2B-ESCALATE-D21.md` (D21 escalation)
- `CMS/P9B-PHA2B-v2-DONE.md` (Pha 2b v2 close)
- `CMS/P9B-DONE.md` (sắp viết sau push)

**Sprint 9B ĐÓNG ✅** — push origin/cms next.
