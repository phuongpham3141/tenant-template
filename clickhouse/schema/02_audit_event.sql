-- ClickHouse 02: audit_event mirror table
-- Replicates audit.audit_event from PostgreSQL via Debezium CDC → Kafka → CH

CREATE TABLE IF NOT EXISTS audit_ch.audit_event
(
    id                  UUID,
    tenant_id           UUID,
    occurred_at         DateTime64(6, 'UTC'),
    actor_user_id       Nullable(UUID),
    actor_session_id    Nullable(UUID),
    actor_ip            Nullable(IPv6),
    actor_user_agent    Nullable(String),
    action_code         LowCardinality(String),
    resource_type       LowCardinality(String),
    resource_id         Nullable(String),
    resource_tenant_id  Nullable(UUID),
    before_state        Nullable(String) CODEC(ZSTD(6)),
    after_state         Nullable(String) CODEC(ZSTD(6)),
    diff_state          Nullable(String) CODEC(ZSTD(6)),
    severity            LowCardinality(String) DEFAULT 'info',
    outcome             LowCardinality(String) DEFAULT 'success',
    correlation_id      Nullable(UUID),
    trace_id            Nullable(String),
    span_id             Nullable(String),
    request_id          Nullable(String),
    metadata            String DEFAULT '{}',
    schema_version      UInt16 DEFAULT 1,
    ingested_at         DateTime64(6, 'UTC') DEFAULT now64(6),
    INDEX idx_actor (actor_user_id) TYPE bloom_filter GRANULARITY 4,
    INDEX idx_resource (resource_type, resource_id) TYPE bloom_filter GRANULARITY 4,
    INDEX idx_action (action_code) TYPE set(100) GRANULARITY 4,
    INDEX idx_severity (severity) TYPE set(10) GRANULARITY 4
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (tenant_id, occurred_at, id)
TTL toDateTime(occurred_at) + INTERVAL 7 YEAR
SETTINGS index_granularity = 8192;

-- Materialized view: hourly aggregation per (tenant, action, resource_type)
CREATE TABLE IF NOT EXISTS audit_ch.audit_event_hourly
(
    tenant_id      UUID,
    bucket_hour    DateTime,
    action_code    LowCardinality(String),
    resource_type  LowCardinality(String),
    severity       LowCardinality(String),
    outcome        LowCardinality(String),
    event_count    AggregateFunction(count, UInt64),
    distinct_users AggregateFunction(uniq, UUID),
    distinct_ips   AggregateFunction(uniq, IPv6)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_hour)
ORDER BY (tenant_id, bucket_hour, action_code, resource_type, severity, outcome);

CREATE MATERIALIZED VIEW IF NOT EXISTS audit_ch.mv_audit_event_hourly
TO audit_ch.audit_event_hourly AS
SELECT
    tenant_id,
    toStartOfHour(occurred_at) AS bucket_hour,
    action_code,
    resource_type,
    severity,
    outcome,
    countState() AS event_count,
    uniqState(actor_user_id) AS distinct_users,
    uniqState(actor_ip) AS distinct_ips
FROM audit_ch.audit_event
GROUP BY tenant_id, bucket_hour, action_code, resource_type, severity, outcome;

-- Daily rollup
CREATE TABLE IF NOT EXISTS audit_ch.audit_event_daily
(
    tenant_id      UUID,
    bucket_day     Date,
    action_code    LowCardinality(String),
    resource_type  LowCardinality(String),
    severity       LowCardinality(String),
    outcome        LowCardinality(String),
    event_count    AggregateFunction(count, UInt64),
    distinct_users AggregateFunction(uniq, UUID),
    distinct_ips   AggregateFunction(uniq, IPv6)
)
ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(bucket_day)
ORDER BY (tenant_id, bucket_day, action_code, resource_type, severity, outcome);

CREATE MATERIALIZED VIEW IF NOT EXISTS audit_ch.mv_audit_event_daily
TO audit_ch.audit_event_daily AS
SELECT
    tenant_id,
    toDate(occurred_at) AS bucket_day,
    action_code,
    resource_type,
    severity,
    outcome,
    countState() AS event_count,
    uniqState(actor_user_id) AS distinct_users,
    uniqState(actor_ip) AS distinct_ips
FROM audit_ch.audit_event
GROUP BY tenant_id, bucket_day, action_code, resource_type, severity, outcome;
