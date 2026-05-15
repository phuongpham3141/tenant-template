-- Migration 17: Notification Event Bus (Domain 36)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS notification.notification_event_type_master (
  event_type_code VARCHAR(80) PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name_i18n JSONB, description_i18n JSONB,
  default_severity VARCHAR(10) DEFAULT 'info',
  default_channels TEXT[] DEFAULT '{email,in_app}',
  default_template_id UUID,
  dedup_strategy VARCHAR(20) DEFAULT 'none' CHECK (dedup_strategy IN ('none','content_hash','window_1h','window_24h','user_event_unique')),
  throttle_per_user_per_day INT,
  batch_eligible BOOLEAN DEFAULT FALSE,
  retention_days INT DEFAULT 90,
  category VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS notification.notification_event (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  emitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  event_type_code VARCHAR(80) NOT NULL REFERENCES notification.notification_event_type_master(event_type_code),
  source_entity_type VARCHAR(40),
  source_entity_id UUID,
  target_user_ids UUID[] NOT NULL DEFAULT '{}',
  context_payload_jsonb JSONB DEFAULT '{}',
  priority INT DEFAULT 100,
  scheduled_for TIMESTAMPTZ,
  dedup_hash CHAR(64),
  dedup_window_until TIMESTAMPTZ,
  batch_eligible BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued','processing','delivered','failed','deduped','throttled'))
);
CREATE INDEX IF NOT EXISTS idx_notif_event_brin ON notification.notification_event USING BRIN (emitted_at);
CREATE INDEX IF NOT EXISTS idx_notif_event_dedup ON notification.notification_event (dedup_hash) WHERE dedup_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_notif_event_pending ON notification.notification_event (priority, scheduled_for) WHERE status = 'queued';

CREATE TABLE IF NOT EXISTS notification.notification_subscription_rule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  subscriber_type VARCHAR(20) CHECK (subscriber_type IN ('user','role','tenant_admin','webhook')),
  subscriber_id UUID,
  event_pattern VARCHAR(120) NOT NULL,
  filters_jsonb JSONB,
  channels_override TEXT[],
  frequency_override VARCHAR(20),
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS notification.notification_delivery_attempt (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  event_id UUID NOT NULL REFERENCES notification.notification_event(id) ON DELETE CASCADE,
  recipient_user_id UUID,
  channel VARCHAR(20) NOT NULL,
  attempt_number INT DEFAULT 1,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued','sending','delivered','bounced','failed','throttled','deduped','user_unsubscribed')),
  provider_id VARCHAR(40),
  provider_message_id VARCHAR(120),
  error_message TEXT,
  retry_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_delivery_event ON notification.notification_delivery_attempt (event_id);
CREATE INDEX IF NOT EXISTS idx_delivery_retry ON notification.notification_delivery_attempt (retry_at) WHERE status = 'failed' AND retry_at IS NOT NULL;

CREATE TABLE IF NOT EXISTS notification.notification_dedup_record (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  dedup_hash CHAR(64) NOT NULL,
  original_event_id UUID NOT NULL,
  suppressed_event_ids UUID[] DEFAULT '{}',
  window_started_at TIMESTAMPTZ,
  window_expires_at TIMESTAMPTZ,
  suppressed_count INT DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_dedup_hash ON notification.notification_dedup_record (dedup_hash, window_expires_at);

CREATE TABLE IF NOT EXISTS notification.notification_throttle_state (
  user_id UUID NOT NULL,
  channel VARCHAR(20) NOT NULL,
  period_start TIMESTAMPTZ NOT NULL,
  counter INT NOT NULL DEFAULT 0,
  "limit" INT NOT NULL,
  last_throttled_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, channel, period_start)
);

CREATE TABLE IF NOT EXISTS notification.notification_batch (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  recipient_user_id UUID NOT NULL,
  channel VARCHAR(20),
  frequency VARCHAR(20) CHECK (frequency IN ('daily_digest','weekly_digest')),
  included_event_ids UUID[] NOT NULL DEFAULT '{}',
  scheduled_send_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS notification.notification_dead_letter_queue (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  original_event_id UUID,
  original_delivery_attempt_id UUID,
  failure_reason TEXT,
  failure_count INT,
  last_attempted_at TIMESTAMPTZ,
  retry_eligible BOOLEAN DEFAULT TRUE,
  moved_to_dlq_at TIMESTAMPTZ DEFAULT NOW(),
  replayed_at TIMESTAMPTZ,
  replayed_by_user_id UUID,
  abandoned_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS notification.notification_template_per_channel (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  event_type_code VARCHAR(80) NOT NULL,
  channel VARCHAR(20) NOT NULL,
  locale CHAR(2) NOT NULL,
  subject_template TEXT, body_template TEXT,
  variable_schema_jsonb JSONB,
  character_limit INT,
  media_attachments TEXT[] DEFAULT '{}',
  approved_by_admin BOOLEAN DEFAULT FALSE,
  version INT DEFAULT 1,
  active BOOLEAN DEFAULT TRUE,
  UNIQUE (event_type_code, channel, locale, version)
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='notification' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='notification' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE notification.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON notification.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON notification.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('17_notification_bus.sql', 'Notification Event Bus: 9 tables');
