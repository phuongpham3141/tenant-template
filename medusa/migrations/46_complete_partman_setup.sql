-- Migration 46: Complete pg_partman setup for tables deferred by mig 40 (Day 3)
-- Per Rule 6: idempotent re-apply state đúng sau khi mig 40 file fixed (Day 4 Bước 2b)
--
-- Background:
--   Mig 40 Day 3 attempted 24 tables, succeeded 1 (auth.security_event_log).
--   Day 4 audit (Bước 2a): 10 tables nhóm C không có time column (defer Sprint 8),
--   9 tables nhóm B có column tên khác (fixed in mig 40 Day 4 Bước 2b.2).
--
-- Mig 46 idempotent setup 13 tables còn lại:
--   - 4 nhóm A retry (column khớp expected, defer Day 3 do empty check hoặc data)
--   - 9 nhóm B với column name đúng (sau mig 40 fix)
--
-- Logic: Copy mig 40 FOR LOOP + EXCEPTION handler (Option α)
-- Safe to re-run — pg_partman skip nếu đã partitioned, EXCEPTION catch error.
--
-- Created: 2026-05-15 (Sprint 2 Day 4 Bước 2b.3)

\set ON_ERROR_STOP on

DO $partman_complete$
DECLARE
  v_targets TEXT[][] := ARRAY[
    -- 4 tables nhóm A (Day 3 deferred, retry)
    ARRAY['audit',           'audit_event',                 'occurred_at',    '1 month', '3'],
    ARRAY['live',            'ai_compute_ledger',           'occurred_at',    '1 month', '2'],
    ARRAY['search',          'search_query_log',            'executed_at',    '1 month', '2'],
    ARRAY['email_mkt',       'email_log',                   'sent_at',        '1 month', '2'],
    -- 9 tables nhóm B (column đã fix mig 40 Day 4 Bước 2b.2)
    ARRAY['advertising',     'ads_impression_log',          'served_at',      '1 month', '3'],
    ARRAY['advertising',     'ads_click_log',               'clicked_at',     '1 month', '3'],
    ARRAY['advertising',     'ads_conversion_log',          'conversion_at',  '1 month', '3'],
    ARRAY['personalization', 'user_behavior_event',         'event_at',       '1 month', '3'],
    ARRAY['communication',   'conversation_message',        'created_at',     '1 month', '3'],
    ARRAY['live',            'livestream_chat_message',     'sent_at',        '1 month', '3'],
    ARRAY['auth',            'login_attempt_log',           'attempted_at',   '1 month', '2'],
    ARRAY['api',             'api_call_log',                'called_at',      '1 month', '2'],
    ARRAY['tax',             'tax_calculation_log',         'calculated_at',  '1 month', '2']
  ];
  i INT;
  v_schema TEXT;
  v_table TEXT;
  v_control TEXT;
  v_interval TEXT;
  v_premake TEXT;
  v_full_name TEXT;
  v_row_count BIGINT;
  v_partitioned BOOLEAN;
  v_succeeded TEXT[] := ARRAY[]::TEXT[];
  v_skipped TEXT[] := ARRAY[]::TEXT[];
  v_failed TEXT[] := ARRAY[]::TEXT[];
BEGIN
  FOR i IN 1 .. array_length(v_targets, 1) LOOP
    v_schema   := v_targets[i][1];
    v_table    := v_targets[i][2];
    v_control  := v_targets[i][3];
    v_interval := v_targets[i][4];
    v_premake  := v_targets[i][5];
    v_full_name := v_schema || '.' || v_table;

    -- Skip if table doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_tables WHERE schemaname = v_schema AND tablename = v_table
    ) THEN
      v_skipped := array_append(v_skipped, v_full_name || ' (table missing)');
      CONTINUE;
    END IF;

    -- Skip if already partitioned
    SELECT EXISTS (
      SELECT 1 FROM pg_partitioned_table pt
      JOIN pg_class c ON c.oid = pt.partrelid
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = v_schema AND c.relname = v_table
    ) INTO v_partitioned;

    IF v_partitioned THEN
      v_skipped := array_append(v_skipped, v_full_name || ' (already partitioned)');
      CONTINUE;
    END IF;

    -- Skip if has data (defer to runbook)
    EXECUTE format('SELECT COUNT(*) FROM %I.%I', v_schema, v_table) INTO v_row_count;
    IF v_row_count > 0 THEN
      v_skipped := array_append(v_skipped,
        v_full_name || ' (has ' || v_row_count || ' rows — use runbook)');
      CONTINUE;
    END IF;

    -- Convert table to partitioned + create initial partitions
    BEGIN
      EXECUTE format(
        'CREATE TABLE %I.%I_template (LIKE %I.%I INCLUDING ALL)',
        v_schema, v_table, v_schema, v_table
      );
      EXECUTE format('DROP TABLE %I.%I CASCADE', v_schema, v_table);
      EXECUTE format(
        'CREATE TABLE %I.%I (LIKE %I.%I_template INCLUDING DEFAULTS INCLUDING IDENTITY INCLUDING CONSTRAINTS INCLUDING STORAGE INCLUDING COMMENTS) PARTITION BY RANGE (%I)',
        v_schema, v_table, v_schema, v_table, v_control
      );

      -- pg_partman requires control column NOT NULL (Day 4 Bước 2b.4 finding)
      EXECUTE format(
        'ALTER TABLE %I.%I ALTER COLUMN %I SET NOT NULL',
        v_schema, v_table, v_control
      );

      PERFORM partman.create_parent(
        p_parent_table := v_full_name,
        p_control      := v_control,
        p_type         := 'range',
        p_interval     := v_interval,
        p_premake      := v_premake::INT
      );
      EXECUTE format('DROP TABLE %I.%I_template', v_schema, v_table);

      -- Set retention based on table type
      UPDATE partman.part_config
        SET retention = CASE
          WHEN v_full_name = 'audit.audit_event'                   THEN '7 years'
          WHEN v_full_name = 'tax.tax_calculation_log'             THEN '7 years'
          WHEN v_full_name LIKE 'advertising.%'                    THEN '24 months'
          WHEN v_full_name = 'search.search_query_log'             THEN '24 months'
          WHEN v_full_name = 'personalization.user_behavior_event' THEN '24 months'
          WHEN v_full_name = 'communication.conversation_message'  THEN '36 months'
          WHEN v_full_name LIKE 'live.%'                           THEN '18 months'
          WHEN v_full_name LIKE 'auth.%'                           THEN '18 months'
          WHEN v_full_name LIKE 'email_mkt.%'                      THEN '24 months'
          WHEN v_full_name = 'api.api_call_log'                    THEN '12 months'
          ELSE '24 months'
        END,
        retention_keep_table = FALSE,
        retention_keep_index = FALSE,
        infinite_time_partitions = TRUE
      WHERE parent_table = v_full_name;

      v_succeeded := array_append(v_succeeded, v_full_name);
    EXCEPTION WHEN OTHERS THEN
      v_failed := array_append(v_failed, v_full_name || ' (' || SQLERRM || ')');
    END;
  END LOOP;

  RAISE NOTICE 'pg_partman complete setup (mig 46). Attempted: %, succeeded: %, skipped: %, failed: %',
    array_length(v_targets, 1),
    COALESCE(array_length(v_succeeded, 1), 0),
    COALESCE(array_length(v_skipped, 1), 0),
    COALESCE(array_length(v_failed, 1), 0);

  IF v_failed IS NOT NULL AND array_length(v_failed, 1) > 0 THEN
    RAISE NOTICE 'Failed tables: %', array_to_string(v_failed, ' | ');
  END IF;

  INSERT INTO admin.migration_log (migration_file, status, applied_at, notes)
  VALUES ('46_complete_partman_setup.sql', 'success', NOW(),
          format('Day 4 Bước 2b.3-2b.4. Attempted %s, succeeded %s, skipped %s, failed %s',
            array_length(v_targets, 1),
            COALESCE(array_length(v_succeeded, 1), 0),
            COALESCE(array_length(v_skipped, 1), 0),
            COALESCE(array_length(v_failed, 1), 0)));
END $partman_complete$;
