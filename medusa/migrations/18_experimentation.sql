-- Migration 18: A/B Experimentation (Domain 37)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS experiment.experiment_definition (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(255), hypothesis_text TEXT,
  owner_user_id UUID,
  scope VARCHAR(20) CHECK (scope IN ('platform','tenant','locale','user_segment','category')),
  audience_segment_filter_jsonb JSONB,
  allocation_pct NUMERIC(5,2) DEFAULT 100,
  primary_metric_id UUID, secondary_metric_ids UUID[],
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','running','paused','completed','archived','abandoned')),
  start_at TIMESTAMPTZ, end_at TIMESTAMPTZ,
  min_sample_size INT, confidence_level NUMERIC(4,2) DEFAULT 95,
  statistical_method VARCHAR(20) DEFAULT 'frequentist' CHECK (statistical_method IN ('frequentist','bayesian','sequential'))
);

CREATE TABLE IF NOT EXISTS experiment.experiment_variant (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  experiment_id UUID NOT NULL REFERENCES experiment.experiment_definition(id) ON DELETE CASCADE,
  variant_label VARCHAR(20) NOT NULL,
  description TEXT,
  traffic_allocation_pct NUMERIC(5,2) NOT NULL,
  config_overrides_jsonb JSONB DEFAULT '{}',
  is_control BOOLEAN DEFAULT FALSE,
  primary_metric_value NUMERIC(12,6),
  lift_pct NUMERIC(8,4),
  p_value NUMERIC(8,6),
  is_winner BOOLEAN,
  UNIQUE (experiment_id, variant_label)
);

CREATE TABLE IF NOT EXISTS experiment.experiment_assignment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  experiment_id UUID NOT NULL REFERENCES experiment.experiment_definition(id),
  subject_type VARCHAR(20) CHECK (subject_type IN ('user','session','device','supplier')),
  subject_id UUID NOT NULL,
  variant_label VARCHAR(20) NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  hash_bucket INT,
  forced_assignment BOOLEAN DEFAULT FALSE,
  UNIQUE (experiment_id, subject_type, subject_id)
);
CREATE INDEX IF NOT EXISTS idx_assign_subject ON experiment.experiment_assignment (subject_type, subject_id);

CREATE TABLE IF NOT EXISTS experiment.experiment_event (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  event_at TIMESTAMPTZ DEFAULT NOW(),
  assignment_id UUID,
  metric_id UUID,
  event_value NUMERIC(20,6),
  event_metadata_jsonb JSONB
);
CREATE INDEX IF NOT EXISTS idx_expt_event_brin ON experiment.experiment_event USING BRIN (event_at);

CREATE TABLE IF NOT EXISTS experiment.experiment_metric_definition (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  metric_code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(255),
  calculation_dsl TEXT,
  event_type_source VARCHAR(80),
  numerator_event VARCHAR(80),
  denominator_event VARCHAR(80),
  aggregation VARCHAR(20) CHECK (aggregation IN ('sum','count','avg','conversion_rate','median','p95','p99')),
  unit VARCHAR(40),
  higher_is_better BOOLEAN DEFAULT TRUE,
  guardrail_min_value NUMERIC(20,6)
);

CREATE TABLE IF NOT EXISTS experiment.experiment_analysis_result (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  experiment_id UUID NOT NULL REFERENCES experiment.experiment_definition(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES experiment.experiment_variant(id),
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  sample_size INT, mean NUMERIC(20,6), std_dev NUMERIC(20,6),
  lift_pct NUMERIC(8,4),
  lift_ci_lower NUMERIC(8,4), lift_ci_upper NUMERIC(8,4),
  p_value NUMERIC(8,6),
  statistical_power NUMERIC(5,4),
  significance_reached BOOLEAN
);

CREATE TABLE IF NOT EXISTS experiment.feature_flag_evaluation_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  evaluated_at TIMESTAMPTZ DEFAULT NOW(),
  flag_key VARCHAR(120),
  subject_id UUID,
  evaluated_value BOOLEAN,
  rule_matched VARCHAR(120),
  latency_ms INT
);
CREATE INDEX IF NOT EXISTS idx_flag_eval_brin ON experiment.feature_flag_evaluation_log USING BRIN (evaluated_at);

CREATE TABLE IF NOT EXISTS experiment.holdout_group (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  holdout_code VARCHAR(40) NOT NULL UNIQUE,
  allocation_pct NUMERIC(5,2),
  subject_ids_sampled UUID[],
  started_at TIMESTAMPTZ DEFAULT NOW(),
  purpose TEXT
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='experiment' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='experiment' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE experiment.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON experiment.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON experiment.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('18_experimentation.sql', 'A/B Experimentation: 8 tables');
