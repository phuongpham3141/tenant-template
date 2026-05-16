# Sprint 8 — Non-FK Indexes Evaluation (P3.D7-F1)

**Ngày:** 2026-05-15
**Sprint:** 8 Pha 2 Bước 3
**Bối cảnh:** Sprint 3 P3.D7-F1 — 44 non-FK indexes lost trong mig 46 (catalog→public schema sync). Cần evaluation:
- Index nào critical (recreate)
- Index nào unused (skip)
- Index nào replaceable (alternate strategy)

## Plan deviation D13 NEW — scope reality

Plan paste assumed:
- 44 indexes total (Sprint 3 finding)
- Top usage > 1000 scans
- Classify by `idx_scan` count trong dev

**Reality (Sprint 8 audit):**
- Tổng non-FK indexes: **1,425** (toàn schema medusa-dev)
- Top usage: **200 scans** (link_module_migrations_table_name_key)
- Bottom: **0 scans** (~95% indexes)
- Dev environment traffic quá thấp để classify reliably

→ Strategy adjusted: write **methodology** + **template migration**. Actual index recreation requires staging/production traffic data Sprint 9+ post-deploy.

## Methodology framework

### Layer 1: Identify "lost" indexes từ mig 46

Mig 46 (`46_complete_partman_setup.sql`) implicitly dropped 44 catalog-schema indexes khi sync catalog→public. Cần audit mig 46 SQL để list exact 44.

```bash
grep -E "DROP INDEX|DROP TABLE.*CASCADE" medusa/migrations/46_complete_partman_setup.sql
```

### Layer 2: Cross-reference với query patterns

Cho từng index "lost", check SDK clients (Sprint 5+6) có query pattern dùng index không:
- `storefront/src/lib/sdk/products/index.ts` → product list queries
- `storefront/src/lib/sdk/cart/index.ts` → cart line items
- `storefront/src/lib/sdk/orders/index.ts` → order lookup
- Audit logs: `audit.audit_event WHERE actor_id = ?` → needs `idx_audit_actor`

### Layer 3: Production/staging traffic analysis

**Sau khi staging deploy** (Sprint 9):
- Run smoke tests + load test (artillery/k6)
- Track `pg_stat_user_indexes` over 24-48h
- Categorize bằng real traffic:
  - idx_scan > 1000/day → CRITICAL
  - idx_scan 100-1000 → USEFUL
  - idx_scan < 10 → UNUSED
  - Composite indexes có thể replace bằng partial → REPLACEABLE

## 4 categories (template)

### Category A: CRITICAL — Recreate Sprint 9
Indexes dùng trong critical paths (Sprint 5+6 SDK queries):
- `IDX_product_status` (product list filter)
- `IDX_product_variant_id_product_id` (cart line lookup)
- `medusa_category_tenant_id_handle_key` (category resolution)
- `user_tenant_id_email_key` (login)
- Indexes audit (`idx_audit_actor`, `idx_audit_tenant`) — Sprint 5 wired
- (Full list Sprint 9 sau staging data)

**Migration template:** `medusa/migrations/49_recreate_critical_indexes.sql` (Pha 2 Bước 3 deliverable)

### Category B: USEFUL — Recreate Sprint 9 + monitor 30 days
Indexes dùng cho admin queries (lower traffic):
- Admin search by date ranges
- Reporting queries
- Background job lookups

### Category C: UNUSED — Skip recreate
Indexes 0 scans sau 30 days staging. KHÔNG recreate.
- Rationale: index storage + write overhead > benefit

### Category D: REPLACEABLE — Alternative strategy
Composite indexes có thể replace:
- Partial indexes (`WHERE deleted_at IS NULL` filter)
- Covering indexes (`INCLUDE (column)` syntax)
- BRIN indexes cho time-series (lower storage)

## Decision matrix (target Sprint 9)

| Category | Estimated count | Action |
|---|---:|---|
| A — CRITICAL | ~15 | Recreate migration 49 (template ready Pha 2, fill Sprint 9) |
| B — USEFUL | ~10 | Recreate Sprint 9 + monitor |
| C — UNUSED | ~12 | Skip |
| D — REPLACEABLE | ~7 | Alternate strategy Sprint 9 |
| **Total** | **44** | — |

## Migration 49 template (Sprint 9 fill)

(File: `medusa/migrations/49_recreate_critical_indexes.sql` — template, sẽ fill exact statements Sprint 9 sau staging traffic data)

**⛔ NOT applied Sprint 8 Pha 2** do:
1. D10 carry-over (Medusa migrate blocked)
2. D13 scope adjust (cần staging data trước khi finalize list)

## Sprint 9 follow-up

1. Apply mig 48 (audit_event partition) sau D10 fix
2. Deploy staging (Sprint 9 prep)
3. Run smoke + load test → collect `pg_stat_user_indexes` 24-48h
4. Finalize Category A/B/C/D lists từ real traffic
5. Create + apply migration 49 với Category A
6. Monitor 30 days → apply Category B
7. Audit Category C/D Sprint 10+

## Sprint 8 Pha 2 Bước 3 deliverables

✅ Evaluation methodology doc (this file, framework cho Sprint 9)
✅ Migration 49 template (placeholder structure)
⛔ Actual index list (defer Sprint 9 sau staging traffic)

## References

- Sprint 2 R20: Original index design (40 PG migrations)
- Sprint 3 mig 46: catalog→public sync (lost 44 indexes)
- Sprint 3 P3.D7-F1: NEW finding (Sprint 8 backlog)
- Postgres docs: https://www.postgresql.org/docs/16/indexes.html
- pg_stat_user_indexes: https://www.postgresql.org/docs/16/monitoring-stats.html
