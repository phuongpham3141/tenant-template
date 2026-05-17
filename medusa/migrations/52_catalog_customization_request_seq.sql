-- Migration 52: catalog.customization_request_code_seq
-- Sprint 10 Pha 2b v2 Bước 1 (D25 Option B refactor — extend service với customization_request CRUD)
-- Reference: docs/sprint-10/L20-audit-report.md (D25) + Pha 2b drop commit 34d5ea6
-- Per Rule 6: schema change qua migration file
-- Created: 2026-05-17
--
-- Mục đích: Tạo sequence cho catalog.customization_request.code ("CUST-REQ-XXX")
-- Schema có `code` NOT NULL nhưng KHÔNG có default → application/sequence-generated

BEGIN;

CREATE SEQUENCE IF NOT EXISTS catalog.customization_request_code_seq
  START WITH 1000
  INCREMENT BY 1
  MINVALUE 1000
  CACHE 1;

COMMENT ON SEQUENCE catalog.customization_request_code_seq IS
  'Sequence cho catalog.customization_request.code (Sprint 10 Pha 2b v2). Start 1000 cho code 4+ digits.';

INSERT INTO admin.migration_log (migration_file, status, applied_at, notes)
VALUES (
  '52_catalog_customization_request_seq.sql',
  'success',
  NOW(),
  'Sprint 10 Pha 2b v2: customization_request_code_seq tạo cho D25 Option B refactor'
);

COMMIT;
