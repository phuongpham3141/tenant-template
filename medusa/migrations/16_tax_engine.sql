-- Migration 16: Tax Engine Deep (Domain 34)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS tax.tax_jurisdiction (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  code VARCHAR(40) NOT NULL UNIQUE,
  parent_jurisdiction_id UUID REFERENCES tax.tax_jurisdiction(id),
  jurisdiction_level VARCHAR(20) CHECK (jurisdiction_level IN ('country','state','province','county','city','district','special_zone')),
  name_i18n JSONB,
  iso_3166_2 VARCHAR(10),
  tax_authority_name VARCHAR(255),
  tax_authority_contact JSONB,
  currency CHAR(3),
  default_locale CHAR(2),
  has_vat BOOLEAN DEFAULT FALSE, has_sales_tax BOOLEAN DEFAULT FALSE, has_gst BOOLEAN DEFAULT FALSE,
  fta_member_codes TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS tax.tax_class_master (
  class_code VARCHAR(40) PRIMARY KEY,
  name_i18n JSONB NOT NULL,
  description TEXT,
  applies_to_product_categories UUID[] DEFAULT '{}',
  hs_code_mapping TEXT[] DEFAULT '{}',
  default_rate_pct NUMERIC(6,3)
);

CREATE TABLE IF NOT EXISTS tax.tax_rate_master (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  jurisdiction_id UUID NOT NULL REFERENCES tax.tax_jurisdiction(id),
  tax_class_id VARCHAR(40) REFERENCES tax.tax_class_master(class_code),
  tax_type VARCHAR(20) CHECK (tax_type IN ('vat','sales','gst','excise','customs_duty','luxury','environmental','withholding')),
  rate_pct NUMERIC(6,3) NOT NULL,
  rate_formula TEXT,
  effective_from DATE NOT NULL, effective_until DATE,
  source VARCHAR(40) CHECK (source IN ('regulator_official','admin_manual','auto_synced','provider_api')),
  regulator_document_url TEXT
);
CREATE INDEX IF NOT EXISTS idx_tax_rate_jurisdiction ON tax.tax_rate_master (jurisdiction_id, tax_class_id, effective_from DESC);

CREATE TABLE IF NOT EXISTS tax.tax_calculation_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  order_id UUID,
  calculated_at TIMESTAMPTZ DEFAULT NOW(),
  ship_to_jurisdiction_id UUID,
  sold_from_jurisdiction_id UUID,
  line_items_jsonb JSONB,
  total_tax_minor BIGINT,
  calculation_engine_version VARCHAR(20),
  manual_override BOOLEAN DEFAULT FALSE,
  override_by_user_id UUID,
  override_reason TEXT
);
CREATE INDEX IF NOT EXISTS idx_tax_calc_brin ON tax.tax_calculation_log USING BRIN (calculated_at);
CREATE INDEX IF NOT EXISTS idx_tax_calc_order ON tax.tax_calculation_log (order_id);

CREATE TABLE IF NOT EXISTS tax.tax_exemption_certificate (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  buyer_user_id UUID NOT NULL REFERENCES identity."user"(id),
  supplier_id UUID REFERENCES identity.supplier(id),
  jurisdiction_id UUID NOT NULL REFERENCES tax.tax_jurisdiction(id),
  exemption_type VARCHAR(30) CHECK (exemption_type IN ('reseller','nonprofit','export','government','diplomatic','manufacturing')),
  certificate_number VARCHAR(80) NOT NULL,
  certificate_doc_url TEXT,
  issuing_authority VARCHAR(255),
  issued_at DATE, expires_at DATE,
  verified_by_user_id UUID,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','expired','revoked'))
);

CREATE TABLE IF NOT EXISTS tax.tax_filing_period (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  jurisdiction_id UUID NOT NULL REFERENCES tax.tax_jurisdiction(id),
  period_type VARCHAR(20) CHECK (period_type IN ('monthly','quarterly','semi_annually','yearly','one_time')),
  period_start DATE NOT NULL, period_end DATE NOT NULL,
  filing_due_at TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','filed','amended','late','audited','closed')),
  UNIQUE (tenant_id, jurisdiction_id, period_start)
);

CREATE TABLE IF NOT EXISTS tax.tax_filing_record (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  filing_period_id UUID NOT NULL REFERENCES tax.tax_filing_period(id),
  total_taxable_sales_minor BIGINT,
  total_tax_collected_minor BIGINT,
  total_tax_remitted_minor BIGINT,
  filed_at TIMESTAMPTZ, filed_by_user_id UUID,
  regulator_reference VARCHAR(120),
  attached_documents TEXT[],
  amendment_of_id UUID,
  status VARCHAR(20) DEFAULT 'draft'
);

CREATE TABLE IF NOT EXISTS tax.vat_oss_registration (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  registration_country CHAR(2),
  registration_number VARCHAR(80),
  registered_at DATE,
  applicable_from DATE,
  quarterly_filings JSONB DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS tax.nexus_record (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  jurisdiction_id UUID NOT NULL REFERENCES tax.tax_jurisdiction(id),
  nexus_type VARCHAR(20) CHECK (nexus_type IN ('physical','economic','sales_threshold','inventory','click_through')),
  threshold_value_minor BIGINT,
  current_sales_minor BIGINT,
  established_at TIMESTAMPTZ,
  deregistered_at TIMESTAMPTZ,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS tax.withholding_tax_record (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  payout_id UUID,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  supplier_tax_jurisdiction UUID REFERENCES tax.tax_jurisdiction(id),
  wht_rate_pct NUMERIC(6,3),
  wht_amount_minor BIGINT,
  wht_certificate_url TEXT,
  treaty_relief_applied BOOLEAN DEFAULT FALSE,
  treaty_country CHAR(2)
);
CREATE INDEX IF NOT EXISTS idx_wht_supplier ON tax.withholding_tax_record (supplier_id);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='tax' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='tax' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE tax.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON tax.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON tax.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('16_tax_engine.sql', 'Tax Engine Deep: 10 tables');
