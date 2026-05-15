-- ============================================================================
-- Cybersilkroads — Migration 01: Database Schemas
-- ============================================================================
-- Purpose: Create all schemas (namespaces) for 39 domains + common/admin
-- Run after: 00_extensions.sql
-- Idempotent: YES
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- 1. Application roles
-- ----------------------------------------------------------------------------

-- Application role (used by Medusa runtime) — owns most schemas
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'csr_app') THEN
    CREATE ROLE csr_app LOGIN NOINHERIT;
    COMMENT ON ROLE csr_app IS 'Cybersilkroads application runtime (Medusa server)';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'csr_readonly') THEN
    CREATE ROLE csr_readonly LOGIN;
    COMMENT ON ROLE csr_readonly IS 'Read-only role for analytics + reporting';
  END IF;

  -- Admin role bypasses RLS (for migrations, DR ops, cross-tenant queries)
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'csr_admin') THEN
    CREATE ROLE csr_admin LOGIN BYPASSRLS;
    COMMENT ON ROLE csr_admin IS 'Platform admin role with RLS bypass — use sparingly';
  END IF;

  -- Service role for CDC consumers (Debezium → ClickHouse)
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'csr_cdc') THEN
    CREATE ROLE csr_cdc LOGIN REPLICATION;
    COMMENT ON ROLE csr_cdc IS 'CDC consumer role for PG → ClickHouse replication';
  END IF;
END
$$;

-- ----------------------------------------------------------------------------
-- 2. Create all schemas (39 domains + common foundations)
-- ----------------------------------------------------------------------------

-- Common foundations (used by everything)
CREATE SCHEMA IF NOT EXISTS common      AUTHORIZATION csr_app;  -- country, currency, language, timezone master
CREATE SCHEMA IF NOT EXISTS admin       AUTHORIZATION csr_app;  -- admin operations, system settings
CREATE SCHEMA IF NOT EXISTS tenant      AUTHORIZATION csr_app;  -- Domain 38: multi-tenant config

-- Domain 1-3: Identity, Catalog, Taxonomy
CREATE SCHEMA IF NOT EXISTS identity    AUTHORIZATION csr_app;  -- Domain 1: user, supplier, kyc
CREATE SCHEMA IF NOT EXISTS catalog     AUTHORIZATION csr_app;  -- Domain 2 + 14: product, master SKU
CREATE SCHEMA IF NOT EXISTS taxonomy    AUTHORIZATION csr_app;  -- Domain 3: category hybrid

-- Domain 4-8: Cart, Order, Payment, Fulfillment, Dispute
CREATE SCHEMA IF NOT EXISTS cart        AUTHORIZATION csr_app;  -- Domain 4
CREATE SCHEMA IF NOT EXISTS rfq         AUTHORIZATION csr_app;  -- Domain 5 (RFQ part)
CREATE SCHEMA IF NOT EXISTS ord         AUTHORIZATION csr_app;  -- Domain 5 (order) — "order" is PG keyword
CREATE SCHEMA IF NOT EXISTS payment     AUTHORIZATION csr_app;  -- Domain 6 + 35
CREATE SCHEMA IF NOT EXISTS fulfillment AUTHORIZATION csr_app;  -- Domain 7 + 17
CREATE SCHEMA IF NOT EXISTS returns     AUTHORIZATION csr_app;  -- Domain 18
CREATE SCHEMA IF NOT EXISTS dispute     AUTHORIZATION csr_app;  -- Domain 8

-- Domain 9: CMS (handled by Payload — schema "payload")
CREATE SCHEMA IF NOT EXISTS payload     AUTHORIZATION csr_app;  -- Domain 9: Payload CMS

-- Domain 11-13: Communication, Site Builder, B2C
CREATE SCHEMA IF NOT EXISTS communication AUTHORIZATION csr_app; -- Domain 11
CREATE SCHEMA IF NOT EXISTS supplier_site AUTHORIZATION csr_app; -- Domain 12
CREATE SCHEMA IF NOT EXISTS b2c         AUTHORIZATION csr_app;  -- Domain 13

-- Domain 14-17: Master SKU, Brand Protection, Advertising, Fulfillment Pro
-- (master SKU lives in catalog schema)
CREATE SCHEMA IF NOT EXISTS brand       AUTHORIZATION csr_app;  -- Domain 15
CREATE SCHEMA IF NOT EXISTS advertising AUTHORIZATION csr_app;  -- Domain 16

-- Domain 19-20: Customer Service, Subscription
CREATE SCHEMA IF NOT EXISTS support     AUTHORIZATION csr_app;  -- Domain 19
CREATE SCHEMA IF NOT EXISTS subscription AUTHORIZATION csr_app; -- Domain 20

-- Domain 21-22: Public API, ML Fraud + AI
CREATE SCHEMA IF NOT EXISTS api         AUTHORIZATION csr_app;  -- Domain 21
CREATE SCHEMA IF NOT EXISTS fraud       AUTHORIZATION csr_app;  -- Domain 22 (ML Fraud)
CREATE SCHEMA IF NOT EXISTS ai          AUTHORIZATION csr_app;  -- Domain 22 AI

-- Domain 23: Personalization
CREATE SCHEMA IF NOT EXISTS personalization AUTHORIZATION csr_app; -- Domain 23

-- Domain 24-27: Live Commerce, CSR Sustainability, Account Health, Media
CREATE SCHEMA IF NOT EXISTS live        AUTHORIZATION csr_app;  -- Domain 24 + 28 (Live Commerce Pro)
CREATE SCHEMA IF NOT EXISTS csr_esg     AUTHORIZATION csr_app;  -- Domain 25 (CSR/Sustainability)
CREATE SCHEMA IF NOT EXISTS account_health AUTHORIZATION csr_app; -- Domain 26
CREATE SCHEMA IF NOT EXISTS media       AUTHORIZATION csr_app;  -- Domain 27 (Universal Media)

-- Domain 29: Audit Log + Event Sourcing
CREATE SCHEMA IF NOT EXISTS audit       AUTHORIZATION csr_app;  -- Domain 29

-- Domain 30-32: Auth, RBAC, GDPR
CREATE SCHEMA IF NOT EXISTS auth        AUTHORIZATION csr_app;  -- Domain 30
CREATE SCHEMA IF NOT EXISTS rbac        AUTHORIZATION csr_app;  -- Domain 31
CREATE SCHEMA IF NOT EXISTS gdpr        AUTHORIZATION csr_app;  -- Domain 32

-- Domain 33-37: Search, Tax, Payment (already created), Notification, Experimentation
CREATE SCHEMA IF NOT EXISTS search      AUTHORIZATION csr_app;  -- Domain 33
CREATE SCHEMA IF NOT EXISTS tax         AUTHORIZATION csr_app;  -- Domain 34
CREATE SCHEMA IF NOT EXISTS notification AUTHORIZATION csr_app; -- Domain 36
CREATE SCHEMA IF NOT EXISTS experiment  AUTHORIZATION csr_app;  -- Domain 37

-- Domain 39: Vietnam B2B Sourcing Specifics
CREATE SCHEMA IF NOT EXISTS vn_sourcing AUTHORIZATION csr_app;  -- Domain 39

-- Email marketing (logical sub-domain, gets own schema for clarity)
CREATE SCHEMA IF NOT EXISTS email_mkt   AUTHORIZATION csr_app;

-- ----------------------------------------------------------------------------
-- 3. Grant permissions
-- ----------------------------------------------------------------------------

-- Grant USAGE on all schemas to app role (already owner, but explicit)
DO $$
DECLARE
  s TEXT;
  schemas TEXT[] := ARRAY[
    'common','admin','tenant',
    'identity','catalog','taxonomy',
    'cart','rfq','ord','payment','fulfillment','returns','dispute',
    'payload',
    'communication','supplier_site','b2c',
    'brand','advertising',
    'support','subscription',
    'api','fraud','ai',
    'personalization',
    'live','csr_esg','account_health','media',
    'audit',
    'auth','rbac','gdpr',
    'search','tax','notification','experiment',
    'vn_sourcing','email_mkt'
  ];
BEGIN
  FOREACH s IN ARRAY schemas LOOP
    EXECUTE format('GRANT USAGE ON SCHEMA %I TO csr_app, csr_readonly, csr_cdc, csr_admin', s);
    -- Default privileges on future tables created in these schemas
    EXECUTE format(
      'ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO csr_app',
      s
    );
    EXECUTE format(
      'ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT SELECT ON TABLES TO csr_readonly',
      s
    );
    EXECUTE format(
      'ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT SELECT ON TABLES TO csr_cdc',
      s
    );
    EXECUTE format(
      'ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT USAGE, SELECT ON SEQUENCES TO csr_app',
      s
    );
  END LOOP;
END
$$;

-- Set default search path for app role (avoid having to qualify every table)
ALTER ROLE csr_app SET search_path TO public, common, identity, catalog, taxonomy,
  cart, ord, rfq, payment, fulfillment;

-- ----------------------------------------------------------------------------
-- 4. Schema documentation
-- ----------------------------------------------------------------------------

COMMENT ON SCHEMA common IS 'Master data shared across all domains: country, currency, language, timezone, unit_master, HS code';
COMMENT ON SCHEMA admin IS 'Internal admin operations: settings, feature_flags, migration_log';
COMMENT ON SCHEMA tenant IS 'Domain 38: Multi-tenant configuration deep';
COMMENT ON SCHEMA identity IS 'Domain 1: User, supplier, dealer, KYC, verification';
COMMENT ON SCHEMA catalog IS 'Domain 2 + 14: Product catalog, variants, pricing tiers, master SKU, brand';
COMMENT ON SCHEMA taxonomy IS 'Domain 3: Category taxonomy hybrid (medusa_category)';
COMMENT ON SCHEMA cart IS 'Domain 4: Cart, checkout session';
COMMENT ON SCHEMA rfq IS 'Domain 5 part: RFQ workflow';
COMMENT ON SCHEMA ord IS 'Domain 5: Order entity (renamed from "order" — PG keyword)';
COMMENT ON SCHEMA payment IS 'Domain 6 + 35: Escrow, payment transactions, processor abstraction';
COMMENT ON SCHEMA fulfillment IS 'Domain 7 + 17: Shipping, customs, warehouse, QC, insurance, invoice';
COMMENT ON SCHEMA returns IS 'Domain 18: Return/RMA workflow';
COMMENT ON SCHEMA dispute IS 'Domain 8: Dispute resolution + arbitration';
COMMENT ON SCHEMA payload IS 'Domain 9: Payload CMS managed schema';
COMMENT ON SCHEMA communication IS 'Domain 11: Conversation, negotiation, voice/video, meetings';
COMMENT ON SCHEMA supplier_site IS 'Domain 12: Supplier Site Builder';
COMMENT ON SCHEMA b2c IS 'Domain 13: B2C features (review, wishlist, coupon, flash sale, loyalty)';
COMMENT ON SCHEMA brand IS 'Domain 15: Brand registry + IP protection';
COMMENT ON SCHEMA advertising IS 'Domain 16: Ads platform (campaigns, bidding, attribution)';
COMMENT ON SCHEMA support IS 'Domain 19: Customer service tickets';
COMMENT ON SCHEMA subscription IS 'Domain 20: Subscription plans + recurring orders';
COMMENT ON SCHEMA api IS 'Domain 21: Public Seller API (OAuth, keys, webhooks)';
COMMENT ON SCHEMA fraud IS 'Domain 22: ML fraud detection';
COMMENT ON SCHEMA ai IS 'Domain 22 AI: AI agent + RAG + tool router';
COMMENT ON SCHEMA personalization IS 'Domain 23: Personalization + recommendations';
COMMENT ON SCHEMA live IS 'Domain 28: Live Commerce Pro';
COMMENT ON SCHEMA csr_esg IS 'Domain 25: CSR/ESG/Sustainability (NOT Cybersilkroads — Corporate Social Responsibility)';
COMMENT ON SCHEMA account_health IS 'Domain 26: Seller account health metrics';
COMMENT ON SCHEMA media IS 'Domain 27: Universal Media Layer';
COMMENT ON SCHEMA audit IS 'Domain 29: Unified audit log + event sourcing';
COMMENT ON SCHEMA auth IS 'Domain 30: Sessions, MFA, passkey, OAuth';
COMMENT ON SCHEMA rbac IS 'Domain 31: Granular permission system';
COMMENT ON SCHEMA gdpr IS 'Domain 32: Privacy compliance (consent, DSR, retention)';
COMMENT ON SCHEMA search IS 'Domain 33: Search infrastructure';
COMMENT ON SCHEMA tax IS 'Domain 34: Tax engine (jurisdictions, rates, filings)';
COMMENT ON SCHEMA notification IS 'Domain 36: Notification event bus';
COMMENT ON SCHEMA experiment IS 'Domain 37: A/B experimentation platform';
COMMENT ON SCHEMA vn_sourcing IS 'Domain 39: Vietnam B2B sourcing specifics';
COMMENT ON SCHEMA email_mkt IS 'Email marketing automation (templates, journeys, campaigns, suppression)';

-- ----------------------------------------------------------------------------
-- 5. Migration log table (in admin schema)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS admin.migration_log (
  id              UUID PRIMARY KEY DEFAULT public.uuidv7(),
  migration_file  VARCHAR(255) NOT NULL,
  applied_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  applied_by      TEXT NOT NULL DEFAULT current_user,
  duration_ms     INT,
  checksum_sha256 CHAR(64),
  status          VARCHAR(20) NOT NULL DEFAULT 'success'
                   CHECK (status IN ('success','failed','rolled_back')),
  notes           TEXT,
  UNIQUE(migration_file, applied_at)
);

COMMENT ON TABLE admin.migration_log IS 'Track which migration files have been applied';

INSERT INTO admin.migration_log (migration_file, notes)
VALUES
  ('00_extensions.sql', 'Extensions + helper functions'),
  ('01_schemas.sql', '39 domain schemas + roles + permissions')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- END migration 01_schemas.sql
-- Schemas created: 38
-- Roles created: 4 (csr_app, csr_readonly, csr_admin, csr_cdc)
-- Tables created: 1 (admin.migration_log)
-- ============================================================================
