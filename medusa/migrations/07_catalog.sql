-- ============================================================================
-- Cybersilkroads — Migration 07: Catalog & Taxonomy (Domain 2 + 3 + 14)
-- ============================================================================
-- Tables: 14 (medusa_category, payload_category_content reference,
--             brand, master_product, gtin_registry, product, product_variant,
--             price_tier, product_audience_availability, customization_request,
--             unit_master, unit_conversion, master_product_attribute,
--             product_match_signal, canonical_image, product_bundle,
--             buy_box_winner, buy_box_algorithm_config)
-- Depends on: 03_identity.sql (supplier FK)
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- common.unit_master — Master units (pieces, sets, m², kg, ...)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS common.unit_master (
  code                   VARCHAR(20) PRIMARY KEY
                          CHECK (code ~ '^[a-z][a-z0-9_]*$'),
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  label_i18n             JSONB NOT NULL,
  symbol                 VARCHAR(10),
  category               VARCHAR(20) NOT NULL CHECK (category IN
    ('count','weight','length','area','volume','packaging','time','energy','temperature','currency','custom')),
  base_unit_code         VARCHAR(20) REFERENCES common.unit_master(code),
  conversion_factor      NUMERIC(20,10),                                   -- To base unit
  display_order          INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_unit_category ON common.unit_master (category, display_order);

-- ----------------------------------------------------------------------------
-- common.unit_conversion — Per-product unit conversion (e.g., 1 carton = 24 pieces)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS common.unit_conversion (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  scope_type             VARCHAR(20) NOT NULL CHECK (scope_type IN ('global','product','supplier')),
  scope_id               UUID,                                             -- product_id or supplier_id if scoped
  from_unit_code         VARCHAR(20) NOT NULL REFERENCES common.unit_master(code),
  to_unit_code           VARCHAR(20) NOT NULL REFERENCES common.unit_master(code),
  factor                 NUMERIC(20,6) NOT NULL CHECK (factor > 0),

  UNIQUE (scope_type, scope_id, from_unit_code, to_unit_code)
);

CREATE INDEX IF NOT EXISTS idx_unit_conversion_scope ON common.unit_conversion (scope_type, scope_id);

-- ----------------------------------------------------------------------------
-- taxonomy.medusa_category — Category tree (taxonomy backbone)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS taxonomy.medusa_category (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  name                   VARCHAR(120) NOT NULL,                            -- Internal name (English), not user-facing
  handle                 VARCHAR(120) NOT NULL,                            -- URL slug
  parent_category_id     UUID REFERENCES taxonomy.medusa_category(id) ON DELETE RESTRICT,
  rank                   INT NOT NULL DEFAULT 0,
  is_active              BOOLEAN NOT NULL DEFAULT TRUE,
  is_internal            BOOLEAN NOT NULL DEFAULT FALSE,                   -- Hidden from navigation
  mpath                  LTREE,                                            -- Materialized path for tree queries
  depth                  SMALLINT NOT NULL DEFAULT 0,
  product_count_cache    INT NOT NULL DEFAULT 0,

  UNIQUE (tenant_id, handle),
  CHECK (parent_category_id IS NULL OR id != parent_category_id)
);

CREATE INDEX IF NOT EXISTS idx_medusa_cat_parent ON taxonomy.medusa_category (parent_category_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_medusa_cat_mpath ON taxonomy.medusa_category USING GIST (mpath);
CREATE INDEX IF NOT EXISTS idx_medusa_cat_handle ON taxonomy.medusa_category (tenant_id, handle) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_medusa_cat_active ON taxonomy.medusa_category (tenant_id, is_active) WHERE deleted_at IS NULL;

COMMENT ON TABLE taxonomy.medusa_category IS 'Taxonomy backbone. Content (i18n names, FAQ, banner) overlay in payload.category_content.';

-- Trigger to maintain mpath + depth
CREATE OR REPLACE FUNCTION taxonomy.maintain_category_mpath()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $fn$
DECLARE
  parent_mpath LTREE;
BEGIN
  IF NEW.parent_category_id IS NULL THEN
    NEW.mpath = NEW.id::TEXT::LTREE;
    NEW.depth = 0;
  ELSE
    SELECT mpath, depth+1 INTO parent_mpath, NEW.depth
    FROM taxonomy.medusa_category WHERE id = NEW.parent_category_id;
    NEW.mpath = parent_mpath || NEW.id::TEXT::LTREE;
  END IF;
  RETURN NEW;
END;
$fn$;

DROP TRIGGER IF EXISTS trg_category_mpath ON taxonomy.medusa_category;
CREATE TRIGGER trg_category_mpath
  BEFORE INSERT OR UPDATE OF parent_category_id ON taxonomy.medusa_category
  FOR EACH ROW EXECUTE FUNCTION taxonomy.maintain_category_mpath();

-- ----------------------------------------------------------------------------
-- catalog.brand — Brand entity (for brand registry / IP protection)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.brand (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  brand_name             VARCHAR(255) NOT NULL,
  legal_owner_supplier_id UUID REFERENCES identity.supplier(id) ON DELETE SET NULL,
  trademark_country_codes TEXT[] NOT NULL DEFAULT '{}',
  logo_url               TEXT,
  tagline_i18n           JSONB,
  official_url           TEXT,
  is_registered          BOOLEAN NOT NULL DEFAULT FALSE,
  registration_id        VARCHAR(80),
  founded_year           SMALLINT,
  description_i18n       JSONB,

  UNIQUE (tenant_id, brand_name)
);

CREATE INDEX IF NOT EXISTS idx_brand_tenant ON catalog.brand (tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_brand_owner ON catalog.brand (legal_owner_supplier_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_brand_name_trgm ON catalog.brand USING GIN (brand_name gin_trgm_ops);

-- ----------------------------------------------------------------------------
-- catalog.gtin_registry — UPC/EAN/ISBN master
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.gtin_registry (
  gtin_code              VARCHAR(20) PRIMARY KEY CHECK (gtin_code ~ '^[0-9]{8,14}$'),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr',
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  gtin_type              VARCHAR(10) NOT NULL CHECK (gtin_type IN ('UPC-A','UPC-E','EAN-8','EAN-13','EAN-14','ISBN-13','GTIN-14')),
  registered_to_brand_id UUID REFERENCES catalog.brand(id) ON DELETE SET NULL,
  registered_to_supplier_id UUID REFERENCES identity.supplier(id) ON DELETE SET NULL,
  registered_country     CHAR(2),
  status                 VARCHAR(20) NOT NULL DEFAULT 'active'
                          CHECK (status IN ('active','reserved','disputed','revoked'))
);

CREATE INDEX IF NOT EXISTS idx_gtin_brand ON catalog.gtin_registry (registered_to_brand_id) WHERE registered_to_brand_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_gtin_supplier ON catalog.gtin_registry (registered_to_supplier_id) WHERE registered_to_supplier_id IS NOT NULL;

-- ----------------------------------------------------------------------------
-- catalog.master_product — Canonical product (Amazon ASIN equivalent)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.master_product (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  master_sku             VARCHAR(80) NOT NULL,
  gtin                   VARCHAR(20) REFERENCES catalog.gtin_registry(gtin_code),
  title_i18n             JSONB NOT NULL,
  description_i18n       JSONB,
  brand_id               UUID REFERENCES catalog.brand(id) ON DELETE SET NULL,
  category_id            UUID REFERENCES taxonomy.medusa_category(id),
  canonical_image_urls   TEXT[] NOT NULL DEFAULT '{}',
  canonical_specs_jsonb  JSONB DEFAULT '{}',
  dimensions_cm          JSONB,                                            -- {length, width, height}
  weight_kg              NUMERIC(10,3),
  hs_code                VARCHAR(15),
  master_status          VARCHAR(20) NOT NULL DEFAULT 'active'
                          CHECK (master_status IN ('active','gated','retired','disputed')),
  created_by             VARCHAR(30) NOT NULL DEFAULT 'admin'
                          CHECK (created_by IN ('admin','brand_owner','auto_merge','migration')),
  authority_locked       BOOLEAN NOT NULL DEFAULT FALSE,                   -- Only brand owner can edit
  total_listings_count   INT NOT NULL DEFAULT 0,
  buy_box_winner_listing_id UUID,                                          -- Cached for fast lookup

  UNIQUE (tenant_id, master_sku)
);

CREATE INDEX IF NOT EXISTS idx_master_product_brand ON catalog.master_product (brand_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_master_product_category ON catalog.master_product (category_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_master_product_gtin ON catalog.master_product (gtin) WHERE gtin IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_master_product_title_trgm ON catalog.master_product USING GIN ((title_i18n->>'vi') gin_trgm_ops);

-- ----------------------------------------------------------------------------
-- catalog.product — Per-supplier product silo (Q-D1.3)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.product (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL DEFAULT 'csr'
                          REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  created_by_user_id     UUID,
  updated_by_user_id     UUID,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  supplier_id            UUID NOT NULL REFERENCES identity.supplier(id) ON DELETE CASCADE,
  master_product_id      UUID REFERENCES catalog.master_product(id) ON DELETE SET NULL,  -- Optional link
  brand_id               UUID REFERENCES catalog.brand(id) ON DELETE SET NULL,

  title_i18n             JSONB NOT NULL,
  handle                 VARCHAR(120) NOT NULL,
  description_i18n       JSONB,
  specifications         JSONB DEFAULT '[]',                               -- [{key, value_i18n, unit}]
  status                 VARCHAR(20) NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft','published','archived','rejected','suppressed')),
  suppressed_reason      TEXT,

  -- B2B fields
  moq_quantity           INT NOT NULL DEFAULT 1,
  unit_code              VARCHAR(20) NOT NULL DEFAULT 'pieces' REFERENCES common.unit_master(code),
  packaging_note_i18n    JSONB,
  badges                 TEXT[] NOT NULL DEFAULT '{}',                     -- ['oem','odm','new','top','ready_stock',...]

  is_sample_eligible     BOOLEAN NOT NULL DEFAULT TRUE,
  is_customizable        BOOLEAN NOT NULL DEFAULT FALSE,
  customization_min_qty  INT,
  lead_time_days_min     SMALLINT,
  lead_time_days_max     SMALLINT,

  -- Customs (per Q-E16)
  customs_hs_code        VARCHAR(15),
  customs_description    TEXT,
  origin_country         CHAR(2) NOT NULL DEFAULT 'CN',

  -- Physical
  weight_kg              NUMERIC(10,3),
  dimensions_cm          JSONB,
  volume_cbm             NUMERIC(10,4),

  -- Media (refs to media_asset created later)
  media_urls             JSONB DEFAULT '[]',                               -- [{type, url, alt_i18n, position}]
  thumbnail_url          TEXT,
  video_url              TEXT,

  -- Aggregated metrics
  view_count             BIGINT NOT NULL DEFAULT 0,
  inquiry_count          BIGINT NOT NULL DEFAULT 0,
  order_count            BIGINT NOT NULL DEFAULT 0,
  rating_avg             NUMERIC(3,2),
  review_count           INT NOT NULL DEFAULT 0,

  -- Lifecycle
  published_at           TIMESTAMPTZ,
  featured_until         TIMESTAMPTZ,
  default_audience       VARCHAR(20) NOT NULL DEFAULT 'b2b_wholesale'
                          CHECK (default_audience IN ('b2c_retail','b2b_wholesale','b2b_distributor','b2b_oem','any')),
  audiences_available    TEXT[] NOT NULL DEFAULT ARRAY['b2b_wholesale'],

  UNIQUE (tenant_id, supplier_id, handle),
  CHECK (moq_quantity >= 1),
  CHECK (lead_time_days_min IS NULL OR lead_time_days_max IS NULL OR lead_time_days_max >= lead_time_days_min)
);

CREATE INDEX IF NOT EXISTS idx_product_supplier ON catalog.product (supplier_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_product_master ON catalog.product (master_product_id) WHERE master_product_id IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_product_status ON catalog.product (tenant_id, status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_product_brand ON catalog.product (brand_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_product_hs ON catalog.product (customs_hs_code) WHERE customs_hs_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_product_origin ON catalog.product (origin_country, tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_product_badges ON catalog.product USING GIN (badges);
CREATE INDEX IF NOT EXISTS idx_product_audiences ON catalog.product USING GIN (audiences_available);
CREATE INDEX IF NOT EXISTS idx_product_title_trgm ON catalog.product USING GIN ((title_i18n->>'vi') gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_product_published ON catalog.product (published_at DESC) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_product_featured ON catalog.product (featured_until DESC NULLS LAST) WHERE featured_until IS NOT NULL AND deleted_at IS NULL;

-- ----------------------------------------------------------------------------
-- catalog.product_variant — Variants (color, size, material)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.product_variant (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  product_id             UUID NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  sku                    VARCHAR(80) NOT NULL,
  title_i18n             JSONB NOT NULL,
  option_values          JSONB DEFAULT '{}',                               -- {color:"red", size:"L"}
  barcode                VARCHAR(80),

  -- Inventory
  inventory_quantity     INT NOT NULL DEFAULT 0,
  manage_inventory       BOOLEAN NOT NULL DEFAULT TRUE,
  allow_backorder        BOOLEAN NOT NULL DEFAULT FALSE,
  safety_stock           INT DEFAULT 0,

  -- Base pricing (in supplier currency)
  base_price_minor       BIGINT NOT NULL,
  base_currency          CHAR(3) NOT NULL,

  -- Physical override
  weight_kg              NUMERIC(10,3),

  UNIQUE (tenant_id, sku)
);

CREATE INDEX IF NOT EXISTS idx_variant_product ON catalog.product_variant (product_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_variant_sku ON catalog.product_variant (tenant_id, sku) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_variant_barcode ON catalog.product_variant (barcode) WHERE barcode IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_variant_options ON catalog.product_variant USING GIN (option_values);

-- ----------------------------------------------------------------------------
-- catalog.price_tier — Quantity/customer-group-based pricing (Q-A1)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.price_tier (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  variant_id             UUID NOT NULL REFERENCES catalog.product_variant(id) ON DELETE CASCADE,
  tier_type              VARCHAR(20) NOT NULL CHECK (tier_type IN ('quantity','customer_group','combined','audience')),
  min_quantity           INT,
  max_quantity           INT,
  customer_group_id      UUID,                                             -- FK to Medusa customer_group
  audience               VARCHAR(20) CHECK (audience IN ('b2c_retail','b2b_wholesale','b2b_distributor','b2b_oem','any')),

  unit_price_minor       BIGINT NOT NULL,
  currency               CHAR(3) NOT NULL,
  price_includes_vat     BOOLEAN NOT NULL DEFAULT FALSE,
  vat_rate_pct           NUMERIC(5,3),

  starts_at              TIMESTAMPTZ,
  ends_at                TIMESTAMPTZ,
  position               SMALLINT NOT NULL DEFAULT 1,

  CHECK (min_quantity IS NULL OR max_quantity IS NULL OR max_quantity >= min_quantity)
);

CREATE INDEX IF NOT EXISTS idx_price_tier_variant ON catalog.price_tier (variant_id, position);
CREATE INDEX IF NOT EXISTS idx_price_tier_active ON catalog.price_tier (variant_id, starts_at, ends_at);

-- ----------------------------------------------------------------------------
-- catalog.product_audience_availability — Per-audience rules per product (Gap 1)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.product_audience_availability (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  product_id             UUID NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  audience               VARCHAR(20) NOT NULL CHECK (audience IN ('b2c_retail','b2b_wholesale','b2b_distributor','b2b_oem','b2b_dropship')),
  is_available           BOOLEAN NOT NULL DEFAULT TRUE,
  min_quantity           INT,
  max_quantity           INT,
  visibility             VARCHAR(20) NOT NULL DEFAULT 'listed'
                          CHECK (visibility IN ('listed','hidden','unlisted_link_only','request_required')),
  requires_approval      BOOLEAN NOT NULL DEFAULT FALSE,
  approval_supplier_team_id UUID,

  UNIQUE (product_id, audience)
);

CREATE INDEX IF NOT EXISTS idx_product_audience ON catalog.product_audience_availability (product_id, audience);

-- ----------------------------------------------------------------------------
-- catalog.customization_request — OEM/ODM requests (Q-A3)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.customization_request (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,
  metadata               JSONB NOT NULL DEFAULT '{}',

  code                   VARCHAR(20) NOT NULL UNIQUE,                      -- CUS-XXXXXX
  buyer_id               UUID NOT NULL REFERENCES identity."user"(id),
  supplier_id            UUID NOT NULL REFERENCES identity.supplier(id),
  product_id             UUID REFERENCES catalog.product(id),
  rfq_id                 UUID,                                              -- FK created later
  request_type           VARCHAR(30) NOT NULL CHECK (request_type IN
    ('logo','packaging','color','material','dimension','spec','full_oem','formula')),
  description_i18n       JSONB NOT NULL,
  artwork_urls           TEXT[] DEFAULT '{}',
  target_quantity        INT NOT NULL,
  unit_code              VARCHAR(20) NOT NULL REFERENCES common.unit_master(code),
  budget_min_usd_minor   BIGINT,
  budget_max_usd_minor   BIGINT,
  revision_round         SMALLINT NOT NULL DEFAULT 0,
  max_revisions          SMALLINT NOT NULL DEFAULT 5,
  status                 VARCHAR(30) NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft','submitted','in_revision','approved','rejected','converted_to_order','cancelled','expired')),
  approval_gate_at       TIMESTAMPTZ,
  converted_order_id     UUID,                                              -- FK created later
  expires_at             TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_custom_req_buyer ON catalog.customization_request (buyer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_custom_req_supplier ON catalog.customization_request (supplier_id, status);
CREATE INDEX IF NOT EXISTS idx_custom_req_product ON catalog.customization_request (product_id);

-- ----------------------------------------------------------------------------
-- catalog.master_product_attribute — EAV attributes for matching
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.master_product_attribute (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  master_product_id      UUID NOT NULL REFERENCES catalog.master_product(id) ON DELETE CASCADE,
  attribute_key          VARCHAR(80) NOT NULL,
  value_text             TEXT,
  value_numeric          NUMERIC(20,6),
  value_unit             VARCHAR(20),
  is_filterable          BOOLEAN NOT NULL DEFAULT TRUE,

  UNIQUE (master_product_id, attribute_key)
);

CREATE INDEX IF NOT EXISTS idx_master_attr_filter ON catalog.master_product_attribute (attribute_key, value_text) WHERE is_filterable;

-- ----------------------------------------------------------------------------
-- catalog.product_match_signal — ML signals for matching supplier product → master
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.product_match_signal (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  supplier_product_id    UUID NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  candidate_master_id    UUID NOT NULL REFERENCES catalog.master_product(id) ON DELETE CASCADE,
  similarity_score       NUMERIC(5,4) NOT NULL CHECK (similarity_score BETWEEN 0 AND 1),
  match_method           VARCHAR(30) NOT NULL CHECK (match_method IN ('gtin_exact','title_fuzzy','image_perceptual','spec_ai','combined')),
  confidence             VARCHAR(10) CHECK (confidence IN ('low','medium','high','exact')),
  human_reviewed         BOOLEAN NOT NULL DEFAULT FALSE,
  accepted               BOOLEAN,
  reviewed_by_user_id    UUID REFERENCES identity."user"(id),

  UNIQUE (supplier_product_id, candidate_master_id)
);

CREATE INDEX IF NOT EXISTS idx_match_signal_supplier_product ON catalog.product_match_signal (supplier_product_id, similarity_score DESC);
CREATE INDEX IF NOT EXISTS idx_match_signal_master ON catalog.product_match_signal (candidate_master_id, similarity_score DESC);

-- ----------------------------------------------------------------------------
-- catalog.canonical_image — Master image owned by brand
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.canonical_image (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  master_product_id      UUID NOT NULL REFERENCES catalog.master_product(id) ON DELETE CASCADE,
  image_url              TEXT NOT NULL,
  position               SMALLINT NOT NULL DEFAULT 0,
  locked_by_brand        BOOLEAN NOT NULL DEFAULT FALSE,
  ai_quality_score       NUMERIC(5,2)
);

CREATE INDEX IF NOT EXISTS idx_canonical_image_master ON catalog.canonical_image (master_product_id, position);

-- ----------------------------------------------------------------------------
-- catalog.product_bundle — Bundle/kit
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.product_bundle (
  id                     UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id              VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at             TIMESTAMPTZ,

  bundle_code            VARCHAR(60) NOT NULL,
  name_i18n              JSONB NOT NULL,
  supplier_id            UUID REFERENCES identity.supplier(id) ON DELETE CASCADE,
  components             JSONB NOT NULL DEFAULT '[]',                      -- [{variant_id, quantity}]
  bundle_price_minor     BIGINT,
  bundle_currency        CHAR(3),
  discount_pct           NUMERIC(5,2),
  status                 VARCHAR(20) NOT NULL DEFAULT 'active'
                          CHECK (status IN ('draft','active','paused','retired')),

  UNIQUE (tenant_id, bundle_code)
);

CREATE INDEX IF NOT EXISTS idx_bundle_supplier ON catalog.product_bundle (supplier_id) WHERE deleted_at IS NULL;

-- ----------------------------------------------------------------------------
-- catalog.buy_box_algorithm_config — Buy Box weights per tenant
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.buy_box_algorithm_config (
  tenant_id              VARCHAR(20) PRIMARY KEY REFERENCES tenant.tenant_master(tenant_id) ON DELETE CASCADE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version                INT NOT NULL DEFAULT 1,

  weight_price           NUMERIC(4,3) NOT NULL DEFAULT 0.40,
  weight_fulfillment     NUMERIC(4,3) NOT NULL DEFAULT 0.20,
  weight_seller_perf     NUMERIC(4,3) NOT NULL DEFAULT 0.15,
  weight_stock           NUMERIC(4,3) NOT NULL DEFAULT 0.10,
  weight_returns         NUMERIC(4,3) NOT NULL DEFAULT 0.15,
  prime_eligible_boost   NUMERIC(4,3) NOT NULL DEFAULT 0.10,
  recompute_interval_minutes INT NOT NULL DEFAULT 60,
  algo_version           VARCHAR(20) NOT NULL DEFAULT 'v1.0',
  CHECK (weight_price + weight_fulfillment + weight_seller_perf + weight_stock + weight_returns BETWEEN 0.95 AND 1.05)
);

-- ----------------------------------------------------------------------------
-- catalog.buy_box_winner — Cached buy box winner per master product
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS catalog.buy_box_winner (
  master_product_id      UUID PRIMARY KEY REFERENCES catalog.master_product(id) ON DELETE CASCADE,
  current_winner_product_id UUID NOT NULL REFERENCES catalog.product(id) ON DELETE CASCADE,
  decided_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  score                  NUMERIC(8,4) NOT NULL,
  factors_jsonb          JSONB NOT NULL,
  runner_up_product_ids  UUID[] NOT NULL DEFAULT '{}',
  window_count           INT NOT NULL DEFAULT 1,
  expires_at             TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_buy_box_expires ON catalog.buy_box_winner (expires_at);

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------

CREATE TRIGGER trg_unit_master_updated_at BEFORE UPDATE ON common.unit_master
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_medusa_category_updated_at BEFORE UPDATE ON taxonomy.medusa_category
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_brand_updated_at BEFORE UPDATE ON catalog.brand
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_master_product_updated_at BEFORE UPDATE ON catalog.master_product
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_product_updated_at BEFORE UPDATE ON catalog.product
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_variant_updated_at BEFORE UPDATE ON catalog.product_variant
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_price_tier_updated_at BEFORE UPDATE ON catalog.price_tier
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_product_audience_updated_at BEFORE UPDATE ON catalog.product_audience_availability
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_custom_req_updated_at BEFORE UPDATE ON catalog.customization_request
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_bundle_updated_at BEFORE UPDATE ON catalog.product_bundle
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();
CREATE TRIGGER trg_buy_box_config_updated_at BEFORE UPDATE ON catalog.buy_box_algorithm_config
  FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- ----------------------------------------------------------------------------
-- RLS
-- ----------------------------------------------------------------------------

DO $rls$
DECLARE
  rec RECORD;
  schemas TEXT[] := ARRAY['catalog','taxonomy'];
  tables_with_tenant TEXT[] := ARRAY[
    'medusa_category','brand','master_product','product','product_variant',
    'price_tier','product_audience_availability','customization_request',
    'product_bundle','buy_box_algorithm_config'
  ];
  t TEXT;
  s TEXT;
BEGIN
  -- catalog tables with tenant_id
  FOREACH t IN ARRAY ARRAY['brand','master_product','product','product_variant',
                            'price_tier','product_audience_availability','customization_request',
                            'product_bundle','buy_box_algorithm_config'] LOOP
    EXECUTE format('ALTER TABLE catalog.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON catalog.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
      t
    );
  END LOOP;

  -- taxonomy.medusa_category
  ALTER TABLE taxonomy.medusa_category ENABLE ROW LEVEL SECURITY;
  CREATE POLICY tenant_isolation ON taxonomy.medusa_category
    USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));

  -- common.unit_conversion
  ALTER TABLE common.unit_conversion ENABLE ROW LEVEL SECURITY;
  CREATE POLICY tenant_isolation ON common.unit_conversion
    USING (tenant_id = public.current_tenant_id() OR pg_has_role('csr_admin','MEMBER'));
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('07_catalog.sql', 'Catalog: 15 tables (units, category tree, brand, master_product, gtin, product silo, variant, price_tier, audience, customization, EAV attrs, match signal, image, bundle, buy_box)');

-- ============================================================================
-- END 07_catalog.sql — 15 tables, 35+ indexes, 11 triggers, 11 RLS policies
-- ============================================================================
