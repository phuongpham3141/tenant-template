-- Migration 48: audit.audit_event partition POC (Sprint 8 Pha 2 — P3.D4-F1)
--
-- ⛔ NOT applied trong Sprint 8 Pha 2 do D10 (Medusa server HTTP 502).
-- Migration file ready, apply Sprint 9+ sau D10 fix (3 broken defineLink files).
--
-- Strategy: zero-downtime-ish pattern (37 rows hiện có, low risk)
-- 1. Rename audit.audit_event → audit.audit_event_legacy (preserve data)
-- 2. Tạo new partitioned audit.audit_event BY RANGE (occurred_at)
-- 3. Tạo 13 partitions: 6 past + current + 6 future months
-- 4. Copy data từ legacy → partitioned
-- 5. Recreate primary key (composite id + occurred_at — Postgres partition requirement)
-- 6. Recreate indexes
-- 7. Recreate RLS policies (Sprint 2 mig 27)
-- 8. KEEP legacy table cho verification + rollback
-- 9. Sprint 9: DROP legacy sau verify

-- ============================================================
-- BEGIN MIGRATION 48
-- ============================================================

-- Step 1: Rename legacy
ALTER TABLE audit.audit_event RENAME TO audit_event_legacy;

-- Step 2: Create partitioned table
CREATE TABLE audit.audit_event (
  LIKE audit.audit_event_legacy INCLUDING DEFAULTS INCLUDING IDENTITY
) PARTITION BY RANGE (occurred_at);

-- Step 3: Create 13 partitions (6 past + current + 6 future months)
-- Date range: 2025-12-01 → 2026-12-01 (based on 2026-05-15 current)
CREATE TABLE audit.audit_event_2025_12 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');
CREATE TABLE audit.audit_event_2026_01 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE audit.audit_event_2026_02 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
CREATE TABLE audit.audit_event_2026_03 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
CREATE TABLE audit.audit_event_2026_04 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE audit.audit_event_2026_05 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE audit.audit_event_2026_06 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE audit.audit_event_2026_07 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE audit.audit_event_2026_08 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
CREATE TABLE audit.audit_event_2026_09 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');
CREATE TABLE audit.audit_event_2026_10 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-10-01') TO ('2026-11-01');
CREATE TABLE audit.audit_event_2026_11 PARTITION OF audit.audit_event
  FOR VALUES FROM ('2026-11-01') TO ('2026-12-01');
CREATE TABLE audit.audit_event_default PARTITION OF audit.audit_event DEFAULT;

-- Step 4: Copy data từ legacy
INSERT INTO audit.audit_event SELECT * FROM audit.audit_event_legacy;

-- Step 5: Recreate composite primary key (Postgres partition requirement — PK phải include partition column)
ALTER TABLE audit.audit_event ADD PRIMARY KEY (id, occurred_at);

-- Step 6: Recreate indexes (will auto-propagate to all partitions)
CREATE INDEX idx_audit_actor ON audit.audit_event (actor_id, occurred_at DESC);
CREATE INDEX idx_audit_brin ON audit.audit_event USING BRIN (occurred_at);
CREATE INDEX idx_audit_event_brin ON audit.audit_event USING BRIN (occurred_at);
CREATE INDEX idx_audit_severity ON audit.audit_event (severity, occurred_at DESC)
  WHERE severity::text = ANY (ARRAY['critical'::varchar, 'security'::varchar]::text[]);
CREATE INDEX idx_audit_tenant ON audit.audit_event (tenant_id, occurred_at DESC);

-- Step 7: Recreate RLS policies (Sprint 2 mig 27)
ALTER TABLE audit.audit_event ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON audit.audit_event
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

-- Step 8: Verification queries
DO $$
DECLARE
  legacy_count BIGINT;
  partitioned_count BIGINT;
BEGIN
  SELECT COUNT(*) INTO legacy_count FROM audit.audit_event_legacy;
  SELECT COUNT(*) INTO partitioned_count FROM audit.audit_event;

  IF legacy_count != partitioned_count THEN
    RAISE EXCEPTION 'Migration 48 verification FAILED: legacy=% partitioned=%', legacy_count, partitioned_count;
  END IF;

  RAISE NOTICE 'Migration 48 OK: % rows copied to partitioned table', partitioned_count;
END $$;

-- ============================================================
-- NOTE Sprint 9 follow-up:
-- - DROP TABLE audit.audit_event_legacy CASCADE; (sau verify production)
-- - Register pg_partman.create_parent('audit.audit_event', 'occurred_at', 'native', 'monthly')
-- - Set premake = 6 (auto-create 6 months ahead)
-- - Retention: pg_partman.run_maintenance_proc() cron daily
-- ============================================================

-- ============================================================
-- END MIGRATION 48
-- ============================================================

-- Log migration
INSERT INTO admin.migration_log (migration_file, status, notes)
VALUES ('48_audit_event_partition_poc.sql', 'success',
        'Sprint 8 Pha 2 P3.D4-F1 POC. audit.audit_event partitioned BY RANGE (occurred_at), 13 partitions (12 monthly + default). Legacy table kept for verification. Sprint 9: drop legacy + register pg_partman.');
