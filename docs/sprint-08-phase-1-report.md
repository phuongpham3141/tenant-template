# Sprint 8 Pha 1 — Backlog 1/5 + Staging prep (partial) — DONE với caveats

**Ngày:** 2026-05-15
**Sprint:** 8 Pha 1 (2-cycle rule)
**Commits:** 3 mới (2bf03f5 + f1ca28c + this commit)
**Status:** ⚠ PARTIAL — Bước 3 BLOCKED bởi D10 carry-over Sprint 7

## Phạm vi hoàn thành

| Bước | Hành động | Trạng thái |
|---|---|---|
| 0 | Git sync + Sprint 7 verify | ✅ DONE — phát hiện Sprint 7 NEVER executed (D10 carry-over) |
| 1 | Backlog audit (5 items từ Sprint 2+3) | ✅ DONE |
| 2 | P3.D4-F2 audit_event runbook (pure doc) | ✅ DONE commit `2bf03f5` |
| 3 | P3.D4-F4 migration_log enum extend | ⛔ **SKIPPED** (D10 + D11) |
| 4 | Staging Proxmox architecture + compose template csr-data | ✅ DONE commit `f1ca28c` |
| 5 | Pha 1 report (this commit) | 🔄 In progress |

## Plan deviations Sprint 8 Pha 1

### D10 carry-over (từ Sprint 7) — UNRESOLVED

Sprint 7 Pha 1 BLOCKED tại Bước 1 (P7.1-BLOCKED.md). Sprint 7 Pha 2 paste re-escalated (P7.2-RE-ESCALATE.md). Coordinator chưa quyết định Option A/B/C.

**Sprint 8 Pha 1 baseline check confirmed:**
- HEAD = `adaac66` (Sprint 6 final) — KHÔNG có Sprint 7 commits
- `docs/sprint-07-*.md` KHÔNG tồn tại
- `medusa/src/modules/supplier-application/` KHÔNG tồn tại
- Medusa server HTTP 502 (D10 unchanged)

**Sprint 8 Pha 1 adaptation:**
- Bước 2 (audit_event runbook) — pure doc, NO Medusa dependency ✅ executed
- Bước 4 (staging architecture + compose template) — pure doc + config, NO deploy ✅ executed
- Bước 3 (migration_log enum extend) — needs `medusa db:migrate` → ⛔ BLOCKED by D10, SKIPPED

### D11 NEW (Sprint 8 P3.D4-F4 reality check)

**Plan paste sai 2 điểm về migration_log:**

| Plan paste | Reality |
|---|---|
| Type: postgres ENUM | Actually: `varchar(20)` với CHECK constraint |
| Initial values: `pending, applied, failed` | Actually: `success, failed, rolled_back` |
| Add: `rolled_back, partial, verified` | `rolled_back` đã có; cần thêm `partial, verified, pending, applied` |

**Verified live trên Postgres:**

```sql
\d admin.migration_log
-- status | varchar(20) NOT NULL DEFAULT 'success'
-- CHECK: status IN ('success', 'failed', 'rolled_back')
```

**Impact:**
- Plan migration `ALTER TYPE ... ADD VALUE` không apply được (không phải enum)
- Cần migration khác: `ALTER TABLE admin.migration_log DROP CONSTRAINT migration_log_status_check; ALTER TABLE ... ADD CONSTRAINT ... CHECK (status IN (...))`
- Vẫn cần Medusa migrate framework để track (Rule 6 — schema qua migration file)
- → BLOCKED by D10 (Medusa migrate không chạy được)

### D-runbook (Sprint 8 P3.D4-F2 reality check)

Plan paste giả định:
- Table: `public.audit_event`
- Triggers: 27

Reality:
- Table: `audit.audit_event` (schema `audit`, KHÔNG phải `public`)
- Triggers: 90+ (`pg_trigger` filter `%audit%`)
- 21 columns thực tế: tenant_id + actor_* + target_* + before/after snapshots + severity + retention_class
- 37 rows hiện có

Runbook viết theo reality (Rule 7 multi-layer audit). Plan paste content được thay thế hoàn toàn.

## Backlog status sau Pha 1

| ID | Item | Status |
|---|---|---|
| P3.D4-F2 | audit_event runbook | ✅ **DONE** (Pha 1 Bước 2) |
| P3.D4-F4 | migration_log status enum extend | ⛔ **BLOCKED** by D10 (carry over Pha 2) |
| P2.1-F2 | R23 CHECK 03 multi-tenant fix | ⏳ Pha 2 (cần Medusa cho test? — verify) |
| P3.D4-F1 | 10 tables partition design | ⏳ Pha 2 (pure doc + migration) |
| P3.D7-F1 | 44 non-FK indexes evaluation | ⏳ Pha 2 (pure doc + migration) |

## Sprint 7 carry-over status (vẫn unresolved)

| Item từ Sprint 7 | Status |
|---|---|
| D9 supplier-application module | ⛔ chưa build |
| Cart context backend integration | ⛔ chưa build |
| 3 buyer-center wires | ⛔ chưa build |
| Admin custom views | ⛔ chưa build |
| Contact form Server Action | ⛔ chưa build |
| Reset password flow | ⛔ chưa build |
| **D10 (root cause)**: 3 broken defineLink files | ⛔ NOT FIXED |

→ Toàn bộ Sprint 7 scope **đang carry-over** đến khi D10 resolved.

## Staging preparation status

✅ Architecture doc + compose template csr-data
⏳ Pha 2: VM provisioning + deploy (PLUS D10 unblock prerequisite)

**D10 blocker cho Sprint 8 Pha 2 deploy:**
- csr-app VM container `medusa-server` sẽ KHÔNG start trên staging
- Cần fix D10 trước Pha 2 deploy
- Hoặc Pha 2 chỉ deploy csr-data + csr-storage + csr-obs (loại trừ csr-app)

## Metrics

| Metric | Before Pha 1 | After Pha 1 |
|---|---|---|
| PG migrations | 47 | 47 (Bước 3 SKIPPED) |
| Backlog items completed | 0/5 | 1/5 (P3.D4-F2 only) |
| Runbooks | 0 | 1 (audit_event 191 lines) |
| Staging compose files | 0 | 1/4 (csr-data only) |
| Staging architecture | undocumented | documented (218 lines) |
| Sprint 7 carry-over D10 | 1 (unresolved) | 1 (unresolved) |

## Sprint 8 Pha 1 commits (3)

```
2bf03f5 docs(sprint-08): runbook audit.audit_event table (Bước 2 — P3.D4-F2)
f1ca28c docs(sprint-08): staging Proxmox architecture + compose template csr-data (Bước 4)
<this>  docs(sprint-08): Pha 1 report — 1/5 backlog + staging prep partial (D10 carry-over)
```

## HARD RULES compliance

| Rule | Status |
|---|:-:|
| Rule 1 — Commit cùng turn | ✅ |
| Rule 2 — Backup trước wipe | N/A (no destructive ops) |
| Rule 3 — giaodien giữ nguyên | ✅ |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ Bước 0 |
| Rule 6 — Schema qua migration | ✅ (Bước 3 SKIPPED, không ad-hoc DDL) |
| Rule 7 — Audit nhiều layer | ✅ 3 layers per backlog item |
| Rule 8 — Best-effort no placeholder | ✅ actual data trong all docs |
| Rule 8 phụ — Plan deviation handling | ✅ D10 + D11 + D-runbook documented |
| Rule 9 — Tiếng Việt thuần | ✅ 100% docs + commits |

## Pha 2 plan (revised)

**Pha 2 sẽ BLOCKED nếu D10 chưa fix.** Coordinator cần quyết định:

### Option A — Fix D10 first, then Sprint 8 Pha 2
1. Pha 1.5 NEW (carry-over Sprint 7): Fix Medusa 3 broken defineLink (4-8h)
2. Sprint 7 actual execution: supplier-app + cart + buyer wires + admin views + contact + reset (10-15h)
3. Sprint 8 Pha 2: P3.D4-F4 enum + P2.1-F2 fix + P3.D4-F1 partition design + P3.D7-F1 indexes + Staging deploy + load test (12-18h)
- **Total carry-over:** 26-41h

### Option B — Sprint 8 Pha 2 narrow (doc-only)
- P3.D4-F1 partition DESIGN doc (KHÔNG apply migration)
- P3.D7-F1 indexes evaluation doc (KHÔNG apply migration)
- P2.1-F2 R23 script fix audit (read script, recommend fix, KHÔNG apply nếu cần Medusa)
- Sprint 8 close + push (doc-only, no deploy)
- Defer ALL backend work (D10 carry + Sprint 7 items + migrations) đến Sprint 9 hoặc 10+
- **Effort:** 4-6h doc work

### Option C — Stop here, fix D10 standalone
- Pause Sprint 8 ở Pha 1 (commit 3 đã làm)
- Treat D10 + Sprint 7 carry-over as "maintenance phase" outside sprint cycle
- Resume Sprint 8 Pha 2 sau khi maintenance xong

## Recommendation

**Option B (Sprint 8 narrow doc-only)** — given:
- 2 escalations về D10 chưa được coordinator quyết định
- Pure doc work CÓ THỂ execute mà không cần Medusa
- Forward progress + clear status flag cho coordinator
- Defer commits liên quan code đến khi D10 fixed

Hoặc Option A nếu coordinator sẵn sàng làm Sprint 7 + 1.5 sequence.

## Next

⏸ Coordinator review:
1. Approve Pha 1 partial DONE state (3 commits)
2. Quyết định D10: fix now (Option A) hay defer (Option B/C)
3. Trigger Pha 2 phù hợp với decision
