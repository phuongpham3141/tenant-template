-- Find columns that LOOK like foreign keys (named *_id) but have no actual FK constraint.
-- Excludes intentional poly-references and tenant_id (which is enforced via RLS, not FK).
\set ON_ERROR_STOP off

\echo '============================================================'
\echo 'CHECK 01 — Orphan FK candidates'
\echo 'Columns ending in _id without an FK constraint.'
\echo 'Some are intentional (poly refs, tenant_id, external IDs).'
\echo 'Review each manually.'
\echo '============================================================'

WITH cols AS (
  SELECT c.table_schema, c.table_name, c.column_name, c.data_type
  FROM information_schema.columns c
  WHERE c.table_schema NOT IN ('pg_catalog','information_schema','partman','cron','admin')
    AND c.column_name LIKE '%\_id' ESCAPE '\'
    AND c.column_name <> 'tenant_id'
    AND c.column_name <> 'id'
    AND c.column_name NOT LIKE '%_legacy_%'
    AND c.data_type IN ('uuid', 'character varying', 'text')
),
fks AS (
  SELECT
    tc.table_schema, tc.table_name, kcu.column_name
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu
    ON kcu.constraint_schema = tc.constraint_schema
    AND kcu.constraint_name = tc.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
)
SELECT
  c.table_schema || '.' || c.table_name AS table_name,
  c.column_name,
  c.data_type
FROM cols c
LEFT JOIN fks f ON f.table_schema = c.table_schema AND f.table_name = c.table_name AND f.column_name = c.column_name
WHERE f.column_name IS NULL
ORDER BY c.table_schema, c.table_name, c.column_name;
