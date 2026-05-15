-- Migration 44: Rollback migration 42 (redundant policies)
-- Phát hiện: Sprint 2 Day 2 audit P2.1-F1
-- 
-- Background:
--   Migration 42 (Day 1) tạo 8 tenant_isolation policies trên tenant.* tables
--   nhằm fix R23 CHECK 03 finding "RLS_ENABLED_BUT_NO_POLICY".
--   
--   Day 2 audit phát hiện: 
--   - tenant_self_* policies đã exist từ migration 02 (12/05), trước migration 35 (15/05)
--   - qual GIỐNG 100% với tenant_isolation
--   - R23 CHECK 03 là FALSE POSITIVE — query script không detect 
--     được tenant_self_* (do logic check khác)
--
--   → Migration 42 REDUNDANT. Rollback để giữ schema sạch.
--
-- Risk: NONE — drop tenant_isolation chỉ remove duplicate; tenant_self_* 
--       vẫn enforce isolation đúng.
--
-- Created: 2026-05-15

BEGIN;

-- Drop 8 redundant policies
DROP POLICY IF EXISTS tenant_isolation ON tenant.tenant_billing_account;
DROP POLICY IF EXISTS tenant_isolation ON tenant.tenant_branding;
DROP POLICY IF EXISTS tenant_isolation ON tenant.tenant_data_residency_policy;
DROP POLICY IF EXISTS tenant_isolation ON tenant.tenant_domain;
DROP POLICY IF EXISTS tenant_isolation ON tenant.tenant_feature_entitlement;
DROP POLICY IF EXISTS tenant_isolation ON tenant.tenant_overage_charge;
DROP POLICY IF EXISTS tenant_isolation ON tenant.tenant_plan_subscription;
DROP POLICY IF EXISTS tenant_isolation ON tenant.tenant_usage_metering;

-- Update migration_log: mark migration 42 as rolled_back
UPDATE admin.migration_log 
SET status = 'rolled_back',
    notes = notes || ' | ROLLED BACK by migration 44 — was redundant duplicate of tenant_self_* from migration 02. R23 CHECK 03 false positive.'
WHERE migration_file = '42_fix_tenant_rls_policies.sql';

-- Log migration 44
INSERT INTO admin.migration_log (migration_file, status, applied_at, notes)
VALUES ('44_rollback_migration_42.sql', 'success', NOW(),
        'Rolled back redundant migration 42. R23 CHECK 03 false positive — tenant_self_* from migration 02 already covered 8 tenant tables. Investigation: Sprint 2 Day 2.');

COMMIT;
