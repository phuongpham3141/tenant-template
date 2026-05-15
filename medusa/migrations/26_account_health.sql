-- Migration 26: Account Health & Performance (Domain 26)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS account_health.account_health_metric (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,
  period VARCHAR(10) CHECK (period IN ('day','week','month','quarter')),
  period_start DATE NOT NULL, period_end DATE NOT NULL,
  order_defect_rate_pct NUMERIC(5,2),
  cancellation_rate_pct NUMERIC(5,2),
  late_shipment_rate_pct NUMERIC(5,2),
  on_time_delivery_rate_pct NUMERIC(5,2),
  customer_response_rate_pct NUMERIC(5,2),
  customer_response_time_hours NUMERIC(8,2),
  return_rate_pct NUMERIC(5,2),
  dispute_lost_rate_pct NUMERIC(5,2),
  policy_violation_count INT DEFAULT 0,
  overall_health_score INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (supplier_id, period, period_start)
);
CREATE INDEX IF NOT EXISTS idx_health_supplier ON account_health.account_health_metric (supplier_id, period_start DESC);

CREATE TABLE IF NOT EXISTS account_health.performance_violation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,
  violation_type VARCHAR(40) CHECK (violation_type IN ('late_shipment','wrong_item','fake_product','policy','misleading_listing','review_manipulation','duplicate_listing','prohibited_content')),
  severity VARCHAR(10) CHECK (severity IN ('warning','moderate','critical')),
  occurred_at TIMESTAMPTZ DEFAULT NOW(),
  evidence_jsonb JSONB,
  automated_action VARCHAR(30) CHECK (automated_action IN ('none','warn','listing_suspended','account_under_review','suspend','ban')),
  appeal_eligible BOOLEAN DEFAULT TRUE,
  appeal_deadline TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_violation_supplier ON account_health.performance_violation (supplier_id, occurred_at DESC);

CREATE TABLE IF NOT EXISTS account_health.performance_appeal (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  violation_id UUID NOT NULL REFERENCES account_health.performance_violation(id) ON DELETE CASCADE,
  appeal_text_i18n JSONB,
  supporting_evidence_urls TEXT[],
  submitted_by_user_id UUID,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_by_user_id UUID,
  decision VARCHAR(20) CHECK (decision IN ('upheld','reversed','partial_relief','pending','escalated')),
  decided_at TIMESTAMPTZ,
  decision_rationale TEXT
);

CREATE TABLE IF NOT EXISTS account_health.listing_quality_score (
  product_id UUID PRIMARY KEY REFERENCES catalog.product(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL,
  score INT,
  issues_jsonb JSONB,
  image_quality_score INT,
  title_score INT, description_score INT, bullets_score INT, keywords_score INT,
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS account_health.suppressed_listing (
  product_id UUID PRIMARY KEY REFERENCES catalog.product(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL,
  suppression_reason VARCHAR(40),
  suppressed_at TIMESTAMPTZ DEFAULT NOW(),
  action_required TEXT,
  resolution_deadline TIMESTAMPTZ,
  supplier_notified_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS account_health.supplier_scorecard_snapshot (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,
  period DATE NOT NULL,
  snapshot_at TIMESTAMPTZ DEFAULT NOW(),
  metrics_jsonb JSONB,
  ranking_in_category INT,
  ranking_change INT,
  improvements_suggested_jsonb JSONB,
  achievements_unlocked TEXT[],
  generated_pdf_url TEXT,
  UNIQUE (supplier_id, period)
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='account_health' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='account_health' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE account_health.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON account_health.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON account_health.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('26_account_health.sql', 'Account Health: 6 tables');
