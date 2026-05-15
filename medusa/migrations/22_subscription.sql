-- Migration 22: Subscription & Recurring (Domain 20)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS subscription.subscription_plan (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  supplier_id UUID REFERENCES identity.supplier(id),
  variant_id UUID REFERENCES catalog.product_variant(id),
  plan_code VARCHAR(40) NOT NULL,
  name_i18n JSONB,
  frequency_options TEXT[] CHECK (frequency_options <@ ARRAY['weekly','biweekly','monthly','quarterly','annually','custom']),
  discount_pct NUMERIC(5,2) DEFAULT 0,
  min_commitment_periods INT, max_periods INT,
  cancel_anytime BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft','active','paused','retired')),
  UNIQUE (tenant_id, plan_code)
);

CREATE TABLE IF NOT EXISTS subscription.subscription_instance (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  code VARCHAR(20) NOT NULL UNIQUE,
  buyer_id UUID NOT NULL REFERENCES identity."user"(id),
  plan_id UUID NOT NULL REFERENCES subscription.subscription_plan(id),
  variant_id UUID REFERENCES catalog.product_variant(id),
  quantity_per_delivery INT,
  frequency VARCHAR(20),
  next_delivery_at TIMESTAMPTZ,
  last_delivery_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','paused','cancelled','completed','overdue')),
  pause_reason TEXT, pause_resume_at TIMESTAMPTZ,
  payment_method_id UUID, shipping_address_id UUID,
  total_deliveries_completed INT DEFAULT 0,
  total_value_lifetime_minor BIGINT DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_sub_inst_buyer ON subscription.subscription_instance (buyer_id);
CREATE INDEX IF NOT EXISTS idx_sub_inst_next ON subscription.subscription_instance (next_delivery_at) WHERE status = 'active';

CREATE TABLE IF NOT EXISTS subscription.recurring_order_schedule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  subscription_id UUID NOT NULL REFERENCES subscription.subscription_instance(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  generated_order_id UUID,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','generated','skipped','failed','cancelled')),
  skip_reason TEXT,
  UNIQUE (subscription_id, scheduled_date)
);

CREATE TABLE IF NOT EXISTS subscription.contract_blanket_po (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  code VARCHAR(20) NOT NULL UNIQUE,
  buyer_company_id UUID,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  contract_value_total_usd_minor BIGINT NOT NULL,
  period_start DATE, period_end DATE,
  committed_quantity_per_variant_jsonb JSONB,
  drawdown_quantity_per_variant_jsonb JSONB,
  contract_terms_doc_url TEXT,
  payment_terms_days SMALLINT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','signed','active','exhausted','expired','cancelled')),
  signed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_blanket_po_supplier ON subscription.contract_blanket_po (supplier_id);

CREATE TABLE IF NOT EXISTS subscription.standing_order (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  buyer_company_id UUID,
  variant_id UUID NOT NULL REFERENCES catalog.product_variant(id),
  threshold_quantity INT NOT NULL,
  reorder_quantity INT NOT NULL,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  last_triggered_at TIMESTAMPTZ,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS subscription.subscription_pause_history (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  subscription_id UUID NOT NULL REFERENCES subscription.subscription_instance(id) ON DELETE CASCADE,
  paused_at TIMESTAMPTZ NOT NULL,
  paused_by_user_id UUID,
  reason TEXT,
  resumed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS subscription.subscription_price_lock (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  subscription_id UUID NOT NULL UNIQUE REFERENCES subscription.subscription_instance(id) ON DELETE CASCADE,
  locked_unit_price_minor BIGINT NOT NULL,
  locked_currency CHAR(3),
  locked_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  renegotiation_required_at TIMESTAMPTZ
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='subscription' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='subscription' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE subscription.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON subscription.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON subscription.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('22_subscription.sql', 'Subscription + Recurring: 7 tables');
