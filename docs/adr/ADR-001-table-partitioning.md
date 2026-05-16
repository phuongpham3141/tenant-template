# ADR-001: Table Partitioning Strategy (RANGE by created_at)

**Trạng thái:** Proposed (Sprint 8 Pha 2)
**Ngày:** 2026-05-15
**Bối cảnh:** HUAYUE multi-tenant ecommerce platform
**Người quyết định:** Phương Phạm + Coordinator (Claude)

## Bối cảnh

Sprint 3 P3.D4-F1 đề xuất các tables high-volume candidate cho partitioning. Sprint 8 backlog (P3.D4-F1) yêu cầu design strategy + POC.

**Note pattern partition đã tồn tại trong codebase:**
Audit `pg_partman` (mig 40 + 46) đã setup partition cho `advertising.ads_*_log`, `api.api_call_log`, etc. Pattern: monthly partitions với pg_partman tự manage.

→ Sprint 8 ADR ratify pattern đã dùng + extend cho `audit.audit_event` (P3.D4-F1 target).

## Candidate tables

| Table | Reason | Estimated rows/year |
|---|---|---|
| `audit.audit_event` | Compliance + debugging (Sprint 2 R20) | 50-100M |
| `ord.order_event` | Order lifecycle | 5-15M |
| `rfq` schema events | RFQ workflow | 2-5M |
| `notification.notification_event` | Multi-channel | 5-15M |
| `api.api_event_log` | API call log | 20-50M |
| `personalization.funnel_step_event` | User behavior | 10-30M |
| `experiment.experiment_event` | A/B testing | 5-15M |
| `support.support_sla_breach_event` | Support metrics | 1-3M |
| `fraud.fraud_event` | Risk detection | 1-5M |
| `email_mkt.email_webhook_event` | Email delivery | 5-15M |

Tables `advertising.ads_*_log` và `api.api_call_log` đã partition sẵn (mig 40+46).

## Quyết định

**Adopt pg_partman + RANGE partitioning by `occurred_at` (cho audit_event) hoặc `created_at` (general).**

Pattern (consistent với mig 40+46 đã tồn tại):
- Parent table partitioned BY RANGE
- Monthly child partitions
- `pg_partman` auto-create future partitions (10 month buffer)
- Retention: detach + archive > 12 months → MinIO bucket `audit-archive`

## Lý do

**RANGE by time chosen vì:**
- Time-series data natural fit
- Easy archival (drop old partitions instead of DELETE)
- Query optimization (partition pruning by time filter)
- Backup strategy alignment (per-partition pg_dump)

**Monthly granularity:**
- Daily: ~3650 partitions / 10 năm (over-engineering)
- Weekly: ~520 partitions, complex date math
- Monthly: ~120 partitions / 10 năm, manageable

**pg_partman:**
- Already installed + used (mig 40+46)
- Auto-creates future partitions (no manual maintenance)
- Built-in retention policies

## Sprint 8 Pha 2 implementation

### Migration 48: `audit.audit_event` partition POC

(File: `medusa/migrations/48_audit_event_partition_poc.sql`)

**POC scope:**
- Rename `audit.audit_event` → `audit.audit_event_legacy`
- Create new partitioned `audit.audit_event` by RANGE (`occurred_at`)
- Register with pg_partman (auto-future partitions)
- Copy 37 existing rows
- Recreate indexes + RLS policies + audit triggers
- KEEP legacy table cho verification + rollback

**⛔ NOT applied trong Pha 2** do D10 (Medusa server HTTP 502 blocks `medusa db:migrate`). Migration file ready, apply Sprint 9+ sau D10 fix.

### Sprint 9 follow-up

- Drop `audit.audit_event_legacy` sau verify
- Apply pattern cho 9 tables còn lại (notifications, events, etc.)
- pg_partman retention policy config (>12 month auto-archive)

## Trade-offs

**Pros:**
- Faster queries (partition pruning)
- Easier archival (DETACH + DROP partition)
- Better backup granularity (per-month)
- Reduced index bloat per partition

**Cons:**
- Schema complexity (more objects)
- Foreign keys hạn chế (Postgres FK + partition limitations)
- Migration risk (downtime hoặc complex zero-downtime pattern)
- Application code có thể cần thay đổi nếu chèn cross-partition

## Alternatives đã consider

**HASH partitioning by tenant_id:**
- Pros: tenant isolation tự nhiên
- Cons: KHÔNG giải quyết time-series volume
- Decision: REJECTED. Có thể combine sub-partition (HASH on tenant within RANGE) Sprint 10+

**LIST partitioning by event_type:**
- Pros: query specific event types nhanh
- Cons: skew (audit_event writes >> reads)
- Decision: REJECTED

**No partitioning, index + retention only:**
- Pros: simple
- Cons: index bloat, slow at scale
- Decision: REJECTED for scale-out roadmap

## Monitoring metrics (Sprint 9+)

Track sau partitioning:
- Query latency P95/P99 trước vs sau (Grafana dashboard)
- Index size per partition vs original monolith
- Backup time per partition
- Storage savings từ archival

## References

- Postgres docs: https://www.postgresql.org/docs/16/ddl-partitioning.html
- pg_partman: https://github.com/pgpartman/pg_partman
- Sprint 2 R20: 40 PG migrations với mig 40+46 (pg_partman setup)
- Sprint 3 finding P3.D4-F1 (sprint-03-report.md)
- Sprint 8 backlog reclassification (sprint-08-phase-1-report.md)

## Status

- **Pha 2 (current):** ADR + mig 48 file ready
- **Pha 2 apply:** ⛔ BLOCKED by D10 (Medusa server)
- **Sprint 9:** Apply mig 48 + extend pattern 9 tables
