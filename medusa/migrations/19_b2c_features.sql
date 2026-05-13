-- Migration 19: B2C Features (Domain 13)
\set ON_ERROR_STOP on

CREATE TABLE IF NOT EXISTS b2c.product_review (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  product_id UUID NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  order_item_id UUID REFERENCES ord.order_item(id),
  reviewer_user_id UUID NOT NULL REFERENCES identity."user"(id),
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title_i18n JSONB, body_i18n JSONB NOT NULL,
  photo_urls TEXT[], video_url TEXT,
  helpful_count INT DEFAULT 0, not_helpful_count INT DEFAULT 0,
  supplier_response_i18n JSONB, supplier_responded_at TIMESTAMPTZ,
  moderation_status VARCHAR(20) DEFAULT 'pending' CHECK (moderation_status IN ('pending','approved','rejected','hidden','flagged')),
  is_verified_purchase BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_product_review_product ON b2c.product_review (product_id, created_at DESC) WHERE moderation_status='approved';
CREATE INDEX IF NOT EXISTS idx_product_review_user ON b2c.product_review (reviewer_user_id);

CREATE TABLE IF NOT EXISTS b2c.wishlist (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES identity."user"(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL DEFAULT 'Default',
  is_public BOOLEAN DEFAULT FALSE,
  share_token VARCHAR(40) UNIQUE,
  item_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS b2c.wishlist_item (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  wishlist_id UUID NOT NULL REFERENCES b2c.wishlist(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES catalog.product_variant(id),
  notes TEXT,
  notify_price_drop BOOLEAN DEFAULT FALSE,
  notify_back_in_stock BOOLEAN DEFAULT FALSE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (wishlist_id, variant_id)
);

CREATE TABLE IF NOT EXISTS b2c.coupon (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  code VARCHAR(40) NOT NULL,
  name_i18n JSONB,
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage','fixed_amount','free_shipping','buy_x_get_y')),
  discount_value_minor BIGINT NOT NULL,
  currency CHAR(3),
  applies_to VARCHAR(20) CHECK (applies_to IN ('all','category','product','supplier','customer_group')),
  applies_to_ids UUID[] DEFAULT '{}',
  min_subtotal_usd_minor BIGINT,
  max_discount_usd_minor BIGINT,
  total_usage_limit INT, per_user_limit INT DEFAULT 1,
  starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ,
  created_by_type VARCHAR(20) DEFAULT 'platform' CHECK (created_by_type IN ('platform','supplier','affiliate')),
  created_by_supplier_id UUID REFERENCES identity.supplier(id),
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE (tenant_id, code)
);
CREATE INDEX IF NOT EXISTS idx_coupon_active ON b2c.coupon (tenant_id, is_active, starts_at, ends_at);

CREATE TABLE IF NOT EXISTS b2c.coupon_redemption (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  coupon_id UUID NOT NULL REFERENCES b2c.coupon(id),
  user_id UUID REFERENCES identity."user"(id),
  order_id UUID,
  amount_discounted_minor BIGINT,
  redeemed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS b2c.flash_sale (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name_i18n JSONB NOT NULL,
  banner_image TEXT,
  starts_at TIMESTAMPTZ NOT NULL, ends_at TIMESTAMPTZ NOT NULL,
  countdown_visible BOOLEAN DEFAULT TRUE,
  supplier_id UUID REFERENCES identity.supplier(id),
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled','live','ended','cancelled'))
);

CREATE TABLE IF NOT EXISTS b2c.flash_sale_item (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  flash_sale_id UUID NOT NULL REFERENCES b2c.flash_sale(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES catalog.product(id),
  variant_id UUID NOT NULL REFERENCES catalog.product_variant(id),
  original_price_minor BIGINT NOT NULL,
  sale_price_minor BIGINT NOT NULL,
  currency CHAR(3) NOT NULL,
  quantity_total INT NOT NULL,
  quantity_sold INT DEFAULT 0,
  per_user_limit INT DEFAULT 1,
  UNIQUE (flash_sale_id, variant_id)
);

CREATE TABLE IF NOT EXISTS b2c.loyalty_tier (
  tier_code VARCHAR(20) PRIMARY KEY,
  name_i18n JSONB,
  min_lifetime_points BIGINT,
  benefits_jsonb JSONB,
  display_order INT
);

CREATE TABLE IF NOT EXISTS b2c.loyalty_account (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID NOT NULL UNIQUE REFERENCES identity."user"(id) ON DELETE CASCADE,
  points_balance BIGINT NOT NULL DEFAULT 0,
  lifetime_points BIGINT NOT NULL DEFAULT 0,
  current_tier VARCHAR(20) REFERENCES b2c.loyalty_tier(tier_code),
  tier_expires_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS b2c.loyalty_transaction (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  account_id UUID NOT NULL REFERENCES b2c.loyalty_account(id) ON DELETE CASCADE,
  type VARCHAR(20) CHECK (type IN ('earn','redeem','expire','adjustment','transfer')),
  points_delta BIGINT NOT NULL,
  source_order_id UUID,
  expires_at TIMESTAMPTZ,
  description_i18n JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_loyalty_tx_account ON b2c.loyalty_transaction (account_id, created_at DESC);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='b2c' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='b2c' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE b2c.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON b2c.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON b2c.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('19_b2c_features.sql', 'B2C: 10 tables (review, wishlist, coupon, flash_sale, loyalty)');
