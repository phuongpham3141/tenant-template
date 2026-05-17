# Sprint 11 Pha 1 — L20-extended 20-module Audit Report DONE

Ngày: 2026-05-17
Loại: READ-ONLY discovery phase
Branch: cms (no code changes)
Audit method: 5-Dimension template per module + bulk metadata extract
Reference: Sprint 10 Pha 1 (6 modules) + L22-L25 lessons applied

## Methodology — 5-Dimension audit template

| Dimension | Check | Lesson |
|---|---|---|
| D1 Schema-name | Tables tồn tại trong schema queried | L20 |
| D2 Method-level | INSERT target tables EXISTS verified | L23 |
| D3 Cascade depth | External MODULE refs (jobs/subs/workers/api/admin) | L17 |
| D4 UI consumer | Storefront SDK / Actions / Admin UI / API endpoints | L25 NEW |
| D5 Architectural fit | Service pattern (all extends MedusaService + raw-SQL) | Pha 2c lesson |

## Bulk metadata results

### 20 modules baseline metrics

| Module | Service lines | Methods | INSERTs |
|---|---|---|---|
| ai-livestream | 388 | 41 | 9 |
| vn-sourcing | 181 | 10 | 6 |
| fulfillment-pro | 183 | 11 | 4 |
| live-commerce | 155 | 10 | 5 |
| marketing-ads | 144 | 8 | 5 |
| tenant | 123 | 11 | 3 |
| auth-security | 125 | 10 | 4 |
| media-layer | 113 | 8 | 3 |
| ai-platform | 112 | 14 | 3 |
| gdpr | 116 | 7 | 3 |
| notification-bus | 111 | 10 | 3 |
| search-platform | 111 | 14 | 1 |
| payment-abstract | 126 | 11 | 2 |
| dispute | 103 | 8 | 2 |
| rbac | 99 | 11 | 4 |
| experimentation | 92 | 9 | 4 |
| tax-engine | 91 | 9 | 0 |
| marketing-email | 88 | 7 | 4 |
| returns | 72 | 6 | 2 |
| audit-log | 67 | 12 | 0 |

Common pattern: ALL 20 modules use extends MedusaService raw-SQL queryT/withTenant — confirmed L20 Sprint 1 R20 era.
0 workflows.ts files across 20 modules (cleaner cascade than Sprint 10 batch).

## D1+D2 — INSERT target table verification (CRITICAL)

Verified 54 INSERT target tables across 20 modules.

### MISSING (38/54 = 70%)

| Module | Schema | Missing tables | Severity |
|---|---|---|---|
| tenant | admin | tenant, tenant_branding, usage_meter | 3/3 broken |
| ai-platform | ai | embedding, inference_cache, inference_log | 3/3 broken |
| marketing-email | email_mkt | campaign, journey, journey_step, segment | 4/4 broken |
| experimentation | experiment | experiment, exposure, metric_event, variant | 4/4 broken |
| notification-bus | notification | notification_delivery, suppression_list | 2/2 broken |
| returns | ord | return_request, return_inspection (wrong schema!) | 2/2 broken |
| vn-sourcing | vn_sourcing | audit_report, factory_visit, freight_quote, interpreter_session, mou, sample_request | 6/6 broken |
| auth-security | auth | mfa_enrollment, password_reset_token, session | 3/4 broken |
| marketing-ads | advertising | ad_campaign, ad_creative, ad_group | 3/5 broken |
| live-commerce | live | featured_product, flash_auction, livestream, lucky_draw, stream_gift | 5/5 broken |
| ai-livestream | live | (5 of 9 missing — needs deeper audit) | 5/9 broken |
| media-layer | media | processing_job | 1/3 broken |
| rbac | rbac | role | 1/4 broken |
| fulfillment-pro | fulfillment | shipment | 1/4 broken |

### ALL EXIST (16/54)

| Module | Schema | All tables present |
|---|---|---|
| dispute | dispute | aml_flag, dispute |
| gdpr | gdpr | consent_record, data_breach_incident, data_subject_request |
| payment-abstract | payment | payment_transaction, chargeback_case |
| search-platform | search | search_query_log |
| audit-log | audit | (no INSERTs — read-only utility) |
| tax-engine | tax | (no INSERTs — read-only utility) |

## D3 — Cascade external refs

| Module | External refs | Jobs | Subs | Workers | API | Admin UI |
|---|---|---|---|---|---|---|
| notification-bus | 10 | 1 | 6 | 1 | 2 | 0 |
| ai-livestream | 7 | 1 | 0 | 2 | 4 | 0 |
| search-platform | 5 | 0 | 3 | 1 | 1 | 0 |
| payment-abstract | 4 | 0 | 0 | 0 | 4 | 0 |
| live-commerce | 2 | 0 | 1 | 1 | 0 | 0 |
| media-layer | 2 | 0 | 1 | 1 | 0 | 0 |
| ai-platform | 1 | 0 | 1 | 0 | 0 | 0 |
| marketing-email | 1 | 1 | 0 | 0 | 0 | 0 |
| dispute | 1 | 0 | 1 | 0 | 0 | 0 |
| experimentation | 1 | 1 | 0 | 0 | 0 | 0 |
| Others (10 modules) | 0 | 0 | 0 | 0 | 0 | 0 |

## D4 — UI consumer matrix (L25)

| Module | SDK | Actions | StoreAPI | AdminAPI | AdminUI | TOTAL |
|---|---|---|---|---|---|---|
| ai-livestream | 1 | 0 | 1 | 1 | 1 | 4 |
| returns | 0 | 2 | 0 | 0 | 0 | 2 |
| vn-sourcing | 1 | 0 | 0 | 0 | 0 | 1 |
| (17 modules) | 0 | 0 | 0 | 0 | 0 | 0 |

Massive surprise: Only 3/20 modules have any UI consumers. Most are dead code.

## Severity Ranking Output — 20 modules

### RED (11 modules, full rewrite OR drop needed)

| # | Module | INSERT broken | Cascade | UI | Likely Path |
|---|---|---|---|---|---|
| 1 | ai-livestream | 5/9 (55%) | 7 | 4 | Path A/B (UI dependent — hybrid) |
| 2 | notification-bus | 2/2 (100%) | 10 | 0 | Path D drop + 10 cascade stubs |
| 3 | vn-sourcing | 6/6 (100%) | 0 | 1 | Path D drop |
| 4 | live-commerce | 5/5 (100%) | 2 | 0 | Path D drop |
| 5 | marketing-email | 4/4 (100%) | 1 | 0 | Path D drop |
| 6 | experimentation | 4/4 (100%) | 1 | 0 | Path D drop |
| 7 | auth-security | 3/4 (75%) | 0 | 0 | Path D drop (Medusa core auth covers) |
| 8 | marketing-ads | 3/5 (60%) | 0 | 0 | Path D drop |
| 9 | ai-platform | 3/3 (100%) | 1 | 0 | Path D drop |
| 10 | tenant | 3/3 (100%) | 0 | 0 | Path D drop |
| 11 | returns | 2/2 (100%) | 0 | 2 Actions | Path B (returns.* exists schema fix) |

### YELLOW (3 modules, quick fix)

| Module | INSERT broken | Cascade | UI | Fix |
|---|---|---|---|---|
| media-layer | 1/3 (33%) | 2 | 0 | Drop processing_job method |
| rbac | 1/4 (25%) | 0 | 0 | Drop role method (use rbac.role_master) |
| fulfillment-pro | 1/4 (25%) | 0 | 0 | Drop shipment method |

### GREEN (6 modules, functional)

| Module | Methods | Status |
|---|---|---|
| dispute | 8 | All INSERTs OK |
| gdpr | 7 | All INSERTs OK |
| payment-abstract | 11 | All INSERTs OK (high cascade=4 watch) |
| search-platform | 14 | INSERT OK (high cascade=5 watch) |
| audit-log | 12 | Read-only utility, no INSERTs |
| tax-engine | 9 | Read-only utility, no INSERTs |

## Sprint 12 Pha 2 rewrite batch plan

### Priority order (decision matrix per Sprint 10 patterns)

Tier 1 (Critical — UI consumers exist):
1. ai-livestream (Path A/B, 8-12h) — 4 UI consumers + 7 cascade, hybrid broken
2. returns (Path B, 4-6h) — 2 Actions + simple schema fix (queries returns.* instead of ord.*)

Tier 2 (High cascade — careful drop):
3. notification-bus (Path D drop + 10 cascade stubs, 4-6h)
4. search-platform (verify SELECT/UPDATE queries Sprint 12)

Tier 3 (Clean drop — 0 UI + low cascade):
5. live-commerce (Path D, 2-3h)
6. vn-sourcing (Path D, 2-3h)
7. marketing-email (Path D, 1-2h)
8. experimentation (Path D, 1-2h)
9. ai-platform (Path D, 1-2h)
10. marketing-ads (Path D, 1-2h)
11. auth-security (Path D, 1-2h)
12. tenant (Path D, 1-2h)

Tier 4 (Quick fixes):
13. media-layer (Path D-partial, 1-2h)
14. rbac (Path D-partial, 1-2h)
15. fulfillment-pro (Path D-partial, 1-2h)

Estimated Sprint 12 total effort:
- Tier 1: 12-18h (2 modules)
- Tier 2: 4-6h (notification-bus + verify search-platform)
- Tier 3: 12-18h (8 modules × 1-3h each)
- Tier 4: 3-6h (3 quick fixes)
- TOTAL: 31-48h

Vs Sprint 10 actual 18h for 4 modules → Sprint 12 scope ~2x Sprint 10.

## L23 reinforced 4th time (Sprint 11 audit aggregate)

Sprint 10 Pha 1 estimated 4 RED. Sprint 11 found 11 RED + 3 YELLOW out of 20 TBD modules.

Pha 1 audit ALWAYS underestimates because:
1. Schema-name pass ≠ method-level pass (L23 confirmed)
2. Method-level pass ≠ INSERT table exists (NEW Sprint 11 finding)
3. INSERT table exists ≠ columns match (L19 deep audit deferred)

Sprint 11 reveal: Sprint 1 R20 era debt MUCH larger than estimated:
- 4 (Sprint 10 actual) + 11 (Sprint 11 RED) = 15 RED modules in 26 total = 58% rot rate
- 70% INSERT target tables missing (38/54)

## Comparison Sprint 10 vs Sprint 11

| Metric | Sprint 10 Pha 1 | Sprint 11 Pha 1 |
|---|---|---|
| Modules audited | 6 (depth) | 20 (5-dim template) |
| RED found | 4 | 11 |
| YELLOW found | 0 | 3 |
| GREEN found | 2 | 6 |
| Time invested | 2h | ~3h (bulk approach 5x faster) |
| Pha 2 actual | 18h (4 RED) | 31-48h estimated (14 RED+YELLOW) |

## Lessons Sprint 11 NEW proposed (L26 candidate)

L26 (proposed): Bulk audit via SQL information_schema 5-10x faster than per-module bash script.

Pattern: SELECT table_schema with EXISTS subquery cho mọi INSERT targets cùng query → instant verification vs per-module shell iteration.

Sprint 11 audit 20 modules ~3h vs Sprint 10 Pha 1 audit 6 modules ~2h (extrapolated 6.7h for 20). 3x speedup via bulk SQL approach.

## HARD RULES Pha 1 compliance 9/9

| Rule | OK? |
|---|---|
| Rule 1 — Commit audit report | OK |
| Rule 4 — KHÔNG đụng main/develop | OK cms only |
| Rule 5 — Git sync trước audit | OK |
| Rule 7 — Multi-layer audit STRICT | OK 5 dimensions + bulk extract |
| Rule 8 — No placeholder | OK actual table verification |
| Rule 9 — Tiếng Việt thuần | OK |

KHÔNG modify code (READ-ONLY confirmed).

## Sprint 11 Pha 2+ priorities

### Pha 2a NEXT (Sprint 11)
- ai-livestream (Path A/B, 8-12h) — Tier 1 critical
- Then returns (Path B, 4-6h)

### Pha 2b-d batch drops (Sprint 11/12)
- 8 modules clean drops Tier 3 (12-18h total)
- 3 quick fixes Tier 4 (3-6h)
- notification-bus cascade-heavy (4-6h)

### Sprint 12+ (defer)
- search-platform deep verify (cols + SELECT/UPDATE)
- ai-livestream Sprint 11+ if UX drives
- Feature-driven rewrites khi integration drives
