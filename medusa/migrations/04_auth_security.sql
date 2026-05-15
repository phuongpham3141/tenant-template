-- ============================================================================
-- Cybersilkroads — Migration 04: Identity, Auth & Security (Domain 30)
-- ============================================================================
-- Tables: 15 (auth_session, auth_session_device, auth_token_blacklist,
--             auth_refresh_token, auth_password_reset_token,
--             auth_email_verification_token, mfa_device, mfa_recovery_code,
--             mfa_challenge, login_attempt_log, security_event_log,
--             suspicious_activity_alert, oauth_state_token,
--             account_lockout_record, passkey_credential)
-- Depends on: 03_identity.sql
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- auth.auth_session — Active login sessions
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.auth_session (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  session_token_hash     CHAR(64) NOT NULL UNIQUE,                       -- SHA-256 of session token

  started_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_activity_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at             TIMESTAMPTZ NOT NULL,

  ip_address             INET NOT NULL,
  user_agent_parsed      JSONB DEFAULT '{}',                              -- {browser, os, device, version}
  device_fingerprint_id  UUID,                                            -- FK device_fingerprint (created later)
  geo_country            CHAR(2),
  geo_city               VARCHAR(120),

  login_method           VARCHAR(30) NOT NULL CHECK (login_method IN
    ('password','otp_email','otp_sms','oauth_google','oauth_facebook','oauth_apple',
     'sso_saml','sso_oidc','passkey','magic_link','impersonation')),
  trust_level            VARCHAR(20) NOT NULL DEFAULT 'untrusted'
                          CHECK (trust_level IN ('untrusted','trusted_device','elevated','admin')),

  terminated_at          TIMESTAMPTZ,
  terminated_reason      VARCHAR(40) CHECK (terminated_reason IN
    ('logout','timeout','security','admin_revoke','password_change',
     'new_login_elsewhere','mfa_required','impossible_travel','user_deleted'))
);

CREATE INDEX IF NOT EXISTS idx_auth_session_user ON auth.auth_session (user_id, started_at DESC) WHERE terminated_at IS NULL;
-- NOW() not allowed in partial index predicate. Use covering index instead.
CREATE INDEX IF NOT EXISTS idx_auth_session_active ON auth.auth_session (user_id, expires_at) WHERE terminated_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_auth_session_expires ON auth.auth_session (expires_at) WHERE terminated_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_auth_session_ip ON auth.auth_session (ip_address, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_auth_session_tenant ON auth.auth_session (tenant_id);

COMMENT ON TABLE auth.auth_session IS 'Active login sessions (mirror in Redis for fast read)';

-- ----------------------------------------------------------------------------
-- auth.auth_session_device — Remembered/trusted device per user
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.auth_session_device (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  device_fingerprint_id  UUID NOT NULL,                                   -- FK created later
  device_label           VARCHAR(120),                                    -- User-named: "iPhone phòng làm việc"
  first_seen_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  trusted_until          TIMESTAMPTZ,
  trusted_by_action      VARCHAR(30) CHECK (trusted_by_action IN
    ('mfa_verified','admin_approved','passkey_registered','recovery_used')),
  revoked_at             TIMESTAMPTZ,
  revoked_reason         TEXT,

  UNIQUE (user_id, device_fingerprint_id)
);

CREATE INDEX IF NOT EXISTS idx_session_device_user ON auth.auth_session_device (user_id) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_session_device_trusted ON auth.auth_session_device (user_id, trusted_until) WHERE revoked_at IS NULL AND trusted_until IS NOT NULL;

-- ----------------------------------------------------------------------------
-- auth.auth_token_blacklist — Revoked JWT/access tokens (deny list)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.auth_token_blacklist (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  token_jti              VARCHAR(64) NOT NULL UNIQUE,                     -- JWT ID claim
  token_type             VARCHAR(20) NOT NULL CHECK (token_type IN ('access','refresh','api','reset','verify')),
  user_id                UUID REFERENCES identity."user"(id) ON DELETE CASCADE,
  revoked_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_reason         VARCHAR(40),
  revoked_by_user_id     UUID REFERENCES identity."user"(id),
  expires_at             TIMESTAMPTZ NOT NULL                              -- Auto-cleanup after expire
);

CREATE INDEX IF NOT EXISTS idx_token_blacklist_jti ON auth.auth_token_blacklist (token_jti);
CREATE INDEX IF NOT EXISTS idx_token_blacklist_expires ON auth.auth_token_blacklist (expires_at);
CREATE INDEX IF NOT EXISTS idx_token_blacklist_user ON auth.auth_token_blacklist (user_id, revoked_at DESC);

-- ----------------------------------------------------------------------------
-- auth.auth_refresh_token — Refresh tokens (rotation)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.auth_refresh_token (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  token_hash             CHAR(64) NOT NULL UNIQUE,
  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  session_id             UUID REFERENCES auth.auth_session(id) ON DELETE CASCADE,

  issued_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at             TIMESTAMPTZ NOT NULL,
  used_at                TIMESTAMPTZ,                                     -- Single-use enforcement
  replaced_by_token_id   UUID REFERENCES auth.auth_refresh_token(id),
  replaced_at            TIMESTAMPTZ,
  revoked                BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_refresh_token_user ON auth.auth_refresh_token (user_id) WHERE NOT revoked AND used_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_refresh_token_session ON auth.auth_refresh_token (session_id);
CREATE INDEX IF NOT EXISTS idx_refresh_token_expires ON auth.auth_refresh_token (expires_at);

-- ----------------------------------------------------------------------------
-- auth.auth_password_reset_token
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.auth_password_reset_token (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  token_hash             CHAR(64) NOT NULL UNIQUE,
  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  requested_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at             TIMESTAMPTZ NOT NULL,
  requesting_ip          INET,
  requesting_user_agent  TEXT,
  used_at                TIMESTAMPTZ,
  completed_password_change BOOLEAN NOT NULL DEFAULT FALSE,
  failed_attempts_count  INT NOT NULL DEFAULT 0,
  max_attempts           INT NOT NULL DEFAULT 5
);

CREATE INDEX IF NOT EXISTS idx_pwd_reset_user ON auth.auth_password_reset_token (user_id, requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_pwd_reset_expires ON auth.auth_password_reset_token (expires_at) WHERE used_at IS NULL;

-- ----------------------------------------------------------------------------
-- auth.auth_email_verification_token
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.auth_email_verification_token (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  token_hash             CHAR(64),                                        -- For link verification
  code_otp_6_digit       CHAR(6),                                         -- For OTP entry
  target_email           VARCHAR(255) NOT NULL,
  user_id                UUID REFERENCES identity."user"(id) ON DELETE CASCADE,
  purpose                VARCHAR(30) NOT NULL CHECK (purpose IN ('signup','change_email','reverify','password_recovery')),
  expires_at             TIMESTAMPTZ NOT NULL,
  used_at                TIMESTAMPTZ,
  failed_attempts_count  INT NOT NULL DEFAULT 0,
  max_attempts           INT NOT NULL DEFAULT 5,
  ip_address             INET,

  CHECK (token_hash IS NOT NULL OR code_otp_6_digit IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_email_verify_email ON auth.auth_email_verification_token (target_email, expires_at) WHERE used_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_email_verify_user ON auth.auth_email_verification_token (user_id) WHERE used_at IS NULL;

-- ----------------------------------------------------------------------------
-- auth.mfa_device — MFA enrolled devices
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.mfa_device (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  method                 VARCHAR(30) NOT NULL CHECK (method IN
    ('totp','sms','email','push','backup_codes','webauthn_passkey','hardware_key','yubikey')),
  label                  VARCHAR(120),
  secret_encrypted       TEXT,                                            -- TOTP shared secret (encrypted)
  phone_number           VARCHAR(30),                                     -- For SMS
  public_key             TEXT,                                            -- For passkey
  device_aaguid          UUID,                                            -- Passkey authenticator ID

  enrolled_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at           TIMESTAMPTZ,
  use_count              INT NOT NULL DEFAULT 0,
  is_primary             BOOLEAN NOT NULL DEFAULT FALSE,
  status                 VARCHAR(20) NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active','disabled','lost','revoked'))
);

CREATE INDEX IF NOT EXISTS idx_mfa_device_user ON auth.mfa_device (user_id, method) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_mfa_device_primary ON auth.mfa_device (user_id) WHERE is_primary = TRUE AND status = 'active';

-- ----------------------------------------------------------------------------
-- auth.mfa_recovery_code — Backup codes (10 per user, single-use)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.mfa_recovery_code (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  code_hash              CHAR(64) NOT NULL,
  used_at                TIMESTAMPTZ,
  generated_batch_at     TIMESTAMPTZ NOT NULL,

  UNIQUE (user_id, code_hash)
);

CREATE INDEX IF NOT EXISTS idx_mfa_recovery_user ON auth.mfa_recovery_code (user_id) WHERE used_at IS NULL;

-- ----------------------------------------------------------------------------
-- auth.mfa_challenge — Active MFA challenges
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.mfa_challenge (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  session_id             UUID REFERENCES auth.auth_session(id) ON DELETE CASCADE,
  method                 VARCHAR(30) NOT NULL,
  code_hash              CHAR(64),
  challenge_payload      JSONB,                                            -- For WebAuthn challenge
  expires_at             TIMESTAMPTZ NOT NULL,
  attempted_count        INT NOT NULL DEFAULT 0,
  max_attempts           INT NOT NULL DEFAULT 5,
  succeeded_at           TIMESTAMPTZ,
  failed_at              TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_mfa_challenge_user ON auth.mfa_challenge (user_id, expires_at);
CREATE INDEX IF NOT EXISTS idx_mfa_challenge_expires ON auth.mfa_challenge (expires_at) WHERE succeeded_at IS NULL AND failed_at IS NULL;

-- ----------------------------------------------------------------------------
-- auth.login_attempt_log — All login attempts (success+fail)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.login_attempt_log (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr',
  attempted_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  email_or_username      VARCHAR(255) NOT NULL,
  user_id                UUID REFERENCES identity."user"(id) ON DELETE SET NULL,
  ip_address             INET,
  country_code           CHAR(2),
  device_fingerprint_id  UUID,
  user_agent             TEXT,

  succeeded              BOOLEAN NOT NULL,
  failure_reason         VARCHAR(40) CHECK (failure_reason IN
    ('invalid_password','account_not_found','account_locked','account_suspended',
     'mfa_required','mfa_failed','blacklisted','rate_limited','captcha_failed',
     'breached_password','geo_blocked','session_hijack_suspected') OR succeeded = TRUE),

  captcha_required       BOOLEAN NOT NULL DEFAULT FALSE,
  captcha_passed         BOOLEAN,
  risk_score             INT CHECK (risk_score BETWEEN 0 AND 100)
);

-- This table is high-volume → eventually moves to ClickHouse
-- For now in PG with BRIN index for time-range scans
CREATE INDEX IF NOT EXISTS idx_login_attempt_time_brin ON auth.login_attempt_log USING BRIN (attempted_at);
CREATE INDEX IF NOT EXISTS idx_login_attempt_email ON auth.login_attempt_log (email_or_username, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempt_user ON auth.login_attempt_log (user_id, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempt_ip ON auth.login_attempt_log (ip_address, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempt_failed ON auth.login_attempt_log (email_or_username, attempted_at DESC) WHERE NOT succeeded;

COMMENT ON TABLE auth.login_attempt_log IS 'All login attempts (success+fail). Replicate to ClickHouse for long-term analysis.';

-- ----------------------------------------------------------------------------
-- auth.security_event_log — Security-related events
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.security_event_log (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  occurred_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  event_type             VARCHAR(50) NOT NULL CHECK (event_type IN (
    'password_changed','password_reset','email_changed','phone_changed',
    'mfa_enabled','mfa_disabled','mfa_method_added','mfa_method_removed',
    'api_key_created','api_key_revoked',
    'permission_elevated','permission_revoked','role_changed',
    'suspicious_login','impossible_travel_detected','account_locked','account_unlocked',
    'recovery_code_used','passkey_added','passkey_removed',
    'admin_impersonation_start','admin_impersonation_end',
    'data_export_requested','data_export_downloaded','data_deletion_requested',
    'break_glass_access','session_revoked_by_admin'
  )),
  user_id                UUID REFERENCES identity."user"(id) ON DELETE CASCADE,
  actor_user_id          UUID REFERENCES identity."user"(id),               -- If different from user
  severity               VARCHAR(10) NOT NULL DEFAULT 'info' CHECK (severity IN ('info','warn','high','critical')),
  context_jsonb          JSONB DEFAULT '{}',
  requires_user_notification BOOLEAN NOT NULL DEFAULT FALSE,
  user_notified_at       TIMESTAMPTZ,
  requires_admin_review  BOOLEAN NOT NULL DEFAULT FALSE,
  admin_reviewed_at      TIMESTAMPTZ,
  admin_reviewed_by_user_id UUID REFERENCES identity."user"(id),
  ip_address             INET
);

CREATE INDEX IF NOT EXISTS idx_security_event_user ON auth.security_event_log (user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_event_type ON auth.security_event_log (event_type, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_event_severity ON auth.security_event_log (severity, occurred_at DESC) WHERE severity IN ('high','critical');
CREATE INDEX IF NOT EXISTS idx_security_event_review ON auth.security_event_log (occurred_at DESC) WHERE requires_admin_review AND admin_reviewed_at IS NULL;

-- ----------------------------------------------------------------------------
-- auth.suspicious_activity_alert — Real-time alerts
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.suspicious_activity_alert (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  subject_user_id        UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  alert_type             VARCHAR(40) NOT NULL CHECK (alert_type IN (
    'impossible_travel','new_country','new_device','password_spray',
    'credential_stuffing','account_takeover_pattern','mass_action',
    'unusual_purchase_volume','unusual_login_time','geo_mismatch',
    'tor_exit_node','vpn_proxy_detected','rapid_password_attempts',
    'new_session_after_password_breach'
  )),
  signal_jsonb           JSONB NOT NULL DEFAULT '{}',
  severity               VARCHAR(10) NOT NULL CHECK (severity IN ('low','medium','high','critical')),
  confidence_score       NUMERIC(5,2) CHECK (confidence_score BETWEEN 0 AND 100),
  action_taken           VARCHAR(40) DEFAULT 'notify_user' CHECK (action_taken IN
    ('none','notify_user','require_mfa','block_session','temp_lock','escalate','admin_review','auto_logout_all')),
  reviewed_by_user_id    UUID REFERENCES identity."user"(id),
  reviewed_at            TIMESTAMPTZ,
  false_positive         BOOLEAN
);

CREATE INDEX IF NOT EXISTS idx_suspicious_user ON auth.suspicious_activity_alert (subject_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_suspicious_unreviewed ON auth.suspicious_activity_alert (created_at DESC) WHERE reviewed_at IS NULL AND severity IN ('high','critical');
CREATE INDEX IF NOT EXISTS idx_suspicious_type ON auth.suspicious_activity_alert (alert_type, created_at DESC);

-- ----------------------------------------------------------------------------
-- auth.oauth_state_token — CSRF protection for OAuth flow
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.oauth_state_token (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  state_value            VARCHAR(80) NOT NULL UNIQUE,
  pkce_challenge         VARCHAR(128),
  pkce_method            VARCHAR(10) DEFAULT 'S256',
  redirect_uri           TEXT NOT NULL,
  scope_requested        TEXT[],
  provider               VARCHAR(30) NOT NULL CHECK (provider IN ('google','facebook','apple','microsoft','linkedin','wechat','line','zalo','generic_oidc')),
  user_id                UUID REFERENCES identity."user"(id) ON DELETE SET NULL,
  ip_address             INET,
  expires_at             TIMESTAMPTZ NOT NULL,
  consumed_at            TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_oauth_state_expires ON auth.oauth_state_token (expires_at) WHERE consumed_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_oauth_state_value ON auth.oauth_state_token (state_value);

-- ----------------------------------------------------------------------------
-- auth.account_lockout_record — Account lock state
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.account_lockout_record (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  locked_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  locked_until           TIMESTAMPTZ NOT NULL,
  lock_reason            VARCHAR(40) NOT NULL CHECK (lock_reason IN
    ('failed_attempts','admin','fraud_flag','terms_violation','suspicious_activity',
     'breach_password','compliance_hold','user_requested')),
  failed_attempts_count  INT NOT NULL DEFAULT 0,
  unlocked_at            TIMESTAMPTZ,
  unlocked_by_user_id    UUID REFERENCES identity."user"(id),
  unlock_method          VARCHAR(30) CHECK (unlock_method IN
    ('auto_timeout','admin','user_password_reset','recovery_code','identity_verification','support_ticket'))
);

CREATE INDEX IF NOT EXISTS idx_lockout_user ON auth.account_lockout_record (user_id, locked_at DESC);
CREATE INDEX IF NOT EXISTS idx_lockout_active ON auth.account_lockout_record (locked_until) WHERE unlocked_at IS NULL;

-- ----------------------------------------------------------------------------
-- auth.passkey_credential — WebAuthn/Passkey credentials
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auth.passkey_credential (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  credential_id          BYTEA NOT NULL UNIQUE,                            -- Raw credential ID
  credential_id_base64   VARCHAR(255) NOT NULL UNIQUE,                     -- Base64-encoded for lookup
  public_key             BYTEA NOT NULL,                                   -- COSE public key
  sign_count             BIGINT NOT NULL DEFAULT 0,                        -- Anti-clone counter
  transports             TEXT[] NOT NULL DEFAULT '{}'                       -- usb|nfc|ble|internal|hybrid
                          CHECK (transports <@ ARRAY['usb','nfc','ble','internal','hybrid','smart-card']),
  authenticator_aaguid   UUID,
  authenticator_label    VARCHAR(120),                                     -- "iPhone 15", "YubiKey 5"
  backup_eligible        BOOLEAN NOT NULL DEFAULT FALSE,
  backup_state           BOOLEAN NOT NULL DEFAULT FALSE,                    -- Currently backed up (cloud)
  uv_initialized         BOOLEAN NOT NULL DEFAULT FALSE,                    -- User verification capable
  last_used_at           TIMESTAMPTZ,
  use_count              INT NOT NULL DEFAULT 0,
  revoked_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_passkey_user ON auth.passkey_credential (user_id) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_passkey_credential_id ON auth.passkey_credential (credential_id_base64);

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------

CREATE TRIGGER trg_auth_session_updated_at BEFORE UPDATE ON auth.auth_session
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_session_device_updated_at BEFORE UPDATE ON auth.auth_session_device
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_mfa_device_updated_at BEFORE UPDATE ON auth.mfa_device
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_lockout_updated_at BEFORE UPDATE ON auth.account_lockout_record
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_passkey_updated_at BEFORE UPDATE ON auth.passkey_credential
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- RLS policies
-- ----------------------------------------------------------------------------

DO $rls$
DECLARE
  t TEXT;
  tables TEXT[] := ARRAY[
    'auth_session','auth_session_device','auth_token_blacklist',
    'auth_refresh_token','auth_password_reset_token','auth_email_verification_token',
    'mfa_device','mfa_recovery_code','mfa_challenge',
    'login_attempt_log','security_event_log','suspicious_activity_alert',
    'oauth_state_token','account_lockout_record','passkey_credential'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('ALTER TABLE auth.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON auth.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
      t
    );
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('04_auth_security.sql', 'Auth + Security: 15 tables for session/MFA/passkey/OAuth/lockout');

-- ============================================================================
-- END 04_auth_security.sql — 15 tables, 40+ indexes, 5 triggers, 15 RLS policies
-- ============================================================================
