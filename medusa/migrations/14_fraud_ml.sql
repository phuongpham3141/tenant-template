-- Migration 14: ML Fraud Detection (Domain 22)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS fraud.fraud_detection_model (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) DEFAULT 'csr',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  model_code VARCHAR(60) NOT NULL,
  model_type VARCHAR(40) CHECK (model_type IN ('payment_fraud','account_takeover','fake_review','listing_spam','return_abuse','seller_fraud','policy_violation','identity_fraud')),
  version VARCHAR(20) NOT NULL,
  trained_at TIMESTAMPTZ,
  training_data_period TSTZRANGE,
  accuracy_metrics_jsonb JSONB,
  deployed_at TIMESTAMPTZ,
  sunset_at TIMESTAMPTZ,
  fallback_model_id UUID,
  UNIQUE (model_code, version)
);

CREATE TABLE IF NOT EXISTS fraud.ml_feature_store (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  subject_type VARCHAR(20) CHECK (subject_type IN ('user','supplier','order','listing','session','device')),
  subject_id UUID NOT NULL,
  feature_set_name VARCHAR(80) NOT NULL,
  features_jsonb JSONB NOT NULL,
  computed_at TIMESTAMPTZ NOT NULL,
  ttl_until TIMESTAMPTZ,
  source_pipeline VARCHAR(80)
);
CREATE INDEX IF NOT EXISTS idx_ml_feat_subject ON fraud.ml_feature_store (subject_type, subject_id, feature_set_name);

CREATE TABLE IF NOT EXISTS fraud.ml_model_inference_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  model_id UUID REFERENCES fraud.fraud_detection_model(id),
  subject_type VARCHAR(20), subject_id UUID,
  input_features_id UUID,
  predicted_value NUMERIC(8,6),
  confidence_score NUMERIC(5,4),
  prediction_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  action_triggered VARCHAR(40),
  latency_ms INT
);
CREATE INDEX IF NOT EXISTS idx_ml_infer_brin ON fraud.ml_model_inference_log USING BRIN (prediction_at);

CREATE TABLE IF NOT EXISTS fraud.fraud_risk_score (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  subject_type VARCHAR(20) NOT NULL,
  subject_id UUID NOT NULL,
  score INT NOT NULL CHECK (score BETWEEN 0 AND 1000),
  risk_tier VARCHAR(10) CHECK (risk_tier IN ('low','medium','high','critical')),
  top_signals_jsonb JSONB,
  expires_at TIMESTAMPTZ,
  override_by_admin_user_id UUID,
  UNIQUE (subject_type, subject_id, computed_at)
);
CREATE INDEX IF NOT EXISTS idx_risk_subject ON fraud.fraud_risk_score (subject_type, subject_id, computed_at DESC);
CREATE INDEX IF NOT EXISTS idx_risk_high ON fraud.fraud_risk_score (risk_tier, computed_at DESC) WHERE risk_tier IN ('high','critical');

CREATE TABLE IF NOT EXISTS fraud.fraud_event (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  fraud_type VARCHAR(40),
  subject_type VARCHAR(20), subject_id UUID,
  related_entity_type VARCHAR(40), related_entity_id UUID,
  severity VARCHAR(10),
  detected_by VARCHAR(20) CHECK (detected_by IN ('model','rule','manual','report','external')),
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  confidence NUMERIC(5,4),
  action_taken VARCHAR(40),
  resolved_at TIMESTAMPTZ,
  false_positive BOOLEAN
);
CREATE INDEX IF NOT EXISTS idx_fraud_event_subject ON fraud.fraud_event (subject_type, subject_id, detected_at DESC);

CREATE TABLE IF NOT EXISTS fraud.fraud_ring_detection (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ring_id VARCHAR(40) NOT NULL UNIQUE,
  member_subjects_jsonb JSONB NOT NULL,
  graph_visualization_url TEXT,
  common_signals TEXT[],
  confidence NUMERIC(5,4),
  status VARCHAR(20) CHECK (status IN ('suspected','confirmed','dismissed','under_review')),
  investigated_by_user_id UUID
);

CREATE TABLE IF NOT EXISTS fraud.account_takeover_attempt (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  user_id UUID NOT NULL REFERENCES identity."user"(id),
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET,
  country CHAR(2),
  device_fingerprint_id UUID,
  anomaly_signals TEXT[],
  action_taken VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS fraud.payment_fraud_check (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  payment_transaction_id UUID,
  check_type VARCHAR(30) CHECK (check_type IN ('cvv','avs','3ds','velocity','blacklist','ml_score','device_check')),
  result VARCHAR(20),
  score NUMERIC(5,2),
  decision VARCHAR(20) CHECK (decision IN ('approve','review','decline','escalate')),
  processed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fraud.velocity_check_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  subject_type VARCHAR(20), subject_id UUID,
  action_type VARCHAR(40),
  count_last_1min INT, count_last_1hr INT, count_last_24hr INT,
  threshold_breached BOOLEAN,
  action_taken VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS fraud.device_fingerprint (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  signals_hash CHAR(64) NOT NULL UNIQUE,
  first_seen_at TIMESTAMPTZ NOT NULL,
  last_seen_at TIMESTAMPTZ NOT NULL,
  associated_user_ids UUID[] DEFAULT '{}',
  associated_ip_addresses INET[] DEFAULT '{}',
  risk_score INT,
  is_blacklisted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS fraud.ip_reputation (
  ip_address INET PRIMARY KEY,
  country CHAR(2),
  asn INT,
  is_vpn BOOLEAN, is_proxy BOOLEAN, is_tor BOOLEAN, is_datacenter BOOLEAN,
  reputation_score INT,
  threat_categories TEXT[],
  last_seen_at TIMESTAMPTZ,
  source VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS fraud.anomaly_detection_alert (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  alert_type VARCHAR(40),
  severity VARCHAR(10),
  subject_id UUID,
  signals_jsonb JSONB,
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  acknowledged_by_user_id UUID,
  acknowledged_at TIMESTAMPTZ,
  resolution TEXT
);

CREATE TABLE IF NOT EXISTS fraud.behavioral_biometric_signal (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id UUID,
  user_id UUID REFERENCES identity."user"(id),
  signal_type VARCHAR(30) CHECK (signal_type IN ('keystroke_dynamics','mouse_movement','touch_pressure','gait','typing_speed')),
  feature_vector_jsonb JSONB,
  matches_user_baseline BOOLEAN,
  confidence NUMERIC(5,4)
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='fraud' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='fraud' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE fraud.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON fraud.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON fraud.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('14_fraud_ml.sql', 'ML Fraud Detection: 13 tables');
