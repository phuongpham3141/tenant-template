# Sprint 9B Pha 1d-a v2 — REVERT D20-a + Sequences + Types + Service CRUD — DONE

**Ngày:** 2026-05-16
**Sprint:** 9B Pha 1d-a v2 (Option A REVERT sau D20-a EXPANDED escalation #9)
**Commits:** 3 mới (migration + revert 4 files + types/service rewrite) + 1 report
**Status:** ✅ rfq module CRUD functional với schema thật, tenant canonical 'csr' restored

## Context

D20-a EXPANDED (escalation #9): Audit STRICT phát hiện 'cybersilkroads' là Sprint 9A deviation, KHÔNG canonical. Canonical = 'csr' (15 tables defaults + 48+ rows + RLS bypass role `csr_admin` + storefront slug + 8 incoterms).

Coordinator decision REVERTED:
- Initial (P9B-PHA1D-ESCALATE-D20): "Standardize 'cybersilkroads' + 5 rows UPDATE" — WRONG direction
- Corrected (P9B-PHA1D-A-EXPANDED): "Option A REVERT to 'csr' canonical" — CORRECT

Pha 1d-a v2 scope: Sequences + REVERT 7 supplier_application rows + REVERT 4 endpoint files + types.ts + service.ts CRUD (5 methods).

## What was done

| Bước | Hành động | Trạng thái |
|---|---|---|
| 0 | Git sync + Sprint 9A regression `'csr'` + Sprint 9A deviation file scan | ✅ 4 files confirmed |
| 1 | Migration 50: sequences + REVERT 7 supplier_application rows | ✅ commit `7228d67` |
| 2 | REVERT Sprint 9A 4 deviation files (1 file khác plan paste) | ✅ commit `8249cbe` |
| 3-5 | Rewrite types.ts + service.ts CRUD + build + cascade | ✅ commit `3838b85` |
| 6 | Pha 1d-a v2 report (this file) | ✅ |

## Deliverables

### Migration 50
- 2 sequences: `admin.rfq_number_seq` + `admin.quote_number_seq` (START 1000)
- UPDATE 7 supplier_application rows: `'cybersilkroads'` → `'csr'`
- KHÔNG touch defaults (Sprint 1 R20 đã đúng 'csr' trên 15 tables)
- KHÔNG touch RLS role `csr_admin` (canonical preserved)

### Code revert Sprint 9A 4 files

| File | Line | Trước | Sau |
|---|---|---|---|
| `medusa/src/api/store/supplier-applications/route.ts` | 41 | `\|\| "cybersilkroads"` | `\|\| "csr"` |
| `storefront/src/lib/sdk/medusa-cart/index.ts` | 15 | `?? "cybersilkroads"` | `?? "csr"` |
| `storefront/src/actions/contact.ts` | 8 | `?? "cybersilkroads"` | `?? "csr"` |
| `storefront/src/app/register/factory/FactoryApplicationForm.tsx` | 77 | `"x-tenant-id": "cybersilkroads"` | `"x-tenant-id": "csr"` |

**Adjustment vs plan paste:** Plan listed `medusa/src/api/store/contact/route.ts` nhưng grep ko có literal — thực tế `FactoryApplicationForm.tsx` (Sprint 6 component) hardcoded header.

### types.ts (rewrite snake_case schema match)
- 5 enums khớp CHECK constraints schema:
  - `RfqStatus(8)`: draft, published, quoting, awarded, converted, closed, expired, cancelled
  - `RfqUrgency(4)`: normal, fast, urgent, immediate
  - `RfqVisibility(4)`: public, targeted, invitation_only, private
  - `QuoteStatus(6)`: submitted, accepted, rejected, withdrawn, expired, superseded
  - `ShippingTerms(8 incoterms)`: fob, cif, ddp, exw, dap, dpu, cpt, cip
- `Rfq` 31 fields (i18n shape, dual-currency, target_* filtering, workflow timestamps)
- `RfqQuote` 27 fields (dual-currency + i18n + linked_product_id + MOQ semantic)
- `RfqInvitedSupplier` 11 fields (invitation_source NOT NULL + ai_match_score)
- `CreateRfqInput` + `SubmitQuoteInput` + `ListRfqsFilters` + `ListRfqsOpts`
- TenantContext re-export từ `../../lib/db/pg` (KHÔNG `../../shared/tenant-context` — không tồn tại)

### service.ts (rewrite CRUD 5 methods)

- `extends MedusaService({})` (Sprint 1 R20 pattern retained cho RLS context)
- Dùng `queryT(ctx, ...)` + `withTenant(ctx, async (client) => ...)` — RLS scoping safe
- `mapRfq()` helper với BigInt parsing
- `createRfq()`: `nextval(admin.rfq_number_seq)` + handle all 31 fields + default draft/invitation_only/normal
- `listRfqs()`: tenant scoping + filters (buyer_id/status/category_id) + pagination + soft delete
- `retrieveRfq()`: tenant scoping + soft delete filter (includeDeleted optional)
- `updateRfqStatus()`: optimistic lock (version++) + workflow timestamps auto:
  - `published_at = NOW()` khi status='published'
  - `awarded_at = NOW()` khi status='awarded'
  - `closed_at = NOW()` khi status ∈ {expired, cancelled, awarded, closed, converted}
- `softDeleteRfq()`: deleted_at timestamp

## Multi-layer audit confirmed

| Layer | Check | Result |
|---|---|---|
| 0a (DB schema 31+27+11 cols) | rfq.* tables column-level | ✅ match P9B-D20 + L16 extended |
| 0b (D20-a cascade) | 15 tables defaults + 48+ rows + 3 tenant IDs | ✅ canonical 'csr' confirmed |
| 0c (sequences) | admin.rfq_number_seq + quote_number_seq created (last_value 1001 sau test) | ✅ |
| 0d (CHECK constraints) | 5 enum sets + budget min/max + target_quantity > 0 | ✅ enum mismatch caught Bước 5 |
| 0e (FK constraints) | buyer_id → identity.user, unit_code → common.unit_master | ✅ verified test |
| 1 (service refs) | 0 refs `ord.rfq*` sau rewrite | ✅ grep verify |
| 1b (Sprint 9A deviation) | 4 files reverted, 0 refs `'cybersilkroads'` literal | ✅ |
| 3 (runtime SQL INSERT) | rfq.rfq insert với schema thật + buyer_id valid + unit_code 'pieces' | ✅ PASS |
| Regression Sprint 9A | 3/3 endpoints HTTP 201/200/200 với `'csr'` header | ✅ |

## Tenant convention final state

✅ **Canonical: `'csr'`**
- 15 Sprint 1 R20 tables defaults (unchanged)
- 48+ existing seed rows + 8 supplier_application rows (7 reverted + 1 new test)
- RLS bypass role `csr_admin` (unchanged)
- Storefront `DEFAULT_TENANT.slug = 'csr'` (unchanged)
- Sprint 9A 4 deviation files reverted

⏳ UUID convention storefront `DEFAULT_TENANT.tenantId = '11111111-2222-3333-4444-555555555555'`: defer Sprint 10+ verify multi-tenant FK design.

## Half-functional state acceptable (Option B)

✅ CRUD methods working:
- `createRfq(ctx, input)` — SQL INSERT verified
- `listRfqs(ctx, filters, opts)` — built (not runtime tested yet, no /store/rfqs endpoint Pha 1d-a)
- `retrieveRfq(ctx, id)` — built
- `updateRfqStatus(ctx, id, status)` — built với workflow timestamps
- `softDeleteRfq(ctx, id)` — built

⏳ Quote workflow methods defer Pha 1d-b:
- `submitQuote`, `listQuotesForRfq`, `acceptQuote`, `rejectQuote`, `listInvitedSuppliers`, `expireRfqs`

⏳ Cascade files build TS errors (KHÔNG block server start):
- `src/modules/rfq/workflows.ts:25,40` — submitQuote + acceptQuote missing (Pha 1d-b)
- `src/jobs/rfq-expirer.ts:11` — expireRfqs missing (Pha 1d-b)
- `src/subscribers/rfq-events.ts:14` — listInvitedSuppliers missing (Pha 1d-b)
- (Pre-existing: `src/workers/*` + `src/jobs/trending-rebuilder.ts` TS errors — KHÔNG liên quan)

## Unblocks Pha 2b

✅ Pha 2b có thể trigger ngay:
- `/admin/rfqs` API + UI (list + detail) — dùng `listRfqs` + `retrieveRfq`
- `/store/rfqs` route handler — dùng `listRfqs` + `retrieveRfq`
- `/buyer-center/rfqs` wire — dùng `/store/rfqs`

❌ Pha 2b cannot do (defer Pha 1d-b):
- Quote workflow UI (Admin response + supplier quote submit)
- Auto-expire jobs
- Event subscribers (audit + notifications)

## HARD RULES Pha 1d-a v2 compliance

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ 3 atomic commits |
| Rule 2 — Backup trước revert + rewrite | ✅ /tmp/sprint-09b-pha-1d-a-v2-bak/ |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 6 — Schema qua migration | ✅ mig 50 |
| Rule 7 — Multi-layer audit | ✅ Layer 0+1+1b+3 STRICT |
| Rule 8 — No placeholder | ✅ Pha 1d-b TODO documented |
| Rule 8 phụ — Plan deviation handling | ✅ D20 + D20-a EXPANDED + REVERT + enum mismatch (L16 extended) |
| Rule 9 — Tiếng Việt thuần | ✅ |

## Lessons applied Pha 1d-a v2

- **L9** verify reality
- **L13** atomic split (Pha 1d-a + 1d-b)
- **L15** Service signature audit
- **L16** Layer 0 STRICT cột-by-cột — **EXTENDED Bước 5**: phải dump CHECK constraints (enum values), không chỉ column types
- **L17** Layer 1b cascade audit
- **L18** Layer 0 cascade audit FULL system trước migration (escalation #9)

## L16 extended (proposed enhancement)

**L16 v2:** Layer 0 STRICT audit phải bao gồm:
1. Column types + NULL constraint + default ✅ (existing)
2. **CHECK constraints (enum values)** ← NEW (Bước 5 fire vì missed)
3. **FK references** (buyer_id → user, unit_code → unit_master)
4. **Trigger / function dependencies**
5. **RLS policies** (verify before assuming role-based bypass)

Pattern: `\dt+ schema.table` + `\d+ schema.table` + check constraints DUMP trước rewrite.

## Sprint 9B remaining phases

| Pha | Mục đích | Estimate |
|---|---|---|
| 2b | Admin RFQ + /store/rfqs + 3 buyer wires | 6-8h |
| 1d-b | Quote workflow methods + cascade adapt | 4-6h |
| 3 | Apply mig 48+49 + staging deploy + UX | 10-15h |

Coordinator quyết định trigger Pha 2b (RECOMMENDED) hoặc Pha 1d-b next.

## Commits Pha 1d-a v2

```
3838b85 fix(medusa): rfq types + service CRUD rewrite (Bước 3-5)
8249cbe fix: D20-a REVERT 4 Sprint 9A files cybersilkroads → csr (Bước 2)
7228d67 feat(db): mig 50 — rfq sequences + D20-a REVERT (Bước 1)
```

Cumulative Sprint 9B: 3 commits ahead `origin/cms`.

**Pha 1d-a v2 ĐÓNG ✅** — Coordinator review → trigger Pha 2b.
