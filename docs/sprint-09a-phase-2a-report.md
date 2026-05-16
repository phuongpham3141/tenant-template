# Sprint 9A Pha 2a — Admin views (2/3) + Contact form D7 — XONG

**Ngày:** 2026-05-15
**Sprint:** 9A **Pha:** 2a (split L13 từ Pha 2 sau D19 + service signature mismatch)
**HEAD:** `ea6d7f5` → +1 report commit
**Status:** ✅ Pha 2a hoàn tất (4/5 bước; Bước 2 deferred Pha 2b)

## Tóm tắt

Pha 2 plan paste gốc gồm 5 bước (Supplier + RFQ + AI Livestream + Contact + smoke). Audit Bước 0 phát hiện:

1. **D19 carry-over Pha 1c**: rfq module service query `ord.rfq*` schema không tồn tại + 11 column mismatches
2. **Service signature mismatch**: rfq service dùng `(ctx: TenantContext, opts)` raw-SQL pattern, KHÔNG phải Medusa standard `(filters, config)`. Plan paste assume Medusa standard.

→ Áp dụng L13 atomic split: **Pha 2a (this) + Pha 2b (cùng Pha 1d D19 rewrite)**.

## Deliverables (3 commits feat + 1 docs)

| Commit | Bước | Mô tả |
|---|---|---|
| `4761acd` | 1 | Admin view Supplier Applications (Pha 1a follow-up) |
| `327feca` | 3 | Admin view AI Livestream skeleton (R22 wrap existing API) |
| `ea6d7f5` | 4 | D7 Contact form Server Action + backend endpoint |
| (this) | 5 | Pha 2a report |

## Backend (Medusa) — 4 new endpoints

```
GET  /admin/supplier-applications        — list + filter + pagination
GET  /admin/supplier-applications/:id    — detail
POST /admin/supplier-applications/:id    — update status workflow
POST /store/contact                       — submit form Liên hệ
```

Smoke results:
```
GET  /admin/supplier-applications        → HTTP 401 (auth gate OK)
GET  /admin/supplier-applications/:id    → HTTP 401
POST /store/contact (valid)              → HTTP 200 + tiếng Việt success
POST /store/contact (invalid email)      → HTTP 400 + "Email không hợp lệ"
POST /store/contact (missing fields)     → HTTP 400 + "Thiếu thông tin bắt buộc" + fields list
```

## Frontend

### Admin UI (Medusa v2 dashboard extension, defineRouteConfig)

| Route | Label tiếng Việt | Coverage |
|---|---|---|
| `/app/supplier-applications` | Đơn đăng ký NCC | Full table + status filter + workflow buttons |
| `/app/ai-livestream` | AI Livestream | Skeleton 3 tabs (personas/schedules/analytics) → Sprint 10+ CRUD |

### Storefront

- `src/actions/contact.ts` — Server Action `submitContact()` với validation song song server-side
- `src/app/info/contact/_components/ContactForm.tsx` — Client form component (FormData based, useState states)
- `src/app/info/contact/page.tsx` — Edit +4 dòng: import + render `<ContactForm />` trước section FAQ/CTA

## L14 pre-flight applied

Pattern Pha 1b v2: test endpoints TRƯỚC commit scope.

| Test | Result |
|---|:-:|
| `defineRouteConfig` export trong `@medusajs/admin-sdk` | ✅ verified node_modules |
| `supplier_application` service methods (Medusa factory) | ✅ list/retrieve/update auto-generated |
| `rfq` service methods | ❌ MISMATCH (raw SQL `(ctx, opts)`) → defer Pha 2b |
| `ai-livestream` admin API existing | ✅ 6 endpoints (personas/schedules/scripts/ledger/start/pause) — wrap được |
| Admin route registered post-build | ✅ HTTP 401 = route exists + auth gate |

## Pha 2b — Deferred Admin RFQ view

**Lý do:** Service signature mismatch + D19 schema broken.

**Plan paste assume:**
```ts
rfqService.listRfqs(filters, { take, skip, order: { created_at: "DESC" } })
rfqService.retrieveRfq(id)
rfqService.updateRfqs({ id, status, supplier_response })
```

**Thực tế:**
```ts
listRfqs(ctx: TenantContext, opts: { customerId?, status?, supplierVisibleId?, limit? })
getRfq(ctx: TenantContext, id)        // không phải retrieveRfq
// không có updateRfqs — chỉ có acceptQuote/counterOffer cấp quote
```

→ Trigger ESCALATE rule trong plan paste: "Service method names khác giả định (vd: `list` thay vì `listRfqs`)".

**Đề xuất Pha 2b workflow:**
1. Pha 1d trước: rewrite rfq service map sang `rfq.*` schema thật (D19 ESCALATE-D19.md)
2. Pha 2b sau: build admin RFQ API + UI lên service mới

## Regression smoke

| Endpoint | Pha gốc | Result Pha 2a |
|---|---|:-:|
| `POST /store/supplier-applications` | Pha 1a | HTTP 201 ✅ |
| `POST /store/carts` | Pha 1b v2 | HTTP 200 ✅ |
| `GET /` (storefront) | Sprint 1 | HTTP 200 ✅ |
| `GET /info/contact` | Sprint 5 | HTTP 200 ✅ |
| `GET /register/factory` | Sprint 6 | HTTP 200 ✅ |
| `GET /cart` | Pha 1b v2 | HTTP 200 ✅ |

3/3 Medusa health stability checks PASS.

## Sprint 9A cumulative commits (11 trên `cms`)

```
(this)   docs(sprint-09a): Pha 2a DONE
ea6d7f5  feat(storefront+medusa): D7 Contact form
327feca  feat(medusa): admin AI Livestream skeleton
4761acd  feat(medusa): admin Supplier Applications
cf882eb  docs(sprint-09a): Pha 1b v2 XONG
f5c9e8b  feat(storefront): Cart Hybrid β
661579d  docs(sprint-09a): Pha 1 PARTIAL
df7b9a5  feat: D9 supplier-application full stack
f49f81d  docs(sprint-09a): Pha 0 v2 XONG
7c4b675  fix(medusa): D14 rename 15 modules
a61ecff  fix(medusa): D10 disable defineLink
```

`cms` ahead `origin/cms` by 11 commits — chờ Pha 3 close + push.

## Sprint 7 carry-over progress

| Item | Trước Sprint 9A | Sau Pha 2a |
|---|---|:-:|
| D9 supplier app | ⏳ | ✅ Pha 1a |
| Cart context backend | ⏳ | ✅ Pha 1b v2 |
| `/buyer-center/rfqs` wire | ⏳ | ⏳ Pha 1c defer (D19) |
| `/buyer-center/messages` wire | ⏳ | ⏳ Pha 1c defer (D19 cascade) |
| `/buyer-center/profile` wire | ⏳ | ⏳ Pha 1c defer (D19 cascade) |
| Admin Supplier view | ⏳ | ✅ Pha 2a |
| Admin RFQ view | ⏳ | ⏳ Pha 2b (sau D19 fix) |
| Admin AI Livestream view | ⏳ | ✅ Pha 2a skeleton |
| D7 Contact form | ⏳ | ✅ Pha 2a |
| forgot/reset password build | ⏳ | ⏳ Pha 3 |

→ Sprint 7 carry-over: 10 items → 4 resolved → 6 ⏳ (3 buyer wires + Admin RFQ + 2 password pages).

## Buyer/Admin flow status

| Flow | Trước Pha 2a | Sau Pha 2a |
|---|---|:-:|
| Buyer register factory | ✅ Pha 1a | ✅ + admin review functional |
| Customer contact | mockup static | ✅ functional form |
| Admin AI Livestream | — | ✅ skeleton ready |
| Buyer Cart | ✅ Pha 1b v2 Hybrid | ✅ |
| Buyer RFQ post | ⏳ | ⏳ (D19 cascade) |

## Lessons codified Sprint 9A (15 cumulative)

- L1-L10: previous sprints
- L11 (Pha 0 v2): Layer 1b usage scan trước rename
- L12 (Pha 1a): Mikro-ORM `model.dateTime().default(new Date())` cấm
- L13 (Pha 1a): Atomic phase split khi scope >12h hoặc bug discovered
- L14 (Pha 1b v2): Endpoint inventory pre-flight check `curl` test trước commit scope
- **L15 (Pha 2a NEW)**: Service method signature check trước plan paste. Medusa standard `(filters, config)` vs raw-SQL `(ctx: TenantContext, opts)` pattern KHÔNG tương đương — audit Layer 0+1 service file trước khi viết admin route.

## HARD RULES Pha 2a compliance

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ 4 commits atomic |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 6 — Schema qua migration | ✅ (không touch schema) |
| Rule 7 — Multi-layer audit | ✅ (Layer 0+1+1b+3) |
| Rule 8 — Best-effort no placeholder | ✅ AI Livestream skeleton documented Sprint 10+ tasks |
| Rule 8 phụ — Plan deviation handling | ✅ Pha 2a/2b split documented |
| Rule 9 — Tiếng Việt thuần | ✅ admin UI + Contact form 100% tiếng Việt |

## Next

**Pha 3 trigger (CUỐI Sprint 9A):**
1. Build `/forgot-password` page (yêu cầu email reset)
2. Build `/reset-password` page (form mật khẩu mới với token)
3. Wire `/login` link "Quên mật khẩu" → `/forgot-password`
4. Comprehensive smoke Sprint 9A
5. Sprint 9A final report
6. Push `origin/cms` (~12 commits Sprint 9A)

**Pha 1d + 2b NEW (tách riêng — coordinator quyết khi nào trigger):**
- Pha 1d: rfq module rewrite (D19 fix: schema + service + types + sequences migration)
- Pha 2b: Admin RFQ view (sau Pha 1d) + storefront RFQ wires (`/buyer-center/rfqs`, `/buyer-center/messages`, `/buyer-center/profile`)

**Files report tại:**
- `tenant-template/docs/sprint-09a-phase-2a-report.md` (this commit)
- `CMS/P9A-PHA2A-DONE.md` (separate)
