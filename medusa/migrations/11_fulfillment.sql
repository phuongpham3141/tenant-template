-- ============================================================================
-- Cybersilkroads — Migration 11: Fulfillment + FBA-style + Returns (Domain 7+17+18)
-- ============================================================================

\set ON_ERROR_STOP on

-- ----------------------------------------------------------------------------
-- fulfillment.shipping_carrier — Master list
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fulfillment.shipping_carrier (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version INT DEFAULT 1, metadata JSONB DEFAULT '{}',
  code VARCHAR(40) NOT NULL,
  name VARCHAR(120) NOT NULL,
  api_provider VARCHAR(40),
  api_credentials_encrypted TEXT,
  tracking_url_template TEXT,
  supported_countries TEXT[] DEFAULT '{}',
  service_levels JSONB DEFAULT '[]',
  supports_b2c BOOLEAN NOT NULL DEFAULT TRUE,
  supports_b2b BOOLEAN NOT NULL DEFAULT TRUE,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended','retired')),
  UNIQUE (tenant_id, code)
);
CREATE INDEX IF NOT EXISTS idx_carrier_status ON fulfillment.shipping_carrier (tenant_id, status);

-- ----------------------------------------------------------------------------
-- fulfillment.shipping_tracking
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fulfillment.shipping_tracking (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version INT DEFAULT 1, metadata JSONB DEFAULT '{}',
  order_id UUID NOT NULL REFERENCES ord."order"(id) ON DELETE CASCADE,
  carrier_id UUID REFERENCES fulfillment.shipping_carrier(id),
  tracking_number VARCHAR(120),
  bl_number VARCHAR(80),
  container_no VARCHAR(40),
  awb_no VARCHAR(40),
  status VARCHAR(30) NOT NULL DEFAULT 'created' CHECK (status IN
    ('created','label_printed','picked_up','in_transit','customs','out_for_delivery','delivered','exception','returned')),
  current_location VARCHAR(255),
  events_jsonb JSONB DEFAULT '[]',
  estimated_delivery_at TIMESTAMPTZ,
  actual_delivery_at TIMESTAMPTZ,
  proof_of_delivery_url TEXT
);
CREATE INDEX IF NOT EXISTS idx_track_order ON fulfillment.shipping_tracking (order_id);
CREATE INDEX IF NOT EXISTS idx_track_no ON fulfillment.shipping_tracking (tracking_number);
CREATE INDEX IF NOT EXISTS idx_track_status ON fulfillment.shipping_tracking (status, updated_at DESC);

-- ----------------------------------------------------------------------------
-- fulfillment.customs_declaration (Intermediary mode VN customs)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fulfillment.customs_declaration (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version INT DEFAULT 1, metadata JSONB DEFAULT '{}',
  order_id UUID NOT NULL REFERENCES ord."order"(id) ON DELETE RESTRICT,
  declaration_no VARCHAR(80),
  declared_at TIMESTAMPTZ,
  hs_code_summary JSONB,
  total_value_cif_usd_minor BIGINT,
  total_value_vnd_minor BIGINT,
  duty_rate_pct NUMERIC(6,3),
  duty_amount_vnd_minor BIGINT,
  vat_rate_pct NUMERIC(6,3) NOT NULL DEFAULT 10.000,
  vat_amount_vnd_minor BIGINT,
  fta_applied VARCHAR(20),
  fta_certificate_url TEXT,
  agent_id UUID,
  agent_type VARCHAR(20) CHECK (agent_type IN ('platform_agent','outsource_forwarder','buyer_self')),
  declaration_pdf_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','submitted','approved','rejected','cleared','exception'))
);
CREATE INDEX IF NOT EXISTS idx_customs_order ON fulfillment.customs_declaration (order_id);
CREATE INDEX IF NOT EXISTS idx_customs_status ON fulfillment.customs_declaration (status, declared_at DESC);

-- ----------------------------------------------------------------------------
-- fulfillment.warehouse_facility — Platform warehouses
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fulfillment.warehouse_facility (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  code VARCHAR(40) NOT NULL,
  name_i18n JSONB NOT NULL,
  country_code CHAR(2) NOT NULL,
  city VARCHAR(120),
  address TEXT,
  capacity_cbm NUMERIC(14,2),
  operator_type VARCHAR(20) CHECK (operator_type IN ('platform','partner_3pl','outsource_forwarder','supplier_self')),
  partner_company VARCHAR(255),
  services TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (tenant_id, code)
);

-- ----------------------------------------------------------------------------
-- fulfillment.consolidation_request
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fulfillment.consolidation_request (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  group_code VARCHAR(40) NOT NULL UNIQUE,
  requested_by_user_id UUID NOT NULL REFERENCES identity."user"(id),
  included_order_ids UUID[] NOT NULL,
  origin_warehouse_id UUID REFERENCES fulfillment.warehouse_facility(id),
  dest_warehouse_id UUID REFERENCES fulfillment.warehouse_facility(id),
  total_volume_cbm NUMERIC(10,4),
  total_weight_kg NUMERIC(10,3),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','consolidating','ready','dispatched','arrived','completed','cancelled')),
  estimated_dispatch_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_consol_status ON fulfillment.consolidation_request (status, estimated_dispatch_at);

-- ----------------------------------------------------------------------------
-- fulfillment.insurance_policy
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fulfillment.insurance_policy (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  order_id UUID NOT NULL REFERENCES ord."order"(id),
  insurer_id UUID,
  insurer_name VARCHAR(120),
  policy_no VARCHAR(80),
  coverage_type VARCHAR(20) CHECK (coverage_type IN ('icc_a','icc_b','icc_c','all_risk','named_perils')),
  insured_value_usd_minor BIGINT NOT NULL,
  premium_amount_usd_minor BIGINT NOT NULL,
  coverage_start_at TIMESTAMPTZ NOT NULL,
  coverage_end_at TIMESTAMPTZ NOT NULL,
  certificate_url TEXT,
  claim_status VARCHAR(20) CHECK (claim_status IN ('none','filed','approved','rejected','paid'))
);
CREATE INDEX IF NOT EXISTS idx_insurance_order ON fulfillment.insurance_policy (order_id);

-- ----------------------------------------------------------------------------
-- fulfillment.qc_inspection
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fulfillment.qc_inspection (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  order_id UUID NOT NULL REFERENCES ord."order"(id),
  provider VARCHAR(30) CHECK (provider IN ('sgs','bv','intertek','tuv','asianinspection','qima','platform_team','supplier_self')),
  inspector_name VARCHAR(120),
  inspection_at TIMESTAMPTZ,
  location VARCHAR(255),
  sample_size INT,
  aql_level VARCHAR(10),
  result_pass_count INT,
  defect_rate_pct NUMERIC(6,3),
  report_pdf_url TEXT,
  photos_urls TEXT[] DEFAULT '{}',
  video_url TEXT,
  decision VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (decision IN ('pending','pass','fail','conditional')),
  inspector_notes TEXT
);
CREATE INDEX IF NOT EXISTS idx_qc_order ON fulfillment.qc_inspection (order_id);
CREATE INDEX IF NOT EXISTS idx_qc_decision ON fulfillment.qc_inspection (decision, inspection_at DESC);

-- ----------------------------------------------------------------------------
-- fulfillment.platform_invoice — VAT invoice (Intermediary mode)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fulfillment.platform_invoice (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  order_id UUID NOT NULL REFERENCES ord."order"(id),
  invoice_no VARCHAR(40),
  invoice_series VARCHAR(20),
  issued_at TIMESTAMPTZ,
  buyer_tax_id VARCHAR(50),
  buyer_name VARCHAR(255),
  buyer_address TEXT,
  vat_amount_vnd_minor BIGINT,
  total_vnd_minor BIGINT,
  items_jsonb JSONB,
  einvoice_provider VARCHAR(30) CHECK (einvoice_provider IN ('viettel_sinvoice','misa','fpt','vnpt','custom')),
  einvoice_xml_url TEXT,
  einvoice_pdf_url TEXT,
  einvoice_status VARCHAR(20) DEFAULT 'draft' CHECK (einvoice_status IN ('draft','signed','transmitted','approved','rejected','cancelled')),
  einvoice_reference VARCHAR(120)
);
CREATE INDEX IF NOT EXISTS idx_invoice_order ON fulfillment.platform_invoice (order_id);
CREATE INDEX IF NOT EXISTS idx_invoice_no ON fulfillment.platform_invoice (invoice_no);
CREATE INDEX IF NOT EXISTS idx_invoice_buyer_tax ON fulfillment.platform_invoice (buyer_tax_id);

-- ----------------------------------------------------------------------------
-- FBA-style operational tables (Domain 17)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS fulfillment.warehouse_inbound_shipment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  code VARCHAR(20) NOT NULL UNIQUE,
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  warehouse_facility_id UUID NOT NULL REFERENCES fulfillment.warehouse_facility(id),
  shipment_method VARCHAR(20) CHECK (shipment_method IN ('truck','air','sea','courier','rail')),
  expected_arrival_at TIMESTAMPTZ,
  actual_arrival_at TIMESTAMPTZ,
  carrier VARCHAR(80),
  tracking_no VARCHAR(120),
  status VARCHAR(20) NOT NULL DEFAULT 'created' CHECK (status IN ('created','in_transit','receiving','received','partial','rejected','exception')),
  total_cartons INT, total_units INT, total_volume_cbm NUMERIC(10,4), total_weight_kg NUMERIC(10,3),
  customs_documents_jsonb JSONB
);
CREATE INDEX IF NOT EXISTS idx_inbound_supplier ON fulfillment.warehouse_inbound_shipment (supplier_id);
CREATE INDEX IF NOT EXISTS idx_inbound_status ON fulfillment.warehouse_inbound_shipment (warehouse_facility_id, status, expected_arrival_at);

CREATE TABLE IF NOT EXISTS fulfillment.warehouse_inbound_carton (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  shipment_id UUID NOT NULL REFERENCES fulfillment.warehouse_inbound_shipment(id) ON DELETE CASCADE,
  carton_barcode VARCHAR(80) UNIQUE,
  contents_jsonb JSONB,
  received_at TIMESTAMPTZ,
  condition VARCHAR(20) CHECK (condition IN ('good','damaged','partial','missing')),
  photo_urls TEXT[]
);
CREATE INDEX IF NOT EXISTS idx_carton_shipment ON fulfillment.warehouse_inbound_carton (shipment_id);

CREATE TABLE IF NOT EXISTS fulfillment.warehouse_storage_location (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  warehouse_facility_id UUID NOT NULL REFERENCES fulfillment.warehouse_facility(id) ON DELETE CASCADE,
  location_code VARCHAR(40) NOT NULL,
  zone VARCHAR(20) CHECK (zone IN ('receiving','storage','picking','packing','shipping','returns','quarantine')),
  capacity_units INT, capacity_cbm NUMERIC(10,4),
  environment_temp_c NUMERIC(5,2), environment_humidity_pct NUMERIC(5,2),
  hazmat_certified BOOLEAN DEFAULT FALSE,
  UNIQUE (warehouse_facility_id, location_code)
);

CREATE TABLE IF NOT EXISTS fulfillment.inventory_movement (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  variant_id UUID NOT NULL REFERENCES catalog.product_variant(id),
  supplier_id UUID NOT NULL REFERENCES identity.supplier(id),
  warehouse_facility_id UUID REFERENCES fulfillment.warehouse_facility(id),
  from_location_id UUID REFERENCES fulfillment.warehouse_storage_location(id),
  to_location_id UUID REFERENCES fulfillment.warehouse_storage_location(id),
  movement_type VARCHAR(40) NOT NULL CHECK (movement_type IN
    ('inbound_receive','putaway','picking','returns_restock','cycle_count_adjust','damage_writeoff','transfer','outbound_ship','customer_return')),
  quantity_delta INT NOT NULL,
  reason TEXT,
  executed_by_user_id UUID REFERENCES identity."user"(id),
  executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  related_order_id UUID,
  related_shipment_id UUID
);
CREATE INDEX IF NOT EXISTS idx_inv_movement_variant ON fulfillment.inventory_movement (variant_id, executed_at DESC);
CREATE INDEX IF NOT EXISTS idx_inv_movement_brin ON fulfillment.inventory_movement USING BRIN (executed_at);

CREATE TABLE IF NOT EXISTS fulfillment.pick_pack_task (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  order_id UUID NOT NULL REFERENCES ord."order"(id),
  warehouse_facility_id UUID NOT NULL REFERENCES fulfillment.warehouse_facility(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','claimed','picking','packing','packed','shipped','cancelled','exception')),
  assigned_to_user_id UUID REFERENCES identity."user"(id),
  priority INT NOT NULL DEFAULT 100,
  sla_deadline TIMESTAMPTZ,
  items_to_pick_jsonb JSONB,
  picked_at TIMESTAMPTZ, packed_at TIMESTAMPTZ, shipped_at TIMESTAMPTZ,
  batch_id UUID
);
CREATE INDEX IF NOT EXISTS idx_pick_pack_order ON fulfillment.pick_pack_task (order_id);
CREATE INDEX IF NOT EXISTS idx_pick_pack_pending ON fulfillment.pick_pack_task (warehouse_facility_id, priority, sla_deadline) WHERE status IN ('pending','claimed');

CREATE TABLE IF NOT EXISTS fulfillment.shipping_label_record (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  pick_pack_task_id UUID REFERENCES fulfillment.pick_pack_task(id) ON DELETE SET NULL,
  carrier_id UUID REFERENCES fulfillment.shipping_carrier(id),
  label_url TEXT, tracking_no VARCHAR(120),
  label_cost_minor BIGINT, label_currency CHAR(3),
  label_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  void_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS fulfillment.last_mile_courier_assignment (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  order_id UUID NOT NULL REFERENCES ord."order"(id),
  courier_provider VARCHAR(40),
  courier_driver_id VARCHAR(80),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  picked_up_at TIMESTAMPTZ, delivered_at TIMESTAMPTZ,
  delivery_proof_url TEXT, recipient_signature_url TEXT
);
CREATE INDEX IF NOT EXISTS idx_last_mile_order ON fulfillment.last_mile_courier_assignment (order_id);

-- ----------------------------------------------------------------------------
-- Returns (Domain 18)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS returns.return_reason_master (
  reason_code VARCHAR(40) PRIMARY KEY,
  label_i18n JSONB NOT NULL,
  category VARCHAR(20) CHECK (category IN ('quality','fulfillment','customer','other')),
  is_seller_fault BOOLEAN DEFAULT FALSE,
  auto_approval_eligible BOOLEAN DEFAULT FALSE,
  requires_evidence BOOLEAN DEFAULT TRUE,
  priority_for_review INT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS returns.return_request (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  tenant_id VARCHAR(20) NOT NULL REFERENCES tenant.tenant_master(tenant_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version INT DEFAULT 1, metadata JSONB DEFAULT '{}',
  code VARCHAR(20) NOT NULL UNIQUE,
  order_id UUID NOT NULL REFERENCES ord."order"(id),
  requested_by_user_id UUID NOT NULL REFERENCES identity."user"(id),
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reason_code VARCHAR(40) NOT NULL REFERENCES returns.return_reason_master(reason_code),
  description_i18n JSONB,
  photos_urls TEXT[] DEFAULT '{}',
  video_url TEXT,
  requested_action VARCHAR(20) NOT NULL CHECK (requested_action IN ('refund','replace','exchange','credit')),
  status VARCHAR(20) NOT NULL DEFAULT 'submitted' CHECK (status IN
    ('submitted','approved','rejected','in_transit','received','inspected','resolved','cancelled')),
  rma_window_expires_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_return_order ON returns.return_request (order_id);
CREATE INDEX IF NOT EXISTS idx_return_status ON returns.return_request (tenant_id, status, requested_at DESC);

CREATE TABLE IF NOT EXISTS returns.return_item (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  return_request_id UUID NOT NULL REFERENCES returns.return_request(id) ON DELETE CASCADE,
  order_item_id UUID NOT NULL REFERENCES ord.order_item(id),
  quantity_returning INT NOT NULL CHECK (quantity_returning > 0),
  condition_claimed VARCHAR(30),
  unit_refund_amount_minor BIGINT
);

CREATE TABLE IF NOT EXISTS returns.return_authorization (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  return_request_id UUID NOT NULL UNIQUE REFERENCES returns.return_request(id) ON DELETE CASCADE,
  rma_number VARCHAR(40) NOT NULL UNIQUE,
  approved_by_user_id UUID REFERENCES identity."user"(id),
  auto_approved BOOLEAN DEFAULT FALSE,
  return_label_url TEXT,
  return_method VARCHAR(20) CHECK (return_method IN ('mail_back','drop_off','in_store','pickup')),
  return_address_id UUID,
  prepaid_label_cost_minor BIGINT,
  who_pays_shipping VARCHAR(20) CHECK (who_pays_shipping IN ('buyer','seller','platform','shared')),
  expires_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS returns.return_inspection (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  return_request_id UUID NOT NULL REFERENCES returns.return_request(id) ON DELETE CASCADE,
  warehouse_facility_id UUID REFERENCES fulfillment.warehouse_facility(id),
  inspected_by_user_id UUID REFERENCES identity."user"(id),
  inspected_at TIMESTAMPTZ,
  condition_received VARCHAR(30) CHECK (condition_received IN ('new','used_like_new','used_good','used_acceptable','damaged','unusable')),
  accept_decision BOOLEAN,
  reason_if_rejected TEXT,
  photos_urls TEXT[],
  inspector_notes TEXT
);

CREATE TABLE IF NOT EXISTS returns.return_disposition (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  return_request_id UUID NOT NULL REFERENCES returns.return_request(id) ON DELETE CASCADE,
  disposition VARCHAR(20) CHECK (disposition IN ('restock','refurbish','liquidate','donate','destroy','return_to_supplier')),
  executed_at TIMESTAMPTZ,
  new_location_id UUID,
  new_listing_id UUID,
  salvage_value_minor BIGINT
);

CREATE TABLE IF NOT EXISTS returns.refund_record (
  id UUID PRIMARY KEY DEFAULT public.uuidv7(),
  return_request_id UUID REFERENCES returns.return_request(id) ON DELETE SET NULL,
  order_id UUID REFERENCES ord."order"(id),
  refund_amount_minor BIGINT NOT NULL,
  currency CHAR(3) NOT NULL,
  refund_method VARCHAR(30) CHECK (refund_method IN ('original_payment','wallet','store_credit','bank_transfer','manual')),
  refund_initiated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  refund_completed_at TIMESTAMPTZ,
  fees_charged_to_supplier_minor BIGINT DEFAULT 0,
  fees_absorbed_by_platform_minor BIGINT DEFAULT 0,
  escrow_transaction_id UUID,
  payment_transaction_id UUID,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed'))
);
CREATE INDEX IF NOT EXISTS idx_refund_order ON returns.refund_record (order_id);

-- Now FK ord."order" refs to fulfillment + returns
DO $fk$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_invoice_fk') THEN
    ALTER TABLE ord."order" ADD CONSTRAINT order_invoice_fk FOREIGN KEY (platform_invoice_id) REFERENCES fulfillment.platform_invoice(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_customs_fk') THEN
    ALTER TABLE ord."order" ADD CONSTRAINT order_customs_fk FOREIGN KEY (customs_declaration_id) REFERENCES fulfillment.customs_declaration(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_qc_fk') THEN
    ALTER TABLE ord."order" ADD CONSTRAINT order_qc_fk FOREIGN KEY (qc_inspection_id) REFERENCES fulfillment.qc_inspection(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_insurance_fk') THEN
    ALTER TABLE ord."order" ADD CONSTRAINT order_insurance_fk FOREIGN KEY (insurance_policy_id) REFERENCES fulfillment.insurance_policy(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_consol_fk') THEN
    ALTER TABLE ord."order" ADD CONSTRAINT order_consol_fk FOREIGN KEY (consolidation_request_id) REFERENCES fulfillment.consolidation_request(id) ON DELETE SET NULL;
  END IF;
END $fk$;

-- Triggers + RLS
DO $tr$
DECLARE rec RECORD;
BEGIN
  FOR rec IN SELECT tablename FROM pg_tables WHERE schemaname IN ('fulfillment','returns')
  LOOP
    -- updated_at trigger only on tables that have the column
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = (CASE WHEN rec.tablename LIKE 'return_%' OR rec.tablename = 'refund_record' THEN 'returns' ELSE 'fulfillment' END) AND table_name = rec.tablename AND column_name = 'updated_at') THEN
      EXECUTE format('DROP TRIGGER IF EXISTS trg_%I_updated_at ON %I.%I',
        rec.tablename, (CASE WHEN rec.tablename LIKE 'return_%' OR rec.tablename = 'refund_record' THEN 'returns' ELSE 'fulfillment' END), rec.tablename);
      EXECUTE format('CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON %I.%I FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp()',
        rec.tablename, (CASE WHEN rec.tablename LIKE 'return_%' OR rec.tablename = 'refund_record' THEN 'returns' ELSE 'fulfillment' END), rec.tablename);
    END IF;
  END LOOP;
END $tr$;

DO $rls$
DECLARE rec RECORD;
BEGIN
  FOR rec IN SELECT schemaname, tablename FROM pg_tables WHERE schemaname IN ('fulfillment','returns')
  LOOP
    -- Only enable RLS if tenant_id column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = rec.schemaname AND table_name = rec.tablename AND column_name = 'tenant_id') THEN
      EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', rec.schemaname, rec.tablename);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON %I.%I', rec.schemaname, rec.tablename);
      EXECUTE format(
        'CREATE POLICY tenant_isolation ON %I.%I USING (tenant_id = public.current_tenant_id() OR pg_has_role(''csr_admin'',''MEMBER''))',
        rec.schemaname, rec.tablename
      );
    END IF;
  END LOOP;
END $rls$;

INSERT INTO admin.migration_log (migration_file, notes)
VALUES ('11_fulfillment.sql', 'Fulfillment + FBA + Returns: 21 tables');

-- ============================================================================
-- END 11_fulfillment.sql
-- ============================================================================
