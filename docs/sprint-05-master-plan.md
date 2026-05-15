# Sprint 5 — Master plan

**Date:** 2026-05-15
**Status:** Phase 1 (audit) complete; Phase 2-3 pending coordinator approval
**Theme:** Storefront UX Phase II — Sprint 4 carry-over + Buyer-center polish

## 1. Sprint 5 mission

Hoàn thiện UX layer Sprint 4 chưa đóng (loading/empty/error states + hex hotspots) đồng thời chuẩn hóa 12 buyer-center pages về cùng UX baseline. **Không thực hiện** data wire-up, **không build** cart/checkout/account — defer Sprint 6.

## 2. Scope (Sprint 5)

### In-scope (23 pages)
- **11 Sprint 4 carry-over pages:** Home, Category list+sub, Products, Search, Product detail, Reviews, Visual /by-image, Visual /visual, Supplier detail, Suppliers list
- **12 buyer-center pages:** Dashboard, Audited reports, Browsing history, Contact, Favorites, Meet suppliers, New user guide, Orders, Post RFQ, Product directory, Secured trading, Supplier discover

### Out-of-scope (deferred)
- `/cart`, `/checkout`, `/account`, `/order/[id]` (Sprint 6 build-out)
- Form submit handlers (Sprint 6 wire-up)
- Backend API integration for buyer-center mockups (Sprint 7)
- Auth middleware audit (Sprint 6 hardening)
- Info pages `/info/*` hex hotspots (potentially Sprint 5 P1 if scope allows)

## 3. Phase breakdown

### Phase 1 — Audit (DONE ✅)
- Bước 0: Git sync + Sprint 4 baseline verify ✅
- Bước 1: Sprint 4 carry-over UX audit ✅ (11 pages, 11/11 missing loading, 5/11 missing empty)
- Bước 2: Buyer-center inventory ✅ (12 pages all server, all missing loading+empty, 0 data fetch)
- Bước 3: Compile 3 docs ✅ (this doc + 2 detail docs)

**Output:** 3 audit docs committed to `cms` branch (not pushed until Phase 3).

### Phase 2 — UX polish execution (PENDING)

**Goal:** áp dụng Next.js 16 conventions + empty/loading states cho 23 pages.

- Bước 2.1 — `loading.tsx` coverage (Sprint 4 scope: 11 segments)
- Bước 2.2 — `loading.tsx` coverage (Buyer-center: 12 segments)
- Bước 2.3 — Empty state component + 5 page edits (Sprint 4 missing)
- Bước 2.4 — Empty state áp dụng 12 buyer-center pages (mockup data emptiness)
- Bước 2.5 — Mobile responsive fix Visual `/visual` (4 → 10+ hits)
- Bước 2.6 — Buyer-center mobile pass (12 pages → ≥10 hits avg)
- Bước 2.7 — Hex hotspot cleanup `/info/*` (78 hex → 0, optional P1)
- Bước 2.8 — Root `not-found.tsx` + `error.tsx`

**Mỗi Bước:** 1 commit + 1 report `.md` tại `C:\install-medusa-dev\CMS\P5.2-buoc-<X>.md`.

### Phase 3 — Smoke test + Sprint 5 close (PENDING)

- Bước 3.1 — Local build (`bun run build`)
- Bước 3.2 — Smoke test 23 pages HTTP 200 (script `test_smoke_23.py`)
- Bước 3.3 — Final audit metrics (hex count, loading.tsx count, empty state coverage)
- Bước 3.4 — `docs/sprint-05-report.md` final + push origin/cms

## 4. Sprint 5 target metrics

| Metric | Sprint 4 close | Sprint 5 baseline (Phase 1) | Sprint 5 target (Phase 3) |
|--------|---------------:|----------------------------:|--------------------------:|
| Hex literals total (src/) | 178 | 196 | **< 120** |
| Hex in Sprint 4 scope | 30 | 20 | **0** |
| Hex in buyer-center | 0 | 0 | 0 (maintain) |
| `loading.tsx` files | 0 | 0 | **≥ 23** |
| `not-found.tsx` files | 0 | 0 | **≥ 1** |
| `error.tsx` files | 0 | 0 | **≥ 1** |
| Pages missing empty state (23 scope) | n/a | 17 | **0** |
| Buyer flow PASS count (8 steps) | 3/8 | 3/8 | 3/8 (unchanged — defer Sprint 6) |
| Smoke test pass | n/a | n/a | **23/23 HTTP 200** |

## 5. Critical findings → Sprint 6 backlog

1. **`/cart` MISSING** — block cart-based purchase flow.
2. **`/checkout` MISSING** — block payment.
3. **`/account` MISSING** — block buyer self-service.
4. **`/order/[id]` MISSING** — block order tracking.
5. **Form submit chưa wire** — Contact + Post RFQ form là decoration.
6. **Auth middleware** chưa audit — `/buyer-center` có thể không gated.
7. **12 buyer-center pages = hardcoded mockup** — Sprint 7 wire-up scope.

## 6. Risks

- **R1: scope creep** — Bước 2.7 (`/info/*` hex) tempting nhưng không trong 23-page scope. Recommend defer.
- **R2: loading.tsx pattern mismatch** — nếu mỗi segment skeleton tự design, dễ inconsistent. Đề xuất tạo `<PageSkeleton variant="list|detail|form">` reusable.
- **R3: empty state copy localization** — 3 locale (vi/en/cn). Sprint 5 chỉ vi? hay 3?
- **R4: buyer-center server components không có Suspense boundary** — `loading.tsx` vẫn áp dụng được (route segment level) nhưng UX impact thấp khi data đang là mockup.

## 7. Rule compliance checkpoint

- **Rule 1 (no silent fix):** mọi Bước có report file + commit message rõ scope
- **Rule 2 (multi-layer audit):** Phase 1 audit = layer 1 (file grep) + layer 2 (Python regex scoring)
- **Rule 7 (token discipline):** Sprint 5 target = 0 new hex, cleanup hotspots
- **Rule 8 (best-effort UX authority):** Sprint 5 polish dùng existing tokens + components, không thêm libs

## 8. Questions for coordinator (consolidated)

### Decisions blocking Phase 2 start

1. **EmptyState component:** generic vs bespoke per-page?
2. **Skeleton approach:** custom Tailwind animate-pulse hay thư viện?
3. **Info pages `/info/*`:** include trong Sprint 5 (78 hex) hay defer Sprint 6?
4. **Reviews page:** confirm trong Sprint 4 scope (not in Sprint 4 closed report explicit list)?
5. **Buyer-center scope = 11 hay 12 pages?** (dashboard root included?)
6. **Sprint 6 priority:** Cart/Checkout build hay Form submit wire-up trước?
7. **Form submit handlers (Contact, Post RFQ):** Sprint 5 hay Sprint 6?
8. **Middleware audit:** Phase 1 extend hay Sprint 6?
9. **Locale scope cho empty state copy:** vi only hay 3 locales?
10. **`<PageSkeleton variant>` reusable component:** approve creation?

### Detail docs

- [sprint-05-sprint-4-carryover-plan.md](sprint-05-sprint-4-carryover-plan.md)
- [sprint-05-buyer-center-inventory.md](sprint-05-buyer-center-inventory.md)

## 9. Next step

**Pause for coordinator review.** Sau approve → Sprint 5 Phase 2 Bước 2.1 (Sprint 4 scope `loading.tsx` x 11 segments).
