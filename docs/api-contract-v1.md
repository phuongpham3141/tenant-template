# API Contract v1 — Cybersilkroads Storefront

**Generated:** 2026-05-15
**Sprint:** 3 Phase 3 (P3.2)
**Purpose:** Document API surface area giữa Storefront và Medusa backend.
**Methodology:** Auto-generated từ inventory (find + grep src/lib/sdk + src/app).

## Architecture overview

```
Browser
  ↓ HTTP cookie (HTTP-only csr_session)
Storefront Next.js (SSR / Server Action)
  ↓ api() helper (src/lib/api/client.ts) adds:
  ↓   - x-publishable-api-key (from env NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY)
  ↓   - x-tenant-id (from session.tenantId || DEFAULT_TENANT)
  ↓   - Authorization (session token if exists)
Medusa Backend (http://api.huayuesc.local)
```

**Key insight (Sprint 2 Day 6 audit):**

Storefront **KHÔNG** dùng `/api/*` proxy cho cart/RFQ/products. SDK clients call Medusa direct via `api()` helper, server-side.

`/api/auth/*` routes EXIST vì cần SET HTTP-only cookie (security — client-side JS không thể `Set-Cookie`).

`/api/me` GET cũng exists để check session.

## Storefront pages (59 total)

### Public (no auth)
- `/` (homepage)
- `/category/[slug]` + `/category/[slug]/[sub]`
- `/product/[id]` + `/product/[id]/reviews`
- `/products` + `/search` + `/search/by-image`
- `/supplier/[slug]`, `/suppliers`
- `/login`, `/register/{buyer,dealer,factory}`
- `/info/{contact,ddp-calculator,disputes,industry-news,network,sample-orders,[topic]}`
- `/help`, `/factory-tour`, `/industry-channels`, `/trade-alert`, `/trade-shows`
- `/zone/[slug]`, `/zones`
- `/sell-on-csr`, `/buying-request`
- `/live/ai/[id]`
- `/sitemap`

### Protected (middleware redirect to /login)
- `/buyer-center` + 11 sub-pages
- `/seller-center` + 9 sub-pages
- `/account/*`, `/checkout/*` (per middleware PROTECTED_PATHS)

## API route handlers (9 files)

| Route | Method | Purpose |
|---|---|---|
| `/api/auth/register` | POST | Create new buyer account |
| `/api/auth/login` | POST | Email/password login + set cookie |
| `/api/auth/logout` | POST | Clear session cookie |
| `/api/auth/refresh` | POST | Extend session expiry |
| `/api/auth/password-reset` | POST | Send reset email |
| `/api/auth/verify-otp` | POST | Verify OTP code (signup/login) |
| `/api/me` | GET | Current session status |
| `/api/search/visual-upload` | POST | Multipart upload to Medusa visual search |
| `/api/webhooks/payload-revalidate` | POST | Payload CMS revalidate trigger |

## Server actions (8 files)

Located in `src/actions/`:

| Action | File | Use case |
|---|---|---|
| RFQ submit | `rfq.ts` | Buyer-center submit RFQ |
| Chat send | `chat.ts` | Conversation message |
| Checkout | `checkout.ts` | Cart to order placement |
| Factory visit | `factory-visit.ts` | VN sourcing booking |
| Sample request | `sample-request.ts` | Request product sample |
| Returns | `returns.ts` | Order return flow |
| Supplier follow | `supplier-follow.ts` | Follow/unfollow supplier |
| Trade alert | `trade-alert.ts` | Subscribe industry alert |

## SDK clients (14 folders)

Located in `src/lib/sdk/`:

| SDK | Calls | Medusa endpoint group |
|---|---|---|
| ai | 4 | /store/ai/* |
| ai-livestream | 1 | /store/ai-livestream/* |
| communication | 4 | /store/conversations* |
| escrow | 2 | /store/escrow/* |
| livestream | 3 | /store/livestreams/* |
| media | 1 | /store/media/upload-ticket |
| notification | 2 | /store/notifications/* |
| order | 3 | /store/orders |
| payment | 3 | /store/payment/* |
| product | 4 | /store/products/* |
| rfq | 6 | /store/rfqs + /store/rfqs/:id/quotes |
| search | 2 | /store/search/* |
| supplier | 3 | /store/suppliers/* |
| vn-sourcing | 4 | /store/vn-sourcing/* |

Total: **43 API calls** trong SDK clients.

## Medusa endpoints used (17 unique stems)

```
/store/conversations
/store/conversations/start
/store/livestreams/live-now
/store/livestreams/upcoming
/store/media/upload-ticket
/store/orders
/store/payment/initiate
/store/payment/methods
/store/rfqs
/store/search
/store/search/autocomplete
/store/search/track-click
/store/search/trending
/store/suppliers
/store/vn-sourcing/factory-visits
/store/vn-sourcing/interpreters
/store/vn-sourcing/interpreter-sessions
```

Plus nested: `/store/products/:handle`, `/store/rfqs/:id/quotes`, etc.

## Auth flow detail

### Register
- `POST /api/auth/register` to `POST /auth/customer/emailpass/register` (Medusa)
- Body: `{ email, phone?, password, consent }`
- Returns 400 `consent_required` if consent missing
- Sets cookie `csr_session` (HTTP-only, 7 days)

### Login
- `POST /api/auth/login` to `POST /auth/login` (Medusa)
- Body: `{ identifier, password, otp? }`
- `identifier` = email or phone
- Returns: `{ user: { id, tenant_id, email, display_name, roles, locale, supplier_id? }, session_expires_at }`
- Sets cookie `csr_session`

### Refresh
- `POST /api/auth/refresh` — reads existing cookie, extends expiry
- Backend POST /auth/refresh

### Logout
- `POST /api/auth/logout` — clears cookie, idempotent

### Me (status check)
- `GET /api/me` — reads cookie, returns auth status

## Headers (all api() calls)

| Header | Value | Required |
|---|---|---|
| `x-publishable-api-key` | `pk_61509c15...` (env) | yes |
| `x-tenant-id` | `cybersilkroads` (from session) | yes |
| `Cookie: csr_session=...` | HTTP-only | After login |
| `Content-Type: application/json` | for POST/PUT | yes |

## Error handling (storefront convention)

| HTTP | Meaning | Storefront action |
|---|---|---|
| 200 | OK | render |
| 400 | Validation error | show field error |
| 401 | Not authenticated | redirect /login |
| 403 | Forbidden (RBAC) | show "Access denied" |
| 404 | Not found | show 404 page |
| 500 | Server error | toast "Try again" + log |

`ApiError` class wraps non-200 responses với `status`, `code`, `message`, `details`.

## Session model

**Cookie:** `csr_session`
- HTTP-only
- Secure (true on prod, false dev)
- SameSite=Lax
- Path=/
- Lifetime: 7 days, refresh on activity

**Contents:** JWT signed by Medusa với claims `sub` (customer_id), `tenantId`, `exp`, `iat`.

**Server-side decode:** `getSession()` helper (`src/lib/session.ts`).

## Catalog vs Medusa core (architecture)

Discovered in Sprint 2 Day 5 P1.4-F2 audit:

| Schema | Role | Owner | Sprint 3 sync |
|---|---|---|---|
| `catalog.product` | Canonical multi-locale, supplier-rich | Supplier-owned | Sprint 3 P3.3 mig 47 sync function |
| `public.product` | Medusa commerce-flow, simplified | Medusa core | Receives sync from catalog |

API endpoints `/store/products/*` query `public.product` (Medusa core). For rich i18n, query `catalog.product` direct.

## Open issues (Sprint 4+)

- **Session validation full** — middleware Day 5 only check cookie EXISTS, not VALIDATE JWT. Sprint 4 add JWT decode + expiry check.
- **RBAC fine-grained per route** — buyer/dealer/factory role check defer Sprint 5.
- **Multi-tenant locale resolution** — subdomain handled, full Host header detection defer Sprint 4.
- **Medusa subscriber for catalog to public sync** — currently manual `SELECT catalog.sync_all_products_to_public()`. Sprint 4 wire subscriber after `catalog.product UPDATE`.

## File reference

- API client: `storefront/src/lib/api/client.ts`
- Session: `storefront/src/lib/session.ts`
- Middleware: `storefront/src/middleware.ts` (PROTECTED_PATHS array)
- SDK base: `storefront/src/lib/sdk/index.ts`
