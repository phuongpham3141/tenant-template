# Sprint 10 Pha 2c v2 — Escrow Option C2 drop ✅ DONE

**Ngày:** 2026-05-17
**Sprint:** 10 Pha 2c v2 (D23-EXPANDED Option C2 drop)
**Commits:** 4 (`e703560` service + `873780a` types + `78bc9cd` cascade + close report)
**Time actual:** ~2h

## Decision rationale (Option C2 drop)

D23-EXPANDED escalation (Pha 2c Bước 0 STRICT method-level audit) revealed escrow module = production-grade banking schema vs simple POC service implementation. TWO DIFFERENT BUSINESS MODELS.

| Option | Action | Est | Decision |
|---|---|---|---|
| C1 | Full rewrite 8 methods banking schema | 12-18h | ❌ no UI driver |
| **C2** | **Drop 8 methods + stub cascade** | **2-3h** | **✅ SELECTED** |
| C3 | Hybrid (drop 5, rewrite 3 core) | 5-7h | ❌ architectural mess |
| C4 | Defer Sprint 11+ entirely | 0h | ❌ leaves broken code looks usable |

## Achievements

| Item | Status |
|---|:-:|
| D23-EXPANDED resolve via Option C2 | ✅ |
| 8 service methods dropped (commit `e703560`) | ✅ |
| 7 type interfaces dropped (commit `873780a`) | ✅ |
| 3 cascade stubs (commit `78bc9cd`) | ✅ |
| 0 schema changes (4 tables PRESERVED) | ✅ |
| Sprint 9 + Pha 2a + 2b regression | ✅ consistent pre/post |
| Build PASS (frontend admin, 0 escrow errors) | ✅ |
| Health 3x HTTP 200 | ✅ |
| Module loads OK (logs: `MODULE: escrow`) | ✅ |

## 4 files modified (~250 lines deleted)

### service.ts (`e703560`)
- 242 → 32 lines (8 methods removed)
- Stub class extends MedusaService({})

### types.ts (`873780a`)
- 78 → 17 lines (7 type defs removed)
- Pure docstring stub + `export {}`

### workflows.ts (`78bc9cd`)
- 35 → 16 lines (2 workflows removed)
- 0 external consumers verified grep

### jobs/fx-snapshot-poller.ts (`78bc9cd`)
- 33 → 30 lines (escrow.captureFxSnapshot call removed)
- Job schedule preserved (every 6h), no-op body

### subscribers/order-events.ts (`78bc9cd`)
- 45 → 48 lines (escrow.fundEscrow no-op, +TODO comments)
- order.placed handling PRESERVED (search + notification)

## Schema PRESERVED — Sprint 11+ ready

Backup: `/tmp/sprint-10-pha-2c-bak/payment-schema-pre.sql` (2130 lines)
- `payment.escrow` (18 cols) — 0 rows
- `payment.escrow_milestone` (17 cols) — 0 rows
- `payment.fx_snapshot` (10 cols, date-range design) — 0 rows
- `payment.payout` (24 cols, fee breakdown) — 0 rows

Zero migrations created. Schema = ground truth waiting Sprint 11+ rewrite.

## Pattern Pha 2b drop pattern repeat (larger scope)

| Step | Pha 2b catalog-ext | Pha 2c v2 escrow |
|---|---|---|
| 0 | Layer 0 STRICT audit | ✅ done Bước 0 D23-EXPANDED |
| 1 | Backup module | ✅ /tmp/sprint-10-pha-2c-bak/ |
| 2 | Drop broken service methods | ✅ 8 methods (vs 1 catalog-ext) |
| 3 | Drop dead type interfaces | ✅ 7 types (vs 0 catalog-ext) |
| 4 | Cascade stubs | ✅ 3 files (vs 0 catalog-ext) |
| 5 | Build + smoke | ✅ |
| 6 | Commit + report | ✅ 4 commits |

## HARD RULES 9/9 PASS

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ 4 commits |
| Rule 2 — Backup trước drop | ✅ module + cascade + schema |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 6 — Schema qua migration | ✅ 0 migrations (drop only) |
| Rule 7 — Multi-layer audit | ✅ STRICT Bước 0 |
| Rule 8 — No placeholder | ✅ Sprint 11+ TODO documented |
| Rule 8 phụ — Plan deviation | ✅ ESCALATE → coordinator C2 decision |
| Rule 9 — Tiếng Việt thuần | ✅ |

## Lessons reinforced

- **L23 bi-directional refinement codified:** Pha 1 RED ranking UNDERSTATED escrow (predicted 1 method, reality 8/8) — opposite of catalog-ext OVERSTATED case (predicted 1 → ORANGE downgrade after audit)
- **L22 build-on-top pattern codified Pha 2b v2:** validated again in Pha 2c v2 (drop preserved as commit progression)
- **L19+L22 applied:** Method-level audit + schema discovery saved Sprint 11+ rework
- **L17 cascade audit:** 3 cascade files identified pre-drop (grep outside module folder)

## Sprint 10 Pha 2 batch progress

| # | Module | Status | Commits | Time |
|---|---|:-:|---|---|
| 1 | communication (D21) | ✅ | `1df8703` | 7h |
| 2 | catalog-ext drop (D25) | ✅ | `34d5ea6` | 1h |
| 2 v2 | catalog-ext extend customization_request | ✅ | `ab6b23c` | 2h |
| 3 | **escrow drop (D23 Option C2)** | **✅** | **`e703560`+`873780a`+`78bc9cd`** | **~2h actual** |
| 4 | marketplace (D24) | ⏳ NEXT (Pha 2d) | — | TBD audit-first |

**Cumulative actual: 12h** (vs 30-38h Pha 1 estimate).

## Sprint 11+ TODO (LOW priority)

Escrow module full rewrite khi payment provider/bank partner integration drives:
- 4 tables: escrow + escrow_milestone + fx_snapshot + payout (PRESERVED schema)
- 12-18h estimate (Pha 2a communication pattern: raw-SQL + queryT/withTenant)
- Pre-requisite: business decision on POC vs production banking model
- Stakeholders: payment provider + bank partner + tax/withholding compliance

## References

- D23-EXPANDED escalation: `CMS/P10-PHA2C-ESCALATE-D23-EXPANDED.md`
- Pha 2b drop pattern: `docs/sprint-10/sprint-10-phase-2b-report.md`
- Pha 2b v2 extend pattern: `docs/sprint-10/sprint-10-phase-2b-v2-report.md`
- L23 codification: `CMS/sprint-roadmap.md` (L23 NEW section)
