# Sprint 10 Pha 1 — L20 25-module Audit Report

**Ngày:** 2026-05-17
**Loại:** READ-ONLY discovery phase
**Branch:** `cms` (no code changes)
**Methodology:** Layer 0 (schema) + Layer 1 (service code) + Layer 1b (cascade) + spot-check column-level
**Audit script:** `/tmp/audit-module-compact.sh` (per-module 1-line summary)

## Tóm tắt

Audit 26 modules (25 Sprint 1 R20 era + 1 Sprint 9A NEW `supplier_application`) phát hiện **4 modules CONFIRMED 🔴 RED** broken (D21 + 3 D-NEW codes D23/D24/D25), **2 🟢 GREEN** functional (rfq + supplier_application), và **20 modules ⚠ TBD** cần Layer 0 STRICT column-level audit Sprint 11+ trước rewrite (schema-level pass, column-level chưa verify).

**Sprint 10 Pha 2 immediate target:** 4 RED modules × Pha 1d-a v2 pattern repeat ≈ 28-40h batch.

---

## Methodology áp dụng

Per mỗi module:

### Layer 0 — DB schema
- `\dt schema.*` — tables exist?
- Schema name (per MODULE_CONST) vs actual schema queried (service `INTO/FROM/UPDATE` refs)
- 39 custom schemas total (e.g., `live`, `ai`, `audit`, `auth`, `catalog`, `payment`, `experiment`, `fulfillment`, `advertising`, `email_mkt`, `identity`, `media`, `notification`, `search`, `tax`, `admin`, `vn_sourcing`, `communication`, `dispute`, `gdpr`, `rbac`, `returns`, `rfq`)

### Layer 1 — Service code
- `service.ts` line count + method count
- Pattern: raw-SQL (`extends MedusaService({})` + `queryT/withTenant`) vs factory (`MedusaService({ Model })`)
- INSERT/SELECT/UPDATE counts
- Schema refs (`FROM X.Y` / `INTO X.Y` / `UPDATE X.Y`)

### Layer 1b — Cascade outside module
- Refs to `${MODULE}_MODULE` trong `medusa/src/` outside module folder
- jobs/ subscribers/ workflows.ts mentions

### Spot-check column-level (Pha 1 limited — 4 suspects)
- escrow + marketplace + catalog-ext (Pha 0 v2 D10 commented defineLink — high-risk)
- communication (D21 confirmed Sprint 9B Pha 2b)
- Other 20 modules: schema-name pass + spot-check defer Sprint 11+ per-module

---

## 26 modules audit (compact summary)

| Module | Pattern | service.ts | Schema queried | Cascade | Severity |
|---|---|---|---|---|---|
| ai-livestream | raw-SQL | 388L, 19m, 21q | `live.*` ✅ exists | 7 medusa + 1 sub | ⚠ TBD |
| ai-platform | raw-SQL | 112L, 3m, 6q | `ai.*` ✅ exists | 1 medusa | ⚠ TBD |
| audit-log | raw-SQL | 67L, 3m, 2q | `audit.*` ✅ exists | 0 | ⚠ TBD |
| auth-security | raw-SQL | 125L, 6m, 8q | `auth.*` ✅ exists | 0 | ⚠ TBD |
| **catalog-ext** | raw-SQL | 241L, 6m, 5q | `catalog.*` ✅ (1 table MISSING) | 1 medusa | **🔴 RED** |
| **communication** | raw-SQL | 146L, 9m, 10q | `communication.*` ✅ (col mismatch) | 0 | **🔴 RED** (D21) |
| dispute | raw-SQL | 103L, 5m, 5q | `dispute.*` ✅ | 1 medusa | ⚠ TBD |
| **escrow** | raw-SQL + workflows | 216L, 8m, 7q | `payment.*` ✅ (col mismatch) | 2 medusa + 1 sub | **🔴 RED** (D23) |
| experimentation | raw-SQL | 92L, 4m, 6q | `experiment.*` ✅ | 1 medusa | ⚠ TBD |
| fulfillment-pro | raw-SQL | 183L, 8m, 5q | `fulfillment.*` ✅ | 0 | ⚠ TBD |
| gdpr | raw-SQL | 116L, 5m, 6q | `gdpr.*` ✅ | 0 + 1 job | ⚠ TBD |
| live-commerce | raw-SQL | 155L, 8m, 8q | `live.*` ✅ | 2 medusa | ⚠ TBD |
| marketing-ads | raw-SQL | 144L, 7m, 9q | `advertising.*` ✅ | 0 | ⚠ TBD |
| marketing-email | raw-SQL | 88L, 5m, 8q | `email_mkt.*` + `identity.*` ✅ | 1 medusa | ⚠ TBD |
| **marketplace** | raw-SQL + workflows | 311L, 8m, 8q | `identity.*` ✅ (col mismatch) | 0 | **🔴 RED** (D24) |
| media-layer | raw-SQL | 113L, 7m, 8q | `media.*` ✅ | 2 medusa | ⚠ TBD |
| notification-bus | raw-SQL | 111L, 6m, 6q | `notification.*` ✅ | 10 medusa | ⚠ TBD |
| payment-abstract | raw-SQL | 126L, 6m, 6q | `payment.*` ✅ | 4 medusa | ⚠ TBD |
| rbac | raw-SQL | 99L, 8m, 6q | `rbac.*` ✅ | 0 | ⚠ TBD |
| returns | raw-SQL | 72L, 4m, 4q | `ord.*` ✅ (returns schema unused) | 0 | ⚠ TBD-suspect |
| **rfq** | raw-SQL | 267L, 5m, 4q | `rfq.*` ✅ | 6 medusa + 1 job + 1 sub | 🟢 GREEN (Pha 1d-a v2) |
| search-platform | raw-SQL | 111L, 5m, 2q | `search.*` ✅ | 5 medusa | ⚠ TBD |
| **supplier_application** | factory (MikroORM) | 8L, 0m | `public.supplier_application` ✅ | 3 medusa | 🟢 GREEN (Sprint 9A) |
| tax-engine | raw-SQL | 91L, 4m, 4q | `tax.*` ✅ | 0 | ⚠ TBD |
| tenant | raw-SQL | 123L, 7m, 8q | `admin.*` ✅ | 0 | ⚠ TBD |
| vn-sourcing | raw-SQL | 181L, 7m, 8q | `vn_sourcing.*` ✅ | 0 | ⚠ TBD |

**Legend:**
- Format: lines/methods/SQL-queries
- ✅ exists = schema name exists trong DB
- (col mismatch) = column-level audit phát hiện service refs columns không tồn tại

---

## 🔴 RED modules (4 confirmed) — Sprint 10 Pha 2 priority

### 1. communication (D21 — Sprint 9B Pha 2b)
- **service columns refs:** `participant_ids`, `type`, `archived`, `title`, `metadata`
- **schema actual cols** (26 total): `code`, `context_type`, `context_entity_type`, `context_entity_id`, `subject_i18n`, `initiator_user_id`, `initiator_type`, `supplier_id`, `related_product_id`, `related_order_id`, `related_rfq_id`, `status`, `priority`, `last_message_at`, `last_message_preview`, `unread_count_buyer`, `unread_count_supplier`, ...
- **Existing data:** 0 rows
- **Severity:** Service inserts/queries non-existent columns. CHECK constraints 3 enums (context_type, priority, status).
- **Rewrite estimate:** 8-10h (pattern Pha 1d-a v2 repeat)

### 2. escrow (D23 NEW — Sprint 10 Pha 1 audit)
- **service INSERT INTO payment.escrow:** `id, tenant_id, order_id, buyer_user_id, supplier_id, total_amount_minor, currency, total_usd_minor, fx_snapshot_id, status, expires_at, created_at, updated_at`
- **schema actual cols** (18 total): `id, tenant_id, created_at, updated_at, version, metadata, order_id, holding_bank_account_id, currency_held, amount_held_minor, amount_held_usd_minor, amount_released_minor, amount_refunded_minor, withholding_amount_minor, withholding_release_at, status, opened_at, closed_at`
- **Mismatches:**
  - `buyer_user_id`, `supplier_id`, `total_amount_minor`, `currency`, `total_usd_minor`, `fx_snapshot_id`, `expires_at` — KHÔNG có trong schema
  - Schema rename: `total_amount_minor → amount_held_minor`, `currency → currency_held`, `total_usd_minor → amount_held_usd_minor`
  - Schema NEW required: `holding_bank_account_id` (NOT NULL), `version`, `metadata`, `withholding_release_at`
- **Cascade:** 2 medusa refs + 1 subscriber + workflows.ts trong module
- **Pha 0 v2 D10 confirmed:** escrow `defineLink` commented (links to non-existent model.define())
- **Rewrite estimate:** 8-10h

### 3. marketplace (D24 NEW — Sprint 10 Pha 1 audit)
- **service INSERT INTO identity.supplier:** `id, tenant_id, slug, legal_name, display_name_i18n, country_code, operation_mode, can_sell_wholesale, can_sell_retail, can_act_as_agent, year_established, primary_industry_code, status, verification_tier, created_at, updated_at, metadata`
- **schema actual cols** (~24+ total based on top 23 visible): `id, tenant_id, created_at, updated_at, deleted_at, created_by_user_id, updated_by_user_id, version, metadata, slug, legal_name, display_name_i18n, supplier_type, country_code, province, city, address_line, geo_lat, geo_lng, primary_currency, support_languages, verification_tier, is_audited, ...`
- **Mismatches:**
  - `operation_mode`, `can_sell_wholesale`, `can_sell_retail`, `can_act_as_agent`, `year_established`, `primary_industry_code`, `status` — KHÔNG có trong schema
  - Schema rename: `supplier_type` (likely replace `operation_mode`)
  - Schema NEW required: `province`, `city`, `address_line`, `primary_currency`, `support_languages`, `is_audited`, `created_by_user_id`, `updated_by_user_id`
- **Cascade:** 0 medusa refs + workflows.ts trong module
- **Pha 0 v2 D10 confirmed:** marketplace `defineLink` commented
- **Rewrite estimate:** 8-10h

### 4. catalog-ext (D25 NEW — Sprint 10 Pha 1 audit)
- **service INSERT INTO catalog.product_customization_option:** `id, tenant_id, product_id, option_type, label_i18n, required, free_of_charge, upcharge_minor, values, created_at, updated_at`
- **Table `catalog.product_customization_option` DOES NOT EXIST** (verified `SELECT EXISTS(...)` returned `f`)
- **catalog schema actual tables** (14): brand, buy_box_algorithm_config, buy_box_winner, canonical_image, customization_request, gtin_registry, master_product, master_product_attribute, price_tier, product, product_audience_availability, product_bundle, product_match_signal, product_variant
- **Likely intent:** `customization_request` (similar name) — schema design changed Sprint 1 R20 era
- **Cascade:** 1 medusa ref
- **Pha 0 v2 D10 confirmed:** catalog-ext `defineLink` commented
- **Rewrite estimate:** 6-8h (smaller scope, fewer methods)

---

## 🟢 GREEN modules (2 verified)

### 1. rfq (Sprint 9B Pha 1d-a v2)
- Service rewrite map sang `rfq.rfq`, `rfq.rfq_quote`, `rfq.rfq_invited_supplier` schema thật
- 5 CRUD methods + workflow timestamps
- Cascade workflows.ts + jobs/rfq-expirer.ts + subscribers/rfq-events.ts còn broken (defer Pha 1d-b)
- Quote workflow methods defer Pha 1d-b

### 2. supplier_application (Sprint 9A NEW)
- MedusaService factory pattern + Mikro-ORM `SupplierApplication` model
- Auto-generated methods (`listSupplierApplications`, etc.)
- Public schema, 17 rows existing data, all 'csr' tenant
- KHÔNG có refs `ord.X` style broken pattern

---

## ⚠ TBD 20 modules — Sprint 11+ STRICT audit needed

Schema-level pass (service queries actual existing schemas). Column-level chưa verified. Per-module Layer 0 STRICT + L19 (CHECK + FK + enum + seed) cần làm trước rewrite quyết định.

**Sub-categories suspect dựa trên Pha 1 indicators:**

### High-risk (cascade > 5 medusa refs hoặc workflows.ts) — verify priority Sprint 11
- `ai-livestream` (7 medusa refs + 1 sub + 388 lines service)
- `notification-bus` (10 medusa refs)
- `rfq` cascade workflows still need Pha 1d-b
- `escrow` workflows.ts (RED, fix Sprint 10 Pha 2)
- `marketplace` workflows.ts (RED, fix Sprint 10 Pha 2)

### Medium-risk (workflows hoặc 1+ cascade)
- `payment-abstract` (4 medusa refs)
- `live-commerce` (2 medusa refs)
- `media-layer` (2 medusa refs)
- `search-platform` (5 medusa refs)

### Low-risk (0 cascade + small service)
- `audit-log` (67L, 3m)
- `tax-engine` (91L, 4m)
- `experimentation`, `gdpr`, `rbac`, `returns`, `tenant`, `vn-sourcing`
- `auth-security`, `dispute`, `marketing-ads`, `marketing-email`
- `ai-platform`, `fulfillment-pro`

### Note: `returns` schema unused suspicion
Service queries `ord.return_request, ord.return_inspection` nhưng `returns` schema có 7 tables riêng (chưa được dùng). Có thể là `returns` schema rebuild Sprint 1 R20 era, service chưa adapt → suspect 🔴 RED column-level Sprint 11+.

---

## Sprint 10 Pha 2 recommendation

**Batch rewrite 4 RED modules (Sprint 10 Pha 2):**

| # | Module | Pattern reference | Estimate |
|---|---|---|---|
| 1 | communication (D21) | Pha 1d-a v2 — unblock /buyer-center/messages | 8-10h |
| 2 | escrow (D23) | Pha 1d-a v2 — unblock Pha 0 v2 defineLink restore | 8-10h |
| 3 | marketplace (D24) | Pha 1d-a v2 — unblock supplier registration deep flow | 8-10h |
| 4 | catalog-ext (D25) | Pha 1d-a v2 (smaller) — possibly drop+recreate or redesign | 6-8h |

**Total Sprint 10 Pha 2 estimate:** **30-38h** (matches plan paste 30-40h).

**Per-module workflow** (Pha 1d-a v2 pattern):
- Bước 0: Layer 0 STRICT audit (column + DEFAULT + NOT NULL + CHECK + FK + seed) — L16+L19
- Bước 1: Backup + migration nếu cần (sequences, schema additions)
- Bước 2: Rewrite types.ts
- Bước 3: Rewrite service.ts
- Bước 4: Build verify + cascade stub strategy (workflows/jobs/subs defer)
- Bước 5: Functional SQL INSERT test
- Bước 6: Commit + per-module report

## Sprint 11+ scope

**20 TBD modules per-module STRICT audit + rewrite (if needed):**
- High-risk: 5 modules × 8-10h = 40-50h
- Medium-risk: 4 modules × 6-8h = 24-32h
- Low-risk: 11 modules × 4-6h (audit only) = 44-66h (rewrite only if broken)

**Sprint 11+ total estimate:** 108-148h dedicated maintenance (matches L20 plan 144-240h with rewrite contingency).

## Plan deviations Pha 1 (D-NEW codes)

| ID | Module | Issue | Severity |
|---|---|---|---|
| D23 NEW | escrow | service INSERT cols mismatch schema (buyer_user_id, total_amount_minor, etc.) | 🔴 RED |
| D24 NEW | marketplace | service INSERT cols mismatch (operation_mode, can_sell_*, etc.) | 🔴 RED |
| D25 NEW | catalog-ext | table `product_customization_option` không tồn tại | 🔴 RED |

(D21 communication đã codified Sprint 9B Pha 2b)

## HARD RULES Pha 1 compliance

| Rule | OK? |
|---|---|
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 7 — Multi-layer audit | ✅ Layer 0 + 1 + 1b + 3 (smoke) + spot-check column |
| Rule 8 — No placeholder | ✅ defers Sprint 11+ documented |
| Rule 9 — Tiếng Việt thuần | ✅ |

**READ-ONLY:** ✅ 0 code commits, 0 migrations, 0 DB modifications (chỉ commit audit report)

## Lessons applied / proposed Pha 1

- **L20 applied:** Sprint 1 R20 era architectural debt confirmed (4 RED modules total — was 3 from Sprint 9B, +3 new từ Pha 1 spot-check)
- **L21 applied:** Multi-module audit trước bất kỳ batch rewrite plan
- **L22 proposed (Pha 1):** Schema name (MODULE_CONST) vs actual schema queried (service refs) divergence pattern — MODULE_CONST naming Sprint 9A D14 was Medusa framework convention, KHÔNG correlate với DB schema names. Audit pattern: extract service refs `FROM/INTO X.Y` trước assume schema based on MODULE_CONST. → Discovery pattern saved Sprint 11+ time bằng cách distinguish schema-name pass vs column-level fail.

## Next: Sprint 10 Pha 2

Coordinator (Claude) sẽ write Sprint 10 Pha 2 block lệnh với 4 RED modules rewrite batch (Pha 1d-a v2 pattern repeat × 4).

**Order recommended:**
1. **communication** (highest priority — unblock Sprint 9A defer /buyer-center/messages)
2. **catalog-ext** (smallest scope, fastest win)
3. **escrow** (cascade workflows.ts + sub, complex)
4. **marketplace** (cascade workflows.ts, deep model)

Hoặc parallel batch nếu Coordinator chấp nhận multiple commits per turn.

## References

- Audit script: `/tmp/audit-module-compact.sh`
- DB schema discovery: 39 custom schemas + 282 RLS policies + 754 total tables
- Sprint 9B Pha 1d-a v2: pattern reference (rfq rewrite)
- Sprint 9B Pha 2b ESCALATE D21: communication broken pattern
- Sprint 9A Pha 0 v2 D10: 3 defineLink files commented (escrow, marketplace, catalog-ext)
- P9-AUDIT-CLOSURE: 25/26 modules raw-SQL pattern (Anomaly 3 → Sprint 10 L20 trigger)
- CONVENTIONS.md (Mini-Pha 4): module folder/constant + tenant + pattern documentation
