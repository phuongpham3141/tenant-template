-- Migration 39: AI Livestream Tier 1-4 — virtual host avatar + voice clone + script graph + 24/7 simulcast + GPU compute ledger
\set ON_ERROR_STOP on

-- ============================================================================
-- Extend live.livestream_session with AI mode + simulcast metadata
-- ============================================================================
DO $extend$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='live' AND table_name='livestream_session' AND column_name='mode') THEN
    ALTER TABLE live.livestream_session ADD COLUMN mode VARCHAR(20) NOT NULL DEFAULT 'human' CHECK (mode IN ('human','ai_segment','ai_continuous'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='live' AND table_name='livestream_session' AND column_name='persona_id') THEN
    ALTER TABLE live.livestream_session ADD COLUMN persona_id UUID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='live' AND table_name='livestream_session' AND column_name='active_script_id') THEN
    ALTER TABLE live.livestream_session ADD COLUMN active_script_id UUID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='live' AND table_name='livestream_session' AND column_name='gpu_seconds_consumed') THEN
    ALTER TABLE live.livestream_session ADD COLUMN gpu_seconds_consumed BIGINT NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='live' AND table_name='livestream_session' AND column_name='locales_simulcast') THEN
    ALTER TABLE live.livestream_session ADD COLUMN locales_simulcast TEXT[] DEFAULT ARRAY[]::TEXT[];
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='live' AND table_name='livestream_session' AND column_name='director_session_id') THEN
    ALTER TABLE live.livestream_session ADD COLUMN director_session_id UUID;
  END IF;
END $extend$;

-- ============================================================================
-- 1. AI Persona — virtual host identity
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.ai_persona (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID,
  slug VARCHAR(120) NOT NULL,
  display_name_i18n JSONB NOT NULL DEFAULT '{}'::jsonb,
  persona_description_i18n JSONB DEFAULT '{}'::jsonb,
  voice_style VARCHAR(40) DEFAULT 'friendly_sales' CHECK (voice_style IN ('friendly_sales','formal','energetic','warm_advisor','professional_news','casual_streamer')),
  primary_locale CHAR(2) NOT NULL DEFAULT 'vi',
  supported_locales TEXT[] NOT NULL DEFAULT ARRAY['vi','en','cn']::TEXT[],
  avatar_asset_id UUID,
  voice_profile_ids JSONB DEFAULT '{}'::jsonb,
  brand_kit_jsonb JSONB DEFAULT '{}'::jsonb,
  system_prompt_override TEXT,
  catchphrases_jsonb JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','training','active','paused','archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by_user_id UUID, version INT DEFAULT 1, deleted_at TIMESTAMPTZ, metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE (tenant_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_persona_tenant ON live.ai_persona (tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_persona_supplier ON live.ai_persona (supplier_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_persona_status ON live.ai_persona (tenant_id, status);

-- ============================================================================
-- 2. Voice Profile — clone per (persona, locale)
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.voice_profile (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  persona_id UUID NOT NULL REFERENCES live.ai_persona(id) ON DELETE CASCADE,
  locale CHAR(2) NOT NULL,
  provider VARCHAR(40) NOT NULL CHECK (provider IN ('elevenlabs','azure','coqui','openai','playht')),
  provider_voice_id VARCHAR(200) NOT NULL,
  sample_audio_url TEXT,
  gender VARCHAR(10),
  age_band VARCHAR(20),
  accent VARCHAR(40),
  is_clone BOOLEAN DEFAULT FALSE,
  training_status VARCHAR(20) DEFAULT 'ready' CHECK (training_status IN ('pending','training','ready','failed')),
  training_error TEXT,
  cost_per_1k_chars_micros BIGINT DEFAULT 300000,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (persona_id, locale, provider)
);
CREATE INDEX IF NOT EXISTS idx_voice_persona ON live.voice_profile (persona_id, locale);

-- ============================================================================
-- 3. Avatar Asset — 2D/3D base model
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.avatar_asset (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  asset_type VARCHAR(30) NOT NULL CHECK (asset_type IN ('2d_talking_head','3d_full_body','generated_photo','live_actor_capture')),
  provider VARCHAR(40) NOT NULL CHECK (provider IN ('heygen','did','synthesia','local_wav2lip','custom')),
  provider_asset_id VARCHAR(200),
  display_name VARCHAR(200) NOT NULL,
  thumbnail_url TEXT,
  idle_loop_url TEXT,
  base_video_url TEXT,
  resolution VARCHAR(20) DEFAULT '1080p',
  aspect_ratio VARCHAR(10) DEFAULT '16:9' CHECK (aspect_ratio IN ('16:9','9:16','1:1','4:3')),
  cost_per_minute_micros BIGINT DEFAULT 150000,
  ready_for_realtime BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_avatar_tenant ON live.avatar_asset (tenant_id) WHERE deleted_at IS NULL;

-- FK: ai_persona.avatar_asset_id → avatar_asset
DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'persona_avatar_fk') THEN
    ALTER TABLE live.ai_persona ADD CONSTRAINT persona_avatar_fk
      FOREIGN KEY (avatar_asset_id) REFERENCES live.avatar_asset(id) ON DELETE SET NULL;
  END IF;
END $fk$;

-- ============================================================================
-- 4. AI Stream Script — top-level container
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.ai_stream_script (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID,
  persona_id UUID REFERENCES live.ai_persona(id) ON DELETE SET NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  supported_locales TEXT[] DEFAULT ARRAY['vi','en','cn']::TEXT[],
  total_duration_estimate_seconds INT DEFAULT 1800,
  version INT DEFAULT 1,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','approved','archived')),
  start_segment_id UUID,
  loop_until_stop BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by_user_id UUID, deleted_at TIMESTAMPTZ, metadata JSONB DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_script_persona ON live.ai_stream_script (persona_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_script_supplier ON live.ai_stream_script (supplier_id) WHERE deleted_at IS NULL;

-- ============================================================================
-- 5. Script Segment — node trong graph
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.script_segment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  script_id UUID NOT NULL REFERENCES live.ai_stream_script(id) ON DELETE CASCADE,
  segment_type VARCHAR(30) NOT NULL CHECK (segment_type IN ('intro','product_showcase','qa','cta','auction','flash_sale','break','outro','transition','testimonial','news_update','poll')),
  order_hint INT DEFAULT 0,
  dialogue_template_i18n JSONB NOT NULL DEFAULT '{}'::jsonb,
  variables_jsonb JSONB DEFAULT '{}'::jsonb,
  duration_seconds_estimate INT DEFAULT 60,
  product_id UUID,
  category_id UUID,
  b_roll_clip_ids UUID[],
  cta_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_segment_script ON live.script_segment (script_id, order_hint);

DO $fk2$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'script_start_segment_fk') THEN
    ALTER TABLE live.ai_stream_script ADD CONSTRAINT script_start_segment_fk
      FOREIGN KEY (start_segment_id) REFERENCES live.script_segment(id) ON DELETE SET NULL;
  END IF;
END $fk2$;

-- ============================================================================
-- 6. Script Transition Rule — edge của graph
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.script_transition_rule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  from_segment_id UUID NOT NULL REFERENCES live.script_segment(id) ON DELETE CASCADE,
  to_segment_id UUID NOT NULL REFERENCES live.script_segment(id) ON DELETE CASCADE,
  condition_jsonb JSONB DEFAULT '{}'::jsonb,
  weight NUMERIC(6,3) DEFAULT 1.0,
  priority INT DEFAULT 100,
  description VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_transition_from ON live.script_transition_rule (from_segment_id, priority);

-- ============================================================================
-- 7. AI Director Session — runtime orchestrator state
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.ai_director_session (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  stream_id UUID NOT NULL,
  script_id UUID NOT NULL REFERENCES live.ai_stream_script(id),
  persona_id UUID NOT NULL REFERENCES live.ai_persona(id),
  status VARCHAR(20) DEFAULT 'initializing' CHECK (status IN ('initializing','running','paused','quota_paused','ended','failed')),
  current_segment_id UUID REFERENCES live.script_segment(id),
  next_segment_id UUID REFERENCES live.script_segment(id),
  segment_started_at TIMESTAMPTZ,
  segment_ends_at TIMESTAMPTZ,
  loop_iteration INT DEFAULT 0,
  viewer_count INT DEFAULT 0,
  engagement_score NUMERIC(6,3) DEFAULT 0,
  last_chat_response_at TIMESTAMPTZ,
  decisions_log JSONB DEFAULT '[]'::jsonb,
  gpu_seconds_consumed BIGINT DEFAULT 0,
  total_cost_micros BIGINT DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  paused_at TIMESTAMPTZ, ended_at TIMESTAMPTZ,
  failure_reason TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_director_stream ON live.ai_director_session (stream_id);
CREATE INDEX IF NOT EXISTS idx_director_status ON live.ai_director_session (tenant_id, status) WHERE status IN ('running','paused');

-- ============================================================================
-- 8. TTS Render Job — GPU/API queue
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.tts_render_job (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  director_session_id UUID REFERENCES live.ai_director_session(id) ON DELETE CASCADE,
  segment_id UUID REFERENCES live.script_segment(id),
  voice_profile_id UUID NOT NULL REFERENCES live.voice_profile(id),
  locale CHAR(2) NOT NULL,
  provider VARCHAR(40) NOT NULL,
  text TEXT NOT NULL,
  text_hash CHAR(64) GENERATED ALWAYS AS (encode(sha256(text::bytea), 'hex')) STORED,
  status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued','rendering','completed','failed','cached_hit')),
  audio_url TEXT,
  duration_ms INT,
  cost_micros BIGINT DEFAULT 0,
  attempts INT DEFAULT 0,
  error_message TEXT,
  queued_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ, completed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_tts_status ON live.tts_render_job (status, queued_at);
CREATE INDEX IF NOT EXISTS idx_tts_session ON live.tts_render_job (director_session_id);
CREATE INDEX IF NOT EXISTS idx_tts_hash ON live.tts_render_job (text_hash, voice_profile_id, locale) WHERE status = 'completed';

-- ============================================================================
-- 9. Video Render Job — lipsync GPU
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.video_render_job (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  director_session_id UUID REFERENCES live.ai_director_session(id) ON DELETE CASCADE,
  avatar_asset_id UUID NOT NULL REFERENCES live.avatar_asset(id),
  audio_url TEXT NOT NULL,
  audio_duration_ms INT,
  provider VARCHAR(40) NOT NULL,
  status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued','rendering','completed','failed')),
  video_url TEXT,
  frame_count INT,
  resolution VARCHAR(20),
  cost_micros BIGINT DEFAULT 0,
  gpu_seconds INT DEFAULT 0,
  attempts INT DEFAULT 0,
  error_message TEXT,
  queued_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ, completed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_video_status ON live.video_render_job (status, queued_at);
CREATE INDEX IF NOT EXISTS idx_video_session ON live.video_render_job (director_session_id);

-- ============================================================================
-- 10. Chat Response Cache — FAQ hot path
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.ai_chat_response_cache (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  persona_id UUID REFERENCES live.ai_persona(id) ON DELETE CASCADE,
  locale CHAR(2) NOT NULL,
  question_hash CHAR(64) NOT NULL,
  question_text TEXT NOT NULL,
  response_text TEXT NOT NULL,
  audio_url TEXT,
  hit_count BIGINT DEFAULT 0,
  last_hit_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (persona_id, locale, question_hash)
);
CREATE INDEX IF NOT EXISTS idx_chat_cache_lookup ON live.ai_chat_response_cache (persona_id, locale, question_hash);

-- ============================================================================
-- 11. Stream Audio Track — per-locale mix
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.stream_audio_track (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  stream_id UUID NOT NULL,
  locale CHAR(2) NOT NULL,
  hls_url TEXT,
  rtmp_ingest_url TEXT,
  current_segment_id UUID REFERENCES live.script_segment(id),
  sync_offset_ms INT DEFAULT 0,
  bitrate_kbps INT DEFAULT 128,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','degraded','stopped')),
  last_chunk_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (stream_id, locale)
);
CREATE INDEX IF NOT EXISTS idx_audio_track_stream ON live.stream_audio_track (stream_id);

-- ============================================================================
-- 12. Broadcast Schedule — 24/7 loop config
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.broadcast_schedule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  stream_id UUID NOT NULL,
  schedule_type VARCHAR(20) NOT NULL DEFAULT 'loop' CHECK (schedule_type IN ('loop','playlist','cron')),
  script_ids UUID[] NOT NULL,
  current_script_id UUID,
  current_script_index INT DEFAULT 0,
  current_loop_iteration INT DEFAULT 0,
  cron_expression VARCHAR(80),
  active_hours_jsonb JSONB DEFAULT '{}'::jsonb,
  next_check_at TIMESTAMPTZ DEFAULT NOW(),
  paused BOOLEAN DEFAULT FALSE,
  pause_reason VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_schedule_next ON live.broadcast_schedule (next_check_at) WHERE paused = FALSE;

-- ============================================================================
-- 13. AI Compute Ledger — realtime cost (append-only)
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.ai_compute_ledger (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  stream_id UUID,
  director_session_id UUID,
  persona_id UUID,
  resource_type VARCHAR(30) NOT NULL CHECK (resource_type IN ('tts','video_render','llm_realtime','llm_batch','avatar_render','mux_compute','storage_egress')),
  provider VARCHAR(40),
  units NUMERIC(14,4) NOT NULL,
  unit_label VARCHAR(20) NOT NULL,
  unit_micros BIGINT NOT NULL,
  total_micros BIGINT NOT NULL,
  occurred_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_ledger_tenant_time ON live.ai_compute_ledger USING BRIN (occurred_at);
CREATE INDEX IF NOT EXISTS idx_ledger_tenant ON live.ai_compute_ledger (tenant_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_ledger_stream ON live.ai_compute_ledger (stream_id, occurred_at DESC);

-- ============================================================================
-- 14. Asset Clip Library — B-roll indexed by embedding
-- ============================================================================
CREATE TABLE IF NOT EXISTS live.asset_clip_library (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID,
  persona_id UUID REFERENCES live.ai_persona(id) ON DELETE SET NULL,
  clip_url TEXT NOT NULL,
  thumbnail_url TEXT,
  embedding_doc_id UUID,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  use_case VARCHAR(40) CHECK (use_case IN ('intro','outro','close_up','product_demo','transition','b_roll_factory','b_roll_warehouse','testimonial')),
  duration_ms INT,
  resolution VARCHAR(20),
  language CHAR(2),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_clip_use_case ON live.asset_clip_library (tenant_id, use_case) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_clip_tags ON live.asset_clip_library USING GIN (tags);

-- ============================================================================
-- Updated_at triggers
-- ============================================================================
DO $trg$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'ai_persona','voice_profile','avatar_asset','ai_stream_script','script_segment',
    'tts_render_job','video_render_job','stream_audio_track','broadcast_schedule','asset_clip_library'
  ]) LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%s_updated ON live.%I', t, t);
    EXECUTE format('CREATE TRIGGER trg_%s_updated BEFORE UPDATE ON live.%I FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp()', t, t);
  END LOOP;
END $trg$;

-- ============================================================================
-- RLS policies
-- ============================================================================
DO $rls$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'ai_persona','voice_profile','avatar_asset','ai_stream_script','script_segment','script_transition_rule',
    'ai_director_session','tts_render_job','video_render_job','ai_chat_response_cache',
    'stream_audio_track','broadcast_schedule','ai_compute_ledger','asset_clip_library'
  ]) LOOP
    EXECUTE format('ALTER TABLE live.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON live.%I', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON live.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
      t
    );
  END LOOP;
END $rls$;

-- ============================================================================
-- Audit triggers on persona + script + director (high-stakes changes)
-- ============================================================================
DO $audit$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY['ai_persona','ai_stream_script','ai_director_session']) LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%s_audit ON live.%I', t, t);
    EXECUTE format(
      'CREATE TRIGGER trg_%s_audit AFTER INSERT OR UPDATE OR DELETE ON live.%I FOR EACH ROW EXECUTE FUNCTION public.trigger_emit_audit_event()',
      t, t
    );
  END LOOP;
END $audit$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('39_ai_livestream.sql', 'AI Livestream Tier 1-4: 14 tables + 6 livestream columns + RLS + audit triggers');
