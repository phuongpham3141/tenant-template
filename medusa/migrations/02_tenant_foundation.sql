-- ============================================================================
-- Cybersilkroads — Migration 02: Tenant Foundation (Domain 38)
-- ============================================================================
-- Purpose: Multi-tenant configuration root. Must run before anything else
--          because every other table references tenant_id.
-- Run after: 01_schemas.sql
-- Tables: 11 (tenant_master + 10 config tables)
-- Idempotent: YES
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- tenant.tenant_master — Root tenant record
-- ----------------------------------------------------------------------------
-- This is THE foundation table. Every other tenant-scoped table FKs here.
-- For single-tenant deploy: 1 row with tenant_id = 'csr'.
-- For white-label SaaS: many rows.

CREATE TABLE IF NOT EXISTS tenant.tenant_master (
  -- Primary key is varchar (human-readable tenant ID like 'csr', 'vingroup', 'vcb')
  tenant_id              VARCHAR(20) PRIMARY KEY
                          CHECK (tenant_id ~ '^[a-z][a-z0-9_-]{1,19}$'),
  -- Standard timestamps (no created_by because tenant creation is via admin)
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  -- Identity
  company_legal_name     VARCHAR(255) NOT NULL,
  display_name           VARCHAR(120) NOT NULL,
  contact_email          VARCHAR(255) NOT NULL,
  contact_phone          VARCHAR(30),

  -- Status
  status                 VARCHAR(20) NOT NULL DEFAULT 'provisioning'
                          CHECK (status IN ('provisioning','trial','active','past_due','suspended','terminated')),
  activated_at           TIMESTAMPTZ,
  terminated_at          TIMESTAMPTZ,
  termination_reason     TEXT,

  -- Locale defaults
  data_residency_country CHAR(2) NOT NULL DEFAULT 'VN',
  primary_currency       CHAR(3) NOT NULL DEFAULT 'VND',
  primary_locale         CHAR(2) NOT NULL DEFAULT 'vi'
                          CHECK (primary_locale IN ('vi','en','cn')),
  supported_locales      TEXT[] NOT NULL DEFAULT ARRAY['vi','en','cn'],
  primary_timezone       VARCHAR(50) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',

  CHECK (deleted_at IS NULL OR updated_at <= deleted_at)
);

CREATE INDEX IF NOT EXISTS idx_tenant_master_status ON tenant.tenant_master (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_tenant_master_active ON tenant.tenant_master (tenant_id) WHERE status = 'active';

COMMENT ON TABLE tenant.tenant_master IS 'Root tenant record. Every tenant-scoped table FKs here via tenant_id.';

-- Seed default tenant (Cybersilkroads)
INSERT INTO tenant.tenant_master (
  tenant_id, company_legal_name, display_name, contact_email,
  status, activated_at, data_residency_country, primary_currency,
  primary_locale, supported_locales, primary_timezone
)
VALUES (
  'csr', 'Cybersilkroads JSC', 'Cybersilkroads',
  'ops@cybersilkroads.vn', 'active', NOW(),
  'VN', 'VND', 'vi', ARRAY['vi','en','cn'], 'Asia/Ho_Chi_Minh'
)
ON CONFLICT (tenant_id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- tenant.tenant_branding — White-label branding per tenant
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_branding (
  tenant_id              VARCHAR(20) PRIMARY KEY REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  brand_name_i18n        JSONB NOT NULL DEFAULT '{"vi":"","en":"","cn":""}',
  logo_light_url         TEXT,
  logo_dark_url          TEXT,
  favicon_url            TEXT,

  primary_color          VARCHAR(7),       -- "#005F6B"
  secondary_color        VARCHAR(7),
  accent_color           VARCHAR(7),
  font_heading           VARCHAR(80),      -- Google Fonts ref
  font_body              VARCHAR(80),

  email_from_address     VARCHAR(255),
  email_from_name        VARCHAR(120),
  email_signature_template TEXT,

  social_media_links     JSONB DEFAULT '{}',
  custom_footer_links    JSONB DEFAULT '[]',
  custom_css             TEXT,             -- Optional brand CSS injection
  custom_meta_tags       TEXT
);

COMMENT ON TABLE tenant.tenant_branding IS 'White-label branding config per tenant';

INSERT INTO tenant.tenant_branding (
  tenant_id, brand_name_i18n, primary_color, secondary_color, accent_color,
  email_from_address, email_from_name
)
VALUES (
  'csr',
  '{"vi":"Cybersilkroads","en":"Cybersilkroads","cn":"赛博丝绸之路"}',
  '#005F6B', '#002557', '#E8943A',
  'noreply@cybersilkroads.vn', 'Cybersilkroads'
)
ON CONFLICT (tenant_id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- tenant.tenant_domain — Custom domains per tenant
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_domain (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  domain                 VARCHAR(255) NOT NULL UNIQUE
                          CHECK (domain ~ '^[a-z0-9.-]+\.[a-z]{2,}$'),
  is_primary             BOOLEAN NOT NULL DEFAULT FALSE,
  domain_purpose         VARCHAR(20) NOT NULL DEFAULT 'storefront'
                          CHECK (domain_purpose IN ('storefront','admin','cms','api','metrics','minio','custom')),
  verification_status    VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (verification_status IN ('pending','dns_challenge','verified','failed','expired')),
  dns_challenge_record   TEXT,
  verified_at            TIMESTAMPTZ,
  www_redirect           BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_tenant_domain_tenant ON tenant.tenant_domain (tenant_id) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_tenant_domain_primary
  ON tenant.tenant_domain (tenant_id, domain_purpose)
  WHERE is_primary = TRUE AND deleted_at IS NULL;

COMMENT ON TABLE tenant.tenant_domain IS 'Custom domain mappings per tenant (for white-label SaaS)';

-- Seed CSR domains (only 1 per (tenant_id, domain_purpose) marked is_primary=TRUE)
INSERT INTO tenant.tenant_domain (tenant_id, domain, is_primary, domain_purpose, verification_status, verified_at)
VALUES
  ('csr', 'cybersilkroads.vn',     TRUE,  'storefront', 'verified', NOW()),
  ('csr', 'shop.huayuesc.local',   FALSE, 'storefront', 'verified', NOW()),  -- dev alias
  ('csr', 'admin.huayuesc.local',  TRUE,  'admin',      'verified', NOW()),
  ('csr', 'cms.huayuesc.local',    TRUE,  'cms',        'verified', NOW()),
  ('csr', 'api.huayuesc.local',    TRUE,  'api',        'verified', NOW())
ON CONFLICT (domain) DO NOTHING;

-- ----------------------------------------------------------------------------
-- tenant.tenant_ssl_certificate — SSL/TLS certificates per domain
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_ssl_certificate (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  domain_id              UUID NOT NULL REFERENCES tenant.tenant_domain(id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,

  provider               VARCHAR(30) NOT NULL CHECK (provider IN ('lets_encrypt','cloudflare','custom','self_signed')),
  cert_pem_encrypted     TEXT NOT NULL,       -- Encrypted with KMS key (app handles encrypt/decrypt)
  private_key_encrypted  TEXT NOT NULL,
  chain_pem_encrypted    TEXT,
  issued_at              TIMESTAMPTZ NOT NULL,
  expires_at             TIMESTAMPTZ NOT NULL,
  auto_renew             BOOLEAN NOT NULL DEFAULT TRUE,
  last_renewed_at        TIMESTAMPTZ,
  renewal_failure_count  INT NOT NULL DEFAULT 0,
  fingerprint_sha256     CHAR(64)
);

CREATE INDEX IF NOT EXISTS idx_ssl_domain ON tenant.tenant_ssl_certificate (domain_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_ssl_expiring
  ON tenant.tenant_ssl_certificate (expires_at)
  WHERE deleted_at IS NULL AND auto_renew = TRUE;

COMMENT ON TABLE tenant.tenant_ssl_certificate IS 'SSL certificates (Lets Encrypt auto-renew or custom)';

-- ----------------------------------------------------------------------------
-- tenant.tenant_subscription_plan — Plan tier master
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_subscription_plan (
  plan_code              VARCHAR(40) PRIMARY KEY,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  name_i18n              JSONB NOT NULL,
  description_i18n       JSONB,
  monthly_price_usd_minor BIGINT NOT NULL DEFAULT 0,
  annual_price_usd_minor  BIGINT NOT NULL DEFAULT 0,

  features_included      JSONB NOT NULL DEFAULT '{}',  -- {feature_flag_key: true/false}
  quotas                 JSONB NOT NULL DEFAULT '{}',  -- {max_suppliers, max_products, max_storage_gb, ...}

  trial_days             INT NOT NULL DEFAULT 0,
  setup_fee_usd_minor    BIGINT NOT NULL DEFAULT 0,
  billing_cycle_options  TEXT[] NOT NULL DEFAULT ARRAY['monthly','annual'],

  is_active              BOOLEAN NOT NULL DEFAULT TRUE,
  is_public              BOOLEAN NOT NULL DEFAULT TRUE,   -- listed in pricing page
  display_order          INT NOT NULL DEFAULT 0
);

COMMENT ON TABLE tenant.tenant_subscription_plan IS 'White-label SaaS plan tiers (separate from supplier membership tiers)';

-- Seed default plans for white-label (phase 3 feature, schema ready)
INSERT INTO tenant.tenant_subscription_plan (plan_code, name_i18n, monthly_price_usd_minor, trial_days, features_included, quotas)
VALUES
  ('starter',     '{"vi":"Khởi đầu","en":"Starter","cn":"入门"}',     49900,  30,
    '{"marketplace.enabled":true,"site_builder.enabled":true,"ai.buyer_assistant":true}',
    '{"max_suppliers":100,"max_products":10000,"max_storage_gb":50,"max_api_calls_month":100000}'),
  ('growth',      '{"vi":"Tăng trưởng","en":"Growth","cn":"成长"}',   199900, 30,
    '{"marketplace.enabled":true,"site_builder.enabled":true,"ai.buyer_assistant":true,"ai.supplier_assistant":true,"live.basic_streaming":true}',
    '{"max_suppliers":1000,"max_products":100000,"max_storage_gb":500,"max_api_calls_month":1000000}'),
  ('enterprise',  '{"vi":"Doanh nghiệp","en":"Enterprise","cn":"企业"}', 999900, 60,
    '{"marketplace.enabled":true,"site_builder.enabled":true,"ai.buyer_assistant":true,"ai.supplier_assistant":true,"live.basic_streaming":true,"api.public_seller_api":true}',
    '{"max_suppliers":-1,"max_products":-1,"max_storage_gb":5000,"max_api_calls_month":100000000}')
ON CONFLICT (plan_code) DO NOTHING;

-- ----------------------------------------------------------------------------
-- tenant.tenant_plan_subscription — Active plan subscription per tenant
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_plan_subscription (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  plan_code              VARCHAR(40) NOT NULL REFERENCES tenant.tenant_subscription_plan(plan_code) ON DELETE RESTRICT,
  billing_cycle          VARCHAR(20) NOT NULL CHECK (billing_cycle IN ('monthly','annual','custom')),

  started_at             TIMESTAMPTZ NOT NULL,
  current_period_start   TIMESTAMPTZ NOT NULL,
  current_period_end     TIMESTAMPTZ NOT NULL,
  trial_ends_at          TIMESTAMPTZ,

  status                 VARCHAR(20) NOT NULL CHECK (status IN ('active','trial','past_due','cancelled','expired')),
  cancelled_at           TIMESTAMPTZ,
  cancellation_reason    TEXT,

  payment_method_id      UUID,          -- FK to payment.payment_method_token (created later)
  discount_code_applied  VARCHAR(40),
  discount_pct           NUMERIC(5,2)
);

CREATE INDEX IF NOT EXISTS idx_tenant_plan_sub_tenant ON tenant.tenant_plan_subscription (tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_plan_sub_status ON tenant.tenant_plan_subscription (status, current_period_end);

COMMENT ON TABLE tenant.tenant_plan_subscription IS 'Active SaaS plan subscription per tenant';

-- Seed CSR as enterprise (free for now, schema ready)
INSERT INTO tenant.tenant_plan_subscription (
  tenant_id, plan_code, billing_cycle, started_at,
  current_period_start, current_period_end, status
)
VALUES (
  'csr', 'enterprise', 'annual', NOW(),
  NOW(), NOW() + INTERVAL '5 years', 'active'
)
ON CONFLICT DO NOTHING;

-- ----------------------------------------------------------------------------
-- tenant.tenant_usage_metering — Usage tracking per dimension
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_usage_metering (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  period_start           DATE NOT NULL,
  period_end             DATE NOT NULL,

  dimension              VARCHAR(40) NOT NULL CHECK (dimension IN (
    'api_calls','storage_gb','bandwidth_gb','suppliers','products','orders',
    'ai_tokens_input','ai_tokens_output','ai_tokens_cached',
    'live_minutes','sms_sent','email_sent','transcode_minutes',
    'embedding_count','search_queries','active_users_dau','active_users_mau'
  )),

  used_quantity          BIGINT NOT NULL DEFAULT 0,
  included_quantity      BIGINT NOT NULL DEFAULT 0,
  overage_quantity       BIGINT GENERATED ALWAYS AS (GREATEST(0, used_quantity - included_quantity)) STORED,
  overage_rate_usd_per_unit NUMERIC(12,6) NOT NULL DEFAULT 0,
  overage_total_usd_minor BIGINT GENERATED ALWAYS AS (
    (GREATEST(0, used_quantity - included_quantity)::NUMERIC * overage_rate_usd_per_unit * 100)::BIGINT
  ) STORED,

  UNIQUE(tenant_id, period_start, dimension)
);

CREATE INDEX IF NOT EXISTS idx_usage_tenant_period ON tenant.tenant_usage_metering (tenant_id, period_end DESC);
CREATE INDEX IF NOT EXISTS idx_usage_overage
  ON tenant.tenant_usage_metering (tenant_id, period_end DESC)
  WHERE overage_quantity > 0;

COMMENT ON TABLE tenant.tenant_usage_metering IS 'Per-tenant usage tracking by metering dimension (for billing overages)';

-- ----------------------------------------------------------------------------
-- tenant.tenant_billing_account — Billing config per tenant
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_billing_account (
  tenant_id              VARCHAR(20) PRIMARY KEY REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  billing_email          VARCHAR(255) NOT NULL,
  billing_address        JSONB,                            -- {street, city, province, postal, country}
  tax_id_for_invoice     VARCHAR(50),                      -- VAT number / MST
  payment_method_id      UUID,                             -- FK to payment.payment_method_token
  payment_terms_days     INT NOT NULL DEFAULT 0
                          CHECK (payment_terms_days IN (0, 7, 15, 30, 45, 60, 90)),
  late_fee_pct           NUMERIC(5,2) NOT NULL DEFAULT 0,
  currency_preference    CHAR(3) NOT NULL DEFAULT 'USD',
  invoice_delivery_method VARCHAR(20) NOT NULL DEFAULT 'email'
                          CHECK (invoice_delivery_method IN ('email','portal','both','postal')),
  invoice_language       CHAR(2) NOT NULL DEFAULT 'vi',
  poc_user_id            UUID,                             -- Point of contact
  auto_charge_enabled    BOOLEAN NOT NULL DEFAULT TRUE
);

COMMENT ON TABLE tenant.tenant_billing_account IS 'Tenant billing config (separate from supplier billing)';

-- ----------------------------------------------------------------------------
-- tenant.tenant_feature_entitlement — Feature flag overrides per tenant
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_feature_entitlement (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  feature_flag_key       VARCHAR(120) NOT NULL,
  entitled               BOOLEAN NOT NULL,
  override_reason        TEXT,
  override_until         TIMESTAMPTZ,
  source                 VARCHAR(30) NOT NULL DEFAULT 'admin_grant'
                          CHECK (source IN ('plan_default','trial','admin_grant','paid_addon','beta_program','automated_policy')),
  config_jsonb           JSONB DEFAULT '{}',              -- Optional config for the flag

  UNIQUE(tenant_id, feature_flag_key)
);

CREATE INDEX IF NOT EXISTS idx_feature_entitlement_tenant ON tenant.tenant_feature_entitlement (tenant_id);
CREATE INDEX IF NOT EXISTS idx_feature_entitlement_expiring
  ON tenant.tenant_feature_entitlement (override_until)
  WHERE override_until IS NOT NULL;

COMMENT ON TABLE tenant.tenant_feature_entitlement IS 'Per-tenant feature flag overrides (extends plan defaults)';

-- ----------------------------------------------------------------------------
-- tenant.tenant_data_residency_policy — Data location compliance
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_data_residency_policy (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  data_class             VARCHAR(30) NOT NULL CHECK (data_class IN ('pii','financial','behavioral','content','aggregate','any')),
  allowed_regions        TEXT[] NOT NULL,                  -- ['vn','sg','jp']
  disallowed_regions     TEXT[] NOT NULL DEFAULT '{}',
  compliance_basis       VARCHAR(40) NOT NULL CHECK (compliance_basis IN (
    'gdpr','vn_ndp_13_2023','china_pipl','singapore_pdpa','user_contract','company_policy'
  )),
  enforcement_active     BOOLEAN NOT NULL DEFAULT TRUE,
  last_audited_at        TIMESTAMPTZ,
  last_auditor           VARCHAR(120),

  UNIQUE(tenant_id, data_class)
);

COMMENT ON TABLE tenant.tenant_data_residency_policy IS 'Data residency policy per tenant per data class (GDPR/VN compliance)';

-- ----------------------------------------------------------------------------
-- tenant.tenant_overage_charge — Billing for overage usage
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tenant.tenant_overage_charge (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  period_start           DATE NOT NULL,
  period_end             DATE NOT NULL,
  metering_record_ids    UUID[] NOT NULL,
  total_overage_usd_minor BIGINT NOT NULL,
  invoiced               BOOLEAN NOT NULL DEFAULT FALSE,
  invoice_id             UUID,
  paid_at                TIMESTAMPTZ,

  UNIQUE(tenant_id, period_start)
);

CREATE INDEX IF NOT EXISTS idx_overage_unpaid ON tenant.tenant_overage_charge (tenant_id, period_end DESC) WHERE NOT invoiced;

-- ----------------------------------------------------------------------------
-- Feature flags master (referenced by entitlements above)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS admin.feature_flag_master (
  flag_key               VARCHAR(120) PRIMARY KEY,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  category               VARCHAR(40) NOT NULL CHECK (category IN (
    'commerce_core','b2b','b2c','live_commerce','media','ai','marketing',
    'fulfillment','payment','compliance','security','rbac','search',
    'communication','site_builder','tenant','foundation','vn_sourcing'
  )),
  description_i18n       JSONB NOT NULL DEFAULT '{}',
  default_enabled        BOOLEAN NOT NULL DEFAULT FALSE,
  phase                  VARCHAR(10) NOT NULL DEFAULT 'phase_1'
                          CHECK (phase IN ('phase_1','phase_2','phase_3','deprecated')),
  requires_plan_minimum  VARCHAR(40),                      -- FK to plan if requires specific tier
  config_schema_jsonb    JSONB,                            -- JSON schema for config when enabling
  is_dangerous           BOOLEAN NOT NULL DEFAULT FALSE,
  ga_at                  TIMESTAMPTZ,                      -- When moved out of beta
  sunset_at              TIMESTAMPTZ
);

COMMENT ON TABLE admin.feature_flag_master IS 'Master registry of all ~210 feature flags';
CREATE INDEX IF NOT EXISTS idx_feature_flag_category ON admin.feature_flag_master (category, phase);

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------

CREATE TRIGGER trg_tenant_master_updated_at
  BEFORE UPDATE ON tenant.tenant_master
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_tenant_branding_updated_at
  BEFORE UPDATE ON tenant.tenant_branding
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_tenant_domain_updated_at
  BEFORE UPDATE ON tenant.tenant_domain
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_tenant_ssl_updated_at
  BEFORE UPDATE ON tenant.tenant_ssl_certificate
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_tenant_plan_sub_updated_at
  BEFORE UPDATE ON tenant.tenant_plan_subscription
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_tenant_usage_updated_at
  BEFORE UPDATE ON tenant.tenant_usage_metering
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_tenant_billing_updated_at
  BEFORE UPDATE ON tenant.tenant_billing_account
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_tenant_feature_updated_at
  BEFORE UPDATE ON tenant.tenant_feature_entitlement
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_tenant_residency_updated_at
  BEFORE UPDATE ON tenant.tenant_data_residency_policy
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_tenant_overage_updated_at
  BEFORE UPDATE ON tenant.tenant_overage_charge
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TRIGGER trg_feature_flag_updated_at
  BEFORE UPDATE ON admin.feature_flag_master
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- RLS not needed on tenant.* tables themselves (they hold tenant config)
-- But policies prevent cross-tenant reads of OTHER tenants' configs.
-- ----------------------------------------------------------------------------

ALTER TABLE tenant.tenant_branding ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_self_branding ON tenant.tenant_branding
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

ALTER TABLE tenant.tenant_domain ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_self_domain ON tenant.tenant_domain
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

ALTER TABLE tenant.tenant_ssl_certificate ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_self_ssl ON tenant.tenant_ssl_certificate
  USING (
    domain_id IN (SELECT id FROM tenant.tenant_domain WHERE tenant_id = public.current_tenant_id())
    OR pg_has_role('csr_admin', 'MEMBER')
  );

ALTER TABLE tenant.tenant_plan_subscription ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_self_plan_sub ON tenant.tenant_plan_subscription
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

ALTER TABLE tenant.tenant_usage_metering ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_self_usage ON tenant.tenant_usage_metering
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

ALTER TABLE tenant.tenant_billing_account ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_self_billing ON tenant.tenant_billing_account
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

ALTER TABLE tenant.tenant_feature_entitlement ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_self_features ON tenant.tenant_feature_entitlement
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

ALTER TABLE tenant.tenant_data_residency_policy ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_self_residency ON tenant.tenant_data_residency_policy
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

ALTER TABLE tenant.tenant_overage_charge ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_self_overage ON tenant.tenant_overage_charge
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin', 'MEMBER'));

-- Log migration
INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('02_tenant_foundation.sql', '11 tenant config tables + feature_flag_master + RLS policies + seed CSR');

-- ============================================================================
-- END migration 02_tenant_foundation.sql
-- Tables created: 11
--   - tenant.tenant_master (root)
--   - tenant.tenant_branding
--   - tenant.tenant_domain
--   - tenant.tenant_ssl_certificate
--   - tenant.tenant_subscription_plan (master)
--   - tenant.tenant_plan_subscription (instance)
--   - tenant.tenant_usage_metering
--   - tenant.tenant_billing_account
--   - tenant.tenant_feature_entitlement
--   - tenant.tenant_data_residency_policy
--   - tenant.tenant_overage_charge
--   - admin.feature_flag_master
-- Seeds: csr tenant + branding + 5 domains + enterprise plan + 3 default plans
-- ============================================================================
