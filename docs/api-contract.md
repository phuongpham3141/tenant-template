# API Contract — Cybersilkroads Storefront ↔ Backend

> **Hợp đồng** giữa frontend team (Next.js storefront) và backend team (Medusa + Payload + workers).
> Mỗi UI page đã được map sang endpoint cụ thể. Cả 2 bên dựa vào file này để làm song song mà không kẹt.

**Version**: 1.0 · **Cập nhật**: 2026-05-13 · **Owner**: Tech Lead

---

## Quy ước chung

### Base URLs
| Env | Storefront | Medusa API | Payload API |
|---|---|---|---|
| Dev | `http://shop.huayuesc.local:8080` | `http://api.huayuesc.local:8080` | `http://cms.huayuesc.local:8080` |
| Prod | `https://shop.huayuesc.vn` | `https://api.huayuesc.vn` | `https://cms.huayuesc.vn` |

### Headers chuẩn cho mọi request từ storefront → Medusa
```http
x-publishable-api-key: pk_61509c15be9863ca278ff99a585d9f663f92b1e507031994c1d73e00360995f9
x-tenant-id: csr                            # multi-tenant context
Authorization: Bearer <session.userId>      # khi user đã login (set tự động bởi lib/api/client.ts)
Accept-Language: vi | en | cn               # detect locale; cũng đọc từ cookie `locale`
Content-Type: application/json
```

### Locale handling
- 3 locale: `vi` (default), `en`, `cn`
- Storefront detect locale theo subdomain (`vi.`, `en.`, `cn.`) hoặc cookie `locale`
- Backend tự dispatch JSONB `*_i18n` field → string theo locale; fallback chain `requested → vi → en → cn`
- Payload tự handle qua Localization Plugin (query param `?locale=vi`)

### Response envelope
**Medusa** (REST native): trả flat object hoặc array, không envelope:
```json
{ "products": [...], "count": 25, "offset": 0, "limit": 12 }
```

**Payload** (REST): luôn có envelope:
```json
{ "docs": [...], "totalDocs": 4, "limit": 10, "page": 1, "totalPages": 1, "hasNextPage": false, "hasPrevPage": false }
```

**Custom Medusa endpoints** (R16-R22): trả flat object, ví dụ:
```json
{ "hits": [...], "total": 24, "analysis": {...}, "latency_ms": 120 }
```

### Error format
```json
{ "code": "PRODUCT_NOT_FOUND", "message": "Product with id X not found", "details": {} }
```
HTTP status: 400 (validation), 401 (no auth), 403 (forbidden), 404 (missing), 429 (rate limit), 502 (upstream), 500 (server).

### Caching policy (Next.js fetch options)
| Resource | Strategy | TTL |
|---|---|---|
| Banners, navigation, footer, site-settings | `next: { revalidate: 300, tags: ['banners'] }` | 5 min |
| Blog articles, help articles, pages | `next: { revalidate: 600, tags: ['blog:<slug>'] }` | 10 min |
| Product list (homepage, category) | `next: { revalidate: 60, tags: ['products'] }` | 1 min |
| Product detail | `next: { revalidate: 120, tags: ['product:<id>'] }` | 2 min |
| User/cart/order/RFQ | `cache: 'no-store'` | none |
| Search autocomplete | client-side debounce 180ms, no SSR cache | — |
| Visual search | `cache: 'no-store'` | — |
| Livestream tracks | `next: { revalidate: 5, tags: ['ai-livestream:<id>'] }` | 5s |

### Pagination
- Query params: `?page=1&per_page=20` (storefront SDK convention) hoặc `?limit=20&offset=0` (Medusa native)
- Hard cap: `per_page <= 100`, `limit <= 200`

---

## 1. Public / Marketing Pages

### 1.1 — Homepage `/`
**Mục đích**: Landing trang chính, đa thành phần.

| Component | Data source | Endpoint | Method | Auth |
|---|---|---|---|---|
| Hero banner slider | Payload | `GET {PAYLOAD}/api/banners?where[placement][equals]=home_hero&where[_status][equals]=published&depth=2&locale=:locale&limit=5` | GET | — |
| Featured suppliers | Medusa custom | `GET {API}/store/suppliers?featured=true&limit=8` | GET | publishable |
| Top categories grid | Payload | `GET {PAYLOAD}/api/industry-channels?sort=displayOrder&limit=8&locale=:locale` | GET | — |
| Trending products | Medusa | `GET {API}/store/products?limit=12&order=-created_at&fields=id,title,handle,thumbnail,variants.calculated_price` | GET | publishable |
| Trade alerts (free preview) | Payload | `GET {PAYLOAD}/api/trade-alert-content?where[_status][equals]=published&sort=-publishedAt&limit=3&locale=:locale` | GET | — |
| Live now widget | Medusa custom | `GET {API}/store/livestreams/live-now` *(TODO: chưa implement)* | GET | publishable |
| Industry stats / counters | Static or Payload global | `GET {PAYLOAD}/api/globals/site-settings?locale=:locale` | GET | — |

**Notes**:
- Banners có field `creatives[]` mỗi locale; storefront pick creative match `currentLocale` hoặc fallback `all`
- `featured=true` cho supplier hiện tại = filter `verification_tier >= 4` (logic backend)

### 1.2 — Sitemap `/sitemap` và sitemap.xml
Static page list — không cần API. Sitemap.xml generated từ `app/sitemap.ts` (đã có).

### 1.3 — Help center `/help`
| Component | Endpoint |
|---|---|
| Help categories list | `GET {PAYLOAD}/api/help-articles?sort=displayOrder&select=category` (group by category client-side) |
| Top articles | `GET {PAYLOAD}/api/help-articles?sort=-viewCount&limit=10&locale=:locale` |
| FAQ items | `GET {PAYLOAD}/api/faqs?where[_status][equals]=published&sort=displayOrder&locale=:locale` |

### 1.4 — Info pages `/info/*`
| Route | Endpoint |
|---|---|
| `/info/contact` | `GET {PAYLOAD}/api/globals/site-settings` (contact group) |
| `/info/ddp-calculator` | Static UI; submit → `POST {API}/store/tax/calculate` *(TODO Domain 34)* |
| `/info/disputes` | `GET {PAYLOAD}/api/pages?where[slug][equals]=disputes&locale=:locale` |
| `/info/industry-news` | `GET {PAYLOAD}/api/blog-articles?where[category][equals]=market_news&sort=-publishedAt&page=:page` |
| `/info/industry-news/[slug]` | `GET {PAYLOAD}/api/blog-articles?where[slug][equals]=:slug&depth=2&locale=:locale&limit=1` |
| `/info/network` | `GET {PAYLOAD}/api/zones?sort=displayOrder&locale=:locale` |
| `/info/sample-orders` | Static + `GET {PAYLOAD}/api/help-articles?where[category][equals]=samples` |

### 1.5 — Sell on CSR `/sell-on-csr`
Static marketing page. Form submit → `POST {API}/store/suppliers/apply` *(TODO)*.

---

## 2. Product Discovery

### 2.1 — Products listing `/products`
| Need | Endpoint |
|---|---|
| Product list (paginated, sorted) | `GET {API}/store/products?limit=24&offset=:offset&order=:sort` |
| Facets (category, country, tier, price range) | `POST {API}/store/search` *(R21 ES-backed)* với body `{q:"", filters:{}, facets:["category_id","supplier_country","verification_tier","price_band"]}` |
| Quick filter chips | `GET {PAYLOAD}/api/industry-channels?limit=20` |

### 2.2 — Category page `/category/[slug]`, `/category/[slug]/[sub]`
| Need | Endpoint |
|---|---|
| Category metadata | `GET {API}/store/product-categories?handle=:slug&fields=id,name,handle,parent_category,category_children` |
| Category content overlay (i18n hero, long description) | `GET {PAYLOAD}/api/category-content?where[medusaCategoryId][equals]=:id&locale=:locale&limit=1` |
| Products in category | `GET {API}/store/products?category_id=:id&limit=24` |
| Sub-categories navigation | derived từ `category.category_children` ở response trên |
| Banner riêng cho category | `GET {PAYLOAD}/api/banners?where[targetType][equals]=category&where[targetValue][equals]=:id&where[_status][equals]=published` |
| Featured suppliers in category | `GET {API}/store/suppliers?category=:slug&limit=8&verification_tier_min=3` |

### 2.3 — Product detail `/product/[id]`
| Need | Endpoint |
|---|---|
| Commerce info (giá, variant, MOQ, stock, supplier_id, tax, shipping_options) | `GET {API}/store/products/:id?fields=*variants,*options,*images,supplier_id,moq_quantity,unit_code,customs_hs_code,base_price_minor,base_currency,lead_time_days_min,lead_time_days_max` |
| Marketing content overlay (long-form HTML, video URL, spin 360) | `GET {PAYLOAD}/api/product-content?where[medusaProductId][equals]=:id&locale=:locale&depth=2&limit=1` *(TODO: collection chưa có trong R15, cần thêm)* |
| Related products | `GET {API}/store/products?category_id=:cat&exclude=:id&limit=8` |
| Supplier card | `GET {API}/store/suppliers/:supplier_id?fields=display_name,country_code,verification_tier,rating_overall,response_rate_pct,years_in_business` |
| Reviews summary | `GET {API}/store/products/:id/reviews-summary` *(TODO Domain 13)* |
| Media gallery (extra videos, 360°, AR) | `GET {API}/store/products/:id/media` *(TODO Domain 27)* |
| Track view | `POST {API}/store/products/:id/view` (fire-and-forget; record `view_count` + `user_behavior_event`) *(TODO)* |

### 2.4 — Product reviews `/product/[id]/reviews`
| Need | Endpoint |
|---|---|
| Reviews list paginated | `GET {API}/store/products/:id/reviews?page=:page&per_page=10&sort=:sort` *(TODO Domain 13)* |
| Aggregate scores (1-5 distribution) | `GET {API}/store/products/:id/reviews-summary` |
| Submit review | `POST {API}/store/products/:id/reviews` (auth required) |

### 2.5 — Search `/search?q=...`
| Need | Endpoint |
|---|---|
| Full-text search results | `POST {API}/store/search` body `{q, locale, filters, facets, sort, page, per_page}` *(R21)* |
| Autocomplete dropdown | `GET {API}/store/search/autocomplete?q=:q&locale=:locale` ✅ R21 |
| Track click on suggestion | `POST {API}/store/search/track-click` body `{query, suggestion_type, suggestion_value, position, ...}` ✅ R21 |
| Trending terms (empty state) | `GET {API}/store/search/trending?locale=:locale&period=24h&limit=10` ✅ R21 |
| Did you mean | included trong autocomplete response (type=`did_you_mean`) ✅ R21 |
| Save search | `POST {API}/store/saved-searches` *(TODO Domain 33)* |

### 2.6 — Visual search `/search/by-image`, `/search/visual`
| Need | Endpoint |
|---|---|
| Upload ảnh + search | `POST {STOREFRONT}/api/search/visual-upload` (multipart) → Next.js proxy → `POST {API}/store/search/visual/from-upload` ✅ R21 |
| Search bằng URL ảnh | `POST {API}/store/search/visual` body `{image_url, locale, limit, filter_category_id}` ✅ R21 |

---

## 3. Suppliers

### 3.1 — Suppliers listing `/suppliers`
| Need | Endpoint |
|---|---|
| Supplier list (filterable, paginated) | `GET {API}/store/suppliers?country=:country&tier_min=:tier&category=:cat&limit=24` |
| Facets | `POST {API}/store/search` với `type:"supplier"` |

### 3.2 — Supplier detail `/supplier/[slug]`
| Need | Endpoint |
|---|---|
| Supplier profile | `GET {API}/store/suppliers/by-slug/:slug?fields=display_name_i18n,description_i18n,country_code,city,verification_tier,rating_overall,total_reviews,years_in_business,annual_revenue_bracket,employee_count_bracket,certifications,tags,logo_url,cover_image_url,intro_video_url,vr360_com_id,response_rate_pct,on_time_shipping_pct` |
| Supplier products | `GET {API}/store/products?supplier_id=:id&limit=24&page=:page` |
| Supplier site pages (showroom Domain 12) | `GET {API}/store/supplier-sites/:id/pages` *(TODO ánh xạ `supplier_site` schema 23)* |
| Site builder blocks render | `GET {API}/store/supplier-sites/:id/pages/:page_slug` *(TODO)* trả structured blocks; storefront render từ `site_blocks` |
| Brand kit (colors, fonts) | `GET {PAYLOAD}/api/supplier-brand-kits?where[supplierId][equals]=:id&limit=1` *(TODO collection chưa register)* |
| Reviews | `GET {API}/store/suppliers/:id/reviews?page=:page` |
| Follow / Unfollow | `POST {API}/store/suppliers/:id/follow` / `DELETE` (auth required) |
| Contact form / inquiry | `POST {API}/store/inquiries` body `{supplier_id, subject, message, attachments}` *(TODO Domain 11)* |

### 3.3 — Industry channels `/industry-channels`, `/zone/[slug]`, `/zones`
| Need | Endpoint |
|---|---|
| Channels list | `GET {PAYLOAD}/api/industry-channels?sort=displayOrder&locale=:locale` |
| Single channel detail | `GET {PAYLOAD}/api/industry-channels?where[slug][equals]=:slug&depth=2&locale=:locale&limit=1` |
| Zones list | `GET {PAYLOAD}/api/zones?sort=displayOrder&locale=:locale` |
| Zone detail | `GET {PAYLOAD}/api/zones?where[slug][equals]=:slug&depth=2&locale=:locale&limit=1` |
| Featured suppliers in zone | `GET {API}/store/suppliers?zone=:slug&limit=12` |

---

## 4. RFQ / Buying Request

### 4.1 — `/buying-request` (public form before signup)
| Need | Endpoint |
|---|---|
| Create RFQ (anonymous → trigger signup) | `POST {API}/store/rfqs` body `{title_i18n, description_i18n, category_id, target_quantity, unit_code, budget_min_usd_minor, budget_max_usd_minor, desired_port, urgency, target_supplier_country_codes, target_verification_tier_min, attachment_urls}` |
| Upload attachment (presigned URL) | `POST {API}/store/media/upload-ticket` *(R19)* |

### 4.2 — `/buyer-center/post-rfq` (authenticated)
Same as 4.1 but kèm `Authorization` header → backend auto-bind `buyer_id` từ session.

### 4.3 — Buyer center RFQs list `/buyer-center/orders` (orders + RFQs)
| Need | Endpoint |
|---|---|
| My RFQs | `GET {API}/store/rfqs?customer=me&status=:status&limit=20&page=:page` *(R19 SDK)* |
| My orders | `GET {API}/store/orders?customer=me&status=:status&limit=20` |
| Orders + RFQs combined feed | merge ở storefront (2 parallel fetches) |

---

## 5. Buyer Center (Authenticated)

| Page | Endpoint(s) |
|---|---|
| `/buyer-center` (dashboard) | `GET {API}/store/me`, `GET {API}/store/rfqs?customer=me&limit=5`, `GET {API}/store/orders?customer=me&limit=5` |
| `/buyer-center/audited-reports` | `GET {API}/store/vn-sourcing/audit-reports?customer=me&limit=20` *(TODO Domain 39)* |
| `/buyer-center/browsing-history` | `GET {API}/store/users/me/browsing-history?limit=50` *(TODO Domain 23)* + localStorage merge |
| `/buyer-center/contact` | Form → `POST {API}/store/support/tickets` body `{subject, category, body, attachments}` *(TODO Domain 19)* |
| `/buyer-center/favorites` | `GET {API}/store/users/me/favorites?type=:type&limit=24` *(TODO Domain 13)* |
| `/buyer-center/meet-suppliers` | `POST {API}/store/vn-sourcing/factory-visits` *(R16 SDK)* |
| `/buyer-center/new-user-guide` | Static + `GET {PAYLOAD}/api/help-articles?where[category][equals]=getting_started&where[audience][in][]=buyer` |
| `/buyer-center/orders` | List as above |
| `/buyer-center/post-rfq` | Form → POST RFQ |
| `/buyer-center/product-directory` | `GET {API}/store/products?fields=...&supplier_in=:followed_ids` |
| `/buyer-center/secured-trading` | `GET {API}/store/escrows?customer=me&status=:s` *(R16 SDK)* |
| `/buyer-center/supplier-discover` | `POST {API}/store/search` với `type:"supplier"` + AI rec `POST {API}/store/ai/rfq-match` |

---

## 6. Seller Center (Authenticated supplier)

| Page | Endpoint(s) |
|---|---|
| `/seller-center` (dashboard) | `GET {API}/store/me`, `GET {API}/admin/suppliers/:id/scorecard`, `GET {API}/admin/orders?supplier=:id&limit=5` |
| `/seller-center/ai-assistant` | Chat → `POST {API}/store/ai/chat` (uses `ai_platform` module) |
| `/seller-center/ai-livestream` | `GET {API}/admin/ai-livestream/personas`, `/scripts`, `/schedules`, `/ledger` ✅ R22 |
| `/seller-center/domestic-cn` | `GET {API}/admin/suppliers/:id/channels?market=cn-domestic` *(TODO Domain 39)* |
| `/seller-center/export-na` | `GET {API}/admin/suppliers/:id/channels?market=north-america` *(TODO)* |
| `/seller-center/gold-member` | Page giới thiệu + `POST {API}/store/subscriptions/upgrade` body `{plan:"gold"}` |
| `/seller-center/logistics` | `GET {API}/admin/shipments?supplier=:id&limit=20` *(R16 fulfillment-pro)* |
| `/seller-center/smart-expo` | `GET {PAYLOAD}/api/trade-shows?sort=startDate&locale=:locale` |
| `/seller-center/trade-ehome` | `GET {API}/admin/supplier-sites/:id` *(TODO Domain 12)* |
| `/seller-center/trade-services` | `GET {API}/admin/vn-sourcing/service-vendors` *(TODO Domain 39)* |
| `/seller-center/trading-service` | Static + form `POST {API}/store/service-engagements` |

---

## 7. Live Commerce

### 7.1 — `/live/ai/[id]` (AI livestream viewer)
| Need | Endpoint |
|---|---|
| Audio tracks per locale | `GET {API}/store/ai-livestream/:id/audio-tracks` ✅ R22 |
| Send chat to AI host | `POST {API}/store/ai-livestream/:id/chat` body `{message, locale}` ✅ R22 |
| Persona detail | `GET {API}/store/ai-livestream/personas/:id?locale=:locale` *(TODO route chưa có)* |
| Subscribe realtime events (transcript, AI replies) | WebSocket `wss://api.huayuesc.vn/ws/livestream/:id` *(TODO — hiện tại Redis pub/sub backend; cần WebSocket bridge)* |

### 7.2 — Human livestream (chưa có route storefront)
| Need | Endpoint |
|---|---|
| Live now list | `GET {API}/store/livestreams/live-now` *(R19 SDK đã define)* |
| Upcoming | `GET {API}/store/livestreams/upcoming?limit=20` |
| Get stream | `GET {API}/store/livestreams/:id` |
| Follow | `POST {API}/store/livestreams/:id/follow` |

---

## 8. Auth & Account

| Action | Endpoint | Method |
|---|---|---|
| Login | `POST {STOREFRONT}/api/auth/login` body `{identifier, password, otp?}` ✅ R19 |
| Logout | `POST {STOREFRONT}/api/auth/logout` ✅ R19 |
| Register buyer | `POST {STOREFRONT}/api/auth/register` body `{...account_type:"buyer"}` ✅ R19 |
| Register supplier | same với `account_type:"supplier"` |
| Register dealer | same với `account_type:"dealer"` |
| OTP verify | `POST {STOREFRONT}/api/auth/verify-otp` ✅ R19 |
| Refresh session | `POST {STOREFRONT}/api/auth/refresh` ✅ R19 |
| Password reset | `POST {STOREFRONT}/api/auth/password-reset` (request + confirm) ✅ R19 |
| Get current user | `GET {STOREFRONT}/api/me` ✅ R19 |
| Update profile | `PATCH {API}/store/users/me` *(TODO)* |
| Change password | `POST {API}/store/users/me/password` *(TODO)* |
| Enroll MFA | `POST {API}/store/users/me/mfa/enroll` *(TODO Domain 30)* |
| List sessions | `GET {API}/store/users/me/sessions` *(TODO)* |
| Revoke session | `DELETE {API}/store/users/me/sessions/:id` *(TODO)* |

---

## 9. Cart & Checkout (Domain 4 — chưa có UI route nhưng schema sẵn)

| Action | Endpoint |
|---|---|
| Get cart | `GET {API}/store/carts/:id?fields=*items,shipping_address,billing_address,shipping_methods` (Medusa native) |
| Create cart | `POST {API}/store/carts` body `{region_id, sales_channel_id, currency_code}` |
| Add item | `POST {API}/store/carts/:id/line-items` |
| Update qty | `POST {API}/store/carts/:id/line-items/:line_id` body `{quantity}` |
| Remove item | `DELETE {API}/store/carts/:id/line-items/:line_id` |
| Add shipping address | `POST {API}/store/carts/:id/shipping-address` |
| Add payment session | `POST {API}/store/carts/:id/payment-sessions` |
| Complete cart (place order) | `POST {API}/store/carts/:id/complete` |

**Note**: Cart flow dùng Medusa v2 native; custom `cart_supplier_group` table (Q-D1.4) chưa implement integration.

---

## 10. Payment (Domain 6, 35)

| Action | Endpoint |
|---|---|
| Get payment methods (theo country/currency) | `GET {API}/store/payment/methods?country=:c&currency=:cur` *(R16 SDK)* |
| Initiate payment | `POST {STOREFRONT}/actions/initiate-payment` (server action) → `POST {API}/store/payment/initiate` *(R16)* |
| Webhook Stripe | `POST {API}/webhooks/stripe` ✅ R17 |
| Webhook VNPay | `GET {API}/webhooks/vnpay` ✅ R17 |
| Webhook MoMo | `POST {API}/webhooks/momo` ✅ R17 |
| Webhook ZaloPay | `POST {API}/webhooks/zalopay` ✅ R17 |
| Get escrow detail | `GET {API}/store/escrows/:id` *(R16 SDK)* |
| List milestones | `GET {API}/store/escrows/:id/milestones` *(R16 SDK)* |
| Mark milestone ready | `POST {API}/store/milestones/:id/ready` body `{evidence:{}}` |
| Approve release | `POST {API}/store/milestones/:id/release` |

---

## 11. VN Sourcing (Domain 39)

| Action | Endpoint |
|---|---|
| List interpreters | `GET {API}/store/vn-sourcing/interpreters?language=:l&specialty=:s` *(R16 SDK)* |
| Book interpreter | `POST {API}/store/vn-sourcing/interpreter-sessions` body `{interpreter_id, scheduled_start_at, duration_minutes, mode, context_type, currency}` ✅ R16 |
| Schedule factory visit | `POST {API}/store/vn-sourcing/factory-visits` body `{supplier_id, scheduled_date, attendees, agenda, interpreter_session_id}` ✅ R16 |
| Request sample | `POST {API}/store/vn-sourcing/samples` ✅ R16 |
| Freight quotes | `GET {API}/store/vn-sourcing/freight-quotes?origin_country=:o&dest_country=:d&container_type=:t&weight_kg=:w` ✅ R16 |
| Audit report list | `GET {API}/store/vn-sourcing/audit-reports?supplier_id=:id` *(TODO)* |
| MOU contract | `GET/POST {API}/store/vn-sourcing/mou` *(TODO)* |

---

## 12. Trade Alerts & CMS Content

| Page | Endpoint |
|---|---|
| `/trade-alert` (subscribe form) | `POST {STOREFRONT}/actions/subscribe-trade-alert` (server action) → Payload mutation `POST {PAYLOAD}/api/trade-alert-subscriptions` (CORS-safe vì server action) ✅ R19 |
| `/trade-shows` listing | `GET {PAYLOAD}/api/trade-shows?where[startDate][greater_than]=:today&sort=startDate&locale=:locale&limit=12&page=:page` |
| `/trade-shows/[slug]` detail | `GET {PAYLOAD}/api/trade-shows?where[slug][equals]=:slug&depth=2&locale=:locale&limit=1` |
| `/factory-tour` | `GET {PAYLOAD}/api/tour-packages?where[_status][equals]=published&sort=priceFromUsd&locale=:locale&limit=20` |
| Blog list `/info/industry-news` | `GET {PAYLOAD}/api/blog-articles?sort=-publishedAt&page=:page&locale=:locale` |
| Blog detail | `GET {PAYLOAD}/api/blog-articles?where[slug][equals]=:slug&depth=2&locale=:locale&limit=1` |

---

## 13. Webhook revalidation (Payload → Storefront)

| Event in Payload | Triggers | Storefront endpoint |
|---|---|---|
| Banner published | `revalidateTag('banners')` | `POST {STOREFRONT}/api/webhooks/payload-revalidate` body `{collection:"banners"}` ✅ R19 |
| Blog article published | `revalidatePath('/info/industry-news/:slug')` | same với `{collection:"blog-articles", slug:":slug"}` |
| Page published | `revalidatePath('/:slug')` | `{collection:"pages", slug:":slug"}` |
| Navigation/Footer/SiteSettings | `revalidateTag('navigation'/'footer'/'site-settings')` | same |

---

## 14. Admin endpoints (cho seller-center + ops)

### Used by storefront seller-center
| Need | Endpoint |
|---|---|
| AI livestream personas CRUD | `GET/POST {API}/admin/ai-livestream/personas` ✅ R22 |
| Scripts CRUD | `GET/POST {API}/admin/ai-livestream/scripts` ✅ R22 |
| Schedules | `GET/POST {API}/admin/ai-livestream/schedules` ✅ R22 |
| Start AI stream | `POST {API}/admin/ai-livestream/:id/start` body `{script_id, persona_id, locales}` ✅ R22 |
| Pause/Stop | `POST {API}/admin/ai-livestream/:id/pause?stop=true|false` ✅ R22 |
| Cost ledger | `GET {API}/admin/ai-livestream/ledger?stream_id=:id&from=:d&to=:d` ✅ R22 |

### Used by Payload sync hooks
| Need | Endpoint |
|---|---|
| Sync category content from Payload | `PUT {API}/internal/categories/:id/content` (header `x-internal-token`) ✅ R17 |
| Sync supplier site metadata | `PUT {API}/internal/suppliers/:id/site-metadata` ✅ R17 |
| Push Payload audit event | `POST {API}/internal/audit/payload` ✅ R17 |

---

## 15. Realtime / WebSocket (TODO — chưa setup)

| Channel | Protocol | Auth |
|---|---|---|
| Livestream chat fanout | WebSocket `/ws/livestream/:id` | session cookie |
| Conversation message sync | WebSocket `/ws/conversations/:id` | session cookie |
| Notification push | WebSocket `/ws/notifications` | session cookie |
| Live stream viewer count update | SSE `/sse/livestream/:id/viewers` | none |

**Backend infrastructure**: Redis Pub/Sub đã có (R16 communication module). Cần thêm WebSocket server (Socket.IO hoặc native ws) wrap quanh Redis pub/sub.

---

## 16. Trạng thái endpoint — Inventory

### ✅ Đã implement (in `medusa/src/api/`)
- `/store/search/autocomplete`, `/visual`, `/visual/from-upload`, `/trending`, `/track-click` (R21)
- `/store/ai-livestream/:id/audio-tracks`, `/chat` (R22)
- `/admin/ai-livestream/personas`, `/scripts`, `/schedules`, `/:id/start`, `/:id/pause`, `/ledger` (R22)
- `/webhooks/stripe`, `/vnpay`, `/momo`, `/zalopay`, `/sendgrid`, `/twilio`, `/cdc/debezium` (R17)
- `/internal/categories/:id/content`, `/internal/suppliers/:id/site-metadata`, `/internal/audit/payload` (R17)

### ⚠️ Storefront expects (SDK đã define ở R19) nhưng route chưa exist
| SDK call | Cần tạo route | Module backend |
|---|---|---|
| `rfqApi.list/get/create` | `/store/rfqs` (CRUD) | R16 `rfq` module |
| `supplierApi.list/get/getBySlug/follow` | `/store/suppliers/*` | R16 `marketplace` module |
| `productApi.search/buyBox/related` | `/store/products/*` extensions | R16 `catalog-ext` |
| `orderApi.list/get/cancel/requestReturn` | `/store/orders/*` extensions | R16 + Medusa native |
| `escrowApi.*` | `/store/escrows/*` | R16 `escrow` module |
| `paymentApi.methods/initiate` | `/store/payment/*` | R16 `payment-abstract` |
| `livestreamApi.liveNow/upcoming/get/follow` | `/store/livestreams/*` | R16 `live-commerce` |
| `aiApi.translateProduct/visualSearch/translateChat/recommendSuppliers` | `/store/ai/*` | R16 `ai-platform` |
| `communicationApi.*` | `/store/conversations/*` | R16 `communication` |
| `vnSourcingApi.*` | `/store/vn-sourcing/*` | R16 `vn-sourcing` |
| `notificationApi.*` | `/store/notifications/*` | R16 `notification-bus` |
| `mediaApi.requestUpload` | `/store/media/upload-ticket` | R16 `media-layer` |

**Estimate**: ~12 module × ~5 endpoints = **~60 route handlers** cần wire từ service layer (services đã có sẵn).

### 🆕 Cần thêm vào Payload (chưa register trong R15 config)
- `VisaApplication` collection
- `HotelBooking` collection
- `EmailCampaign` collection
- `SupplierBrandKit` collection
- `product_content` collection (overlay marketing cho product)
- `supplier_site_page` collection (nếu muốn Payload manage thay vì PG `supplier_site`)

---

## 17. Quy ước contract testing

Mỗi endpoint trong file này nên có:
1. **OpenAPI spec** trong `docs/openapi/<domain>.yaml` (chưa tạo — TODO khi backend implement)
2. **Postman/Insomnia collection** import được trong `docs/postman/csr.json` (TODO)
3. **Integration test** trong `medusa/integration-tests/<endpoint>.test.ts` (TODO)
4. **Storefront e2e test** trong `storefront/e2e/<page>.spec.ts` (Playwright)

---

## 18. Versioning policy

- API version trong URL prefix: hiện tại không có (`/store/...`). Nếu cần breaking changes → thêm `/v2/store/...`
- Deprecation: header `Sunset: Mon, 1 Jan 2027 00:00:00 GMT` với endpoints cũ
- Breaking field changes: thêm field mới, không xóa cũ trong 90 ngày
- Storefront SDK version theo `package.json` của storefront; bump major khi backend breaking

---

## 19. Rate limiting (per IP / per user)

| Endpoint group | Limit |
|---|---|
| Public `/store/*` (read) | 600/min/IP |
| Authenticated `/store/*` (write) | 60/min/user |
| Auth flows (`/api/auth/*`) | 10/min/IP |
| Search autocomplete | 60/min/IP |
| Visual search | 10/min/user |
| AI chat livestream | 30/min/user |
| Webhook ingress | unlimited (signature verified) |

Backend implementation: Redis-based bucket trong middleware (TODO).

---

## 20. Cách team frontend dùng file này

1. **Trước mỗi sprint**: review page nào sẽ build, check endpoint tương ứng có ở mục 1-14 chưa
2. **Endpoint chưa có**: mở Issue gắn label `backend:needed` + tag tech-lead — backend team add vào sprint
3. **Endpoint đã ✅**: frontend dùng SDK trong `storefront/src/lib/sdk/<module>/` (R19), không gọi fetch trực tiếp
4. **Mock data**: trong khi chờ backend, dùng `storefront/src/lib/mock/<endpoint>.ts` trả static JSON theo schema spec ở mục tương ứng
5. **Breaking change**: backend phải notify ít nhất 1 sprint trước, document trong CHANGELOG

## 21. Cách team backend dùng file này

1. **Trước implement**: copy section endpoint sang issue, ghi rõ request/response shape + edge cases
2. **Implement**: tạo route trong `medusa/src/api/<...>/route.ts`, gọi service R16 module
3. **Verify**: chạy `curl` ví dụ trong section tương ứng, response match contract
4. **Update file này**: đánh dấu ✅ ở mục 16 inventory
5. **Notify**: post Slack `#csr-api` khi endpoint xong + link contract section

---

## Phụ lục A — Mapping nhanh Page ↔ Endpoint ↔ Module backend ↔ Schema

| UI Page | Primary endpoint | Backend module | Schema source |
|---|---|---|---|
| Homepage hero | `GET /store/products` | Medusa native | `public.product` |
| Homepage banners | `GET PAYLOAD/api/banners` | Payload | `payload.banners` |
| Category page | `GET /store/product-categories` + `POST /store/search` | Medusa + search-platform | `public.product_category`, ES index |
| Product detail commerce | `GET /store/products/:id` | Medusa native | `public.product` |
| Product detail content | `GET PAYLOAD/api/product-content` | Payload (TODO) | `payload.product_content` |
| Supplier showroom | `GET /store/suppliers/:slug` + site pages | marketplace + site-builder | `identity.supplier`, `supplier_site.*` |
| RFQ form | `POST /store/rfqs` | rfq module | `rfq.rfq` |
| Live commerce | `GET /store/ai-livestream/:id/audio-tracks` | ai-livestream | `live.livestream_session`, `live.ai_*` |
| Search | `POST /store/search` | search-platform | ES + `search.*` |
| Visual search | `POST /store/search/visual` | search-platform + ai-platform | `ai.ai_embedding_doc` |
| Trade alert subscribe | server action → Payload | Payload | `payload.trade-alert-subscriptions` |
| Help center | `GET PAYLOAD/api/help-articles` | Payload | `payload.help-articles` |
| Buyer dashboard | `GET /store/rfqs?customer=me` + `/store/orders?customer=me` | rfq + Medusa | `rfq.rfq`, `public.order` |
| Seller AI livestream | `GET /admin/ai-livestream/*` | ai-livestream | `live.ai_*` |

---

**End of contract** — mọi thay đổi cần PR vào file này + được review bởi cả frontend lead và backend lead.
