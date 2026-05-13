-- ============================================================================
-- Cybersilkroads — Migration 10: Payment, Escrow & Payment Abstraction (Domain 6 + 35)
-- ============================================================================
-- Tables: escrow, escrow_milestone, payment_transaction, fx_snapshot, payout,
--         billing_charge, bank_account, payment_processor_master,
--         payment_processor_config, payment_routing_rule, payment_method_token,
--         payment_attempt_log, three_ds_authentication_record,
--         payment_processor_fee_schedule, chargeback_case, chargeback_evidence,
--         chargeback_outcome, pci_compliance_scope_record,
--         payment_reconciliation_record
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- payment.fx_snapshot — FX rate snapshots (per Q-FU3 float)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.fx_snapshot (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr',
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  source                 VARCHAR(40) NOT NULL CHECK (source IN ('vcb_api','bidv_api','openexchange','ecb','xe_com','manual_admin')),
  snapshot_date          DATE NOT NULL,
  snapshot_time          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  rates                  JSONB NOT NULL,                                  -- {USD:1, VND:24500, CNY:7.15, EUR:0.92, ...}
  buffer_pct             NUMERIC(5,3) NOT NULL DEFAULT 1.500,
  applied_from_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  applied_until_at       TIMESTAMPTZ,

  UNIQUE (snapshot_date, source)
);

CREATE INDEX IF NOT EXISTS idx_fx_snapshot_date ON payment.fx_snapshot (snapshot_date DESC);
CREATE INDEX IF NOT EXISTS idx_fx_snapshot_applied ON payment.fx_snapshot (applied_from_at DESC) WHERE applied_until_at IS NULL;

COMMENT ON TABLE payment.fx_snapshot IS 'Daily FX rate snapshots. Each money txn references a snapshot for audit.';

-- ----------------------------------------------------------------------------
-- payment.bank_account — Sàn + supplier + user bank accounts
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.bank_account (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  owner_type             VARCHAR(20) NOT NULL CHECK (owner_type IN ('platform','supplier','user','escrow_holding')),
  owner_id               UUID,                                            -- supplier_id or user_id (NULL if platform)
  provider               VARCHAR(30) NOT NULL CHECK (provider IN
    ('vcb','bidv','mb','tcb','vietin','sacombank','acb','agribank','tpb',
     'icbc_cn','abc_cn','boc_cn','ccb_cn','psbc_cn','cmb_cn',
     'alipay','wechat_pay','momo','zalopay','vnpay',
     'binance','okx','usdt_trc20','usdt_erc20',
     'swift_correspondent','wise','remitly')),
  account_type           VARCHAR(20) NOT NULL CHECK (account_type IN ('checking','savings','escrow','wallet','virtual','crypto')),
  account_currency       CHAR(3) NOT NULL,

  -- PCI-relevant: encrypt at rest, mask in display
  account_number_masked  VARCHAR(40) NOT NULL,                            -- e.g., "**** **** 1234"
  account_number_encrypted TEXT NOT NULL,                                  -- AES-256, KMS managed
  account_holder_name    VARCHAR(255) NOT NULL,
  swift_code             VARCHAR(20),
  routing_number         VARCHAR(20),
  iban                   VARCHAR(40),
  wallet_address         VARCHAR(120),                                    -- For crypto
  branch_name            VARCHAR(200),
  branch_country_code    CHAR(2),

  verification_status    VARCHAR(20) NOT NULL DEFAULT 'unverified'
                          CHECK (verification_status IN ('unverified','micro_deposit_pending','verified','rejected','suspended')),
  verified_at            TIMESTAMPTZ,
  verified_by_user_id    UUID REFERENCES identity."user"(id),
  is_primary             BOOLEAN NOT NULL DEFAULT FALSE,
  preference_rank        SMALLINT NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_bank_account_owner ON payment.bank_account (owner_type, owner_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_bank_account_provider ON payment.bank_account (provider) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_bank_account_verified ON payment.bank_account (owner_type, owner_id) WHERE verification_status = 'verified' AND deleted_at IS NULL;

-- ----------------------------------------------------------------------------
-- payment.escrow — Per-order escrow (Intermediary mode)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.escrow (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  order_id               UUID NOT NULL UNIQUE REFERENCES ord."order"(id) ON DELETE RESTRICT,
  holding_bank_account_id UUID NOT NULL REFERENCES payment.bank_account(id),

  currency_held          CHAR(3) NOT NULL,
  amount_held_minor      BIGINT NOT NULL DEFAULT 0,
  amount_held_usd_minor  BIGINT NOT NULL DEFAULT 0,
  amount_released_minor  BIGINT NOT NULL DEFAULT 0,
  amount_refunded_minor  BIGINT NOT NULL DEFAULT 0,
  withholding_amount_minor BIGINT NOT NULL DEFAULT 0,                     -- Dispute reserve
  withholding_release_at TIMESTAMPTZ,

  status                 VARCHAR(30) NOT NULL DEFAULT 'pending_deposit'
                          CHECK (status IN ('pending_deposit','holding','partial_released','fully_released',
                                            'disputed_frozen','refunded','partially_refunded','closed')),
  opened_at              TIMESTAMPTZ,
  closed_at              TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_escrow_order ON payment.escrow (order_id);
CREATE INDEX IF NOT EXISTS idx_escrow_status ON payment.escrow (tenant_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_escrow_active_amount ON payment.escrow (tenant_id) WHERE status IN ('holding','partial_released');

-- Now add FK from ord."order".escrow_id
DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_escrow_fk') THEN
    ALTER TABLE ord."order" ADD CONSTRAINT order_escrow_fk
      FOREIGN KEY (escrow_id) REFERENCES payment.escrow(id) ON DELETE SET NULL;
  END IF;
END $fk$;

DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_fx_fk') THEN
    ALTER TABLE ord."order" ADD CONSTRAINT order_fx_fk
      FOREIGN KEY (fx_snapshot_id) REFERENCES payment.fx_snapshot(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cart_fx_fk') THEN
    ALTER TABLE cart.cart ADD CONSTRAINT cart_fx_fk
      FOREIGN KEY (fx_snapshot_id) REFERENCES payment.fx_snapshot(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'checkout_fx_fk') THEN
    ALTER TABLE cart.checkout_session ADD CONSTRAINT checkout_fx_fk
      FOREIGN KEY (fx_snapshot_id_quoted) REFERENCES payment.fx_snapshot(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'rfq_quote_fx_fk') THEN
    ALTER TABLE rfq.rfq_quote ADD CONSTRAINT rfq_quote_fx_fk
      FOREIGN KEY (fx_snapshot_id) REFERENCES payment.fx_snapshot(id) ON DELETE SET NULL;
  END IF;
END $fk$;

-- ----------------------------------------------------------------------------
-- payment.escrow_milestone — Release milestones (Q-D11/Q-D12)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.escrow_milestone (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  escrow_id              UUID NOT NULL REFERENCES payment.escrow(id) ON DELETE CASCADE,
  position               SMALLINT NOT NULL,
  percentage             NUMERIC(5,2) NOT NULL CHECK (percentage > 0 AND percentage <= 100),
  amount_minor           BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  trigger_event          VARCHAR(40) NOT NULL CHECK (trigger_event IN
    ('order_confirmed','manual','bl_uploaded','shipped','customs_cleared','delivered_confirmed','qc_passed','dispute_resolved')),
  grace_period_hours     SMALLINT NOT NULL DEFAULT 48,
  release_mode           VARCHAR(20) NOT NULL DEFAULT 'auto_with_grace'
                          CHECK (release_mode IN ('auto_immediate','auto_with_grace','manual_only','requires_qc','requires_approval')),
  triggered_at           TIMESTAMPTZ,
  released_at            TIMESTAMPTZ,
  released_by_user_id    UUID REFERENCES identity."user"(id),
  disputed_at            TIMESTAMPTZ,
  status                 VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','ready_to_release','released','disputed_held','cancelled','refunded')),

  UNIQUE (escrow_id, position)
);

CREATE INDEX IF NOT EXISTS idx_milestone_escrow ON payment.escrow_milestone (escrow_id, position);
CREATE INDEX IF NOT EXISTS idx_milestone_pending ON payment.escrow_milestone (triggered_at) WHERE status = 'ready_to_release';
CREATE INDEX IF NOT EXISTS idx_milestone_grace ON payment.escrow_milestone (triggered_at, grace_period_hours) WHERE status = 'ready_to_release' AND triggered_at IS NOT NULL;

-- ----------------------------------------------------------------------------
-- payment.payment_processor_master — Master list of processors
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.payment_processor_master (
  code                   VARCHAR(40) PRIMARY KEY,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  name                   VARCHAR(120) NOT NULL,
  supported_currencies   TEXT[] NOT NULL DEFAULT '{}',
  supported_countries    TEXT[] NOT NULL DEFAULT '{}',
  supported_methods      TEXT[] NOT NULL DEFAULT '{}',                    -- card|wallet|bank|crypto|qr|cod
  api_version            VARCHAR(20),
  pci_certification      VARCHAR(30),                                     -- 'pci_service_provider_l1', 'saq_a'
  status                 VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','sunset','disabled'))
);

-- ----------------------------------------------------------------------------
-- payment.payment_processor_config — Per-tenant processor credentials
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.payment_processor_config (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  processor_code         VARCHAR(40) NOT NULL REFERENCES payment.payment_processor_master(code),
  api_key_encrypted      TEXT NOT NULL,
  api_secret_encrypted   TEXT,
  webhook_signing_secret TEXT,
  sandbox_mode           BOOLEAN NOT NULL DEFAULT FALSE,
  priority               INT NOT NULL DEFAULT 100,
  enabled_methods        TEXT[] NOT NULL DEFAULT '{}',
  min_amount_usd_minor   BIGINT,
  max_amount_usd_minor   BIGINT,
  supported_currencies   TEXT[] NOT NULL DEFAULT '{}',
  active                 BOOLEAN NOT NULL DEFAULT TRUE,

  UNIQUE (tenant_id, processor_code, sandbox_mode)
);

CREATE INDEX IF NOT EXISTS idx_processor_config_tenant ON payment.payment_processor_config (tenant_id, active);
CREATE INDEX IF NOT EXISTS idx_processor_config_priority ON payment.payment_processor_config (tenant_id, priority) WHERE active;

-- ----------------------------------------------------------------------------
-- payment.payment_routing_rule — Choose processor by rule
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.payment_routing_rule (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  priority               INT NOT NULL,
  rule_predicate         JSONB NOT NULL,                                  -- {currency, country, amount_range, method, user_tier}
  routes_to_processor_code VARCHAR(40) NOT NULL REFERENCES payment.payment_processor_master(code),
  fallback_processor_code VARCHAR(40) REFERENCES payment.payment_processor_master(code),
  success_rate_history_pct NUMERIC(5,2),
  active                 BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_routing_priority ON payment.payment_routing_rule (tenant_id, priority) WHERE active;

-- ----------------------------------------------------------------------------
-- payment.payment_method_token — Vaulted methods (PCI scope reduction)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.payment_method_token (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,

  user_id                UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  processor_code         VARCHAR(40) NOT NULL REFERENCES payment.payment_processor_master(code),
  processor_token        VARCHAR(255) NOT NULL,                           -- Token from processor (not raw PAN)
  method_type            VARCHAR(20) NOT NULL CHECK (method_type IN ('card','bank_account','wallet','qr','crypto')),
  last4                  VARCHAR(4),
  brand                  VARCHAR(20),                                     -- visa|mc|jcb|amex|unionpay|napas
  expiry_month           SMALLINT CHECK (expiry_month BETWEEN 1 AND 12),
  expiry_year            SMALLINT,
  billing_address_id     UUID,
  is_default             BOOLEAN NOT NULL DEFAULT FALSE,
  added_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at           TIMESTAMPTZ,
  status                 VARCHAR(20) NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active','expired','revoked','suspended','requires_reauthentication'))
);

CREATE INDEX IF NOT EXISTS idx_method_token_user ON payment.payment_method_token (user_id) WHERE deleted_at IS NULL AND status = 'active';
CREATE INDEX IF NOT EXISTS idx_method_token_default ON payment.payment_method_token (user_id) WHERE is_default = TRUE AND deleted_at IS NULL;

-- ----------------------------------------------------------------------------
-- payment.payment_transaction — Each money movement
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.payment_transaction (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  order_id               UUID REFERENCES ord."order"(id) ON DELETE RESTRICT,
  escrow_id              UUID REFERENCES payment.escrow(id) ON DELETE RESTRICT,
  milestone_id           UUID REFERENCES payment.escrow_milestone(id) ON DELETE SET NULL,

  direction              VARCHAR(30) NOT NULL CHECK (direction IN
    ('buyer_to_platform','platform_to_supplier','refund_to_buyer','platform_internal','chargeback_reversal')),
  payment_method         VARCHAR(20) NOT NULL,
  processor_code         VARCHAR(40) REFERENCES payment.payment_processor_master(code),

  amount_minor           BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  amount_usd_minor       BIGINT NOT NULL,
  fx_snapshot_id         UUID NOT NULL REFERENCES payment.fx_snapshot(id),
  fee_charged_minor      BIGINT NOT NULL DEFAULT 0,

  external_reference     VARCHAR(255),                                    -- Processor transaction ID
  bank_statement_match_id UUID,                                           -- Reconciliation reference
  idempotency_key        VARCHAR(120),

  status                 VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','processing','completed','failed','reversed','expired')),
  initiated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at           TIMESTAMPTZ,
  failure_reason         TEXT,

  UNIQUE (idempotency_key, tenant_id)
);

CREATE INDEX IF NOT EXISTS idx_pay_tx_order ON payment.payment_transaction (order_id, initiated_at DESC);
CREATE INDEX IF NOT EXISTS idx_pay_tx_escrow ON payment.payment_transaction (escrow_id, initiated_at DESC);
CREATE INDEX IF NOT EXISTS idx_pay_tx_status ON payment.payment_transaction (tenant_id, status, initiated_at DESC);
CREATE INDEX IF NOT EXISTS idx_pay_tx_external_ref ON payment.payment_transaction (external_reference) WHERE external_reference IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_pay_tx_direction ON payment.payment_transaction (direction, status, initiated_at DESC);

-- ----------------------------------------------------------------------------
-- payment.payment_attempt_log — Track each attempt (success+fail)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.payment_attempt_log (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  order_id               UUID REFERENCES ord."order"(id) ON DELETE SET NULL,
  processor_code         VARCHAR(40),
  idempotency_key        VARCHAR(120),
  amount_minor           BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  status                 VARCHAR(20) NOT NULL,
  processor_response_code VARCHAR(40),
  processor_response_message TEXT,
  latency_ms             INT,
  fraud_check_result     VARCHAR(20) CHECK (fraud_check_result IN ('approve','review','decline','error')),
  three_ds_required      BOOLEAN NOT NULL DEFAULT FALSE,
  three_ds_completed     BOOLEAN,
  fee_charged_minor      BIGINT DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_pay_attempt_order ON payment.payment_attempt_log (order_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pay_attempt_brin ON payment.payment_attempt_log USING BRIN (created_at);
CREATE INDEX IF NOT EXISTS idx_pay_attempt_failed ON payment.payment_attempt_log (processor_code, status, created_at DESC) WHERE status = 'failed';

-- ----------------------------------------------------------------------------
-- payment.three_ds_authentication_record
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.three_ds_authentication_record (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  payment_attempt_id     UUID REFERENCES payment.payment_attempt_log(id) ON DELETE SET NULL,
  three_ds_version       VARCHAR(10) CHECK (three_ds_version IN ('1.0','2.0','2.1','2.2','2.3')),
  eci_value              VARCHAR(10),
  authentication_value   VARCHAR(255),
  transaction_id         VARCHAR(120),
  status                 VARCHAR(20) NOT NULL CHECK (status IN ('authenticated','attempted','failed','exempted','not_applicable')),
  liability_shift        BOOLEAN NOT NULL DEFAULT FALSE,
  challenge_required     BOOLEAN NOT NULL DEFAULT FALSE,
  challenge_completed_at TIMESTAMPTZ,
  cardholder_response_jsonb JSONB
);

CREATE INDEX IF NOT EXISTS idx_3ds_attempt ON payment.three_ds_authentication_record (payment_attempt_id);

-- ----------------------------------------------------------------------------
-- payment.payment_processor_fee_schedule
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.payment_processor_fee_schedule (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  processor_code         VARCHAR(40) NOT NULL REFERENCES payment.payment_processor_master(code),
  fee_type               VARCHAR(30) NOT NULL CHECK (fee_type IN ('per_transaction','percentage','min_max','interchange_plus','tiered')),
  fixed_fee_minor        BIGINT DEFAULT 0,
  percentage_pct         NUMERIC(6,4),
  min_fee_minor          BIGINT,
  max_fee_minor          BIGINT,
  currency               CHAR(3),
  applies_from           DATE NOT NULL,
  applies_until          DATE,
  applies_to_methods     TEXT[] DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_fee_schedule_processor ON payment.payment_processor_fee_schedule (processor_code, applies_from DESC);

-- ----------------------------------------------------------------------------
-- payment.payout — Payouts to suppliers
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.payout (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  order_id               UUID NOT NULL REFERENCES ord."order"(id),
  supplier_id            UUID NOT NULL REFERENCES identity.supplier(id),
  bank_account_id        UUID NOT NULL REFERENCES payment.bank_account(id),

  gross_amount_minor     BIGINT NOT NULL,
  commission_amount_minor BIGINT NOT NULL DEFAULT 0,
  withholding_amount_minor BIGINT NOT NULL DEFAULT 0,
  fee_amount_minor       BIGINT NOT NULL DEFAULT 0,
  net_amount_minor       BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  amount_usd_minor       BIGINT NOT NULL,
  fx_snapshot_id         UUID REFERENCES payment.fx_snapshot(id),

  payout_method          VARCHAR(30) NOT NULL CHECK (payout_method IN
    ('bank_vn','bank_cn','alipay','wechat_pay','usdt_trc20','usdt_erc20','swift','wise','momo','zalopay')),
  transaction_id         UUID REFERENCES payment.payment_transaction(id),

  status                 VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','processing','sent','confirmed','failed','reversed','on_hold')),
  scheduled_at           TIMESTAMPTZ NOT NULL,
  sent_at                TIMESTAMPTZ,
  confirmed_at           TIMESTAMPTZ,
  hold_reason            TEXT,

  CHECK (net_amount_minor = gross_amount_minor - commission_amount_minor - withholding_amount_minor - fee_amount_minor)
);

CREATE INDEX IF NOT EXISTS idx_payout_supplier ON payment.payout (supplier_id, scheduled_at DESC);
CREATE INDEX IF NOT EXISTS idx_payout_order ON payment.payout (order_id);
CREATE INDEX IF NOT EXISTS idx_payout_status ON payment.payout (tenant_id, status, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_payout_due ON payment.payout (scheduled_at) WHERE status IN ('pending','processing');

-- ----------------------------------------------------------------------------
-- payment.billing_charge — 11 revenue streams (Q-FU6)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.billing_charge (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  order_id               UUID REFERENCES ord."order"(id) ON DELETE SET NULL,
  charged_to_user_id     UUID REFERENCES identity."user"(id) ON DELETE SET NULL,
  charged_to_supplier_id UUID REFERENCES identity.supplier(id) ON DELETE SET NULL,

  stream_type            VARCHAR(40) NOT NULL CHECK (stream_type IN (
    'commission','subscription','escrow_fee','qc_fee','logistics_fee','insurance_fee',
    'customs_fee','listing_boost','tradeshow_booth','api_access','premium_data','custom')),
  amount_minor           BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  amount_usd_minor       BIGINT NOT NULL,
  rate_pct               NUMERIC(6,4),                                    -- If percentage-based
  base_amount_minor      BIGINT,                                          -- Base for pct calc
  invoice_id             UUID,                                            -- FK platform_invoice (created later)
  status                 VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','charged','paid','waived','refunded','disputed')),
  period_start           DATE,
  period_end             DATE,
  charged_at             TIMESTAMPTZ,

  CHECK (charged_to_user_id IS NOT NULL OR charged_to_supplier_id IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_billing_user ON payment.billing_charge (charged_to_user_id, created_at DESC) WHERE charged_to_user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_billing_supplier ON payment.billing_charge (charged_to_supplier_id, created_at DESC) WHERE charged_to_supplier_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_billing_stream ON payment.billing_charge (tenant_id, stream_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_billing_order ON payment.billing_charge (order_id) WHERE order_id IS NOT NULL;

-- ----------------------------------------------------------------------------
-- Chargeback management
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS payment.chargeback_case (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  case_code              VARCHAR(20) NOT NULL UNIQUE,
  payment_transaction_id UUID NOT NULL REFERENCES payment.payment_transaction(id),
  order_id               UUID REFERENCES ord."order"(id),
  processor_code         VARCHAR(40) NOT NULL,
  processor_case_id      VARCHAR(120),

  reason_code            VARCHAR(20),                                     -- vd Visa "10.4"
  category               VARCHAR(30) CHECK (category IN ('fraud','authorization','processing','consumer_dispute')),
  disputed_amount_minor  BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  reported_at            TIMESTAMPTZ NOT NULL,
  evidence_due_at        TIMESTAMPTZ NOT NULL,
  status                 VARCHAR(20) NOT NULL DEFAULT 'received'
                          CHECK (status IN ('received','evidence_in_progress','evidence_submitted','won','lost','accepted','withdrawn'))
);

CREATE INDEX IF NOT EXISTS idx_chargeback_tx ON payment.chargeback_case (payment_transaction_id);
CREATE INDEX IF NOT EXISTS idx_chargeback_status ON payment.chargeback_case (tenant_id, status, reported_at DESC);
CREATE INDEX IF NOT EXISTS idx_chargeback_due ON payment.chargeback_case (evidence_due_at) WHERE status IN ('received','evidence_in_progress');

CREATE TABLE IF NOT EXISTS payment.chargeback_evidence (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  case_id                UUID NOT NULL REFERENCES payment.chargeback_case(id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  evidence_type          VARCHAR(40) NOT NULL CHECK (evidence_type IN
    ('proof_of_delivery','customer_communication','signed_contract','tracking_info',
     'usage_log','shipping_address_match','3ds_authentication','refund_processed','other')),
  file_urls              TEXT[] NOT NULL DEFAULT '{}',
  description_i18n       JSONB,
  submitted_at           TIMESTAMPTZ,
  submitted_by_user_id   UUID REFERENCES identity."user"(id)
);

CREATE INDEX IF NOT EXISTS idx_chargeback_evidence_case ON payment.chargeback_evidence (case_id);

CREATE TABLE IF NOT EXISTS payment.chargeback_outcome (
  case_id                UUID PRIMARY KEY REFERENCES payment.chargeback_case(id) ON DELETE CASCADE,
  outcome                VARCHAR(20) NOT NULL CHECK (outcome IN ('won','lost','accepted','withdrawn')),
  decided_at             TIMESTAMPTZ NOT NULL,
  recovered_amount_minor BIGINT,
  lost_amount_minor      BIGINT,
  fee_charged_minor      BIGINT,
  root_cause_classification VARCHAR(60),
  prevent_recurrence_action_jsonb JSONB
);

CREATE TABLE IF NOT EXISTS payment.pci_compliance_scope_record (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  scope_classification   VARCHAR(40) NOT NULL CHECK (scope_classification IN
    ('saq_a','saq_a_ep','saq_b','saq_c','saq_d_merchant','saq_d_sp','service_provider_l1','service_provider_l2')),
  self_attestation_date  DATE,
  asv_scan_date          DATE,
  qsa_audit_date         DATE,
  expires_at             DATE,
  attestation_doc_url    TEXT,
  notes                  TEXT
);

CREATE INDEX IF NOT EXISTS idx_pci_tenant ON payment.pci_compliance_scope_record (tenant_id, self_attestation_date DESC);

CREATE TABLE IF NOT EXISTS payment.payment_reconciliation_record (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  processor_code         VARCHAR(40) NOT NULL,
  reconcile_date         DATE NOT NULL,
  settlements_received_minor BIGINT NOT NULL,
  orders_expected_minor  BIGINT NOT NULL,
  variance_minor         BIGINT NOT NULL,
  variance_reason_jsonb  JSONB,
  status                 VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','matched','under_review','escalated','resolved')),
  reconciled_by_user_id  UUID REFERENCES identity."user"(id),
  reconciled_at          TIMESTAMPTZ,

  UNIQUE (tenant_id, processor_code, reconcile_date)
);

CREATE INDEX IF NOT EXISTS idx_recon_variance ON payment.payment_reconciliation_record (reconcile_date DESC) WHERE variance_minor != 0;

-- Triggers (idempotent: drop+create pattern via DO block)
DO $tr$
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY['bank_account','escrow','escrow_milestone','payment_processor_master',
    'payment_processor_config','payment_transaction','payout','billing_charge','chargeback_case',
    'payment_method_token','payment_routing_rule','payment_processor_fee_schedule'];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%s_updated_at ON payment.%I', tbl, tbl);
    EXECUTE format('CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON payment.%I FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp()', tbl, tbl);
  END LOOP;
END $tr$;

-- Triggers handled by DO block above (idempotent drop+create)

-- RLS
DO $rls$
DECLARE rec RECORD;
BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname = 'payment'
  LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'payment' AND table_name = rec.tablename AND column_name = 'tenant_id') THEN
      EXECUTE format('ALTER TABLE payment.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON payment.%I', rec.tablename);
      EXECUTE format(
        'CREATE POLICY tenant_isolation ON payment.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
        rec.tablename
      );
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('10_payment_escrow.sql', 'Payment + Escrow + Processor Abstraction: 17 tables');

-- ============================================================================
-- END 10_payment_escrow.sql — 17 tables, ~40 indexes, 12 triggers, 17 RLS
-- ============================================================================
