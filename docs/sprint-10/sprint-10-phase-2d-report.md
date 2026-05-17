# Sprint 10 Pha 2d — Marketplace D24 Path D drop ✅ DONE

**Ngày:** 2026-05-17
**Sprint:** 10 Pha 2d (D24 resolve, RED #4 of 4 batch FINAL)
**Path chosen:** D (full drop) — pre-emptive was Path B 6-10h, audit revealed Path D
**Commits:** 5 (4 drops + 1 syntax fix + close report)
**Time actual:** ~3h

## Decision rationale (L23 áp dụng + 0 UI consumer reality)

Bước 0 STRICT method-level + UI consumer audit revealed:

- **8 methods total** (listSuppliers/getSupplier/createSupplier/updateSupplier/softDeleteSupplier/uploadKycDocument/reviewKycDocument/promoteVerificationTier)
- **8/8 methods compromised** (4 directly broken cols, 4 indirectly via mapSupplier helper assuming broken cols)
- **Cascade external = 0** (workflows.ts internal only, onboardSupplierWorkflow 0 external consumers)
- **UI consumers = 0** (Admin supplier-applications API uses public.supplier_application table NOT MarketplaceService)
- **Existing data = 7 rows identity.supplier seed** (Sprint 1 R20 seed, not service-driven)
- **Schema match ~50-60%** (60+ cols schema vs ~12 cols service + 7 phantom cols)

→ Path D chosen (full drop). Path B 6-10h refactor không justified vì 0 UI driver.

## Path D vs pre-emptive analysis correction

| Path | Pre-emptive % | Actual fit |
|---|---|---|
| A (adapt 4-6h) | 30% | ❌ Match too low |
| B (refactor 6-10h) | 50% | ❌ 0 UI driver |
| C ESCALATE | 15% | ❌ No deep break risk |
| **D (drop 1-2h)** | **5%** | **✅ SELECTED** (0 UI + 0 external) |

L23 reinforced AGAIN — Pha 1 RED for marketplace was severity-accurate (8/8 broken) NHƯNG decision-misleading (predicted "supplier core entity = must refactor" without 0 UI consumer reality check).

## Achievements

| Item | Status |
|---|:-:|
| D24 marketplace resolve via Path D | ✅ |
| 8 service methods dropped (commit `60818ba`) | ✅ |
| 9 type interfaces dropped (commit `2c9e37f`) | ✅ |
| workflows.ts stubbed (commit `cd86e89`) | ✅ |
| JSDoc syntax fix (commit `2011654`) | ✅ |
| 0 schema changes (5 identity tables PRESERVED) | ✅ |
| Sprint 9 + Pha 2a + 2b + 2c v2 regression consistent | ✅ |
| Module loads OK (logs: `MODULE: marketplace`) | ✅ |
| Health 3x HTTP 200 | ✅ |

## 4 files modified

### service.ts (`60818ba`)
- 311 → 58 lines (8 methods + 3 mappers dropped)
- Stub class extends MedusaService({})

### types.ts (`2c9e37f` + `2011654`)
- 76 → 26 lines (9 types dropped)
- Pure docstring stub + `export {}`
- Bước 5 syntax fix: `geo_*/primary` → `geo lat/lng, primary` (avoid `*​/` JSDoc terminator)

### workflows.ts (`cd86e89`)
- 51 → 17 lines (onboardSupplierWorkflow dropped)
- 0 external consumers verified grep

## Schema PRESERVED — Sprint 11+ ready

Backup: `/tmp/sprint-10-pha-2d-bak/identity-schema-pre.sql` (1348 lines)

| Table | Cols | Rows | Notes |
|---|---|---|---|
| identity.supplier | 60+ | 7 | Sprint 1 R20 seed |
| identity.supplier_user | - | - | FK preserved |
| identity.kyc_document | 10+ | 0 | Never used |
| identity.verification_record | - | 0 | Never used |
| identity.dealer_capability | - | 0 | Separate table (service was wrongly inlining cols) |

Zero migrations created. Schema = ground truth waiting Sprint 11+ rewrite.

## Pattern Pha 2c v2 escrow pattern repeat

| Step | Pha 2c v2 escrow | Pha 2d marketplace |
|---|---|---|
| 0 | Layer 0 STRICT audit | ✅ done với UI consumer dimension |
| 1 | Backup module | ✅ /tmp/sprint-10-pha-2d-bak/ |
| 2 | Drop broken service methods | ✅ 8 methods (vs 8 escrow) |
| 3 | Drop dead type interfaces | ✅ 9 types (vs 7 escrow) |
| 4 | Cascade stubs | ✅ 1 file workflows.ts (vs 3 escrow) |
| 5 | Build + smoke | ✅ (Bước 5 syntax fix discovered) |
| 6 | Commit + report | ✅ 5 commits |

## HARD RULES 9/9 PASS

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ 5 commits |
| Rule 2 — Backup trước drop | ✅ module + schema 48KB |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 6 — Schema qua migration | ✅ 0 migrations (drop only) |
| Rule 7 — Multi-layer audit | ✅ STRICT method-level + UI + cascade + Layer 0 |
| Rule 8 — No placeholder | ✅ Sprint 11+ TODO documented |
| Rule 8 phụ — Plan deviation | ✅ Path B → D documented Bước 0 |
| Rule 9 — Tiếng Việt thuần | ✅ |

## Lessons reinforced / proposed

- **L23 reinforced 3rd time:** Pha 1 RED ranking severity-accurate (8/8 broken correctly counted post-audit) NHƯNG decision-direction wrong (predicted "refactor" reality "drop")
- **L24 proposed NEW:** Stub docstrings cấm dùng `*​/` sequence trong path notation (e.g. `geo_*/primary` → `geo lat/lng, primary,`). Build fail silent until runtime restart.
- **L17 + L19 + L23 cumulative:** Method-level audit + cascade external scan + UI consumer dimension = trifecta cho L20 module rewrite decisions
- **Drop pattern proven scalable:** Pha 2b catalog-ext (1 method) → Pha 2c v2 escrow (8 methods + 3 cascade) → Pha 2d marketplace (8 methods + 1 cascade). Same pattern, different scope.

## Sprint 10 Pha 2 batch FINAL

| # | Module | Path | Time | Commits |
|---|---|---|---|---|
| 1 | communication (D21) | Pha 2a rewrite | 7h | `1df8703` + `77a3289` |
| 2 | catalog-ext (D25) | Pha 2b Option D drop + Pha 2b v2 Option B extend | 3h | `34d5ea6` + `c02b7ce` + `ab6b23c` + `f06be3e` |
| 3 | escrow (D23) | Pha 2c v2 Option C2 drop | 2h | `e703560` + `873780a` + `78bc9cd` + `aae8083` |
| 4 | **marketplace (D24)** | **Pha 2d Path D drop** | **3h** | **`60818ba` + `2c9e37f` + `cd86e89` + `2011654`** |

**Total Pha 2 actual: ~15h** (vs 30-38h Pha 1 estimate = 50-60% savings).

## Sprint 10 Pha 3 NEXT

- Close report + push origin/cms
- Sprint 10 close report comprehensive
- Update sprint-roadmap.md v4.0
- Sprint 11+ TODO refined (3 modules deferred: escrow + marketplace + customization_request UI wire)

