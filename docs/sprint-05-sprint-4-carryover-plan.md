# Sprint 5 — Sprint 4 carry-over plan

**Date:** 2026-05-15
**Sprint:** 05 **Phase:** 1 (audit only)
**Scope:** 11 Sprint 4 scope pages — UX polish carry-over từ Sprint 4 (Phase 3 mechanical-only đóng)

## 1. Audit baseline

Sprint 4 đóng với 178 hex literals — Sprint 5 recount = **196 hex** trong `storefront/src/` (bao gồm CSS files). Tăng nhẹ do scope grep mở rộng. Sprint 5 target: **< 120 hex** (-39%).

### 11 Sprint 4 scope pages — gap matrix

| # | Page | Files scanned | hex | inline | Loading | Empty | Mobile hits | CTA | Gaps |
|---|------|--------------:|----:|-------:|:-------:|:-----:|------------:|:---:|------|
| 1 | Home `/` | 14 | 1 | 8 | ❌ | ✅ | 190 | ✅ | loading |
| 2 | Category list `/category/[slug]` | 8 | 0 | 0 | ❌ | ❌ | 15 | ✅ | loading, empty |
| 3 | Category sub `/category/[slug]/[sub]` | 14 | 0 | 1 | ❌ | ❌ | 22 | ✅ | loading, empty |
| 4 | Products list `/products` | 3 | 0 | 0 | ❌ | ❌ | 5 | ✅ | loading, empty |
| 5 | Search `/search` | 3 | 0 | 0 | ❌ | ✅ | 6 | ✅ | loading |
| 6 | Product detail `/product/[id]` | 6 | 5 | 2 | ❌ | ✅ | 41 | ✅ | loading |
| 7 | Reviews `/product/[id]/reviews` | 5 | 0 | 1 | ❌ | ✅ | 9 | ✅ | loading |
| 8 | Visual `/search/by-image` | 2 | 0 | 0 | ❌ | ✅ | 9 | ✅ | loading |
| 9 | Visual `/search/visual` | 5 | 0 | 0 | ❌ | ❌ | 4 | ✅ | loading, empty, mobile |
| 10 | Supplier detail `/supplier/[slug]` | 5 | 14 | 8 | ❌ | ✅ | 26 | ✅ | loading |
| 11 | Suppliers list `/suppliers` | 3 | 0 | 0 | ❌ | ❌ | 5 | ✅ | loading, empty |

**Aggregate (Sprint 4 scope):** total hex = 20, inline = 20, **11/11 pages missing `loading.tsx`**, **5/11 missing empty state**.

### Next.js convention audit

- `loading.tsx` files: **0**
- `not-found.tsx` files: **0**
- `error.tsx` files: **0**

→ Toàn bộ app/ **không có** Next.js 16 segment convention file. Đây là carry-over critical.

### Top hex hotspots (out of Sprint 4 scope)

| File | hex count |
|------|----------:|
| `app/info/network/page.tsx` | 54 |
| `app/info/disputes/page.tsx` | 13 |
| `app/info/sample-orders/page.tsx` | 11 |
| `app/sitemap/page.tsx` | 10 |
| `app/sell-on-csr/page.tsx` | 10 |
| `components/icons/social.tsx` | 9 |
| `app/supplier/[slug]/Vr360Frame.tsx` | 8 |
| `lib/blog.ts` | 6 |
| `components/home/footer.tsx` | 6 |

→ **Info pages** chiếm > 80 hex. Sprint 5 nên target info pages cluster trước.

## 2. Sprint 4 carry-over execution plan (Sprint 5 Phase 2)

### Bước carryover-1 — Loading state coverage (P0)

Tạo `loading.tsx` cho mỗi segment thiếu (11 segments). Pattern: Server component returns `<Skeleton>` placeholder matching segment layout.

**Estimate:** 11 files × ~30 lines = 330 LOC.

### Bước carryover-2 — Empty state coverage (P0)

5 pages thiếu empty state: Category list, Category sub, Products list, Visual `/visual`, Suppliers list. Pattern: Sử dụng `<EmptyState>` component (nếu chưa có, tạo trong `components/ui/empty-state.tsx`).

**Estimate:** 1 new component + 5 page edits = 6 files.

### Bước carryover-3 — Mobile responsive fix (P1)

Visual `/search/visual` only 4 responsive hits. Refactor để có `sm:` / `md:` / `lg:` cho các section chính (upload area, results grid, filters).

**Estimate:** 1 file edit, ~20 LOC changes.

### Bước carryover-4 — Hex hotspot cleanup (P1)

Info pages (`/info/network`, `/info/disputes`, `/info/sample-orders`) — 78 hex tổng. Mechanical refactor sang tokens.

**Estimate:** 3 files, ~80 LOC changes.

### Bước carryover-5 — `not-found.tsx` + `error.tsx` (P2)

Root `app/not-found.tsx` và `app/error.tsx`. Pattern: brand-styled 404/500 với CTA về home.

**Estimate:** 2 files, ~40 LOC each.

## 3. Sprint 5 target sau Phase 2

| Metric | Sprint 4 close | Sprint 5 Phase 1 baseline | Sprint 5 Phase 2 target |
|--------|---------------:|--------------------------:|------------------------:|
| Hex literals (src/) | 178 | 196 | < 120 |
| Hex in Sprint 4 scope | 30 | 20 | 0 |
| `loading.tsx` files | 0 | 0 | ≥ 11 |
| `not-found.tsx` files | 0 | 0 | ≥ 1 |
| Pages missing empty state | 5 | 5 | 0 |
| Mobile hits Visual `/visual` | 4 | 4 | ≥ 10 |

## 4. Questions for coordinator

1. **EmptyState component scope:** tạo 1 generic `<EmptyState illustration title description action>` hay 5 bespoke variants per page?
2. **Skeleton library:** dùng custom `<Skeleton>` (Tailwind animate-pulse) hay dependency thư viện (e.g. `react-loading-skeleton`)?
3. **Info pages cluster:** Sprint 5 carry-over có nên include `/info/*` (78 hex) hay defer sang Sprint 6 (Public/Trust content)?
4. **Reviews page** đã list ở scope Sprint 4 dù không thấy trong roadmap Sprint 4 closed report — confirm include?

## 5. Next

Sau khi coordinator approve plan → Sprint 5 Phase 2 execute Bước carryover-1 → 5 tuần tự, mỗi Bước 1 commit + 1 report file.
