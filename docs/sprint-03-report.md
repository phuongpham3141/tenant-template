# Sprint 3 — API Contract + Re-audit + Sync — CLOSED

**Date:** 2026-05-15
**Duration:** 3 phases (Day 1 + Day 2 + Phase 3)
**Branch:** `cms` (4 commits Sprint 3, pushed origin)
**Coordinator:** Claude (chat)
**Executor:** Claude Code (medusa-dev VM)

## Phase 1 — Group A re-audit (Day 1)

11/11 Sprint 2 fixes verified hold. **0 regression.**

Verified findings:
- P1.6-F1 Tenant RLS (8 tables policy_count=1)
- P1.6-F2 FK indexes (missing=0, invalid=0)
- P1.2-F1+F2 pgvector + pg_partman (extensions + smoke test PASS)
- P1.5-F3 PUBLISHABLE_KEY (env loaded)
- P1.4-F3 Payload tenantId (cybersilkroads)
- P1.4-F6 Payload migrate workflow (ensure-admin idempotent)
- P3.1-F1+F2+D4-F3 HNSW + 13 NOT NULL
- P1.0-F1 Git sync (backup branch on remote)

Side-finding: **P3.D7-F1 NEW** — 44 non-FK indexes lost trong mig 46 partition convert (Sprint 8 evaluate).

Commit: `b0a7716`.

## Phase 2 — Group C re-audit (Day 2)

7 P2/P3 deferred findings re-classified với Rule 7 multi-layer:

| Classification | Count | Findings |
|---|---|---|
| REAL (Sprint 8 backlog) | 4 | P2.1-F2, P3.D4-F1, P3.D4-F2, P3.D4-F4 |
| NOT GAP (drop) | 2 | P3.1-F3, P3.1-F4 |
| WONT FIX | 1 | P2.D2-F1/F2 |

Notable:
- **P2.1-F2** — R23 CHECK 03 script hard-codes `policyname = 'tenant_isolation'` → tables có `tenant_self_*` bị treat as "no policy" → explains Sprint 1 false positive
- **P3.D4-F2** — Runbook `partition-conversion.md` **MISSING** + audit_event chưa partition. Sprint 8 cần write runbook trước apply.
- **P3.D4-F4** — Mig 46 logged status='success' với 0/13 succeeded → semantics fuzzy confirmed

Commit: `c8d92ac`.

## Phase 3 — API Docs + Sync + Close

### P3.2 — API Contract v1

`docs/api-contract-v1.md` (209 lines) documented:

| Component | Count |
|---|---|
| Storefront pages | 59 (public + protected) |
| /api routes | 9 (6 auth + me + visual-upload + webhook) |
| Server actions | 8 (rfq, chat, checkout, etc.) |
| SDK clients | 14 (ai, rfq, order, payment, etc.) |
| Unique Medusa endpoint stems | 17 |
| Total API calls in SDK | 43 |

Architecture documented: **SSR/Server Action → api() helper → Medusa direct**. Auth proxy explained.

Catalog vs Medusa core 2-tier architecture documented.

Commit: `e533978`.

### P3.3 — catalog → public sync (mig 47)

Function created:
- `catalog.sync_product_to_public(uuid)` — single product
- `catalog.sync_all_products_to_public()` — batch (status='published')

Idempotent: `ON CONFLICT (id) DO UPDATE` (id is PRIMARY KEY).

Extracts `title_i18n->>'vi'` (default Vietnamese), fallback en.

Tracks metadata: `catalog_id, supplier_id, synced_at, sync_version, sync_source`.

**Verified test:**
```
=== Batch sync ===
 attempted | synced | failed 
-----------+--------+--------
        25 |     25 |      0

=== Counts ===
 catalog_published | public_total | synced_count 
-------------------+--------------+--------------
                25 |           29 |           25
```

25/25 synced. public.product now has 4 default + 25 cybersilkroads.

Sprint 4 task: Medusa subscriber wire-up after catalog.product UPDATE event.

Commit: `53a5d3e`.

## Sprint 3 totals

| Metric | Value |
|---|---|
| Real implementations | 2 (API docs + sync migration 47) |
| Re-audit verified | 18 findings (Group A 11 + Group C 7) |
| Findings reclassified | 7 (4 REAL Sprint 8 + 2 NOT GAP + 1 WONT FIX) |
| NEW findings | 1 (P3.D7-F1 — 44 non-FK indexes lost) |
| Sprint 8 backlog total | 5 items |
| Commits | 4 (b0a7716, c8d92ac, e533978, 53a5d3e) + this report |
| Migrations new | 1 (mig 47) |

## Catalog vs public state final

```
catalog.product:    25 (cybersilkroads, status='published')
public.product:     29 (4 Medusa default + 25 synced)
public.product
  WHERE metadata->>'catalog_id' IS NOT NULL: 25 (synced markers)
```

## Sprint 4 ready

Sprint 4 per roadmap = "Storefront UX phần I".

**Prerequisites resolved Sprint 3:**
- Foundation re-audit complete (no regression, false positives identified)
- API contract documented (developers can reference)
- Product sync workflow operational

**Carry-over to Sprint 4:**
- Medusa subscriber for sync workflow (use mig 47 functions)
- Session validation full (defer P1.5-F1 re-classify)
- Multi-tenant locale resolution full (subdomain handled, Host detection pending)
- 55 storefront pages UX polish (Sprint 4 main goal)

## HARD RULES compliance Sprint 3 (all PASS)

| Rule | OK? |
|---|---|
| Rule 1 — File tracked commit cùng turn | ✅ |
| Rule 2 — Backup trước wipe | ✅ (mig 47 pre-apply schema dump) |
| Rule 3 — `giaodien` giữ nguyên | ✅ |
| Rule 4 — Không đụng main/develop | ✅ (cms only) |
| Rule 5 — Git sync trước audit | ✅ (Day 1 + 2 + Phase 3 Bước 0) |
| Rule 6 — Schema qua migration | ✅ (mig 47, no ad-hoc DDL) |
| Rule 7 — Multi-layer audit | ✅ (Day 2 7/7 findings ≥2 layers) |

## Sprint 4 prerequisites

- ✅ Sprint 3 closed
- ✅ Foundation re-audited
- ✅ API contract available
- ✅ Sync workflow available
- ✅ Push to origin/cms

Sprint 4 ready to start.
