-- Migration 28: Universal Media Layer (Domain 27)
\set ON_ERROR_STOP on

-- Core asset entities
CREATE TABLE IF NOT EXISTS media.media_asset (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  asset_uid VARCHAR(40) NOT NULL UNIQUE,
  owner_type VARCHAR(20) CHECK (owner_type IN ('supplier','user','platform','admin')),
  owner_id UUID,
  asset_type VARCHAR(30) CHECK (asset_type IN ('image','video','audio','360_panorama','360_tour','3d_model','ar_model','document','animation')),
  original_filename VARCHAR(255),
  original_url TEXT,
  original_size_bytes BIGINT,
  original_mime_type VARCHAR(80),
  original_hash_sha256 CHAR(64),
  status VARCHAR(20) DEFAULT 'uploading' CHECK (status IN ('uploading','processing','ready','failed','archived','deleted')),
  processing_error TEXT,
  duration_seconds NUMERIC(10,3),
  width_px INT, height_px INT, aspect_ratio NUMERIC(8,4),
  color_palette_jsonb JSONB,
  title_i18n JSONB, description_i18n JSONB, alt_text_i18n JSONB,
  captions_track_ids UUID[],
  default_quality_preset VARCHAR(20),
  primary_thumbnail_id UUID, primary_poster_id UUID,
  total_view_count BIGINT DEFAULT 0,
  total_play_time_seconds BIGINT DEFAULT 0,
  last_played_at TIMESTAMPTZ,
  retention_tier VARCHAR(10) DEFAULT 'hot' CHECK (retention_tier IN ('hot','warm','cold','archive')),
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_asset_owner ON media.media_asset (owner_type, owner_id);
CREATE INDEX IF NOT EXISTS idx_asset_type ON media.media_asset (asset_type, status);

CREATE TABLE IF NOT EXISTS media.media_variant (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  variant_label VARCHAR(40) NOT NULL,
  file_url TEXT, file_size_bytes BIGINT,
  mime_type VARCHAR(80),
  width_px INT, height_px INT,
  bitrate_kbps INT, codec VARCHAR(20),
  container_format VARCHAR(20),
  is_streaming BOOLEAN DEFAULT FALSE,
  processing_job_id UUID,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  hot_cache_status VARCHAR(20),
  UNIQUE (asset_id, variant_label)
);

CREATE TABLE IF NOT EXISTS media.media_thumbnail (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  thumbnail_url TEXT NOT NULL,
  position_seconds NUMERIC(10,3) DEFAULT 0,
  width INT, height INT,
  is_default_poster BOOLEAN DEFAULT FALSE,
  ai_quality_score NUMERIC(5,4),
  webvtt_url TEXT
);

CREATE TABLE IF NOT EXISTS media.media_metadata (
  asset_id UUID PRIMARY KEY REFERENCES media.media_asset(id) ON DELETE CASCADE,
  exif_jsonb JSONB,
  gps_lat NUMERIC(10,7), gps_lng NUMERIC(10,7),
  taken_at TIMESTAMPTZ,
  camera_make VARCHAR(80), camera_model VARCHAR(80), lens_info VARCHAR(120),
  ai_tags TEXT[] DEFAULT '{}',
  ai_objects_detected_jsonb JSONB,
  ai_colors TEXT[],
  ai_quality_score NUMERIC(5,4),
  ai_aesthetic_score NUMERIC(5,4),
  ai_safety_flags TEXT[]
);
CREATE INDEX IF NOT EXISTS idx_metadata_ai_tags ON media.media_metadata USING GIN (ai_tags);

CREATE TABLE IF NOT EXISTS media.media_subtitle_track (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  locale CHAR(2) NOT NULL,
  label VARCHAR(80),
  webvtt_url TEXT, srt_url TEXT,
  is_auto_generated BOOLEAN DEFAULT FALSE,
  generation_provider VARCHAR(20),
  accuracy_score NUMERIC(5,4),
  edited_by_user_id UUID,
  source_audio_track UUID,
  UNIQUE (asset_id, locale)
);

CREATE TABLE IF NOT EXISTS media.media_chapter (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  position INT, title_i18n JSONB,
  start_seconds NUMERIC(10,3), end_seconds NUMERIC(10,3),
  thumbnail_url TEXT,
  ai_generated BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS media.media_audio_track (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  locale CHAR(2), label VARCHAR(80),
  file_url TEXT, codec VARCHAR(20), bitrate INT,
  is_default BOOLEAN DEFAULT FALSE,
  is_dub BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS media.media_text_overlay (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  text_i18n JSONB,
  start_seconds NUMERIC(10,3), end_seconds NUMERIC(10,3),
  position_jsonb JSONB,
  style_jsonb JSONB
);

-- Interactive layer
CREATE TABLE IF NOT EXISTS media.media_hotspot (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  position_jsonb JSONB NOT NULL,
  hotspot_type VARCHAR(30) CHECK (hotspot_type IN ('info','product_link','navigate_scene','external_url','cta','chapter_jump')),
  linked_product_id UUID, linked_url TEXT,
  label_i18n JSONB, icon VARCHAR(40),
  visible_for_audience VARCHAR(20) DEFAULT 'all'
);

CREATE TABLE IF NOT EXISTS media.media_annotation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  annotated_by_user_id UUID,
  annotated_at TIMESTAMPTZ DEFAULT NOW(),
  time_seconds NUMERIC(10,3),
  coordinates JSONB,
  annotation_text_i18n JSONB,
  annotation_audio_url TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  replies_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS media.media_360_scene (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id_360 UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  scene_uid VARCHAR(60) NOT NULL,
  name_i18n JSONB, description_i18n JSONB,
  default_view_yaw NUMERIC(8,4), default_view_pitch NUMERIC(8,4), default_fov NUMERIC(8,4),
  ambient_audio_url TEXT,
  scene_order_position INT,
  UNIQUE (asset_id_360, scene_uid)
);

CREATE TABLE IF NOT EXISTS media.media_360_navigation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  from_scene_id UUID NOT NULL REFERENCES media.media_360_scene(id) ON DELETE CASCADE,
  to_scene_id UUID NOT NULL REFERENCES media.media_360_scene(id) ON DELETE CASCADE,
  hotspot_yaw NUMERIC(8,4), hotspot_pitch NUMERIC(8,4),
  label_i18n JSONB,
  transition_type VARCHAR(20) DEFAULT 'fade',
  permissions VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS media.media_360_tour (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  tour_code VARCHAR(60) NOT NULL UNIQUE,
  owner_supplier_id UUID REFERENCES identity.supplier(id),
  name_i18n JSONB, description_i18n JSONB,
  scene_ids UUID[],
  starting_scene_id UUID,
  cover_thumbnail_id UUID,
  total_scene_count INT,
  estimated_duration_minutes INT,
  language_audio_guide_locales TEXT[],
  view_count BIGINT DEFAULT 0,
  last_updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media.media_ar_anchor (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id_3d UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  anchor_type VARCHAR(20) CHECK (anchor_type IN ('floor','wall','face','hand','product_surface','table','any')),
  default_scale NUMERIC(8,4),
  allow_user_rotate BOOLEAN DEFAULT TRUE,
  allow_user_resize BOOLEAN DEFAULT TRUE,
  allow_user_color_swap BOOLEAN DEFAULT FALSE,
  color_variants_jsonb JSONB
);

-- Delivery + security
CREATE TABLE IF NOT EXISTS media.media_cdn_distribution (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  variant_id UUID NOT NULL REFERENCES media.media_variant(id) ON DELETE CASCADE,
  cdn_provider VARCHAR(20),
  edge_region VARCHAR(40),
  cache_status VARCHAR(20),
  last_purged_at TIMESTAMPTZ,
  hit_rate_pct NUMERIC(5,2),
  bytes_served_24h BIGINT
);

CREATE TABLE IF NOT EXISTS media.media_signed_url (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES media.media_variant(id),
  signed_url TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  issued_to_user_id UUID, session_id UUID,
  ip_lock INET,
  max_play_count INT, current_play_count INT DEFAULT 0,
  revoked BOOLEAN DEFAULT FALSE,
  single_use BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS media.media_embed_token (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  embed_context VARCHAR(40),
  embed_user_id UUID,
  embed_origin VARCHAR(255),
  expires_at TIMESTAMPTZ,
  scope_jsonb JSONB
);

CREATE TABLE IF NOT EXISTS media.media_access_policy (
  asset_id UUID PRIMARY KEY REFERENCES media.media_asset(id) ON DELETE CASCADE,
  policy_type VARCHAR(40) CHECK (policy_type IN ('public','signed_required','login_required','gold_member_only','supplier_authorized_buyers','geo_restricted','password_protected')),
  allowed_country_codes TEXT[], blocked_country_codes TEXT[],
  allowed_audience_ids UUID[],
  password_hash CHAR(64),
  max_concurrent_streams INT,
  max_views_per_user INT,
  expiry_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS media.media_drm_license (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  drm_provider VARCHAR(30),
  license_server_url TEXT,
  key_id VARCHAR(120),
  expiry_at TIMESTAMPTZ,
  max_devices INT,
  hwdrm_required BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS media.media_watermark_config (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID REFERENCES media.media_asset(id),
  supplier_id UUID REFERENCES identity.supplier(id),
  watermark_type VARCHAR(30) CHECK (watermark_type IN ('image','text','user_id_embed','forensic_invisible')),
  watermark_url TEXT, watermark_text TEXT,
  position VARCHAR(20),
  opacity NUMERIC(4,2),
  scale_pct NUMERIC(5,2),
  applied_to_variants UUID[],
  dynamic_per_viewer BOOLEAN DEFAULT FALSE
);

-- Lifecycle
CREATE TABLE IF NOT EXISTS media.media_processing_job (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  job_type VARCHAR(40) CHECK (job_type IN ('transcode_video','process_image','build_360_tiles','generate_ar_model','ai_analyze','transcribe','watermark_apply')),
  status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued','running','completed','failed','cancelled')),
  priority INT DEFAULT 100,
  started_at TIMESTAMPTZ, completed_at TIMESTAMPTZ,
  retry_count INT DEFAULT 0,
  error_message TEXT,
  worker_id VARCHAR(80),
  output_variant_ids UUID[],
  cost_usd_minor BIGINT
);
CREATE INDEX IF NOT EXISTS idx_proc_job_pending ON media.media_processing_job (priority, status) WHERE status IN ('queued','running');

CREATE TABLE IF NOT EXISTS media.media_processing_pipeline (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  pipeline_code VARCHAR(60) NOT NULL UNIQUE,
  name VARCHAR(120),
  applies_to_asset_type VARCHAR(20),
  steps_jsonb JSONB,
  is_default_for_type BOOLEAN DEFAULT FALSE,
  version VARCHAR(20),
  executed_count BIGINT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS media.media_storage_tier_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  from_tier VARCHAR(10), to_tier VARCHAR(10),
  migrated_at TIMESTAMPTZ DEFAULT NOW(),
  reason VARCHAR(40),
  bytes_moved BIGINT,
  source_storage VARCHAR(80), dest_storage VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS media.media_version (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  original_url TEXT,
  replaced_by_user_id UUID,
  replaced_at TIMESTAMPTZ DEFAULT NOW(),
  change_reason TEXT,
  previous_version_archived_until TIMESTAMPTZ,
  UNIQUE (asset_id, version_number)
);

CREATE TABLE IF NOT EXISTS media.media_quota_usage (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,
  period_month DATE NOT NULL,
  storage_bytes_used BIGINT, bandwidth_bytes_served BIGINT,
  asset_count INT,
  video_minutes_processed INT,
  ai_analysis_count INT,
  quota_storage_bytes BIGINT,
  quota_bandwidth_bytes BIGINT,
  overage_charge_usd_minor BIGINT DEFAULT 0,
  UNIQUE (supplier_id, period_month)
);

-- Embed reference + analytics
CREATE TABLE IF NOT EXISTS media.media_embed_reference (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  embed_context_type VARCHAR(40),
  embed_context_id UUID,
  embed_position INT,
  first_embedded_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  current_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS media.media_view_session (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  asset_id UUID,
  variant_played_id UUID,
  viewer_user_id UUID, guest_session_id UUID,
  embed_context_type VARCHAR(40), embed_context_id UUID,
  viewer_ip INET,
  viewer_country CHAR(2), viewer_device VARCHAR(20), viewer_browser VARCHAR(80),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  watch_duration_seconds INT,
  watch_completion_pct NUMERIC(5,2),
  drop_off_at_seconds INT,
  replay_count INT DEFAULT 0,
  fullscreen_used BOOLEAN DEFAULT FALSE,
  mute_used BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_view_brin ON media.media_view_session USING BRIN (started_at);
CREATE INDEX IF NOT EXISTS idx_view_asset ON media.media_view_session (asset_id, started_at DESC);

CREATE TABLE IF NOT EXISTS media.media_engagement_metric (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  asset_id UUID NOT NULL REFERENCES media.media_asset(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  unique_viewers INT, total_plays BIGINT,
  total_watch_seconds BIGINT,
  avg_watch_duration NUMERIC(8,2),
  completion_rate_pct NUMERIC(5,2),
  drop_off_heatmap_jsonb JSONB,
  top_countries_jsonb JSONB,
  top_devices_jsonb JSONB,
  top_referrer_contexts_jsonb JSONB,
  conversion_count INT,
  conversion_value_usd_minor BIGINT,
  UNIQUE (asset_id, date)
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='media' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='media' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE media.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON media.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON media.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('28_media_layer.sql', 'Universal Media Layer: 28 tables');
