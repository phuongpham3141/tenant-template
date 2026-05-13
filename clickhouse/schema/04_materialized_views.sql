-- ClickHouse 04: Materialized views for pre-aggregated analytics

------------------------------------------------------------
-- ADVERTISING — hourly impression/click/conversion rollup
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS advertising_ch.ads_performance_hourly
(
    tenant_id       UUID,
    campaign_id     UUID,
    ad_group_id     Nullable(UUID),
    bucket_hour     DateTime,
    impressions     AggregateFunction(count, UInt64),
    clicks          AggregateFunction(count, UInt64),
    cost_micros     AggregateFunction(sum, Int64),
    viewable        AggregateFunction(sum, UInt8),
    distinct_users  AggregateFunction(uniq, UUID)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_hour)
ORDER BY (tenant_id, campaign_id, ad_group_id, bucket_hour);

CREATE MATERIALIZED VIEW IF NOT EXISTS advertising_ch.mv_ads_impression_hourly
TO advertising_ch.ads_performance_hourly AS
SELECT
    tenant_id,
    campaign_id,
    ad_group_id,
    toStartOfHour(occurred_at) AS bucket_hour,
    countState() AS impressions,
    countState() * 0 AS clicks,
    sumState(cost_micros) AS cost_micros,
    sumState(viewable) AS viewable,
    uniqState(user_id) AS distinct_users
FROM advertising_ch.ads_impression_log
GROUP BY tenant_id, campaign_id, ad_group_id, bucket_hour;

------------------------------------------------------------
-- SEARCH — top queries per day
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS search_ch.top_queries_daily
(
    tenant_id           UUID,
    bucket_day          Date,
    query_normalized    String,
    locale              LowCardinality(String),
    query_count         AggregateFunction(count, UInt64),
    distinct_users      AggregateFunction(uniq, UUID),
    avg_result_count    AggregateFunction(avg, UInt32),
    zero_result_count   AggregateFunction(countIf, UInt32),
    avg_latency_ms      AggregateFunction(avg, Int32)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_day)
ORDER BY (tenant_id, bucket_day, query_normalized, locale);

CREATE MATERIALIZED VIEW IF NOT EXISTS search_ch.mv_top_queries_daily
TO search_ch.top_queries_daily AS
SELECT
    tenant_id,
    toDate(occurred_at) AS bucket_day,
    query_normalized,
    locale,
    countState() AS query_count,
    uniqState(user_id) AS distinct_users,
    avgState(result_count) AS avg_result_count,
    countIfState(result_count = 0) AS zero_result_count,
    avgState(search_latency_ms) AS avg_latency_ms
FROM search_ch.search_query_log
GROUP BY tenant_id, bucket_day, query_normalized, locale;

------------------------------------------------------------
-- PERSONALIZATION — daily user activity rollup
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS personalization_ch.user_activity_daily
(
    tenant_id       UUID,
    bucket_day      Date,
    user_id         UUID,
    event_count     AggregateFunction(count, UInt64),
    distinct_events AggregateFunction(uniq, LowCardinality(String)),
    products_viewed AggregateFunction(uniq, UUID),
    categories_viewed AggregateFunction(uniq, UUID),
    sessions        AggregateFunction(uniq, UUID),
    total_dwell_ms  AggregateFunction(sum, Int32)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_day)
ORDER BY (tenant_id, bucket_day, user_id);

CREATE MATERIALIZED VIEW IF NOT EXISTS personalization_ch.mv_user_activity_daily
TO personalization_ch.user_activity_daily AS
SELECT
    tenant_id,
    toDate(occurred_at) AS bucket_day,
    user_id,
    countState() AS event_count,
    uniqState(event_type) AS distinct_events,
    uniqState(product_id) AS products_viewed,
    uniqState(category_id) AS categories_viewed,
    uniqState(session_id) AS sessions,
    sumState(dwell_time_ms) AS total_dwell_ms
FROM personalization_ch.user_behavior_event
WHERE user_id IS NOT NULL
GROUP BY tenant_id, bucket_day, user_id;

------------------------------------------------------------
-- EMAIL — daily metrics
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS email_ch.email_metrics_daily
(
    tenant_id        UUID,
    bucket_day       Date,
    template_id      Nullable(UUID),
    journey_id       Nullable(UUID),
    sent             AggregateFunction(count, UInt64),
    delivered        AggregateFunction(countIf, UInt32),
    opened           AggregateFunction(countIf, UInt32),
    clicked          AggregateFunction(countIf, UInt32),
    bounced          AggregateFunction(countIf, UInt32),
    unsubscribed     AggregateFunction(countIf, UInt32),
    complaints       AggregateFunction(countIf, UInt32)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_day)
ORDER BY (tenant_id, bucket_day, template_id, journey_id);

CREATE MATERIALIZED VIEW IF NOT EXISTS email_ch.mv_email_metrics_daily
TO email_ch.email_metrics_daily AS
SELECT
    tenant_id,
    toDate(occurred_at) AS bucket_day,
    template_id,
    journey_id,
    countState() AS sent,
    countIfState(status = 'delivered') AS delivered,
    countIfState(opened_at IS NOT NULL) AS opened,
    countIfState(first_click_at IS NOT NULL) AS clicked,
    countIfState(status = 'bounced') AS bounced,
    countIfState(unsubscribed_at IS NOT NULL) AS unsubscribed,
    countIfState(complaint_at IS NOT NULL) AS complaints
FROM email_ch.email_log
GROUP BY tenant_id, bucket_day, template_id, journey_id;

------------------------------------------------------------
-- API — per-endpoint hourly latency stats
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS api_ch.api_metrics_hourly
(
    tenant_id       UUID,
    endpoint        LowCardinality(String),
    bucket_hour     DateTime,
    request_count   AggregateFunction(count, UInt64),
    p50_latency_ms  AggregateFunction(quantileTDigest(0.5), Int32),
    p95_latency_ms  AggregateFunction(quantileTDigest(0.95), Int32),
    p99_latency_ms  AggregateFunction(quantileTDigest(0.99), Int32),
    error_count     AggregateFunction(countIf, UInt32),
    success_count   AggregateFunction(countIf, UInt32),
    rate_limited    AggregateFunction(sum, UInt8)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_hour)
ORDER BY (tenant_id, endpoint, bucket_hour);

CREATE MATERIALIZED VIEW IF NOT EXISTS api_ch.mv_api_metrics_hourly
TO api_ch.api_metrics_hourly AS
SELECT
    tenant_id,
    endpoint,
    toStartOfHour(occurred_at) AS bucket_hour,
    countState() AS request_count,
    quantileTDigestState(0.5)(latency_ms) AS p50_latency_ms,
    quantileTDigestState(0.95)(latency_ms) AS p95_latency_ms,
    quantileTDigestState(0.99)(latency_ms) AS p99_latency_ms,
    countIfState(status_code >= 400) AS error_count,
    countIfState(status_code < 400) AS success_count,
    sumState(rate_limited) AS rate_limited
FROM api_ch.api_call_log
GROUP BY tenant_id, endpoint, bucket_hour;

------------------------------------------------------------
-- LIVE — stream summary
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS live_ch.livestream_summary_daily
(
    tenant_id       UUID,
    bucket_day      Date,
    stream_id       UUID,
    chat_messages   AggregateFunction(count, UInt64),
    distinct_chatters AggregateFunction(uniq, UUID),
    peak_concurrent AggregateFunction(max, UInt32),
    total_events    AggregateFunction(count, UInt64)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_day)
ORDER BY (tenant_id, bucket_day, stream_id);

CREATE MATERIALIZED VIEW IF NOT EXISTS live_ch.mv_livestream_chat_daily
TO live_ch.livestream_summary_daily AS
SELECT
    tenant_id,
    toDate(occurred_at) AS bucket_day,
    stream_id,
    countState() AS chat_messages,
    uniqState(user_id) AS distinct_chatters,
    maxState(toUInt32(0)) AS peak_concurrent,
    countState() AS total_events
FROM live_ch.livestream_chat_message
GROUP BY tenant_id, bucket_day, stream_id;

------------------------------------------------------------
-- AI — cost rollup daily
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_ch.ai_cost_daily
(
    tenant_id           UUID,
    bucket_day          Date,
    model_id            LowCardinality(String),
    feature_code        LowCardinality(String),
    inference_count     AggregateFunction(count, UInt64),
    total_tokens        AggregateFunction(sum, Int64),
    total_cost_micros   AggregateFunction(sum, Int64),
    cache_hits          AggregateFunction(sum, UInt8),
    errors              AggregateFunction(countIf, UInt32),
    avg_latency_ms      AggregateFunction(avg, Int32)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_day)
ORDER BY (tenant_id, bucket_day, model_id, feature_code);

CREATE MATERIALIZED VIEW IF NOT EXISTS ai_ch.mv_ai_cost_daily
TO ai_ch.ai_cost_daily AS
SELECT
    tenant_id,
    toDate(occurred_at) AS bucket_day,
    model_id,
    feature_code,
    countState() AS inference_count,
    sumState(toInt64(total_tokens)) AS total_tokens,
    sumState(cost_micros) AS total_cost_micros,
    sumState(cache_hit) AS cache_hits,
    countIfState(success = 0) AS errors,
    avgState(latency_ms) AS avg_latency_ms
FROM ai_ch.ai_inference_log
GROUP BY tenant_id, bucket_day, model_id, feature_code;

------------------------------------------------------------
-- AUTH — security risk daily summary
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth_ch.login_summary_daily
(
    tenant_id       UUID,
    bucket_day      Date,
    country_code    LowCardinality(String),
    total_attempts  AggregateFunction(count, UInt64),
    successful      AggregateFunction(sum, UInt8),
    failed          AggregateFunction(countIf, UInt32),
    distinct_users  AggregateFunction(uniq, UUID),
    distinct_ips    AggregateFunction(uniq, IPv6),
    avg_risk_score  AggregateFunction(avg, Float32)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_day)
ORDER BY (tenant_id, bucket_day, country_code);

CREATE MATERIALIZED VIEW IF NOT EXISTS auth_ch.mv_login_summary_daily
TO auth_ch.login_summary_daily AS
SELECT
    tenant_id,
    toDate(occurred_at) AS bucket_day,
    country_code,
    countState() AS total_attempts,
    sumState(success) AS successful,
    countIfState(success = 0) AS failed,
    uniqState(user_id) AS distinct_users,
    uniqState(ip) AS distinct_ips,
    avgState(risk_score) AS avg_risk_score
FROM auth_ch.login_attempt_log
GROUP BY tenant_id, bucket_day, country_code;
