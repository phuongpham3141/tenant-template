-- ============================================================================
-- Cybersilkroads — Migration 00: PostgreSQL Extensions + Helper Functions
-- ============================================================================
-- Purpose: Install required extensions and define universal helper functions
--          used by every migration after this.
-- Run as:  postgres superuser
-- Idempotent: YES (safe to re-run)
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- 1. Core extensions (required for foundation)
-- ----------------------------------------------------------------------------

-- Helper: try to install extension, log warning if not available
DO $bootstrap$
DECLARE
  ext_name TEXT;
  ext_schema TEXT;
  ext_required BOOLEAN;
  exts TEXT[][] := ARRAY[
    -- [name, schema, required?]
    ARRAY['pgcrypto', 'public', 'true'],
    ARRAY['pg_trgm', 'public', 'true'],
    ARRAY['btree_gin', 'public', 'true'],
    ARRAY['btree_gist', 'public', 'false'],
    ARRAY['hstore', 'public', 'true'],
    ARRAY['intarray', 'public', 'false'],
    ARRAY['ltree', 'public', 'true'],
    ARRAY['tablefunc', 'public', 'false'],
    ARRAY['unaccent', 'public', 'false'],
    ARRAY['pg_stat_statements', 'public', 'false'],
    ARRAY['pgaudit', 'public', 'false'],
    -- Advanced (may need pgvector/pgvector image or custom build):
    ARRAY['vector', 'public', 'false'],
    ARRAY['pg_partman', 'partman', 'false'],
    ARRAY['pg_cron', 'public', 'false']
  ];
  i INT;
BEGIN
  FOR i IN 1..array_length(exts, 1) LOOP
    ext_name := exts[i][1];
    ext_schema := exts[i][2];
    ext_required := exts[i][3]::BOOLEAN;
    BEGIN
      -- pg_partman needs its own schema first
      IF ext_name = 'pg_partman' THEN
        EXECUTE 'CREATE SCHEMA IF NOT EXISTS ' || quote_ident(ext_schema);
      END IF;
      EXECUTE format('CREATE EXTENSION IF NOT EXISTS %I SCHEMA %I', ext_name, ext_schema);
      RAISE NOTICE '  ✓ Extension % installed', ext_name;
    EXCEPTION WHEN OTHERS THEN
      IF ext_required THEN
        RAISE EXCEPTION 'REQUIRED extension % not available: %', ext_name, SQLERRM;
      ELSE
        RAISE WARNING '  ✗ Optional extension % not available (skipped): %', ext_name, SQLERRM;
      END IF;
    END;
  END LOOP;
END
$bootstrap$;

-- ----------------------------------------------------------------------------
-- 4. UUID v7 — time-ordered UUIDs (preferred over v4 for indexes)
-- ----------------------------------------------------------------------------
-- pg_uuidv7 is not yet in core PG. If extension not available, use this
-- function implementation. Native function is preferred for performance.

DO $uuidv7$
BEGIN
  BEGIN
    CREATE EXTENSION IF NOT EXISTS "pg_uuidv7";
    RAISE NOTICE 'pg_uuidv7 extension installed';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'pg_uuidv7 extension not available, using PL/pgSQL fallback';
  END;
END
$uuidv7$;

-- Fallback UUIDv7 function (used if extension not available)
-- RFC 9562 compliant: 48-bit Unix timestamp ms + 12-bit random + version + 62-bit random
-- Only create fallback if pg_uuidv7 extension didn't provide a function
DO $maybe_create$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE p.proname = 'uuidv7' AND n.nspname = 'public'
  ) THEN
    EXECUTE $fn$
      CREATE OR REPLACE FUNCTION public.uuidv7()
      RETURNS UUID
      LANGUAGE plpgsql
      PARALLEL SAFE
      AS $body$
      DECLARE
        ts_ms BIGINT;
        rand BYTEA;
        hex_ts TEXT;
        hex_rand_a TEXT;
        hex_rand_b TEXT;
      BEGIN
        ts_ms := (EXTRACT(EPOCH FROM clock_timestamp()) * 1000)::BIGINT;
        rand := gen_random_bytes(10);
        hex_ts := LPAD(TO_HEX(ts_ms), 12, '0');
        hex_rand_a := ENCODE(SUBSTRING(rand FROM 1 FOR 2), 'hex');
        hex_rand_b := ENCODE(SUBSTRING(rand FROM 3 FOR 8), 'hex');
        -- Set version 7 (top nibble of byte 7 = 7), variant (top 2 bits of byte 9 = 10)
        RETURN (
          SUBSTRING(hex_ts FROM 1 FOR 8) || '-' ||
          SUBSTRING(hex_ts FROM 9 FOR 4) || '-' ||
          '7' || SUBSTRING(hex_rand_a FROM 2 FOR 3) || '-' ||
          (TO_HEX(8 + (GET_BYTE(rand, 2) & 3))) || SUBSTRING(hex_rand_b FROM 2 FOR 3) || '-' ||
          SUBSTRING(hex_rand_b FROM 5 FOR 12)
        )::UUID;
      END;
      $body$;
    $fn$;
  END IF;
END
$maybe_create$;

COMMENT ON FUNCTION public.uuidv7() IS
  'Generate UUID version 7 (time-ordered). Use as PK default for better index performance vs v4.';

-- ----------------------------------------------------------------------------
-- 5. Universal trigger functions
-- ----------------------------------------------------------------------------

-- trigger_set_timestamp: auto-bump updated_at column
-- Usage: CREATE TRIGGER trg_<entity>_updated_at BEFORE UPDATE ON <table>
--        FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  -- Bump version (optimistic locking)
  IF TG_OP = 'UPDATE' THEN
    NEW.version = COALESCE(OLD.version, 0) + 1;
  END IF;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.trigger_set_timestamp() IS
  'Auto-update updated_at + bump version on UPDATE';

-- ----------------------------------------------------------------------------
-- 6. Audit event emit trigger
-- ----------------------------------------------------------------------------
-- This trigger writes to audit.audit_event after any INSERT/UPDATE/DELETE.
-- The actual audit_event table is created in 33_audit_event_sourcing.sql.
-- This function uses dynamic SQL with a check, so it's safe to define here.

CREATE OR REPLACE FUNCTION public.trigger_emit_audit_event()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_actor_id UUID;
  v_actor_type TEXT;
  v_tenant_id TEXT;
  v_target_id UUID;
BEGIN
  -- Skip if audit table not yet created (during migrations 00-32)
  PERFORM 1 FROM pg_tables WHERE schemaname = 'audit' AND tablename = 'audit_event';
  IF NOT FOUND THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  -- Get context from session settings (set by app middleware)
  v_actor_id := NULLIF(current_setting('app.current_user_id', true), '')::UUID;
  v_actor_type := COALESCE(NULLIF(current_setting('app.current_actor_type', true), ''), 'system');
  v_tenant_id := COALESCE(NULLIF(current_setting('app.current_tenant', true), ''), 'csr');

  -- Get target entity ID (assume column is 'id')
  v_target_id := CASE TG_OP
    WHEN 'DELETE' THEN OLD.id
    ELSE NEW.id
  END;

  -- Insert audit record
  EXECUTE format(
    'INSERT INTO audit.audit_event (
       tenant_id, event_type, event_source, actor_type, actor_id,
       target_entity_type, target_entity_id, action_verb,
       before_snapshot, after_snapshot, severity
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
  )
  USING
    v_tenant_id,
    TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME || '.' || lower(TG_OP),
    'database_trigger',
    v_actor_type,
    v_actor_id,
    TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
    v_target_id,
    lower(TG_OP),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT','UPDATE') THEN to_jsonb(NEW) ELSE NULL END,
    'info';

  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the original operation if audit insert fails
    RAISE WARNING 'Audit event emit failed: %', SQLERRM;
    RETURN COALESCE(NEW, OLD);
END;
$$;

COMMENT ON FUNCTION public.trigger_emit_audit_event() IS
  'Universal trigger to emit audit_event on table changes. Skips if audit table not yet created.';

-- ----------------------------------------------------------------------------
-- 7. Soft delete helper
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.soft_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Intercept DELETE and convert to UPDATE deleted_at = NOW()
  EXECUTE format(
    'UPDATE %I.%I SET deleted_at = NOW(), updated_at = NOW() WHERE id = $1',
    TG_TABLE_SCHEMA, TG_TABLE_NAME
  ) USING OLD.id;
  RETURN NULL;  -- Cancel actual DELETE
END;
$$;

COMMENT ON FUNCTION public.soft_delete() IS
  'Convert DELETE to UPDATE deleted_at = NOW(). Attach as INSTEAD OF DELETE trigger.';

-- ----------------------------------------------------------------------------
-- 8. Permission check helper (placeholder; full RBAC in 05_rbac.sql)
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.has_permission(
  p_user_id UUID,
  p_permission_key VARCHAR
) RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  -- Placeholder until rbac tables exist (created in 05_rbac.sql)
  -- After that migration, this function is redefined to do real check.
  PERFORM 1 FROM pg_tables WHERE schemaname = 'rbac' AND tablename = 'user_role_assignment';
  IF NOT FOUND THEN
    RETURN TRUE;  -- During bootstrap, allow all
  END IF;
  -- Real check (replaced in 05_rbac.sql migration)
  RETURN FALSE;
END;
$$;

-- ----------------------------------------------------------------------------
-- 9. Tenant context helpers
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS VARCHAR
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN COALESCE(NULLIF(current_setting('app.current_tenant', true), ''), 'csr');
END;
$$;

COMMENT ON FUNCTION public.current_tenant_id() IS
  'Get current tenant from session setting app.current_tenant (set by middleware)';

CREATE OR REPLACE FUNCTION public.current_user_id()
RETURNS UUID
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN NULLIF(current_setting('app.current_user_id', true), '')::UUID;
EXCEPTION
  WHEN OTHERS THEN RETURN NULL;
END;
$$;

-- ----------------------------------------------------------------------------
-- 10. i18n field helper
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.i18n_get(
  p_field JSONB,
  p_locale TEXT DEFAULT 'vi'
) RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Try requested locale, fallback en, fallback vi, fallback empty
  RETURN COALESCE(
    p_field->>p_locale,
    p_field->>'en',
    p_field->>'vi',
    ''
  );
END;
$$;

COMMENT ON FUNCTION public.i18n_get(JSONB, TEXT) IS
  'Read i18n JSONB column with locale fallback chain';

-- ----------------------------------------------------------------------------
-- 11. Money formatting helper
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.money_format(
  p_amount_minor BIGINT,
  p_currency CHAR(3),
  p_minor_units INT DEFAULT 2
) RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  divisor BIGINT;
BEGIN
  -- VND has 0 minor units, USD/EUR/CNY have 2, etc.
  divisor := CASE p_currency
    WHEN 'VND' THEN 1
    WHEN 'JPY' THEN 1
    WHEN 'KRW' THEN 1
    ELSE 100
  END;
  RETURN (p_amount_minor::NUMERIC / divisor)::TEXT || ' ' || p_currency;
END;
$$;

-- ----------------------------------------------------------------------------
-- 12. Verify all extensions installed
-- ----------------------------------------------------------------------------

DO $verify$
DECLARE
  required_exts TEXT[] := ARRAY[
    'pgcrypto', 'pg_trgm', 'btree_gin', 'hstore', 'ltree'
  ];
  optional_exts TEXT[] := ARRAY[
    'btree_gist', 'intarray', 'tablefunc', 'unaccent',
    'pg_stat_statements', 'pgaudit',
    'vector', 'pg_partman', 'pg_cron', 'pg_uuidv7'
  ];
  ext TEXT;
  installed TEXT[] := ARRAY[]::TEXT[];
  missing_required TEXT[] := ARRAY[]::TEXT[];
  missing_optional TEXT[] := ARRAY[]::TEXT[];
BEGIN
  FOREACH ext IN ARRAY required_exts LOOP
    PERFORM 1 FROM pg_extension WHERE extname = ext;
    IF FOUND THEN
      installed := installed || ext;
    ELSE
      missing_required := missing_required || ext;
    END IF;
  END LOOP;

  FOREACH ext IN ARRAY optional_exts LOOP
    PERFORM 1 FROM pg_extension WHERE extname = ext;
    IF FOUND THEN
      installed := installed || ext;
    ELSE
      missing_optional := missing_optional || ext;
    END IF;
  END LOOP;

  RAISE NOTICE '=== Extension status ===';
  RAISE NOTICE 'Installed: %', installed;
  IF array_length(missing_required, 1) > 0 THEN
    RAISE EXCEPTION 'FATAL: Missing REQUIRED extensions: %', missing_required;
  END IF;
  IF array_length(missing_optional, 1) > 0 THEN
    RAISE WARNING 'Missing optional extensions (some features disabled): %', missing_optional;
  END IF;
END
$verify$;

-- ============================================================================
-- END migration 00_extensions.sql
-- Tables created: 0
-- Functions created: 7 (uuidv7, trigger_set_timestamp, trigger_emit_audit_event,
--                       soft_delete, has_permission, current_tenant_id,
--                       current_user_id, i18n_get, money_format)
-- Extensions installed: 14
-- ============================================================================
