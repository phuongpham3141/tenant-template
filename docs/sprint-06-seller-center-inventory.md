# Sprint 6 — Seller-center inventory (11 pages)

**Date:** 2026-05-15
**Sprint:** 6 Phase 1 (audit only)
**Methodology:** 4-state audit (Sprint 5 lesson)

## Plan deviation flagged (Rule 8 amendment)

**Plan paste expected:** dashboard, orders, rfqs, messages, profile, analytics, pricing, livestream, inventory, settings (typical CRUD seller portal).

**Reality:** seller-center là **B2B sourcing services landing**, not CRUD portal. 11 pages thực tế là service offerings + dashboards:

1. `/seller-center` (root dashboard — likely overview)
2. `/seller-center/ai-assistant` (AI tool service)
3. `/seller-center/ai-livestream` (AI livestream tool — Tier 1-4 R22)
4. `/seller-center/domestic-cn` (domestic China market service)
5. `/seller-center/export-na` (export to North America service)
6. `/seller-center/gold-member` (premium membership)
7. `/seller-center/logistics` (logistics service)
8. `/seller-center/smart-expo` (smart expo participation)
9. `/seller-center/trade-ehome` (Trade Ehome service)
10. `/seller-center/trade-services` (trade services umbrella)
11. `/seller-center/trading-service` (trading service)

→ Sprint 6 Phase 2 scope = **polish 11 service landing pages**, NOT build CRUD seller dashboards. CRUD seller portal có thể defer Sprint 9 hoặc Sprint 7 wire-up.

## 4-state inventory

| # | Page | LOC | Client | Data fetch | Form | Hex | Inline | Notes |
|---|------|----:|:------:|:----------:|:----:|----:|-------:|-------|
| 1 | (root dashboard) | 127 | N | N | N | 4 | 0 | no-loading, no-empty |
| 2 | ai-assistant | 145 | N | N | N | 0 | 0 | no-loading, no-empty, mobile-thin(4) |
| 3 | ai-livestream | 107 | N | N | N | 0 | 1 | no-loading, mobile-thin(2) — **orphan: not in sidebar nav** |
| 4 | domestic-cn | 172 | N | N | N | 2 | 1 | no-loading |
| 5 | export-na | 150 | N | N | N | 2 | 1 | no-loading, no-empty |
| 6 | gold-member | 199 | N | N | N | 0 | 0 | no-loading, no-empty, mobile-thin(4) |
| 7 | logistics | 184 | N | N | N | 0 | 0 | no-loading, no-empty, mobile-thin(4) |
| 8 | smart-expo | 128 | N | N | N | 0 | 0 | no-loading, no-empty |
| 9 | trade-ehome | 123 | N | N | N | 0 | 0 | no-loading, no-empty |
| 10 | trade-services | 177 | N | N | N | 0 | 0 | no-loading, no-empty |
| 11 | trading-service | 140 | N | N | N | 0 | 0 | no-loading, no-empty, mobile-thin(3) |

**Aggregate:** total_hex = **8**, total_inline = 3, mockup-only = **11/11**, total LOC = **1652**.

## Sprint 5 pattern comparison

| Aspect | Sprint 5 buyer-center | Sprint 6 seller-center | Note |
|---|---|---|---|
| Pages | 12 | 11 | similar scale |
| Server components | 12/12 | 11/11 | identical pattern |
| Data fetching | 0/12 | 0/11 | identical (mockups) |
| Forms | 2/12 (Contact, Post RFQ) | 0/11 | seller-center has zero forms |
| Hex baseline | 0 | 8 | seller cleaner |
| Loading state coverage | 0/12 | 0/11 | identical gap |
| Empty state coverage | 0/12 | 9/11 missing | similar gap |

→ Seller-center mirror buyer-center pattern + 1 less form layer = **less wiring needed Sprint 6**.

## Seller sidebar nav audit

10 nav items in `src/components/seller/sidebar.tsx`. All 10 link to existing pages ✅.

**Issue:** `/seller-center/ai-livestream` page exists nhưng KHÔNG xuất hiện trong sidebar nav → orphan page (Phase 2 decision: add to nav OR remove page).

## SDK / actions imports

**0 imports** trong toàn bộ seller-center. Hoàn toàn static mockup (như buyer-center pre-Sprint 5).

## Pages categorization (Phase 2 planning)

| Page | Type | Priority | Action |
|---|---|---|---|
| (root dashboard) | DASHBOARD | P0 | Polish — welcome + 4 stats + service tiles |
| ai-assistant | LANDING | P0 | Polish — feature showcase + CTA |
| ai-livestream | LANDING | P1 | Polish + **add to sidebar** OR remove |
| domestic-cn | LANDING | P1 | Polish — market entry pitch |
| export-na | LANDING | P1 | Polish — export pitch + process |
| gold-member | PRICING | P0 | Polish — tier table + benefits + upgrade CTA |
| logistics | SERVICE | P1 | Polish — service description + how-it-works |
| smart-expo | SERVICE | P1 | Polish — expo info + signup CTA |
| trade-ehome | SERVICE | P2 | Polish — service overview |
| trade-services | UMBRELLA | P0 | Polish — service grid linking to others |
| trading-service | SERVICE | P2 | Polish — service description |

## Phase 2 implementation plan (preview)

### Bước 1: Mechanical refactor (Rule 8 Tier 1)
- 8 hex literals → tokens (root 4, domestic-cn 2, export-na 2)
- 3 inline styles → static refactor if applicable
- Reuse Sprint 5 infrastructure (EmptyState, Skeleton)

### Bước 2: UX layout polish per page type (Rule 8 Tier 2)
- Apply B2B seller-marketing conventions (service hero + benefit cards + how-it-works + CTA)
- Add `loading.tsx` cho seller-center segment
- Add `error.tsx` cho seller-center segment
- Mobile responsive pass on thin pages (ai-assistant, ai-livestream, gold-member, logistics, trading-service)

### Bước 3: Orphan ai-livestream resolution
- **Decision needed:** Add to sidebar OR remove page (escalate coordinator)
- Default Phase 2 action: ADD to sidebar (page exists with content; coordinator can re-decide)

## Acceptance criteria Phase 2

- ✅ 11 seller-center pages publish-ready (mechanical + UX polish)
- ✅ Reuse Sprint 5 infrastructure (no new components)
- ✅ 0 hex literals trong scope (8 → 0)
- ✅ Mobile responsive (mobile hits ≥ 10/page on thin pages)
- ✅ loading.tsx + error.tsx cho `/seller-center/` segment
- ✅ ai-livestream orphan resolved

## Questions for coordinator (Phase 2 prep)

1. **ai-livestream orphan:** add to sidebar (default) hay remove page?
2. **CRUD seller portal:** plan paste implied seller portal có orders/products/analytics/inventory. Current seller-center có NOT có. Defer build Sprint 9/Sprint 7 hay add Sprint 6 scope?
3. **Mobile responsive threshold:** target ≥10 hits/page giống Sprint 5? hay khác?
4. **gold-member pricing tiers:** static data có sẵn hay cần verify với coordinator?
