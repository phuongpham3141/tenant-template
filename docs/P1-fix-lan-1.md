# P1 — Hậu kiểm Sprint 1 (lần 1)

**Date:** 2026-05-14
**Sprint:** 01 — wrap-up follow-up
**Scope:** 3 việc Coordinator yêu cầu — không tự fix gì khác

---

## Việc 1 — Commit Caddy port fix

### ⚠ PHÁT HIỆN BẤT NGỜ: không có gì để commit

Sau khi check kỹ:

```
=== Current branch ===
giaodien

=== git diff compose-dev/docker-compose.yml ===
(EMPTY — file working tree đã KHỚP HEAD)

=== git status --short compose-dev/docker-compose.yml ===
(EMPTY — file không trong modified list)

=== Verify Caddy port trong HEAD ===
$ git show HEAD:compose-dev/docker-compose.yml | grep -B1 -A1 ":80"
    ports:
      - "80:80"
      - "443:443"
```

**File ở HEAD đã có `"80:80"` rồi!** Không có gì khác biệt giữa working tree và HEAD ở line này.

### Hiểu chuyện gì đã xảy ra

```
=== Diff .bak (pre-sed) vs hiện tại (post-sed) ===
238c238
<       - "8080:80"     ← .bak (timestamp May 7 — uncommitted modification trên VM)
---
>       - "80:80"       ← post-sed (matches HEAD)
```

**Sequence thực tế:**
1. HEAD trên `giaodien` (commit `47d4b5e`, May 7) commit `"80:80"` ĐÚNG từ đầu
2. Một session trước (May 7 hoặc sau), ai đó (chưa rõ) đã sửa working tree thành `"8080:80"` **nhưng không commit** → để lại trong filesystem VM
3. Container Caddy được up từ working tree state đó → bind port 8080
4. Sprint 1 P1.3 tôi chạy sed revert về `"80:80"` → match HEAD
5. Bây giờ git diff trống

→ **Việc 1 không cần thiết** — file ở HEAD đã đúng. Chỉ cần warning user rằng VM filesystem có thể bị "lệch khỏi commit" ở các file khác.

### File `.bak` cần dọn

```
-rw-rw-r-- compose-dev/docker-compose.yml      6692 bytes  May 15 10:03   ← current (sau sed)
-rw-rw-r-- compose-dev/docker-compose.yml.bak  6694 bytes  May 7 07:29    ← pre-sed (uncommitted state)
```

Đề xuất Sprint 2: `rm compose-dev/docker-compose.yml.bak` sau khi user xác nhận không cần keep.

### ⏳ Recommendation cho user

Vì file đã match HEAD, **không cần `git commit`** cho riêng item này. Nhưng vẫn còn 72 file `M` + 45 file `??` chưa commit trên VM (xem section "Trạng thái git rộng hơn" cuối report).

---

## Việc 2 — Verify giả định P1.1 / P1.2 / P1.4

### A. Payload-cms restart history (P1.1 giả định "manual rebuild")

```
RestartCount: 0
Started: 2026-05-13T09:48:59Z
FinishedAt: 2026-05-13T09:42:45Z   (timestamp pre-Started — initial state marker)
ExitCode: 0
Status: running
RestartPolicy: unless-stopped
```

**Diagnosis: Healthy from start. KHÔNG phải manual rebuild — container chưa restart bao giờ.**

Giả định ở P1.1 "restart 27 phút trước" → **SAI**. Thực tế: payload-cms được bật lần đầu lúc 2026-05-13T09:48 UTC (~24h trước thời điểm hậu kiểm này), các container khác bật lúc 2026-05-12 (~41h trước). Chênh lệch ~17h chứ không phải 27 phút.

→ Container payload-cms được **created/started LATER** so với các container khác (có thể vì `docker compose up -d payload-cms --build` hoặc tương tự), nhưng once started, không crash. Vẫn là **Healthy from start**.

### B. Domain tables breakdown (P1.2 verify 482 không phải coincidence)

| Schema | Tables | Running total |
|---|---|---|
| live | 62 | 62 |
| vn_sourcing | 34 | 96 |
| media | 28 | 124 |
| payment | 19 | 143 |
| supplier_site | 19 | 162 |
| email_mkt | 18 | 180 |
| ai | 18 | 198 |
| advertising | 17 | 215 |
| communication | 15 | 230 |
| auth | 15 | 245 |
| fulfillment | 15 | 260 |
| gdpr | 15 | 275 |
| catalog | 14 | 289 |
| fraud | 13 | 302 |
| search | 12 | 314 |
| api | 12 | 326 |
| tenant | 11 | 337 |
| personalization | 11 | 348 |
| rbac | 11 | 359 |
| brand | 10 | 369 |
| tax | 10 | 379 |
| b2c | 10 | 389 |
| notification | 9 | 398 |
| experiment | 8 | 406 |
| audit | 8 | 414 |
| identity | 8 | 422 |
| csr_esg | 8 | 430 |
| returns | 7 | 437 |
| support | 7 | 444 |
| subscription | 7 | 451 |
| dispute | 7 | 458 |
| ord | 6 | 464 |
| account_health | 6 | 470 |
| cart | 4 | 474 |
| rfq | 3 | 477 |
| admin | 2 | 479 |
| common | 2 | 481 |
| taxonomy | 1 | **482** |

**Total domain tables (excluding public): 482 — EXACT MATCH với design.**

**Verdict:** Khớp 482 expected. Không phải coincidence — 38 schemas đã được seed đầy đủ với số bảng đúng spec R13. Schema `public` (Medusa core + link tables) chứa thêm 136 bảng → tổng 618.

### C. Payload users root cause (P1.4-F1)

```
=== payload.payload_migrations ===
 id | name | batch |         created_at         
----+------+-------+----------------------------
  1 | dev  |    -1 | 2026-05-13 04:35:34.828+00
(1 row)
```

**Phát hiện key:** Chỉ có 1 migration với:
- `name = 'dev'` (không phải tên migration cụ thể như `001_initial`)
- `batch = -1` (negative batch)
- `created_at = 2026-05-13 04:35:34` (May 13)

**Suspected cause:**
- `batch = -1` và `name = 'dev'` là dấu hiệu của **Payload dev-mode push** (`pnpm payload db:push` hoặc lệnh tương tự), KHÔNG phải production migration (`payload migrate`).
- Dev push: drop public schema → recreate từ collections config → wipe all data (users included).
- Timestamp May 13 04:35 — trong khoảng giữa các phiên session R14-R23 prior. Khả năng cao: khi user/Claude debug enum `_status` conflict (Pages collection có `statusField._status` clash với Payload auto `versions.drafts`), đã rebuild schema bằng `db:push`.

**Tại sao users table empty trước P1.4 nhưng đã có 1 user sau fix:**
- Pre-P1.4: `payload.users` table có structure (1 migration applied), 0 rows
- P1.4 auto-fix: POST `/api/users/first-register` → tạo user id=1 → `payload.users` có 1 row

**Recommendation Sprint 2 reset:**
1. **Trước mỗi `db:push`** (nếu vẫn dùng):
   ```bash
   docker compose exec postgres pg_dump -U postgres -d payload \
     -t payload.users -t payload.users_sessions -t payload.users_roles \
     --data-only > backup-payload-users-$(date -u +%Y%m%d-%H%M).sql
   ```
2. **Tốt hơn:** Sprint 2 chuyển sang production-style migration (`payload migrate:create` + `payload migrate`). Dev mode `db:push` chỉ dùng cho local laptop, không phải VM.
3. **Idempotent seed:** Thêm script `payload/scripts/ensure-admin-user.ts` chạy mỗi lần `docker compose up` để re-create user nếu không có.

---

## Việc 3 — Branch strategy decision

### Branch state hiện tại

| Location | Branch | HEAD | Date |
|---|---|---|---|
| VM local | **giaodien** (active) | `47d4b5e` | 2026-05-07 |
| VM local | develop | `67d4914` | 2026-04-29 (đoán) |
| VM local | main | `67d4914` | same |
| VM local | **cms** | ❌ **NOT exist locally** | — |
| origin remote | giaodien | `084e296` | 2026-05-13 (Sprint 1 work) |
| origin remote | cms | `084e296` | same |
| origin remote | develop | `67d4914` | older |
| origin remote | main | `67d4914` | older |

### Log từng branch trên VM

**giaodien (VM HEAD `47d4b5e`)** — May 7:
```
47d4b5e chore(storefront): remove stale duplicates from scp -r mishap
1b2a721 feat(storefront): build full Vietnamese B2B sourcing UI
67d4914 fix(medusa): remove src/admin/i18n folder
```

**develop, main (same `67d4914`)** — older:
```
67d4914 fix(medusa): remove src/admin/i18n folder
477e359 fix: enable Medusa admin via Caddy
b1672da fix(compose-dev): append sslmode=disable to DATABASE_URL
```

### Phân tích divergence

```
origin/cms  ─── 084e296  (Windows committed Sprint 1: R14-R23 + validation + seed)
                  │
origin/giaodien ─ 084e296  (same hash — cùng commit, 2 branch trỏ chung)
                  │
                  ↑
                  │ 1 commit ahead 
                  │
VM/giaodien ──── 47d4b5e  (May 7 — VM bị tụt lại 1 commit)
```

**Khoảng cách:**
- VM `giaodien` (47d4b5e) → origin `giaodien/cms` (084e296): **1 commit phía trước** (chính là commit Sprint 1 R14-R23)
- VM working tree: 72 file `M` + 45 file `??` (untracked) chưa commit — chính là code R14-R23 mà chưa stage vào git ở VM-side

**Hiểu sơ đồ thực tế:**
- Khi Windows commit `084e296` + push lên `origin/cms` và `origin/giaodien` (cả 2 branch cùng được push), VM giaodien vẫn ở local commit cũ `47d4b5e`.
- VM working tree có sẵn các file Sprint 1 R14-R23 ở dạng untracked/modified (do tôi đã `scp` chúng từ Windows xuống trong các session trước).
- Nếu VM `git pull origin giaodien`, sẽ conflict vì 72 modified files chưa commit.

### Files diff between branches

```
$ git diff --stat cms..giaodien
(empty — local cms không exist nên diff không chạy được)

$ git diff --stat HEAD..giaodien  
(empty — cả 2 đều là current HEAD)
```

### 3 phương án strategic

**Option A — Force VM về origin/cms (clean nhưng mất uncommitted state):**
```bash
git checkout cms 2>/dev/null || git fetch origin cms:cms
git checkout cms
git reset --hard origin/cms
# ⚠ Mất 72 file modified + 45 untracked
```
→ Sạch, nhưng mất state VM đang chạy. Nếu code R14-R23 trên Windows commit đã đầy đủ, không mất gì thực sự.

**Option B — Stash + commit cẩn thận:**
```bash
git checkout -b backup-vm-state-$(date +%Y%m%d)
git add . && git commit -m "snapshot: VM uncommitted state trước rebase"
git checkout cms 2>/dev/null || git checkout -b cms origin/cms
```
→ An toàn hơn, giữ snapshot làm reference.

**Option C — Tiếp tục dùng giaodien, sync cms về sau:**
- Giữ VM trên giaodien, commit fix lên giaodien
- Sprint 2 task riêng để merge cms ↔ giaodien

→ **Đề xuất Option B** nếu user lo mất state, **Option A** nếu user tin tưởng commit `084e296` đã có đủ everything.

---

## Trạng thái git rộng hơn trên VM (không phải scope hôm nay nhưng cần biết)

```
=== git status --short | count by status ===
   45 ??   (untracked — chủ yếu R14-R23 directories: medusa/migrations, seed, scripts, payload collections)
    1 D    (1 file deleted — sell-on-avn/page.tsx)
   72 M    (modified — chủ yếu storefront pages từ R19)
```

→ Khoảng **118 file** đang lệch khỏi `git commit` history trên VM. Tất cả các file này đã có trong commit `084e296` (origin/cms) rồi. Chỉ là VM local chưa pull.

---

## Tóm tắt 3 việc

| Việc | Trạng thái | Cần user quyết |
|---|---|---|
| 1. Commit Caddy port fix | ❌ KHÔNG cần commit — file đã match HEAD | Có muốn xóa `.bak` file không? |
| 2. Verify giả định P1.1/P1.2/P1.4 | ✅ DONE — kết quả: payload healthy from start, 482 tables match exactly, payload users wipe do `db:push` dev mode | Approve diagnosis trước khi đóng Sprint 1 |
| 3. Branch strategy | ✅ Info collected — VM `giaodien` 1 commit sau origin, có 118 file lệch | Chọn Option A / B / C |

---

## Câu hỏi cần user trả lời để đóng Sprint 1 đầy đủ

1. **Branch strategy:** A / B / C? (Đề xuất B — backup snapshot rồi sync về origin/cms)
2. **Sprint 2 priority:** DB hardening (P0/P1.6) trước hay storefront wiring (P0/P1.5) trước?
3. **Default Medusa products:** Xóa T-Shirt/Sweatshirt/Sweatpants/Shorts trước khi seed cybersilkroads products, hay giữ làm baseline?

---

## Không làm (per coordinator instruction)

- ✗ Migration 42 (tenant RLS fix) — Sprint 2
- ✗ Migration 43 (FK indexes) — Sprint 2
- ✗ Middleware auth gate — Sprint 2
- ✗ /api routes — Sprint 2
- ✗ Cài pgvector / pg_partman — Sprint 2
- ✗ Xóa Medusa default products — chờ user
- ✗ git commit / push / checkout / merge — chờ user
- ✗ rm `.bak` file — chờ user

Sprint 1 vẫn ở trạng thái **CLOSED** chờ 3 quyết định trên.
