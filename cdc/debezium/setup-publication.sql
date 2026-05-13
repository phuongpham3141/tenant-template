-- Run as superuser on PostgreSQL master before deploying Debezium
-- Creates the logical replication publication and slot.

ALTER SYSTEM SET wal_level = 'logical';
ALTER SYSTEM SET max_replication_slots = 10;
ALTER SYSTEM SET max_wal_senders = 10;
-- Restart required for the above settings.

CREATE PUBLICATION csr_cdc_pub FOR TABLE
  audit.audit_event,
  advertising.ads_impression_log,
  advertising.ads_click_log,
  advertising.ads_conversion_log,
  search.search_query_log,
  personalization.user_behavior_event,
  communication.conversation_message,
  live.livestream_chat_message,
  live.livestream_event_log,
  email_mkt.email_log,
  email_mkt.email_event_log,
  auth.login_attempt_log,
  auth.security_event_log,
  api.api_call_log,
  api.webhook_delivery_log,
  payment.payment_event_log,
  notification.notification_log,
  experiment.experiment_event_log,
  ai.inference_log,
  tax.tax_calculation_log,
  media.media_view_event,
  fraud.fraud_score_log,
  vn_sourcing.sourcing_event_log;

CREATE ROLE csr_cdc LOGIN PASSWORD 'replace_in_production' REPLICATION;
GRANT USAGE ON SCHEMA audit, advertising, search, personalization, communication, live, email_mkt, auth, api, payment, notification, experiment, ai, tax, media, fraud, vn_sourcing TO csr_cdc;
GRANT SELECT ON ALL TABLES IN SCHEMA audit, advertising, search, personalization, communication, live, email_mkt, auth, api, payment, notification, experiment, ai, tax, media, fraud, vn_sourcing TO csr_cdc;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit, advertising, search, personalization, communication, live, email_mkt, auth, api, payment, notification, experiment, ai, tax, media, fraud, vn_sourcing GRANT SELECT ON TABLES TO csr_cdc;
