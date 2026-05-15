-- Migration 40: pg_partman REAL setup for high-volume time-series tables
-- Replaces placeholder migration 38. Requires:
--   - pg_partman extension installed (postgresql-16-partman package)
--   - pg_cron extension installed (for scheduled maintenance) OR external cron
--
-- IMPORTANT: For tables that ALREADY contain data, this migration cannot convert them in-place.
-- Follow the data-migration playbook in devops/runbooks/partition-conversion.md instead.
-- For tables that are still empty (fresh deploy), this migration partitions them safely.

\set ON_ERROR_STOP on

DO $partman_setup$
DECLARE
  v_has_partman BOOLEAN;
  v_has_cron BOOLEAN;
  v_table_record RECORD;
  v_row_count BIGINT;
  v_partitioned BOOLEAN;
  v_attempted TEXT[] := ARRAY[]::TEXT[];
  v_succeeded TEXT[] := ARRAY[]::TEXT[];
  v_skipped_data TEXT[] := ARRAY[]::TEXT[];
  v_skipped_already TEXT[] := ARRAY[]::TEXT[];

  -- (schema.table, control_column, interval, premake)
  v_targets TEXT[][] := ARRAY[
    ARRAY['audit',           'audit_event',                 'occurred_at',  '1 month', '3'],
    ARRAY['advertising', 'ads_impression_log', 'served_at',  '1 month', '3'],
    ARRAY['advertising', 'ads_click_log', 'clicked_at',  '1 month', '3'],
    ARRAY['advertising', 'ads_conversion_log', 'conversion_at',  '1 month', '3'],
    ARRAY['search',          'search_query_log',            'executed_at',  '1 month', '2'],
    ARRAY['personalization', 'user_behavior_event', 'event_at',  '1 month', '3'],
    ARRAY['email_mkt',       'email_log',                   'sent_at',      '1 month', '2'],
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): email_mkt.email_event_log
    ARRAY['communication', 'conversation_message', 'created_at',  '1 month', '3'],
    ARRAY['live', 'livestream_chat_message', 'sent_at',  '1 month', '3'],
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): live.livestream_event_log
    ARRAY['live',            'ai_compute_ledger',           'occurred_at',  '1 month', '2'],
    ARRAY['auth', 'login_attempt_log', 'attempted_at',  '1 month', '2'],
    ARRAY['auth',            'security_event_log',          'occurred_at',  '1 month', '2'],
    ARRAY['api', 'api_call_log', 'called_at',  '1 month', '2'],
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): api.webhook_delivery_log
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): payment.payment_event_log
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): notification.notification_log
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): experiment.experiment_event_log
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): ai.inference_log
    ARRAY['tax', 'tax_calculation_log', 'calculated_at',  '1 month', '2']
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): media.media_view_event
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): fraud.fraud_score_log
    -- REMOVED Day 4 Bước 2b (no time column, defer Sprint 8 design): vn_sourcing.sourcing_event_log
  ];
  i INT;
  v_schema TEXT;
  v_table TEXT;
  v_control TEXT;
  v_interval TEXT;
  v_premake TEXT;
  v_full_name TEXT;
BEGIN
  SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_partman') INTO v_has_partman;
  SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') INTO v_has_cron;

  IF NOT v_has_partman THEN
    RAISE WARNING 'pg_partman not installed — skipping. Install postgresql-16-partman, then re-run this migration.';
    INSERT INTO admin.migration_log (migration_file, notes, status)
    VALUES ('40_pg_partman_real.sql', 'pg_partman unavailable; partition setup skipped. Install extension and retry.', 'skipped');
    RETURN;
  END IF;

  -- Ensure partman schema exists
  CREATE SCHEMA IF NOT EXISTS partman;
  CREATE EXTENSION IF NOT EXISTS pg_partman SCHEMA partman;

  FOR i IN 1 .. array_length(v_targets, 1) LOOP
    v_schema   := v_targets[i][1];
    v_table    := v_targets[i][2];
    v_control  := v_targets[i][3];
    v_interval := v_targets[i][4];
    v_premake  := v_targets[i][5];
    v_full_name := v_schema || '.' || v_table;
    v_attempted := array_append(v_attempted, v_full_name);

    -- Skip if table doesn't exist (some schemas optional)
    IF NOT EXISTS (
      SELECT 1 FROM pg_tables WHERE schemaname = v_schema AND tablename = v_table
    ) THEN
      v_skipped_data := array_append(v_skipped_data, v_full_name || ' (table missing)');
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
      v_skipped_already := array_append(v_skipped_already, v_full_name);
      CONTINUE;
    END IF;

    -- Count rows; if non-trivial data exists, defer to runbook conversion process
    EXECUTE format('SELECT COUNT(*) FROM %I.%I', v_schema, v_table) INTO v_row_count;
    IF v_row_count > 0 THEN
      v_skipped_data := array_append(v_skipped_data,
        v_full_name || ' (has ' || v_row_count || ' rows — use runbook conversion)');
      CONTINUE;
    END IF;

    -- Safe to partition: drop and recreate as partitioned parent + create initial partitions
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

      -- pg_partman requires control column NOT NULL (Day 4 Buoc 2b.4 finding)
      -- Safe vì table vừa được DROP CASCADE + CREATE PARTITIONED LIKE template (0 rows)
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
          WHEN v_full_name = 'audit.audit_event'                THEN '7 years'
          WHEN v_full_name = 'payment.payment_event_log'        THEN '7 years'
          WHEN v_full_name = 'tax.tax_calculation_log'          THEN '7 years'
          WHEN v_full_name LIKE 'advertising.%'                 THEN '24 months'
          WHEN v_full_name = 'search.search_query_log'          THEN '24 months'
          WHEN v_full_name = 'personalization.user_behavior_event' THEN '24 months'
          WHEN v_full_name = 'communication.conversation_message' THEN '36 months'
          WHEN v_full_name LIKE 'live.%'                        THEN '18 months'
          WHEN v_full_name LIKE 'auth.%'                        THEN '18 months'
          WHEN v_full_name LIKE 'email_mkt.%'                   THEN '24 months'
          WHEN v_full_name = 'api.api_call_log'                 THEN '12 months'
          WHEN v_full_name = 'api.webhook_delivery_log'         THEN '6 months'
          ELSE '24 months'
        END,
        retention_keep_table = FALSE,
        retention_keep_index = FALSE,
        infinite_time_partitions = TRUE
      WHERE parent_table = v_full_name;

      v_succeeded := array_append(v_succeeded, v_full_name);
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Failed to partition %: %', v_full_name, SQLERRM;
      v_skipped_data := array_append(v_skipped_data, v_full_name || ' (error: ' || SQLERRM || ')');
    END;
  END LOOP;

  -- Schedule maintenance via pg_cron if available
  IF v_has_cron AND array_length(v_succeeded, 1) > 0 THEN
    PERFORM cron.schedule(
      'partman-maintenance',
      '15 1 * * *',  -- daily at 01:15
      $cron$ SELECT partman.run_maintenance(p_analyze := TRUE) $cron$
    );
    RAISE NOTICE 'pg_cron job "partman-maintenance" scheduled daily at 01:15 UTC';
  ELSIF NOT v_has_cron THEN
    RAISE NOTICE 'pg_cron NOT installed — run partman.run_maintenance() via external cron (see medusa/src/jobs/partition-maintenance.ts)';
  END IF;

  RAISE NOTICE 'pg_partman setup complete. Attempted: %, succeeded: %, deferred (has data): %, already partitioned: %',
    array_length(v_attempted, 1),
    COALESCE(array_length(v_succeeded, 1), 0),
    COALESCE(array_length(v_skipped_data, 1), 0),
    COALESCE(array_length(v_skipped_already, 1), 0);

  INSERT INTO admin.migration_log (migration_file, notes, status)
  VALUES (
    '40_pg_partman_real.sql',
    format('partitioned: %s | deferred: %s | already: %s',
           COALESCE(array_length(v_succeeded, 1), 0),
           COALESCE(array_length(v_skipped_data, 1), 0),
           COALESCE(array_length(v_skipped_already, 1), 0)),
    'success'
  );
END $partman_setup$;
