# Sprint 9A Pha 1b v2 — Cart Hybrid wire — XONG

**Ngày:** 2026-05-15
**Sprint:** 9A Pha 1b v2 (REVISED scope sau D17 + D18 escalation)
**Commits:** 2 mới (Cart wire + this report)

## Status

✅ Pha 1b v2 hoàn tất. Sprint 5 critical buyer flow gap closed.
✅ Strategy β Hybrid implemented thành công, KHÔNG break Sprint 5 B2B logic.

## Phạm vi hoàn thành (REVISED)

| Bước | Hành động | Trạng thái |
|---|---|---|
| 0 | Git sync + Pha 1a verify + L14 Endpoint pre-flight | ✅ |
| 1 | Build Medusa cart SDK (204 lines, 9 methods) | ✅ |
| 2 | Extend CartProvider với sync layer (261 lines) | ✅ |
| 3 | Smoke test cart flow + D9 regression | ✅ |
| 4 | Commit + Pha 1b v2 report | ✅ |

**Scope trimmed từ Pha 1b v1:**
- Cart only (defer 3 buyer wires Pha 1c NEW)
- Strategy β Hybrid (defer α/γ options)

## L14 Pre-flight check (NEW pattern applied)

```
POST /store/carts          → HTTP 200 (cart_01KRQC83QCSHX6FWV8G8QXR4GB)
GET  /store/carts/:id      → HTTP 200
POST /store/carts/:id/line-items → HTTP 400 (variant validation works)
Required header: x-tenant-id (middleware enforce)
```

→ 3/3 cart endpoints functional. Cart wire khả thi.

## Deliverables

### Medusa Cart SDK (`src/lib/sdk/medusa-cart/index.ts`, 204 lines)

9 methods:
- `createMedusaCart(regionId?)` — POST /store/carts
- `getMedusaCart(cartId)` — GET, return null if 404
- `ensureMedusaCart()` — load existing hoặc create new
- `addMedusaLineItem(variantId, quantity)` — POST line-items
- `updateMedusaLineItem(cartId, itemId, quantity)` — POST line-items/:id
- `removeMedusaLineItem(cartId, itemId)` — DELETE (idempotent với 404)
- `abandonMedusaCart()` — clear localStorage
- `getMedusaCartId()` / `clearMedusaCartId()` — utility

Error messages tiếng Việt Rule 9.

### CartProvider sync layer extension (261 lines, +176 từ 85)

Preserve:
- Sprint 5 B2B `CartItem` shape (supplierId, MOQ, BigInt prices)
- Wholesale single-supplier business rule
- localStorage `csr_cart_v1` (Sprint 5 key)
- useCart hook + 4 consumers unchanged interface

Add:
- `medusaCartId` state
- `syncStatus` state (idle/syncing/error)
- `lazySyncToMedusa(action)` debounce 500ms
- `ensureSynced()` flush pending + sync all items trước checkout
- `medusaLineItemId?` field trên CartItem để track Medusa line_item

Wholesale alert Vietnamese (was English Sprint 5):
- Old: "Wholesale cart only supports 1 supplier per checkout..."
- New: "Giỏ bán sỉ chỉ hỗ trợ 1 nhà cung cấp mỗi đơn. Vui lòng hoàn tất đơn hiện tại trước."

## Sprint 5 buyer flow gap status

| Step | Trước Pha 1b v2 | Sau Pha 1b v2 |
|---|---|---|
| 5 (Cart) | UI mockup only — KHÔNG persist server | ✅ Functional với Medusa sync (lazy 500ms) |
| 6 (Checkout) | UI only | UI + `ensureSynced()` ready khi navigate |

## Carry-over status sau Pha 1b v2

✅ Resolved:
- D9 supplier application (Pha 1a)
- D10 + D14 Medusa server (Pha 0 v2)
- D17 + D18 escalations resolved via β Hybrid strategy + Pha 1c split
- Cart Sprint 5 critical gap (Pha 1b v2)

⏳ Pha 1c NEW:
- Build `/store/rfqs` route handler (expose rfq module)
- Build `/store/conversations` route handler (expose communication module)
- Wire 3 buyer-center pages backend (rfqs/messages/profile)

⏳ Pha 2:
- Admin custom views (Supplier App + RFQ + AI Livestream)
- D7 Contact form Server Action + backend endpoint

⏳ Pha 3:
- Build /forgot-password + /reset-password (Sprint 7 plan never built)
- Sprint 9A close + push origin/cms

## Metrics

| Metric | Trước Pha 1b v2 | Sau Pha 1b v2 |
|---|---|---|
| Sprint 7 carry-over items | 5 | 4 |
| New SDK clients | 0 | 1 (medusa-cart) |
| Buyer flow functional | 6/8 UI | 7/8 (Step 5 functional) |
| Total lessons codified | 13 | 14 (+L14) |
| Sprint 9A commits | 7 | 8 (+Cart wire) |

## HARD RULES Pha 1b v2 compliance

| Rule | OK? |
|---|---|
| Rule 1 — File tracked commit cùng turn | ✅ |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 7 — Multi-layer audit | ✅ 4 layers + L14 pre-flight |
| Rule 8 — No placeholder | ✅ |
| Rule 8 phụ — Plan deviation handling | ✅ D17+D18 resolved via scope trim + β strategy |
| Rule 9 — Tiếng Việt thuần | ✅ wholesale alert + error messages dịch |

## Lessons applied

- **L9** verify reality (endpoint curl test)
- **L11** Layer 1b usage scan (4 useCart consumers reviewed)
- **L13** atomic split (Pha 1b → 1b v2 + 1c NEW)
- **L14 NEW** endpoint inventory pre-flight check (Bước 0b)

## Pha 1c plan (defer)

Build 2 endpoints + wire 3 buyer pages:
- `medusa/src/api/store/rfqs/route.ts` (expose rfq module via GET)
- `medusa/src/api/store/conversations/route.ts` (expose communication module)
- Wire `/buyer-center/rfqs` server fetch
- Wire `/buyer-center/messages` server fetch
- Wire `/buyer-center/profile` server fetch (Medusa built-in /store/customers/me)

Estimate: 8-12h.

## Pha 1b v2 cumulative commits Sprint 9A (8 trên cms)

```
<this>  docs(sprint-09a): Pha 1b v2 XONG report
f5c9e8b feat: Cart Hybrid wire β (Pha 1b v2)
661579d docs(sprint-09a): Pha 1 PARTIAL — D9 done
df7b9a5 feat: D9 supplier-application full stack (Pha 1a)
f49f81d docs(sprint-09a): Pha 0 v2 XONG (D10 + D14 RESOLVED)
7c4b675 fix(medusa): D14 rename 15 modules
a61ecff fix(medusa): D10 disable defineLink
```
