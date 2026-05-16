-- R23 CHECK 03 — RLS gaps (Sprint 8 P2.1-F2 fix multi-tenant compatibility)
--
-- Sprint 2 phát hiện: script gốc hard-code policyname = 'tenant_isolation'
-- → tables có policies tên khác (eg tenant_self_*) bị treat as "no policy" → false positive
--
-- Sprint 8 fix: detect ANY policy có qual filter tenant_id (không chỉ một tên cố định)
--
-- Tham chiếu: Sprint 3 P2.1-F2 (Sprint 8 backlog), commit cdc... rollback mig 42 false positive

\echo '============================================================'
\echo 'CHECK 03 — RLS gaps (Sprint 8 fix multi-tenant)'
\echo 'Tables with tenant_id but no row-level security enforcement.'
\echo 'Multi-naming convention support:'
\echo '  - tenant_isolation (migration 04, 07, 15, 35)'
\echo '  - tenant_self_* (migration 02 — original convention)'
\echo '  - any policy với qual chứa tenant_id (catch-all)'
\echo '============================================================'

-- Gap detection: tenant_id present nhưng KHÔNG có policy match tenant_id
WITH tenant_tables AS (
  SELECT DISTINCT t.table_schema, t.table_name
  FROM information_schema.columns c
  JOIN information_schema.tables t
    ON t.table_schema = c.table_schema AND t.table_name = c.table_name
  WHERE c.column_name = 'tenant_id'
    AND t.table_schema NOT IN ('pg_catalog','information_schema','admin','partman','cron')
    AND t.table_type = 'BASE TABLE'
),
tenant_policies AS (
  -- Detect ANY policy mà qual reference tenant_id
  SELECT
    schemaname,
    tablename,
    array_agg(policyname ORDER BY policyname) AS policy_names,
    bool_or(qual LIKE '%tenant_id%' OR with_check LIKE '%tenant_id%') AS has_tenant_filter
  FROM pg_policies
  WHERE schemaname NOT IN ('pg_catalog','information_schema','admin','partman','cron')
  GROUP BY schemaname, tablename
)
SELECT
  tt.table_schema || '.' || tt.table_name AS table_name,
  CASE
    WHEN NOT pc.relrowsecurity THEN 'RLS_DISABLED'
    WHEN tp.has_tenant_filter IS NULL THEN 'RLS_ENABLED_BUT_NO_POLICY'
    WHEN tp.has_tenant_filter = FALSE THEN 'RLS_ENABLED_POLICY_NO_TENANT_FILTER'
    ELSE 'OK'
  END AS gap_type,
  COALESCE(array_to_string(tp.policy_names, ', '), '(none)') AS existing_policies,
  CASE
    WHEN NOT pc.relrowsecurity THEN
      format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY; CREATE POLICY tenant_isolation ON %I.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''));',
        tt.table_schema, tt.table_name, tt.table_schema, tt.table_name)
    WHEN tp.has_tenant_filter IS NULL THEN
      format('CREATE POLICY tenant_isolation ON %I.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''));',
        tt.table_schema, tt.table_name)
    ELSE
      '-- OK: tenant filter detected qua policy ' || array_to_string(tp.policy_names, ', ')
  END AS fix_ddl
FROM tenant_tables tt
JOIN pg_class pc ON pc.relname = tt.table_name
JOIN pg_namespace pn ON pn.oid = pc.relnamespace AND pn.nspname = tt.table_schema
LEFT JOIN tenant_policies tp ON tp.schemaname = tt.table_schema AND tp.tablename = tt.table_name
WHERE pc.relrowsecurity = FALSE
   OR tp.has_tenant_filter IS NULL
   OR tp.has_tenant_filter = FALSE
ORDER BY
  CASE
    WHEN NOT pc.relrowsecurity THEN 1
    WHEN tp.has_tenant_filter IS NULL THEN 2
    ELSE 3
  END,
  tt.table_schema, tt.table_name;

\echo ''
\echo '============================================================'
\echo 'OK rows: tables có tenant_id + RLS + tenant filter qua bất kỳ policy nào'
\echo 'Gaps cần fix: rows trong output trên'
\echo '============================================================'
