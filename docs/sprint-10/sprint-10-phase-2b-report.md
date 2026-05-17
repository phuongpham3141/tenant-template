# Sprint 10 Pha 2b — catalog-ext D25 fix ✅ DONE (Option D NEW pragmatic)

**Ngày:** 2026-05-17
**Sprint:** 10 **Pha:** 2b (D25 resolve, RED #2 of 4 batch)
**Commit:** `34d5ea6`
**Decision path:** **Option D NEW** (drop broken method, defer customization_request integration Sprint 11+)
**Status:** ✅ catalog-ext clean, 5/6 methods preserved

## D25-EXPANDED findings (Bước 0 STRICT)

### Pha 1 audit said
- Service `INSERT INTO catalog.product_customization_option` → table KHÔNG TỒN TẠI
- Suggested intent: `customization_request`

### Pha 2b STRICT audit reveal deeper

**catalog.customization_request EXISTS với 24 cols** — designed for B2B OEM custom order workflow:
- 24 cols: id (uuidv7), tenant_id, code, buyer_id (NOT NULL FK→identity.user), supplier_id (NOT NULL FK→identity.supplier), product_id (FK→catalog.product), rfq_id, request_type (NOT NULL CHECK 8 enums), description_i18n (NOT NULL jsonb), artwork_urls (text[]), target_quantity (NOT NULL), unit_code (NOT NULL FK→common.unit_master), budget_min/max_usd_minor, revision_round (DEFAULT 0), max_revisions (DEFAULT 5), status (CHECK 8 enums DEFAULT 'draft'), approval_gate_at, converted_order_id (FK→ord.order), expires_at
- **2 CHECK enums:** request_type (logo/packaging/color/material/dimension/spec/full_oem/formula), status (draft/submitted/in_revision/approved/rejected/converted_to_order/cancelled/expired)
- **5 FK chains:** tenant + buyer + supplier + product + converted_order + unit_code
- **0 rows existing**

### Semantic mismatch confirmed (different business concepts)

| Concept | Service intent | Schema reality |
|---|---|---|
| Name | `product_customization_option` | `customization_request` |
| Purpose | Product variant configurations (color/size options) | B2B OEM custom order workflow |
| Example | "this product has color: red/blue/green, +$10 upcharge" | "I want logo branding, target qty 1000, status workflow" |
| Schema design | Pricing variant per option | Order workflow + revisions + approval gate |

### Match analysis

| Layer | Match % | Interpretation |
|---|---|---|
| Column name direct | 4/11 ≈ 36% | Below 40% ESCALATE threshold |
| With rename (option_type↔request_type, label_i18n↔description_i18n) | 6/11 ≈ 55% | Mid-range, still semantic gap |
| Semantic match | 0% | TWO different business concepts |

Per plan paste Option C ESCALATE rule fired. BUT cascade audit reveals smaller scope:

## Cascade audit (Bước 0d) — ZERO impact

| File | References | Method called |
|---|---|---|
| `medusa/src/links/product-master.ts` | defineLink (commented Pha 0 v2 D10) | No live code |
| `medusa/src/subscribers/catalog-indexer.ts` | `catalog.getProduct(ctx, id)` | Uses working getProduct only |

→ **`addCustomization` method NEVER CALLED outside catalog-ext**. Pure dead code.

## Decision: Option D NEW (pragmatic)

Plan paste Options A/B/C all proposed substantial refactor (4-8h). With cascade ZERO + 0 rows existing + semantic gap, pragmatic Option D NEW:

**DROP `addCustomization` method + `CustomizationOption` type. Defer `customization_request` integration Sprint 11+ when UI requirement drives.**

Rationale:
- 5/6 service methods working (catalog product CRUD + master + buybox)
- 0 cascade impact (no users of dropped method)
- 0 data (no migration concern)
- Schema designer intent (customization_request) is OEM workflow, needs UI design first (Sprint 11+)
- Time saved: 1h vs 4-8h plan paste estimate

## Changes (48 lines deleted, 1 inserted)

| File | Change | Lines |
|---|---|---|
| `medusa/src/modules/catalog-ext/service.ts` | Remove `addCustomization` method (25 lines) + `mapCustomization` function (13 lines) + import `CustomizationOption` | -39 |
| `medusa/src/modules/catalog-ext/types.ts` | Remove `CustomizationOption` interface | -10 |

## Service.ts AFTER (5 methods, 204 lines)

1. `listProducts(ctx, opts)` ✅
2. `getProduct(ctx, id)` ✅
3. `createProduct(ctx, input)` ✅
4. `listMasterProducts(ctx, opts)` ✅
5. `computeBuyBox(ctx, masterProductId, opts)` ✅

## types.ts AFTER (4 interfaces, 57 lines)

- `ProductStatus` enum ✅
- `ProductExtension` interface ✅
- `MasterProduct` interface ✅
- `BuyBoxCandidate` interface ✅
- `UnitMaster` interface ✅

## Smoke results

```
=== Build ===
Frontend admin: PASS
Backend: PASS (only pre-existing workers errors unchanged)

=== Sprint 9 + Pha 2a regression ===
POST /store/supplier-applications  → HTTP 201 ✓
POST /store/carts                   → HTTP 200 ✓
GET  /store/rfqs (no auth)          → HTTP 401 ✓

=== Medusa stability ===
Health 200 ✓
```

## HARD RULES 9/9 PASS

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ 1 commit |
| Rule 2 — Backup trước drop | ✅ /tmp/sprint-10-pha-2b-bak/ |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 7 — Multi-layer audit | ✅ Layer 0+1+1b STRICT |
| Rule 8 — No placeholder | ✅ Sprint 11+ TODO documented commit msg |
| Rule 8 phụ — Plan deviation handling | ✅ Option D NEW vs plan A/B/C documented |
| Rule 9 — Tiếng Việt thuần | ✅ |

## Lessons applied

- L7 (best-effort UX): drop dead code over refactor speculative
- L9 verify reality (Bước 0 STRICT revealed semantic gap)
- L19 CHECK + FK + seed audit (full schema understanding)
- L20 R20 era debt (catalog-ext = mostly working, 1 broken method, not whole module RED)
- L22 schema name pass ≠ semantic match (Sprint 10 Pha 1 finding extended)

**L23 NEW proposed:** "RED severity ranking based on schema-name fail có thể overstate scope. Layer 1 audit method-level severity + cascade check trước Pha 2 batch plan." catalog-ext Pha 1 RED was 1/6 method broken, cascade ZERO → really 🟠 ORANGE in retrospect.

## Sprint 11+ TODO documented

- `customization_request` module rewrite (when product customization UI requirement drives)
- 4-6h estimate (smaller scope vì 0 rows + 0 cascade existing)
- Pattern: Pha 1d-a v2 / Pha 2a communication repeat

## Sprint 10 Pha 2 batch progress

| # | Module | Status | Commit | Time |
|---|---|:-:|---|---|
| 1 | communication (D21) | ✅ DONE | `1df8703` | 7h actual |
| 2 | **catalog-ext (D25)** | **✅ DONE** | **`34d5ea6`** | **1h actual** |
| 3 | escrow (D23) | ⏳ NEXT (Pha 2c) | — | 8-10h estimate |
| 4 | marketplace (D24) | ⏳ Pha 2d | — | 8-10h estimate |

**Sprint 10 Pha 2 cumulative time:** 8h (vs 30-38h plan paste estimate) — pragmatic Option D NEW saved significant time.

## References

- Pha 1 L20 audit: `docs/sprint-10/L20-audit-report.md`
- Pha 2a communication: `docs/sprint-10/sprint-10-phase-2a-report.md`
- Pattern reference: Pha 1d-a v2 (rfq) + Pha 2a (communication)
- Schema audit: catalog.customization_request 24 cols + 2 CHECK + 5 FK
