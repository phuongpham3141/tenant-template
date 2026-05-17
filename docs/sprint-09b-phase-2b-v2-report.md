# Sprint 9B Pha 2b v2 — PARTIAL (rfq + profile, defer messages Pha 2c) — DONE

**Ngày:** 2026-05-17
**Sprint:** 9B Pha 2b v2 (Option A Partial sau D21 escalation)
**Commits:** 4 mới (3 endpoints/UI + 2 wires) + 1 report
**HEAD:** `a646ddc` (8 commits Sprint 9B trên cms, ahead origin/cms 8)
**Status:** ✅ Pha 2b v2 partial deliver (5/7 bước), defer 2 bước Pha 2c (communication)

## Context

D21 escalation phát hiện communication module SAME Sprint 1 R20 era broken pattern (giống D19 rfq):
- service queries `participant_ids/type/archived/title/metadata` schema KHÔNG tồn tại
- 7+ column renames, 26 cols `conversation` + 20 cols `conversation_message` reality
- 0 rows existing (broken pattern never fired runtime)

Coordinator decision Option A: defer messages → Pha 2c NEW.

## What was done (5/7 bước)

| Bước | Hành động | Commit | Status |
|---|---|---|---|
| 0 | Git sync + Pha 1d-a v2 reverify + supplier_app check + mockup audit | — | ✅ |
| 1 | Build /store/rfqs route handlers (2 endpoints) | `9fb00ef` | ✅ |
| ~~2~~ | ~~Build /store/conversations~~ | — | ⏳ DEFER Pha 2c |
| 3 | Build /admin/rfqs API + UI (3 endpoints + page) | `05088ad` | ✅ |
| 4 | Wire /buyer-center/rfqs (new SDK + Server Component) | `501c134` | ✅ |
| ~~5~~ | ~~Wire /buyer-center/messages~~ | — | ⏳ DEFER Pha 2c |
| 6 | Wire /buyer-center/profile (Medusa built-in /store/customers/me) | `a646ddc` | ✅ |
| 7 | Smoke + Pha 2b v2 report | (this) | ✅ |

## Deliverables

### Backend Medusa — 5 new endpoints

```
GET  /store/rfqs                  — list buyer RFQs (filter status, pagination)
GET  /store/rfqs/:id              — detail (owner auth check)
GET  /admin/rfqs                  — admin list ALL RFQs
GET  /admin/rfqs/:id              — admin detail
POST /admin/rfqs/:id              — admin update status (workflow timestamps auto)
```

### Admin UI

- `/app/rfqs` — "Yêu cầu báo giá" (defineRouteConfig)
  - 8 status filter buttons (L19 enums)
  - Table: Mã + Tiêu đề (i18n) + Số lượng + Đơn vị + Mức độ + Ngày tạo + Trạng thái
  - vi-VN date format

### Frontend Storefront

- **NEW** `src/lib/sdk/rfqs/index.ts` (plural) — `rfqsApi.list()` + `.get()` với Pha 1d-a v2 types
  - KHÔNG conflict với `src/lib/sdk/rfq/` (singular, broken Sprint 1 R20 types) defer Pha 1d-b
- `/buyer-center/rfqs` Server Component wire — `await rfqsApi.list({ limit: 50 })`
  - 401 → redirect `/login?redirect=/buyer-center/rfqs`
  - 8 status badges với màu phân nhóm (muted/gold/success)
  - title_i18n.vi → .en → .cn fallback
  - Mobile responsive list view
- `/buyer-center/profile` Server Component wire — `await api(/store/customers/me)`
  - 401 → redirect `/login?redirect=/buyer-center/profile`
  - 3 sections: Cá nhân (real data) + Doanh nghiệp (metadata fallback) + Bảo mật (link /forgot-password)
  - Avatar = initial letter + fullName fallback

## Smoke results

### 5 endpoints (auth gate)
```
GET  /store/rfqs                  → HTTP 401 ✓
GET  /store/rfqs/:id              → HTTP 401 ✓
GET  /admin/rfqs                  → HTTP 401 ✓
GET  /admin/rfqs/:id              → HTTP 401 ✓
POST /admin/rfqs/:id              → HTTP 401 ✓
```

### Buyer-center pages (auth redirect)
```
GET /buyer-center/rfqs            → HTTP 307 ✓
GET /buyer-center/profile         → HTTP 307 ✓
GET /buyer-center/messages        → HTTP 307 ✓ (mockup unchanged, Pha 2c defer)
```

### Defer (Pha 2c)
```
GET /store/conversations          → HTTP 404 ✓ (chưa build)
```

### Regression Sprint 9A + Pha 1d-a v2
```
POST /store/supplier-applications → HTTP 201 ✓
POST /store/carts                  → HTTP 200 ✓
POST /store/contact                → HTTP 200 ✓
```

### Stability
```
5/5 health checks HTTP 200 ✓
```

## Sprint 9A deferred items — 3/4 resolved sau Pha 2b v2

| Item | Status |
|---|:-:|
| D17 `/store/rfqs` endpoint missing | ✅ Pha 2b v2 Bước 1 |
| D19 rfq module broken | ✅ Pha 1d-a v2 (root fix) |
| Admin RFQ view | ✅ Pha 2b v2 Bước 3 |
| `/buyer-center/messages` wire | ⏳ Pha 2c (D21 communication broken) |
| `/buyer-center/profile` wire | ✅ Pha 2b v2 Bước 6 |
| `/buyer-center/rfqs` wire | ✅ Pha 2b v2 Bước 4 |

→ **5/6 deferred items resolved.** Còn 1 ⏳ messages (D21 cascade).

## Pha 2c plan NEW (defer flexible, sau Pha 3 hoặc trước)

Pattern repeat Pha 1d-a v2 cho communication module:
- Bước 0: Layer 0 STRICT audit (L16+L17+L18+L19 FULL) — 13+ tables communication + 3 CHECK enum sets
- Bước 1: Backup + migration (sequences nếu cần)
- Bước 2: Rewrite types.ts (subject_i18n + body_i18n jsonb shape, snake_case)
- Bước 3: Rewrite service.ts methods raw-SQL pattern (queryT/withTenant)
- Bước 4: Build + cascade stub strategy (workflows/jobs/subs)
- Bước 5: Functional SQL INSERT test
- Bước 6: Build /store/conversations route handlers
- Bước 7: Wire /buyer-center/messages page (split layout)
- Bước 8: Commit + Pha 2c report

**Estimate:** 8-10h.

## Multi-layer audit confirmed

| Layer | Check | Result |
|---|---|---|
| 0 Sprint 9A regression | 3/3 endpoints `csr` canonical | ✅ |
| 1 rfq service signatures | Pha 1d-a v2 raw-SQL signature match | ✅ |
| 1b storefront SDK cascade | rfq SDK cũ broken + rfqs SDK mới = parallel coexist | ✅ |
| 1b actions/rfq.ts | broken Sprint 1 R20 references — defer Pha 1d-b | ⏳ |
| 1b communication module | D21 confirmed → defer Pha 2c | ⏳ |
| 3 Pre-flight 5 endpoints | HTTP 401 ✅ |
| 3 Pre-flight 2 pages | HTTP 307 ✅ |
| Regression | Sprint 9A + Pha 1d-a v2 endpoints | ✅ |

## HARD RULES Pha 2b v2 compliance

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ 4 commits atomic |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 7 — Multi-layer audit | ✅ Layer 0+1+1b+3 |
| Rule 8 — No placeholder | ✅ Pha 2c TODO documented |
| Rule 8 phụ — Plan deviation handling | ✅ D21 + Option A + L20+L21 codified |
| Rule 9 — Tiếng Việt thuần | ✅ |

## Lessons applied Pha 2b v2

- **L9** verify reality (Pha 1d-a v2 service signature reverify Bước 0)
- **L11** Layer 1b usage scan (mockup data shape, rfq SDK cascade)
- **L13** atomic split (defer Bước 2 + 5 vào Pha 2c)
- **L14** endpoint pre-flight check (HTTP 401 trước commit each bước)
- **L17** cascade audit (rfq SDK cũ + actions/rfq.ts → keep parallel với SDK mới rfqs/)
- **L19** Enum + CHECK + FK audit (status enums match schema 8 values)
- **L20** Sprint 1 R20 era architectural debt (communication D21 confirms pattern)
- **L21** Multi-module audit (D19 rfq → D21 communication discovered sequential, không tránh được vì 2 modules separate scope)

## Metrics

| Metric | Trước Pha 2b v2 | Sau Pha 2b v2 | Δ |
|---|---|---|---|
| Sprint 9A deferred items | 6 (Pha 1c 3 + Pha 2 RFQ + Pha 2 2 wires) | 1 (chỉ messages) | -5 |
| Backend custom endpoints | 14 | 19 (+5) | +36% |
| Admin custom UI pages | 3 | 4 (+1 RFQ) | +33% |
| SDK clients storefront | 16 | 17 (+rfqs plural) | +6% |
| Buyer-center functional pages | 5 | 7 (+rfqs + profile) | +40% |
| Sprint 9B commits cumulative | 4 (Pha 1d-a v2) | 8 (+4 Pha 2b v2) + report | +100% |
| Lessons cumulative | 21 (L20+L21 codified Pha 2b prep) | 21 (no new) |

## Sprint 9B status

| Pha | Status | Estimate |
|---|---|---|
| Pha 1d-a v2 | ✅ DONE | 7h actual |
| Pha 2b v2 | ✅ DONE (Option A Partial) | 4h actual |
| Pha 2c | ⏳ NEW deferred flexible (communication rewrite) | 8-10h |
| Pha 1d-b | ⏳ deferred flexible (quote workflow + cascade) | 4-6h |
| Pha 3 | ⏳ Sprint 8 mig + Proxmox staging deploy + Sprint 4+5 UX | 10-15h |
| Close + push | ⏳ cuối Sprint 9B | — |

## Next priority (coordinator quyết)

**Option 1 (RECOMMENDED): Pha 3 NEXT**
- Hoàn thành Sprint 9B objectives chính (Sprint 8 mig + Proxmox)
- Pha 2c + Pha 1d-b defer Sprint 10+
- Sprint 9B close cleaner

**Option 2: Pha 2c NEXT**
- Resolve D21 communication broken
- /buyer-center/messages wire functional
- Sprint 9A deferred items 100% resolved
- Pha 3 sau

## Files báo cáo

- `tenant-template/docs/sprint-09b-phase-2b-v2-report.md` (this commit)
- `CMS/P9B-PHA1D-A-v2-DONE.md` (Pha 1d-a v2)
- `CMS/P9B-PHA1D-ESCALATE-D20.md` + `P9B-PHA1D-A-ESCALATE-D20A-EXPANDED.md` (D20)
- `CMS/P9B-PHA2B-ESCALATE-D21.md` (D21)
- `CMS/P9B-PHA2B-v2-DONE.md` (sắp viết)
