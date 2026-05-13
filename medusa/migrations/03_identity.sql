-- ============================================================================
-- Cybersilkroads — Migration 03: Identity (Domain 1)
-- ============================================================================
-- Tables: user, user_profile, supplier, supplier_user, dealer_capability,
--         verification_record, kyc_document, notification_preference
-- Depends on: 02_tenant_foundation.sql
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- identity.user — Core user entity (extends Medusa customer concept)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS identity."user" (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  created_by_user_id     UUID,
  updated_by_user_id     UUID,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  -- Login credentials
  email                  VARCHAR(255) NOT NULL,
  phone                  VARCHAR(30),                                 -- E.164 format
  password_hash          VARCHAR(255),                                -- Argon2id (NULL if SSO-only)

  -- Role + scope
  role                   VARCHAR(20) NOT NULL DEFAULT 'buyer'
                          CHECK (role IN ('buyer','dealer','factory_staff','admin','support','system')),
  primary_supplier_id    UUID,                                        -- FK supplier (added later)

  -- Locale + commerce preferences
  primary_locale         CHAR(2) NOT NULL DEFAULT 'vi' CHECK (primary_locale IN ('vi','en','cn')),
  primary_currency       CHAR(3) NOT NULL DEFAULT 'VND',
  country_code           CHAR(2) NOT NULL DEFAULT 'VN',
  timezone               VARCHAR(50) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',

  -- Business context (B2B)
  tax_id                 VARCHAR(50),                                 -- MST (VN) / Tax number
  company_name           VARCHAR(255),
  is_b2b                 BOOLEAN NOT NULL DEFAULT FALSE,

  -- Verification states
  email_verified_at      TIMESTAMPTZ,
  phone_verified_at      TIMESTAMPTZ,
  identity_verified_at   TIMESTAMPTZ,

  -- Activity
  last_login_at          TIMESTAMPTZ,
  last_login_ip          INET,
  last_active_at         TIMESTAMPTZ,

  -- Suspension
  suspended_at           TIMESTAMPTZ,
  suspension_reason      TEXT,

  -- Risk
  aml_risk_score         INT CHECK (aml_risk_score BETWEEN 0 AND 100),

  -- Constraints
  UNIQUE (tenant_id, email),
  CHECK (deleted_at IS NULL OR updated_at <= deleted_at)
);

CREATE INDEX IF NOT EXISTS idx_user_tenant ON identity."user" (tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_email_lower ON identity."user" (tenant_id, LOWER(email)) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_phone ON identity."user" (tenant_id, phone) WHERE phone IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_role ON identity."user" (tenant_id, role) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_country ON identity."user" (tenant_id, country_code) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_b2b ON identity."user" (tenant_id) WHERE is_b2b = TRUE AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_tax_id ON identity."user" (tenant_id, tax_id) WHERE tax_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_suspended ON identity."user" (tenant_id) WHERE suspended_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_last_active ON identity."user" (last_active_at DESC) WHERE deleted_at IS NULL;

COMMENT ON TABLE identity."user" IS 'Core user entity. Extends Medusa Customer concept. Includes buyer/dealer/factory staff/admin/system roles.';
COMMENT ON COLUMN identity."user".role IS 'buyer | dealer | factory_staff | admin | support | system';
COMMENT ON COLUMN identity."user".tax_id IS 'Vietnam: Mã số thuế (MST). China: Unified Social Credit Code.';

-- ----------------------------------------------------------------------------
-- identity.user_profile — Separate PII (display, address, interests)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS identity.user_profile (
  user_id                UUID PRIMARY KEY REFERENCES identity."user"(id) ON DELETE CASCADE,
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  display_name           VARCHAR(150) NOT NULL,
  first_name             VARCHAR(80),
  last_name              VARCHAR(80),
  avatar_url             TEXT,
  job_title              VARCHAR(120),

  -- Address (single primary; multiple addresses go to identity.address)
  address_line1          TEXT,
  address_line2          TEXT,
  address_city           VARCHAR(120),
  address_province       VARCHAR(120),
  address_postal         VARCHAR(20),
  address_country_code   CHAR(2),

  -- Preferences
  interests              TEXT[] NOT NULL DEFAULT '{}',
  industries_followed    UUID[] NOT NULL DEFAULT '{}',                -- FK to medusa_category later

  -- Demographics (B2B)
  revenue_bracket        VARCHAR(20) CHECK (revenue_bracket IN
                          ('under_1m','1m_5m','5m_20m','20m_100m','100m_plus','undisclosed')),
  employee_count_bracket VARCHAR(20) CHECK (employee_count_bracket IN
                          ('1_10','11_50','51_200','201_500','501_1000','1001_plus','undisclosed'))
);

CREATE INDEX IF NOT EXISTS idx_user_profile_tenant ON identity.user_profile (tenant_id);
CREATE INDEX IF NOT EXISTS idx_user_profile_city ON identity.user_profile (tenant_id, address_city);
CREATE INDEX IF NOT EXISTS idx_user_profile_interests ON identity.user_profile USING GIN (interests);
CREATE INDEX IF NOT EXISTS idx_user_profile_industries ON identity.user_profile USING GIN (industries_followed);
CREATE INDEX IF NOT EXISTS idx_user_profile_name_trgm ON identity.user_profile USING GIN (display_name gin_trgm_ops);

COMMENT ON TABLE identity.user_profile IS 'PII separated from user table for compliance + access control';

-- ----------------------------------------------------------------------------
-- identity.supplier — Heavy entity (Marketplace Module)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS identity.supplier (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  created_by_user_id     UUID,
  updated_by_user_id     UUID,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  -- Identity
  slug                   VARCHAR(80) NOT NULL,
  legal_name             VARCHAR(255) NOT NULL,
  display_name_i18n      JSONB NOT NULL DEFAULT '{"vi":"","en":"","cn":""}',
  supplier_type          VARCHAR(30) NOT NULL DEFAULT 'factory'
                          CHECK (supplier_type IN ('factory','dealer_distributor','dealer_broker','trading_company','service_vendor')),

  -- Location
  country_code           CHAR(2) NOT NULL DEFAULT 'CN',
  province               VARCHAR(120),
  city                   VARCHAR(120),
  address_line           TEXT,
  geo_lat                NUMERIC(10,7),
  geo_lng                NUMERIC(10,7),

  -- Currency + language
  primary_currency       CHAR(3) NOT NULL DEFAULT 'CNY',
  support_languages      TEXT[] NOT NULL DEFAULT ARRAY['vi','en','cn'],

  -- Verification (7 tiers per Q-D1.6)
  verification_tier      SMALLINT NOT NULL DEFAULT 0 CHECK (verification_tier BETWEEN 0 AND 6),
  is_audited             BOOLEAN NOT NULL DEFAULT FALSE,
  audit_expires_at       TIMESTAMPTZ,
  audit_organization     VARCHAR(40),

  -- Business profile
  years_in_business      SMALLINT,
  employee_count_bracket VARCHAR(20) CHECK (employee_count_bracket IN
                          ('1_10','11_50','51_200','201_500','501_1000','1001_plus','undisclosed')),
  annual_revenue_bracket VARCHAR(20) CHECK (annual_revenue_bracket IN
                          ('under_1m','1m_5m','5m_20m','20m_100m','100m_plus','undisclosed')),

  -- Media (links to media_asset table later)
  vr360_com_id           VARCHAR(80),
  intro_video_url        TEXT,
  logo_url               TEXT,
  cover_image_url        TEXT,

  -- Tags + categories
  tags                   TEXT[] NOT NULL DEFAULT '{}',
  category_ids           UUID[] NOT NULL DEFAULT '{}',

  -- Commercial
  commission_rate_pct    NUMERIC(5,3) NOT NULL DEFAULT 1.000 CHECK (commission_rate_pct BETWEEN 0 AND 100),
  membership_tier        VARCHAR(20) NOT NULL DEFAULT 'free'
                          CHECK (membership_tier IN ('free','gold','titan','diamond')),
  membership_started_at  TIMESTAMPTZ,
  membership_expires_at  TIMESTAMPTZ,

  -- Rolling 12-month sales (for Titan/Diamond auto-promotion per Q-FU4)
  rolling_12m_gmv_usd_minor BIGINT NOT NULL DEFAULT 0,
  rolling_12m_recalc_at  TIMESTAMPTZ,

  -- Ratings (computed from buyer reviews + auto-metrics, weighted)
  rating_overall         NUMERIC(3,2) CHECK (rating_overall BETWEEN 0 AND 5),
  rating_quality         NUMERIC(3,2),
  rating_response_time   NUMERIC(3,2),
  rating_shipping        NUMERIC(3,2),
  rating_communication   NUMERIC(3,2),
  rating_pricing         NUMERIC(3,2),
  rating_customization   NUMERIC(3,2),
  total_reviews          INT NOT NULL DEFAULT 0,

  -- Performance metrics
  response_rate_pct      NUMERIC(5,2),
  avg_response_hours     NUMERIC(8,2),
  on_time_shipping_pct   NUMERIC(5,2),
  dispute_rate_pct       NUMERIC(5,2),

  -- Order configuration
  opt_out_intermediary   BOOLEAN NOT NULL DEFAULT FALSE,                -- per Q-FU8 supplier choice
  accepts_oem_odm        BOOLEAN NOT NULL DEFAULT TRUE,
  accepts_sample_orders  BOOLEAN NOT NULL DEFAULT TRUE,
  min_order_value_usd_minor BIGINT,
  sells_b2c              BOOLEAN NOT NULL DEFAULT FALSE,
  sells_b2b              BOOLEAN NOT NULL DEFAULT TRUE,

  -- Lifecycle
  approved_at            TIMESTAMPTZ,
  approved_by_user_id    UUID,
  suspended_at           TIMESTAMPTZ,
  suspension_reason      TEXT,

  CONSTRAINT supplier_slug_unique UNIQUE (tenant_id, slug),
  CONSTRAINT supplier_soft_delete CHECK (deleted_at IS NULL OR updated_at <= deleted_at)
);

CREATE INDEX IF NOT EXISTS idx_supplier_tenant ON identity.supplier (tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_slug ON identity.supplier (tenant_id, slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_country ON identity.supplier (tenant_id, country_code) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_city ON identity.supplier (tenant_id, country_code, city) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_tier ON identity.supplier (tenant_id, verification_tier DESC, membership_tier) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_audited ON identity.supplier (tenant_id) WHERE is_audited = TRUE AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_membership ON identity.supplier (tenant_id, membership_tier) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_gmv ON identity.supplier (tenant_id, rolling_12m_gmv_usd_minor DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_rating ON identity.supplier (tenant_id, rating_overall DESC NULLS LAST) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_tags ON identity.supplier USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_supplier_categories ON identity.supplier USING GIN (category_ids);
CREATE INDEX IF NOT EXISTS idx_supplier_legal_name_trgm ON identity.supplier USING GIN (legal_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_supplier_display_name_trgm ON identity.supplier USING GIN ((display_name_i18n->>'vi') gin_trgm_ops);

COMMENT ON TABLE identity.supplier IS 'Supplier (Factory/Dealer) entity. Per-supplier silo catalog model.';
COMMENT ON COLUMN identity.supplier.verification_tier IS '0=Unverified, 1=Email/Phone, 2=Business, 3=Audited, 4=Gold, 5=Titan ($1M/y), 6=Diamond ($5M/y)';
COMMENT ON COLUMN identity.supplier.opt_out_intermediary IS 'Supplier opt out of platform Intermediary mode (force Direct only)';

-- Now add FK from user.primary_supplier_id (idempotent)
DO $fk$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_primary_supplier_fk'
  ) THEN
    ALTER TABLE identity."user"
      ADD CONSTRAINT user_primary_supplier_fk
      FOREIGN KEY (primary_supplier_id) REFERENCES identity.supplier(id) ON DELETE SET NULL;
  END IF;
END $fk$;

CREATE INDEX IF NOT EXISTS idx_user_primary_supplier ON identity."user" (primary_supplier_id) WHERE primary_supplier_id IS NOT NULL;

-- ----------------------------------------------------------------------------
-- identity.supplier_user — Junction table (N:N user ↔ supplier)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS identity.supplier_user (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  supplier_id            UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,

  role                   VARCHAR(20) NOT NULL DEFAULT 'staff'
                          CHECK (role IN ('owner','manager','staff','viewer','accountant','marketing','logistics')),
  permissions            JSONB NOT NULL DEFAULT '{}',                   -- Fine-grained overrides

  invited_at             TIMESTAMPTZ,
  invited_by_user_id     UUID REFERENCES identity."user"(id),
  accepted_at            TIMESTAMPTZ,
  revoked_at             TIMESTAMPTZ,
  revoked_by_user_id     UUID REFERENCES identity."user"(id),

  UNIQUE (user_id, supplier_id)
);

CREATE INDEX IF NOT EXISTS idx_supplier_user_user ON identity.supplier_user (user_id) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_user_supplier ON identity.supplier_user (supplier_id) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_supplier_user_role ON identity.supplier_user (supplier_id, role) WHERE revoked_at IS NULL;

COMMENT ON TABLE identity.supplier_user IS 'Junction table: user can be staff at multiple suppliers';

-- ----------------------------------------------------------------------------
-- identity.dealer_capability — 3 sub-capability for role=dealer (per Q-D1.2 Cách 2)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS identity.dealer_capability (
  user_id                UUID PRIMARY KEY REFERENCES identity."user"(id) ON DELETE CASCADE,
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  can_distribute         BOOLEAN NOT NULL DEFAULT FALSE,                 -- Has warehouse, resells
  can_broker             BOOLEAN NOT NULL DEFAULT FALSE,                 -- Connect factory↔buyer, no inventory
  can_buy_wholesale      BOOLEAN NOT NULL DEFAULT TRUE,                  -- VIP buyer (premium discount)

  broker_commission_pct  NUMERIC(5,3),                                   -- Negotiated rate
  distributor_warehouse_id UUID,                                          -- FK to warehouse_facility (created later)
  wholesale_customer_group_id UUID,                                       -- FK to customer_group (Medusa)

  -- Verification
  business_license_url   TEXT,
  verified_at            TIMESTAMPTZ,
  verified_by_user_id    UUID REFERENCES identity."user"(id)
);

CREATE INDEX IF NOT EXISTS idx_dealer_capability_tenant ON identity.dealer_capability (tenant_id);
CREATE INDEX IF NOT EXISTS idx_dealer_capability_active ON identity.dealer_capability (user_id)
  WHERE can_distribute = TRUE OR can_broker = TRUE;

COMMENT ON TABLE identity.dealer_capability IS 'Per Q-D1.2 Cách 2: dealer can have 3 sub-capabilities simultaneously';

-- ----------------------------------------------------------------------------
-- identity.verification_record — Audit trail of tier changes
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS identity.verification_record (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  supplier_id            UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,
  from_tier              SMALLINT NOT NULL CHECK (from_tier BETWEEN 0 AND 6),
  to_tier                SMALLINT NOT NULL CHECK (to_tier BETWEEN 0 AND 6),
  reason                 VARCHAR(50) NOT NULL CHECK (reason IN (
    'otp_verified','business_docs_approved','audit_completed',
    'membership_purchased','sales_threshold_met','sales_dropped_30pct',
    'manual_admin','suspension','reinstated','annual_recert','revoked'
  )),
  evidence_url           TEXT,
  approved_by_user_id    UUID REFERENCES identity."user"(id),
  trigger                VARCHAR(20) NOT NULL CHECK (trigger IN ('auto','manual','scheduled')),
  effective_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes                  TEXT
);

CREATE INDEX IF NOT EXISTS idx_verification_record_supplier ON identity.verification_record (supplier_id, effective_at DESC);
CREATE INDEX IF NOT EXISTS idx_verification_record_reason ON identity.verification_record (reason, effective_at DESC);

COMMENT ON TABLE identity.verification_record IS 'Immutable log of supplier tier changes (audit trail)';

-- ----------------------------------------------------------------------------
-- identity.kyc_document — KYC docs (polymorphic owner: user or supplier)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS identity.kyc_document (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  -- Polymorphic owner
  owner_type             VARCHAR(20) NOT NULL CHECK (owner_type IN ('user','supplier')),
  owner_id               UUID NOT NULL,

  -- Document details
  doc_type               VARCHAR(40) NOT NULL CHECK (doc_type IN (
    'business_license','tax_certificate','bank_statement',
    'iso_cert','ce_cert','rohs_cert','fda_cert','gmp_cert',
    'import_export_license','customs_registration',
    'company_articles','board_resolution','poa',
    'invoice_template','vat_registration',
    'audit_report','factory_inspection_report',
    'product_certificate','quality_test_report',
    'other'
  )),
  doc_number             VARCHAR(120),
  issuing_authority      VARCHAR(255),
  issuing_country_code   CHAR(2),
  issued_at              DATE,
  expires_at             DATE,

  -- File
  file_url               TEXT NOT NULL,
  file_hash_sha256       CHAR(64) NOT NULL,
  file_size_bytes        BIGINT NOT NULL,
  file_mime_type         VARCHAR(80),
  ocr_extracted_fields   JSONB,

  -- Review
  review_status          VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (review_status IN ('pending','under_review','approved','rejected','expired','superseded')),
  reviewed_by_user_id    UUID REFERENCES identity."user"(id),
  reviewed_at            TIMESTAMPTZ,
  rejection_reason       TEXT,
  superseded_by_doc_id   UUID,                                          -- Self-ref FK added below

  CHECK (deleted_at IS NULL OR updated_at <= deleted_at)
);

CREATE INDEX IF NOT EXISTS idx_kyc_doc_owner ON identity.kyc_document (owner_type, owner_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_kyc_doc_tenant ON identity.kyc_document (tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_kyc_doc_type ON identity.kyc_document (owner_type, owner_id, doc_type) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_kyc_doc_review ON identity.kyc_document (tenant_id, review_status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_kyc_doc_expiring ON identity.kyc_document (expires_at) WHERE expires_at IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_kyc_doc_number ON identity.kyc_document (doc_number) WHERE doc_number IS NOT NULL;

DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'kyc_superseded_fk') THEN
    ALTER TABLE identity.kyc_document
      ADD CONSTRAINT kyc_superseded_fk
      FOREIGN KEY (superseded_by_doc_id) REFERENCES identity.kyc_document(id) ON DELETE SET NULL;
  END IF;
END $fk$;

COMMENT ON TABLE identity.kyc_document IS 'KYC documents (polymorphic owner). PII — restricted access per pii_field_classification';
COMMENT ON COLUMN identity.kyc_document.owner_type IS 'user | supplier';

-- ----------------------------------------------------------------------------
-- identity.notification_preference — Per-user per-event per-channel preference
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS identity.notification_preference (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  event_type             VARCHAR(80) NOT NULL,
  channel                VARCHAR(20) NOT NULL CHECK (channel IN ('email','sms','in_app','zalo','wechat','telegram','push_mobile','webhook')),
  enabled                BOOLEAN NOT NULL DEFAULT TRUE,
  target_address         VARCHAR(255),
  frequency              VARCHAR(20) DEFAULT 'instant'
                          CHECK (frequency IN ('instant','daily_digest','weekly_digest','only_critical')),

  UNIQUE (user_id, event_type, channel)
);

CREATE INDEX IF NOT EXISTS idx_notif_pref_user ON identity.notification_preference (user_id);
CREATE INDEX IF NOT EXISTS idx_notif_pref_lookup ON identity.notification_preference (user_id, event_type) WHERE enabled = TRUE;

COMMENT ON TABLE identity.notification_preference IS 'User opt-in/out per event_type per channel';

-- ----------------------------------------------------------------------------
-- Triggers (updated_at + audit)
-- ----------------------------------------------------------------------------

CREATE TRIGGER trg_user_updated_at BEFORE UPDATE ON identity."user"
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_user_profile_updated_at BEFORE UPDATE ON identity.user_profile
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_supplier_updated_at BEFORE UPDATE ON identity.supplier
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_supplier_user_updated_at BEFORE UPDATE ON identity.supplier_user
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_dealer_capability_updated_at BEFORE UPDATE ON identity.dealer_capability
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_kyc_document_updated_at BEFORE UPDATE ON identity.kyc_document
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_notification_preference_updated_at BEFORE UPDATE ON identity.notification_preference
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- RLS policies (tenant isolation)
-- ----------------------------------------------------------------------------

ALTER TABLE identity."user" ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON identity."user"
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));

ALTER TABLE identity.user_profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON identity.user_profile
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));

ALTER TABLE identity.supplier ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON identity.supplier
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));

ALTER TABLE identity.supplier_user ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON identity.supplier_user
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));

ALTER TABLE identity.dealer_capability ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON identity.dealer_capability
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));

ALTER TABLE identity.verification_record ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON identity.verification_record
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));

ALTER TABLE identity.kyc_document ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON identity.kyc_document
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));

ALTER TABLE identity.notification_preference ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON identity.notification_preference
  USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));

INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('03_identity.sql', 'Identity domain: 8 tables (user, profile, supplier, supplier_user, dealer_capability, verification_record, kyc_document, notification_preference)');

-- ============================================================================
-- END 03_identity.sql — 8 tables, 33 indexes, 7 triggers, 8 RLS policies
-- ============================================================================
