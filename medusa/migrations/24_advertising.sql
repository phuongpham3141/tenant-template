-- Migration 24: Advertising Platform (Domain 16)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS advertising.ads_account (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  supplier_id UUID NOT NULL UNIQUE REFERENCES identity.supplier(id) ON DELETE CASCADE,
  account_status VARCHAR(20) DEFAULT 'active' CHECK (account_status IN ('active','suspended','closed')),
  billing_method_id UUID,
  total_spend_lifetime_minor BIGINT DEFAULT 0,
  monthly_budget_cap_minor BIGINT,
  daily_budget_cap_minor BIGINT,
  account_manager_user_id UUID
);

CREATE TABLE IF NOT EXISTS advertising.ads_campaign (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  ads_account_id UUID NOT NULL REFERENCES advertising.ads_account(id) ON DELETE CASCADE,
  name VARCHAR(255),
  campaign_type VARCHAR(40) CHECK (campaign_type IN ('sponsored_product','sponsored_brand','sponsored_display','video','sponsored_supplier','search','retargeting')),
  objective VARCHAR(40) CHECK (objective IN ('sales','awareness','traffic','conversion','app_install','lead_gen')),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','active','paused','ended','archived')),
  budget_type VARCHAR(20) CHECK (budget_type IN ('daily','lifetime','monthly')),
  budget_minor BIGINT, currency CHAR(3),
  start_date DATE, end_date DATE,
  bidding_strategy VARCHAR(40) CHECK (bidding_strategy IN ('manual','dynamic_up','dynamic_down','auto','target_acos'))
);
CREATE INDEX IF NOT EXISTS idx_campaign_account ON advertising.ads_campaign (ads_account_id, status);

CREATE TABLE IF NOT EXISTS advertising.ads_ad_group (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  campaign_id UUID NOT NULL REFERENCES advertising.ads_campaign(id) ON DELETE CASCADE,
  name VARCHAR(255),
  default_bid_minor BIGINT,
  status VARCHAR(20) DEFAULT 'active',
  targeting_type VARCHAR(30) CHECK (targeting_type IN ('manual_keyword','auto','audience','product','category','retargeting')),
  match_type_priority TEXT[]
);

CREATE TABLE IF NOT EXISTS advertising.ads_creative (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  ad_group_id UUID NOT NULL REFERENCES advertising.ads_ad_group(id) ON DELETE CASCADE,
  creative_type VARCHAR(20) CHECK (creative_type IN ('image','video','carousel','text_only','brand_logo','dynamic_product')),
  media_urls TEXT[],
  headline_i18n JSONB, body_i18n JSONB,
  cta_text VARCHAR(80),
  landing_url TEXT,
  creative_status VARCHAR(20) DEFAULT 'under_review' CHECK (creative_status IN ('active','paused','rejected','under_review')),
  rejection_reason TEXT,
  performance_score NUMERIC(5,2)
);

CREATE TABLE IF NOT EXISTS advertising.ads_keyword (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  ad_group_id UUID NOT NULL REFERENCES advertising.ads_ad_group(id) ON DELETE CASCADE,
  keyword_text VARCHAR(255) NOT NULL,
  match_type VARCHAR(20) CHECK (match_type IN ('exact','phrase','broad','negative')),
  bid_minor BIGINT,
  status VARCHAR(20) DEFAULT 'active',
  search_volume_estimated INT,
  suggested_bid_min_minor BIGINT, suggested_bid_max_minor BIGINT
);
CREATE INDEX IF NOT EXISTS idx_kw_group ON advertising.ads_keyword (ad_group_id);
CREATE INDEX IF NOT EXISTS idx_kw_text ON advertising.ads_keyword USING GIN (keyword_text gin_trgm_ops);

CREATE TABLE IF NOT EXISTS advertising.ads_negative_keyword (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  scope VARCHAR(20) CHECK (scope IN ('campaign','ad_group')),
  campaign_id UUID, ad_group_id UUID,
  keyword_text VARCHAR(255) NOT NULL,
  match_type VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS advertising.ads_targeting_rule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  ad_group_id UUID NOT NULL REFERENCES advertising.ads_ad_group(id) ON DELETE CASCADE,
  target_type VARCHAR(40) CHECK (target_type IN ('audience_segment','product_category','specific_product','interest','retargeting','lookalike','demographic','geo')),
  target_value_jsonb JSONB,
  bid_adjustment_pct NUMERIC(5,2),
  exclude BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS advertising.ads_audience_segment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  name VARCHAR(255),
  type VARCHAR(20) CHECK (type IN ('predefined','custom_query','lookalike','csv_upload','retargeting','remarketing')),
  definition_jsonb JSONB,
  member_count BIGINT,
  refresh_schedule VARCHAR(40),
  last_computed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS advertising.ads_bid (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  ad_group_id UUID, keyword_id UUID,
  bid_minor BIGINT NOT NULL, currency CHAR(3),
  set_at TIMESTAMPTZ DEFAULT NOW(),
  set_by VARCHAR(20) CHECK (set_by IN ('user','auto_optimizer','rule')),
  reason TEXT
);
CREATE INDEX IF NOT EXISTS idx_bid_kw ON advertising.ads_bid (keyword_id, set_at DESC);

CREATE TABLE IF NOT EXISTS advertising.ads_placement (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  campaign_id UUID NOT NULL REFERENCES advertising.ads_campaign(id) ON DELETE CASCADE,
  placement_type VARCHAR(40),
  bid_modifier_pct NUMERIC(5,2),
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0
);

-- High-volume tables → BRIN indexes, replicate to ClickHouse
CREATE TABLE IF NOT EXISTS advertising.ads_impression_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  served_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  campaign_id UUID, ad_group_id UUID, creative_id UUID, keyword_id UUID,
  placement VARCHAR(40),
  viewer_user_id UUID, viewer_session_id UUID,
  viewer_country CHAR(2), viewer_device VARCHAR(20),
  query_text TEXT, position INT
);
CREATE INDEX IF NOT EXISTS idx_imp_brin ON advertising.ads_impression_log USING BRIN (served_at);
CREATE INDEX IF NOT EXISTS idx_imp_campaign ON advertising.ads_impression_log (campaign_id, served_at DESC);

CREATE TABLE IF NOT EXISTS advertising.ads_click_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  impression_id UUID,
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  click_cost_minor BIGINT, currency CHAR(3),
  landing_url TEXT,
  viewer_ip INET,
  fraud_score NUMERIC(5,4)
);
CREATE INDEX IF NOT EXISTS idx_click_brin ON advertising.ads_click_log USING BRIN (clicked_at);

CREATE TABLE IF NOT EXISTS advertising.ads_conversion_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  click_id UUID,
  conversion_type VARCHAR(30),
  order_id UUID,
  conversion_value_minor BIGINT, currency CHAR(3),
  conversion_at TIMESTAMPTZ DEFAULT NOW(),
  attribution_model VARCHAR(20) DEFAULT 'last_click',
  attribution_window_days SMALLINT DEFAULT 7
);
CREATE INDEX IF NOT EXISTS idx_conv_brin ON advertising.ads_conversion_log USING BRIN (conversion_at);

CREATE TABLE IF NOT EXISTS advertising.ads_budget (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  campaign_id UUID NOT NULL REFERENCES advertising.ads_campaign(id) ON DELETE CASCADE,
  period VARCHAR(20) CHECK (period IN ('daily','monthly','lifetime')),
  allocated_minor BIGINT, spent_minor BIGINT DEFAULT 0,
  pacing_status VARCHAR(20),
  auto_pause_on_exhausted BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS advertising.ads_billing (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  ads_account_id UUID NOT NULL REFERENCES advertising.ads_account(id),
  billing_period_start DATE, billing_period_end DATE,
  total_spend_minor BIGINT, currency CHAR(3),
  invoice_id UUID,
  payment_status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS advertising.ads_search_term_report (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  keyword_id UUID,
  search_term_text VARCHAR(255),
  impressions BIGINT, clicks BIGINT,
  spend_minor BIGINT,
  conversions INT, conversion_value_minor BIGINT,
  recommended_add_negative BOOLEAN DEFAULT FALSE,
  reported_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS advertising.ads_brand_metrics (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  brand_id UUID,
  period DATE,
  awareness_index NUMERIC(8,4),
  consideration_index NUMERIC(8,4),
  top_search_queries JSONB,
  share_of_voice_pct NUMERIC(5,2),
  branded_searches_count BIGINT,
  organic_vs_paid_share JSONB
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='advertising' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='advertising' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE advertising.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON advertising.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON advertising.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('24_advertising.sql', 'Advertising Platform: 17 tables');
