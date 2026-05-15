-- Migration 13: Brand Protection & IP (Domain 15)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS brand.trademark_registry (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  brand_id UUID NOT NULL REFERENCES catalog.brand(id) ON DELETE CASCADE,
  jurisdiction VARCHAR(20) NOT NULL CHECK (jurisdiction IN ('vn','cn','us','eu','wipo','jp','kr','sg','my','th','id','ph','in','au')),
  tm_number VARCHAR(80) NOT NULL,
  tm_class VARCHAR(10),
  filing_date DATE, registration_date DATE, expiration_date DATE,
  status VARCHAR(20) CHECK (status IN ('filed','pending','registered','renewed','expired','cancelled','opposed')),
  certificate_url TEXT,
  evidence_of_use_urls TEXT[] DEFAULT '{}',
  UNIQUE (jurisdiction, tm_number)
);

CREATE TABLE IF NOT EXISTS brand.brand_registry (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  brand_id UUID NOT NULL UNIQUE REFERENCES catalog.brand(id) ON DELETE CASCADE,
  enrollment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (enrollment_status IN ('pending','approved','rejected','suspended')),
  enrolled_user_ids UUID[] DEFAULT '{}',
  enrolled_at TIMESTAMPTZ,
  verification_documents TEXT[] DEFAULT '{}',
  gating_level SMALLINT DEFAULT 1 CHECK (gating_level BETWEEN 1 AND 3)
);

CREATE TABLE IF NOT EXISTS brand.brand_catalog_lock (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  master_product_id UUID NOT NULL REFERENCES catalog.master_product(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES catalog.brand(id) ON DELETE CASCADE,
  locked_fields TEXT[] NOT NULL DEFAULT ARRAY['title','images','bullet_points','description','specs'],
  lock_active BOOLEAN NOT NULL DEFAULT TRUE,
  locked_by_user_id UUID NOT NULL REFERENCES identity."user"(id),
  locked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  override_audit_log_jsonb JSONB DEFAULT '[]',
  UNIQUE (master_product_id, brand_id)
);

CREATE TABLE IF NOT EXISTS brand.brand_authorized_seller (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  brand_id UUID NOT NULL REFERENCES catalog.brand(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,
  authorization_type VARCHAR(20) CHECK (authorization_type IN ('distributor','reseller','exclusive','temporary')),
  territory_country_codes TEXT[] DEFAULT '{}',
  product_scope_jsonb JSONB,
  valid_from TIMESTAMPTZ, valid_until TIMESTAMPTZ,
  authorization_document_url TEXT,
  UNIQUE (brand_id, supplier_id)
);

CREATE TABLE IF NOT EXISTS brand.infringement_report (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  code VARCHAR(20) NOT NULL UNIQUE,
  brand_id UUID REFERENCES catalog.brand(id),
  reported_by_user_id UUID NOT NULL REFERENCES identity."user"(id),
  infringement_type VARCHAR(40) CHECK (infringement_type IN ('counterfeit','trademark_misuse','copyright_image','patent','unauthorized_seller','design_infringement')),
  against_supplier_id UUID REFERENCES identity.supplier(id),
  against_listing_id UUID,
  evidence_urls TEXT[] DEFAULT '{}',
  description_i18n JSONB,
  status VARCHAR(20) NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','reviewing','valid','invalid','enforced','escalated_legal','withdrawn')),
  action_taken_at TIMESTAMPTZ,
  resolution TEXT
);
CREATE INDEX IF NOT EXISTS idx_infringement_brand ON brand.infringement_report (brand_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_infringement_against ON brand.infringement_report (against_supplier_id, status);

CREATE TABLE IF NOT EXISTS brand.takedown_action (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  infringement_report_id UUID REFERENCES brand.infringement_report(id),
  action_type VARCHAR(30) NOT NULL CHECK (action_type IN ('warn','hide_listing','remove_listing','suspend_supplier','block_brand_use','project_zero_instant')),
  executed_by_user_id UUID REFERENCES identity."user"(id),
  executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  automated BOOLEAN NOT NULL DEFAULT FALSE,
  reversible_until TIMESTAMPTZ,
  restoration_request_id UUID
);

CREATE TABLE IF NOT EXISTS brand.product_authenticity_code (
  code CHAR(32) PRIMARY KEY,
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  master_product_id UUID REFERENCES catalog.master_product(id),
  supplier_id UUID REFERENCES identity.supplier(id),
  batch_id VARCHAR(80),
  manufacturing_date DATE,
  scanned_count INT NOT NULL DEFAULT 0,
  last_scanned_at TIMESTAMPTZ,
  last_scanned_location JSONB,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','consumed','reported_fake','revoked')),
  authentication_url TEXT
);
CREATE INDEX IF NOT EXISTS idx_auth_code_product ON brand.product_authenticity_code (master_product_id);
CREATE INDEX IF NOT EXISTS idx_auth_code_batch ON brand.product_authenticity_code (batch_id);

CREATE TABLE IF NOT EXISTS brand.authenticity_scan_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  code CHAR(32) NOT NULL REFERENCES brand.product_authenticity_code(code),
  scanned_by_user_id UUID,
  scanned_ip INET,
  scan_location_geo JSONB,
  scan_device VARCHAR(80),
  result VARCHAR(20) CHECK (result IN ('genuine','already_scanned','invalid','reported','expired')),
  warehouse_id UUID
);
CREATE INDEX IF NOT EXISTS idx_scan_log_code ON brand.authenticity_scan_log (code, scanned_at DESC);

CREATE TABLE IF NOT EXISTS brand.ip_violator_blacklist (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  subject_type VARCHAR(20) CHECK (subject_type IN ('supplier','user','email','tax_id','bank_account')),
  subject_id VARCHAR(255) NOT NULL,
  ban_reason TEXT,
  related_reports UUID[] DEFAULT '{}',
  ban_scope VARCHAR(30) CHECK (ban_scope IN ('platform_wide','brand_specific','category_specific')),
  banned_until TIMESTAMPTZ,
  appeal_status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS brand.counterfeit_detection_signal (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  listing_id UUID,
  signal_type VARCHAR(40) CHECK (signal_type IN ('image_match_known_fake','price_too_low','new_seller_brand_listing','description_copy','suspicious_packaging','reverse_image_match')),
  confidence_score NUMERIC(5,4),
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed BOOLEAN DEFAULT FALSE,
  action_taken VARCHAR(40)
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='brand' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='brand' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE brand.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON brand.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON brand.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('13_brand_protection.sql', 'Brand Protection + IP: 10 tables');
