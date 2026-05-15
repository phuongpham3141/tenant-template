-- Find tables that have tenant_id column but RLS disabled or no tenant_isolation policy.
-- These are data-leak risks.

\echo '============================================================'
\echo 'CHECK 03 — RLS gaps'
\echo 'Tables with tenant_id but no row-level security enforcement.'
\echo '============================================================'

-- Gap A: tenant_id present but RLS disabled
WITH tenant_tables AS (
  SELECT DISTINCT t.table_schema, t.table_name
  FROM information_schema.columns c
  JOIN information_schema.tables t
    ON t.table_schema = c.table_schema AND t.table_name = c.table_name
  WHERE c.column_name = 'tenant_id'
    AND t.table_schema NOT IN ('pg_catalog','information_schema','admin','partman','cron')
    AND t.table_type = 'BASE TABLE'
)
SELECT
  tt.table_schema || '.' || tt.table_name AS table_name,
  CASE WHEN pc.relrowsecurity THEN 'RLS_ENABLED_BUT_NO_POLICY' ELSE 'RLS_DISABLED' END AS gap_type,
  format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY; CREATE POLICY tenant_isolation ON %I.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''));',
    tt.table_schema, tt.table_name, tt.table_schema, tt.table_name) AS fix_ddl
FROM tenant_tables tt
JOIN pg_class pc ON pc.relname = tt.table_name
JOIN pg_namespace pn ON pn.oid = pc.relnamespace AND pn.nspname = tt.table_schema
LEFT JOIN pg_policies pp ON pp.schemaname = tt.table_schema AND pp.tablename = tt.table_name AND pp.policyname = 'tenant_isolation'
WHERE pc.relrowsecurity = FALSE
   OR pp.policyname IS NULL
ORDER BY tt.table_schema, tt.table_name;
