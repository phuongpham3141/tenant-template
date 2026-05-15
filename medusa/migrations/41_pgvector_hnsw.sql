-- Migration 41: pgvector REAL setup with HNSW indexes for production
-- Requires pgvector >= 0.5.0 (HNSW support added in 0.5)
-- If table currently uses JSONB embedding column, this migration converts to vector(1536).

\set ON_ERROR_STOP on

DO $pgvector_setup$
DECLARE
  v_has_vector BOOLEAN;
  v_col_type TEXT;
  v_row_count BIGINT;
BEGIN
  -- 1. Ensure extension
  SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') INTO v_has_vector;
  IF NOT v_has_vector THEN
    BEGIN
      CREATE EXTENSION vector;
      RAISE NOTICE 'pgvector extension installed';
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'pgvector not available: % — skipping HNSW setup. Install pgvector and retry.', SQLERRM;
      INSERT INTO admin.migration_log (migration_file, notes, status)
      VALUES ('41_pgvector_hnsw.sql', 'pgvector extension unavailable', 'skipped');
      RETURN;
    END;
  END IF;

  -- 2. Convert ai.ai_embedding_doc.embedding from JSONB to vector(1536) if needed
  SELECT data_type INTO v_col_type
  FROM information_schema.columns
  WHERE table_schema = 'ai' AND table_name = 'ai_embedding_doc' AND column_name = 'embedding';

  IF v_col_type = 'jsonb' THEN
    SELECT COUNT(*) INTO v_row_count FROM ai.ai_embedding_doc WHERE embedding IS NOT NULL;
    RAISE NOTICE 'Converting ai.ai_embedding_doc.embedding from JSONB → vector(1536) (% rows)', v_row_count;

    -- Drop dependent indexes
    DROP INDEX IF EXISTS ai.idx_embed_hnsw;
    DROP INDEX IF EXISTS ai.idx_embed_ivf;

    -- Add new column, copy data, swap
    ALTER TABLE ai.ai_embedding_doc ADD COLUMN embedding_vec vector(1536);

    -- Convert JSONB array → vector. Skip rows where JSONB isn't a length-1536 array.
    UPDATE ai.ai_embedding_doc
    SET embedding_vec = (embedding::text)::vector(1536)
    WHERE embedding IS NOT NULL
      AND jsonb_typeof(embedding) = 'array'
      AND jsonb_array_length(embedding) = 1536;

    -- Report rows that failed conversion (wrong shape)
    DECLARE
      v_failed BIGINT;
    BEGIN
      SELECT COUNT(*) INTO v_failed
      FROM ai.ai_embedding_doc
      WHERE embedding IS NOT NULL AND embedding_vec IS NULL;
      IF v_failed > 0 THEN
        RAISE WARNING '% rows had JSONB embeddings with wrong shape; their vector column is NULL (data preserved in old JSONB column for inspection)', v_failed;
      END IF;
    END;

    -- Rename old JSONB column to preserve, then rename new vector column to canonical name
    ALTER TABLE ai.ai_embedding_doc RENAME COLUMN embedding TO embedding_legacy_jsonb;
    ALTER TABLE ai.ai_embedding_doc RENAME COLUMN embedding_vec TO embedding;
  ELSIF v_col_type IS NULL THEN
    RAISE WARNING 'ai.ai_embedding_doc.embedding column not found — schema mismatch';
    RETURN;
  ELSE
    RAISE NOTICE 'ai.ai_embedding_doc.embedding already non-JSONB (%) — proceeding to index creation', v_col_type;
  END IF;

  -- 3. Create HNSW index (preferred for query latency; build is slower but search is fastest)
  -- Parameters: m=16 (connectivity), ef_construction=64 (build quality)
  BEGIN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_embed_hnsw_cosine
             ON ai.ai_embedding_doc USING hnsw (embedding vector_cosine_ops)
             WITH (m = 16, ef_construction = 64)';
    RAISE NOTICE 'HNSW cosine index created on ai.ai_embedding_doc.embedding';
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'HNSW creation failed: % — falling back to IVF', SQLERRM;
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_embed_ivf_cosine
             ON ai.ai_embedding_doc USING ivfflat (embedding vector_cosine_ops)
             WITH (lists = 100)';
  END;

  -- 4. Set ef_search default for runtime queries (higher = better recall, slower)
  ALTER DATABASE medusa SET hnsw.ef_search = 100;

  -- 5. Filter index for hot path (active product embeddings)
  CREATE INDEX IF NOT EXISTS idx_embed_scope_active
    ON ai.ai_embedding_doc (scope_type, scope_id)
    INCLUDE (embedding_model)
    ; -- (Day 4 Rule 6 fix: removed broken WHERE clause — ai_embedding_doc has no deleted_at column)

  -- 6. Stats for query planner
  ANALYZE ai.ai_embedding_doc;

  INSERT INTO admin.migration_log (migration_file, notes, status)
  VALUES ('41_pgvector_hnsw.sql', 'pgvector + HNSW index ready', 'success');
END $pgvector_setup$;
