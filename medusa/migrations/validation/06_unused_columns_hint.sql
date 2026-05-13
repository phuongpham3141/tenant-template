-- Heuristic: find columns where 100% of rows are NULL (or table is empty).
-- Could indicate (a) unused column, (b) feature not yet shipped, (c) optional column working as intended.
-- Manual review required — do NOT auto-drop.

\echo '============================================================'
\echo 'CHECK 06 — 100%-NULL columns (review hint)'
\echo 'Columns where every row is NULL. Could be unused or pre-feature.'
\echo 'DO NOT auto-drop — verify with product/dev team first.'
\echo '============================================================'

-- This requires a dynamic loop; provided as a DO block that RAISE NOTICEs per finding.
DO $unused$
DECLARE
  v_row RECORD;
  v_total BIGINT;
  v_nulls BIGINT;
  v_pct NUMERIC;
  v_findings INT := 0;
BEGIN
  FOR v_row IN
    SELECT c.table_schema, c.table_name, c.column_name, c.is_nullable
    FROM information_schema.columns c
    WHERE c.table_schema NOT IN ('pg_catalog','information_schema','partman','cron','admin')
      AND c.is_nullable = 'YES'
      AND c.column_name NOT IN ('deleted_at','metadata','tags','version')
    ORDER BY c.table_schema, c.table_name, c.ordinal_position
  LOOP
    BEGIN
      EXECUTE format('SELECT COUNT(*), COUNT(*) FILTER (WHERE %I IS NULL) FROM %I.%I',
                     v_row.column_name, v_row.table_schema, v_row.table_name)
        INTO v_total, v_nulls;
      IF v_total > 100 AND v_nulls = v_total THEN  -- only flag tables with non-trivial row count
        RAISE NOTICE 'UNUSED?  %.%.% — 100%% NULL across % rows', v_row.table_schema, v_row.table_name, v_row.column_name, v_total;
        v_findings := v_findings + 1;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      CONTINUE;
    END;
  END LOOP;
  RAISE NOTICE 'Total 100%%-NULL findings: %', v_findings;
END $unused$;
