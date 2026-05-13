-- Migration 37: Audit Triggers (emit to audit_event on changes)
\set ON_ERROR_STOP on

-- Attach audit triggers to critical entities for change tracking.
-- Only attach to entities marked as audit-relevant per policy.

DO $audit$
DECLARE
  rec RECORD;
  audit_relevant_tables TEXT[] := ARRAY[
    'identity.user',
    'identity.supplier',
    'identity.kyc_document',
    'identity.verification_record',
    'rbac.user_role_assignment',
    'rbac.role_permission_grant',
    'rbac.break_glass_access',
    'gdpr.consent_record',
    'gdpr.data_subject_request',
    'gdpr.data_breach_incident',
    'gdpr.data_deletion_execution',
    'auth.security_event_log',
    'catalog.product',
    'catalog.master_product',
    'brand.brand_catalog_lock',
    'brand.takedown_action',
    'brand.ip_violator_blacklist',
    'ord.order',
    'ord.order_revision',
    'payment.escrow',
    'payment.escrow_milestone',
    'payment.payout',
    'payment.chargeback_case',
    'dispute.dispute',
    'dispute.arbitration_record',
    'dispute.aml_flag',
    'dispute.aml_report',
    'dispute.supplier_strike'
  ];
  full_table TEXT;
  schema_name TEXT;
  table_name TEXT;
BEGIN
  FOREACH full_table IN ARRAY audit_relevant_tables LOOP
    schema_name := split_part(full_table, '.', 1);
    table_name := split_part(full_table, '.', 2);

    -- Check table exists
    IF EXISTS (
      SELECT 1 FROM pg_tables WHERE schemaname = schema_name AND tablename = table_name
    ) THEN
      EXECUTE format('DROP TRIGGER IF EXISTS trg_%s_audit ON %I.%I', table_name, schema_name, table_name);
      EXECUTE format(
        'CREATE TRIGGER trg_%s_audit AFTER INSERT OR UPDATE OR DELETE ON %I.%I FOR EACH ROW EXECUTE FUNCTION public.trigger_emit_audit_event()',
        table_name, schema_name, table_name
      );
      RAISE NOTICE 'Audit trigger attached: %.%', schema_name, table_name;
    END IF;
  END LOOP;
END $audit$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('37_triggers_audit.sql', 'Audit triggers attached to 27 critical entities');
