-- Migration 31: Personalization & Analytics (Domain 23)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS personalization.user_behavior_event (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  event_at TIMESTAMPTZ DEFAULT NOW(),
  session_id UUID,
  user_id UUID,
  event_type VARCHAR(40) CHECK (event_type IN ('page_view','search','click','add_to_cart','remove_from_cart','wishlist_add','share','rating','review','purchase','return','filter','sort','impression')),
  entity_type VARCHAR(40), entity_id UUID,
  properties_jsonb JSONB,
  device_type VARCHAR(20),
  app_version VARCHAR(20),
  referrer TEXT
);
CREATE INDEX IF NOT EXISTS idx_behavior_brin ON personalization.user_behavior_event USING BRIN (event_at);
CREATE INDEX IF NOT EXISTS idx_behavior_user ON personalization.user_behavior_event (user_id, event_at DESC);

CREATE TABLE IF NOT EXISTS personalization.user_preference_vector (
  user_id UUID PRIMARY KEY REFERENCES identity."user"(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL,
  -- vector(256) if pgvector available, else JSONB
  embedding_jsonb JSONB,
  categories_affinity_jsonb JSONB,
  brands_affinity_jsonb JSONB,
  price_sensitivity NUMERIC(5,4),
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS personalization.product_similarity_vector (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  master_product_id UUID, product_id UUID,
  embedding_jsonb JSONB,
  based_on VARCHAR(40) CHECK (based_on IN ('description','image','spec','combined')),
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS personalization.recently_viewed (
  user_id UUID NOT NULL,
  product_id UUID NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  view_count_today INT DEFAULT 1,
  last_viewed_at TIMESTAMPTZ DEFAULT NOW(),
  time_spent_seconds INT,
  PRIMARY KEY (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS personalization.product_view_history (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  product_id UUID NOT NULL,
  period DATE NOT NULL,
  unique_viewers INT,
  total_views BIGINT,
  avg_time_on_page NUMERIC(8,2),
  bounce_rate NUMERIC(5,4),
  conversion_rate NUMERIC(5,4),
  top_referrers_jsonb JSONB,
  UNIQUE (product_id, period)
);

CREATE TABLE IF NOT EXISTS personalization.search_query_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  session_id UUID, user_id UUID,
  query_text TEXT,
  filters_applied_jsonb JSONB,
  results_count INT,
  clicked_results_jsonb JSONB,
  no_result_returned BOOLEAN,
  refined_query_after TEXT,
  locale CHAR(2),
  executed_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pers_query_brin ON personalization.search_query_log USING BRIN (executed_at);

CREATE TABLE IF NOT EXISTS personalization.market_basket_analysis (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  antecedent_product_ids UUID[],
  consequent_product_id UUID,
  support NUMERIC(8,6),
  confidence NUMERIC(8,6),
  lift NUMERIC(8,4),
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  period DATE
);

CREATE TABLE IF NOT EXISTS personalization.competitive_pricing_intelligence (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  master_product_id UUID,
  competitor_platform VARCHAR(40),
  competitor_url TEXT,
  competitor_price_minor BIGINT,
  competitor_currency CHAR(3),
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  in_stock BOOLEAN
);

CREATE TABLE IF NOT EXISTS personalization.amazon_choice_equivalent (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  master_product_id UUID, product_id UUID,
  badge_type VARCHAR(30),
  valid_from TIMESTAMPTZ, valid_until TIMESTAMPTZ,
  scoring_criteria_jsonb JSONB,
  ranking_in_category INT
);

CREATE TABLE IF NOT EXISTS personalization.cohort_analysis_snapshot (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  cohort_definition_jsonb JSONB,
  period_label VARCHAR(40),
  retained_count INT,
  churned_count INT,
  total_revenue_minor BIGINT,
  avg_order_value NUMERIC(12,2),
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS personalization.funnel_step_event (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  session_id UUID, user_id UUID,
  funnel_name VARCHAR(40),
  step INT, step_name VARCHAR(80),
  entered_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  dropped_off BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_funnel_brin ON personalization.funnel_step_event USING BRIN (entered_at);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='personalization' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='personalization' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE personalization.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON personalization.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON personalization.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('31_personalization.sql', 'Personalization: 11 tables');
