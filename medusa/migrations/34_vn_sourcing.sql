-- Migration 34: Vietnam B2B Sourcing Specifics (Domain 39) — 34 entities
\set ON_ERROR_STOP on

-- 1. Language services (3)
CREATE TABLE IF NOT EXISTS vn_sourcing.interpreter_profile (
  user_id UUID PRIMARY KEY REFERENCES identity."user"(id) ON DELETE CASCADE,
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  languages_pair JSONB,
  specialty VARCHAR(30) CHECK (specialty IN ('legal','technical','business','customs','medical','general')),
  hourly_rate_usd_minor BIGINT, hourly_rate_for_legal_usd_minor BIGINT,
  rating NUMERIC(3,2),
  total_minutes_lifetime BIGINT DEFAULT 0,
  total_sessions INT DEFAULT 0,
  availability_calendar_jsonb JSONB,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','busy','offline','suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vn_sourcing.interpreter_booking (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  booking_code VARCHAR(20) NOT NULL UNIQUE,
  buyer_id UUID, supplier_id UUID,
  interpreter_id UUID REFERENCES vn_sourcing.interpreter_profile(user_id),
  context_type VARCHAR(30) CHECK (context_type IN ('sts_order','meet_suppliers','sample_order','contract_legal','trade_show')),
  context_entity_id UUID,
  scheduled_start_at TIMESTAMPTZ, scheduled_end_at TIMESTAMPTZ,
  language_pair JSONB,
  mode VARCHAR(20) CHECK (mode IN ('chat_relay','video_join','phone_conference')),
  free_minutes_eligible INT, free_minutes_used INT DEFAULT 0,
  billable_minutes_used INT DEFAULT 0,
  billable_rate_minor BIGINT,
  total_cost_minor BIGINT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_interp_booking_interpreter ON vn_sourcing.interpreter_booking (interpreter_id, scheduled_start_at);

CREATE TABLE IF NOT EXISTS vn_sourcing.interpretation_session_log (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  booking_id UUID NOT NULL REFERENCES vn_sourcing.interpreter_booking(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ, ended_at TIMESTAMPTZ,
  duration_seconds INT,
  messages_translated_count INT,
  qa_count INT,
  latency_avg_ms INT,
  quality_score NUMERIC(3,2),
  supplier_quality_score NUMERIC(3,2),
  interpreter_notes TEXT,
  dispute_flag BOOLEAN DEFAULT FALSE,
  recording_audio_url TEXT, transcript_url TEXT
);

-- 2. Factory Visit (2)
CREATE TABLE IF NOT EXISTS vn_sourcing.factory_visit_request (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  request_code VARCHAR(20) NOT NULL UNIQUE,
  buyer_id UUID NOT NULL,
  requested_factory_ids UUID[],
  preferred_dates DATE[],
  group_size INT,
  transport_required VARCHAR(30),
  interpreter_required BOOLEAN DEFAULT FALSE,
  interpreter_languages TEXT[],
  accommodation_needed BOOLEAN DEFAULT FALSE,
  agenda_topics_i18n JSONB,
  status VARCHAR(20) DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vn_sourcing.factory_visit_itinerary (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  request_id UUID NOT NULL REFERENCES vn_sourcing.factory_visit_request(id) ON DELETE CASCADE,
  day_number INT, date DATE,
  supplier_id UUID,
  arrival_time TIME, departure_time TIME,
  dispatcher_user_id UUID,
  interpreter_booking_id UUID,
  transport_assigned VARCHAR(80),
  host_supplier_user_id UUID,
  agenda_jsonb JSONB,
  notes TEXT,
  photos_urls TEXT[],
  buyer_satisfaction_score NUMERIC(3,2)
);

-- 3. Audit Scorecard (4)
CREATE TABLE IF NOT EXISTS vn_sourcing.supplier_audit_report (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  report_code VARCHAR(20) NOT NULL UNIQUE,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  audit_type VARCHAR(30),
  iso_standard VARCHAR(40),
  auditor_organization VARCHAR(40),
  lead_auditor_user_id UUID,
  audit_date DATE,
  audit_duration_days INT,
  on_site BOOLEAN DEFAULT TRUE,
  final_score NUMERIC(5,2),
  max_score NUMERIC(5,2) DEFAULT 100,
  pass_threshold NUMERIC(5,2) DEFAULT 75,
  passed BOOLEAN,
  report_pdf_url TEXT,
  blockchain_hash_sha256 CHAR(64),
  signed_certificate_url TEXT,
  issued_at TIMESTAMPTZ, expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'draft'
);

CREATE TABLE IF NOT EXISTS vn_sourcing.audit_kpi_metric (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  report_id UUID NOT NULL REFERENCES vn_sourcing.supplier_audit_report(id) ON DELETE CASCADE,
  metric_code VARCHAR(40),
  score NUMERIC(5,2),
  max_score NUMERIC(5,2) DEFAULT 100,
  weight_pct NUMERIC(5,2),
  findings_jsonb JSONB,
  remarks_i18n JSONB
);

CREATE TABLE IF NOT EXISTS vn_sourcing.seller_tier_progression (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  from_tier VARCHAR(20), to_tier VARCHAR(20),
  transition_type VARCHAR(30) CHECK (transition_type IN ('initial_signup','upgrade','downgrade','recert','guarantee_refund','suspension','reinstated')),
  trigger_event VARCHAR(40),
  triggered_by_user_id UUID,
  transition_date TIMESTAMPTZ DEFAULT NOW(),
  supporting_evidence_audit_report_id UUID,
  effective_until TIMESTAMPTZ,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS vn_sourcing.auditor_assignment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  auditor_organization VARCHAR(40),
  scheduled_audit_date DATE,
  audit_scope_jsonb JSONB,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by_user_id UUID,
  status VARCHAR(20) DEFAULT 'scheduled',
  original_auditor_id UUID,
  reassigned_to_id UUID,
  conflict_of_interest_check_status VARCHAR(20),
  conflict_resolution_notes TEXT
);

-- 4. Association + MOU (4)
CREATE TABLE IF NOT EXISTS vn_sourcing.association_master (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  code VARCHAR(40) NOT NULL UNIQUE,
  name_i18n JSONB,
  abbreviation VARCHAR(40),
  country_code CHAR(2),
  tier VARCHAR(20) CHECK (tier IN ('national','provincial','city','industry','sectoral')),
  province_code VARCHAR(20), city_code VARCHAR(20),
  industry_scope_categories UUID[],
  flag_url TEXT,
  official_website TEXT,
  founded_year SMALLINT,
  headquarters_address TEXT,
  members_count_disclosed BIGINT,
  focus_areas_i18n JSONB,
  contact_email VARCHAR(255), contact_phone VARCHAR(30),
  primary_language CHAR(2)
);

CREATE TABLE IF NOT EXISTS vn_sourcing.mou_contract (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  code VARCHAR(20) NOT NULL UNIQUE,
  association_id UUID NOT NULL REFERENCES vn_sourcing.association_master(id),
  partner_tenant_id VARCHAR(20),
  mou_type VARCHAR(30) CHECK (mou_type IN ('strategic','trade_partner','event_sponsor','technology','education')),
  status VARCHAR(20) DEFAULT 'negotiating' CHECK (status IN ('negotiating','signed_active','expired','terminated','renewed')),
  signed_date DATE,
  effective_from DATE, expires_at DATE,
  renewed_from_mou_id UUID,
  contract_pdf_url TEXT,
  contract_signed_by_user_ids UUID[],
  services_covered_jsonb JSONB,
  key_benefits_i18n JSONB,
  milestones_jsonb JSONB,
  kpi_targets_jsonb JSONB, kpi_actuals_jsonb JSONB,
  renewal_reminder_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS vn_sourcing.association_trade_event (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  event_code VARCHAR(40) NOT NULL UNIQUE,
  association_id UUID REFERENCES vn_sourcing.association_master(id),
  event_name_i18n JSONB,
  event_type VARCHAR(30),
  start_date DATE, end_date DATE,
  venue_address TEXT,
  country_code CHAR(2), city_code VARCHAR(20),
  expected_visitors INT,
  csr_participation VARCHAR(30),
  csr_booth_id UUID, tour_package_id UUID,
  event_url TEXT, registration_url TEXT
);

CREATE TABLE IF NOT EXISTS vn_sourcing.association_member_company (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  association_id UUID NOT NULL REFERENCES vn_sourcing.association_master(id),
  supplier_id UUID REFERENCES identity.supplier(id),
  external_company_name VARCHAR(255),
  joined_assoc_date DATE,
  membership_tier_in_assoc VARCHAR(40),
  member_id_in_assoc VARCHAR(80),
  verified_by_csr BOOLEAN DEFAULT FALSE,
  public_disclosure_allowed BOOLEAN DEFAULT FALSE
);

-- 5. Sample Order Workflow (3)
CREATE TABLE IF NOT EXISTS vn_sourcing.sample_configuration (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  sample_order_id UUID, -- references ord."order" via flag is_sample
  configuration_type VARCHAR(20) CHECK (configuration_type IN ('standard_pickup','variant_pick','full_oem')),
  selected_variant_specs_jsonb JSONB,
  oem_customization_jsonb JSONB,
  mock_up_render_url TEXT,
  csr_approval_date TIMESTAMPTZ,
  csr_approval_by_user_id UUID,
  csr_approval_notes TEXT,
  buyer_final_confirm_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS vn_sourcing.sample_center_batch (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  batch_code VARCHAR(40) NOT NULL UNIQUE,
  facility_id UUID,
  batch_dispatch_date DATE,
  included_sample_order_ids UUID[],
  outbound_carrier VARCHAR(30),
  master_tracking_no VARCHAR(120),
  total_units INT, total_weight_kg NUMERIC(10,3), total_volume_cbm NUMERIC(10,4),
  customs_declaration_id UUID,
  departure_at TIMESTAMPTZ, arrival_estimated_at TIMESTAMPTZ, arrival_actual_at TIMESTAMPTZ,
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS vn_sourcing.sample_refund_eligibility (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  sample_order_id UUID,
  refund_trigger VARCHAR(40),
  refund_percentage NUMERIC(5,2),
  evidence_required_jsonb JSONB,
  evidence_provided_urls TEXT[],
  evidence_reviewed_by_user_id UUID,
  decision VARCHAR(20),
  decision_at TIMESTAMPTZ,
  refund_amount_minor BIGINT,
  refund_transaction_id UUID,
  mock_up_fee_refunded BOOLEAN DEFAULT FALSE
);

-- 6. Freight + Tariff (4)
CREATE TABLE IF NOT EXISTS vn_sourcing.freight_rate_table (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  origin_port_code VARCHAR(40),
  destination_port_code VARCHAR(40),
  mode VARCHAR(10) CHECK (mode IN ('fcl','lcl','air','road','rail')),
  commodity_category VARCHAR(40),
  cbm_range_min NUMERIC(10,4), cbm_range_max NUMERIC(10,4),
  weight_range_min_kg NUMERIC(10,3), weight_range_max_kg NUMERIC(10,3),
  ocean_freight_per_cbm_usd_minor BIGINT,
  fob_total_per_cbm_usd_minor BIGINT,
  cif_total_per_cbm_usd_minor BIGINT,
  ddp_total_per_cbm_usd_minor BIGINT,
  transit_days_min INT, transit_days_max INT,
  valid_from DATE, valid_until DATE,
  source VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS vn_sourcing.duty_rate_lookup_table (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  hs_code VARCHAR(15) NOT NULL,
  commodity_description_i18n JSONB,
  origin_country_code CHAR(2),
  destination_country_code CHAR(2),
  base_duty_rate_pct NUMERIC(6,3),
  fta_preference_rate_pct NUMERIC(6,3),
  fta_code VARCHAR(20),
  fta_certificate_required VARCHAR(20),
  vat_rate_pct NUMERIC(6,3),
  special_tax_rate_pct NUMERIC(6,3),
  effective_from DATE, effective_until DATE,
  source_document_url TEXT
);
CREATE INDEX IF NOT EXISTS idx_duty_hs ON vn_sourcing.duty_rate_lookup_table (hs_code, origin_country_code, destination_country_code);

CREATE TABLE IF NOT EXISTS vn_sourcing.calculator_history (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  buyer_id UUID, session_id UUID,
  calculated_at TIMESTAMPTZ DEFAULT NOW(),
  input_jsonb JSONB,
  breakdown_jsonb JSONB,
  total_usd_minor BIGINT, total_vnd_minor BIGINT,
  converted_to_order_id UUID
);
CREATE INDEX IF NOT EXISTS idx_calc_brin ON vn_sourcing.calculator_history USING BRIN (calculated_at);

CREATE TABLE IF NOT EXISTS vn_sourcing.buyer_favorite_route (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  buyer_id UUID NOT NULL,
  origin_port_code VARCHAR(40),
  destination_port_code VARCHAR(40),
  mode VARCHAR(10),
  default_qty_cbm NUMERIC(10,4),
  default_value_usd_minor BIGINT,
  label VARCHAR(120),
  use_count INT DEFAULT 0,
  last_used_at TIMESTAMPTZ
);

-- 7. Seller Membership + Profit Guarantee (3)
CREATE TABLE IF NOT EXISTS vn_sourcing.seller_membership_subscription (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  plan_id UUID,
  current_tier VARCHAR(20),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  profit_guarantee_starts_at TIMESTAMPTZ,
  profit_guarantee_ends_at TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT TRUE,
  status VARCHAR(20),
  terminated_reason TEXT,
  terminated_at TIMESTAMPTZ,
  billing_account_id UUID
);

CREATE TABLE IF NOT EXISTS vn_sourcing.seller_profit_tracking (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  subscription_id UUID NOT NULL REFERENCES vn_sourcing.seller_membership_subscription(id),
  supplier_id UUID NOT NULL,
  period_start DATE, period_end DATE,
  gross_revenue_usd_minor BIGINT,
  cogs_usd_minor BIGINT,
  shipping_cost_usd_minor BIGINT,
  sts_fees_paid_to_csr_minor BIGINT,
  platform_service_fees_minor BIGINT,
  net_profit_usd_minor BIGINT,
  currency CHAR(3) DEFAULT 'USD',
  declaration_method VARCHAR(40),
  verified_by_user_id UUID,
  verified_at TIMESTAMPTZ,
  qualifies_for_guarantee_refund BOOLEAN,
  guarantee_review_status VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS vn_sourcing.profit_guarantee_refund_execution (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  profit_tracking_id UUID NOT NULL REFERENCES vn_sourcing.seller_profit_tracking(id),
  decision VARCHAR(40) CHECK (decision IN ('full_refund_sts_fees','extend_membership_6mo','partial_refund')),
  refund_amount_minor BIGINT,
  payout_transaction_id UUID,
  extension_until_date DATE,
  decided_at TIMESTAMPTZ,
  decided_by_user_id UUID,
  decision_rationale TEXT,
  supplier_acceptance_at TIMESTAMPTZ,
  audit_event_id UUID
);

-- 8. Trade Service Vendor (4)
CREATE TABLE IF NOT EXISTS vn_sourcing.service_vendor (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  vendor_code VARCHAR(40) NOT NULL UNIQUE,
  legal_name VARCHAR(255),
  display_name_i18n JSONB,
  vendor_category VARCHAR(40),
  country_code CHAR(2),
  languages_supported TEXT[],
  office_locations JSONB,
  rating_avg NUMERIC(3,2),
  total_jobs_completed INT DEFAULT 0,
  avg_response_hours NUMERIC(8,2),
  status VARCHAR(20) DEFAULT 'pending_verification',
  verified_at TIMESTAMPTZ,
  verified_by_user_id UUID,
  kyc_documents_ids UUID[],
  escrow_payment_required BOOLEAN DEFAULT TRUE,
  website TEXT, contact JSONB
);

CREATE TABLE IF NOT EXISTS vn_sourcing.service_offering (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  vendor_id UUID NOT NULL REFERENCES vn_sourcing.service_vendor(id),
  service_code VARCHAR(60),
  name_i18n JSONB, description_i18n JSONB,
  pricing_model VARCHAR(30) CHECK (pricing_model IN ('per_item','per_hour','per_project','per_page','per_audit_day','flat')),
  unit_price_usd_minor BIGINT,
  min_units INT, max_units INT,
  turnaround_days INT,
  sample_deliverable_url TEXT,
  badges TEXT[],
  category VARCHAR(40),
  status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS vn_sourcing.service_engagement (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  engagement_code VARCHAR(20) NOT NULL UNIQUE,
  buyer_user_id UUID, supplier_user_id UUID,
  vendor_id UUID NOT NULL REFERENCES vn_sourcing.service_vendor(id),
  offering_id UUID REFERENCES vn_sourcing.service_offering(id),
  related_order_id UUID, related_rfq_id UUID,
  scope_description_i18n JSONB,
  agreed_price_usd_minor BIGINT,
  agreed_turnaround_days INT,
  started_at TIMESTAMPTZ, deadline_at TIMESTAMPTZ, completed_at TIMESTAMPTZ,
  escrow_id UUID,
  deliverable_urls TEXT[],
  status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS vn_sourcing.service_vendor_review (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  vendor_id UUID NOT NULL REFERENCES vn_sourcing.service_vendor(id),
  engagement_id UUID REFERENCES vn_sourcing.service_engagement(id),
  reviewed_by_user_id UUID,
  rating_overall SMALLINT,
  rating_quality SMALLINT, rating_speed SMALLINT, rating_communication SMALLINT, rating_value SMALLINT,
  review_text_i18n JSONB,
  attachments_urls TEXT[],
  verified_purchase BOOLEAN DEFAULT TRUE,
  helpful_count INT DEFAULT 0,
  reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Multi-Channel Sync (5)
CREATE TABLE IF NOT EXISTS vn_sourcing.sales_channel_master (
  channel_code VARCHAR(40) PRIMARY KEY,
  name VARCHAR(120),
  region VARCHAR(20),
  audience_type VARCHAR(20),
  api_provider VARCHAR(80),
  setup_fee_usd_minor_estimate BIGINT,
  commission_rate_range_pct VARCHAR(20),
  requires_local_entity BOOLEAN DEFAULT FALSE,
  traffic_quality_score INT,
  b2b_avg_order_size NUMERIC(12,2),
  b2c_avg_order_size NUMERIC(12,2)
);

CREATE TABLE IF NOT EXISTS vn_sourcing.supplier_channel_account (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  channel_code VARCHAR(40) REFERENCES vn_sourcing.sales_channel_master(channel_code),
  channel_account_id VARCHAR(120),
  account_status VARCHAR(20) DEFAULT 'provisioning',
  connection_method VARCHAR(20),
  credentials_encrypted TEXT,
  last_synced_at TIMESTAMPTZ,
  monthly_revenue_usd_minor BIGINT,
  monthly_units_sold INT,
  monthly_orders_count INT,
  monthly_advertising_spend_usd_minor BIGINT,
  current_roi_multiple NUMERIC(8,4)
);

CREATE TABLE IF NOT EXISTS vn_sourcing.channel_listing (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  channel_account_id UUID NOT NULL REFERENCES vn_sourcing.supplier_channel_account(id),
  product_id UUID NOT NULL REFERENCES catalog.product(id),
  channel_product_id VARCHAR(120),
  channel_sku VARCHAR(80),
  title_localized_i18n JSONB, description_localized_i18n JSONB,
  price_local_currency_minor BIGINT,
  channel_specific_attributes_jsonb JSONB,
  status VARCHAR(20) DEFAULT 'draft',
  suppressed_reason TEXT,
  last_synced_at TIMESTAMPTZ,
  sync_errors_jsonb JSONB,
  monthly_views BIGINT,
  monthly_clicks BIGINT,
  conversion_rate_pct NUMERIC(5,2)
);

CREATE TABLE IF NOT EXISTS vn_sourcing.channel_inventory_allocation (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  variant_id UUID NOT NULL REFERENCES catalog.product_variant(id),
  total_available_units INT,
  allocations_per_channel_jsonb JSONB,
  reorder_threshold INT,
  last_rebalance_at TIMESTAMPTZ,
  rebalance_strategy VARCHAR(30),
  UNIQUE (supplier_id, variant_id)
);

CREATE TABLE IF NOT EXISTS vn_sourcing.multi_channel_revenue_rollup (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  period_month DATE NOT NULL,
  total_gross_revenue_usd_minor BIGINT,
  channel_breakdown_jsonb JSONB,
  blended_margin_pct NUMERIC(5,2),
  top_channel_by_revenue VARCHAR(40),
  top_channel_by_roi VARCHAR(40),
  channel_with_loss TEXT[],
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (supplier_id, period_month)
);

-- 10. Newsletter + Trade Alert (2 — extends Domain 9 Payload)
CREATE TABLE IF NOT EXISTS vn_sourcing.alert_trigger_rule (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  rule_code VARCHAR(40) NOT NULL UNIQUE,
  alert_category VARCHAR(40),
  name_i18n JSONB,
  trigger_logic_dsl TEXT,
  threshold_value NUMERIC(12,4),
  lookback_window_days INT,
  segment_audience_jsonb JSONB,
  max_alerts_per_period INT,
  enabled BOOLEAN DEFAULT TRUE,
  last_triggered_at TIMESTAMPTZ,
  total_triggers_count BIGINT DEFAULT 0,
  total_subscribers_targeted BIGINT
);

CREATE TABLE IF NOT EXISTS vn_sourcing.trade_alert_content (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  triggered_by_rule_id UUID REFERENCES vn_sourcing.alert_trigger_rule(id),
  alert_category VARCHAR(40),
  headline_i18n JSONB,
  body_i18n JSONB,
  supporting_data_jsonb JSONB,
  call_to_action_url TEXT,
  supporting_links_jsonb JSONB,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  generated_by VARCHAR(20),
  reviewed_by_user_id UUID,
  published_at TIMESTAMPTZ
);

DO $rls$ DECLARE rec RECORD; BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname='vn_sourcing' LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vn_sourcing' AND table_name=rec.tablename AND column_name='tenant_id') THEN
      EXECUTE format('ALTER TABLE vn_sourcing.%I ENABLE ROW LEVEL SECURITY', rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON vn_sourcing.%I', rec.tablename);
      EXECUTE format('CREATE POLICY tenant_isolation ON vn_sourcing.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))', rec.tablename);
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes) VALUES ('34_vn_sourcing.sql', 'Vietnam B2B Sourcing Specifics: 34 tables');
