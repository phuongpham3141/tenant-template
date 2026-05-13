-- Migration 32: Public Seller API (Domain 21)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS api.api_app (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  app_id VARCHAR(40) NOT NULL UNIQUE,
  name VARCHAR(255),
  developer_user_id UUID,
  description TEXT,
  redirect_uris TEXT[],
  allowed_scopes TEXT[],
  client_id VARCHAR(80) NOT NULL UNIQUE,
  client_secret_hash CHAR(64),
  status VARCHAR(20) DEFAULT 'pending_review',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  listed_in_marketplace BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS api.api_key (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID REFERENCES identity.supplier(id),
  key_id VARCHAR(40) NOT NULL UNIQUE,
  key_hash CHAR(64) NOT NULL,
  key_prefix VARCHAR(20) NOT NULL,
  name VARCHAR(120),
  scopes TEXT[],
  created_by_user_id UUID,
  expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  usage_count BIGINT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','revoked','expired')),
  revoked_reason TEXT
);

CREATE TABLE IF NOT EXISTS api.api_oauth_grant (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  app_id UUID NOT NULL REFERENCES api.api_app(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  granted_by_user_id UUID,
  scopes TEXT[],
  access_token_hash CHAR(64),
  refresh_token_hash CHAR(64),
  expires_at TIMESTAMPTZ,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS api.api_scope (
  scope_name VARCHAR(80) PRIMARY KEY,
  description TEXT,
  requires_review BOOLEAN DEFAULT FALSE,
  is_dangerous BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS api.api_quota (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  subject_type VARCHAR(10) CHECK (subject_type IN ('app','key','supplier')),
  subject_id UUID NOT NULL,
  endpoint_pattern VARCHAR(255),
  requests_per_minute INT,
  requests_per_hour INT,
  requests_per_day INT,
  burst_allowance INT,
  current_window_count INT DEFAULT 0,
  reset_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS api.api_call_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  called_at TIMESTAMPTZ DEFAULT NOW(),
  subject_id UUID,
  endpoint VARCHAR(255),
  http_method VARCHAR(10),
  response_status INT,
  response_time_ms INT,
  request_size_bytes INT,
  response_size_bytes INT,
  error_code VARCHAR(40),
  rate_limited BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_call_log_brin ON api.api_call_log USING BRIN (called_at);

CREATE TABLE IF NOT EXISTS api.webhook_subscription (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  app_id UUID, supplier_id UUID,
  event_type VARCHAR(80),
  endpoint_url TEXT NOT NULL,
  secret_for_signature TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  retry_policy_jsonb JSONB
);

CREATE TABLE IF NOT EXISTS api.webhook_delivery_attempt (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  subscription_id UUID NOT NULL REFERENCES api.webhook_subscription(id) ON DELETE CASCADE,
  event_id UUID,
  attempt_number INT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  response_status INT,
  response_body_excerpt TEXT,
  response_time_ms INT,
  succeeded BOOLEAN,
  next_retry_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_webhook_retry ON api.webhook_delivery_attempt (next_retry_at) WHERE NOT succeeded AND next_retry_at IS NOT NULL;

CREATE TABLE IF NOT EXISTS api.api_event_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  event_type VARCHAR(80),
  source_entity_type VARCHAR(40),
  source_entity_id UUID,
  payload_jsonb JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ttl_until TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS api.sandbox_environment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  app_id UUID NOT NULL REFERENCES api.api_app(id) ON DELETE CASCADE,
  sandbox_id VARCHAR(40) NOT NULL UNIQUE,
  test_data_seed_jsonb JSONB,
  expires_at TIMESTAMPTZ,
  isolated_db_schema VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS api.api_version_record (
  version VARCHAR(10) PRIMARY KEY,
  released_at TIMESTAMPTZ,
  deprecated_at TIMESTAMPTZ,
  sunset_at TIMESTAMPTZ,
  breaking_changes_doc_url TEXT,
  active_apps_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS api.developer_marketplace_listing (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  app_id UUID NOT NULL REFERENCES api.api_app(id) ON DELETE CASCADE,
  listing_status VARCHAR(20) DEFAULT 'draft',
  description_i18n JSONB,
  screenshots TEXT[],
  pricing_jsonb JSONB,
  install_count BIGINT DEFAULT 0,
  rating NUMERIC(3,2),
  reviews INT,
  support_email VARCHAR(255),
  privacy_policy_url TEXT
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='api' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='api' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE api.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON api.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON api.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('32_public_api.sql', 'Public Seller API: 12 tables');
