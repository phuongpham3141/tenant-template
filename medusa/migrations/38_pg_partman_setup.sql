-- Migration 38: pg_partman partition setup for high-volume tables
\set ON_ERROR_STOP on

DO $partman$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_partman') THEN
    RAISE WARNING 'pg_partman not installed — skipping partition setup. Install postgresql-16-partman to enable.';
    INSERT INTO admin.migration_log (migration_file, notes, status)
    VALUES ('38_pg_partman_setup.sql', 'pg_partman unavailable in dev image', 'success');
    RETURN;
  END IF;
END $partman$;

-- High-volume tables that benefit from monthly partitioning:
-- audit.audit_event (~10M/day)
-- advertising.ads_impression_log (~50M/day)
-- advertising.ads_click_log (~1M/day)
-- search.search_query_log (~5M/day)
-- personalization.user_behavior_event (~30M/day)
-- email_mkt.email_log (~1M/day)
-- communication.conversation_message (~5M/day)
-- live.livestream_chat_message (~10M/day peak)
-- auth.login_attempt_log (~500K/day)
-- api.api_call_log (~10M/day)

-- pg_partman setup template (run when extension available):
-- SELECT partman.create_parent(
--   p_parent_table => 'audit.audit_event',
--   p_control => 'occurred_at',
--   p_type => 'range',
--   p_interval => '1 month',
--   p_premake => 3
-- );

-- Repeat for each high-volume table when pg_partman installed.
-- Setup pg_cron to call partman.run_maintenance() daily.

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('38_pg_partman_setup.sql', 'Partition setup placeholder (requires pg_partman extension)');
