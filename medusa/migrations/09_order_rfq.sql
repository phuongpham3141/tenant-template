-- ============================================================================
-- Cybersilkroads — Migration 09: Order & RFQ (Domain 5)
-- ============================================================================
-- Tables: rfq, rfq_invited_supplier, rfq_quote, order, order_item,
--         order_revision, order_event, b2b_approval_workflow, b2b_approval_request
-- Depends on: 08_cart_checkout.sql
-- Note: "order" is PG keyword → schema "ord", table name "order" must be quoted
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- rfq.rfq — Request for Quotation (B2B core)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rfq.rfq (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  code                   VARCHAR(20) NOT NULL UNIQUE,                     -- RFQ-XXXXXX
  buyer_id               UUID NOT NULL REFERENCES identity."user"(id),
  title_i18n             JSONB NOT NULL,
  description_i18n       JSONB NOT NULL,
  category_id            UUID REFERENCES taxonomy.medusa_category(id),
  attachment_urls        TEXT[] DEFAULT '{}',

  target_quantity        INT NOT NULL CHECK (target_quantity > 0),
  unit_code              VARCHAR(20) NOT NULL REFERENCES common.unit_master(code),

  budget_min_usd_minor   BIGINT,
  budget_max_usd_minor   BIGINT,
  CHECK (budget_min_usd_minor IS NULL OR budget_max_usd_minor IS NULL OR budget_max_usd_minor >= budget_min_usd_minor),

  desired_port           VARCHAR(40),
  urgency                VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK (urgency IN ('normal','fast','urgent','immediate')),
  secured_trading_required BOOLEAN NOT NULL DEFAULT FALSE,

  visibility             VARCHAR(20) NOT NULL DEFAULT 'public'
                          CHECK (visibility IN ('public','targeted','invitation_only','private')),
  target_supplier_country_codes TEXT[] DEFAULT '{}',
  target_verification_tier_min SMALLINT,
  target_category_ids    UUID[] DEFAULT '{}',

  status                 VARCHAR(20) NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft','published','quoting','awarded','converted','closed','expired','cancelled')),
  awarded_quote_id       UUID,                                            -- FK to rfq_quote (added below)
  converted_order_id     UUID,                                            -- FK to ord."order" (added below)

  published_at           TIMESTAMPTZ,
  expires_at             TIMESTAMPTZ NOT NULL,
  awarded_at             TIMESTAMPTZ,
  closed_at              TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_rfq_buyer ON rfq.rfq (buyer_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_rfq_status ON rfq.rfq (tenant_id, status, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_rfq_category ON rfq.rfq (category_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_rfq_expires ON rfq.rfq (expires_at) WHERE status IN ('published','quoting');
CREATE INDEX IF NOT EXISTS idx_rfq_target_countries ON rfq.rfq USING GIN (target_supplier_country_codes);
CREATE INDEX IF NOT EXISTS idx_rfq_target_cats ON rfq.rfq USING GIN (target_category_ids);
CREATE INDEX IF NOT EXISTS idx_rfq_title_trgm ON rfq.rfq USING GIN ((title_i18n->>'vi') gin_trgm_ops);

-- ----------------------------------------------------------------------------
-- rfq.rfq_invited_supplier — Suppliers invited to quote
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rfq.rfq_invited_supplier (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  rfq_id                 UUID NOT NULL REFERENCES rfq.rfq(id) ON DELETE CASCADE,
  supplier_id            UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,
  invited_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  viewed_at              TIMESTAMPTZ,
  declined_at            TIMESTAMPTZ,
  decline_reason         TEXT,
  invitation_source      VARCHAR(20) NOT NULL CHECK (invitation_source IN ('manual_buyer','auto_match','admin_curated','ai_recommendation')),
  ai_match_score         NUMERIC(5,4),

  UNIQUE (rfq_id, supplier_id)
);

CREATE INDEX IF NOT EXISTS idx_rfq_invited_rfq ON rfq.rfq_invited_supplier (rfq_id);
CREATE INDEX IF NOT EXISTS idx_rfq_invited_supplier ON rfq.rfq_invited_supplier (supplier_id, invited_at DESC) WHERE viewed_at IS NULL;

-- ----------------------------------------------------------------------------
-- rfq.rfq_quote — Supplier's response to RFQ
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS rfq.rfq_quote (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  rfq_id                 UUID NOT NULL REFERENCES rfq.rfq(id) ON DELETE CASCADE,
  supplier_id            UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,

  unit_price_minor       BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  unit_price_usd_minor   BIGINT NOT NULL,                                 -- USD equiv at submission
  total_price_usd_minor  BIGINT NOT NULL,
  fx_snapshot_id         UUID,                                            -- FX rate at submit

  lead_time_days         SMALLINT NOT NULL,
  validity_days          SMALLINT NOT NULL DEFAULT 7,
  shipping_terms         VARCHAR(10) NOT NULL CHECK (shipping_terms IN ('fob','cif','ddp','exw','dap','dpu','cpt','cip')),
  payment_terms_i18n     JSONB,
  moq                    INT NOT NULL,
  notes_i18n             JSONB,
  attachment_urls        TEXT[] DEFAULT '{}',
  linked_product_id      UUID REFERENCES catalog.product(id) ON DELETE SET NULL,

  status                 VARCHAR(20) NOT NULL DEFAULT 'submitted'
                          CHECK (status IN ('submitted','accepted','rejected','withdrawn','expired','superseded')),
  submitted_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  accepted_at            TIMESTAMPTZ,
  rejected_at            TIMESTAMPTZ,
  rejection_reason       TEXT,
  expires_at             TIMESTAMPTZ NOT NULL,

  UNIQUE (rfq_id, supplier_id, version)
);

CREATE INDEX IF NOT EXISTS idx_quote_rfq ON rfq.rfq_quote (rfq_id, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_supplier ON rfq.rfq_quote (supplier_id, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_status ON rfq.rfq_quote (rfq_id, status);
CREATE INDEX IF NOT EXISTS idx_quote_price ON rfq.rfq_quote (rfq_id, total_price_usd_minor);

DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'rfq_awarded_quote_fk') THEN
    ALTER TABLE rfq.rfq ADD CONSTRAINT rfq_awarded_quote_fk
      FOREIGN KEY (awarded_quote_id) REFERENCES rfq.rfq_quote(id) ON DELETE SET NULL;
  END IF;
END $fk$;

-- ----------------------------------------------------------------------------
-- ord."order" — Order entity (Domain 5 + Q-D1.8 operation_mode)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ord."order" (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  created_by_user_id     UUID,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  code                   VARCHAR(20) NOT NULL UNIQUE,                     -- AVN-XXXXXX
  customer_id            UUID NOT NULL REFERENCES identity."user"(id),
  supplier_id            UUID NOT NULL REFERENCES identity.supplier(id),

  -- Source
  source_type            VARCHAR(20) NOT NULL CHECK (source_type IN ('cart','rfq','customization','manual_admin','reorder','subscription')),
  source_cart_id         UUID REFERENCES cart.cart(id) ON DELETE SET NULL,
  source_rfq_id          UUID REFERENCES rfq.rfq(id) ON DELETE SET NULL,
  source_rfq_quote_id    UUID REFERENCES rfq.rfq_quote(id) ON DELETE SET NULL,

  -- Mode (Q-D1.8 critical field)
  operation_mode         VARCHAR(20) NOT NULL CHECK (operation_mode IN ('direct','intermediary')),
  mode_resolution_log    JSONB NOT NULL DEFAULT '{}',

  -- B2B vs B2C (Gap 1 R06)
  transaction_mode       VARCHAR(20) NOT NULL CHECK (transaction_mode IN ('retail','wholesale')),
  parent_order_id        UUID REFERENCES ord."order"(id) ON DELETE SET NULL,  -- For multi-supplier split
  vat_treatment          VARCHAR(20) NOT NULL CHECK (vat_treatment IN ('inclusive','exclusive','exempt')),

  -- Currencies + FX
  currency               CHAR(3) NOT NULL,
  supplier_currency      CHAR(3) NOT NULL,
  fx_snapshot_id         UUID,                                            -- Locked at payment time per Q-FU3

  -- Amounts
  subtotal_minor         BIGINT NOT NULL,
  tax_amount_minor       BIGINT NOT NULL DEFAULT 0,
  shipping_amount_minor  BIGINT NOT NULL DEFAULT 0,
  insurance_amount_minor BIGINT NOT NULL DEFAULT 0,
  customs_duty_minor     BIGINT NOT NULL DEFAULT 0,
  platform_service_fee_minor BIGINT NOT NULL DEFAULT 0,
  discount_amount_minor  BIGINT NOT NULL DEFAULT 0,
  total_minor            BIGINT NOT NULL,
  total_usd_minor        BIGINT NOT NULL,                                 -- Snapshot for GMV tier

  commission_rate_pct    NUMERIC(5,3) NOT NULL DEFAULT 1.000,
  commission_amount_minor BIGINT NOT NULL DEFAULT 0,
  net_payable_to_supplier_minor BIGINT NOT NULL,

  -- B2B specific
  b2b_payment_terms_days SMALLINT NOT NULL DEFAULT 0
                          CHECK (b2b_payment_terms_days IN (0,7,15,30,45,60,90)),
  b2b_purchase_order_number VARCHAR(80),
  requires_buyer_company_approval BOOLEAN NOT NULL DEFAULT FALSE,
  buyer_company_approval_at TIMESTAMPTZ,

  -- Order type flags
  is_sample              BOOLEAN NOT NULL DEFAULT FALSE,
  is_cross_border        BOOLEAN NOT NULL DEFAULT FALSE,

  -- Shipping
  shipping_mode          VARCHAR(10) NOT NULL CHECK (shipping_mode IN ('fob','cif','ddp','exw','dap','dpu','cpt','cip')),
  fulfillment_mode       VARCHAR(40) NOT NULL,
  desired_port           VARCHAR(40),
  shipping_address_id    UUID,                                            -- FK created later
  billing_address_id     UUID,

  -- Related entity refs (created in later migrations)
  escrow_id              UUID,                                            -- FK payment.escrow
  platform_invoice_id    UUID,                                            -- FK fulfillment.platform_invoice (intermediary VAT)
  customs_declaration_id UUID,                                            -- FK fulfillment.customs_declaration
  qc_inspection_id       UUID,                                            -- FK fulfillment.qc_inspection
  insurance_policy_id    UUID,                                            -- FK fulfillment.insurance_policy
  consolidation_request_id UUID,                                          -- FK fulfillment.consolidation_request

  -- AML
  aml_flag_id            UUID,
  aml_status             VARCHAR(20) NOT NULL DEFAULT 'clear'
                          CHECK (aml_status IN ('clear','flagged','under_review','approved','blocked')),

  -- Status workflow
  status                 VARCHAR(30) NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft','pending_payment','pending_approval','confirmed','manufacturing',
    'qc','shipping','customs','delivered','completed','disputed','refunding','refunded','cancelled'
  )),
  payment_status         VARCHAR(20) NOT NULL DEFAULT 'unpaid'
                          CHECK (payment_status IN ('unpaid','partial','paid','refunding','refunded','disputed')),
  fulfillment_status     VARCHAR(20) NOT NULL DEFAULT 'not_fulfilled'
                          CHECK (fulfillment_status IN ('not_fulfilled','preparing','partial','shipped','delivered','returned','exception')),

  -- Timestamps
  confirmed_at           TIMESTAMPTZ,
  expected_delivery_at   TIMESTAMPTZ,
  shipped_at             TIMESTAMPTZ,
  delivered_at           TIMESTAMPTZ,
  completed_at           TIMESTAMPTZ,                                     -- Buyer confirm receipt → triggers payout
  cancelled_at           TIMESTAMPTZ,
  cancellation_reason    TEXT,

  -- Documents
  terms_accepted_hash    CHAR(64),
  po_document_url        TEXT,
  po_signature_data      JSONB,
  retail_receipt_url     TEXT
);

CREATE INDEX IF NOT EXISTS idx_order_customer ON ord."order" (customer_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_order_supplier ON ord."order" (supplier_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_order_status ON ord."order" (tenant_id, status, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_order_payment_status ON ord."order" (tenant_id, payment_status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_order_fulfillment ON ord."order" (tenant_id, fulfillment_status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_order_mode ON ord."order" (operation_mode, transaction_mode, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_parent ON ord."order" (parent_order_id) WHERE parent_order_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_order_completed ON ord."order" (supplier_id, completed_at DESC) WHERE completed_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_order_aml ON ord."order" (aml_status) WHERE aml_status != 'clear';
CREATE INDEX IF NOT EXISTS idx_order_b2b_po ON ord."order" (b2b_purchase_order_number) WHERE b2b_purchase_order_number IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_order_cross_border ON ord."order" (tenant_id, created_at DESC) WHERE is_cross_border = TRUE;

COMMENT ON TABLE ord."order" IS 'Order entity. Quoted "order" because PG keyword. operation_mode (direct/intermediary) is critical Q-D1.8 field.';
COMMENT ON COLUMN ord."order".operation_mode IS 'direct = buyer↔seller direct payment | intermediary = sàn holds escrow + does VAT import';

-- Now add FK from rfq.rfq.converted_order_id (must be deferred)
DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'rfq_converted_order_fk') THEN
    ALTER TABLE rfq.rfq ADD CONSTRAINT rfq_converted_order_fk
      FOREIGN KEY (converted_order_id) REFERENCES ord."order"(id) ON DELETE SET NULL;
  END IF;
END $fk$;

DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cart_converted_order_fk') THEN
    ALTER TABLE cart.cart ADD CONSTRAINT cart_converted_order_fk
      FOREIGN KEY (converted_order_id) REFERENCES ord."order"(id) ON DELETE SET NULL;
  END IF;
END $fk$;

DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'customization_converted_order_fk') THEN
    ALTER TABLE catalog.customization_request ADD CONSTRAINT customization_converted_order_fk
      FOREIGN KEY (converted_order_id) REFERENCES ord."order"(id) ON DELETE SET NULL;
  END IF;
END $fk$;

-- ----------------------------------------------------------------------------
-- ord.order_item — Line items (snapshot at order time)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ord.order_item (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  order_id               UUID NOT NULL REFERENCES ord."order"(id) ON DELETE CASCADE,
  variant_id             UUID NOT NULL REFERENCES catalog.product_variant(id),

  -- Snapshot at order time (immutable, even if catalog changes)
  product_title_i18n     JSONB NOT NULL,
  variant_title_i18n     JSONB NOT NULL,
  product_sku            VARCHAR(80),
  variant_sku            VARCHAR(80) NOT NULL,

  quantity               INT NOT NULL CHECK (quantity > 0),
  unit_code              VARCHAR(20) NOT NULL,

  unit_price_minor       BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  unit_price_usd_minor   BIGINT NOT NULL,
  line_total_minor       BIGINT NOT NULL,
  line_total_usd_minor   BIGINT NOT NULL,
  tax_amount_minor       BIGINT NOT NULL DEFAULT 0,
  discount_minor         BIGINT NOT NULL DEFAULT 0,

  -- Custom + sample
  customization_request_id UUID REFERENCES catalog.customization_request(id),
  is_sample              BOOLEAN NOT NULL DEFAULT FALSE,

  -- Per-line fulfillment tracking
  fulfillment_status     VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (fulfillment_status IN ('pending','manufacturing','ready','shipped','delivered','returned','cancelled')),
  manufactured_at        TIMESTAMPTZ,
  shipped_qty            INT NOT NULL DEFAULT 0,
  returned_qty           INT NOT NULL DEFAULT 0,

  -- Customs (Intermediary mode)
  customs_hs_code        VARCHAR(15),
  origin_country         CHAR(2),

  notes_buyer_i18n       JSONB,
  notes_supplier_i18n    JSONB
);

CREATE INDEX IF NOT EXISTS idx_order_item_order ON ord.order_item (order_id);
CREATE INDEX IF NOT EXISTS idx_order_item_variant ON ord.order_item (variant_id);
CREATE INDEX IF NOT EXISTS idx_order_item_sample ON ord.order_item (order_id) WHERE is_sample = TRUE;
CREATE INDEX IF NOT EXISTS idx_order_item_fulfillment ON ord.order_item (fulfillment_status) WHERE fulfillment_status != 'delivered';

-- ----------------------------------------------------------------------------
-- ord.order_revision — Amendment history (Q-C8 open amendment + version)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ord.order_revision (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  order_id               UUID NOT NULL REFERENCES ord."order"(id) ON DELETE CASCADE,
  revision_number        INT NOT NULL,
  revision_type          VARCHAR(30) NOT NULL CHECK (revision_type IN
    ('quantity_change','price_change','spec_change','address_change','timeline_change',
     'item_added','item_removed','mode_changed','admin_correction','dispute_settlement')),
  before_snapshot_jsonb  JSONB NOT NULL,
  after_snapshot_jsonb   JSONB NOT NULL,
  changed_by_user_id     UUID NOT NULL REFERENCES identity."user"(id),
  changed_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reason                 TEXT,

  -- Approval workflow
  requires_buyer_approval BOOLEAN NOT NULL DEFAULT TRUE,
  buyer_approved_at      TIMESTAMPTZ,
  requires_supplier_approval BOOLEAN NOT NULL DEFAULT TRUE,
  supplier_approved_at   TIMESTAMPTZ,
  requires_admin_approval BOOLEAN NOT NULL DEFAULT FALSE,
  admin_approved_at      TIMESTAMPTZ,
  admin_approved_by_user_id UUID REFERENCES identity."user"(id),

  applied_at             TIMESTAMPTZ,                                     -- When approved + applied
  rejected_at            TIMESTAMPTZ,
  rejected_reason        TEXT,

  UNIQUE (order_id, revision_number)
);

CREATE INDEX IF NOT EXISTS idx_order_revision_order ON ord.order_revision (order_id, revision_number DESC);
CREATE INDEX IF NOT EXISTS idx_order_revision_pending ON ord.order_revision (order_id, changed_at DESC)
  WHERE applied_at IS NULL AND rejected_at IS NULL;

-- ----------------------------------------------------------------------------
-- ord.order_event — Timeline events (audit + UI display)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ord.order_event (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  order_id               UUID NOT NULL REFERENCES ord."order"(id) ON DELETE CASCADE,
  event_type             VARCHAR(40) NOT NULL,                            -- status.confirmed, payment.received, shipment.created, ...
  actor_type             VARCHAR(20) NOT NULL CHECK (actor_type IN ('buyer','supplier','admin','system','ai','webhook')),
  actor_user_id          UUID REFERENCES identity."user"(id),
  payload_jsonb          JSONB NOT NULL DEFAULT '{}',
  visible_to             TEXT[] NOT NULL DEFAULT ARRAY['buyer','supplier'],  -- Which roles see in timeline
  occurred_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_event_order ON ord.order_event (order_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_event_type ON ord.order_event (event_type, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_event_brin ON ord.order_event USING BRIN (occurred_at);

-- ----------------------------------------------------------------------------
-- ord.b2b_approval_workflow — Enterprise multi-step approval definitions
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ord.b2b_approval_workflow (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  buyer_company_id       UUID,                                            -- Customer group / company entity
  workflow_name          VARCHAR(120) NOT NULL,
  threshold_usd_minor    BIGINT NOT NULL,                                 -- Above this requires approval
  approval_chain_jsonb   JSONB NOT NULL,                                  -- [{step, role, approver_user_ids[], max_amount}]
  is_active              BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_b2b_workflow_company ON ord.b2b_approval_workflow (buyer_company_id) WHERE is_active;

-- ----------------------------------------------------------------------------
-- ord.b2b_approval_request — Per-order approval instance
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ord.b2b_approval_request (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  order_id               UUID NOT NULL REFERENCES ord."order"(id) ON DELETE CASCADE,
  workflow_id            UUID NOT NULL REFERENCES ord.b2b_approval_workflow(id),
  current_step           SMALLINT NOT NULL DEFAULT 1,
  approvals_jsonb        JSONB NOT NULL DEFAULT '[]',                     -- [{step, approver_id, status, decided_at, comments}]
  status                 VARCHAR(20) NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','in_review','approved','rejected','cancelled','timeout')),
  initiated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at           TIMESTAMPTZ,

  UNIQUE (order_id)
);

CREATE INDEX IF NOT EXISTS idx_b2b_approval_order ON ord.b2b_approval_request (order_id);
CREATE INDEX IF NOT EXISTS idx_b2b_approval_pending ON ord.b2b_approval_request (status, current_step) WHERE status IN ('pending','in_review');

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------

CREATE TRIGGER trg_rfq_updated_at BEFORE UPDATE ON rfq.rfq
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_rfq_quote_updated_at BEFORE UPDATE ON rfq.rfq_quote
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_order_updated_at BEFORE UPDATE ON ord."order"
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_order_item_updated_at BEFORE UPDATE ON ord.order_item
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_b2b_workflow_updated_at BEFORE UPDATE ON ord.b2b_approval_workflow
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_b2b_approval_updated_at BEFORE UPDATE ON ord.b2b_approval_request
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- RLS
-- ----------------------------------------------------------------------------

DO $rls$
DECLARE rec RECORD;
BEGIN
  FOR rec IN SELECT schemaname, tablename FROM pg_tables
    WHERE schemaname IN ('rfq','ord') AND tablename NOT LIKE 'pg_%'
  LOOP
    EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', rec.schemaname, rec.tablename);
    EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON %I.%I', rec.schemaname, rec.tablename);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %I.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
      rec.schemaname, rec.tablename
    );
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('09_order_rfq.sql', 'Order + RFQ: 9 tables (rfq, invited_supplier, quote, order, order_item, revision, event, b2b_workflow, b2b_approval)');

-- ============================================================================
-- END 09_order_rfq.sql — 9 tables, 25+ indexes, 6 triggers, 9 RLS
-- ============================================================================
