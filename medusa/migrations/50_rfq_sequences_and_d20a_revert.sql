-- Migration 50: rfq sequences + D20-a REVERT 'cybersilkroads' → 'csr' canonical
-- Sprint 9B Pha 1d-a v2 Bước 1
-- Reference: P9B-PHA1D-A-ESCALATE-D20A-EXPANDED.md
-- Per Rule 6: schema change qua migration file
-- Created: 2026-05-16
--
-- Fix 1: Tạo 2 sequences (admin.rfq_number_seq + admin.quote_number_seq) — D19 fix
-- Fix 2: D20-a REVERT Sprint 9A deviation 'cybersilkroads' → 'csr' canonical
--
-- Canonical: Sprint 1 R20 design 'csr' (15 tables defaults + 48+ rows + RLS role csr_admin)
-- Deviation: Sprint 9A 7 supplier_application rows + 4 endpoint defaults
-- KHÔNG ALTER DEFAULT (Sprint 1 R20 defaults đã đúng 'csr')

BEGIN;

-- ===== Fix 1: Sequences (D19) =====
CREATE SEQUENCE IF NOT EXISTS admin.rfq_number_seq
  START WITH 1000
  INCREMENT BY 1
  MINVALUE 1000
  CACHE 1;

COMMENT ON SEQUENCE admin.rfq_number_seq IS
  'Sequence cho rfq.rfq.code (Sprint 9B Pha 1d-a v2). Start 1000 cho code 4+ digits.';

CREATE SEQUENCE IF NOT EXISTS admin.quote_number_seq
  START WITH 1000
  INCREMENT BY 1
  MINVALUE 1000
  CACHE 1;

COMMENT ON SEQUENCE admin.quote_number_seq IS
  'Sequence cho rfq.rfq_quote (Sprint 9B Pha 1d-a v2). Start 1000 cho code 4+ digits.';

-- ===== Fix 2: D20-a REVERT Sprint 9A deviation =====
-- CHỈ UPDATE rows Sprint 9A đã ghi sai (7 supplier_application 'cybersilkroads' → 'csr')

UPDATE public.supplier_application
  SET tenant_id = 'csr'
  WHERE tenant_id = 'cybersilkroads';

-- ===== Log migration =====
INSERT INTO admin.migration_log (migration_file, status, applied_at, notes)
VALUES (
  '50_rfq_sequences_and_d20a_revert.sql',
  'success',
  NOW(),
  'Sprint 9B Pha 1d-a v2: D19 sequences + D20-a REVERT supplier_application cybersilkroads → csr canonical'
);

COMMIT;
