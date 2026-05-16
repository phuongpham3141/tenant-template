# Sprint 9A Pha 1 — PARTIAL: D9 resolved, Cart + Buyer wires defer Pha 1b

**Ngày:** 2026-05-15
**Sprint:** 9A Pha 1 (partial — 1/3 backend wires complete)
**Status:** ⚠ PARTIAL — Bước 1 D9 done + tested; Bước 2-3 deferred

## What was done

| Bước | Hành động | Commit | Status |
|---|---|---|---|
| 0 | Git sync + Pha 0 v2 verify + reality reconciliation | — | ✅ Medusa stable 3/3 |
| 1 | D9 supplier-application module + endpoint + factory wire | `df7b9a5` | ✅ Tested HTTP 201 |
| 2 | Cart context backend integration | — | ⏳ Defer Pha 1b |
| 3 | 3 buyer-center backend wires | — | ⏳ Defer Pha 1b |
| 4 | Pha 1 partial report (this commit) | (next) | 🔄 |

## D9 Resolution (Bước 1)

### Backend
- `supplier_application` module với Mikro-ORM `model.define()` (D14 underscore convention)
- 30+ field schema: company info, address, contact, capacity, workflow, audit
- Migration `Migration20260516020514` auto-generated, applied
- `POST /store/supplier-applications` endpoint với:
  - Required fields validation (Vietnamese errors)
  - Email + phone format validation
  - Tenant từ `x-tenant-id` header (middleware enforce)
- Module registered trong `medusa-config.ts`

### Frontend
- `FactoryApplicationForm.tsx` client component (extracted from page.tsx)
- 17 form fields → API body mapping
- Vietnamese success + error messages
- Loading + error + success states

### Test result
```
POST /store/supplier-applications → HTTP 201
Body: {"id":"01KRQ8K070GZR51HRKREP4CH24","message":"Đã gửi đăng ký..."}
/register/factory → HTTP 200 + form rendered
```

## Plan deviations flagged (Rule 8 phụ)

### D14c — Sprint 6 form vs schema field mismatch
Plan paste schema có `tax_id`, `address`, `district` REQUIRED. Sprint 6 factory form KHÔNG collect 3 fields.
**Fix:** Schema adapted nullable + documented gap. Future Sprint may extend form.

### D15 — Mikro-ORM model default Date invalid SQL
`submitted_at: model.dateTime().default(new Date())` → JS Date toString dumped literal vào SQL → syntax error.
**Fix:** Remove default. Mikro-ORM auto-tạo `created_at` cùng purpose. Lesson cho future model.define usage.

### D16 — Pha 1 scope reality (atomic principle)
Plan paste includes Bước 1 (D9, 5-6h) + Bước 2 (Cart, 3-4h) + Bước 3 (3 buyer pages, 4-5h) = 12-15h.

**Reality (this session):**
- D15 unexpected → +30min debugging
- Mikro-ORM snapshot file commit 222K insertions (Rule 1 cùng turn requires)
- Bước 2 CartProvider rewrite = entire provider replacement + SDK update + CartContent + CartDrawer updates → high complexity
- Bước 3 3 buyer pages = 3 separate server fetch wires + Sprint 5 mockup data removal

→ Atomic principle: Bước 1 = standalone meaningful milestone (D9 resolved end-to-end). Bước 2-3 defer Pha 1b để maintain commit quality + avoid rushed work.

## Carry-over Pha 1b

⏳ **Bước 2 Cart context backend** (Sprint 5 carry-over):
- CartProvider rewrite useCart hook → Medusa /store/carts endpoints
- cart_id persist localStorage
- Add/update/remove line items
- CartContent + CartDrawer update render real items

⏳ **Bước 3 3 buyer pages wire** (Sprint 5 carry-over):
- /buyer-center/rfqs ← GET /store/rfqs
- /buyer-center/messages ← GET /store/conversations
- /buyer-center/profile ← GET /store/customers/me

## Sprint 9A Pha 1 commits (2 mới)

```
<this>  docs(sprint-09a): Pha 1 PARTIAL — D9 done, Cart+buyer defer Pha 1b
df7b9a5 feat: D9 supplier-application module + endpoint + factory wire
```

## HARD RULES Pha 1 partial compliance

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 6 — Schema qua migration | ✅ supplier_application |
| Rule 7 — Multi-layer audit | ✅ (Layer 1+1b+3 verified) |
| Rule 8 — Best-effort + no placeholder | ✅ |
| Rule 8 phụ — Plan deviation handling | ✅ D14c + D15 + D16 documented |
| Rule 9 — Tiếng Việt thuần | ✅ |

## Câu hỏi cho coordinator

1. **Approve D9 standalone milestone** + scope split Pha 1 → 1a (D9 done) + 1b (Cart + 3 buyer wires)?
2. **Pha 1b trigger** ngay hay defer Pha 2 (admin views)?
3. **D15 lesson codify** — future model.define() KHÔNG dùng `.default(new Date())`?

## Next

Coordinator review → quyết định Pha 1b vs Pha 2 priority.

D9 end-to-end functional. Factory applications giờ có thể được submitted + saved trong DB.
