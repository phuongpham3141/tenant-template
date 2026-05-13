-- ClickHouse 05: External dictionaries from PostgreSQL
-- These pull reference data from PG masters and cache in CH for JOIN-free lookups.
-- Set PG_HOST, PG_PORT, PG_USER, PG_PASS, PG_DB via env at deploy time.

------------------------------------------------------------
-- Tenant dictionary (cached lookup of tenant config)
------------------------------------------------------------
CREATE DICTIONARY IF NOT EXISTS audit_ch.tenant_dict
(
    id          UUID,
    slug        String,
    display_name String,
    status      String,
    plan_tier   String
)
PRIMARY KEY id
SOURCE(POSTGRESQL(
    host '{{PG_HOST}}'
    port {{PG_PORT}}
    user '{{PG_USER}}'
    password '{{PG_PASS}}'
    db '{{PG_DB}}'
    table 'admin.tenant'
    invalidate_query 'SELECT max(updated_at) FROM admin.tenant'
))
LIFETIME(MIN 300 MAX 600)
LAYOUT(HASHED());

------------------------------------------------------------
-- User dictionary
------------------------------------------------------------
CREATE DICTIONARY IF NOT EXISTS audit_ch.user_dict
(
    id              UUID,
    tenant_id       UUID,
    email           String,
    display_name    String,
    status          String,
    primary_supplier_id String DEFAULT ''
)
PRIMARY KEY id
SOURCE(POSTGRESQL(
    host '{{PG_HOST}}'
    port {{PG_PORT}}
    user '{{PG_USER}}'
    password '{{PG_PASS}}'
    db '{{PG_DB}}'
    table 'identity.user'
    invalidate_query 'SELECT max(updated_at) FROM identity.user'
))
LIFETIME(MIN 300 MAX 600)
LAYOUT(HASHED());

------------------------------------------------------------
-- Supplier dictionary
------------------------------------------------------------
CREATE DICTIONARY IF NOT EXISTS advertising_ch.supplier_dict
(
    id              UUID,
    tenant_id       UUID,
    legal_name      String,
    display_name    String,
    country_code    String,
    verification_tier UInt8,
    status          String
)
PRIMARY KEY id
SOURCE(POSTGRESQL(
    host '{{PG_HOST}}'
    port {{PG_PORT}}
    user '{{PG_USER}}'
    password '{{PG_PASS}}'
    db '{{PG_DB}}'
    table 'identity.supplier'
    invalidate_query 'SELECT max(updated_at) FROM identity.supplier'
))
LIFETIME(MIN 300 MAX 600)
LAYOUT(HASHED());

------------------------------------------------------------
-- Product dictionary
------------------------------------------------------------
CREATE DICTIONARY IF NOT EXISTS search_ch.product_dict
(
    id              UUID,
    tenant_id       UUID,
    supplier_id     UUID,
    sku             String,
    title_en        String,
    category_id     UUID,
    status          String,
    price_minor     Int64 DEFAULT 0,
    currency        String DEFAULT 'USD'
)
PRIMARY KEY id
SOURCE(POSTGRESQL(
    host '{{PG_HOST}}'
    port {{PG_PORT}}
    user '{{PG_USER}}'
    password '{{PG_PASS}}'
    db '{{PG_DB}}'
    query 'SELECT id, tenant_id, supplier_id, sku, title_i18n->>''en'' AS title_en, category_id::uuid, status, COALESCE(base_price_minor, 0) AS price_minor, COALESCE(base_currency, ''USD'') AS currency FROM catalog.product WHERE deleted_at IS NULL'
    invalidate_query 'SELECT max(updated_at) FROM catalog.product'
))
LIFETIME(MIN 600 MAX 1800)
LAYOUT(HASHED());

------------------------------------------------------------
-- Category dictionary (hierarchical, flat list)
------------------------------------------------------------
CREATE DICTIONARY IF NOT EXISTS search_ch.category_dict
(
    id              UUID,
    tenant_id       UUID,
    parent_id       UUID DEFAULT toUUID('00000000-0000-0000-0000-000000000000'),
    slug            String,
    name_en         String,
    path            String,
    level           UInt16,
    status          String
)
PRIMARY KEY id
SOURCE(POSTGRESQL(
    host '{{PG_HOST}}'
    port {{PG_PORT}}
    user '{{PG_USER}}'
    password '{{PG_PASS}}'
    db '{{PG_DB}}'
    query 'SELECT id, tenant_id, COALESCE(parent_category_id, ''00000000-0000-0000-0000-000000000000'')::uuid AS parent_id, slug, name_i18n->>''en'' AS name_en, COALESCE(mpath::text, '''') AS path, COALESCE(depth, 0) AS level, status FROM catalog.category WHERE deleted_at IS NULL'
))
LIFETIME(MIN 600 MAX 1800)
LAYOUT(HASHED());

------------------------------------------------------------
-- Campaign dictionary
------------------------------------------------------------
CREATE DICTIONARY IF NOT EXISTS advertising_ch.campaign_dict
(
    id              UUID,
    tenant_id       UUID,
    supplier_id     UUID,
    name            String,
    objective       String,
    status          String,
    budget_minor    Int64 DEFAULT 0,
    currency        String DEFAULT 'USD',
    start_date      Date,
    end_date        Date DEFAULT toDate('2099-12-31')
)
PRIMARY KEY id
SOURCE(POSTGRESQL(
    host '{{PG_HOST}}'
    port {{PG_PORT}}
    user '{{PG_USER}}'
    password '{{PG_PASS}}'
    db '{{PG_DB}}'
    table 'advertising.ad_campaign'
    invalidate_query 'SELECT max(updated_at) FROM advertising.ad_campaign'
))
LIFETIME(MIN 300 MAX 900)
LAYOUT(HASHED());

------------------------------------------------------------
-- Country dictionary (rare changes)
------------------------------------------------------------
CREATE DICTIONARY IF NOT EXISTS audit_ch.country_dict
(
    code            String,
    name_en         String,
    region          String,
    currency        String,
    is_eu           UInt8 DEFAULT 0,
    is_oecd         UInt8 DEFAULT 0
)
PRIMARY KEY code
SOURCE(POSTGRESQL(
    host '{{PG_HOST}}'
    port {{PG_PORT}}
    user '{{PG_USER}}'
    password '{{PG_PASS}}'
    db '{{PG_DB}}'
    table 'admin.country_master'
))
LIFETIME(MIN 3600 MAX 86400)
LAYOUT(HASHED());

------------------------------------------------------------
-- HS code dictionary
------------------------------------------------------------
CREATE DICTIONARY IF NOT EXISTS tax_ch.hs_code_dict
(
    code            String,
    description_en  String,
    chapter         String,
    section         String,
    duty_rate_pct   Float32 DEFAULT 0
)
PRIMARY KEY code
SOURCE(POSTGRESQL(
    host '{{PG_HOST}}'
    port {{PG_PORT}}
    user '{{PG_USER}}'
    password '{{PG_PASS}}'
    db '{{PG_DB}}'
    table 'tax.hs_code_master'
))
LIFETIME(MIN 3600 MAX 86400)
LAYOUT(HASHED());

------------------------------------------------------------
-- Usage examples in queries:
-- SELECT dictGetString('search_ch.product_dict', 'title_en', product_id) AS title
-- SELECT dictGetUInt8('advertising_ch.supplier_dict', 'verification_tier', supplier_id) AS tier
------------------------------------------------------------
