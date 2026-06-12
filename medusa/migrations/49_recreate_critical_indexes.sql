-- Migration 49: Critical indexes evaluation — EVIDENCE-BASED CLOSURE (Sprint 12 Pha 6)
--
-- Lịch sử:
-- - Sprint 8 Pha 2 (P3.D7-F1): template file chờ load test data — 44 non-FK indexes
--   bị drop trong mig 46 partition convert cần evaluate trước khi recreate.
-- - Sprint 12 Pha 4-5: k6 load test 60 phút trên staging (53,301 requests, 14.76 rps
--   sustained, 5 scenarios: products browse + health + supplier writes 30/min +
--   auth registers 12/min + storefront SSR).
--
-- ============================================================
-- KẾT QUẢ PHÂN TÍCH pg_stat_statements + pg_stat_user_tables (Sprint 12)
-- ============================================================
--
-- 1. Cache hit ratio: index 99.99% + table 100.00% — toàn bộ working set trong RAM.
-- 2. Top queries: tất cả mean < 1.3ms (product list 1.21ms × 16K calls max).
-- 3. p95 HTTP = 95.53ms, median 25.35ms — không có slow query crisis.
-- 4. Seq scan đáng kể DUY NHẤT: public.region_country (16,307 scans × 250 rows).
--    → Bảng ĐÃ CÓ IDX_region_country_region_id. Planner CHỌN seq scan vì bảng
--    tiny (250 rows, vài pages) — seq RẺ HƠN index. ĐÚNG, không phải vấn đề.
-- 5. Custom schemas (catalog.*, rfq.*, identity.*...): 0 traffic trong load test
--    — storefront hiện chỉ chạm Medusa core (public schema). 44 indexes cũ thuộc
--    catalog.* sẽ chỉ có evidence khi catalog-ext UI lands (Sprint 13+).
--
-- ============================================================
-- QUYẾT ĐỊNH: KHÔNG tạo index mới (evidence-based YAGNI)
-- ============================================================
--
-- - Category A (critical theo traffic thật): 0 indexes — không có seq scan bệnh lý.
-- - Category B-D (44 indexes catalog.* cũ): DEFER đến khi catalog-ext UI có traffic.
--   Re-evaluate procedure (chạy lại sau khi UI lands):
--     SELECT schemaname||'.'||relname, seq_scan, seq_tup_read, idx_scan
--     FROM pg_stat_user_tables
--     WHERE seq_scan > 1000 AND n_live_tup > 10000
--     ORDER BY seq_tup_read DESC;
--
-- Migration này intentionally KHÔNG có DDL — chỉ log closure.
--
-- Bug fix so với template cũ: INSERT dùng status 'pending' vi phạm
-- migration_log_status_check (chỉ cho phép success/failed/rolled_back).

INSERT INTO admin.migration_log (migration_file, status, notes)
VALUES ('49_recreate_critical_indexes.sql', 'success',
        'Sprint 12 Pha 6 EVIDENCE-BASED CLOSURE. k6 60min 53K requests: cache hit 99.99-100%, p95 95ms, 0 pathological seq scans (region_country seq = planner-optimal tiny table). 0 indexes created (YAGNI). 44 catalog.* indexes defer đến catalog-ext UI traffic Sprint 13+. Re-evaluate procedure documented in file.')
ON CONFLICT DO NOTHING;
