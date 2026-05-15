-- ============================================================================
-- Cybersilkroads — Migration 06: GDPR & Privacy Compliance (Domain 32)
-- ============================================================================
-- Tables: 15 (data_processing_purpose_master, consent_record,
--             consent_proof_record, data_subject_request, data_export_archive,
--             data_deletion_execution, third_party_data_share_record,
--             data_breach_incident, data_breach_notification,
--             cookie_consent_log, privacy_policy_version,
--             terms_of_service_version, consent_withdrawal_log,
--             data_retention_policy, pii_field_classification)
-- Depends on: 03_identity.sql
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- gdpr.data_processing_purpose_master — ~30 processing purposes
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.data_processing_purpose_master (
  purpose_code           VARCHAR(60) PRIMARY KEY,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  name_i18n              JSONB NOT NULL,
  description_i18n       JSONB NOT NULL,
  legal_basis            VARCHAR(40) NOT NULL CHECK (legal_basis IN
    ('consent','contract','legal_obligation','vital_interest','public_task','legitimate_interest')),
  data_categories        TEXT[] NOT NULL DEFAULT '{}',                   -- ['contact_info','behavior','financial','identity_doc']
  retention_period_class VARCHAR(10) NOT NULL DEFAULT '7y'
                          CHECK (retention_period_class IN ('30d','90d','1y','3y','5y','7y','10y','forever')),
  can_be_withdrawn       BOOLEAN NOT NULL DEFAULT TRUE,
  withdrawal_consequence_i18n JSONB,
  applies_to_country_codes TEXT[] NOT NULL DEFAULT '{}',                  -- Empty = all
  required_for_service   BOOLEAN NOT NULL DEFAULT FALSE                   -- If TRUE, refusal blocks service
);

-- ----------------------------------------------------------------------------
-- gdpr.consent_record — Every consent event
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.consent_record (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  subject_user_id        UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  purpose_code           VARCHAR(60) NOT NULL REFERENCES gdpr.data_processing_purpose_master(purpose_code),
  consent_state          VARCHAR(20) NOT NULL CHECK (consent_state IN ('granted','denied','withdrawn','expired','superseded')),
  source                 VARCHAR(30) NOT NULL CHECK (source IN
    ('signup_form','preference_center','cookie_banner','dpo_request','admin_recorded',
     'in_app_prompt','email_link','phone_call','api_consent')),
  evidence_jsonb         JSONB NOT NULL DEFAULT '{}',                    -- {ip, timestamp, terms_version_id, checkbox_text_shown, click_position}
  valid_from             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_until            TIMESTAMPTZ,
  withdrawn_at           TIMESTAMPTZ,
  withdrawn_proof_jsonb  JSONB,
  superseded_by_consent_id UUID,                                          -- Self-FK added below

  UNIQUE (subject_user_id, purpose_code, valid_from)
);

CREATE INDEX IF NOT EXISTS idx_consent_user ON gdpr.consent_record (subject_user_id, purpose_code);
CREATE INDEX IF NOT EXISTS idx_consent_active ON gdpr.consent_record (subject_user_id) WHERE consent_state = 'granted' AND withdrawn_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_consent_expires ON gdpr.consent_record (valid_until) WHERE valid_until IS NOT NULL AND withdrawn_at IS NULL;

DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'consent_superseded_fk') THEN
    ALTER TABLE gdpr.consent_record
      ADD CONSTRAINT consent_superseded_fk
      FOREIGN KEY (superseded_by_consent_id) REFERENCES gdpr.consent_record(id) ON DELETE SET NULL;
  END IF;
END $fk$;

-- ----------------------------------------------------------------------------
-- gdpr.consent_proof_record — Tamper-proof evidence
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.consent_proof_record (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  consent_record_id      UUID NOT NULL REFERENCES gdpr.consent_record(id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  evidence_hash_sha256   CHAR(64) NOT NULL,
  evidence_signature     TEXT,                                            -- HMAC or digital signature
  evidence_archived_url  TEXT,                                            -- MinIO ref to full evidence
  retention_until        TIMESTAMPTZ NOT NULL,
  blockchain_tx_id       VARCHAR(120),                                    -- Optional immutable proof
  attested_by_witness    VARCHAR(120)                                     -- Optional third-party witness
);

CREATE INDEX IF NOT EXISTS idx_consent_proof_consent ON gdpr.consent_proof_record (consent_record_id);
CREATE INDEX IF NOT EXISTS idx_consent_proof_retention ON gdpr.consent_proof_record (retention_until);

-- ----------------------------------------------------------------------------
-- gdpr.data_subject_request — DSR (access/erase/portability/restrict)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.data_subject_request (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  code                   VARCHAR(20) NOT NULL UNIQUE,                     -- DSR-XXXXXX
  subject_user_id        UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  request_type           VARCHAR(40) NOT NULL CHECK (request_type IN
    ('access','rectification','erasure','portability','restriction','object',
     'automated_decision_review','consent_history','breach_notification_history')),

  -- Subject verification (proves person making request IS the data subject)
  subject_verification_method VARCHAR(40) CHECK (subject_verification_method IN
    ('logged_in_account','email_otp','sms_otp','id_document','video_call','notarized_doc')),
  subject_verification_status VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (subject_verification_status IN ('pending','verified','failed','requires_more_info')),
  subject_verified_at    TIMESTAMPTZ,

  requested_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sla_response_deadline  TIMESTAMPTZ NOT NULL,                            -- 30 days GDPR, 15 days VN ND 13
  responded_at           TIMESTAMPTZ,
  response_action_taken  VARCHAR(40),
  response_data_url      TEXT,                                            -- MinIO ref to export file
  response_summary       TEXT,
  denial_reason          TEXT,
  escalation             BOOLEAN NOT NULL DEFAULT FALSE,
  escalation_reason      TEXT,
  regulator_complaint_filed BOOLEAN NOT NULL DEFAULT FALSE,
  regulator_complaint_ref VARCHAR(120),

  -- Free-text request details from subject
  request_text_i18n      JSONB,
  contact_email          VARCHAR(255),
  contact_phone          VARCHAR(30),

  status                 VARCHAR(20) NOT NULL DEFAULT 'submitted'
                          CHECK (status IN ('submitted','verifying','in_progress','responded','closed','escalated','denied'))
);

CREATE INDEX IF NOT EXISTS idx_dsr_user ON gdpr.data_subject_request (subject_user_id, requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_dsr_type ON gdpr.data_subject_request (request_type, requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_dsr_pending ON gdpr.data_subject_request (sla_response_deadline) WHERE responded_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_dsr_breached_sla ON gdpr.data_subject_request (sla_response_deadline) WHERE responded_at IS NULL;

-- ----------------------------------------------------------------------------
-- gdpr.data_export_archive — Output of access/portability DSR
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.data_export_archive (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  dsr_request_id         UUID NOT NULL REFERENCES gdpr.data_subject_request(id) ON DELETE CASCADE,
  archive_format         VARCHAR(20) NOT NULL CHECK (archive_format IN ('json','csv','zip','pdf','xml')),
  file_url               TEXT NOT NULL,                                   -- MinIO encrypted
  file_size_bytes        BIGINT NOT NULL,
  file_hash_sha256       CHAR(64) NOT NULL,
  included_entities      JSONB NOT NULL DEFAULT '[]',                    -- ['user','orders','rfqs','messages',...]
  file_password_hash     CHAR(64),                                        -- Subject decrypts with secret
  download_token         VARCHAR(80) UNIQUE,
  downloaded_at          TIMESTAMPTZ,
  expires_at             TIMESTAMPTZ NOT NULL,                            -- Auto-delete after download or expire
  download_count         INT NOT NULL DEFAULT 0,
  max_downloads          INT NOT NULL DEFAULT 3
);

CREATE INDEX IF NOT EXISTS idx_export_archive_dsr ON gdpr.data_export_archive (dsr_request_id);
CREATE INDEX IF NOT EXISTS idx_export_archive_expires ON gdpr.data_export_archive (expires_at);

-- ----------------------------------------------------------------------------
-- gdpr.data_deletion_execution — Right-to-be-forgotten execution
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.data_deletion_execution (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  dsr_request_id         UUID NOT NULL REFERENCES gdpr.data_subject_request(id) ON DELETE RESTRICT,
  deletion_plan_jsonb    JSONB NOT NULL,                                  -- {tables: [{schema, table, rows_to_delete_predicate, strategy}]}
  strategy               VARCHAR(20) NOT NULL CHECK (strategy IN ('hard_delete','anonymize','tombstone','encrypt_and_lose_key')),
  executed_at            TIMESTAMPTZ,
  rows_affected_per_table_jsonb JSONB,                                    -- Audit: actual counts
  verification_hash      CHAR(64),                                        -- Proof of execution
  retention_exceptions_jsonb JSONB,                                       -- {tables_kept_for_legal: [...], reason}
  executed_by_user_id    UUID REFERENCES identity."user"(id),
  status                 VARCHAR(20) NOT NULL DEFAULT 'planned'
                          CHECK (status IN ('planned','in_progress','completed','failed','rolled_back'))
);

CREATE INDEX IF NOT EXISTS idx_deletion_dsr ON gdpr.data_deletion_execution (dsr_request_id);
CREATE INDEX IF NOT EXISTS idx_deletion_status ON gdpr.data_deletion_execution (status, executed_at DESC);

-- ----------------------------------------------------------------------------
-- gdpr.third_party_data_share_record — DPA tracking
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.third_party_data_share_record (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  third_party_name       VARCHAR(255) NOT NULL,
  third_party_role       VARCHAR(40) CHECK (third_party_role IN ('processor','controller','joint_controller','subprocessor')),
  third_party_country_code CHAR(2),
  third_party_dpa_url    TEXT,
  purpose_code           VARCHAR(60) NOT NULL REFERENCES gdpr.data_processing_purpose_master(purpose_code),
  data_categories_shared TEXT[] NOT NULL DEFAULT '{}',
  subjects_count_estimate BIGINT,
  shared_via             VARCHAR(40) CHECK (shared_via IN ('api_realtime','batch_export','s2s_streaming','file_transfer','direct_db_access')),
  encryption_in_transit  BOOLEAN NOT NULL DEFAULT TRUE,
  encryption_at_rest     BOOLEAN NOT NULL DEFAULT TRUE,
  jurisdiction_destination VARCHAR(80),                                    -- e.g., "EU","US","CN","Cross-border to EU"
  adequacy_decision_status VARCHAR(30) CHECK (adequacy_decision_status IN
    ('eu_adequacy','sccs','bcr','derogation','no_adequacy')),
  effective_from         TIMESTAMPTZ NOT NULL,
  expires_at             TIMESTAMPTZ,
  dpa_signed_at          TIMESTAMPTZ,
  audit_frequency_months INT
);

CREATE INDEX IF NOT EXISTS idx_dpa_third_party ON gdpr.third_party_data_share_record (third_party_name);
CREATE INDEX IF NOT EXISTS idx_dpa_purpose ON gdpr.third_party_data_share_record (purpose_code);
CREATE INDEX IF NOT EXISTS idx_dpa_expiring ON gdpr.third_party_data_share_record (expires_at) WHERE expires_at IS NOT NULL;

-- ----------------------------------------------------------------------------
-- gdpr.data_breach_incident
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.data_breach_incident (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,

  incident_code          VARCHAR(20) NOT NULL UNIQUE,                     -- BREACH-YYYYMMDD-N
  discovered_at          TIMESTAMPTZ NOT NULL,
  discovered_by_user_id  UUID REFERENCES identity."user"(id),
  occurred_at            TIMESTAMPTZ,                                     -- Best estimate of actual breach time
  severity               VARCHAR(20) NOT NULL CHECK (severity IN ('low','medium','high','critical','catastrophic')),
  affected_subject_count BIGINT,
  affected_data_categories TEXT[] NOT NULL DEFAULT '{}',
  breach_cause           VARCHAR(40) NOT NULL CHECK (breach_cause IN
    ('external_attack','insider','human_error','technical_fault','vendor_breach',
     'phishing','ransomware','sql_injection','xss','misconfig','lost_device','physical_theft')),
  containment_at         TIMESTAMPTZ,
  eradication_at         TIMESTAMPTZ,
  recovery_at            TIMESTAMPTZ,
  incident_summary       TEXT,
  lessons_learned_doc_url TEXT,
  cost_estimate_usd_minor BIGINT,
  reported_to_regulator  BOOLEAN NOT NULL DEFAULT FALSE,
  reported_at            TIMESTAMPTZ,
  -- sla_72h_breached: computed at read time via view (TIMESTAMPTZ comparison is STABLE, not IMMUTABLE,
  -- so cannot be used in generated column).
  sla_72h_breached       BOOLEAN                                          -- Computed by trigger or app
);

-- Trigger to compute sla_72h_breached on INSERT/UPDATE
CREATE OR REPLACE FUNCTION gdpr.compute_breach_sla()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $fn$
BEGIN
  NEW.sla_72h_breached := (
    NEW.reported_at IS NOT NULL AND
    NEW.discovered_at IS NOT NULL AND
    NEW.reported_at > NEW.discovered_at + INTERVAL '72 hours'
  );
  RETURN NEW;
END;
$fn$;

DROP TRIGGER IF EXISTS trg_breach_sla ON gdpr.data_breach_incident;
CREATE TRIGGER trg_breach_sla
  BEFORE INSERT OR UPDATE OF reported_at, discovered_at ON gdpr.data_breach_incident
  FOR EACH ROW EXECUTE FUNCTION gdpr.compute_breach_sla();

CREATE INDEX IF NOT EXISTS idx_breach_severity ON gdpr.data_breach_incident (severity, discovered_at DESC);
CREATE INDEX IF NOT EXISTS idx_breach_sla ON gdpr.data_breach_incident (discovered_at DESC) WHERE sla_72h_breached;

-- ----------------------------------------------------------------------------
-- gdpr.data_breach_notification — Notifications to authorities/subjects
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.data_breach_notification (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  incident_id            UUID NOT NULL REFERENCES gdpr.data_breach_incident(id) ON DELETE CASCADE,
  notification_target    VARCHAR(40) NOT NULL CHECK (notification_target IN
    ('regulator_eu_dpa','regulator_vn_mps','regulator_uk_ico','regulator_cn_cac',
     'affected_subjects','business_partners','insurance','law_enforcement','board','staff')),
  notified_at            TIMESTAMPTZ NOT NULL,
  sla_72h_breached       BOOLEAN NOT NULL DEFAULT FALSE,
  channel                VARCHAR(30) CHECK (channel IN ('formal_letter','email','website_banner','sms','press_release','phone','postal')),
  notification_content_url TEXT,
  recipients_count       BIGINT,
  follow_up_required     BOOLEAN NOT NULL DEFAULT FALSE,
  follow_up_at           TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_breach_notif_incident ON gdpr.data_breach_notification (incident_id);

-- ----------------------------------------------------------------------------
-- gdpr.cookie_consent_log
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.cookie_consent_log (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr',
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  visitor_session_id     UUID,
  user_id                UUID REFERENCES identity."user"(id) ON DELETE SET NULL,
  consent_state_jsonb    JSONB NOT NULL,                                  -- {necessary:true, analytics:T/F, marketing:T/F, personalization:T/F}
  banner_version         VARCHAR(20) NOT NULL,
  locale                 CHAR(2),
  given_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at             TIMESTAMPTZ NOT NULL,
  withdrawal_at          TIMESTAMPTZ,
  ip_address             INET,
  user_agent             TEXT
);

CREATE INDEX IF NOT EXISTS idx_cookie_consent_user ON gdpr.cookie_consent_log (user_id, given_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cookie_consent_session ON gdpr.cookie_consent_log (visitor_session_id, given_at DESC) WHERE visitor_session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cookie_consent_expires ON gdpr.cookie_consent_log (expires_at);

-- ----------------------------------------------------------------------------
-- gdpr.privacy_policy_version
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.privacy_policy_version (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  version_label          VARCHAR(20) NOT NULL,                            -- "v2.1", "2026.01"
  effective_from         TIMESTAMPTZ NOT NULL,
  effective_until        TIMESTAMPTZ,
  content_i18n           JSONB NOT NULL,                                  -- Full markdown per locale
  content_html_url       TEXT,
  content_pdf_url        TEXT,
  diff_summary_i18n      JSONB,                                           -- Major changes vs previous
  diff_from_version_id   UUID REFERENCES gdpr.privacy_policy_version(id),
  requires_reconsent     BOOLEAN NOT NULL DEFAULT FALSE,
  reconsent_deadline     TIMESTAMPTZ,
  notification_sent_count BIGINT NOT NULL DEFAULT 0,
  withdrawal_count_post_change BIGINT NOT NULL DEFAULT 0,

  UNIQUE (tenant_id, version_label)
);

CREATE INDEX IF NOT EXISTS idx_privacy_policy_active ON gdpr.privacy_policy_version (tenant_id, effective_from DESC, effective_until);

-- ----------------------------------------------------------------------------
-- gdpr.terms_of_service_version
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.terms_of_service_version (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  version_label          VARCHAR(20) NOT NULL,
  effective_from         TIMESTAMPTZ NOT NULL,
  effective_until        TIMESTAMPTZ,
  content_i18n           JSONB NOT NULL,
  content_html_url       TEXT,
  content_pdf_url        TEXT,
  diff_summary_i18n      JSONB,
  diff_from_version_id   UUID REFERENCES gdpr.terms_of_service_version(id),
  governing_law_jurisdiction VARCHAR(80) NOT NULL DEFAULT 'Vietnam',
  dispute_resolution_clause TEXT,
  arbitration_clause     TEXT,
  arbitration_body       VARCHAR(80),                                     -- "VIAC", "HKIAC", "SIAC"
  requires_reacceptance  BOOLEAN NOT NULL DEFAULT FALSE,

  UNIQUE (tenant_id, version_label)
);

CREATE INDEX IF NOT EXISTS idx_tos_active ON gdpr.terms_of_service_version (tenant_id, effective_from DESC, effective_until);

-- ----------------------------------------------------------------------------
-- gdpr.consent_withdrawal_log — Withdrawal events with cascade impacts
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.consent_withdrawal_log (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  subject_user_id        UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  purpose_code           VARCHAR(60) NOT NULL REFERENCES gdpr.data_processing_purpose_master(purpose_code),
  withdrawn_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cascading_actions_jsonb JSONB DEFAULT '[]',                             -- ['marketing_emails_stopped','recommendations_disabled']
  cascading_executed_at  TIMESTAMPTZ,
  source                 VARCHAR(30) CHECK (source IN
    ('preference_center','email_unsubscribe','dpo_request','phone','dsr_request','automated_policy'))
);

CREATE INDEX IF NOT EXISTS idx_withdrawal_user ON gdpr.consent_withdrawal_log (subject_user_id, withdrawn_at DESC);

-- ----------------------------------------------------------------------------
-- gdpr.data_retention_policy — Per-entity retention rules
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.data_retention_policy (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,

  entity_type            VARCHAR(80) NOT NULL,                            -- 'order','chat_message','login_log','kyc_doc',...
  data_class             VARCHAR(20) NOT NULL CHECK (data_class IN ('pii','financial','behavioral','content','aggregate','log','any')),
  retention_duration_days INT NOT NULL,
  retention_basis        VARCHAR(40) NOT NULL CHECK (retention_basis IN
    ('gdpr_min','vn_ndp_13_2023','vn_accounting_law','vn_tax_law','vn_anti_money_laundering',
     'company_policy','contract','user_preference','legal_hold')),
  deletion_strategy      VARCHAR(20) NOT NULL CHECK (deletion_strategy IN ('hard_delete','anonymize','tombstone','encrypt_lose_key')),
  exception_predicate_dsl TEXT,                                           -- CEL: rows matching this are NOT deleted (legal hold)
  active                 BOOLEAN NOT NULL DEFAULT TRUE,

  UNIQUE (tenant_id, entity_type, data_class)
);

CREATE INDEX IF NOT EXISTS idx_retention_entity ON gdpr.data_retention_policy (entity_type, data_class) WHERE active;

-- ----------------------------------------------------------------------------
-- gdpr.pii_field_classification — Tag fields containing PII
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS gdpr.pii_field_classification (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  entity_schema          VARCHAR(40) NOT NULL,
  entity_table           VARCHAR(80) NOT NULL,
  field_name             VARCHAR(80) NOT NULL,
  pii_category           VARCHAR(30) NOT NULL CHECK (pii_category IN
    ('name','email','phone','address','national_id','tax_id','biometric',
     'financial','health','location','behavioral','credentials','sensitive_special')),
  sensitivity            VARCHAR(20) NOT NULL CHECK (sensitivity IN ('low','medium','high','critical')),
  masking_strategy       VARCHAR(20) NOT NULL DEFAULT 'full_mask'
                          CHECK (masking_strategy IN ('full_mask','partial_mask','hash','encrypt','tokenize','redact','no_mask')),
  access_requires_permission_key VARCHAR(120),
  retention_class        VARCHAR(10) NOT NULL DEFAULT '7y',
  export_in_dsr          BOOLEAN NOT NULL DEFAULT TRUE,
  delete_on_erasure_dsr  BOOLEAN NOT NULL DEFAULT TRUE,

  UNIQUE (entity_schema, entity_table, field_name)
);

CREATE INDEX IF NOT EXISTS idx_pii_table ON gdpr.pii_field_classification (entity_schema, entity_table);
CREATE INDEX IF NOT EXISTS idx_pii_sensitivity ON gdpr.pii_field_classification (sensitivity, pii_category);

-- ----------------------------------------------------------------------------
-- Triggers (updated_at)
-- ----------------------------------------------------------------------------

CREATE TRIGGER trg_purpose_master_updated_at BEFORE UPDATE ON gdpr.data_processing_purpose_master
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_consent_record_updated_at BEFORE UPDATE ON gdpr.consent_record
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_dsr_updated_at BEFORE UPDATE ON gdpr.data_subject_request
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_breach_updated_at BEFORE UPDATE ON gdpr.data_breach_incident
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_dpa_updated_at BEFORE UPDATE ON gdpr.third_party_data_share_record
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_retention_updated_at BEFORE UPDATE ON gdpr.data_retention_policy
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_pii_class_updated_at BEFORE UPDATE ON gdpr.pii_field_classification
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- RLS policies
-- ----------------------------------------------------------------------------

DO $rls$
DECLARE
  t TEXT;
  tables_with_tenant TEXT[] := ARRAY[
    'consent_record','data_subject_request','data_export_archive',
    'data_deletion_execution','third_party_data_share_record',
    'data_breach_incident','data_breach_notification','cookie_consent_log',
    'privacy_policy_version','terms_of_service_version','consent_withdrawal_log',
    'data_retention_policy'
  ];
BEGIN
  FOREACH t IN ARRAY tables_with_tenant LOOP
    EXECUTE format('ALTER TABLE gdpr.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON gdpr.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
      t
    );
  END LOOP;
END $rls$;

-- Special: subjects can always see their OWN consent records
CREATE POLICY user_self_consent ON gdpr.consent_record
  FOR SELECT
  USING (subject_user_id = public.current_user_id() OR tenant_id = public.current_tenant_id());

INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('06_gdpr_privacy.sql', 'GDPR/Privacy: 15 tables for consent/DSR/breach/retention/PII classification');

-- ============================================================================
-- END 06_gdpr_privacy.sql — 15 tables, 33 indexes, 7 triggers, 13 RLS policies
-- ============================================================================
