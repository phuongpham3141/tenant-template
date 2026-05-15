-- Migration 45: Idempotent fix for mig 41 state lệch (Sprint 2 Day 4 — Rule 6 retro fix)
--
-- Background:
--   Day 3 Bước 3c.8 vi phạm Rule 6 (codify Day 4): manual ad-hoc ALTER TABLE
--   + CREATE INDEX + INSERT migration_log mà không qua migration file.
--   Hậu quả: VM state lệch khỏi file repo:
--     - HNSW index name SAI: `idx_embed_hnsw_cos` (file expects `idx_embed_hnsw_cosine`)
--     - HNSW params DEFAULT (file expects m=16, ef_construction=64)
--     - Missing `idx_embed_scope_active` (mig 41 step 5 fail do WHERE bug)
--
-- Mig 45 fix retroactively:
--   - DROP wrong-name HNSW index
--   - CREATE correct-name HNSW with explicit params
--   - CREATE missing partial scope_active index (after mig 41 WHERE clause fixed)
--   - Idempotent: re-run safe (IF EXISTS / IF NOT EXISTS guards)
--
-- Created: 2026-05-15 (Sprint 2 Day 4)

BEGIN;

-- 1. Drop wrong-name HNSW index (was created ad-hoc Day 3)
DROP INDEX IF EXISTS ai.idx_embed_hnsw_cos;

-- 2. Create canonical HNSW index với explicit params (matches mig 41 file)
CREATE INDEX IF NOT EXISTS idx_embed_hnsw_cosine
  ON ai.ai_embedding_doc USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- 3. Create scope_active covering index (after mig 41 WHERE fix)
CREATE INDEX IF NOT EXISTS idx_embed_scope_active
  ON ai.ai_embedding_doc (scope_type, scope_id)
  INCLUDE (embedding_model);

-- 4. Update mig 41 log entry: change to '(deferred, completed by mig 45)' for clarity
UPDATE admin.migration_log
SET notes = notes || ' | UPDATED by mig 45: HNSW renamed, scope_active added, state synced with repo file.'
WHERE migration_file = '41_pgvector_hnsw.sql'
  AND notes LIKE '%Manual completion%';

-- 5. Log mig 45
INSERT INTO admin.migration_log (migration_file, status, applied_at, notes)
VALUES ('45_fix_mig41_hnsw_idempotent.sql', 'success', NOW(),
        'Rule 6 retro fix: rebuild HNSW with canonical name + params, add idx_embed_scope_active. Sprint 2 Day 4.');

COMMIT;
