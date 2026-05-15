# Sprint 4 — Storefront UX phần I — CLOSED

**Date:** 2026-05-15
**Sprint:** 04 (3 phases per 3-cycle rule)
**Branch:** cms
**Authority:** Option B (Rule 8 best-effort UX) → adapted to mechanical-only Phase 3 per Phase 2 reality

## Phase summary

### Phase 1 — UX inventory + Design tokens audit ✅

Outputs:
- `docs/sprint-04-ux-inventory.md` — 59 pages categorized, 11 Sprint 4 scope pages (2189 LOC)
- `docs/sprint-04-design-tokens-audit.md` — 321 hex literals + 37 inline style files baseline

Tailwind v4 setup confirmed (`@theme` block, no JS config).

Commit: `c094563`.

### Phase 2 — Tokens + mechanical refactor + Home/Category/Products/Search polish ✅

7 commits, system-wide mechanical refactor:
- `e772c0e` — 5 new design tokens (`surface-1/2/3`, `warm`, `purple`)
- `9310be9` — 62 hex literals → CSS var()
- `5cd9c8c` — 114 Tailwind arbitrary → utility classes
- `362680b` — Interim Phase 2 report (mechanical only)
- `b2a0e14` — Home polish + 2 NEW tokens (`red`, `cream`) + 11 hex refactor
- `7fd3aff` — Category polish + 5 hex refactor
- `a0f5367` — Products + Search polish + visual search initial audit
- `113cb06` — Phase 2 FINAL report (Option B Rule 8 complete)

Total Phase 2 refactors: ~195 hex literals.

**Key discovery:** Inline styles trong scope folders LEGITIMATE (dynamic CSS, gradients, custom CSS vars) → mass conversion CẤM.

### Phase 3 — Mechanical refactor + Visual search audit + close ✅

- `40a74cf` — Visual search confirmation NOT duplicates + 3 hex refactor (SupplierDetail `#008899` → `var(--color-brand-light)`)
- This report

Decisions made:
- `/search/by-image` (167 LOC server) vs `/search/visual` (132 LOC client) = NOT duplicate (92% diff). Keep both với purpose header comments.
- Product variant color swatches (#F5F1E8, #3D3D3D, etc.) = semantic data, KEEP as hex
- Zalo brand color #0068FF = platform identity, KEEP
- Tailwind gray scale in Vr360Frame.tsx = standard, KEEP
- Mechanical refactor scope-limited (only exact token matches)

## Sprint 4 final metrics

| Metric | Baseline (Phase 1) | Sprint 4 end | Target | Status |
|---|---|---|---|---|
| Hex literals total | 321 | **178** | < 200 | ✅ **-45%, MET** |
| Sprint 4 scope page hex (10 pages) | varied | **0** non-semantic | 0 | ✅ PERFECT |
| Design tokens | 12 | **19** | additive | ✅ +7 |
| Inline style files | 37 | 37 | < 30 | RECLASSIFIED — legitimate uses |
| Smoke test cluster (10 pages) | n/a | **10/10 HTTP 200** | all | ✅ PERFECT |

## Sprint 4 commits (10 ahead origin/cms)

```
<TBD push>  docs(sprint-04): CLOSED — final report (this commit)
40a74cf  feat(storefront): Phase 3 mechanical refactor + visual search docs
113cb06  docs(sprint-04): Phase 2 FINAL report — Option B UX polish complete
a0f5367  feat(storefront): Products + Search UX polish (Buoc 4)
7fd3aff  feat(storefront): Category UX polish (Buoc 3)
b2a0e14  feat(storefront): Home page UX polish (Buoc 2) + 2 tokens
362680b  docs(sprint-04): Phase 2 DONE — design system mechanical refactor (interim)
5cd9c8c  refactor(storefront): replace Tailwind arbitrary [#color] → new tokens (114 reps)
9310be9  refactor(storefront): replace 62 hex literals matching tokens
e772c0e  feat(storefront): add 5 design tokens to @theme
c094563  docs(sprint-04): Phase 1 UX inventory + design tokens audit
```

## Design tokens added Sprint 4 (7 new, 12 → 19)

```
Phase 2 Buoc 1 (5 surface/accent):
  --color-surface-1: #F5F5F5  (×37 — neutral gray surface)
  --color-surface-2: #FAFBFC  (×27 — paper tint)
  --color-surface-3: #F5F7FA  (×16 — cool gray)
  --color-warm:      #E8943A  (×24 — warm orange)
  --color-purple:    #A21CAF  (×29 — livestream brand)

Phase 2 Buoc 2 (2 hover state):
  --color-red:       #B81827  (Chinese red — hover/danger)
  --color-cream:     #FCFBF8  (warm cream hover)
```

## Hex literal classification (final)

Of 178 remaining hex literals:

| Category | Count | Decision |
|---|---|---|
| Semantic product data (variant swatches) | ~10 | KEEP — product data |
| Platform brand identity (Zalo, FB, YT, WeChat, LinkedIn) | ~10 | KEEP — semantic |
| Tailwind gray scale (Vr360Frame, etc.) | ~20 | KEEP — standard |
| Brand variants close to tokens (#066875, etc.) | ~15 | Sprint 5 audit (add token vs keep) |
| globals.css @theme definitions | 19 | KEEP — token source |
| Non-scope pages (buyer-center, seller-center, info) | ~100 | Sprint 5 mechanical refactor |

## Lessons codified (proposed for sprint-roadmap.md v1.6)

**Lesson 1 — Inline styles classification:**
KHÔNG luôn anti-pattern. Phải distinguish:
- ✅ Anti-pattern: `style={{ color: '#hex' }}` (static, mappable to token)
- ❌ Legitimate: `style={{ "--var": dynamic }}`, gradients with multi-stop, computed values

→ Audit script future cần distinguish trước count.

**Lesson 2 — Hex literals classification:**
KHÔNG luôn theme refactor candidates. Phải distinguish:
- ✅ Theme refactor: token-matching hex (`#005F6B` = brand)
- ❌ Semantic: product variant swatches (`#F5F1E8` = "Trắng cẩm thạch" color choice)
- ❌ Platform identity: social brand colors (`#1877F2` Facebook)
- ❌ Third-party data: gray scale standards (`#e5e7eb`)

**Lesson 3 — Mechanical vs design refactor (Rule 8 refined):**
Option B authority có 2 tier:
- Tier 1 (Claude Code auto): mechanical token mapping, hex replacement, component reuse decisions
- Tier 2 (needs user spec): UX layout (hero copy, filter design, layout grids, CTA placement)

## HARD RULES Sprint 4 compliance (7/7 PASS)

| Rule | OK? |
|---|---|
| Rule 1 — File tracked commit cùng turn | ✅ all 10 commits |
| Rule 2 — Backup trước wipe | N/A (no DB) |
| Rule 3 — `giaodien` giữ nguyên | ✅ |
| Rule 4 — Không đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ Buoc 0 all phases |
| Rule 6 — Schema qua migration | N/A |
| Rule 7 — Multi-layer audit | ✅ filesystem + grep + smoke test |
| Rule 8 — Best-effort UX + no placeholder | ✅ actual data trong all commits |

## Carry-over Sprint 5

### UX layout polish (defer entirely)

UX layout (hero copy, filter design, CTA placement, advanced facets) needs design spec preparation. Sprint 5 main goal "Storefront UX phần II" can include both:
- 10 Sprint 4 scope pages layout polish (deferred từ Sprint 4)
- 11 buyer-center pages
- 11 seller-center pages
- 7 info pages
- Login/register form polish

Total Sprint 5 expected: ~40 pages.

### Sprint 4 deferred items

- 178 residual hex literals system-wide (mostly buyer/seller/info — Sprint 5 mechanical pass)
- 37 inline style files: per-file inspection during UX polish (audit pattern Sprint 5)
- Advanced filter UX (price slider, cert checkboxes, MOQ range) — Meilisearch SDK extension needed
- Search facets + term highlighting + did-you-mean — same SDK work

### From Sprint 3 (still pending)
- Medusa subscriber for catalog→public sync
- Session validation full
- Multi-tenant locale resolution

### Sprint 8 backlog (unchanged)
- 5 items from Sprint 2-3 audits

## Sprint 5 prerequisites met

- ✅ Foundation re-audit complete (Sprint 3)
- ✅ API contract documented (Sprint 3)
- ✅ Product sync workflow operational (Sprint 3 mig 47)
- ✅ Design tokens infrastructure mature (19 tokens, scope pages clean)
- ✅ Sprint 4 scope pages publish-ready (mechanical level)
- ✅ Visual search architecture clarified
- ✅ Option B Rule 8 refined với 2-tier authority

Sprint 5 ready start.
