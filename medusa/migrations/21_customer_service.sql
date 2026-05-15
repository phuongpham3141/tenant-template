-- Migration 21: Customer Service Cases (Domain 19)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS support.support_ticket_category (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  code VARCHAR(60) NOT NULL UNIQUE,
  name_i18n JSONB,
  parent_category_id UUID REFERENCES support.support_ticket_category(id),
  default_team_id UUID,
  default_sla_hours INT,
  auto_response_template_id UUID,
  ai_classification_keywords TEXT[]
);

CREATE TABLE IF NOT EXISTS support.support_team (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  code VARCHAR(40) NOT NULL,
  name VARCHAR(120),
  agent_user_ids UUID[],
  specialization VARCHAR(40),
  business_hours_jsonb JSONB,
  timezone VARCHAR(50),
  language_supported TEXT[] DEFAULT '{}',
  max_concurrent_tickets_per_agent INT,
  UNIQUE (tenant_id, code)
);

CREATE TABLE IF NOT EXISTS support.support_ticket (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  code VARCHAR(20) NOT NULL UNIQUE,
  opened_by_user_id UUID NOT NULL REFERENCES identity."user"(id),
  channel VARCHAR(20) CHECK (channel IN ('email','chat','phone','web_form','in_app','api')),
  category_id UUID REFERENCES support.support_ticket_category(id),
  subject_i18n JSONB,
  priority VARCHAR(10) DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent','p0')),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new','open','pending_customer','pending_internal','resolved','closed','reopened')),
  related_order_id UUID, related_supplier_id UUID,
  assigned_agent_user_id UUID,
  assigned_team_id UUID REFERENCES support.support_team(id),
  sla_first_response_at TIMESTAMPTZ,
  sla_resolution_at TIMESTAMPTZ,
  first_response_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  satisfaction_rating SMALLINT,
  satisfaction_comment TEXT,
  escalation_count INT DEFAULT 0,
  tags TEXT[] DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS idx_ticket_opener ON support.support_ticket (opened_by_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ticket_status ON support.support_ticket (tenant_id, status, priority);
CREATE INDEX IF NOT EXISTS idx_ticket_agent ON support.support_ticket (assigned_agent_user_id) WHERE status NOT IN ('resolved','closed');

CREATE TABLE IF NOT EXISTS support.support_ticket_message (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  ticket_id UUID NOT NULL REFERENCES support.support_ticket(id) ON DELETE CASCADE,
  sender_user_id UUID NOT NULL REFERENCES identity."user"(id),
  sender_type VARCHAR(20) CHECK (sender_type IN ('customer','agent','system','ai_bot')),
  body_i18n JSONB,
  body_html TEXT,
  attachments_jsonb JSONB,
  is_internal_note BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ, read_at TIMESTAMPTZ,
  ai_suggested_response TEXT
);
CREATE INDEX IF NOT EXISTS idx_ticket_msg_ticket ON support.support_ticket_message (ticket_id, sent_at DESC);

CREATE TABLE IF NOT EXISTS support.support_canned_response (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  team_id UUID REFERENCES support.support_team(id),
  is_global BOOLEAN DEFAULT FALSE,
  name VARCHAR(120),
  content_template_i18n JSONB,
  variables JSONB,
  usage_count BIGINT DEFAULT 0,
  success_rate NUMERIC(5,4)
);

CREATE TABLE IF NOT EXISTS support.support_sla_breach_event (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  ticket_id UUID NOT NULL REFERENCES support.support_ticket(id),
  sla_type VARCHAR(30),
  breached_at TIMESTAMPTZ DEFAULT NOW(),
  escalated_to_user_id UUID,
  notification_sent BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS support.support_macro (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  name VARCHAR(120),
  actions_jsonb JSONB,
  usage_count BIGINT DEFAULT 0
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='support' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='support' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE support.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON support.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON support.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('21_customer_service.sql', 'Customer Service: 7 tables');
