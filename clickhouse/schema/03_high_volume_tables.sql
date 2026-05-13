-- ClickHouse 03: High-volume event tables
-- These mirror PG tables with append-only patterns at huge volume.

------------------------------------------------------------
-- ADVERTISING
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS advertising_ch.ads_impression_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    campaign_id     UUID,
    ad_group_id     Nullable(UUID),
    creative_id     Nullable(UUID),
    placement_id    Nullable(String),
    placement_type  LowCardinality(String),
    page_url        Nullable(String),
    user_id         Nullable(UUID),
    session_id      Nullable(UUID),
    device_type     LowCardinality(String) DEFAULT 'unknown',
    country_code    LowCardinality(String) DEFAULT 'XX',
    region_code     Nullable(String),
    cost_micros     Int64 DEFAULT 0,
    currency        LowCardinality(String) DEFAULT 'USD',
    bid_strategy    LowCardinality(String) DEFAULT 'auto',
    viewable        UInt8 DEFAULT 0,
    fraud_score     Float32 DEFAULT 0,
    metadata        String CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, campaign_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 18 MONTH;

CREATE TABLE IF NOT EXISTS advertising_ch.ads_click_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    impression_id   Nullable(UUID),
    campaign_id     UUID,
    ad_group_id     Nullable(UUID),
    creative_id     Nullable(UUID),
    user_id         Nullable(UUID),
    session_id      Nullable(UUID),
    landing_url     Nullable(String),
    cost_micros     Int64 DEFAULT 0,
    currency        LowCardinality(String) DEFAULT 'USD',
    converted       UInt8 DEFAULT 0,
    conversion_value_micros Int64 DEFAULT 0,
    fraud_score     Float32 DEFAULT 0,
    metadata        String CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, campaign_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 24 MONTH;

CREATE TABLE IF NOT EXISTS advertising_ch.ads_conversion_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    click_id        Nullable(UUID),
    campaign_id     UUID,
    user_id         Nullable(UUID),
    order_id        Nullable(UUID),
    conversion_type LowCardinality(String),
    value_micros    Int64 DEFAULT 0,
    currency        LowCardinality(String) DEFAULT 'USD',
    attribution_model LowCardinality(String) DEFAULT 'last_click',
    metadata        String CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, campaign_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 36 MONTH;

------------------------------------------------------------
-- SEARCH
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS search_ch.search_query_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    query_text      String,
    query_normalized String,
    locale          LowCardinality(String) DEFAULT 'en',
    user_id         Nullable(UUID),
    session_id      Nullable(UUID),
    result_count    UInt32 DEFAULT 0,
    page            UInt16 DEFAULT 1,
    has_results     UInt8 DEFAULT 1,
    clicked_position Nullable(UInt32),
    clicked_product_id Nullable(UUID),
    filters_applied String DEFAULT '{}' CODEC(ZSTD(3)),
    search_latency_ms Int32 DEFAULT 0,
    response_source LowCardinality(String) DEFAULT 'elasticsearch',
    INDEX idx_query (query_normalized) TYPE bloom_filter(0.01) GRANULARITY 4
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 24 MONTH;

CREATE TABLE IF NOT EXISTS search_ch.zero_result_query_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    query_text      String,
    query_normalized String,
    locale          LowCardinality(String) DEFAULT 'en',
    user_id         Nullable(UUID),
    session_id      Nullable(UUID),
    filters_applied String DEFAULT '{}'
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 12 MONTH;

------------------------------------------------------------
-- PERSONALIZATION
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS personalization_ch.user_behavior_event
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    user_id         Nullable(UUID),
    session_id      Nullable(UUID),
    anonymous_id    Nullable(String),
    event_type      LowCardinality(String),
    event_category  LowCardinality(String),
    page_url        Nullable(String),
    referrer_url    Nullable(String),
    product_id      Nullable(UUID),
    category_id     Nullable(UUID),
    supplier_id     Nullable(UUID),
    dwell_time_ms   Int32 DEFAULT 0,
    scroll_depth_pct Int16 DEFAULT 0,
    device_type     LowCardinality(String) DEFAULT 'unknown',
    country_code    LowCardinality(String) DEFAULT 'XX',
    locale          LowCardinality(String) DEFAULT 'en',
    properties      String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, user_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 24 MONTH;

CREATE TABLE IF NOT EXISTS personalization_ch.product_view_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    user_id         Nullable(UUID),
    session_id      Nullable(UUID),
    product_id      UUID,
    supplier_id     Nullable(UUID),
    source          LowCardinality(String) DEFAULT 'browse',
    source_query_id Nullable(UUID),
    dwell_time_ms   Int32 DEFAULT 0
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, product_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 18 MONTH;

------------------------------------------------------------
-- COMMUNICATION
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS communication_ch.conversation_message
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    conversation_id UUID,
    sender_user_id  UUID,
    sender_role     LowCardinality(String),
    message_type    LowCardinality(String) DEFAULT 'text',
    body            String CODEC(ZSTD(6)),
    has_attachment  UInt8 DEFAULT 0,
    is_translated   UInt8 DEFAULT 0,
    source_locale   LowCardinality(String) DEFAULT 'en',
    metadata        String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, conversation_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 36 MONTH;

------------------------------------------------------------
-- LIVE
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS live_ch.livestream_chat_message
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    stream_id       UUID,
    user_id         Nullable(UUID),
    anonymous_id    Nullable(String),
    body            String,
    is_pinned       UInt8 DEFAULT 0,
    is_moderated    UInt8 DEFAULT 0,
    reactions_count UInt32 DEFAULT 0
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, stream_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 24 MONTH;

CREATE TABLE IF NOT EXISTS live_ch.livestream_event_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    stream_id       UUID,
    user_id         Nullable(UUID),
    event_type      LowCardinality(String),
    properties      String DEFAULT '{}'
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, stream_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 18 MONTH;

CREATE TABLE IF NOT EXISTS live_ch.livestream_concurrent_viewers
(
    tenant_id       UUID,
    stream_id       UUID,
    snapshot_at     DateTime64(3, 'UTC'),
    viewer_count    UInt32,
    new_viewers     UInt32 DEFAULT 0,
    churned_viewers UInt32 DEFAULT 0,
    avg_dwell_ms    Int32 DEFAULT 0
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(snapshot_at)
ORDER BY (tenant_id, stream_id, snapshot_at)
TTL toDateTime(snapshot_at) + INTERVAL 12 MONTH;

------------------------------------------------------------
-- EMAIL MARKETING
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS email_ch.email_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    template_id     Nullable(UUID),
    journey_id      Nullable(UUID),
    campaign_id     Nullable(UUID),
    to_user_id      Nullable(UUID),
    to_email_hash   String,
    subject_snippet String,
    status          LowCardinality(String) DEFAULT 'sent',
    bounce_type     Nullable(LowCardinality(String)),
    sent_at         DateTime64(3, 'UTC'),
    delivered_at    Nullable(DateTime64(3, 'UTC')),
    opened_at       Nullable(DateTime64(3, 'UTC')),
    first_click_at  Nullable(DateTime64(3, 'UTC')),
    unsubscribed_at Nullable(DateTime64(3, 'UTC')),
    complaint_at    Nullable(DateTime64(3, 'UTC')),
    provider        LowCardinality(String) DEFAULT 'sendgrid',
    metadata        String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 24 MONTH;

CREATE TABLE IF NOT EXISTS email_ch.email_event_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    email_log_id    UUID,
    event_type      LowCardinality(String),
    user_agent      Nullable(String),
    ip              Nullable(IPv6),
    click_url       Nullable(String),
    metadata        String DEFAULT '{}'
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, email_log_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 24 MONTH;

------------------------------------------------------------
-- AUTH SECURITY
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth_ch.login_attempt_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    user_id         Nullable(UUID),
    identifier      String,
    identifier_type LowCardinality(String),
    auth_method     LowCardinality(String) DEFAULT 'password',
    success         UInt8 DEFAULT 0,
    failure_reason  Nullable(LowCardinality(String)),
    ip              Nullable(IPv6),
    user_agent      Nullable(String),
    country_code    LowCardinality(String) DEFAULT 'XX',
    device_fingerprint Nullable(String),
    risk_score      Float32 DEFAULT 0,
    mfa_required    UInt8 DEFAULT 0,
    mfa_passed      UInt8 DEFAULT 0
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, identifier, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 18 MONTH;

CREATE TABLE IF NOT EXISTS auth_ch.security_event_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    user_id         Nullable(UUID),
    event_type      LowCardinality(String),
    severity        LowCardinality(String) DEFAULT 'info',
    ip              Nullable(IPv6),
    user_agent      Nullable(String),
    details         String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 36 MONTH;

------------------------------------------------------------
-- API
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS api_ch.api_call_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    api_key_id      Nullable(UUID),
    user_id         Nullable(UUID),
    endpoint        LowCardinality(String),
    http_method     LowCardinality(String),
    path            String,
    query_params    Nullable(String),
    status_code     UInt16,
    latency_ms      Int32 DEFAULT 0,
    request_size_bytes Int32 DEFAULT 0,
    response_size_bytes Int32 DEFAULT 0,
    ip              Nullable(IPv6),
    user_agent      Nullable(String),
    rate_limited    UInt8 DEFAULT 0,
    cache_hit       UInt8 DEFAULT 0,
    error_code      Nullable(LowCardinality(String))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, endpoint, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 12 MONTH;

CREATE TABLE IF NOT EXISTS api_ch.webhook_delivery_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    webhook_id      UUID,
    event_type      LowCardinality(String),
    delivery_attempt UInt16 DEFAULT 1,
    status_code     Nullable(UInt16),
    latency_ms      Int32 DEFAULT 0,
    success         UInt8 DEFAULT 0,
    error_message   Nullable(String),
    payload_hash    Nullable(String)
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, webhook_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 6 MONTH;

------------------------------------------------------------
-- PAYMENT
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS payment_ch.payment_event_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    payment_id      Nullable(UUID),
    order_id        Nullable(UUID),
    event_type      LowCardinality(String),
    processor       LowCardinality(String),
    amount_minor    Int64 DEFAULT 0,
    currency        LowCardinality(String) DEFAULT 'USD',
    status          LowCardinality(String),
    failure_code    Nullable(LowCardinality(String)),
    metadata        String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 7 YEAR;

------------------------------------------------------------
-- NOTIFICATION
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notification_ch.notification_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    user_id         Nullable(UUID),
    channel         LowCardinality(String),
    template_id     Nullable(UUID),
    notification_type LowCardinality(String),
    delivery_status LowCardinality(String) DEFAULT 'pending',
    sent_at         Nullable(DateTime64(3, 'UTC')),
    delivered_at    Nullable(DateTime64(3, 'UTC')),
    opened_at       Nullable(DateTime64(3, 'UTC')),
    clicked_at      Nullable(DateTime64(3, 'UTC')),
    failure_reason  Nullable(String),
    provider        LowCardinality(String),
    metadata        String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 18 MONTH;

------------------------------------------------------------
-- EXPERIMENT
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS experiment_ch.experiment_event_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    experiment_id   UUID,
    variant_id      UUID,
    user_id         Nullable(UUID),
    session_id      Nullable(UUID),
    event_type      LowCardinality(String),
    metric_value    Float64 DEFAULT 0,
    properties      String DEFAULT '{}'
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, experiment_id, variant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 24 MONTH;

------------------------------------------------------------
-- AI
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_ch.ai_inference_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    model_id        LowCardinality(String),
    model_provider  LowCardinality(String),
    model_version   Nullable(String),
    operation       LowCardinality(String),
    request_tokens  Int32 DEFAULT 0,
    response_tokens Int32 DEFAULT 0,
    total_tokens    Int32 DEFAULT 0,
    cost_micros     Int64 DEFAULT 0,
    currency        LowCardinality(String) DEFAULT 'USD',
    latency_ms      Int32 DEFAULT 0,
    cache_hit       UInt8 DEFAULT 0,
    user_id         Nullable(UUID),
    feature_code    LowCardinality(String),
    success         UInt8 DEFAULT 1,
    error_code      Nullable(LowCardinality(String)),
    prompt_hash     Nullable(String),
    metadata        String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, model_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 24 MONTH;

------------------------------------------------------------
-- TAX
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tax_ch.tax_calculation_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    order_id        Nullable(UUID),
    cart_id         Nullable(UUID),
    origin_country  LowCardinality(String),
    dest_country    LowCardinality(String),
    hs_code         Nullable(String),
    fta_applied     LowCardinality(String) DEFAULT 'none',
    subtotal_minor  Int64 DEFAULT 0,
    tax_minor       Int64 DEFAULT 0,
    duty_minor      Int64 DEFAULT 0,
    vat_minor       Int64 DEFAULT 0,
    currency        LowCardinality(String) DEFAULT 'USD',
    provider        LowCardinality(String) DEFAULT 'internal',
    metadata        String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 7 YEAR;

------------------------------------------------------------
-- MEDIA
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media_ch.media_view_event
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    media_asset_id  UUID,
    media_type      LowCardinality(String),
    user_id         Nullable(UUID),
    session_id      Nullable(UUID),
    play_position_ms Int32 DEFAULT 0,
    duration_played_ms Int32 DEFAULT 0,
    completed       UInt8 DEFAULT 0,
    device_type     LowCardinality(String) DEFAULT 'unknown',
    bandwidth_kbps  Int32 DEFAULT 0
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, media_asset_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 18 MONTH;

------------------------------------------------------------
-- FRAUD
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fraud_ch.fraud_score_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    entity_type     LowCardinality(String),
    entity_id       UUID,
    user_id         Nullable(UUID),
    risk_score      Float32 DEFAULT 0,
    risk_band       LowCardinality(String) DEFAULT 'unknown',
    rules_triggered Array(String),
    model_version   LowCardinality(String),
    action_taken    LowCardinality(String) DEFAULT 'none',
    metadata        String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, entity_type, entity_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 36 MONTH;

------------------------------------------------------------
-- VN SOURCING
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vn_sourcing_ch.sourcing_event_log
(
    id              UUID,
    tenant_id       UUID,
    occurred_at     DateTime64(3, 'UTC'),
    customer_id     Nullable(UUID),
    rfq_id          Nullable(UUID),
    factory_visit_id Nullable(UUID),
    interpreter_session_id Nullable(UUID),
    event_type      LowCardinality(String),
    stage           LowCardinality(String),
    actor_role      LowCardinality(String),
    metadata        String DEFAULT '{}' CODEC(ZSTD(3))
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 36 MONTH;
