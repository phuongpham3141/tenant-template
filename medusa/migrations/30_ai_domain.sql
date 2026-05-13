-- Migration 30: AI Domain (Domain 22 AI) — 15 entities
-- Note: pgvector required for ai_embedding_doc. Falls back to JSONB if pgvector unavailable.
\set ON_ERROR_STOP on

-- Check pgvector availability
DO $check$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
    RAISE WARNING 'pgvector not installed — ai_embedding_doc will use JSONB instead of vector(1536). AI features degraded.';
  END IF;
END $check$;

CREATE TABLE IF NOT EXISTS ai.ai_agent_config (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  scope_type VARCHAR(30) CHECK (scope_type IN ('platform_default','supplier','buyer_assist','admin_internal','livestream')),
  scope_id UUID,
  name VARCHAR(120),
  avatar_url TEXT,
  greeting_i18n JSONB,
  system_prompt_i18n JSONB,
  llm_provider VARCHAR(30) CHECK (llm_provider IN ('anthropic_claude','google_gemini','openai_gpt','local_llama','cohere','mistral')),
  llm_model VARCHAR(80),
  temperature NUMERIC(3,2) DEFAULT 0.3,
  max_output_tokens INT DEFAULT 4000,
  enabled_tools TEXT[] DEFAULT '{}',
  data_access_scope JSONB,
  knowledge_base_doc_ids UUID[],
  guardrails_jsonb JSONB,
  handoff_to_human_email VARCHAR(255),
  enable_voice BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  fallback_agent_id UUID,
  cost_budget_monthly_usd_minor BIGINT
);

CREATE TABLE IF NOT EXISTS ai.ai_conversation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES identity."user"(id),
  agent_config_id UUID REFERENCES ai.ai_agent_config(id),
  context_type VARCHAR(40),
  context_entity_id UUID,
  scope_supplier_id UUID,
  locale CHAR(2),
  title VARCHAR(255),
  message_count INT DEFAULT 0,
  last_message_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'active',
  total_cost_usd_minor BIGINT DEFAULT 0,
  total_tokens BIGINT DEFAULT 0,
  ai_satisfaction_score NUMERIC(3,2),
  escalated_to_user_id UUID
);
CREATE INDEX IF NOT EXISTS idx_conv_user ON ai.ai_conversation (user_id, last_message_at DESC);

CREATE TABLE IF NOT EXISTS ai.ai_message (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  conversation_id UUID NOT NULL REFERENCES ai.ai_conversation(id) ON DELETE CASCADE,
  turn_index INT,
  role VARCHAR(20) CHECK (role IN ('user','assistant','system','tool')),
  content_text TEXT,
  content_attachments_jsonb JSONB,
  tool_calls_jsonb JSONB,
  tool_results_jsonb JSONB,
  tokens_input INT, tokens_output INT, tokens_cached INT,
  cost_usd_minor BIGINT,
  latency_ms INT,
  llm_model_used VARCHAR(80),
  finish_reason VARCHAR(30),
  safety_flags TEXT[],
  user_feedback VARCHAR(20),
  edited_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ai_msg_conv ON ai.ai_message (conversation_id, turn_index);
CREATE INDEX IF NOT EXISTS idx_ai_msg_brin ON ai.ai_message USING BRIN (created_at);

-- ai_embedding_doc: use pgvector if available, else JSONB fallback
DO $emb$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
    EXECUTE $sql$
      CREATE TABLE IF NOT EXISTS ai.ai_embedding_doc (
        id UUID PRIMARY KEY DEFAULT public.uuidv7(),
        tenant_id VARCHAR(20) NOT NULL,
        scope_type VARCHAR(20),
        scope_id UUID,
        source_entity_type VARCHAR(40),
        source_entity_id UUID,
        locale CHAR(2),
        chunk_index INT,
        content_text TEXT,
        content_hash CHAR(64),
        embedding vector(1536),
        embedding_model VARCHAR(80),
        metadata_jsonb JSONB,
        indexed_at TIMESTAMPTZ DEFAULT NOW(),
        expires_at TIMESTAMPTZ
      )
    $sql$;
    -- HNSW index if pgvector >= 0.5
    BEGIN
      EXECUTE 'CREATE INDEX IF NOT EXISTS idx_embed_hnsw ON ai.ai_embedding_doc USING hnsw (embedding vector_cosine_ops)';
    EXCEPTION WHEN OTHERS THEN
      EXECUTE 'CREATE INDEX IF NOT EXISTS idx_embed_ivf ON ai.ai_embedding_doc USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100)';
    END;
  ELSE
    -- Fallback: store embedding as JSONB array
    EXECUTE $sql$
      CREATE TABLE IF NOT EXISTS ai.ai_embedding_doc (
        id UUID PRIMARY KEY DEFAULT public.uuidv7(),
        tenant_id VARCHAR(20) NOT NULL,
        scope_type VARCHAR(20),
        scope_id UUID,
        source_entity_type VARCHAR(40),
        source_entity_id UUID,
        locale CHAR(2),
        chunk_index INT,
        content_text TEXT,
        content_hash CHAR(64),
        embedding JSONB,    -- Fallback: array stored as JSONB. Slow cosine search.
        embedding_model VARCHAR(80),
        metadata_jsonb JSONB,
        indexed_at TIMESTAMPTZ DEFAULT NOW(),
        expires_at TIMESTAMPTZ
      )
    $sql$;
  END IF;
END $emb$;
CREATE INDEX IF NOT EXISTS idx_embed_scope ON ai.ai_embedding_doc (scope_type, scope_id);

CREATE TABLE IF NOT EXISTS ai.ai_tool_call_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  message_id UUID NOT NULL,
  tool_name VARCHAR(80),
  tool_arguments_jsonb JSONB,
  permission_scope_jsonb JSONB,
  execution_status VARCHAR(20) CHECK (execution_status IN ('success','denied','error','timeout')),
  denied_reason TEXT,
  result_summary TEXT,
  rows_accessed_count INT,
  pii_data_accessed BOOLEAN DEFAULT FALSE,
  execution_ms INT,
  cost_usd_minor BIGINT,
  retry_count INT DEFAULT 0,
  idempotency_key VARCHAR(120),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_tool_call_msg ON ai.ai_tool_call_log (message_id);
CREATE INDEX IF NOT EXISTS idx_tool_call_brin ON ai.ai_tool_call_log USING BRIN (created_at);

CREATE TABLE IF NOT EXISTS ai.ai_usage_quota (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  owner_type VARCHAR(20) CHECK (owner_type IN ('user','supplier','tenant')),
  owner_id UUID,
  period_type VARCHAR(20) CHECK (period_type IN ('daily','monthly','annual')),
  period_start_at TIMESTAMPTZ NOT NULL,
  tokens_used_input BIGINT DEFAULT 0,
  tokens_used_output BIGINT DEFAULT 0,
  tokens_cached_hit BIGINT DEFAULT 0,
  cost_used_usd_minor BIGINT DEFAULT 0,
  conversation_count INT DEFAULT 0,
  quota_limit_tokens BIGINT,
  quota_limit_cost_usd_minor BIGINT,
  overflow_action VARCHAR(20) CHECK (overflow_action IN ('block','throttle','charge_per_token')),
  plan_tier VARCHAR(20),
  soft_limit_warned_at TIMESTAMPTZ,
  hard_limit_blocked_at TIMESTAMPTZ,
  UNIQUE (owner_type, owner_id, period_type, period_start_at)
);

CREATE TABLE IF NOT EXISTS ai.ai_function_registry (
  tool_name VARCHAR(80) PRIMARY KEY,
  category VARCHAR(30) CHECK (category IN ('search','crud','external_api','computation','notification','admin')),
  description_i18n JSONB,
  parameters_jsonschema JSONB,
  output_jsonschema JSONB,
  required_permissions TEXT[],
  required_data_scope TEXT[],
  rate_limit_per_minute INT,
  cost_per_call_usd_minor BIGINT,
  is_dangerous BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  implementation_class VARCHAR(120)
);

CREATE TABLE IF NOT EXISTS ai.ai_prompt_template (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  template_code VARCHAR(80) NOT NULL,
  name VARCHAR(255),
  category VARCHAR(30) CHECK (category IN ('page_gen','email_gen','product_desc','translate','summarize','classify','extract','moderation','negotiation_mediator')),
  prompt_template TEXT NOT NULL,
  variables_schema_jsonb JSONB,
  model_preference VARCHAR(80),
  temperature_default NUMERIC(3,2),
  output_format VARCHAR(20),
  is_few_shot BOOLEAN DEFAULT FALSE,
  examples_jsonb JSONB,
  version VARCHAR(20),
  performance_metrics_jsonb JSONB,
  UNIQUE (tenant_id, template_code, version)
);

CREATE TABLE IF NOT EXISTS ai.ai_generation_task (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  task_type VARCHAR(40) CHECK (task_type IN ('page_block_gen','page_full_gen','email_gen','product_desc_gen','translate_bulk','image_gen','summarize','seo_optimize','classify_intent')),
  prompt_template_id UUID,
  input_variables_jsonb JSONB,
  scope_user_id UUID,
  scope_supplier_id UUID,
  scope_entity_type VARCHAR(40), scope_entity_id UUID,
  status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued','running','completed','failed','cancelled','review_required')),
  progress_pct NUMERIC(5,2) DEFAULT 0,
  queued_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ, completed_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INT DEFAULT 0,
  total_cost_usd_minor BIGINT,
  total_tokens BIGINT,
  result_id UUID
);

CREATE TABLE IF NOT EXISTS ai.ai_generation_result (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  task_id UUID NOT NULL REFERENCES ai.ai_generation_task(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  output_content_text TEXT,
  output_content_html TEXT,
  output_content_structured_jsonb JSONB,
  output_media_urls TEXT[],
  confidence_score NUMERIC(5,4),
  quality_rating_user VARCHAR(10),
  quality_rating_auto NUMERIC(5,4),
  used_in_entity_id UUID,
  used_at TIMESTAMPTZ,
  alternatives_count INT DEFAULT 0,
  model_used VARCHAR(80),
  tokens_used INT,
  cost_usd_minor BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai.ai_model_registry (
  model_code VARCHAR(80) PRIMARY KEY,
  provider VARCHAR(20),
  display_name VARCHAR(120),
  capabilities TEXT[],
  context_window_tokens INT,
  max_output_tokens INT,
  cost_per_million_input_tokens_usd NUMERIC(10,4),
  cost_per_million_output_tokens_usd NUMERIC(10,4),
  cost_per_million_cached_tokens_usd NUMERIC(10,4),
  recommended_for TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  fallback_model_code VARCHAR(80),
  deprecated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS ai.ai_safety_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  related_message_id UUID, related_generation_task_id UUID,
  content_type VARCHAR(10) CHECK (content_type IN ('input','output')),
  category VARCHAR(40),
  severity VARCHAR(10),
  provider VARCHAR(40),
  confidence_score NUMERIC(5,4),
  content_excerpt TEXT,
  action_taken VARCHAR(30),
  reviewed_by_user_id UUID,
  false_positive BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_safety_brin ON ai.ai_safety_log USING BRIN (created_at);

CREATE TABLE IF NOT EXISTS ai.ai_translation_cache (
  content_hash CHAR(64) NOT NULL,
  source_locale CHAR(2) NOT NULL,
  target_locale CHAR(2) NOT NULL,
  source_text TEXT,
  translated_text TEXT NOT NULL,
  provider VARCHAR(20),
  quality_score NUMERIC(5,4),
  context_hint VARCHAR(40),
  verified_by_human BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ,
  hit_count BIGINT DEFAULT 0,
  PRIMARY KEY (content_hash, source_locale, target_locale)
);

CREATE TABLE IF NOT EXISTS ai.ai_recommendation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  recommend_type VARCHAR(40),
  context_user_id UUID,
  context_entity_type VARCHAR(40), context_entity_id UUID,
  recommended_entity_type VARCHAR(40), recommended_entity_id UUID,
  score NUMERIC(8,4),
  reasoning_text TEXT,
  algorithm VARCHAR(40),
  session_id UUID,
  position INT,
  displayed_at TIMESTAMPTZ DEFAULT NOW(),
  clicked_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  feedback VARCHAR(20)
);
CREATE INDEX IF NOT EXISTS idx_rec_brin ON ai.ai_recommendation USING BRIN (displayed_at);

CREATE TABLE IF NOT EXISTS ai.ai_workflow (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  workflow_code VARCHAR(60) NOT NULL UNIQUE,
  name VARCHAR(255),
  trigger_type VARCHAR(20),
  trigger_event VARCHAR(60),
  steps_definition_jsonb JSONB,
  version VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  total_executions BIGINT DEFAULT 0,
  success_rate_pct NUMERIC(5,2),
  avg_duration_seconds NUMERIC(8,2),
  avg_cost_usd_minor BIGINT
);

CREATE TABLE IF NOT EXISTS ai.ai_workflow_execution (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  workflow_id UUID NOT NULL REFERENCES ai.ai_workflow(id),
  triggered_by_user_id UUID,
  triggered_by_event VARCHAR(60),
  input_jsonb JSONB,
  status VARCHAR(20) DEFAULT 'running' CHECK (status IN ('running','completed','failed','cancelled')),
  current_step INT,
  steps_completed_jsonb JSONB,
  output_jsonb JSONB,
  total_cost_usd_minor BIGINT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  error_step INT, error_message TEXT
);

CREATE TABLE IF NOT EXISTS ai.ai_human_handoff (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  conversation_id UUID,
  triggered_by VARCHAR(40),
  trigger_message_id UUID,
  escalated_to_team VARCHAR(20),
  assigned_to_user_id UUID,
  priority VARCHAR(10),
  ai_handoff_summary TEXT,
  sla_response_deadline TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'queued',
  claimed_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai.ai_training_feedback (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  related_message_id UUID,
  related_generation_result_id UUID,
  feedback_type VARCHAR(20),
  rating_value NUMERIC(5,2),
  edited_text TEXT,
  feedback_text TEXT,
  applied_to_training BOOLEAN DEFAULT FALSE,
  applied_at TIMESTAMPTZ,
  batch_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='ai' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='ai' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE ai.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON ai.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON ai.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('30_ai_domain.sql', 'AI Domain: 15 tables (with pgvector fallback to JSONB)');
