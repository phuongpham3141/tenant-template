# Sprint 6 Master Plan — UX phần II.B (Seller + Info + Auth)

**Date:** 2026-05-15
**Sprint:** 6
**Authority:** Rule 8 Option B (best-effort UX) — codified Sprint 4

## Scope overview (post-Phase 1 reality check)

| Group | Plan paste | Reality | Phase | Notes |
|---|---:|---:|:---:|---|
| Seller-center | 11 | **11** | 2 | Service landings, NOT CRUD portal |
| Info pages | 7 | **8** | 3 | +1 sub-page (industry-news/[slug]) |
| Login/register polish | 4 | **4** | 3 | 4 forms exist, **0 wired** |
| **Total scope** | 22 | **23** | | |

## Phase plan (per 3-cycle rule)

### Phase 1 — Inventory + Planning (this phase) ✅
- Seller-center 11 pages 4-state audit
- Info pages 8 audit + hex cluster analysis (91 hex)
- Login/register 4 form wiring audit
- 3 docs output (this doc + 2 detail docs)

### Phase 2 — Seller-center implementation (~10-12h estimated)
- Bước 1: Mechanical refactor (8 hex → 0)
- Bước 2: UX layout polish 11 service landing pages
- Bước 3: Loading.tsx + error.tsx cho `/seller-center/` segment
- Bước 4: ai-livestream sidebar entry (orphan resolution)
- Bước 5: Mobile responsive pass on 5 thin pages

### Phase 3 — Info + Login/register + close (~12-15h estimated)
- Bước 1: Design token expansion (19 → 22, add navy + navy-dark + teal-dark)
- Bước 2: Info pages mechanical refactor (91 hex → <20)
- Bước 3: Info pages UX polish (contact, ddp-calculator, network, disputes)
- Bước 4: Login/register wire 4 forms (fetch /api/auth/* routes)
- Bước 5: Sprint 6 close + push origin/cms

## Sprint 5 lessons applied (5 critical)

✅ **Lesson 1 — Phase 1 reality check:** This phase audit kỹ TRƯỚC scope commit. Phát hiện:
- Seller-center actual = service landings (not CRUD)
- Info hex 91 (not 78)
- Auth pages 4/4 forms but 0 wiring

✅ **Lesson 2 — 4-state inventory:** Applied to seller-center (mockup pattern matches buyer-center Sprint 5) + auth pages (state = form-only-no-wire).

✅ **Lesson 3 — Pre-existing bug discovery:** ai-livestream orphan page (exists but not in sidebar). 6 /api/auth routes exist but pages don't fetch them.

✅ **Lesson 4 — Predictive plan caveats:** Phase 2/3 drafts trong this doc. Finalize specifics after Phase 1 reality.

✅ **Lesson 5 — Hex cluster pattern:** Info pages 91 hex confirmed (Sprint 5 estimate "78+" was lower-bound). Bigger than expected → strategy adjusted (3 new tokens needed, not just refactor to existing).

## Plan deviations flagged Phase 1 (Rule 8 amendment)

### D1. Seller-center NOT CRUD portal
Plan paste assumed seller-center has orders/products/analytics/inventory pages. Reality: 11 service landing pages (B2B sourcing services). → Sprint 6 = polish 11 landing pages. CRUD seller portal defer Sprint 9 or Sprint 7.

### D2. Info pages = 8 (not 7)
`industry-news/[slug]` is sub-page making total 8. Treat as in-scope.

### D3. Info hex = 91 (not 78+)
Plan estimate was lower-bound. `network/page.tsx` alone has 56 hex (61% of cluster). Strategy needs 3 new tokens addition.

### D4. Auth pages 4/4 forms have NO wiring
Plan said "polish login/register". Reality: forms exist with no submit handler, useState, or /api/auth fetch. 6 /api/auth route handlers exist (login, logout, password-reset, refresh, register, verify-otp). Sprint 6 Phase 3 must WIRE all 4 forms.

## Rule 8 application

### Tier 1 (Claude Code auto-decide) ✅
- Hex literal refactor → tokens (8 seller + 91 info → max ~99 hex)
- Inline style classification (52 info inline — static refactor candidates)
- Component reuse (Sprint 5 EmptyState, Skeleton, ListSkeleton)
- Form wiring via fetch /api/auth/* (route handlers ready)
- 3 new design tokens proposal (navy, navy-dark, teal-dark)

### Tier 2 (Best-effort UX — Option B authority) ✅
- Service landing pages B2B-marketing conventions (hero + benefit cards + how-it-works + CTA)
- Info pages content layout (article patterns, calculator UX, dispute resolution flow)
- Auth form UX (error state, redirect flow, OAuth/OTP UX)
- Empty state messages
- Sidebar nav updates (ai-livestream orphan resolution)

### Cấm (anti-patterns)
- ❌ Placeholder text trong code/commits/docs
- ❌ Mass inline style conversion without per-file inspection
- ❌ Refactor semantic data hex (Vietnam flag red #C8102E preserved)
- ❌ Silent plan deviation fixes (Rule 8 amendment)

## Metrics target (Sprint 6 end)

| Metric | Sprint 5 end | Sprint 6 end target | Status |
|---|---:|---:|:-:|
| Hex literals total (Phase 1 method) | 196 | < 130 | Target -34% |
| Hex info cluster | 91 | < 20 | Target -78% |
| Hex seller scope | 8 | 0 | Target -100% |
| Hex auth scope | 4 | 0 | Target -100% |
| Design tokens | 19 | 22 (+navy, navy-dark, teal-dark) | additive |
| Convention files | 4 | 6 (+seller-center loading/error) | additive |
| New pages built | (Sprint 5: 8) | 0 (Sprint 6 polish only) | — |
| Auth forms wired | 0/4 | 4/4 | NEW |
| Seller flow smoke | n/a | 11/11 routes (auth-gated 307→/login OK) | NEW |
| Info pages smoke | n/a | 8/8 HTTP 200 | NEW |
| Sprint 6 scope page hex | varied | 0/23 | NEW |

## Sprint 7 prerequisites mapping

Sau Sprint 6 hoàn thành:
- ✅ Buyer flow (Sprint 5) + Seller flow + Auth wired + Info pages
- ✅ ~33/55 storefront pages publish-ready (60%)
- ✅ All forms structurally wired (Cart Sprint 5, Auth Sprint 6)
- ⏳ Sprint 7 scope:
  - Cart context backend integration (Medusa SDK sync)
  - Admin custom features (verification tier, AI livestream control, VN sourcing)
  - Contact form Server Action (deferred Sprint 6)
  - DDP calculator backend pricing API (deferred Sprint 6)
  - Buyer-center 3 NEW pages backend wire (rfqs/messages/profile from Sprint 5)

## Carry-over to Sprint 9 (Option γ Sprint 5 + Phase 1 Sprint 6 confirms)

- 10 Sprint 4 carry-over UX layout polish
- 7 buyer-center pages remainder (Sprint 5 dropped per Option γ)
- /account/* page suite
- /order/[id] detail/tracking page
- CRUD seller portal (if needed — coordinator decision)
- 23 `loading.tsx` Sprint 4 carry-over

## Acceptance criteria Sprint 6

- ✅ 11 seller-center polished
- ✅ 8 info pages polished (hex cluster cleaned)
- ✅ 4 auth pages wired (functional login/register)
- ✅ 3 new tokens added (navy, navy-dark, teal-dark)
- ✅ Convention files extended (seller-center segment)
- ✅ Sprint 6 commits push origin/cms
- ✅ All 4 plan deviations documented (Rule 1)

## Questions for coordinator (consolidated, 10)

### Critical (block Phase 2 start)
1. **ai-livestream orphan:** add to seller sidebar (default) hay remove page?
2. **CRUD seller portal scope:** include Sprint 6 (orders/products/analytics/inventory) hay defer Sprint 9?
3. **Auth wire approach:** Server Actions (cleaner) hay fetch /api/auth/* (existing pattern)?

### Phase 3 token decisions
4. **3 new tokens approval:** navy `#002557`, navy-dark `#001A3F`, teal-dark `#0E7490`?
5. **Existing token reuse verify:** `#DC2626` → red? `#16A34A` → success? `#0E2A33` → brand-dark? `#7C3AED` → purple?
6. **Vietnam flag red `#C8102E`:** keep as semantic literal?

### Backend deferral
7. **Contact form:** Sprint 6 wire to Server Action hay defer Sprint 7?
8. **DDP calculator:** client-side static (Sprint 6) hay backend API (Sprint 7)?

### General
9. **Mobile threshold:** target ≥10 mobile breakpoint hits/page (Sprint 5 pattern)?
10. **Phase 2 + 3 commit cadence:** 1 commit/Bước (Sprint 5 pattern) hay grouped?

## Detail docs

- [sprint-06-seller-center-inventory.md](sprint-06-seller-center-inventory.md)
- [sprint-06-info-pages-plan.md](sprint-06-info-pages-plan.md)

## Next

Coordinator answers 10 questions → finalize Phase 2 v2 scope → execute seller-center polish.
