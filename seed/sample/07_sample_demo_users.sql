-- Demo users (passwords hashed with bcrypt in real seed; here placeholder)

DO $usr$
DECLARE
  v_tenant_id UUID;
  v_role_buyer UUID;
  v_role_supplier UUID;
  v_role_admin UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;
  SELECT id INTO v_role_buyer FROM rbac.role WHERE tenant_id = v_tenant_id AND code = 'buyer';
  SELECT id INTO v_role_supplier FROM rbac.role WHERE tenant_id = v_tenant_id AND code = 'supplier_admin';
  SELECT id INTO v_role_admin FROM rbac.role WHERE tenant_id = v_tenant_id AND code = 'tenant_admin';

  -- buyers
  INSERT INTO identity.user (id, tenant_id, email, display_name, status, locale, created_at, updated_at) VALUES
  ('66666666-6666-6666-6666-666666666001'::uuid, v_tenant_id, 'demo.buyer.vn@huayuesc.local', 'Nguyen Demo (VN buyer)', 'active', 'vi', NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666002'::uuid, v_tenant_id, 'demo.buyer.cn@huayuesc.local', '王演示 (CN buyer)', 'active', 'cn', NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666003'::uuid, v_tenant_id, 'demo.supplier@huayuesc.local', 'Supplier Demo', 'active', 'cn', NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666999'::uuid, v_tenant_id, 'admin@huayuesc.local', 'Tenant Admin', 'active', 'vi', NOW(), NOW())
  ON CONFLICT (tenant_id, email) DO NOTHING;

  -- assign roles
  INSERT INTO rbac.user_role_assignment (id, tenant_id, user_id, role_id, granted_at, created_at) VALUES
  (public.uuidv7(), v_tenant_id, '66666666-6666-6666-6666-666666666001'::uuid, v_role_buyer, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, '66666666-6666-6666-6666-666666666002'::uuid, v_role_buyer, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, '66666666-6666-6666-6666-666666666003'::uuid, v_role_supplier, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, '66666666-6666-6666-6666-666666666999'::uuid, v_role_admin, NOW(), NOW())
  ON CONFLICT DO NOTHING;
END $usr$;
