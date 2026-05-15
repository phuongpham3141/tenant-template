-- Migration 36: Advanced Indexes (pgvector HNSW + composite GIN + time-series BRIN)
\set ON_ERROR_STOP on

-- Most indexes already created in earlier migrations.
-- This file adds advanced indexes that benefit from being applied at the end.

-- Time-series BRIN on high-volume tables (already partial coverage)
CREATE INDEX IF NOT EXISTS idx_audit_event_brin ON audit.audit_event USING BRIN (occurred_at);

-- Trigram GIN for full-text fuzzy search on product titles
CREATE INDEX IF NOT EXISTS idx_product_title_en_trgm ON catalog.product USING GIN ((title_i18n->>'en') gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_product_title_cn_trgm ON catalog.product USING GIN ((title_i18n->>'cn') gin_trgm_ops);

-- Composite GIN on supplier tags + categories
CREATE INDEX IF NOT EXISTS idx_supplier_tags_categories ON identity.supplier USING GIN (tags, category_ids);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_order_supplier_status ON ord."order" (supplier_id, status, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_order_customer_status ON ord."order" (customer_id, status, created_at DESC) WHERE deleted_at IS NULL;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('36_indexes_advanced.sql', 'Advanced indexes (BRIN, GIN composite, trigram per-locale)');
