-- System roles bundled with default permission grants

DO $roles$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN
    RAISE NOTICE 'No tenant csr — skipping default role seed';
    RETURN;
  END IF;

  -- Tenant admin: full access (no break-glass needed)
  INSERT INTO rbac.role (id, tenant_id, code, name, description, is_system_role, is_assignable, created_at, updated_at)
  VALUES (public.uuidv7(), v_tenant_id, 'tenant_admin', 'Tenant Admin', 'Full administrative access', TRUE, TRUE, NOW(), NOW())
  ON CONFLICT (tenant_id, code) DO NOTHING;

  INSERT INTO rbac.role (id, tenant_id, code, name, description, is_system_role, is_assignable, created_at, updated_at) VALUES
    (public.uuidv7(), v_tenant_id, 'csr_admin', 'CSR Admin', 'Customer support admin', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'csr_agent', 'CSR Agent', 'Customer support agent', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'kyc_reviewer', 'KYC Reviewer', 'Reviews KYC documents', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'dispute_mediator', 'Dispute Mediator', 'Mediates platform disputes', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'finance_ops', 'Finance Ops', 'Treasury, escrow release, payouts', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'fulfillment_ops', 'Fulfillment Ops', 'Warehouse, shipping, QC', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'content_editor', 'Content Editor', 'Edits CMS content', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'marketing_manager', 'Marketing Manager', 'Campaigns, segments, ads', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'dpo', 'DPO', 'Data Protection Officer', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'supplier_admin', 'Supplier Admin', 'Manages own supplier account', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'supplier_user', 'Supplier User', 'Supplier staff', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'buyer', 'Buyer', 'B2B / B2C buyer', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'dealer', 'Dealer', 'Reseller / intermediary buyer', TRUE, TRUE, NOW(), NOW()),
    (public.uuidv7(), v_tenant_id, 'interpreter', 'Interpreter', 'Translation/interpretation service', TRUE, TRUE, NOW(), NOW())
  ON CONFLICT (tenant_id, code) DO NOTHING;

  -- Grant all permissions to tenant_admin
  INSERT INTO rbac.role_permission_grant (role_id, permission_code, granted_at)
  SELECT r.id, p.code, NOW()
  FROM rbac.role r CROSS JOIN rbac.permission_master p
  WHERE r.tenant_id = v_tenant_id AND r.code = 'tenant_admin'
  ON CONFLICT DO NOTHING;

  -- KYC reviewer: kyc.* + supplier.read + verification promote
  INSERT INTO rbac.role_permission_grant (role_id, permission_code, granted_at)
  SELECT r.id, p.code, NOW()
  FROM rbac.role r CROSS JOIN rbac.permission_master p
  WHERE r.tenant_id = v_tenant_id AND r.code = 'kyc_reviewer'
    AND p.code IN ('kyc.read','kyc.review','supplier.read','supplier.verification.promote')
  ON CONFLICT DO NOTHING;

  -- Finance ops
  INSERT INTO rbac.role_permission_grant (role_id, permission_code, granted_at)
  SELECT r.id, p.code, NOW()
  FROM rbac.role r CROSS JOIN rbac.permission_master p
  WHERE r.tenant_id = v_tenant_id AND r.code = 'finance_ops'
    AND p.code IN ('payment.read','payment.refund','escrow.read','escrow.create','escrow.release_milestone','escrow.refund','order.refund')
  ON CONFLICT DO NOTHING;

  -- Fulfillment ops
  INSERT INTO rbac.role_permission_grant (role_id, permission_code, granted_at)
  SELECT r.id, p.code, NOW()
  FROM rbac.role r CROSS JOIN rbac.permission_master p
  WHERE r.tenant_id = v_tenant_id AND r.code = 'fulfillment_ops'
    AND p.code IN ('shipment.read','shipment.create','shipment.update_status','qc.start','qc.complete','customs.declare','rma.review','rma.refund')
  ON CONFLICT DO NOTHING;

  -- DPO
  INSERT INTO rbac.role_permission_grant (role_id, permission_code, granted_at)
  SELECT r.id, p.code, NOW()
  FROM rbac.role r CROSS JOIN rbac.permission_master p
  WHERE r.tenant_id = v_tenant_id AND r.code = 'dpo'
    AND p.code IN ('gdpr.consent.read','gdpr.dsr.review','gdpr.dsr.fulfill','gdpr.breach.report')
  ON CONFLICT DO NOTHING;

  -- Buyer minimum
  INSERT INTO rbac.role_permission_grant (role_id, permission_code, granted_at)
  SELECT r.id, p.code, NOW()
  FROM rbac.role r CROSS JOIN rbac.permission_master p
  WHERE r.tenant_id = v_tenant_id AND r.code = 'buyer'
    AND p.code IN ('product.read','category.manage','order.create','order.read','rfq.create','rfq.read','quote.submit','rma.create','dispute.open')
  ON CONFLICT DO NOTHING;

  -- Supplier admin
  INSERT INTO rbac.role_permission_grant (role_id, permission_code, granted_at)
  SELECT r.id, p.code, NOW()
  FROM rbac.role r CROSS JOIN rbac.permission_master p
  WHERE r.tenant_id = v_tenant_id AND r.code = 'supplier_admin'
    AND p.code IN ('product.read','product.create','product.update','product.delete','order.read','quote.submit','rfq.read','shipment.read','shipment.create','livestream.create','livestream.host')
  ON CONFLICT DO NOTHING;
END $roles$;
