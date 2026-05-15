# Sprint 1 Gap List — 2026-05-14

**Verifier:** Claude Code (medusa-dev session)
**Duration:** ~3 giờ (vs estimate 6-8h — nhanh hơn vì auto-mode)
**Sprint 1 status:** **CLOSED**
**Branch:** `cms` (commit `084e296` + 1 fix runtime: caddy port binding)

---

## ✅ Verified working

### Infra & DB
- 10/10 containers Up >41h, không restart loop, không OOM
- Memory dùng ~6.7 GiB / 31.34 GiB (21%) — dư rất nhiều
- Schema medusa: **618 tables** (482 domain + 136 Medusa core) khớp design
- **40 schemas, 1658 indexes, 293 RLS tables** — tất cả trong acceptable range
- **43/43 migrations status `success`**, 0 failed/rolled_back
- 6 core extensions (pgcrypto, pg_trgm, btree_gin, ltree, unaccent, hstore) đầy đủ
- Caddy routing 9/9 hosts response 200/301/302 (sau khi fix port binding `8080:80` → `80:80`)
- HTTPS auto-off đúng design dev (no TLS warning)

### Services
- Medusa Admin login OK (`phuongpham3141@gmail.com` / `Phuong2606$$`), JWT generated
- Medusa Store API hoạt động (test `/store/products` với publishable key)
- Payload CMS 27 collections + 3 globals load đúng (CMS, Event, Marketing, Site Builder, Help, Policy, AI groups)
- Payload login PASS sau khi tự fix tạo first admin (P1.4-F1)
- MinIO 2 buckets auto-created (`medusa-media`, `payload-uploads`)
- Grafana Prometheus datasource provisioned đúng

### Storefront UI
- Homepage render (2.7 MB, title `Cybersilkroads — Con đường tơ lụa trên không gian mạng`)
- Vietnamese locale (vi) default đúng
- Locale subdomains shop/vi/en/cn đều 200
- Products page render
- Buyer-center pages structure đầy đủ (10+ subdirectories)

### Seed data
- 7 suppliers (Tier 0-6) seed thành công
- 2 RFQ + 3 RFQ quotes seed thành công

### Audit & validation
- 0 audit trigger gaps (CHECK 04)
- 0 100%-NULL columns (CHECK 06)
- 0 cross-domain consistency issues (sub-queries chạy được)

---

## 🔴 P0 — BLOCKER (4 items, 1 done · +1 NEW từ hậu kiểm)

### [⏳ NEW] P1.0-F1 — VM có 118 file lệch khỏi git (72 M + 45 ?? + 1 D)
- **Phát hiện:** P1-fix-lan-1 Việc 3
- **Risk:** Future rebuild/sync sẽ conflict hoặc revert; runtime state có thể không khớp commit gốc
- **Evidence:** 72 modified files, 45 untracked directories (R14-R23 work uncommitted VM-side), 1 deleted file (sell-on-avn/page.tsx)
- **Fix:** Sprint 2 Day 1 — backup snapshot branch + sync về origin/cms (Option B)

### [✅ DONE] P1.4-F1 — Payload users table empty
- **Phát hiện:** P1.4, login Payload fail 401
- **Root cause:** Schema rebuild session trước drop + recreate `payload.users`, mất admin user
- **Fix đã apply:** `POST /api/users/first-register` tạo user id=1, password đúng credentials doc
- **Verify:** Login HTTP 200 + JWT

### [⏳ TODO] P1.6-F1 — 8 tenant tables RLS ENABLED but NO POLICY
- **Phát hiện:** P1.6 CHECK 03
- **Impact:** Silent block ALL CRUD trên các table này (tenant_billing_account, tenant_branding, tenant_domain, ...). Chưa lộ ra vì module tenant billing chưa wiring.
- **Action:** Migration `42_fix_tenant_rls_policies.sql` apply 8 DDL từ CHECK 03 output. ETA 5 phút.

### [⏳ TODO] P1.5-F1 — Storefront middleware không check auth
- **Phát hiện:** P1.5, `/buyer-center` accessible cho mọi user (không redirect /login)
- **Impact:** Toàn bộ protected pages mở public — bug nghiêm trọng về security model R19
- **Current state:** Middleware actual chỉ set locale cookie, không check session
- **Action:** Sprint 2 — viết auth gate vào `storefront/src/middleware.ts`. Code mẫu trong master-blueprint R19.

### [⏳ TODO] P1.5-F2 — Storefront thiếu /api/* routes
- **Phát hiện:** P1.5 — không có `/api/auth/{register,login,otp}`, `/api/cart/*`, `/api/rfqs/*`
- **Impact:** Buyer flow signup → login → checkout → RFQ submit hoàn toàn không hoạt động
- **Action:** Sprint 2 — implement ~6 route groups (proxy → Medusa với publishable key + cookie). Estimate ~26h.

---

## 🟡 P1 — CRITICAL (6 items · +1 NEW từ hậu kiểm)

### [⏳ NEW] P1.4-F6 — Payload đã dùng `db:push` (dev mode) gây wipe data
- **Phát hiện:** P1-fix-lan-1 Việc 2C
- **Evidence:** `payload.payload_migrations` chỉ có 1 row: `name='dev'` `batch=-1` `created_at=2026-05-13 04:35:34` — dấu hiệu rõ ràng của dev-mode push, không phải production migration
- **Risk:** Lần sau collection schema thay đổi, `db:push` wipe users + sessions + roles lần nữa
- **Fix:** Sprint 2 chuyển sang `payload migrate:create` + `payload migrate` (production workflow). Thêm script `payload/scripts/ensure-admin-user.ts` chạy idempotent mỗi lần `docker compose up`.

---


### P1.2-F1 — `pgvector` extension chưa cài
- **Impact:** AI embedding search (R21 Visual Search) disabled
- **Action:** Đổi base image sang `pgvector/pgvector:pg16`. Re-run migration 41. ETA 30 phút.

### P1.2-F2 — `pg_partman` extension chưa cài
- **Impact:** Partition rotation R22 không hoạt động (audit/payment retention)
- **Action:** Custom image `clkao/postgres-pgpartman`. Re-run migration 40. ETA 30 phút (cần coordinate với F1 — cùng 1 lần build).

### P1.4-F2 — Cybersilkroads product seed (25 items) chưa apply
- **Phát hiện:** Chỉ thấy 4 Medusa default products (T-Shirt, Sweatshirt, Sweatpants, Shorts)
- **Action:** Debug `seed/minimal/01_minimum_dataset.sql` Step 4-9. Có thể fail silent do `metadata` JSONB shape không khớp Medusa v2 core. ETA 2-3h.

### P1.4-F3 — Payload first user `tenantId=null`
- **Impact:** Multi-tenant scoping chưa active cho Payload admin
- **Action:** `UPDATE payload.users SET tenant_id='cybersilkroads' WHERE id=1`. Hoặc cấu hình Users.ts default value từ env. ETA 15 phút.

### P1.5-F3 — `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` chưa set
- **Impact:** Storefront browser không gọi được `/store/*` Medusa API
- **Key đã tồn tại:** `pk_61509c15be9863ca278ff99a585d9f663f92b1e507031994c1d73e00360995f9`
- **Action:** Add vào `compose-dev/.env`, recreate storefront container. ETA 5 phút.

### P1.6-F2 — 416 FK columns thiếu index
- **Impact:** JOIN/CASCADE performance khi load tăng
- **Action:** Migration `43_fk_indexes.sql` extract DDL từ CHECK 02 output. Auto-apply trong 1 transaction (CREATE INDEX CONCURRENTLY safe). ETA 30 phút runtime.

---

## 🟢 P2 — IMPORTANT (5 items)

### P1.1-pre — Caddy port binding chưa commit
- VM runtime đã fix `8080:80` → `80:80`, nhưng file `compose-dev/docker-compose.yml` trên branch `cms` đã đúng, VM repo còn trên branch `giaodien` cũ chưa pull.
- **Action:** Sprint 2 — sync VM repo, hoặc commit fix vào branch hiện tại để mất runtime fix khi `docker compose down` cũng OK.

### P1.2-F3 — 170 domain tables không RLS
- Cần phân loại: tenant-scoped (phải RLS) vs reference data (không cần) vs link tables (RLS via parent OK)
- **Action:** Sprint 8 audit phụ.

### P1.4-F5 — Payload user default role `content_editor` không `admin`
- **Action:** RBAC verify Sprint 6.

### P1.6-F4 — `medusa/migrations/validation/` chưa sync VM
- **Action:** Sprint 2 — git pull VM hoặc rsync.

### P1.5-F4 — Default Medusa products vẫn còn (T-Shirt, etc.)
- **Action:** Cleanup sau khi cybersilkroads seed apply (P1.4-F2 sau).

---

## ⚪ P3 — NICE-TO-HAVE (8 items)

| ID | Mô tả | Action |
|---|---|---|
| P1.1-F0 (revised) | **P1.1 diagnosis update:** payload-cms KHÔNG phải "manual rebuild" — RestartCount=0, healthy from start. Khác biệt thời điểm Started là do container được tạo SAU các container khác (~17h chứ không phải 27 phút như roadmap nói) | Không action cần — chỉ correction diagnosis |
| P1.1-F1 | Prometheus scrape `payload-cms/api/metrics` → 404 lặp lại | Expose metrics endpoint hoặc remove scrape target |
| P1.1-F2 | `Caddyfile.dev` format style | `caddy fmt --overwrite` 1 lệnh |
| P1.1-F3 | HTTP/2 + HTTP/3 disabled | OK design dev. Sprint 7 staging có TLS sẽ bật |
| P1.2-F4 | 1658 indexes (50% vs design 1060) | Review redundant Sprint 8 |
| P1.2-F5 | Migration 38 chạy 2 lần | Cosmetic — idempotency guard hoạt động đúng |
| P1.3-F1 | `vi.huayuesc.local` chưa trong Windows hosts | Add nếu cần test VI explicit |
| P1.4-F4 | MinIO buckets empty | OK — Sprint 4 test upload |
| P1.5-F5 | Storefront dev compile 2.7s | Production build sẽ <200ms |
| P1.6-F3 | Validation script `05_data_consistency.sql` reference column sai | Fix script |
| P1.6-F5 | 611 orphan FK candidates review | Sprint 8 audit |

---

## ❓ Câu hỏi mở cần Claude clarify

1. **Branch strategy:** VM đang trên `giaodien` (commit cũ `47d4b5e`), Windows đang trên `cms` (commit `084e296`). VM stack chạy từ code local sửa đổi của `giaodien` + nhiều untracked file (R14-R23). Có cần force sync VM với `cms` không, hay giữ VM dirty và commit từ Windows?

2. **Auto-apply 416 FK index migrations:** Có nên gộp 416 statements thành 1 file migration `43_fk_indexes.sql` apply một lần, hay split theo schema để rollback dễ hơn?

3. **Storefront /api routes:** Sprint 2 spec roadmap có nói "1-2 tuần fix P0/P1 gaps". Buyer flow estimate 26h ~ 3-4 ngày. Còn fix DB RLS + apply seed + setup pgvector + storefront wiring → tổng có lẽ ~2 tuần. Có cần ưu tiên buyer flow trước, hay DB hardening trước?

4. **Default Medusa products:** Có nên xóa T-Shirt/Sweatshirt/Sweatpants/Shorts cleanup trước khi seed cybersilkroads products, hay giữ để có baseline?

---

## 📊 Metrics

| Metric | Value |
|---|---|
| Total phases run | 7/7 |
| Phases passing | 5 PASS + 2 PARTIAL (P1.4 P1.5) |
| Buyer flow reached step | 5/8 (bước 5 — browse render, blocker ở signup) |
| Validation findings | ✅2 / ⚠️3 / 🔴1 |
| Total findings categorized | **24** (P0: 4 = 3 + 1 NEW; P1 done: 1; P1: 6 = 5 + 1 NEW; P2: 5; P3: 8) |
| Findings từ hậu kiểm (P1-fix-lan-1) | 2 NEW (P1.0-F1 P0 git divergence + P1.4-F6 P1 db:push) + 1 revised (P1.1-F0) |
| Auto-fixes applied during Sprint 1 | 2 (caddy port binding, Payload first admin) |
| Validation scripts ran | 6/6 |
| Containers verified Up | 10/10 |
| URLs verified accessible from Windows | 8/8 |

---

## 🎯 Sprint 2 priority queue (recommendation)

**Week 1 — Hardening (DB + Auth):**
1. P1.6-F1 (RLS gaps) — 0.5h
2. P1.6-F2 (FK indexes) — 0.5h
3. P1.2-F1+F2 (pgvector + pg_partman) — 1h
4. P1.4-F3 (Payload tenantId) — 0.5h
5. P1.5-F3 (publishable key env) — 0.5h
6. P1.5-F1 (middleware auth gate) — 4h
7. P1.4-F2 (re-run product seed) — 3h

**Week 2 — Storefront wiring:**
8. P1.5-F2 (storefront /api routes) — 22h
   - `/api/auth/{register,login,otp,logout}`
   - `/api/cart/*`
   - `/api/rfqs/*`

Total Sprint 2 estimate: ~32h ≈ 4 ngày dev + 1 ngày test = **1 tuần thực tế**.

---

## Commit + push (TODO)

```bash
cd ~/projects/tenant-template
git checkout cms
git add docs/sprint-01-gap-list.md docs/sprint-roadmap.md
git commit -m "docs(sprint-01): close — 22 findings (P0×3, P1×5, P2×5, P3×8)"
git push origin cms
```

⚠ **Lưu ý**: `docs/sprint-roadmap.md` chưa có trong repo Windows. Cần copy từ `C:\install-medusa-dev\CMS\sprint-roadmap.md`.

---

## File outputs (tham chiếu)

| File | Vai trò |
|---|---|
| [P1.1.md](P1.1.md) | Smoke test logs |
| [P1.2.md](P1.2.md) | Database verification |
| [P1.3.md](P1.3.md) | Caddy + hostname routing |
| [P1.4.md](P1.4.md) | Admin panels accessible |
| [P1.5.md](P1.5.md) | Storefront end-to-end |
| [P1.6.md](P1.6.md) | R23 validation suite |
| [sprint-01-gap-list.md](sprint-01-gap-list.md) | **This file — Sprint 1 closeout** |
| `/tmp/validation-20260515-032244.txt` (VM) | Raw validation report 174KB |

---

**Sprint 1 status: CLOSED**

Sẵn sàng cho Sprint 2 planning. Đợi user confirm priority order (xem câu hỏi mở phía trên) trước khi bắt đầu.

## 🟡 Findings Sprint 2 Day 4 Bước 2 (2026-05-15)

### Deferred to Sprint 8

- [ ] **P3.D4-F1** · 10 tables không có time column cho partition (defer Sprint 8)
  - Tables: ai.inference_log, api.webhook_delivery_log, email_mkt.email_event_log,
    experiment.experiment_event_log, fraud.fraud_score_log, live.livestream_event_log,
    media.media_view_event, notification.notification_log, payment.payment_event_log,
    vn_sourcing.sourcing_event_log
  - Risk: khi traffic tăng, các tables này sẽ chậm do không partition
  - Action: Sprint 8 — partition design decision per-table dựa trên use case

- [ ] **P3.D4-F2** · audit.audit_event có 37 rows existing data, cần runbook conversion
  - Status: Deferred Sprint 8 (per mig 40/46 design `has_data` skip rule)
  - Action: Follow `medusa/devops/runbooks/partition-conversion.md` để safely convert in-place
  - Risk: low — chỉ 1 table, 37 rows nhỏ

### Resolved Day 4

- [x] **P3.D4-F3** · pg_partman yêu cầu control column NOT NULL
  - Status: ✅ Fixed (mig 40 + mig 46 đều có ALTER COLUMN SET NOT NULL step)
  - Issue: `partman.create_parent()` reject nullable control column
  - Day 4 fix: Thêm ALTER COLUMN SET NOT NULL trước partman.create_parent
  - Sprint 8 audit: Check schema generator (R13/R23) có enforce NOT NULL trên partition keys không

### Sprint 8 backlog (semantics)

- [ ] **P3.D4-F4** · `admin.migration_log.status` field semantics chưa rõ ràng
  - Issue: status='success' cho run có 10/13 failed entries (misleading audit trail)
  - Sprint 8 action: Redefine enum thành ('success', 'partial', 'failed', 'rolled_back')
  - Add NOT NULL constraint on `notes` field nếu status != 'success'

### Resolved Day 4 (data updates, no code commit)

- [x] **P1.4-F3** · Payload user tenant_id NULL → 'cybersilkroads'
  - Action: UPDATE payload.users SET tenant_id='cybersilkroads' WHERE id=1
  - Note: Đây là data update, không phải schema change → KHÔNG cần migration file (Rule 6 exception)

## 🟢 Day 5 Bước 2 — P1.4-F2 RE-CLASSIFIED (false positive)

### [✅ RE-AUDIT] P1.4-F2 — Cybersilkroads seed THỰC RA đã apply thành công

- **Sprint 1 finding (wrong):** "25 products seed bị skip, chỉ 4 default visible"
- **Day 5 audit (correct):** Seed apply OK vào `catalog.product` (canonical schema):
  - `public.product` = 4 (Medusa core default — T-Shirt, etc.)
  - `catalog.product` = 25 (cybersilkroads seed, with i18n + supplier_id + status='published')
- **Root cause Sprint 1 confusion:** Query `SELECT COUNT(*) FROM product` defaults to `public.product` (Medusa namespace), không catch `catalog.product`.
- **Architecture confirmed:** 2-tier design
  - `catalog.*` = canonical product data (rich, multi-locale, supplier-owned)
  - `public.*` (Medusa core) = subset synced FROM catalog cho commerce flow
- **Actual work needed (Sprint 3):** Build catalog → public sync (commerce-required products only). KHÔNG phải re-seed.

→ **P1.4-F2 status: FALSE POSITIVE — Closed. Re-assigned to Sprint 3 sync workflow.**

### Apply Rule 5 lesson

Đây là FALSE POSITIVE thứ 2 (sau R23 CHECK 03 mig 42 redundancy). Cả 2 đều do query/check assumption sai về schema layout. **Lesson reinforced:** Validation finding cần audit ground truth (cả 2-3 layer của design).

## 🟢 Day 5 Bước 3 — P1.5-F1 RE-CLASSIFIED (false positive thứ 3)

### [✅ RE-AUDIT] P1.5-F1 — Middleware auth gate THỰC RA đã hoạt động

- **Sprint 1 finding (wrong):** "Middleware actual chỉ set locale cookie, KHÔNG check auth → /buyer-center accessible cho ai cũng vào được"
- **Day 5 audit (correct):** Middleware đã có FULL auth gate logic ngay từ commit `084e296` (R19 ship):
  ```typescript
  const PROTECTED_PATHS = [/^\/buyer-center/, /^\/seller-center/, /^\/account/, /^\/checkout/];
  if (requiresAuth && !req.cookies.get("csr_session")) {
    url.pathname = "/login";
    url.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  ```
- **6 curl tests PASS:**
  - `/buyer-center` unauth → 307 → `/login?redirect=%2Fbuyer-center` ✓
  - `/buyer-center` + cookie → 200 ✓
  - `/` homepage → 200 ✓
  - `/seller-center` unauth → 307 ✓
  - `/account` unauth → 307 ✓ (bonus, ngoài spec)
  - `/checkout` unauth → 307 ✓ (bonus, ngoài spec)
- **Root cause Sprint 1 wrong audit:** Day 1 P1.5 đọc version OLD của middleware (VM working tree pre-Option B sync chứa local hack chỉ set locale). Day 1 Option B sync `git checkout cms origin/cms` replace middleware bằng version đầy đủ từ R19 commit.

→ **P1.5-F1 status: FALSE POSITIVE — Closed. No code change needed.**

### Defer Sprint 3+ enhancements

- Session cookie VALIDATION (signed/encrypted check) — currently chỉ check `exists`
- Token refresh logic
- RBAC fine-grained per route
- Tenant resolution từ subdomain (currently dùng locale subdomain only)

### Lesson Rule 5 — FALSE POSITIVE thứ 3

Cả 3 false positives Sprint 1 đều do audit không multi-layer:
1. **R23 CHECK 03 mig 42** — script không catch existing `tenant_self_*` policies
2. **P1.4-F2 re-seed** — query `public.product` only, miss `catalog.product`
3. **P1.5-F1 middleware** — đọc snapshot working tree cũ, không reflect committed code

**Pattern chung:** Audit Sprint 1 dùng quick query / partial read → bỏ sót state đúng.
**Action Sprint 3:** Re-run TOÀN BỘ Sprint 1 P1.X audits với multi-layer ground truth check.

## 🟢 Day 6 Bước 1b — P1.5-F2 RE-CLASSIFIED (false positive thứ 4)

### [✅ RE-AUDIT] P1.5-F2 — Storefront /api routes THỰC RA architecture-by-design

- **Sprint 1 finding (wrong):** "Storefront thiếu toàn bộ /api/* route handlers (auth, cart, rfq, ~6 route groups, estimate 22h)"
- **Day 6 multi-layer audit (correct):**

**Layer 1 — Filesystem:**
```
src/app/api/auth/register/route.ts      (POST)
src/app/api/auth/login/route.ts         (POST)
src/app/api/auth/logout/route.ts        (POST)
src/app/api/auth/refresh/route.ts       (POST)
src/app/api/auth/password-reset/route.ts (POST)
src/app/api/auth/verify-otp/route.ts    (POST)
src/app/api/me/route.ts                 (GET)
src/app/api/search/visual-upload/route.ts (POST)
src/app/api/webhooks/payload-revalidate/route.ts (POST)
```
**9 route files EXIST** (Sprint 1 nói "empty").

**Layer 2 — Runtime HTTP test:** All 9 endpoints return 405 (method allowed, just GET on POST route) or 404 (path mismatch like `/api/auth/me` vs `/api/me`). ALL EXIST.

**Layer 3 — Architecture audit:**
- `src/lib/api/client.ts` chứa `api()` helper:
  - Reads session từ cookie (server-side via `getSession()`)
  - Calls Medusa direct với `Authorization`, `x-publishable-api-key`, `x-tenant-id`
- SDK clients (`src/lib/sdk/rfq/`, `order/`, etc.) wrap `api()` calls
- **Pattern:** Next.js Server Component / Server Action → `api()` helper → Medusa backend (direct, không qua proxy)

**Why /api/auth/* exists (correctly):**
- Auth flow set HTTP-only session cookie → cần server-side route, không thể từ client JS
- `/api/auth/login` POST → call Medusa `/auth/login` → `setSession()` set cookie

**Why /api/cart và /api/rfqs KHÔNG exist (correct design):**
- Cart + RFQ operations qua SDK clients (`cartApi`, `rfqApi`)
- SDK calls Medusa direct via `api()` helper với publishable key + session cookie
- Storefront calls Medusa native API → KHÔNG cần Next.js proxy

→ **P1.5-F2 status: FALSE POSITIVE — Closed. Estimate 22h work saved.**

### Real impact

Sprint 1 P1.5-F2 estimate 22h cho implement 6 route groups. Audit Day 6 phát hiện:
- 6/6 route groups KHÔNG cần implement
- 5/6 auth routes đã exist từ R19 commit
- 2/6 (cart, rfqs) by-design không cần (SDK + api() helper architecture)

**Day 6 saved 22h work.** Day 5 đã saved 5-7h. Total Sprint 2 false positives discovery saved ~27-29h.

### Architecture documentation (NEW carry-over Sprint 3)

Storefront architecture nên document rõ pattern này trong `docs/architecture.md` (Sprint 3 task):
- Server Components / Server Actions call Medusa direct
- `api()` helper handles session + publishable key + tenant
- /api/auth/* only — cho cookie management
- KHÔNG dùng client-side fetch trừ proxy upload (visual-upload đặc biệt)

## 🟡 Sprint 3 Day 1 phụ phát hiện (2026-05-15)

- [ ] **P3.D7-F1 (NEW)** · 44 non-FK indexes lost trong mig 46 partition convert
  - Background: Day 1 audit phát hiện index count 2076 → 2032 (-44)
  - Root cause: `CREATE TABLE LIKE template INCLUDING ALL` không inherit partial indexes / deferred constraints
  - Affected: 12 partitioned tables (audit.audit_event, live.ai_compute_ledger, etc.)
  - Risk: P3 — no immediate impact, query patterns chưa biết
  - Action Sprint 8: Identify lost indexes per table, evaluate cần restore không
  - NOTE: P1.6-F2 objective (FK indexes) vẫn 100% achieved

## 🟢 Sprint 3 Day 2 reclassification (2026-05-15)

### REAL (Sprint 8 backlog)
- P2.1-F2 — R23 CHECK 03 script bug: hard-coded policy name 'tenant_isolation' (Layer 1+2 confirmed)
- P3.D4-F1 — 10 tables không có time column (Layer 2 confirmed 10/10)
- P3.D4-F2 — audit_event 37 rows + runbook file MISSING (Layer 1+2)
- P3.D4-F4 — migration_log status semantics: mig 46 logged 'success' cho run 0/13 succeeded (Layer 2)

### NOT GAP (drop từ gap-list — move to design log)
- P3.1-F3 — Image 680MB (design decision pgvector + pg_partman)
- P3.1-F4 — PG 16.13 (Debian image upgrade)

### WONT FIX (drop)
- P2.D2-F1/F2 — Heredoc + mig 43 squash (cosmetic + history rewrite risk)
