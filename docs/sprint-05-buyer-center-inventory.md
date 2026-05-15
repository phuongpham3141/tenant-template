# Sprint 5 — Buyer-center inventory

**Date:** 2026-05-15
**Sprint:** 05 **Phase:** 1 (audit only)
**Scope:** 12 buyer-center pages + 8-step buyer flow audit

## 1. Buyer-center pages — 12 (plan stated 11; thực tế +1 dashboard root)

| # | Page | Path | Lines | Type | Form | Data fetch | Notes |
|---|------|------|------:|:----:|:----:|:----------:|-------|
| 1 | Dashboard | `/buyer-center` | 116 | server | — | — | static landing |
| 2 | Audited reports | `/buyer-center/audited-reports` | 180 | server | — | — | 1 inline style |
| 3 | Browsing history | `/buyer-center/browsing-history` | 127 | server | — | — | static mockup |
| 4 | Contact | `/buyer-center/contact` | 164 | server | ✅ | — | form mockup, no submit handler |
| 5 | Favorites | `/buyer-center/favorites` | 74 | server | — | — | static, shortest page |
| 6 | Meet suppliers | `/buyer-center/meet-suppliers` | 128 | server | — | — | static showcase |
| 7 | New user guide | `/buyer-center/new-user-guide` | 154 | server | — | — | onboarding content |
| 8 | Orders | `/buyer-center/orders` | 88 | server | — | — | static order list |
| 9 | Post RFQ | `/buyer-center/post-rfq` | 148 | server | ✅ | — | form mockup, no submit handler |
| 10 | Product directory | `/buyer-center/product-directory` | 141 | server | — | — | static browse |
| 11 | Secured trading | `/buyer-center/secured-trading` | 165 | server | — | — | trust content |
| 12 | Supplier discover | `/buyer-center/supplier-discover` | 121 | server | — | — | static |

**Aggregate:**
- 12/12 pages = **server components** (zero `"use client"`)
- 12/12 = **missing loading state**
- 12/12 = **missing empty state**
- 12/12 = **zero data fetching** (all hardcoded mockups)
- 2/12 have forms but **0 submit handlers** (Contact, Post RFQ)
- 0 hex literals, 1 inline style (clean from Sprint 4)

## 2. Buyer flow — 8-step coverage audit

Standard B2B marketplace buyer flow:

| # | Step | Required page | Status | Path | Notes |
|---|------|---------------|:------:|------|-------|
| 1 | Register | `/register/buyer` | ✅ | exists (346 lines) | mockup likely |
| 2 | Login | `/login` | ✅ | exists (216 lines) | — |
| 3 | Browse/search | `/products`, `/search`, `/category/*` | ✅ | Sprint 4 scope | static lists |
| 4 | View product | `/product/[id]` | ✅ | Sprint 4 scope | — |
| 5 | Add to cart **OR** Post RFQ | `/cart` / `/buyer-center/post-rfq` | ⚠️ | RFQ ✅, **cart MISSING** | RFQ form has no submit handler |
| 6 | Checkout | `/checkout` | ❌ | **MISSING** | no payment flow yet |
| 7 | Order confirmation + tracking | `/order/[id]` / `/buyer-center/orders` | ⚠️ | `/buyer-center/orders` ✅, **`/order/[id]` MISSING** | static list only |
| 8 | Account management | `/account` | ❌ | **MISSING** | no profile/settings page |

**Coverage:** 3/8 PASS, 3/8 PARTIAL, 2/8 FAIL.

### Critical missing pages

1. **`/cart`** — Add-to-cart flow chưa tồn tại. RFQ flow tồn tại nhưng form không có submit. B2B marketplace cần **dual mode**: cart cho stock items, RFQ cho custom orders.
2. **`/checkout`** — Payment + shipping flow vắng hoàn toàn.
3. **`/account`** — Profile, addresses, payment methods, password — không có. `/buyer-center` đóng vai trò một phần (orders, favorites) nhưng thiếu identity/security.
4. **`/order/[id]`** — Order detail/tracking page không tồn tại. `/buyer-center/orders` chỉ là list mockup.

## 3. Buyer-center quality gaps

### G1 — Static mockups, không data
Tất cả 12 pages = hardcoded JSX. Không gọi API, không có realistic loading/error states. Sprint 5+ cần roadmap **wire to backend** dần dần.

### G2 — Forms không submit
Contact form (`/buyer-center/contact`) và Post RFQ form (`/buyer-center/post-rfq`) là server components — không có submit handler, không có server action. Form là decoration.

### G3 — Loading/Empty state convention
12/12 buyer-center pages thiếu `loading.tsx` + empty state. Khi wire to API ở Sprint 5+, sẽ cần đồng bộ với pattern Sprint 4 carry-over.

### G4 — Mobile responsiveness mỏng
Trung bình **4.8 mobile hits/page** — thấp hơn Sprint 4 scope pages (15-26 hits). Layout dùng nhiều `flex` không có breakpoint. Tablet/mobile UX có thể vỡ.

### G5 — Authentication gating chưa rõ
`/buyer-center/*` về logic phải behind auth. Hiện không thấy middleware/redirect logic — cần kiểm tra `middleware.ts` (out of Phase 1 audit scope).

## 4. Sprint 5+ scope proposal cho buyer-center

### Sprint 5 Phase 3 (UX polish — match Sprint 4 scope pages):
- `loading.tsx` cho 12 buyer-center segments
- Empty state pattern áp dụng các pages tĩnh
- Mobile responsive pass (target ≥ 10 hits/page)

### Sprint 6 (Buyer flow Build-Out):
- **NEW** `/cart` page + add-to-cart server action
- **NEW** `/checkout` page (multi-step: shipping, payment, review)
- **NEW** `/account/*` (profile, addresses, security)
- **NEW** `/order/[id]` (detail + tracking)
- Form submit handlers cho Contact, Post RFQ
- Auth middleware enforce trên `/buyer-center/*`, `/account/*`, `/checkout`

### Sprint 7+ (Data wire-up):
- 12 buyer-center pages → real API endpoints
- Orders pull from `order_summary_view`
- Favorites persisted to backend
- Browsing history qua cookie/localStorage + Redis sync

## 5. Questions for coordinator

1. **Cart vs RFQ priority:** Sprint 6 build cả `/cart` + `/checkout` HAY chỉ wire-up RFQ trước (B2B-first chiến lược)?
2. **Account scope:** `/account` riêng hay merge vào `/buyer-center/settings`?
3. **Form submit Phase:** Contact + Post RFQ form submit handlers nên include Sprint 5 (cùng UX polish) hay defer Sprint 6 (wire-up phase)?
4. **Middleware audit:** muốn Phase 1 include kiểm tra `middleware.ts` về auth gating không, hay defer?
5. **Buyer-center dashboard (`/buyer-center`):** plan nói 11 pages, thực tế 12 (có dashboard root). Confirm dashboard included?

## 6. Next

Coordinator review inventory → quyết định Sprint 6 scope (cart, checkout, account, order detail) → Sprint 5 Phase 2 chỉ focus UX polish 11+12 = 23 pages.
