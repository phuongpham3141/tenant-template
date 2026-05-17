# Sprint 10 — Maintenance Phase ✅ ĐÓNG

**Ngày:** 2026-05-17
**Sprint:** 10 (L20 audit + 4 RED rewrite batch)
**Branch:** cms
**Status:** ✅ ĐÓNG CLEAN

## Tóm tắt Sprint 10

Sprint 10 = **maintenance phase trước production deploy**. Resolve architectural debt từ Sprint 1 R20 era (25/26 modules raw-SQL pattern).

## 3 phases delivered (Pha 1, Pha 2, Pha 3)

| Pha | Status | Commits | Time |
|---|:-:|:-:|---|
| Pha 1 (L20 audit discovery) | ✅ | 1 | 2h |
| Pha 2a (communication D21) | ✅ | 2 | 7h |
| Pha 2b + 2b v2 (catalog-ext D25) | ✅ | 4 | 3h |
| Pha 2c v2 (escrow D23-EXPANDED) | ✅ | 4 | 2h |
| Pha 2d (marketplace D24) | ✅ | 5 | 3h |
| Pha 3 (close + push) | ✅ | 2 | 1h |
| **TOTAL** | **✅** | **18** | **18h** |

**Vs Pha 1 estimate 30-38h = ~50% time savings.**

## 4 RED modules resolved

| # | Module | Path | Decision |
|---|---|---|---|
| 1 | communication (D21) | Pha 2a rewrite | 7 CRUD methods raw-SQL |
| 2 | catalog-ext (D25) | Pha 2b Option D + 2b v2 extend | Drop dead method + customization_request integrate |
| 3 | escrow (D23-EXPANDED) | Pha 2c v2 Option C2 drop | 8 methods + 7 types + 3 cascade stubs |
| 4 | marketplace (D24) | Pha 2d Path D drop | 8 methods + 9 types + workflows stub |

## Plan deviations Sprint 10 (5)

| ID | Issue | Resolution |
|---|---|---|
| D23 | escrow service ↔ schema column mismatch | Option C2 drop |
| D23-EXPANDED | escrow banking-vs-POC architectural | Option C2 drop confirmed |
| D24 | marketplace service ↔ schema mismatch | Path D drop |
| D25 | catalog-ext table missing | Option D drop + 2b v2 extend |
| D26 | communication conversation_message 8 col mismatches | Pha 2a Bước 0 L19 STRICT caught |

## Lessons codified Sprint 10 (4 NEW: L22-L25)

- **L22** Build-on-top of pragmatic drop > undo+redo (Pha 2b → 2b v2)
- **L23** RED schema-name ranking = noise filter (3 directions confirmed):
  - OVERSTATED: catalog-ext (1/6 broken)
  - UNDERSTATED: escrow (8/8 broken)
  - 3rd direction marketplace (accurate severity, wrong path — Path B → Path D vì 0 UI)
- **L24** SWC parser `*/` JSDoc terminator silent fail
- **L25** Cross-module dependency check critical Pha 1 audit

**Cumulative L1-L25 = 25 lessons.**

## Sprint 10 metrics

| Metric | Đầu Sprint 10 | Cuối Sprint 10 |
|---|---|---|
| Sprint 1 R20 RED modules | 4 (predicted) | 0 (all resolved) |
| Migrations success | 56 | 58 (+2: mig 51 communication seq + mig 52 customization_request seq) |
| Custom modules functional | 22 | 24 (communication + customization_request extend) |
| Custom modules stubbed (defer Sprint 11+) | 0 | 2 (escrow + marketplace) |
| Lessons codified | 21 | 25 (+4) |
| Plan deviations cumulative | 12 | 17 (+5) |
| Project completion | ~85% | ~89% |

## Sprint 10 fundamental insights

**Schema-vs-service architectural debt Sprint 1 R20 = 3 patterns:**

1. **Method-broken pattern** (communication, escrow, marketplace):
   - Service queries cols KHÔNG có trong schema
   - 0 rows existing (broken pattern never fired)
   - Solution: rewrite (Pha 2a) OR drop (Pha 2c v2, 2d)

2. **Table-missing pattern** (catalog-ext):
   - Service queries table KHÔNG tồn tại
   - Semantic redirect needed (product_customization_option → customization_request)
   - Solution: drop dead + integrate semantic-correct table

3. **Banking-vs-POC pattern** (escrow):
   - Schema = production-grade banking system (60+ cols)
   - Service = simple POC
   - Solution: drop, defer Sprint 11+ when banking integration drives

## Smoke results Pha 3

```
=== Health 5x ===
HTTP 200 × 5 ✓

=== Module load (custom Sprint 10 deliverables) ===
MODULE: communication (rewrite, Pha 2a) ✓
MODULE: catalog_ext (extend, Pha 2b v2) ✓
MODULE: escrow (stub, Pha 2c v2) ✓
MODULE: marketplace (stub, Pha 2d) ✓
MODULE: rfq (Pha 1d-a v2 Sprint 9B) ✓
MODULE: supplier_application (Sprint 9A) ✓

=== Storefront routes ===
/ → 200
/login → 200
/register/buyer → 200
/info/contact → 200
/forgot-password → 200
/buyer-center → 307 (auth redirect)
/buyer-center/rfqs → 307 (auth redirect)
/buyer-center/profile → 307 (auth redirect)

=== Admin routes ===
/admin/rfqs → 401 (auth required)
/admin/supplier-applications → 401 (auth required)

=== DB state ===
58 migrations success (last mig 52: catalog_customization_request_seq)
public.supplier_application: 25 rows (Sprint 9A Pha 2a)
rfq.rfq: 2 rows
identity.supplier: 7 rows (Sprint 1 R20 seed)
```

## HARD RULES Sprint 10 compliance 9/9

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ 18 commits atomic |
| Rule 2 — Backup preserved | ✅ /tmp/sprint-10-pha-*-bak/ all 4 module phases |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ all phases |
| Rule 6 — Schema qua migration | ✅ 2 migrations (51 communication seq + 52 customization seq) |
| Rule 7 — Multi-layer audit STRICT | ✅ all phases với method + cascade + UI dimension |
| Rule 8 — Best-effort no placeholder | ✅ Sprint 11+ TODO documented per phase |
| Rule 8 phụ — Plan deviation handling | ✅ 5 deviations + 4 lessons codified |
| Rule 9 — Tiếng Việt thuần | ✅ |

## Sprint 11+ priorities (9 items)

1. **20 TBD modules column-level audit + UI consumer mapping (L25)** — 50-80h
2. **Pha 1d-b** quote workflow + SDK + cascade — 4-6h
3. **D22 Mig 49 fill** sau staging load test — 4-6h
4. **Escrow rewrite** khi payment provider integration drives — 12-18h
5. **Marketplace rewrite** khi seller-center UI flow drives — 12-16h
6. **customization_request UI wire** (Pha 2b v2 enabled) — 6-10h
7. **Proxmox staging deploy 4 VM** — 8-12h
8. **Sprint 4+5 UX** /account + /order/[id] — 10-15h
9. **Production rollout customer #1** (sau 1-8 complete)

## References

- Sprint 10 Pha reports: `docs/sprint-10/sprint-10-phase-{1,2a,2b,2b-v2,2c-v2,2d}-report.md`
- CMS root summaries: `CMS/P10-PHA{1,2A,2B,2B-v2,2C-ESCALATE-D23-EXPANDED,2C-v2,2D}-*.md`
- Lessons codified: `CONVENTIONS.md` (L22-L25)
- Roadmap: `CMS/sprint-roadmap.md` (v3.9)
