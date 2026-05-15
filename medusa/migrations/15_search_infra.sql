-- Migration 15: Search Infrastructure (Domain 33)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS search.search_index_definition (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  index_code VARCHAR(60) NOT NULL,
  entity_type VARCHAR(40) CHECK (entity_type IN ('product','supplier','content','category','live_session','rfq','blog')),
  locale CHAR(2),
  primary_key_field VARCHAR(40),
  searchable_fields JSONB DEFAULT '[]',
  filterable_attributes TEXT[] DEFAULT '{}',
  sortable_attributes TEXT[] DEFAULT '{}',
  facets_attributes TEXT[] DEFAULT '{}',
  distinct_attribute VARCHAR(80),
  last_full_reindex_at TIMESTAMPTZ,
  document_count BIGINT DEFAULT 0,
  total_size_bytes BIGINT,
  ai_hybrid_enabled BOOLEAN DEFAULT FALSE,
  UNIQUE (tenant_id, index_code)
);

CREATE TABLE IF NOT EXISTS search.search_relevance_ranking_config (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  index_code VARCHAR(60) NOT NULL,
  ranking_rules_ordered_jsonb JSONB NOT NULL,
  custom_score_formula TEXT,
  version VARCHAR(20),
  deployed_at TIMESTAMPTZ,
  ab_test_variant_id UUID,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS search.search_synonym_dictionary (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  index_code VARCHAR(60) NOT NULL,
  locale CHAR(2) NOT NULL,
  synonym_type VARCHAR(20) CHECK (synonym_type IN ('multi_way','one_way','hierarchical')),
  terms TEXT[] NOT NULL,
  one_way_input TEXT,
  one_way_synonyms TEXT[],
  created_by_user_id UUID,
  usage_count BIGINT DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_synonym_index ON search.search_synonym_dictionary (index_code, locale);
CREATE INDEX IF NOT EXISTS idx_synonym_terms ON search.search_synonym_dictionary USING GIN (terms);

CREATE TABLE IF NOT EXISTS search.search_stop_words (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  index_code VARCHAR(60), locale CHAR(2),
  stop_word VARCHAR(80) NOT NULL,
  source VARCHAR(20) DEFAULT 'admin',
  UNIQUE (index_code, locale, stop_word)
);

CREATE TABLE IF NOT EXISTS search.search_query_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  executed_at TIMESTAMPTZ DEFAULT NOW(),
  session_id UUID,
  user_id UUID,
  index_code VARCHAR(60),
  raw_query TEXT,
  processed_query TEXT,
  filters_applied_jsonb JSONB,
  sort_applied VARCHAR(80),
  page INT, hits_count INT,
  top_n_result_ids UUID[],
  clicked_position INT,
  refined_query TEXT,
  locale CHAR(2),
  device_type VARCHAR(20),
  latency_ms INT,
  ai_intent_classified VARCHAR(40)
);
CREATE INDEX IF NOT EXISTS idx_query_log_brin ON search.search_query_log USING BRIN (executed_at);
CREATE INDEX IF NOT EXISTS idx_query_log_user ON search.search_query_log (user_id, executed_at DESC);
CREATE INDEX IF NOT EXISTS idx_query_log_term ON search.search_query_log (raw_query, executed_at DESC);

CREATE TABLE IF NOT EXISTS search.search_zero_result_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  query TEXT NOT NULL,
  locale CHAR(2),
  count_24h INT, count_7d INT,
  last_seen_at TIMESTAMPTZ,
  related_unfound_categories_jsonb JSONB,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','categorized','content_added','synonym_added','product_added','dismissed'))
);
CREATE INDEX IF NOT EXISTS idx_zero_result_count ON search.search_zero_result_log (count_24h DESC) WHERE status = 'open';

CREATE TABLE IF NOT EXISTS search.search_autocomplete_suggestion (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  query_prefix VARCHAR(120) NOT NULL,
  completion VARCHAR(255) NOT NULL,
  popularity_score NUMERIC(10,4),
  category_id_hint UUID,
  supplier_id_hint UUID,
  locale CHAR(2),
  last_seen_at TIMESTAMPTZ,
  click_through_rate NUMERIC(5,4)
);
CREATE INDEX IF NOT EXISTS idx_autocomplete_prefix ON search.search_autocomplete_suggestion (tenant_id, locale, query_prefix);

CREATE TABLE IF NOT EXISTS search.search_facet_config (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  index_code VARCHAR(60), category_id UUID,
  facet_field VARCHAR(80) NOT NULL,
  facet_label_i18n JSONB,
  display_order INT,
  display_style VARCHAR(20) CHECK (display_style IN ('checkbox','range_slider','radio','color_swatch','toggle','search_input')),
  default_expanded BOOLEAN DEFAULT TRUE,
  min_values_to_show INT, max_values_to_show INT
);

CREATE TABLE IF NOT EXISTS search.search_personalization_signal (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  user_id UUID NOT NULL,
  signal_type VARCHAR(40) CHECK (signal_type IN ('recently_viewed_categories','purchase_history_categories','interest_tags','brand_affinity','search_history','wishlist_categories')),
  signal_value_jsonb JSONB,
  weight NUMERIC(5,4),
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  UNIQUE (user_id, signal_type)
);

CREATE TABLE IF NOT EXISTS search.trending_search_term (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  term VARCHAR(255) NOT NULL,
  locale CHAR(2),
  period VARCHAR(10) CHECK (period IN ('1h','24h','7d','30d')),
  trend_score NUMERIC(10,4),
  change_pct_vs_prior NUMERIC(8,2),
  geo_country CHAR(2),
  related_category_ids UUID[],
  last_computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (tenant_id, term, locale, period, geo_country)
);
CREATE INDEX IF NOT EXISTS idx_trending_score ON search.trending_search_term (tenant_id, period, trend_score DESC);

CREATE TABLE IF NOT EXISTS search.search_did_you_mean (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  misspelled_input VARCHAR(255) NOT NULL,
  suggested_query VARCHAR(255) NOT NULL,
  locale CHAR(2),
  manual_override BOOLEAN DEFAULT FALSE,
  auto_detected_via VARCHAR(20),
  confidence NUMERIC(5,4),
  usage_count BIGINT DEFAULT 0,
  conversion_rate NUMERIC(5,4)
);
CREATE INDEX IF NOT EXISTS idx_didyou_input ON search.search_did_you_mean (tenant_id, locale, misspelled_input);

CREATE TABLE IF NOT EXISTS search.saved_search (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES identity."user"(id),
  name VARCHAR(120),
  query TEXT,
  filters_jsonb JSONB,
  locale CHAR(2),
  index_code VARCHAR(60),
  last_results_count INT,
  last_run_at TIMESTAMPTZ,
  alert_frequency VARCHAR(20) DEFAULT 'instant' CHECK (alert_frequency IN ('instant','daily','weekly','monthly','off')),
  alert_channels TEXT[] DEFAULT '{email,in_app}',
  paused_at TIMESTAMPTZ
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='search' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='search' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE search.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON search.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON search.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('15_search_infra.sql', 'Search Infrastructure: 12 tables');
