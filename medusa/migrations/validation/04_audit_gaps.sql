-- Find critical tables that should have audit triggers but don't.
-- Critical = tables mentioned in migration 37 audit_relevant_tables list.

\echo '============================================================'
\echo 'CHECK 04 — Audit trigger gaps'
\echo 'Critical tables without trg_*_audit AFTER trigger.'
\echo '============================================================'

WITH critical_tables(full_name) AS (
  VALUES
  ('identity.user'), ('identity.supplier'), ('identity.kyc_document'), ('identity.verification_record'),
  ('rbac.user_role_assignment'), ('rbac.role_permission_grant'), ('rbac.break_glass_access'),
  ('gdpr.consent_record'), ('gdpr.data_subject_request'), ('gdpr.data_breach_incident'),
  ('gdpr.data_deletion_execution'), ('auth.security_event_log'),
  ('catalog.product'), ('catalog.master_product'),
  ('brand.brand_catalog_lock'), ('brand.takedown_action'), ('brand.ip_violator_blacklist'),
  ('ord.order'), ('ord.order_revision'),
  ('payment.escrow'), ('payment.escrow_milestone'), ('payment.payout'), ('payment.chargeback_case'),
  ('dispute.dispute'), ('dispute.arbitration_record'), ('dispute.aml_flag'),
  ('dispute.aml_report'), ('dispute.supplier_strike'),
  ('live.ai_persona'), ('live.ai_stream_script'), ('live.ai_director_session')
),
parsed AS (
  SELECT
    split_part(full_name, '.', 1) AS schemaname,
    split_part(full_name, '.', 2) AS tablename
  FROM critical_tables
),
existing_triggers AS (
  SELECT
    n.nspname AS schemaname,
    c.relname AS tablename,
    tg.tgname AS trigname
  FROM pg_trigger tg
  JOIN pg_class c ON c.oid = tg.tgrelid
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE NOT tg.tgisinternal
    AND tg.tgname LIKE 'trg_%_audit'
)
SELECT
  p.schemaname || '.' || p.tablename AS critical_table,
  CASE
    WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables t
                     WHERE t.table_schema = p.schemaname AND t.table_name = p.tablename) THEN 'TABLE_MISSING'
    WHEN et.trigname IS NULL THEN 'AUDIT_TRIGGER_MISSING'
    ELSE 'OK'
  END AS status,
  format('CREATE TRIGGER trg_%s_audit AFTER INSERT OR UPDATE OR DELETE ON %I.%I FOR EACH ROW EXECUTE FUNCTION public.trigger_emit_audit_event();',
    p.tablename, p.schemaname, p.tablename) AS fix_ddl
FROM parsed p
LEFT JOIN existing_triggers et ON et.schemaname = p.schemaname AND et.tablename = p.tablename
WHERE
  NOT EXISTS (SELECT 1 FROM existing_triggers x WHERE x.schemaname = p.schemaname AND x.tablename = p.tablename)
ORDER BY p.schemaname, p.tablename;
