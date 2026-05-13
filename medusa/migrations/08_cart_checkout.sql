-- ============================================================================
-- Cybersilkroads — Migration 08: Cart & Checkout (Domain 4)
-- ============================================================================
-- Tables: cart, cart_item, cart_supplier_group, checkout_session
-- Depends on: 07_catalog.sql (variant FK)
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- cart.cart — Shopping cart (dual-mode: retail multi-supplier OR wholesale 1-supplier)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS cart.cart (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  -- Owner (nullable for guest cart, identified by session)
  customer_id            UUID REFERENCES identity."user"(id) ON DELETE SET NULL,
  guest_session_id       UUID,                                            -- Anonymous browser session

  -- Mode (B2C vs B2B per Gap 1 R06)
  purchase_mode          VARCHAR(20) NOT NULL DEFAULT 'wholesale'
                          CHECK (purchase_mode IN ('retail','wholesale')),
  is_multi_supplier      BOOLEAN NOT NULL DEFAULT FALSE,
  vat_inclusive          BOOLEAN NOT NULL DEFAULT FALSE,
  requires_quote         BOOLEAN NOT NULL DEFAULT FALSE,

  -- Supplier constraint: NOT NULL when wholesale (Q-D1.4 force tách checkout)
  supplier_id            UUID REFERENCES identity.supplier(id) ON DELETE CASCADE,

  -- Currencies
  currency               CHAR(3) NOT NULL DEFAULT 'VND',
  supplier_currency      CHAR(3),

  -- Aggregates (recomputed by trigger or service)
  item_count             INT NOT NULL DEFAULT 0,
  subtotal_minor         BIGINT NOT NULL DEFAULT 0,
  subtotal_usd_minor     BIGINT NOT NULL DEFAULT 0,
  total_volume_cbm       NUMERIC(10,4) NOT NULL DEFAULT 0,
  total_weight_kg        NUMERIC(10,3) NOT NULL DEFAULT 0,

  -- FX snapshot at view time (locked at payment time, not here)
  fx_snapshot_id         UUID,                                            -- FK to payment.fx_snapshot (created later)

  status                 VARCHAR(20) NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active','abandoned','converted','expired','merged')),
  abandoned_at           TIMESTAMPTZ,
  converted_order_id     UUID,
  expires_at             TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '30 days',

  -- Constraint: wholesale mode requires single supplier
  CONSTRAINT cart_wholesale_supplier CHECK (
    purchase_mode = 'retail'
    OR supplier_id IS NOT NULL
    OR (status != 'active')
  )
);

CREATE INDEX IF NOT EXISTS idx_cart_customer ON cart.cart (customer_id, created_at DESC) WHERE customer_id IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_cart_guest ON cart.cart (guest_session_id) WHERE guest_session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cart_active ON cart.cart (tenant_id, status, updated_at DESC) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_cart_supplier ON cart.cart (supplier_id) WHERE supplier_id IS NOT NULL AND status = 'active';
CREATE INDEX IF NOT EXISTS idx_cart_expires ON cart.cart (expires_at) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_cart_abandoned ON cart.cart (tenant_id, abandoned_at DESC) WHERE status = 'abandoned';

COMMENT ON TABLE cart.cart IS 'Shopping cart. Wholesale mode = 1 supplier per cart (Q-D1.4). Retail mode = multi-supplier OK.';

-- ----------------------------------------------------------------------------
-- cart.cart_supplier_group — Multi-supplier retail cart breakdown
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS cart.cart_supplier_group (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  cart_id                UUID NOT NULL REFERENCES cart.cart(id) ON DELETE CASCADE,
  supplier_id            UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,

  subtotal_minor         BIGINT NOT NULL DEFAULT 0,
  subtotal_usd_minor     BIGINT NOT NULL DEFAULT 0,
  shipping_method_id     UUID,                                            -- FK created later
  estimated_delivery_at  TIMESTAMPTZ,
  notes_buyer_i18n       JSONB,
  item_count             INT NOT NULL DEFAULT 0,

  UNIQUE (cart_id, supplier_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_group_cart ON cart.cart_supplier_group (cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_group_supplier ON cart.cart_supplier_group (supplier_id);

COMMENT ON TABLE cart.cart_supplier_group IS 'Per-supplier breakdown for retail multi-supplier carts';

-- ----------------------------------------------------------------------------
-- cart.cart_item — Line items
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS cart.cart_item (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  cart_id                UUID NOT NULL REFERENCES cart.cart(id) ON DELETE CASCADE,
  cart_supplier_group_id UUID REFERENCES cart.cart_supplier_group(id) ON DELETE CASCADE,
  variant_id             UUID NOT NULL REFERENCES catalog.product_variant(id) ON DELETE RESTRICT,

  quantity               INT NOT NULL CHECK (quantity > 0),
  unit_code              VARCHAR(20) NOT NULL REFERENCES common.unit_master(code),

  unit_price_minor       BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  applied_tier_id        UUID,                                            -- FK price_tier (catalog)
  applied_audience       VARCHAR(20),

  -- OEM/sample
  customization_request_id UUID REFERENCES catalog.customization_request(id) ON DELETE SET NULL,
  is_sample              BOOLEAN NOT NULL DEFAULT FALSE,

  notes_buyer_i18n       JSONB,
  added_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cart_item_cart ON cart.cart_item (cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_item_variant ON cart.cart_item (variant_id);
CREATE INDEX IF NOT EXISTS idx_cart_item_group ON cart.cart_item (cart_supplier_group_id) WHERE cart_supplier_group_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cart_item_sample ON cart.cart_item (cart_id) WHERE is_sample = TRUE;

-- ----------------------------------------------------------------------------
-- cart.checkout_session — Captures mode/shipping/payment before becoming order
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS cart.checkout_session (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  cart_id                UUID NOT NULL REFERENCES cart.cart(id) ON DELETE CASCADE,

  -- Mode resolution (Q-D1.8 + Q-FU8)
  resolved_operation_mode VARCHAR(20) NOT NULL CHECK (resolved_operation_mode IN ('direct','intermediary')),
  buyer_chose_intermediary BOOLEAN NOT NULL DEFAULT FALSE,
  mode_resolution_log    JSONB NOT NULL DEFAULT '{}',                     -- Audit of 4-rule eval

  -- Currency selection (Q-FU2)
  selected_currency      CHAR(3) NOT NULL,
  fx_snapshot_id_quoted  UUID,                                            -- Quoted rate (final lock at payment time)

  -- Shipping configuration
  shipping_mode          VARCHAR(20) NOT NULL CHECK (shipping_mode IN ('fob','cif','ddp','exw','dap')),
  shipping_carrier_id    UUID,                                            -- FK shipping_carrier (created later)
  desired_port           VARCHAR(40),                                     -- haiphong|catlai|danang|langson|other
  fulfillment_mode       VARCHAR(40) NOT NULL DEFAULT 'forwarder_door_to_door'
                          CHECK (fulfillment_mode IN ('direct_port_pickup','platform_warehouse','forwarder_door_to_door','self_arrange')),

  -- Addresses
  shipping_address_id    UUID,                                            -- FK created later
  billing_address_id     UUID,

  -- Payment
  payment_method         VARCHAR(20) CHECK (payment_method IN ('bank_transfer','card','usdt','wallet','momo','zalopay','vnpay','alipay','wechat','swift')),
  payment_processor_code VARCHAR(40),                                     -- Will route to specific processor

  -- Optional services
  insurance_requested    BOOLEAN NOT NULL DEFAULT FALSE,
  qc_requested           BOOLEAN NOT NULL DEFAULT FALSE,

  -- Milestone configuration (per Q-D11 smart default)
  milestone_structure    JSONB NOT NULL DEFAULT '[]',                     -- [{percentage, trigger_event, description}]

  -- Clickwrap agreement
  terms_accepted_at      TIMESTAMPTZ,
  terms_version_id       UUID,                                            -- FK gdpr.terms_of_service_version
  privacy_accepted_at    TIMESTAMPTZ,

  expires_at             TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '30 minutes',
  completed_at           TIMESTAMPTZ,
  abandoned_at           TIMESTAMPTZ,

  -- One active session per cart
  status                 VARCHAR(20) NOT NULL DEFAULT 'in_progress'
                          CHECK (status IN ('in_progress','completed','abandoned','expired','failed'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_checkout_session_cart_active ON cart.checkout_session (cart_id) WHERE status = 'in_progress';
CREATE INDEX IF NOT EXISTS idx_checkout_session_expires ON cart.checkout_session (expires_at) WHERE status = 'in_progress';
CREATE INDEX IF NOT EXISTS idx_checkout_session_mode ON cart.checkout_session (resolved_operation_mode, created_at DESC);

COMMENT ON TABLE cart.checkout_session IS 'Capture buyer choices before order creation. Mode (direct/intermediary) resolved here per Q-FU8.';

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------

CREATE TRIGGER trg_cart_updated_at BEFORE UPDATE ON cart.cart
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_cart_group_updated_at BEFORE UPDATE ON cart.cart_supplier_group
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_cart_item_updated_at BEFORE UPDATE ON cart.cart_item
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_checkout_session_updated_at BEFORE UPDATE ON cart.checkout_session
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- RLS
-- ----------------------------------------------------------------------------

DO $rls$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['cart','cart_supplier_group','cart_item','checkout_session'] LOOP
    EXECUTE format('ALTER TABLE cart.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON cart.%I', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON cart.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
      t
    );
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('08_cart_checkout.sql', 'Cart + Checkout: 4 tables (dual-mode B2B/B2C cart + multi-supplier group + items + checkout session)');

-- ============================================================================
-- END 08_cart_checkout.sql — 4 tables, 12 indexes, 4 triggers, 4 RLS
-- ============================================================================
