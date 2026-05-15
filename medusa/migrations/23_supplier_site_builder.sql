-- Migration 23: Supplier Site Builder (Domain 12)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_template (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  code VARCHAR(60) NOT NULL UNIQUE,
  name_i18n JSONB, category VARCHAR(40),
  thumbnail_url TEXT, preview_url TEXT,
  blocks_template_jsonb JSONB,
  recommended_for VARCHAR(20) CHECK (recommended_for IN ('factory','dealer','both','service_vendor')),
  premium_only BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_brand_kit (
  supplier_id UUID PRIMARY KEY REFERENCES identity.supplier(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  primary_color VARCHAR(7), secondary_color VARCHAR(7), accent_color VARCHAR(7),
  font_heading VARCHAR(80), font_body VARCHAR(80),
  logo_url_light TEXT, logo_url_dark TEXT, favicon_url TEXT,
  tagline_i18n JSONB,
  brand_voice_description TEXT,
  do_not_use_words TEXT[],
  company_story_i18n JSONB,
  target_audience_i18n JSONB
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site (
  supplier_id UUID PRIMARY KEY REFERENCES identity.supplier(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  template_id UUID REFERENCES supplier_site.supplier_site_template(id),
  layout_version INT NOT NULL DEFAULT 1,
  custom_domain VARCHAR(120),
  page_title_i18n JSONB, page_meta_description_i18n JSONB,
  og_image_url TEXT,
  analytics_tracking_id VARCHAR(40),
  enable_live_chat BOOLEAN DEFAULT TRUE,
  enable_ai_assistant BOOLEAN DEFAULT FALSE,
  ai_assistant_config_id UUID,
  visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public','private','password','draft')),
  password_hash VARCHAR(255),
  published_at TIMESTAMPTZ,
  draft_blocks_jsonb JSONB,
  current_version_id UUID
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_page (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  site_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  slug VARCHAR(120) NOT NULL,
  page_type VARCHAR(30) CHECK (page_type IN ('home','about','products','contact','blog','custom','landing','legal')),
  title_i18n JSONB,
  meta_description_i18n JSONB,
  og_image_url TEXT,
  seo_canonical TEXT,
  layout_template VARCHAR(40),
  header_variant VARCHAR(40), footer_variant VARCHAR(40),
  sidebar_enabled BOOLEAN DEFAULT FALSE,
  schedule_publish_at TIMESTAMPTZ, schedule_unpublish_at TIMESTAMPTZ,
  password_protect BOOLEAN DEFAULT FALSE,
  allowed_audience VARCHAR(20) CHECK (allowed_audience IN ('b2c','b2b','both','anonymous')),
  published_status VARCHAR(20) DEFAULT 'draft' CHECK (published_status IN ('draft','published','archived','scheduled')),
  version INT DEFAULT 1,
  view_count BIGINT DEFAULT 0,
  UNIQUE (site_id, slug)
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_section (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  page_id UUID NOT NULL REFERENCES supplier_site.supplier_site_page(id) ON DELETE CASCADE,
  position INT NOT NULL,
  section_type VARCHAR(30) CHECK (section_type IN ('hero','content','grid','carousel','cta','footer_band','sidebar')),
  background_type VARCHAR(20) CHECK (background_type IN ('color','image','video','gradient','none')),
  background_value TEXT,
  padding_jsonb JSONB,
  full_width BOOLEAN DEFAULT FALSE,
  mobile_hidden BOOLEAN DEFAULT FALSE,
  animation_on_scroll VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_block (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  section_id UUID NOT NULL REFERENCES supplier_site.supplier_site_section(id) ON DELETE CASCADE,
  position INT NOT NULL,
  block_type VARCHAR(40) CHECK (block_type IN
    ('hero','hero_video','hero_slider','text_block','rich_text','image','image_grid','image_gallery',
     'image_with_text','video_embed','video_player_360','products_showcase','products_carousel',
     'featured_products_grid','category_showcase','testimonial_quote','testimonial_carousel','logo_cloud',
     'stats_counter','timeline','team_members','certifications_grid','factory_tour_360','map_location',
     'contact_form','newsletter_signup','rfq_form','sample_request_form','cta_button','cta_banner',
     'accordion_faq','tabs','pricing_table','comparison_table','countdown_timer','social_proof',
     'trust_badges','shipping_info_card','language_selector','currency_selector','chat_widget',
     'custom_html','divider','spacer')),
  content_i18n JSONB,
  layout_config_jsonb JSONB,
  media_refs UUID[],
  linked_entity_type VARCHAR(30),
  linked_entity_ids UUID[],
  css_classes VARCHAR(255), custom_id VARCHAR(80),
  is_ai_generated BOOLEAN DEFAULT FALSE,
  ai_generation_task_id UUID,
  visible BOOLEAN DEFAULT TRUE,
  mobile_only BOOLEAN DEFAULT FALSE, desktop_only BOOLEAN DEFAULT FALSE,
  audience_visibility VARCHAR(20) DEFAULT 'both',
  published BOOLEAN DEFAULT TRUE
);
CREATE INDEX IF NOT EXISTS idx_block_section ON supplier_site.supplier_site_block (section_id, position);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_navigation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  site_id UUID NOT NULL,
  position VARCHAR(40) CHECK (position IN ('header_main','header_top','footer','mobile')),
  items_jsonb JSONB,
  sticky BOOLEAN DEFAULT TRUE,
  transparent_on_scroll BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_footer (
  site_id UUID PRIMARY KEY,
  columns_jsonb JSONB,
  copyright_text_i18n JSONB,
  social_links_jsonb JSONB,
  contact_info_i18n JSONB,
  payment_icons TEXT[],
  newsletter_signup_enabled BOOLEAN DEFAULT TRUE,
  certificates_displayed TEXT[]
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_form (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  site_id UUID NOT NULL,
  slug VARCHAR(80),
  name_i18n JSONB,
  fields_schema_jsonb JSONB NOT NULL,
  submit_action VARCHAR(30) CHECK (submit_action IN ('email','webhook','create_rfq','create_inquiry','save_lead')),
  action_config_jsonb JSONB,
  success_message_i18n JSONB,
  redirect_url TEXT,
  captcha_enabled BOOLEAN DEFAULT TRUE,
  allowed_submissions_per_ip_per_hour INT,
  save_to_crm BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_form_submission (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  form_id UUID NOT NULL REFERENCES supplier_site.supplier_site_form(id) ON DELETE CASCADE,
  submitted_by_user_id UUID,
  submitted_data_jsonb JSONB,
  ip_address INET, user_agent TEXT, country_code CHAR(2),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new','reviewed','replied','spam','converted')),
  assigned_to_user_id UUID,
  ai_classification VARCHAR(20),
  converted_to_rfq_id UUID,
  replied_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_form_sub_form ON supplier_site.supplier_site_form_submission (form_id, submitted_at DESC);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_version (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  site_id UUID NOT NULL,
  version_number INT NOT NULL,
  snapshot_jsonb JSONB NOT NULL,
  created_by_user_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  change_summary TEXT,
  change_description TEXT,
  published BOOLEAN DEFAULT FALSE,
  current BOOLEAN DEFAULT FALSE,
  UNIQUE (site_id, version_number)
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_ab_variant (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  page_id UUID NOT NULL,
  variant_name VARCHAR(40),
  variant_blocks_jsonb JSONB,
  traffic_split_pct NUMERIC(5,2),
  conversion_event_type VARCHAR(40),
  conversion_count BIGINT DEFAULT 0,
  view_count BIGINT DEFAULT 0,
  is_winner BOOLEAN,
  ended_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_redirect (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  site_id UUID NOT NULL,
  from_path VARCHAR(255) NOT NULL,
  to_path VARCHAR(255) NOT NULL,
  redirect_type SMALLINT DEFAULT 301 CHECK (redirect_type IN (301,302,307,308)),
  hit_count BIGINT DEFAULT 0,
  last_hit_at TIMESTAMPTZ,
  active BOOLEAN DEFAULT TRUE,
  UNIQUE (site_id, from_path)
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_custom_code (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  site_id UUID NOT NULL,
  code_type VARCHAR(20) CHECK (code_type IN ('css','js','head_html','body_top','body_bottom')),
  content TEXT NOT NULL,
  sandbox_level VARCHAR(20) DEFAULT 'strict',
  allowed_after_review BOOLEAN DEFAULT FALSE,
  reviewed_by_admin_id UUID,
  reviewed_at TIMESTAMPTZ,
  security_scan_passed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_reusable_block (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  site_id UUID NOT NULL,
  name VARCHAR(120),
  thumbnail_url TEXT,
  content_jsonb JSONB NOT NULL,
  category VARCHAR(40),
  usage_count BIGINT DEFAULT 0,
  shared_with_team BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_widget (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  site_id UUID NOT NULL,
  widget_type VARCHAR(40) CHECK (widget_type IN ('tawk','intercom','crisp','messenger','whatsapp','zalo_chat','google_map','instagram_feed','youtube_subscribe','custom_iframe')),
  config_jsonb JSONB,
  placement VARCHAR(20) CHECK (placement IN ('global','page_specific')),
  pages_active UUID[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_block_comment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  block_id UUID NOT NULL,
  commenter_user_id UUID,
  comment_text TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_by_user_id UUID,
  mentions UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_analytics_snapshot (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  page_id UUID NOT NULL,
  date DATE NOT NULL,
  unique_visitors INT, page_views INT,
  avg_session_seconds NUMERIC(8,2),
  bounce_rate_pct NUMERIC(5,2),
  conversion_count INT,
  top_referrers_jsonb JSONB,
  top_countries_jsonb JSONB,
  device_breakdown_jsonb JSONB,
  UNIQUE (page_id, date)
);

CREATE TABLE IF NOT EXISTS supplier_site.supplier_site_seo_score (
  page_id UUID PRIMARY KEY,
  score_overall INT,
  score_breakdown_jsonb JSONB,
  issues_jsonb JSONB,
  suggestions_jsonb JSONB,
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='supplier_site' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='supplier_site' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE supplier_site.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON supplier_site.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON supplier_site.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('23_supplier_site_builder.sql', 'Supplier Site Builder: 18 tables');
