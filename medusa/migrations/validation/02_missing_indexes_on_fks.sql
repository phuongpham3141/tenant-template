-- Find FK columns WITHOUT a supporting index.
-- Missing FK indexes → slow DELETE/UPDATE cascades and slow JOINs.
-- Output: list of (schema, table, column) needing CREATE INDEX.

\echo '============================================================'
\echo 'CHECK 02 — FK columns without index'
\echo 'Missing FK indexes hurt JOIN and cascade performance.'
\echo '============================================================'

WITH fk_cols AS (
  SELECT
    tc.table_schema, tc.table_name, kcu.column_name, tc.constraint_name
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu
    ON kcu.constraint_schema = tc.constraint_schema
    AND kcu.constraint_name = tc.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema NOT IN ('pg_catalog','information_schema','partman','cron')
),
indexed_cols AS (
  -- Single-column indexes
  SELECT
    n.nspname AS schemaname,
    t.relname AS tablename,
    a.attname AS columnname
  FROM pg_index ix
  JOIN pg_class i ON i.oid = ix.indexrelid
  JOIN pg_class t ON t.oid = ix.indrelid
  JOIN pg_namespace n ON n.oid = t.relnamespace
  JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(ix.indkey)
  WHERE array_length(ix.indkey, 1) = 1
  UNION
  -- Leading column of multi-column indexes (also counts as covered)
  SELECT
    n.nspname,
    t.relname,
    a.attname
  FROM pg_index ix
  JOIN pg_class i ON i.oid = ix.indexrelid
  JOIN pg_class t ON t.oid = ix.indrelid
  JOIN pg_namespace n ON n.oid = t.relnamespace
  JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ix.indkey[0]
  WHERE array_length(ix.indkey, 1) > 1
)
SELECT
  fk.table_schema || '.' || fk.table_name AS table_name,
  fk.column_name,
  fk.constraint_name,
  format('CREATE INDEX IF NOT EXISTS idx_%s_%s ON %I.%I (%I);',
         fk.table_name, fk.column_name,
         fk.table_schema, fk.table_name, fk.column_name) AS suggested_ddl
FROM fk_cols fk
LEFT JOIN indexed_cols ic
  ON ic.schemaname = fk.table_schema
  AND ic.tablename = fk.table_name
  AND ic.columnname = fk.column_name
WHERE ic.columnname IS NULL
ORDER BY fk.table_schema, fk.table_name, fk.column_name;
