-- Migration 25: Email Marketing Automation
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS email_mkt.email_template (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  template_code VARCHAR(80) NOT NULL,
  locale CHAR(2) NOT NULL,
  category VARCHAR(40) CHECK (category IN ('transactional','marketing','notification','welcome','recovery','admin')),
  subject_template TEXT, preheader_template TEXT,
  html_template TEXT, text_template TEXT,
  from_address VARCHAR(255), from_name VARCHAR(120), reply_to VARCHAR(255),
  variables_schema_jsonb JSONB,
  allowed_provider_ids UUID[],
  default_provider_id UUID,
  is_active BOOLEAN DEFAULT TRUE,
  current_version INT DEFAULT 1,
  UNIQUE (tenant_id, template_code, locale)
);

CREATE TABLE IF NOT EXISTS email_mkt.email_template_version (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  template_id UUID NOT NULL REFERENCES email_mkt.email_template(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  subject TEXT, html TEXT, text TEXT,
  change_summary TEXT,
  edited_by_user_id UUID,
  performance_metrics_jsonb JSONB,
  is_winner BOOLEAN,
  UNIQUE (template_id, version_number)
);

CREATE TABLE IF NOT EXISTS email_mkt.email_segment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  name VARCHAR(120), description TEXT,
  segment_type VARCHAR(20) CHECK (segment_type IN ('static','dynamic','imported')),
  member_count_cached BIGINT, last_computed_at TIMESTAMPTZ,
  refresh_frequency_minutes INT
);

CREATE TABLE IF NOT EXISTS email_mkt.email_segment_rule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  segment_id UUID NOT NULL REFERENCES email_mkt.email_segment(id) ON DELETE CASCADE,
  group_id INT, logic_operator VARCHAR(5) CHECK (logic_operator IN ('and','or','not')),
  field_path VARCHAR(120), operator VARCHAR(20),
  value_jsonb JSONB, position INT
);

CREATE TABLE IF NOT EXISTS email_mkt.email_campaign (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(255),
  template_id UUID NOT NULL REFERENCES email_mkt.email_template(id),
  segment_id UUID REFERENCES email_mkt.email_segment(id),
  schedule_type VARCHAR(20) CHECK (schedule_type IN ('immediate','scheduled','trigger_based')),
  scheduled_at TIMESTAMPTZ,
  timezone_strategy VARCHAR(40),
  send_window_jsonb JSONB,
  audience_count_estimated BIGINT,
  ab_test_id UUID,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','scheduled','sending','sent','paused','cancelled')),
  sent_count BIGINT DEFAULT 0,
  delivered_count BIGINT DEFAULT 0,
  open_rate_pct NUMERIC(5,2), click_rate_pct NUMERIC(5,2),
  unsubscribe_count INT DEFAULT 0, complaint_count INT DEFAULT 0,
  conversion_event_type VARCHAR(40), conversion_count INT, conversion_value_usd_minor BIGINT,
  created_by_user_id UUID, approved_by_user_id UUID
);

CREATE TABLE IF NOT EXISTS email_mkt.email_ab_test (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  campaign_id UUID REFERENCES email_mkt.email_campaign(id) ON DELETE CASCADE,
  test_type VARCHAR(30) CHECK (test_type IN ('subject','content','send_time','from_name')),
  winner_metric VARCHAR(30),
  winner_decision VARCHAR(20) CHECK (winner_decision IN ('manual','auto_at_threshold')),
  split_pct JSONB,
  test_audience_size INT,
  status VARCHAR(20),
  winner_variant_id UUID,
  decided_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS email_mkt.email_ab_test_variant (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  test_id UUID NOT NULL REFERENCES email_mkt.email_ab_test(id) ON DELETE CASCADE,
  variant_label VARCHAR(20),
  template_overrides_jsonb JSONB,
  allocated_pct NUMERIC(5,2),
  sent_count BIGINT DEFAULT 0,
  opened_count BIGINT DEFAULT 0,
  clicked_count BIGINT DEFAULT 0,
  converted_count INT DEFAULT 0,
  is_winner BOOLEAN
);

CREATE TABLE IF NOT EXISTS email_mkt.email_journey (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(255),
  trigger_type VARCHAR(40) CHECK (trigger_type IN ('user_signup','first_order','abandoned_cart','order_delivered','inactivity_30d','tier_promoted','product_viewed','custom_event')),
  trigger_config_jsonb JSONB,
  segment_filter_id UUID,
  max_recipients_per_day INT,
  total_steps INT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','active','paused','archived')),
  enrolled_count BIGINT DEFAULT 0,
  completed_count BIGINT DEFAULT 0,
  conversion_rate_pct NUMERIC(5,2)
);

CREATE TABLE IF NOT EXISTS email_mkt.email_journey_step (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  journey_id UUID NOT NULL REFERENCES email_mkt.email_journey(id) ON DELETE CASCADE,
  step_number INT NOT NULL,
  step_type VARCHAR(30) CHECK (step_type IN ('send_email','wait','condition','update_user_field','webhook','tag_user','exit')),
  template_id UUID,
  wait_duration INTERVAL,
  condition_rules_jsonb JSONB,
  branches_jsonb JSONB,
  action_config_jsonb JSONB,
  UNIQUE (journey_id, step_number)
);

CREATE TABLE IF NOT EXISTS email_mkt.email_journey_enrollment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  journey_id UUID NOT NULL REFERENCES email_mkt.email_journey(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES identity."user"(id),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  current_step INT DEFAULT 1,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','completed','exited_early','errored')),
  next_action_at TIMESTAMPTZ,
  completion_status VARCHAR(20),
  exit_reason TEXT,
  steps_completed_jsonb JSONB DEFAULT '[]'
);
CREATE INDEX IF NOT EXISTS idx_journey_enroll_user ON email_mkt.email_journey_enrollment (user_id, journey_id);
CREATE INDEX IF NOT EXISTS idx_journey_next ON email_mkt.email_journey_enrollment (next_action_at) WHERE status = 'active';

CREATE TABLE IF NOT EXISTS email_mkt.email_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  template_id UUID, template_version INT,
  recipient_user_id UUID, recipient_email VARCHAR(255),
  subject_rendered TEXT, variables_used JSONB,
  provider_id UUID, provider_message_id VARCHAR(120),
  campaign_id UUID, journey_enrollment_id UUID, journey_step_id UUID, ab_variant_id UUID,
  related_entity_type VARCHAR(40), related_entity_id UUID,
  status VARCHAR(20) DEFAULT 'queued',
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  delivered_at TIMESTAMPTZ,
  first_opened_at TIMESTAMPTZ, open_count INT DEFAULT 0,
  first_clicked_at TIMESTAMPTZ, click_count INT DEFAULT 0,
  bounce_type VARCHAR(20), bounce_reason TEXT,
  complaint_type VARCHAR(20),
  conversion_attributed_at TIMESTAMPTZ, conversion_value_usd_minor BIGINT
);
CREATE INDEX IF NOT EXISTS idx_email_log_brin ON email_mkt.email_log USING BRIN (sent_at);
CREATE INDEX IF NOT EXISTS idx_email_log_recipient ON email_mkt.email_log (recipient_email, sent_at DESC);

CREATE TABLE IF NOT EXISTS email_mkt.email_link_click (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  email_log_id UUID, link_id UUID, original_url TEXT,
  click_position VARCHAR(20),
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET, user_agent TEXT,
  country CHAR(2), device_type VARCHAR(20),
  converted_to_action VARCHAR(40)
);
CREATE INDEX IF NOT EXISTS idx_click_brin ON email_mkt.email_link_click USING BRIN (clicked_at);

CREATE TABLE IF NOT EXISTS email_mkt.email_link_redirect (
  short_code VARCHAR(20) PRIMARY KEY,
  original_url TEXT NOT NULL,
  campaign_id UUID, template_id UUID,
  click_count BIGINT DEFAULT 0,
  unique_click_count BIGINT DEFAULT 0,
  expires_at TIMESTAMPTZ,
  utm_params_jsonb JSONB
);

CREATE TABLE IF NOT EXISTS email_mkt.email_preference_center (
  user_id UUID PRIMARY KEY REFERENCES identity."user"(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  email_address VARCHAR(255),
  language_preference CHAR(2),
  frequency_cap_per_day INT, frequency_cap_per_week INT,
  unsubscribed_globally BOOLEAN DEFAULT FALSE,
  unsubscribed_topics TEXT[] DEFAULT '{}',
  preferred_send_window_start_hour SMALLINT,
  preferred_send_window_end_hour SMALLINT,
  format_preference VARCHAR(10) DEFAULT 'html',
  digest_mode VARCHAR(20) DEFAULT 'instant',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_mkt.email_suppression (
  email_address VARCHAR(255) PRIMARY KEY,
  tenant_id VARCHAR(20) NOT NULL,
  suppression_reason VARCHAR(30) CHECK (suppression_reason IN ('hard_bounce','complaint','unsubscribe','admin_block','gdpr_request')),
  scope VARCHAR(20) CHECK (scope IN ('all','marketing_only','specific_topic')),
  source_email_log_id UUID,
  suppressed_at TIMESTAMPTZ DEFAULT NOW(),
  resubscribed_at TIMESTAMPTZ,
  gdpr_deletion_requested_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS email_mkt.email_provider_config (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  provider_name VARCHAR(30) CHECK (provider_name IN ('resend','sendgrid','postmark','ses','mailgun','smtp')),
  api_key_encrypted TEXT,
  domain_verified BOOLEAN, dkim_configured BOOLEAN,
  spf_configured BOOLEAN, dmarc_policy VARCHAR(40),
  max_send_rate_per_second INT,
  daily_quota INT, monthly_quota INT,
  priority INT,
  used_for_categories TEXT[],
  region VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  last_health_check_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS email_mkt.email_webhook_event (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  provider_id UUID,
  event_type VARCHAR(30),
  provider_message_id VARCHAR(120),
  payload_jsonb JSONB,
  processed BOOLEAN DEFAULT FALSE,
  processing_error TEXT,
  received_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_webhook_event_brin ON email_mkt.email_webhook_event USING BRIN (received_at);

CREATE TABLE IF NOT EXISTS email_mkt.email_compliance_record (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  user_id UUID,
  action_type VARCHAR(40) CHECK (action_type IN ('consent_given','consent_withdrawn','data_export_requested','data_deletion_requested')),
  source VARCHAR(40),
  evidence_jsonb JSONB,
  processed_by_user_id UUID,
  processed_at TIMESTAMPTZ,
  regulator_notified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='email_mkt' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='email_mkt' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE email_mkt.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON email_mkt.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON email_mkt.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('25_email_marketing.sql', 'Email Marketing Automation: 16 tables');
