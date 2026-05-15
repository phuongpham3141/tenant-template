-- Migration 35: Verify RLS policies on all tenant-scoped tables
\set ON_ERROR_STOP on

-- Audit: List tables WITHOUT RLS but with tenant_id column
SELECT t.table_schema, t.table_name
FROM information_schema.tables t
JOIN information_schema.columns c ON c.table_schema = t.table_schema AND c.table_name = t.table_name
JOIN pg_class pc ON pc.relname = t.table_name AND pc.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = t.table_schema)
WHERE c.column_name = 'tenant_id'
  AND NOT pc.relrowsecurity
  AND t.table_schema NOT IN ('pg_catalog','information_schema','public')
ORDER BY t.table_schema, t.table_name;

-- Enable RLS on any missing tables (catch-all)
DO $rls$
DECLARE rec RECORD;
BEGIN
  FOR rec IN
    SELECT t.table_schema, t.table_name
    FROM information_schema.tables t
    JOIN information_schema.columns c ON c.table_schema = t.table_schema AND c.table_name = t.table_name
    JOIN pg_class pc ON pc.relname = t.table_name AND pc.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = t.table_schema)
    WHERE c.column_name = 'tenant_id'
      AND NOT pc.relrowsecurity
      AND t.table_schema NOT IN ('pg_catalog','information_schema','public','admin')
  LOOP
    EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', rec.table_schema, rec.table_name);
    EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON %I.%I', rec.table_schema, rec.table_name);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %I.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
      rec.table_schema, rec.table_name
    );
    RAISE NOTICE 'RLS enabled on %.%', rec.table_schema, rec.table_name;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('35_rls_policies.sql', 'RLS verification + catch-all policies');
