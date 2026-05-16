# Runbook: `audit.audit_event` table

**Mục đích:** Hướng dẫn vận hành cho bảng `audit.audit_event` (Sprint 2 R20 deliverable, schema `audit`).
**Áp dụng:** medusa-dev (local) + staging (Sprint 8 deploy) + production (Sprint 10+)
**Người chịu trách nhiệm:** Phương Phạm (solo dev) → DevOps team khi scale

## Tổng quan

Bảng `audit.audit_event` ghi lại mọi thay đổi quan trọng từ 90+ triggers trên các bảng core (xem `pg_trigger` filter `'%audit%'`). Phục vụ:
- **Compliance audit** — GDPR, financial, customer data retention
- **Debugging** — track ai làm gì khi nào
- **Forensic investigation** — security incidents, account takeovers
- **Business intelligence** — user behavior, conversion funnels

Bảng ở **schema `audit`** (KHÔNG phải `public`). Truy cập: `SELECT * FROM audit.audit_event ...`.

## Schema

```
audit.audit_event (21 columns):
  id                   uuid PK (uuidv7)
  tenant_id            varchar(20) NOT NULL          — multi-tenant filter
  occurred_at          timestamptz NOT NULL          — thời điểm event xảy ra
  recorded_at          timestamptz NOT NULL          — thời điểm trigger ghi
  event_type           varchar(80) NOT NULL          — eg: 'user.created', 'order.updated'
  event_source         varchar(40)                   — eg: 'api', 'admin', 'system'
  actor_type           varchar(20)                   — 'user' | 'system' | 'webhook'
  actor_id             uuid                          — id của user/system thực hiện
  actor_ip             inet                          — IP client
  actor_user_agent     text                          — User-Agent header
  actor_session_id     uuid                          — session token reference
  target_entity_type   varchar(80)                   — eg: 'order', 'user', 'rfq'
  target_entity_id     uuid                          — id của entity bị tác động
  target_tenant_id     varchar(20)                   — tenant của target (cross-tenant audit)
  action_verb          varchar(40)                   — 'create' | 'update' | 'delete' | 'view'
  before_snapshot      jsonb                         — state TRƯỚC khi thay đổi
  after_snapshot       jsonb                         — state SAU khi thay đổi
  change_summary       text                          — diff human-readable
  severity             varchar(10) DEFAULT 'info'    — 'info' | 'warning' | 'critical' | 'security'
  risk_score           integer                       — 0-100 risk assessment
  retention_class      varchar(10) DEFAULT '7y'      — '90d' | '1y' | '7y' | 'forever'
```

**Indexes:**
- `audit_event_pkey` PRIMARY KEY `(id, occurred_at)` — composite cho partitioning
- `idx_audit_actor` `(actor_id, occurred_at DESC)` — query theo user
- `idx_audit_brin` BRIN `(occurred_at)` — time-range scan
- `idx_audit_severity` partial `(severity, occurred_at DESC) WHERE severity IN ('critical', 'security')`

## Triggers

**90+ audit triggers** trên các bảng core (Sprint 2 R20 setup). Sample:
- `trg_user_audit` trên `identity.user`
- `trg_supplier_audit` trên `identity.supplier`
- `trg_kyc_document_audit` trên `identity.kyc_document`
- ... và 87+ triggers khác (xem `information_schema.triggers WHERE trigger_name LIKE '%audit%'`)

Trigger function: `audit.log_change()` (Sprint 2 R20). SECURITY DEFINER.

## Operational tasks

### Task 1: Kiểm tra dung lượng table hàng tuần

```sql
SELECT
  pg_size_pretty(pg_relation_size('audit.audit_event')) AS table_size,
  pg_size_pretty(pg_indexes_size('audit.audit_event')) AS indexes_size,
  n_live_tup AS rows
FROM pg_stat_user_tables
WHERE relname = 'audit_event' AND schemaname = 'audit';
```

**Ngưỡng cảnh báo:**
- < 1 GB → bình thường
- 1-5 GB → review retention_class fields, archive old records
- 5-10 GB → implement partitioning (xem P3.D4-F1 Sprint 8 Pha 2)
- > 10 GB → bắt buộc partitioning + archive

### Task 2: Retention policy

Hiện tại field `retention_class` defaults `'7y'`. KHÔNG có job auto-delete.

**Kế hoạch Sprint 9+:**
- Job cron daily: DELETE records với `retention_class = '90d'` và `occurred_at < NOW() - INTERVAL '90 days'`
- Job cron monthly: archive `retention_class = '1y'` quá 1 năm vào MinIO bucket `audit-archive`
- GDPR: API endpoint POST `/admin/audit/user-erasure/:user_id` xóa records của user

### Task 3: Query patterns thường dùng

**Tra hoạt động 1 user trong 24h:**
```sql
SELECT event_type, action_verb, target_entity_type, target_entity_id, occurred_at, change_summary
FROM audit.audit_event
WHERE actor_id = '<UUID>'
  AND occurred_at > NOW() - INTERVAL '24 hours'
ORDER BY occurred_at DESC;
```

**Lịch sử thay đổi của 1 record cụ thể:**
```sql
SELECT actor_id, action_verb, before_snapshot, after_snapshot, change_summary, occurred_at
FROM audit.audit_event
WHERE target_entity_type = 'order'
  AND target_entity_id = '<order_uuid>'
ORDER BY occurred_at;
```

**Top actors theo activity 7 ngày:**
```sql
SELECT actor_id, COUNT(*) AS event_count
FROM audit.audit_event
WHERE occurred_at > NOW() - INTERVAL '7 days'
  AND tenant_id = 'cybersilkroads'
GROUP BY actor_id
ORDER BY event_count DESC
LIMIT 20;
```

**Critical/security events tuần qua (sử dụng partial index):**
```sql
SELECT occurred_at, event_type, actor_id, actor_ip, change_summary
FROM audit.audit_event
WHERE severity IN ('critical', 'security')
  AND occurred_at > NOW() - INTERVAL '7 days'
ORDER BY occurred_at DESC;
```

### Task 4: Backup audit_event

Backup `audit.audit_event` riêng vì:
- Critical cho compliance — không được mất
- Append-only (no UPDATE/DELETE trừ retention archival)
- Easy incremental backup

**Schedule:**
- **Hàng ngày**: `pg_dump --schema=audit -t audit_event` → MinIO bucket `db-backups/` (encrypted with KMS)
- **Hàng tuần**: Full backup database `medusa`
- **Hàng tháng**: Archive to long-term storage (Backblaze B2 hoặc Glacier — Sprint 10+ R-02)

### Task 5: Troubleshooting

**Trigger không fire trên table X?**
1. Check trigger tồn tại: `\d <schema>.<table>` xem section `Triggers:`
2. Check trigger enabled: `SELECT tgname, tgenabled FROM pg_trigger WHERE tgrelid = '<schema>.<table>'::regclass;`
3. Check function tồn tại: `\df audit.log_change`
4. Permissions: trigger function phải SECURITY DEFINER + audit user có INSERT trên `audit.audit_event`

**Performance issues?**
1. Check indexes hiện có: `\di audit.audit_event*`
2. Check slow queries: enable `pg_stat_statements` extension
3. BRIN index `idx_audit_brin` cần data sorted by `occurred_at` — VACUUM định kỳ
4. Khi rows > 10M → partition by `occurred_at` (monthly partitions, P3.D4-F1)

**Audit events bị mất?**
1. Check triggers active không bị DROP/DISABLE
2. Check `audit.log_change()` function exception handling — nếu raise sẽ rollback transaction GỐC
3. Verify constraint: trigger phải SECURITY DEFINER với owner có permission INSERT

## Multi-tenant considerations

Field `tenant_id` trong `audit.audit_event`:
- Filter mặc định trong mọi query application-level
- RLS policy enforce tenant isolation (Sprint 2 mig 02 + 27)
- Tenant A KHÔNG đọc được events tenant B (RLS policy `tenant_self_audit`)

Field `target_tenant_id` (khác `tenant_id`):
- Tenant của entity bị tác động
- Có thể khác `tenant_id` (eg admin cross-tenant operation)
- Cho phép cross-tenant audit (admin user trong tenant A xem audit tenant B)

## Sprint 8+ improvements (Sprint 8 backlog)

| Backlog | Item | Sprint plan |
|---|---|---|
| P3.D4-F1 | Partition `audit_event` by `occurred_at` (monthly) | Sprint 8 Pha 2 |
| P3.D7-F1 | Evaluate 44 non-FK indexes (mig 46 lost) | Sprint 8 Pha 2 |
| — | Auto-archive `retention_class = '90d'` records | Sprint 9 |
| — | GDPR user-erasure endpoint | Sprint 9 |
| — | Read replica cho analytics queries | Sprint 10+ |

## Migration history

- **Sprint 2 R20** (commit `084e296`): Initial `audit.audit_event` schema + 90 triggers
- **Sprint 2 mig 27**: RLS policies `tenant_self_audit`
- **Sprint 8 Pha 1** (this doc): Operational runbook đầu tiên

## Tài liệu liên quan

- `docs/sprint-02-report.md` — Sprint 2 R20 setup
- `docs/sprint-03-report.md` — Sprint 3 P3.D4-F2 reclassification → Sprint 8 backlog
- `docs/runbooks/partition-conversion.md` — Sprint 8 Pha 2 deliverable (chưa có)
