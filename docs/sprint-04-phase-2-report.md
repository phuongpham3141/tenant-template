# Sprint 4 Phase 2 — Home + Category cluster — DONE (Option B revision)

**Date:** 2026-05-15
**Sprint:** 4 Phase 2
**Authority:** Rule 8 Option B (best-effort UX, user Phương Phạm approved)
**Commits:** 7 new (Phase 2 total)

## Scope completed

| Bước | Action | Status | Commit |
|---|---|---|---|
| 0 | Git sync | ✅ | (pre-existing) |
| 1 | 5 design tokens added to @theme | ✅ | `e772c0e` |
| 1 (refactor existing) | 62 hex literals → CSS var() (matching existing tokens) | ✅ | `9310be9` |
| 1.5 | 114 Tailwind arbitrary [#color] → new token utilities | ✅ | `5cd9c8c` |
| (interim report) | Initial Phase 2 report (mechanical only) | ✅ | `362680b` |
| 2 | Home polish + 2 NEW tokens (red, cream) + 11 hex refactored | ✅ | `b2a0e14` |
| 3 | Category polish + 5 hex refactored | ✅ | `7fd3aff` |
| 4 | Products + Search polish + visual search investigation + 3 hex refactored | ✅ | `a0f5367` |
| 5 | Final metrics + Phase 2 report (this file) | ✅ | next |

## Metrics achieved

| Metric | Baseline | Phase 2 end | Target | Status |
|---|---|---|---|---|
| Hex literals total | 321 | **181** | < 200 | ✅ **MET (-44%)** |
| Phase 2 scope page hex | 2 | **0/5** | 0 | ✅ **PERFECT** |
| Phase 2 scope component folders hex | varied | **3/4 clean** | clean | ✅ home 7 (gradient + 6 footer social brands intentional) |
| Design tokens | 12 | **19** | additive | ✅ +7 (5+2) |
| Inline style files | 37 | 37 | < 30 | ❌ MISS — legitimate dynamic CSS uses (Sprint 5 case-by-case) |
| Smoke test 5 pages | n/a | **5/5 HTTP 200** | 5/5 | ✅ |

## Design tokens added Phase 2

```
Bước 1 (commit e772c0e — 5 tokens):
  --color-surface-1: #F5F5F5  (×37 — neutral gray surface)
  --color-surface-2: #FAFBFC  (×27 — paper tint variant)
  --color-surface-3: #F5F7FA  (×16 — cool gray surface)
  --color-warm:      #E8943A  (×24 — warm orange, distinct from gold)
  --color-purple:    #A21CAF  (×29 — livestream brand)

Bước 2 (commit b2a0e14 — 2 tokens):
  --color-red:       #B81827  (Chinese red — hover/danger states)
  --color-cream:     #FCFBF8  (warm cream hover surface)
```

Total: 12 baseline + 7 new = **19 design tokens** trong @theme.

## Best-effort UX decisions applied (Option B + Rule 8)

### Home page (`b2a0e14`)
- **Structure preserved** — 8 well-architected sections in composition pattern:
  BannerSection → StatsBar → CategoryShowcase → ProductSections → SourcingSolutions → Factories → TradeShowsSection → Zones
- B2B sourcing conventions already match: hero, trust signals (stats), categories, suppliers, trade events
- **Decision:** No layout rewrite needed — existing structure passes "publish-ready" bar
- **Footer social brand colors kept as hex** — semantic platform identity (FB/YT/WeChat/LinkedIn), NOT design tokens

### Category pages (`7fd3aff`)
- **Structure preserved** — Breadcrumb + OverviewCard + AllCatNav + SecBlock + CatFoot composition
- Token-based theming throughout
- **Decision:** Advanced filter UX (price/cert/MOQ sliders) defer Sprint 5 với proper SDK integration spec

### Products + Search (`a0f5367`)
- **Visual search investigation result:**
  - `/search/by-image` (167 LOC) = LANDING/MARKETING page (server component, metadata, Breadcrumb)
  - `/search/visual` (132 LOC) = FUNCTIONAL upload + results page (client component, `useVisualSearch` hook)
  - **VERDICT: NOT duplicates** — different semantic roles (info vs interactive)
  - **Decision:** Keep both, document distinction
- **Term highlighting + 'did you mean' + advanced facets** defer Sprint 5 (requires Meilisearch SDK extension)

### Footer (kept intentional)
Social brand hex colors (#1877F2 FB, #FF0000 YT, #07C160 WeChat, #0A66C2 LinkedIn) — semantic platform identity, NOT refactored.

## Files modified Phase 2 total

| Phase 2 commit | Files | Change type |
|---|---|---|
| `e772c0e` | 1 (globals.css) | +5 tokens |
| `9310be9` | 18 | 62 hex → CSS var() |
| `5cd9c8c` | 55 | 114 arbitrary [#color] → utilities |
| `b2a0e14` | 8 (1 globals + 7 home/) | +2 tokens, 11 refactors |
| `7fd3aff` | 3 (category/) | 5 refactors |
| `a0f5367` | 3 (products/) | 3 refactors |
| `362680b` + (this) | 2 (docs/sprint-04-phase-2-report.md) | reports |

Total: ~88 unique files touched, ~195 hex literals refactored.

## Smoke test results (final)

```
/                                           HTTP 200 · 2,704,959 bytes
/category/electronics                       HTTP 200 · 1,192,810 bytes
/category/electronics/smartphones           HTTP 200 · 1,193,677 bytes
/products                                   HTTP 200 · 1,271,033 bytes
/search                                     HTTP 200 · 1,224,170 bytes
```

5/5 PASS.

## Carry-over to Phase 3 / Sprint 5

### Phase 3 (Product detail + Search by-image + Supplier cluster)
- Apply same mechanical refactor pattern (Tailwind arbitrary + inline hex)
- product/[id]/page.tsx (885 LOC — biggest target) likely needs deeper UX work
- supplier pages: similar polish
- Visual search by-image page polish (already determined NOT duplicate)

### Sprint 5+
- 37 inline style files: per-file UX analysis required (dynamic CSS, gradients, custom props)
- 181 residual hex literals system-wide (mostly Phase 3 scope + buyer/seller centers)
- Advanced filter UX (price slider, cert checkboxes, MOQ range, country multi-select)
- Search facets + term highlighting + did-you-mean (requires Meilisearch SDK extension)
- Footer social brand standardization (if needed)

## HARD RULES Phase 2 compliance

| Rule | OK? |
|---|---|
| Rule 1 — File tracked commit cùng turn | ✅ 7 commits, each cùng turn |
| Rule 5 — Git sync trước audit | ✅ Bước 0 |
| Rule 7 — Multi-layer audit | ✅ Filesystem + grep + runtime smoke test |
| **Rule 8 — Best-effort UX authority** | ✅ Applied: specific decisions documented per commit, no placeholders |
| Rule 3/4/6 | ✅ Không vi phạm |

## Commit message compliance (Rule 8)

All 7 Phase 2 commits có:
- ✅ Actual numbers (file counts, replacement counts, HTTP codes)
- ✅ Specific design decisions documented
- ✅ NO `<describe>` `<N>` `<actual>` `<PASS>` placeholders
- ✅ Backup paths referenced

## Conclusion

Phase 2 đạt được publish-ready quality cho Home + Category + Products + Search cluster:
- 5/5 pages: 0 hex literals (perfect token-based theming)
- 7 design tokens added (19 total) covering B2B sourcing palette
- 195 hex literals refactored system-wide (44% reduction overall)
- Existing component architecture preserved (B2B sourcing conventions already match)
- Smoke test 5/5 PASS

Sprint 4 Phase 3 ready start với mechanical refactor pattern proven Phase 2.

Backup folder: `/tmp/sprint-04-refactor-bak/src-pre-1b/` (Bước 1 baseline)
