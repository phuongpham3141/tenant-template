-- Migration 49: Recreate critical non-FK indexes (Sprint 8 Pha 2 — P3.D7-F1)
--
-- ⛔ TEMPLATE FILE — NOT applied trong Sprint 8 Pha 2.
-- Actual index statements sẽ fill Sprint 9 SAU khi:
-- 1. D10 fixed (Medusa server functional)
-- 2. Staging deployed (Sprint 9 prep)
-- 3. Load test chạy 24-48h → collect pg_stat_user_indexes real traffic data
-- 4. Categorize 44 indexes theo A/B/C/D framework (sprint-08-indexes-evaluation.md)
-- 5. Fill exact CREATE INDEX statements cho Category A (CRITICAL ~15 indexes)
--
-- Pattern: CREATE INDEX IF NOT EXISTS (idempotent, safe rollback)
-- ============================================================
-- BEGIN MIGRATION 49 (TEMPLATE — Sprint 9 fill)
-- ============================================================

-- Category A: CRITICAL indexes (idx_scan > 1000/day theo staging traffic)
-- Recreate sau mig 46 catalog→public sync drop.

-- Example structure (Sprint 9 fill actual list):
-- CREATE INDEX IF NOT EXISTS idx_product_status_tenant
--   ON public.product (status, tenant_id)
--   WHERE deleted_at IS NULL;
--
-- CREATE INDEX IF NOT EXISTS idx_order_customer_status
--   ON public."order" (customer_id, status, created_at DESC);
--
-- CREATE INDEX IF NOT EXISTS idx_audit_event_actor
--   ON audit.audit_event (actor_id, occurred_at DESC);
--
-- ... (Sprint 9 fill remaining ~12 indexes)

-- ============================================================
-- Sprint 9 procedure:
-- 1. Connect staging Postgres
-- 2. Run query:
--    SELECT schemaname || '.' || relname AS table_name, indexrelname, idx_scan
--    FROM pg_stat_user_indexes
--    WHERE indexrelname NOT LIKE '%_pkey'
--      AND indexrelname NOT LIKE 'idx_fk_%'
--    ORDER BY idx_scan DESC;
-- 3. Identify ~15 indexes with idx_scan > 1000 (after 24-48h staging traffic)
-- 4. Replace this template với actual CREATE INDEX statements
-- 5. Apply migration: npx medusa db:migrate
-- ============================================================

-- Placeholder INSERT để migration log track
INSERT INTO admin.migration_log (migration_file, status, notes)
VALUES ('49_recreate_critical_indexes.sql', 'pending',
        'Sprint 8 Pha 2 P3.D7-F1 template. Actual index statements deferred Sprint 9 (cần staging traffic data + D10 fix). Framework methodology trong sprint-08-indexes-evaluation.md.');

-- ============================================================
-- END MIGRATION 49 (TEMPLATE)
-- ============================================================
