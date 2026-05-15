-- Migration 42: Fix 8 tenant.* tables với RLS ENABLED nhưng NO POLICY
-- Phát hiện: Sprint 1 P1.6 R23 validation CHECK 03
-- Risk pre-fix: silent block all SELECT/INSERT/UPDATE/DELETE

BEGIN;

-- Helper function (idempotent — đã exist, CREATE OR REPLACE giữ signature VARCHAR)
CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS VARCHAR AS $$
BEGIN
  RETURN current_setting('app.current_tenant', true);
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;

-- 8 tables fix
DO $$
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[
    'tenant.tenant_billing_account',
    'tenant.tenant_branding',
    'tenant.tenant_data_residency_policy',
    'tenant.tenant_domain',
    'tenant.tenant_feature_entitlement',
    'tenant.tenant_overage_charge',
    'tenant.tenant_plan_subscription',
    'tenant.tenant_usage_metering'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %s 
       USING (tenant_id = public.current_tenant_id() 
              OR pg_has_role(''csr_admin'', ''MEMBER''))',
      tbl
    );
  END LOOP;
END $$;

-- Log
INSERT INTO admin.migration_log (migration_file, status, applied_at, notes)
VALUES ('42_fix_tenant_rls_policies.sql', 'success', NOW(), 
        'Fixed 8 tenant.* tables with RLS enabled but no policy. Sprint 2 Day 1 P0 fix.');

COMMIT;
