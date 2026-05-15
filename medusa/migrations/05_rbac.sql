-- ============================================================================
-- Cybersilkroads — Migration 05: RBAC Permission System (Domain 31)
-- ============================================================================
-- Tables: 11 (permission_master, role_master, role_permission_grant,
--             user_role_assignment, resource_specific_permission,
--             permission_inheritance_chain, permission_audit_log,
--             access_review_campaign, access_review_decision,
--             delegation_record, break_glass_access)
-- Depends on: 04_auth_security.sql
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- rbac.permission_master — All ~220 permission keys
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.permission_master (
  permission_key         VARCHAR(120) PRIMARY KEY
                          CHECK (permission_key ~ '^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$'),
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  category               VARCHAR(40) NOT NULL CHECK (category IN (
    'order','catalog','supplier','user','buyer','admin',
    'payment','escrow','payout','billing',
    'rfq','negotiation','dispute','returns',
    'kyc','gdpr','audit','rbac',
    'ads','email','live','ai','media','site_builder',
    'fulfillment','inventory','customs','tax',
    'communication','support','notification',
    'tenant','api','system'
  )),
  description_i18n       JSONB NOT NULL DEFAULT '{}',
  requires_mfa_to_grant  BOOLEAN NOT NULL DEFAULT FALSE,
  is_dangerous           BOOLEAN NOT NULL DEFAULT FALSE,
  audit_log_required     BOOLEAN NOT NULL DEFAULT TRUE,
  default_assigned_to_roles TEXT[] NOT NULL DEFAULT '{}',
  parent_permission_key  VARCHAR(120),                                    -- For wildcard grouping (e.g., order.*)
  is_wildcard            BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_permission_category ON rbac.permission_master (category);
CREATE INDEX IF NOT EXISTS idx_permission_dangerous ON rbac.permission_master (permission_key) WHERE is_dangerous;

COMMENT ON TABLE rbac.permission_master IS 'Master registry of all ~220 permission keys (loaded from seed file)';

-- ----------------------------------------------------------------------------
-- rbac.role_master — Roles (system + custom)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.role_master (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  role_code              VARCHAR(60) NOT NULL,
  name_i18n              JSONB NOT NULL,
  description_i18n       JSONB,

  scope                  VARCHAR(20) NOT NULL CHECK (scope IN ('platform','tenant','supplier','department')),
  is_system              BOOLEAN NOT NULL DEFAULT FALSE,                  -- Locked, can't be modified
  is_custom              BOOLEAN NOT NULL DEFAULT FALSE,
  parent_role_id         UUID REFERENCES rbac.role_master(id) ON DELETE SET NULL,
  max_assignees          INT,                                             -- Cap on user count

  created_by_user_id     UUID REFERENCES identity."user"(id),

  UNIQUE (tenant_id, role_code)
);

CREATE INDEX IF NOT EXISTS idx_role_master_tenant ON rbac.role_master (tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_role_master_scope ON rbac.role_master (tenant_id, scope) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_role_master_parent ON rbac.role_master (parent_role_id) WHERE parent_role_id IS NOT NULL;

-- ----------------------------------------------------------------------------
-- rbac.role_permission_grant — Permissions granted to roles
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.role_permission_grant (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  role_id                UUID NOT NULL REFERENCES rbac.role_master(id) ON DELETE CASCADE,
  permission_key         VARCHAR(120) NOT NULL REFERENCES rbac.permission_master(permission_key) ON DELETE CASCADE,
  granted_with_constraints JSONB NOT NULL DEFAULT '{}',                   -- e.g., {max_amount_usd:10000, allowed_categories:["A","B"]}
  conditional_predicate_dsl TEXT,                                         -- CEL expression evaluated at runtime
  granted_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  granted_by_user_id     UUID REFERENCES identity."user"(id),
  expires_at             TIMESTAMPTZ,                                     -- Optional time-bound

  UNIQUE (role_id, permission_key)
);

CREATE INDEX IF NOT EXISTS idx_role_perm_role ON rbac.role_permission_grant (role_id);
CREATE INDEX IF NOT EXISTS idx_role_perm_permission ON rbac.role_permission_grant (permission_key);
CREATE INDEX IF NOT EXISTS idx_role_perm_expiring ON rbac.role_permission_grant (expires_at) WHERE expires_at IS NOT NULL;

-- ----------------------------------------------------------------------------
-- rbac.user_role_assignment — Assign user to role
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.user_role_assignment (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  role_id                UUID NOT NULL REFERENCES rbac.role_master(id) ON DELETE CASCADE,
  scope_type             VARCHAR(20) NOT NULL DEFAULT 'global'
                          CHECK (scope_type IN ('global','tenant','supplier','department','order','category')),
  scope_id               UUID,                                            -- e.g., supplier_id if scope=supplier
  assigned_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  assigned_by_user_id    UUID REFERENCES identity."user"(id),
  expires_at             TIMESTAMPTZ,
  reason                 TEXT,
  status                 VARCHAR(20) NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active','suspended','expired','revoked','pending_approval')),
  revoked_at             TIMESTAMPTZ,
  revoked_by_user_id     UUID REFERENCES identity."user"(id),
  revoked_reason         TEXT,
  approval_required      BOOLEAN NOT NULL DEFAULT FALSE,
  approved_by_user_id    UUID REFERENCES identity."user"(id),
  approved_at            TIMESTAMPTZ,

  UNIQUE (user_id, role_id, scope_type, scope_id)
);

CREATE INDEX IF NOT EXISTS idx_user_role_user ON rbac.user_role_assignment (user_id) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_user_role_role ON rbac.user_role_assignment (role_id) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_user_role_scope ON rbac.user_role_assignment (scope_type, scope_id) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_user_role_expiring ON rbac.user_role_assignment (expires_at) WHERE expires_at IS NOT NULL AND status = 'active';

-- ----------------------------------------------------------------------------
-- rbac.resource_specific_permission — Per-resource permission grant
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.resource_specific_permission (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Subject: who has the permission
  subject_type           VARCHAR(10) NOT NULL CHECK (subject_type IN ('user','role')),
  user_id                UUID REFERENCES identity."user"(id) ON DELETE CASCADE,
  role_id                UUID REFERENCES rbac.role_master(id) ON DELETE CASCADE,

  -- Resource: what they have permission on
  resource_type          VARCHAR(40) NOT NULL,                            -- 'order' | 'supplier' | 'product' | ...
  resource_id            UUID NOT NULL,

  permission_key         VARCHAR(120) NOT NULL REFERENCES rbac.permission_master(permission_key),
  granted_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  granted_by_user_id     UUID REFERENCES identity."user"(id),
  expires_at             TIMESTAMPTZ,
  grant_reason           TEXT,

  CHECK ((subject_type = 'user' AND user_id IS NOT NULL AND role_id IS NULL) OR
         (subject_type = 'role' AND role_id IS NOT NULL AND user_id IS NULL))
);

CREATE INDEX IF NOT EXISTS idx_resource_perm_user ON rbac.resource_specific_permission (user_id, resource_type, resource_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_resource_perm_role ON rbac.resource_specific_permission (role_id, resource_type, resource_id) WHERE role_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_resource_perm_resource ON rbac.resource_specific_permission (resource_type, resource_id);

-- ----------------------------------------------------------------------------
-- rbac.permission_inheritance_chain — Role inheritance graph
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.permission_inheritance_chain (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  child_role_id          UUID NOT NULL REFERENCES rbac.role_master(id) ON DELETE CASCADE,
  parent_role_id         UUID NOT NULL REFERENCES rbac.role_master(id) ON DELETE CASCADE,
  inheritance_type       VARCHAR(20) NOT NULL CHECK (inheritance_type IN ('full','partial','override')),
  excluded_permissions   TEXT[],                                          -- If partial, exclude these
  position               SMALLINT NOT NULL DEFAULT 1,

  CHECK (child_role_id != parent_role_id),
  UNIQUE (child_role_id, parent_role_id)
);

CREATE INDEX IF NOT EXISTS idx_inherit_child ON rbac.permission_inheritance_chain (child_role_id);
CREATE INDEX IF NOT EXISTS idx_inherit_parent ON rbac.permission_inheritance_chain (parent_role_id);

-- ----------------------------------------------------------------------------
-- rbac.permission_audit_log — Sample of permission checks (high-volume → ClickHouse)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.permission_audit_log (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL,
  occurred_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id                UUID NOT NULL,
  permission_key         VARCHAR(120) NOT NULL,
  resource_type          VARCHAR(40),
  resource_id            UUID,
  granted                BOOLEAN NOT NULL,
  decision_reason        VARCHAR(60) CHECK (decision_reason IN
    ('matched_role','explicit_resource','inherited','wildcard_grant',
     'denied_no_role','denied_constraint','denied_expired','denied_revoked',
     'denied_subject_mismatch','denied_predicate_failed','admin_override','break_glass')),
  evaluation_ms          INT,
  context_jsonb          JSONB
);

CREATE INDEX IF NOT EXISTS idx_perm_audit_brin ON rbac.permission_audit_log USING BRIN (occurred_at);
CREATE INDEX IF NOT EXISTS idx_perm_audit_user ON rbac.permission_audit_log (user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_perm_audit_denied ON rbac.permission_audit_log (user_id, permission_key, occurred_at DESC) WHERE NOT granted;

COMMENT ON TABLE rbac.permission_audit_log IS 'Sample of permission evaluations. High-volume → replicate to ClickHouse.';

-- ----------------------------------------------------------------------------
-- rbac.access_review_campaign — Periodic access reviews (SOC 2)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.access_review_campaign (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  campaign_code          VARCHAR(60) NOT NULL,
  name_i18n              JSONB NOT NULL,
  scope_jsonb            JSONB NOT NULL,                                  -- {roles:[...], users:[...], permissions:[...]}
  reviewer_user_ids      UUID[] NOT NULL,
  started_at             TIMESTAMPTZ,
  deadline               TIMESTAMPTZ NOT NULL,
  status                 VARCHAR(20) NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft','in_progress','completed','cancelled','overdue')),
  completed_at           TIMESTAMPTZ,
  summary_jsonb          JSONB,                                           -- {retained, revoked, modified}
  next_campaign_id       UUID REFERENCES rbac.access_review_campaign(id),

  UNIQUE (tenant_id, campaign_code)
);

CREATE INDEX IF NOT EXISTS idx_access_review_status ON rbac.access_review_campaign (status, deadline);

-- ----------------------------------------------------------------------------
-- rbac.access_review_decision — Per user-role review decision
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.access_review_decision (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  campaign_id            UUID NOT NULL REFERENCES rbac.access_review_campaign(id) ON DELETE CASCADE,
  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  role_id                UUID NOT NULL REFERENCES rbac.role_master(id) ON DELETE CASCADE,
  reviewer_user_id       UUID NOT NULL REFERENCES identity."user"(id),
  decision               VARCHAR(20) NOT NULL CHECK (decision IN ('retain','revoke','modify','escalate','pending')),
  modification_jsonb     JSONB,
  comment                TEXT,
  decided_at             TIMESTAMPTZ,

  UNIQUE (campaign_id, user_id, role_id)
);

CREATE INDEX IF NOT EXISTS idx_access_decision_campaign ON rbac.access_review_decision (campaign_id, decision);
CREATE INDEX IF NOT EXISTS idx_access_decision_reviewer ON rbac.access_review_decision (reviewer_user_id);

-- ----------------------------------------------------------------------------
-- rbac.delegation_record — Temporary permission delegation (vacation handoff)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.delegation_record (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  delegator_user_id      UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  delegate_user_id       UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  delegated_permissions  TEXT[] NOT NULL DEFAULT '{}',
  delegated_role_ids     UUID[] NOT NULL DEFAULT '{}',
  scope_constraints      JSONB NOT NULL DEFAULT '{}',
  starts_at              TIMESTAMPTZ NOT NULL,
  ends_at                TIMESTAMPTZ NOT NULL,
  revocable              BOOLEAN NOT NULL DEFAULT TRUE,
  revoked_at             TIMESTAMPTZ,
  revoked_by_user_id     UUID REFERENCES identity."user"(id),
  reason                 TEXT,
  audit_event_id         UUID,                                            -- FK to audit_event (created later)

  CHECK (delegator_user_id != delegate_user_id),
  CHECK (ends_at > starts_at)
);

CREATE INDEX IF NOT EXISTS idx_delegation_delegator ON rbac.delegation_record (delegator_user_id, starts_at DESC);
CREATE INDEX IF NOT EXISTS idx_delegation_delegate ON rbac.delegation_record (delegate_user_id, ends_at) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_delegation_active ON rbac.delegation_record (starts_at, ends_at) WHERE revoked_at IS NULL;

-- ----------------------------------------------------------------------------
-- rbac.break_glass_access — Emergency elevation
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rbac.break_glass_access (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  requested_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  justification          TEXT NOT NULL,
  approval_workflow_id   UUID,                                            -- Multi-approver workflow
  approvals_jsonb        JSONB NOT NULL DEFAULT '[]',                     -- [{user_id, approved_at, comment}]
  granted_until          TIMESTAMPTZ,
  used_actions_audit_event_ids UUID[] DEFAULT '{}',
  post_incident_review_required BOOLEAN NOT NULL DEFAULT TRUE,
  reviewed_at            TIMESTAMPTZ,
  reviewed_by_user_id    UUID REFERENCES identity."user"(id),
  review_outcome         VARCHAR(20) CHECK (review_outcome IN ('justified','overreach','policy_violation','retraining_required'))
);

CREATE INDEX IF NOT EXISTS idx_break_glass_user ON rbac.break_glass_access (user_id, requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_break_glass_unreviewed ON rbac.break_glass_access (requested_at DESC) WHERE post_incident_review_required AND reviewed_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_break_glass_active ON rbac.break_glass_access (granted_until) WHERE granted_until IS NOT NULL AND reviewed_at IS NULL;

-- ----------------------------------------------------------------------------
-- Redefine has_permission() with real logic
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.has_permission(
  p_user_id UUID,
  p_permission_key VARCHAR
) RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
AS $hp$
DECLARE
  v_tenant TEXT;
  v_has BOOLEAN;
BEGIN
  IF p_user_id IS NULL THEN
    RETURN FALSE;
  END IF;

  v_tenant := public.current_tenant_id();

  -- Check direct role grants via user_role_assignment → role_permission_grant
  SELECT EXISTS (
    SELECT 1
    FROM rbac.user_role_assignment ura
    JOIN rbac.role_permission_grant rpg ON rpg.role_id = ura.role_id
    WHERE ura.user_id = p_user_id
      AND ura.tenant_id = v_tenant
      AND ura.status = 'active'
      AND (ura.expires_at IS NULL OR ura.expires_at > NOW())
      AND rpg.permission_key IN (p_permission_key, split_part(p_permission_key, '.', 1) || '.*', '*')
      AND (rpg.expires_at IS NULL OR rpg.expires_at > NOW())
  ) INTO v_has;

  IF v_has THEN RETURN TRUE; END IF;

  -- Check inherited roles
  SELECT EXISTS (
    SELECT 1
    FROM rbac.user_role_assignment ura
    JOIN rbac.permission_inheritance_chain pic ON pic.child_role_id = ura.role_id
    JOIN rbac.role_permission_grant rpg ON rpg.role_id = pic.parent_role_id
    WHERE ura.user_id = p_user_id
      AND ura.tenant_id = v_tenant
      AND ura.status = 'active'
      AND rpg.permission_key = p_permission_key
      AND NOT (rpg.permission_key = ANY(COALESCE(pic.excluded_permissions, '{}')))
  ) INTO v_has;

  IF v_has THEN RETURN TRUE; END IF;

  -- Check delegated permissions
  SELECT EXISTS (
    SELECT 1
    FROM rbac.delegation_record dr
    WHERE dr.delegate_user_id = p_user_id
      AND dr.tenant_id = v_tenant
      AND dr.starts_at <= NOW()
      AND dr.ends_at > NOW()
      AND dr.revoked_at IS NULL
      AND p_permission_key = ANY(dr.delegated_permissions)
  ) INTO v_has;

  IF v_has THEN RETURN TRUE; END IF;

  -- Check break-glass
  SELECT EXISTS (
    SELECT 1
    FROM rbac.break_glass_access bg
    WHERE bg.user_id = p_user_id
      AND bg.tenant_id = v_tenant
      AND bg.granted_until > NOW()
  ) INTO v_has;

  RETURN COALESCE(v_has, FALSE);
END;
$hp$;

COMMENT ON FUNCTION public.has_permission(UUID, VARCHAR) IS
  'Check if user has permission. Evaluates: direct grants, inherited grants, delegations, break-glass.';

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------

CREATE TRIGGER trg_permission_master_updated_at BEFORE UPDATE ON rbac.permission_master
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_role_master_updated_at BEFORE UPDATE ON rbac.role_master
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_role_perm_grant_updated_at BEFORE UPDATE ON rbac.role_permission_grant
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_user_role_assignment_updated_at BEFORE UPDATE ON rbac.user_role_assignment
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_access_review_updated_at BEFORE UPDATE ON rbac.access_review_campaign
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- RLS policies
-- ----------------------------------------------------------------------------

DO $rls$
DECLARE
  t TEXT;
  tables_with_tenant TEXT[] := ARRAY[
    'role_master','role_permission_grant','user_role_assignment',
    'resource_specific_permission','permission_inheritance_chain',
    'permission_audit_log','access_review_campaign','access_review_decision',
    'delegation_record','break_glass_access'
  ];
BEGIN
  FOREACH t IN ARRAY tables_with_tenant LOOP
    EXECUTE format('ALTER TABLE rbac.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON rbac.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
      t
    );
  END LOOP;
END $rls$;

-- permission_master is global (no tenant_id) — readable by all, writable by admin
GRANT SELECT ON rbac.permission_master TO csr_app, csr_readonly;

INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('05_rbac.sql', 'RBAC: 11 tables + has_permission() function redefined with real logic');

-- ============================================================================
-- END 05_rbac.sql — 11 tables, 26 indexes, 5 triggers, 10 RLS policies
-- ============================================================================
