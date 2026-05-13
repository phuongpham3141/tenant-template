-- Migration 33: Unified Audit + Event Sourcing (Domain 29)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS audit.audit_event (
  id UUID NOT NULL DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  event_type VARCHAR(80) NOT NULL,
  event_source VARCHAR(40),
  actor_type VARCHAR(20),
  actor_id UUID,
  actor_ip INET,
  actor_user_agent TEXT,
  actor_session_id UUID,
  target_entity_type VARCHAR(80),
  target_entity_id UUID,
  target_tenant_id VARCHAR(20),
  action_verb VARCHAR(40),
  before_snapshot JSONB,
  after_snapshot JSONB,
  change_summary TEXT,
  severity VARCHAR(10) DEFAULT 'info' CHECK (severity IN ('info','warn','critical','security')),
  risk_score INT,
  retention_class VARCHAR(10) DEFAULT '7y',
  PRIMARY KEY (id, occurred_at)
);
-- Partitioning by month via pg_partman (if available)
DO $part$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_partman') THEN
    BEGIN
      PERFORM partman.create_parent(
        p_parent_table => 'audit.audit_event',
        p_control => 'occurred_at',
        p_type => 'range',
        p_interval => '1 month',
        p_premake => 3
      );
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'pg_partman setup failed: %', SQLERRM;
    END;
  END IF;
END $part$;
CREATE INDEX IF NOT EXISTS idx_audit_brin ON audit.audit_event USING BRIN (occurred_at);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit.audit_event (actor_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_target ON audit.audit_event (target_entity_type, target_entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_severity ON audit.audit_event (severity, occurred_at DESC) WHERE severity IN ('critical','security');

CREATE TABLE IF NOT EXISTS audit.audit_event_subscription (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  subscriber_type VARCHAR(20),
  event_pattern_filter_jsonb JSONB,
  endpoint_config JSONB,
  last_delivered_at TIMESTAMPTZ,
  lag_seconds NUMERIC(8,2),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit.audit_resource_lineage (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  from_entity_type VARCHAR(80), from_entity_id UUID,
  to_entity_type VARCHAR(80), to_entity_id UUID,
  relationship_type VARCHAR(30),
  created_event_id UUID,
  valid_from TIMESTAMPTZ, valid_to TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS audit.meta_audit_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  accessed_by_user_id UUID,
  accessed_at TIMESTAMPTZ DEFAULT NOW(),
  query_filter_jsonb JSONB,
  rows_returned_count INT,
  exported BOOLEAN DEFAULT FALSE,
  export_destination VARCHAR(255),
  approved_by_supervisor_id UUID
);
CREATE INDEX IF NOT EXISTS idx_meta_audit_brin ON audit.meta_audit_log USING BRIN (accessed_at);

CREATE TABLE IF NOT EXISTS audit.event_store (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  aggregate_type VARCHAR(40),
  aggregate_id UUID,
  event_sequence BIGINT,
  event_type VARCHAR(80),
  event_payload_jsonb JSONB,
  event_metadata_jsonb JSONB,
  occurred_at TIMESTAMPTZ DEFAULT NOW(),
  ttl_until_archive TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_event_store_aggregate ON audit.event_store (aggregate_type, aggregate_id, event_sequence);
CREATE INDEX IF NOT EXISTS idx_event_store_brin ON audit.event_store USING BRIN (occurred_at);

CREATE TABLE IF NOT EXISTS audit.event_replay_state (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  aggregate_type VARCHAR(40),
  last_replayed_sequence BIGINT,
  last_replayed_at TIMESTAMPTZ,
  replay_lag_seconds NUMERIC(10,2),
  target_projection VARCHAR(80),
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS audit.entity_snapshot (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  aggregate_type VARCHAR(40),
  aggregate_id UUID,
  snapshot_at_sequence BIGINT,
  snapshot_data_jsonb JSONB,
  snapshot_at TIMESTAMPTZ DEFAULT NOW(),
  replayed_from_this_snapshot_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS audit.data_change_capture_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  source_table VARCHAR(120),
  primary_key_jsonb JSONB,
  operation CHAR(1) CHECK (operation IN ('I','U','D')),
  before_jsonb JSONB,
  after_jsonb JSONB,
  lsn VARCHAR(40),
  consumed_by_subscribers TEXT[],
  failed_consumers TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cdc_brin ON audit.data_change_capture_log USING BRIN (created_at);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='audit' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='audit' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE audit.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON audit.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON audit.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('33_audit_event_sourcing.sql', 'Audit + Event Sourcing: 8 tables');
