-- Migration 51: communication.conversation_code_seq
-- Sprint 10 Pha 2a Bước 1 (D21 resolve, RED #1)
-- Reference: P9B-PHA2B-ESCALATE-D21.md + docs/sprint-10/L20-audit-report.md
-- Per Rule 6: schema change qua migration file
-- Created: 2026-05-17
--
-- Mục đích: Tạo sequence cho rfq.rfq.code style ("CONV-XXX")
-- Sequence chia tay với rfq_number_seq (mig 50) — namespace communication

BEGIN;

CREATE SEQUENCE IF NOT EXISTS communication.conversation_code_seq
  START WITH 1000
  INCREMENT BY 1
  MINVALUE 1000
  CACHE 1;

COMMENT ON SEQUENCE communication.conversation_code_seq IS
  'Sequence cho communication.conversation.code (Sprint 10 Pha 2a D21 resolve). Start 1000 cho code 4+ digits.';

INSERT INTO admin.migration_log (migration_file, status, applied_at, notes)
VALUES (
  '51_communication_sequences.sql',
  'success',
  NOW(),
  'Sprint 10 Pha 2a: conversation_code_seq tạo cho D21 communication rewrite'
);

COMMIT;
