-- ============================================================================
-- Cybersilkroads — Migration 12: Dispute & Compliance (Domain 8)
-- ============================================================================
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS dispute.dispute (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version INT DEFAULT 1, metadata JSONB DEFAULT '{}',
  code VARCHAR(20) NOT NULL UNIQUE,
  order_id UUID NOT NULL REFERENCES ord."order"(id),
  raised_by_user_id UUID NOT NULL REFERENCES identity."user"(id),
  raised_against VARCHAR(20) NOT NULL CHECK (raised_against IN ('buyer','supplier')),
  complaint_type VARCHAR(40) NOT NULL CHECK (complaint_type IN
    ('wrong_spec','quality','shortage','lateness','packaging','shipping_damage','fraud','ip_violation','price_dispute','communication','other')),
  title_i18n JSONB NOT NULL,
  description_i18n JSONB NOT NULL,
  claim_amount_usd_minor BIGINT,
  current_tier SMALLINT NOT NULL DEFAULT 1 CHECK (current_tier BETWEEN 1 AND 4),  -- 1=self|2=mediated|3=admin|4=viac
  status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open','under_review','resolved','appealed','closed','cancelled')),
  resolution_outcome VARCHAR(30) CHECK (resolution_outcome IN ('declined','partial_refund','full_refund','replacement','no_action','arbitration_decided')),
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sla_response_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_dispute_order ON dispute.dispute (order_id);
CREATE INDEX IF NOT EXISTS idx_dispute_status ON dispute.dispute (tenant_id, status, opened_at DESC);
CREATE INDEX IF NOT EXISTS idx_dispute_tier ON dispute.dispute (current_tier, opened_at DESC) WHERE status IN ('open','under_review');

CREATE TABLE IF NOT EXISTS dispute.dispute_evidence (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  dispute_id UUID NOT NULL REFERENCES dispute.dispute(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_by_user_id UUID NOT NULL REFERENCES identity."user"(id),
  evidence_type VARCHAR(30) CHECK (evidence_type IN ('image','video','document','chat_log','inspection_report','forwarder_proof','transaction_log','other')),
  file_url TEXT NOT NULL,
  file_hash_sha256 CHAR(64) NOT NULL,
  blockchain_tx_id VARCHAR(120),
  description_i18n JSONB,
  taken_at TIMESTAMPTZ,
  gps_coordinates JSONB,
  public_visibility BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_evidence_dispute ON dispute.dispute_evidence (dispute_id);

CREATE TABLE IF NOT EXISTS dispute.arbitration_record (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  dispute_id UUID NOT NULL REFERENCES dispute.dispute(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  tier SMALLINT NOT NULL CHECK (tier BETWEEN 1 AND 4),
  arbitrator_type VARCHAR(20) CHECK (arbitrator_type IN ('self','platform_admin','viac','hkiac','siac','court')),
  arbitrator_user_id UUID REFERENCES identity."user"(id),
  decision TEXT,
  decision_rationale_i18n JSONB,
  decision_amount_usd_minor BIGINT,
  decided_at TIMESTAMPTZ,
  appeal_window_ends_at TIMESTAMPTZ,
  appealed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_arbitration_dispute ON dispute.arbitration_record (dispute_id, tier);

CREATE TABLE IF NOT EXISTS dispute.aml_flag (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  order_id UUID REFERENCES ord."order"(id),
  rule_triggered VARCHAR(40) NOT NULL CHECK (rule_triggered IN ('threshold','cumulative','pattern','sanction','manual','velocity','source_unknown')),
  rule_threshold_value JSONB,
  actual_value JSONB,
  severity VARCHAR(10) NOT NULL CHECK (severity IN ('low','medium','high','critical')),
  status VARCHAR(20) NOT NULL DEFAULT 'auto_flagged' CHECK (status IN ('auto_flagged','under_review','cleared','escalated','sar_filed','blocked')),
  reviewed_by_user_id UUID REFERENCES identity."user"(id),
  reviewed_at TIMESTAMPTZ,
  action_taken VARCHAR(40) CHECK (action_taken IN ('none','kyc_enhanced','order_blocked','funds_held','sar_filed','account_suspended'))
);
CREATE INDEX IF NOT EXISTS idx_aml_flag_order ON dispute.aml_flag (order_id);
CREATE INDEX IF NOT EXISTS idx_aml_flag_pending ON dispute.aml_flag (tenant_id, severity, created_at DESC) WHERE status IN ('auto_flagged','under_review');

DO $fk$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_aml_flag_fk') THEN
    ALTER TABLE ord."order" ADD CONSTRAINT order_aml_flag_fk FOREIGN KEY (aml_flag_id) REFERENCES dispute.aml_flag(id) ON DELETE SET NULL;
  END IF;
END $fk$;

CREATE TABLE IF NOT EXISTS dispute.aml_report (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  aml_flag_id UUID NOT NULL REFERENCES dispute.aml_flag(id),
  report_no VARCHAR(40) NOT NULL UNIQUE,
  filed_at TIMESTAMPTZ NOT NULL,
  filed_by_user_id UUID NOT NULL REFERENCES identity."user"(id),
  narrative_text TEXT NOT NULL,
  attachments_urls TEXT[] DEFAULT '{}',
  regulator VARCHAR(30) CHECK (regulator IN ('sbv_vn','fincen_us','fca_uk','pbc_cn','other')),
  submission_proof_url TEXT,
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('draft','submitted','acknowledged','closed','rejected'))
);

CREATE TABLE IF NOT EXISTS dispute.supplier_strike (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  strike_type VARCHAR(40) CHECK (strike_type IN ('dispute_lost','late_shipping','fake_product_report','fraud','spam','policy_violation','communication')),
  severity VARCHAR(10) CHECK (severity IN ('warning','moderate','critical')),
  evidence_ref TEXT,
  auto_action VARCHAR(20) CHECK (auto_action IN ('none','warn','listing_suppressed','account_under_review','suspend','ban')),
  admin_override_user_id UUID REFERENCES identity."user"(id),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_strike_supplier ON dispute.supplier_strike (supplier_id, occurred_at DESC);

CREATE TABLE IF NOT EXISTS dispute.sanction_check (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  subject_type VARCHAR(20) NOT NULL CHECK (subject_type IN ('user','supplier','bank_account','transaction')),
  subject_id UUID NOT NULL,
  list_provider VARCHAR(30) CHECK (list_provider IN ('ofac','un','sbv_vn','eu','uk_hmt','custom')),
  list_version VARCHAR(40),
  matched BOOLEAN NOT NULL,
  match_score NUMERIC(5,4),
  match_record_jsonb JSONB,
  status VARCHAR(20) NOT NULL DEFAULT 'clear' CHECK (status IN ('clear','review_required','confirmed_hit','false_positive','escalated')),
  checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  next_check_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_sanction_subject ON dispute.sanction_check (subject_type, subject_id, checked_at DESC);
CREATE INDEX IF NOT EXISTS idx_sanction_matched ON dispute.sanction_check (matched, status) WHERE matched = TRUE;

-- Triggers
CREATE TRIGGER trg_dispute_updated_at BEFORE UPDATE ON dispute.dispute FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- RLS
DO $rls$
DECLARE rec RECORD;
BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname = 'dispute' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='dispute' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE dispute.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON dispute.%I', rec.tablename);
      EXECUTE format(
        'CREATE POLICY tenant_isolation ON dispute.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
        rec.tablename
      );
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('12_dispute_compliance.sql', 'Dispute + Compliance: 7 tables');
