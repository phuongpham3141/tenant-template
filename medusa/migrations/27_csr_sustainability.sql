-- Migration 27: CSR & Sustainability (Domain 25)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS csr_esg.product_carbon_footprint (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  master_product_id UUID REFERENCES catalog.master_product(id),
  product_id UUID REFERENCES catalog.product(id),
  scope1_kg_co2e NUMERIC(12,4),
  scope2_kg_co2e NUMERIC(12,4),
  scope3_kg_co2e NUMERIC(12,4),
  total_kg_co2e_per_unit NUMERIC(12,4),
  methodology VARCHAR(40) CHECK (methodology IN ('PAS_2050','GHG_protocol','EN_15804','ISO_14067','custom')),
  calculated_at TIMESTAMPTZ,
  certified_by VARCHAR(120),
  certificate_url TEXT,
  expires_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS csr_esg.sustainability_certification (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  holder_type VARCHAR(20) CHECK (holder_type IN ('product','supplier','brand')),
  holder_id UUID NOT NULL,
  cert_type VARCHAR(40) CHECK (cert_type IN ('fsc','gots','fairtrade','gold_standard','iso_14001','cradle_to_cradle','eu_ecolabel','energy_star','wrap','bsci','sa8000')),
  cert_number VARCHAR(80),
  issuing_body VARCHAR(120),
  issued_at DATE, expires_at DATE,
  scope_description_i18n JSONB,
  certificate_pdf_url TEXT,
  public_verifiable BOOLEAN DEFAULT TRUE
);
CREATE INDEX IF NOT EXISTS idx_cert_holder ON csr_esg.sustainability_certification (holder_type, holder_id);

CREATE TABLE IF NOT EXISTS csr_esg.supplier_sustainability_score (
  supplier_id UUID PRIMARY KEY REFERENCES identity.supplier(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL,
  score_overall INT, score_environmental INT, score_social INT, score_governance INT,
  methodology VARCHAR(80),
  last_assessed_at TIMESTAMPTZ,
  ranking_in_industry INT,
  public_disclosure BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS csr_esg.ethical_sourcing_audit (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL,
  audited_at TIMESTAMPTZ DEFAULT NOW(),
  audited_by VARCHAR(40),
  audit_scope TEXT,
  score INT,
  findings_jsonb JSONB,
  corrective_actions_jsonb JSONB,
  follow_up_required_at TIMESTAMPTZ,
  report_url TEXT
);

CREATE TABLE IF NOT EXISTS csr_esg.carbon_offset_credit (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  purchased_by_subject_type VARCHAR(20), subject_id UUID,
  project_name VARCHAR(255),
  registry VARCHAR(20) CHECK (registry IN ('verra','gold_standard','car','acr','plan_vivo')),
  credit_count NUMERIC(12,4),
  vintage_year SMALLINT,
  retired_at TIMESTAMPTZ,
  retirement_certificate_url TEXT,
  cost_usd_minor BIGINT
);

CREATE TABLE IF NOT EXISTS csr_esg.supply_chain_traceability (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  master_product_id UUID, product_id UUID,
  tier_level SMALLINT CHECK (tier_level BETWEEN 1 AND 5),
  upstream_supplier_id UUID,
  material_type VARCHAR(80),
  origin_location VARCHAR(255),
  lot_number VARCHAR(80),
  verified_by_audit_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS csr_esg.esg_report (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  supplier_id UUID REFERENCES identity.supplier(id),
  report_year SMALLINT NOT NULL,
  environmental_jsonb JSONB,
  social_jsonb JSONB,
  governance_jsonb JSONB,
  key_metrics_jsonb JSONB,
  report_pdf_url TEXT,
  audited BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (supplier_id, report_year)
);

CREATE TABLE IF NOT EXISTS csr_esg.eu_cbam_declaration (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  order_id UUID,
  hs_code VARCHAR(15),
  embedded_carbon_kg_co2e NUMERIC(12,4),
  country_of_origin CHAR(2),
  carbon_price_eu_usd_minor BIGINT,
  declaration_pdf_url TEXT,
  submitted_at TIMESTAMPTZ
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='csr_esg' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='csr_esg' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE csr_esg.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON csr_esg.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON csr_esg.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('27_csr_sustainability.sql', 'CSR/ESG/Sustainability: 8 tables');
