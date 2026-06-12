-- Migration 53: Complete audit_event partition (mig 48 partial completion + legacy cleanup)
--
-- Bối cảnh (Sprint 12 Pha 6 — staging deploy phát hiện):
-- Mig 48 trên FRESH DB fail giữa chừng tại Step 6 (CREATE INDEX):
-- - Mig 40 era đã partition audit_event qua pg_partman (children audit_event_p2026MMDD)
-- - Mig 48 Step 1 rename audit_event → audit_event_legacy (children theo parent)
-- - Mig 48 Steps 2-3 OK (new partitioned table + 13 monthly partitions)
-- - Mig 48 Step 6 FAIL: index names (idx_audit_actor...) đã tồn tại schema-wide
--   (owned by legacy table indexes từ mig 27/40)
-- → Partitioned table tồn tại NHƯNG 0 indexes + 0 PK + RLS off
--
-- Mig 53 idempotent cho cả 2 states:
-- - Staging (mig 48 partial): copy data nếu cần + drop legacy CASCADE + PK + indexes + RLS
-- - Dev (mig 48 full success): chỉ drop legacy (Sprint 9 follow-up documented trong mig 48)
--
-- ============================================================
-- BEGIN MIGRATION 53
-- ============================================================

-- Step 1: Safety copy — nếu legacy còn data mà partitioned trống thì copy trước khi drop
DO $$
DECLARE
  legacy_exists BOOLEAN;
  legacy_count BIGINT := 0;
  part_count BIGINT := 0;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM pg_tables WHERE schemaname='audit' AND tablename='audit_event_legacy'
  ) INTO legacy_exists;

  IF legacy_exists THEN
    EXECUTE 'SELECT COUNT(*) FROM audit.audit_event_legacy' INTO legacy_count;
    SELECT COUNT(*) INTO part_count FROM audit.audit_event;

    IF legacy_count > 0 AND part_count = 0 THEN
      INSERT INTO audit.audit_event SELECT * FROM audit.audit_event_legacy;
      RAISE NOTICE 'Mig 53: copied % rows legacy -> partitioned', legacy_count;
    ELSE
      RAISE NOTICE 'Mig 53: no copy needed (legacy=% partitioned=%)', legacy_count, part_count;
    END IF;
  ELSE
    RAISE NOTICE 'Mig 53: legacy table absent (already cleaned)';
  END IF;
END $$;

-- Step 2: Drop legacy CASCADE (giải phóng index names + orphan p-partitions mig 40 era)
DROP TABLE IF EXISTS audit.audit_event_legacy CASCADE;

-- Step 3: Composite PK nếu thiếu (partition requirement: PK include partition column)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'audit.audit_event'::regclass AND contype = 'p'
  ) THEN
    ALTER TABLE audit.audit_event ADD PRIMARY KEY (id, occurred_at);
    RAISE NOTICE 'Mig 53: PK (id, occurred_at) added';
  ELSE
    RAISE NOTICE 'Mig 53: PK already exists';
  END IF;
END $$;

-- Step 4: Indexes (idempotent — names đã free sau drop legacy)
CREATE INDEX IF NOT EXISTS idx_audit_actor
  ON audit.audit_event (actor_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_brin
  ON audit.audit_event USING BRIN (occurred_at);
CREATE INDEX IF NOT EXISTS idx_audit_severity
  ON audit.audit_event (severity, occurred_at DESC)
  WHERE severity::text = ANY (ARRAY['critical'::varchar, 'security'::varchar]::text[]);
CREATE INDEX IF NOT EXISTS idx_audit_tenant
  ON audit.audit_event (tenant_id, occurred_at DESC);

-- Step 5: RLS (mig 27 pattern)
ALTER TABLE audit.audit_event ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON audit.audit_event;
CREATE POLICY tenant_isolation ON audit.audit_event
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

-- Step 6: Verification
DO $$
DECLARE
  idx_count INT;
  has_pk BOOLEAN;
  has_rls BOOLEAN;
BEGIN
  SELECT COUNT(*) INTO idx_count FROM pg_indexes
  WHERE schemaname='audit' AND tablename='audit_event';

  SELECT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conrelid='audit.audit_event'::regclass AND contype='p'
  ) INTO has_pk;

  SELECT relrowsecurity INTO has_rls FROM pg_class c
  JOIN pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='audit' AND c.relname='audit_event';

  IF NOT has_pk OR NOT has_rls OR idx_count < 4 THEN
    RAISE EXCEPTION 'Mig 53 verification FAILED: pk=% rls=% indexes=%', has_pk, has_rls, idx_count;
  END IF;

  RAISE NOTICE 'Mig 53 OK: pk=% rls=% indexes=%', has_pk, has_rls, idx_count;
END $$;

-- ============================================================
-- END MIGRATION 53
-- ============================================================

INSERT INTO admin.migration_log (migration_file, status, notes)
VALUES ('53_complete_audit_partition.sql', 'success',
        'Sprint 12 Pha 6. Complete mig 48 partial state (staging fresh-DB index name collision với legacy mig 40 partman indexes). Drop legacy CASCADE + composite PK + 4 indexes + RLS. Idempotent cho cả dev (mig 48 full) lẫn staging (mig 48 partial).');
