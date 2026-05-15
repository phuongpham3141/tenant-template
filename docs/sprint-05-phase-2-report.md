# Sprint 5 Phase 2 v2 (Option γ) — DONE

**Date:** 2026-05-15
**Sprint:** 5 Phase 2 v2 — Infrastructure + critical missing pages + selective buyer-center polish
**Authority:** Rule 8 Option B (best-effort UX) + Rule 1 (no silent fix flagged in commits)
**Branch:** `cms`, NOT pushed (Phase 3 will push)

## Scope completed

| Bước | Action | Commit | Status |
|---|---|---|---|
| 0 | Git sync + Phase 1 verify | — | ✅ HEAD `bb5e033` confirmed |
| 1 | Infrastructure (2 ui components + 4 convention files) | `e712cab` | ✅ |
| 2 | /cart page + CartContent + CartDrawer + wire CartProvider | `e9cce6f` | ✅ |
| 3 | 3-step checkout flow + StepIndicator + ReviewSummary | `078c931` | ✅ |
| 4 | 3 new buyer-center + 1 polish + Post RFQ wire + sidebar | `9899fba` | ✅ |
| 5 | Smoke + metrics + Phase 2 report | (this commit) | ✅ |

## Deliverables (24 files, +1359 / -26)

### Infrastructure (Bước 1, 6 files)
- `src/components/ui/EmptyState.tsx` (generic component, icon/title/message/CTA)
- `src/components/ui/Skeleton.tsx` (+CardSkeleton + ListSkeleton + TableSkeleton)
- `src/app/error.tsx` (global error boundary — Next.js 16 `unstable_retry` API)
- `src/app/not-found.tsx` (global 404 Vietnamese)
- `src/app/buyer-center/loading.tsx` (segment skeleton)
- `src/app/buyer-center/error.tsx` (segment error boundary)

### Cart cluster (Bước 2, 4 files modified/created)
- `src/app/cart/page.tsx` (server, metadata)
- `src/app/cart/CartContent.tsx` (client, uses real `useCart()` hook with formatMoney)
- `src/components/cart/CartDrawer.tsx` (slide-in drawer, item count badge, full state)
- `src/app/layout.tsx` (wrap body in `<CartProvider>` — fixed pre-existing missing wrapper)
- `src/components/home/sticky-header.tsx` (replace broken /buyer-center/favorites link with CartDrawer)

### Checkout cluster (Bước 3, 6 files)
- `src/app/checkout/layout.tsx` (header + back-to-cart link)
- `src/app/checkout/shipping/page.tsx` (Step 1 form, 3-tier VN địa chỉ)
- `src/app/checkout/payment/page.tsx` (Step 2, 5 methods: VNPay/MoMo/ZaloPay/Bank/Escrow)
- `src/app/checkout/review/page.tsx` (Step 3, server)
- `src/app/checkout/review/ReviewSummary.tsx` (client, useCart for items + total)
- `src/components/checkout/StepIndicator.tsx` (3-step visual, clickable backwards)

### Buyer-center (Bước 4, 7 files modified/created)
- `src/app/buyer-center/rfqs/page.tsx` (NEW — table desktop / card mobile + 4-tab filter + EmptyState)
- `src/app/buyer-center/messages/page.tsx` (NEW — 2-pane split desktop / single mobile)
- `src/app/buyer-center/profile/page.tsx` (NEW — 4 section blocks: Personal/Business/Preferences/Security)
- `src/app/buyer-center/orders/page.tsx` (modified — EmptyState wrapper)
- `src/app/buyer-center/post-rfq/page.tsx` (modified — form action wired)
- `src/app/buyer-center/post-rfq/action.ts` (NEW — submitRfqForm wrapper)
- `src/components/buyer/sidebar.tsx` (restructured 3 → 4 nav groups)

## Metrics (verified)

| Metric | Sprint 4 close | Sprint 5 baseline (Phase 1) | Phase 2 end | Target |
|---|---:|---:|---:|---:|
| Hex literals total (src/) | 178 | 196 | **196** | < 120 (defer Sprint 6) |
| Hex in Sprint 5 new files (14 files) | — | — | **0** | 0 ✅ |
| Hex in buyer-center cluster | 0 | 0 | **0** | 0 maintained ✅ |
| Next.js convention files | 0 | 0 | **4** | ≥ 4 ✅ |
| New pages built | 0 | 0 | **8** | 5 cart+3 checkout = 4, +3 buyer = **>= 7** ✅ |
| Buyer-center pages polished | 0 | 0 | **2** | 2 ✅ (orders empty state, post-rfq form wire) |
| Form wire-ups | 0 | 0 | **1** | 1 (Post RFQ) ✅ |

**Hex hotspots NOT touched** (deferred Sprint 6 per Option γ): `/info/network` (54), `/info/disputes` (13), `/info/sample-orders` (11), other clusters.

## Buyer flow progression

| Step | Pre-Phase 2 | Phase 2 end | Notes |
|---|:-:|:-:|---|
| 1. Register | ✅ | ✅ | unchanged |
| 2. Login | ✅ | ✅ | unchanged |
| 3. Browse/Search | ✅ | ✅ | Sprint 4 closed |
| 4. Product view | ✅ | ✅ | Sprint 4 closed |
| 5. Cart OR RFQ | ⚠️ | ✅ **NEW** | /cart built + CartDrawer + RFQ form wired |
| 6. Checkout | ❌ | ✅ **NEW** | 3-step flow built |
| 7. Order tracking | ⚠️ | ⚠️ | list polished (empty state); detail page defer Sprint 9 |
| 8. Account | ❌ | ⚠️ | profile page built; full /account defer Sprint 9 |

**Coverage: 3/8 → 6/8 PASS** ✅ (target Sprint 5 met).

## Smoke test (Phase 2 cluster)

```
Bước 1 (infrastructure):
  /nonexistent-xyz-page          → HTTP 404 ✅ (NotFound rendered)

Bước 2 (cart, no auth):
  /cart                          → HTTP 200 ✅ (empty state rendered)

Bước 3 (checkout, auth-gated):
  /checkout/shipping             → anon=307 auth=200 ✅
  /checkout/payment              → anon=307 auth=200 ✅
  /checkout/review               → anon=307 auth=200 ✅

Bước 4 (buyer-center, auth-gated):
  /buyer-center                  → HTTP 200 ✅
  /buyer-center/orders           → HTTP 200 ✅
  /buyer-center/rfqs             → HTTP 200 ✅
  /buyer-center/messages         → HTTP 200 ✅
  /buyer-center/profile          → HTTP 200 ✅
  /buyer-center/post-rfq         → HTTP 200 ✅
```

**11/11 routes PASS.** Middleware auth gating confirmed working (`PROTECTED_PATHS = /buyer-center, /seller-center, /account, /checkout`).

## Plan deviations flagged (Rule 1 — no silent fix)

### D1. Next.js 16 error boundary API
Plan paste used legacy `{error, reset}`. Next.js 16 renamed to `{error, unstable_retry}`. Adopted correct API per `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md`. Documented in commit `e712cab`.

### D2. CartProvider already exists; layout missing wrapper
Plan paste said "Sprint 7 wire CartProvider". Reality: `src/components/providers/CartProvider.tsx` exists fully implemented (BigInt support, localStorage persistence, wholesale/retail mode) but `app/layout.tsx` lacked `<CartProvider>` wrapper. **Fixed cùng Bước** (Rule 1). CartContent + CartDrawer use real `useCart()` hook from start. Documented in commit `e9cce6f`.

### D3. Plan's 5 P0 buyer-center pages — 3 don't exist
Coordinator chose dashboard/orders/rfqs/messages/profile. Phase 1 inventory verified only dashboard + orders existed. **Built 3 new** (rfqs, messages, profile). Documented in commit `9899fba`.

### D4. Post RFQ form/action signature mismatch
- Existing form fields: `q`, `desc`, `qty`, `category`, `port`
- Existing `createRfqAction`: expects `title_vi`, `description_vi`, `target_quantity`, `target_unit_code`, `category_id`, `destination_country`, `invite_mode`
- Fix: renamed form fields + added hidden inputs for required fields (title_en/cn, description_en/cn, destination_country=VN, invite_mode=open)
- Action return type incompatible với Next.js `<form action>` prop → created `submitRfqForm` wrapper that throws on validation error (caught by error.tsx)
- Documented in commit `9899fba`.

## Carry-over to Sprint 5 Phase 3

- Compile `docs/sprint-05-report.md` final
- Push origin/cms (4 commits)
- Re-run final smoke 11+ pages

## Deferred to Sprint 6+ (Option γ explicit exclusions)

- Sprint 4 carry-over 10 pages layout polish → Sprint 9
- Info pages hex cluster (78+ hex) → Sprint 6
- 6 other buyer-center pages (favorites, audited-reports, browsing-history, contact, meet-suppliers, new-user-guide, secured-trading, supplier-discover, product-directory) loading.tsx/empty state → Sprint 9
- Contact form wire-up → Sprint 6
- `/account` full module → Sprint 9
- `/order/[id]` detail/tracking page → Sprint 9
- Order detail when no orders → backend wire-up (Sprint 7)
- 23 loading.tsx Sprint 4 carry-over → Sprint 9

## HARD RULES Phase 2 compliance

| Rule | Status |
|---|:-:|
| Rule 1 — file tracked commit cùng turn | ✅ all 4 commits incl. patches |
| Rule 1 — no silent fix | ✅ 4 deviations flagged in commits + this report |
| Rule 5 — git sync trước audit | ✅ Bước 0 |
| Rule 7 — multi-layer audit (token discipline) | ✅ TS check + hex grep + smoke test |
| Rule 8 — best-effort UX no placeholder | ✅ actual VN copy + real wiring |

## Cumulative Sprint 5 commits

```
9899fba feat: 3 buyer pages + 2 polish + Post RFQ wire (Bước 4)
078c931 feat: 3-step checkout flow (Bước 3)
e9cce6f feat: /cart + CartDrawer + wire CartProvider (Bước 2)
e712cab feat: infrastructure components (Bước 1)
bb5e033 docs: Phase 1 audit
```
