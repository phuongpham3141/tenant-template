# Sprint 4 — Design Tokens Audit (Phase 1)

**Date:** 2026-05-15
**Sprint:** 4 Phase 1
**Methodology:** Layer 1 (filesystem inventory) + Layer 1-detail (grep hex/style usage)

## Tailwind setup

**Config files:**
- ❌ `tailwind.config.*` — KHÔNG tồn tại (Tailwind v4 dùng `@theme` trong CSS thay vì JS config)
- ✅ `postcss.config.mjs` — PostCSS pipeline

**Stack confirmed:** Tailwind CSS v4 (CSS-first config).

## Design tokens (`src/app/globals.css` — `@theme` block)

```css
@theme {
  --color-brand: #005F6B;
  --color-brand-light: #008899;
  --color-brand-dark: #003A42;
  --color-accent: #E85D4E;
  --color-gold: #F4A261;
  --color-ink: #2A3439;
  --color-mute: #6B7880;
  --color-mute2: #9AA5AB;
  --color-line: #DDE3E5;
  --color-bg: #F6F4EF;
  --color-paper: #FFFFFF;
  --color-success: #2A9D8F;

  --font-sans: var(--font-inter), Arial, sans-serif;
}
```

**12 color tokens + 1 font token defined.** Tailwind v4 auto-generates utilities: `bg-brand`, `text-ink`, etc.

globals.css total: **452 lines** (includes custom CSS cho mega-menu, cn-flag, line-clamp, etc.)

## ❌ ANTI-PATTERN: 321 hex literals (NOT using tokens)

```
Top 20 hex literals by usage count:
  37 #F5F5F5    ← not in theme (light gray) — should be neutral utility
  35 #005F6B    ← = --color-brand BUT hardcoded! should be class="text-brand"
  29 #A21CAF    ← purple, not in theme (livestream?)
  27 #FAFBFC    ← not in theme (light bg variant)
  24 #E8943A    ← orange close to --color-gold (#F4A261) — INCONSISTENT
  17 #003A42    ← = --color-brand-dark hardcoded!
  16 #F5F7FA    ← not in theme
  11 #002557    ← not in theme (navy)
  11 #001A3F    ← not in theme (deep navy)
   8 #B81827    ← not in theme (red — Chinese motif?)
   8 #9C6A1F    ← not in theme (brown)
   7 #0E7490    ← cyan-700, not in theme
   7 #066875    ← teal variant
   7 #005f6b    ← lowercase duplicate of #005F6B
   6 #FCFBF8    ← cream variant of --color-bg #F6F4EF
   6 #7C2D12    ← brown-900
   6 #16A34A    ← green-600 (different from --color-success #2A9D8F)
   5 #DC2626    ← red-600
   4 #E85D4E    ← = --color-accent hardcoded!
   4 #E0E5EC    ← not in theme
```

**Total hex literal usages: 321** across `src/components/` + `src/app/`.

### Severity breakdown

| Issue | Count | Sprint 4 action |
|---|---|---|
| Hardcoded values matching existing tokens | ~75 (#005F6B + #003A42 + #E85D4E + lowercase dups) | **Refactor → class utilities** |
| Hardcoded values close to tokens (inconsistent) | ~28 (#E8943A vs #F4A261, #FCFBF8 vs #F6F4EF) | **Decide: add token OR use existing** |
| Hardcoded new colors (not in theme) | ~218 (purple, navy, red, brown, green, etc.) | **Audit: which are valid additions vs anti-pattern** |

## ❌ ANTI-PATTERN: 37 files with inline `style={{...}}`

```
src/components/products/filters-sidebar.tsx
src/components/livestream/AiChatBox.tsx
src/components/home/hero-slider.tsx
src/components/home/sourcing-solutions.tsx
src/components/home/footer.tsx
src/components/home/banner-section.tsx
src/components/home/zones.tsx
src/components/home/factories.tsx
src/components/home/product-section.tsx
src/components/home/trade-shows-section.tsx
(+27 more)
```

Inline styles bypass Tailwind utility generation + className composition. Anti-pattern for:
- Performance (no atomic CSS optimization)
- Maintainability (scattered styles)
- Dark mode support (impossible với inline)
- Theme overrides (can't customize)

## Custom CSS classes (non-Tailwind)

globals.css line 80+ chứa:
- `.cn-flag` (China flag icon) — could be component
- `.mm-wrap`, `.mm-panel`, `.mm-cat`, `.mm-l1`, `.mm-l2` — mega-menu pattern (lines 60-100+)
- `.line-clamp-2` (now native Tailwind utility)

→ globals.css 452 lines = significant custom CSS. Audit Phase 2 xem class nào còn cần.

## Typography

- Font: Inter (CSS var `--font-inter` from Next.js font loader)
- Body size: 13px (smaller than Tailwind default 16px — intentional density)
- Line-height: 1.5

→ No typography scale issues found.

## Sprint 4 design improvements

### Must-fix Phase 2 + 3 (P0/P1)

- [ ] **Refactor 75 hardcoded literals → class utilities** (matches existing tokens)
  - `#005F6B` → `text-brand` / `bg-brand`
  - `#003A42` → `text-brand-dark` / `bg-brand-dark`
  - `#E85D4E` → `text-accent` / `bg-accent`
- [ ] **Remove 37 inline `style={{}}`** trong scope pages (Phase 2 home/category, Phase 3 product/search)

### Should-fix Sprint 4

- [ ] **Audit 218 hardcoded new colors** → identify valid additions to `@theme` vs anti-pattern
  - Top candidates to add: `#F5F5F5` (37 uses), `#FAFBFC` (27 uses), `#F5F7FA` (16 uses)
  - All gray-scale variants — consider tailwind-native `gray-{50,100,200}` instead
- [ ] **Consolidate custom CSS classes** trong globals.css (mega-menu pattern audit)

### Wont-fix Sprint 4 (defer)

- [ ] Dark mode support — design system chưa thiết kế dark
- [ ] Animation/transition library standardization
- [ ] Icon system audit (src/components/icons/ chưa explored)

## Phase 2 priority order

1. **Refactor matches-existing-tokens first** (lowest risk, biggest impact) — 75 literals → utilities
2. **Inline styles in Phase 2 scope pages** (home + category cluster) — 5-10 files
3. **Audit new color candidates** — decide add to @theme vs eliminate
4. **Custom CSS class cleanup** — opportunistic during component refactor

## Phase 3 priority order

1. **Inline styles in Phase 3 scope** (product + search cluster)
2. **Product detail page (885 LOC)** — likely most hex literals + inline styles
3. **Search visual deduplication** (by-image vs visual)

## Sprint 5+ carry-over

- Buyer-center / Seller-center design refactor
- Specialized pages (livestream uses purple #A21CAF — Sprint 5 livestream UX)
- Component library extraction (currently ad-hoc per page)
- shadcn migration evaluation (no `src/components/ui/` exists)

## Metrics tracking

Baseline (Phase 1 start):
- 321 hex literal usages
- 37 files với inline styles
- 12 design tokens defined
- 0 unused tokens
- 452 lines globals.css

Target Phase 2 end:
- < 200 hex literal usages (-37%)
- < 30 inline style files (-19%)
- Phase 2 scope pages: 0 hex literals (100% utility-based)

Target Phase 3 end:
- < 100 hex literal usages (-69% total)
- < 20 inline style files (-46%)
- All P0/P1 scope pages: 0 hex literals

Sprint 5+ target: 0 hex literals system-wide (-100%).
