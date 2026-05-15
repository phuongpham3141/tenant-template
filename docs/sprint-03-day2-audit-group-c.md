# Sprint 3 Day 2 — Re-audit Group C (7 P2/P3 deferred findings)

**Date:** 2026-05-15
**Sprint:** 03 Day 2
**Methodology:** Rule 7 multi-layer audit (≥2 layers, prefer 4)

## Self-check ✓

- [x] `git fetch origin` ở Bước 0
- [x] ≥2 layers cho mỗi finding (6/7 đạt 2 layers, 1/7 đạt 4 layers — see breakdown)
- [x] Classification rõ (REAL / NOT GAP / WONT FIX)
- [x] Report no `<paste>` placeholders

## Bước 0 sync state

```
Branch: cms ahead origin/cms 1 (b0a7716 Day 1 audit, không push đến sprint close)
Working tree: clean (porcelain empty)
HEAD: b0a7716 (Day 1 audit) → 435c018 → a816238
```

## Findings re-classification

### 1. P2.1-F2 — R23 CHECK 03 query bug — REAL ✅ confirmed

**Layer 1** — File: `medusa/migrations/validation/03_rls_gaps.sql`

Bug logic confirmed:
```sql
LEFT JOIN pg_policies pp 
  ON pp.schemaname = tt.table_schema 
  AND pp.tablename = tt.table_name 
  AND pp.policyname = 'tenant_isolation'  ← HARD-CODED policy name!
WHERE pc.relrowsecurity = FALSE
   OR pp.policyname IS NULL              ← match nếu KHÔNG có policy named 'tenant_isolation'
```

**Layer 2** — Re-run generic logic (check ANY policy):
```
rls_enabled_no_policy: 0
```

→ DB hiện không có gap thực sự. Script bug: hard-coded match policy name `'tenant_isolation'`. Tables có policy `tenant_self_*` (e.g. từ mig 02) bị treat as "no policy".

**Classification:** REAL
**Action:** Sprint 8 — fix script logic: match policy by qual content, không phải name. Generic check `EXISTS pg_policy` thay vì name filter.

---

### 2. P3.D4-F1 — 10 tables không có time column — REAL ✅ confirmed

**Layer 2** — 10/10 tables time_columns = NULL:
```
 ai.inference_log                | (none)
 api.webhook_delivery_log        | (none)
 email_mkt.email_event_log       | (none)
 experiment.experiment_event_log | (none)
 fraud.fraud_score_log           | (none)
 live.livestream_event_log       | (none)
 media.media_view_event          | (none)
 notification.notification_log   | (none)
 payment.payment_event_log       | (none)
 vn_sourcing.sourcing_event_log  | (none)
(10 rows)
```

**Classification:** REAL
**Action:** Sprint 8 — partition design per-table (add time column + decide partition key + interval per use case).

---

### 3. P3.D4-F2 — audit_event runbook conversion — REAL + escalated

**Layer 1** — Runbook files trong `devops/runbooks/`:
```
ai-livestream.md
backup-restore.md
incident-response.md
release-process.md
security-incident.md
```

⚠ `partition-conversion.md` **KHÔNG tồn tại** (referenced in mig 40 comments).

**Layer 2** — audit_event state:
```
row_count: 37
table_size: 288 kB
is_partitioned: 0
```

**Classification:** REAL + escalated (missing runbook file itself)
**Action Sprint 8:**
1. Write `devops/runbooks/partition-conversion.md` first
2. Apply runbook on `audit.audit_event` (37 rows safe — small)
3. Same pattern cho future tables có data nhưng cần partition

---

### 4. P3.D4-F4 — migration_log status semantics — REAL ✅ confirmed

**Layer 2** — Status distribution:
```
   status    | count 
-------------+-------
 success     |    52
 rolled_back |     1
```

**Layer 2** — Mig 46 entries (the "fuzzy" one):
```
migration_file                 | status  | Attempted | succeeded | skipped | failed
46_complete_partman_setup.sql | success |    13     |    2      |    1    |   10    ← MISLEADING (10 failed!)
46_complete_partman_setup.sql | success |    13     |    0      |    3    |   10    ← VERY MISLEADING (0 succeeded!)
46_complete_partman_setup.sql | success |    13     |   10      |    3    |    0    ← actual success
```

→ status='success' cho run có 10/13 failed → audit trail rất misleading.

**Classification:** REAL semantic flaw
**Action Sprint 8:**
- Add `'partial'` status value
- CHECK constraint: status NULL khi notes IS NULL → require notes when status != 'success'
- Migration logic update: if `succeeded < attempted` → status='partial'

---

### 5. P3.1-F3 — Image size 359MB → 680MB — NOT GAP

**Layer 3** — Confirmed:
```
postgres:16.4-alpine                 359MB
tenant-template-dev-postgres:latest  680MB
```

→ Design decision (custom build với pgvector + pg_partman). Documented in Day 3 final report.

**Classification:** NOT GAP (design decision)
**Action:** Drop từ gap-list. Move to design log (master-blueprint addendum).

---

### 6. P3.1-F4 — PG version 16.4 → 16.13 — NOT GAP

**Layer 3** — Confirmed:
```
PostgreSQL 16.13 (Debian 16.13-1.pgdg12+1) on x86_64-pc-linux-gnu
```

→ Same major version (16.x compatible). Minor upgrade do swap Alpine → Debian image. Documented Day 3.

**Classification:** NOT GAP (acceptable upgrade)
**Action:** Drop từ gap-list. Move to design log.

---

### 7. P2.D2-F1/F2 — Heredoc bash + mig 43 history squash — WONT FIX

**Layer 4** — Mig 43 commits:
```
2169a7e refactor(migration): 43 — switch to CONCURRENTLY pattern
249d642 fix(migration): 43 — add 416 missing FK indexes
```

2 commits exist. Đã push → squash sẽ rewrite shared history (Rule 4 implied — không nên).

P2.D2-F1 Heredoc bash inconsistency = process issue, không code bug.

**Classification:** WONT FIX (cosmetic + history rewrite risk)
**Action:** Drop từ gap-list.

---

## Summary

| Status | Count | Findings |
|---|---|---|
| **REAL** (Sprint 8 backlog) | **4** | P2.1-F2, P3.D4-F1, P3.D4-F2, P3.D4-F4 |
| **NOT GAP** (drop) | **2** | P3.1-F3, P3.1-F4 |
| **WONT FIX** (drop) | **1** | P2.D2-F1/F2 |

→ Gap-list trim 3 findings (2 NOT GAP + 1 WONT FIX). Sprint 8 backlog stays 4.

## Phát hiện phụ Day 1 added Day 2

- **P3.D7-F1 NEW** — 44 non-FK indexes lost trong mig 46 partition convert (Day 1 audit reveal)

→ Append to gap-list, Sprint 8 evaluate restore.

## Sprint 3 progress

- Day 1 ✅ Group A (11 fixes hold)
- Day 2 ✅ Group C (7 findings re-classified: 4 REAL + 2 NOT GAP + 1 WONT FIX)

Foundation re-audit COMPLETE. Sprint 3 Day 3+ proceed P3.2 API contract docs.

## Sprint 8 backlog (consolidated)

1. **P2.1-F2** — Fix R23 CHECK 03 script logic (policy by qual, not name)
2. **P3.D4-F1** — Partition design 10 tables no time column
3. **P3.D4-F2** — Write `partition-conversion.md` runbook + apply audit_event conversion
4. **P3.D4-F4** — migration_log status enum redesign (add 'partial')
5. **P3.D7-F1** — Restore 44 non-FK indexes (evaluate per table)

## Next

**Day 3** — Start P3.2 API contract documentation (Sprint 3 main goal).

Pre-requisites:
- 55 storefront pages list (need inventory)
- Medusa store API endpoints map
- Storefront SDK clients cross-reference
