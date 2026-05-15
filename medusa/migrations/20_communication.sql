-- Migration 20: Communication (Domain 11)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS communication.conversation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  code VARCHAR(20) NOT NULL UNIQUE,
  context_type VARCHAR(30) CHECK (context_type IN ('pre_sales_inquiry','product_question','negotiation','rfq_clarification','order_support','dispute','post_purchase','general','dispatcher')),
  context_entity_type VARCHAR(40), context_entity_id UUID,
  subject_i18n JSONB,
  initiator_user_id UUID NOT NULL REFERENCES identity."user"(id),
  initiator_type VARCHAR(20),
  supplier_id UUID REFERENCES identity.supplier(id),
  related_product_id UUID, related_order_id UUID, related_rfq_id UUID,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','pending_reply','active','archived','closed','escalated')),
  priority VARCHAR(10) DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent','p0')),
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,
  unread_count_buyer INT DEFAULT 0,
  unread_count_supplier INT DEFAULT 0,
  sla_response_deadline TIMESTAMPTZ,
  sla_breached BOOLEAN DEFAULT FALSE,
  assigned_to_user_id UUID,
  language_primary CHAR(2),
  language_detected CHAR(2)
);
CREATE INDEX IF NOT EXISTS idx_conv_initiator ON communication.conversation (initiator_user_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conv_supplier ON communication.conversation (supplier_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conv_status ON communication.conversation (tenant_id, status, last_message_at DESC);

CREATE TABLE IF NOT EXISTS communication.conversation_participant (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  conversation_id UUID NOT NULL REFERENCES communication.conversation(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES identity."user"(id),
  role VARCHAR(30) CHECK (role IN ('initiator','recipient','cc','observer','admin_mediator','ai_assistant','translator')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ, last_seen_at TIMESTAMPTZ,
  notifications_muted BOOLEAN DEFAULT FALSE,
  can_send BOOLEAN DEFAULT TRUE,
  can_invite_others BOOLEAN DEFAULT FALSE,
  UNIQUE (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS communication.conversation_message (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  conversation_id UUID NOT NULL REFERENCES communication.conversation(id) ON DELETE CASCADE,
  sender_user_id UUID NOT NULL REFERENCES identity."user"(id),
  sender_type VARCHAR(20),
  content_text TEXT,
  content_html TEXT,
  reply_to_message_id UUID,
  thread_root_message_id UUID,
  original_language CHAR(2),
  is_system_message BOOLEAN DEFAULT FALSE,
  is_auto_reply BOOLEAN DEFAULT FALSE,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ,
  pinned BOOLEAN DEFAULT FALSE,
  important_flag BOOLEAN DEFAULT FALSE,
  mentions UUID[],
  structured_payload_jsonb JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_msg_conv ON communication.conversation_message (conversation_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_msg_brin ON communication.conversation_message USING BRIN (created_at);

CREATE TABLE IF NOT EXISTS communication.conversation_attachment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  message_id UUID NOT NULL REFERENCES communication.conversation_message(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL, file_name VARCHAR(255), mime_type VARCHAR(80),
  file_size_bytes BIGINT, file_hash_sha256 CHAR(64),
  thumbnail_url TEXT, duration_seconds INT,
  virus_scan_status VARCHAR(20), dlp_flag BOOLEAN DEFAULT FALSE,
  preview_extracted_text TEXT
);

CREATE TABLE IF NOT EXISTS communication.message_translation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  message_id UUID NOT NULL REFERENCES communication.conversation_message(id) ON DELETE CASCADE,
  target_locale CHAR(2) NOT NULL,
  translated_text TEXT,
  translated_by VARCHAR(20) CHECK (translated_by IN ('deepl','google','claude','gpt','human','cache')),
  confidence_score NUMERIC(5,4),
  edited_by_user_id UUID, translated_at TIMESTAMPTZ DEFAULT NOW(),
  cache_hit BOOLEAN DEFAULT FALSE,
  UNIQUE (message_id, target_locale)
);

CREATE TABLE IF NOT EXISTS communication.message_read_receipt (
  message_id UUID NOT NULL REFERENCES communication.conversation_message(id) ON DELETE CASCADE,
  participant_user_id UUID NOT NULL REFERENCES identity."user"(id),
  read_at TIMESTAMPTZ, delivered_at TIMESTAMPTZ,
  device_type VARCHAR(20),
  PRIMARY KEY (message_id, participant_user_id)
);

CREATE TABLE IF NOT EXISTS communication.inquiry (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  code VARCHAR(20) NOT NULL UNIQUE,
  product_id UUID REFERENCES catalog.product(id),
  supplier_id UUID REFERENCES identity.supplier(id),
  buyer_user_id UUID NOT NULL REFERENCES identity."user"(id),
  question_i18n JSONB,
  attached_image_urls TEXT[] DEFAULT '{}',
  variant_interest VARCHAR(120),
  target_quantity INT, target_destination VARCHAR(120),
  expected_response_time VARCHAR(20),
  converted_to_conversation_id UUID,
  status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent','read','replied','converted_to_rfq','converted_to_order','closed')),
  ai_classified_intent VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS communication.voice_call (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  conversation_id UUID REFERENCES communication.conversation(id),
  initiator_user_id UUID NOT NULL REFERENCES identity."user"(id),
  call_type VARCHAR(20) CHECK (call_type IN ('voice','video','screen_share','3way')),
  participants UUID[],
  provider VARCHAR(20) CHECK (provider IN ('twilio','daily','jitsi','agora','livekit','self_webrtc')),
  provider_room_id VARCHAR(120),
  started_at TIMESTAMPTZ, ended_at TIMESTAMPTZ,
  duration_seconds INT,
  recording_url TEXT, transcript_url TEXT,
  ai_summary_i18n JSONB,
  status VARCHAR(20) CHECK (status IN ('ringing','missed','completed','declined','failed'))
);

CREATE TABLE IF NOT EXISTS communication.meeting_schedule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  conversation_id UUID REFERENCES communication.conversation(id),
  organizer_user_id UUID NOT NULL REFERENCES identity."user"(id),
  attendees UUID[],
  meeting_type VARCHAR(20) CHECK (meeting_type IN ('video','in_person_factory','in_person_office','phone','virtual_booth')),
  location_address TEXT,
  video_meeting_url TEXT,
  scheduled_start TIMESTAMPTZ NOT NULL, scheduled_end TIMESTAMPTZ NOT NULL,
  timezone VARCHAR(50),
  agenda_i18n JSONB,
  status VARCHAR(20) DEFAULT 'proposed' CHECK (status IN ('proposed','confirmed','completed','cancelled','rescheduled','no_show')),
  reminder_sent_at TIMESTAMPTZ,
  ical_url TEXT
);
CREATE INDEX IF NOT EXISTS idx_meeting_start ON communication.meeting_schedule (scheduled_start) WHERE status IN ('proposed','confirmed');

CREATE TABLE IF NOT EXISTS communication.quick_reply_template (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID REFERENCES identity.supplier(id),
  name VARCHAR(120),
  content_i18n JSONB,
  category VARCHAR(40),
  usage_count BIGINT DEFAULT 0,
  keywords TEXT[],
  is_global BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS communication.auto_responder_rule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  supplier_id UUID REFERENCES identity.supplier(id),
  trigger_type VARCHAR(30) CHECK (trigger_type IN ('always','business_hours_off','specific_dates','keyword_match','first_message','outside_response_sla')),
  trigger_config_jsonb JSONB,
  response_template_i18n JSONB,
  response_template_id UUID,
  delay_seconds INT DEFAULT 0,
  escalation_after_minutes INT,
  escalation_user_id UUID,
  active BOOLEAN DEFAULT TRUE,
  last_triggered_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS communication.conversation_tag (
  conversation_id UUID NOT NULL REFERENCES communication.conversation(id) ON DELETE CASCADE,
  tag_key VARCHAR(40) NOT NULL,
  applied_by_user_id UUID,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (conversation_id, tag_key)
);

CREATE TABLE IF NOT EXISTS communication.conversation_satisfaction_rating (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  conversation_id UUID NOT NULL UNIQUE REFERENCES communication.conversation(id),
  rated_by_user_id UUID NOT NULL REFERENCES identity."user"(id),
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
  feedback_text_i18n JSONB,
  dimension_quality SMALLINT, dimension_speed SMALLINT, dimension_helpfulness SMALLINT,
  rated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Negotiation entities (3 from R05 R06)
CREATE TABLE IF NOT EXISTS communication.negotiation_thread (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  code VARCHAR(20) NOT NULL UNIQUE,
  buyer_id UUID NOT NULL REFERENCES identity."user"(id),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  rfq_id UUID,
  product_ids UUID[],
  subject_i18n JSONB,
  initial_quantity INT, unit_code VARCHAR(20),
  currency CHAR(3),
  current_round SMALLINT DEFAULT 0,
  max_rounds_allowed SMALLINT DEFAULT 10,
  status VARCHAR(30) DEFAULT 'open' CHECK (status IN ('open','buyer_turn','supplier_turn','accepted','rejected','abandoned','expired','converted_to_order')),
  last_activity_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  accepted_offer_id UUID,
  converted_order_id UUID,
  ai_mediator_enabled BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS communication.negotiation_offer (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  thread_id UUID NOT NULL REFERENCES communication.negotiation_thread(id) ON DELETE CASCADE,
  round_number SMALLINT NOT NULL,
  offered_by VARCHAR(10) CHECK (offered_by IN ('buyer','supplier')),
  offered_by_user_id UUID,
  unit_price_minor BIGINT, quantity INT,
  total_minor BIGINT, currency CHAR(3),
  lead_time_days SMALLINT,
  shipping_terms VARCHAR(10),
  payment_terms_i18n JSONB,
  included_extras_i18n JSONB,
  validity_hours SMALLINT,
  message_i18n JSONB,
  attachment_urls TEXT[],
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','accepted','rejected','superseded','expired','withdrawn')),
  decided_at TIMESTAMPTZ, decided_by_user_id UUID,
  ai_assessment_jsonb JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (thread_id, round_number)
);
CREATE INDEX IF NOT EXISTS idx_offer_thread ON communication.negotiation_offer (thread_id, round_number DESC);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='communication' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='communication' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE communication.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON communication.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON communication.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('20_communication.sql', 'Communication: 15 tables (conversation, message, voice, meeting, negotiation)');
