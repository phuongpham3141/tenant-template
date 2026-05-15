# Sprint 4 — UX Inventory (Phase 1)

**Date:** 2026-05-15
**Sprint:** 4 Phase 1
**Methodology:** Filesystem inventory + line counts + category grouping

## Page inventory summary

| Category | Count | Notes |
|---|---|---|
| Public pages (no auth) | 36 | Marketing + browse |
| Buyer-center pages | 12 | Auth-protected |
| Seller-center pages | 11 | Auth-protected |
| Account + checkout | 0 | Folders chưa tồn tại — defer Sprint 5+ |
| **Total** | **59** | Matches Sprint 3 API contract count |

## Sprint 4 scope (this sprint)

Per roadmap "Storefront UX phần I" = Home + Category + Product + Search.

| Page | Path | Lines | Priority |
|---|---|---|---|
| Home | `src/app/page.tsx` | 26 | P0 (smallest — likely composed of components) |
| Category list | `src/app/category/[slug]/page.tsx` | 83 | P0 |
| Category sub | `src/app/category/[slug]/[sub]/page.tsx` | 106 | P1 |
| Product detail | `src/app/product/[id]/page.tsx` | **885** | P0 (biggest — likely main work) |
| Product reviews | `src/app/product/[id]/reviews/page.tsx` | 253 | P2 |
| Products list | `src/app/products/page.tsx` | 83 | P0 |
| Search results | `src/app/search/page.tsx` | 113 | P0 |
| Visual search by-image | `src/app/search/by-image/page.tsx` | 167 | P1 |
| Visual search alt | `src/app/search/visual/page.tsx` | 132 | P2 (duplicate? defer audit) |
| Supplier detail | `src/app/supplier/[slug]/page.tsx` | 56 | P1 |
| Suppliers list | `src/app/suppliers/page.tsx` | 85 | P2 |

**Sprint 4 scope total:** 11 pages, **2189 LOC**.

⚠ Note: `search/by-image` (167) vs `search/visual` (132) — possibly duplicates. Phase 2 audit consolidation.

## Out of Sprint 4 scope (defer Sprint 5+)

- **Buyer-center** 12 pages → Sprint 5 Phase 1
- **Seller-center** 11 pages → Sprint 5 Phase 2
- **Info pages** 7 pages → Sprint 5 Phase 3
- **Login + register** 4 pages (login, register/buyer/dealer/factory) → Sprint 5 (UX polish only)
- **Specialized** — live/ai, trade-alert, trade-shows, zones, factory-tour, industry-channels, sell-on-csr, sitemap, app, buying-request, help, sell-on-avn → Sprint 5+

## Shared components inventory

### Top-level `src/components/`

| Folder | Files | Role |
|---|---|---|
| `home/` | 17 | hero-slider, navbar, footer, mega-carousel, banner-section, category-showcase, factories, product-section, sourcing-solutions, stats-bar, sticky-header, trade-shows-section, zones, top-strip, mobile-bottom-nav, mega-submenu |
| `category/` | 5 | all-cat-nav, breadcrumb, cat-foot, overview-card, sec-block |
| `search/` | 7 | SearchBox, RecentSearches, SuggestionItem, TrendingTerms, VisualSearchButton, VisualSearchModal, VisualSearchResults |
| `products/` | 10 | prod-card, filters-sidebar, faq, not-found-block, pagination, qty-stepper, sub-chips, sup-banner, title-tabs, trending |
| `livestream/` | 5 | AiChatBox, AiLivestreamPlayer, AiPersonaCard, AudioTrackSwitcher, TranscriptOverlay |
| `providers/` | 5 | Auth, Cart, Locale, Tenant + index (React Context) |
| `buyer/` | 1 | sidebar |
| `seller/` | 1 | sidebar |
| `icons/` | (TBD) | Icon library |
| (root) | 1 | lang-switcher.tsx |

**Total custom components:** ~52 files across 9 folders.

⚠ **KHÔNG có `src/components/ui/`** (no shadcn). All UI built custom — design tokens audit critical.

## Phase 2 + 3 planning

### Phase 2 — Home + Category cluster (~12h)

Pages (5):
- Home `/` (26 LOC) — main wiring
- Category list `/category/[slug]` (83 LOC)
- Category sub `/category/[slug]/[sub]` (106 LOC)
- Products list `/products` (83 LOC)
- Search results `/search` (113 LOC)

LOC subtotal: 411 lines.

Component focus:
- `home/*` 17 components (most likely target — hero, mega-carousel, sections)
- `category/*` 5 components
- `products/*` 10 components (filters, pagination, cards)

### Phase 3 — Product + Search + close (~10h)

Pages (6):
- Product detail `/product/[id]` (**885 LOC** — biggest)
- Product reviews `/product/[id]/reviews` (253 LOC)
- Visual search by-image `/search/by-image` (167 LOC)
- Visual search alt `/search/visual` (132 LOC — audit dup)
- Supplier detail `/supplier/[slug]` (56 LOC)
- Suppliers list `/suppliers` (85 LOC)

LOC subtotal: 1578 lines.

Component focus:
- `search/*` 7 components (SearchBox + VisualSearch*)
- `products/*` 10 reused

### Phase 3 close

- Sprint 4 wrap-up doc
- Regression test buyer flow (steps 1, 2, 5)
- Push origin/cms

## Acceptance criteria Sprint 4

- ✅ 10 P0/P1 pages publish-ready (defer P2 `product/reviews`, `search/visual`, `suppliers`)
- ✅ Design tokens consistent across scope (see Design Tokens Audit)
- ✅ Component reuse maximized
- ✅ Buyer flow steps 1 (Home), 2 (Middleware redirect), 5 (Browse products) reach "publish-ready" quality

## Carry-over Sprint 5

- Buyer-center 12 pages UX polish
- Seller-center 11 pages UX polish
- Info + login/register pages
- Specialized pages (live, trade-alert, etc.)
- Account + checkout pages CREATE (don't exist yet)
