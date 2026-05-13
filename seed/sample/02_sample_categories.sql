-- Sample category tree

DO $cat$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO catalog.category (id, tenant_id, parent_category_id, slug, name_i18n, short_description_i18n, depth, display_order, status, created_at, updated_at) VALUES
  ('22222222-2222-2222-2222-222222222001'::uuid, v_tenant_id, NULL, 'electronics',
    '{"vi":"Điện tử","en":"Electronics","cn":"电子产品"}'::jsonb,
    '{"vi":"Sản phẩm điện tử","en":"Electronic goods","cn":"电子商品"}'::jsonb,
    0, 10, 'active', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222002'::uuid, v_tenant_id, NULL, 'apparel',
    '{"vi":"May mặc","en":"Apparel","cn":"服装"}'::jsonb,
    '{"vi":"Quần áo","en":"Clothing","cn":"服装"}'::jsonb,
    0, 20, 'active', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222003'::uuid, v_tenant_id, NULL, 'home-furniture',
    '{"vi":"Nội thất","en":"Home & Furniture","cn":"家居家具"}'::jsonb,
    '{}'::jsonb, 0, 30, 'active', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222004'::uuid, v_tenant_id, NULL, 'toys-games',
    '{"vi":"Đồ chơi","en":"Toys & Games","cn":"玩具游戏"}'::jsonb,
    '{}'::jsonb, 0, 40, 'active', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222005'::uuid, v_tenant_id, NULL, 'agriculture',
    '{"vi":"Nông sản","en":"Agriculture","cn":"农产品"}'::jsonb,
    '{}'::jsonb, 0, 50, 'active', NOW(), NOW()),
  -- Sub-categories
  ('22222222-2222-2222-2222-222222222011'::uuid, v_tenant_id, '22222222-2222-2222-2222-222222222001'::uuid, 'mobile-phones',
    '{"vi":"Điện thoại di động","en":"Mobile Phones","cn":"手机"}'::jsonb,
    '{}'::jsonb, 1, 10, 'active', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222012'::uuid, v_tenant_id, '22222222-2222-2222-2222-222222222001'::uuid, 'laptops',
    '{"vi":"Máy tính xách tay","en":"Laptops","cn":"笔记本电脑"}'::jsonb,
    '{}'::jsonb, 1, 20, 'active', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222021'::uuid, v_tenant_id, '22222222-2222-2222-2222-222222222002'::uuid, 't-shirts',
    '{"vi":"Áo phông","en":"T-Shirts","cn":"T恤"}'::jsonb,
    '{}'::jsonb, 1, 10, 'active', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222031'::uuid, v_tenant_id, '22222222-2222-2222-2222-222222222003'::uuid, 'office-furniture',
    '{"vi":"Đồ gỗ văn phòng","en":"Office Furniture","cn":"办公家具"}'::jsonb,
    '{}'::jsonb, 1, 10, 'active', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222051'::uuid, v_tenant_id, '22222222-2222-2222-2222-222222222005'::uuid, 'coffee',
    '{"vi":"Cà phê","en":"Coffee","cn":"咖啡"}'::jsonb,
    '{}'::jsonb, 1, 10, 'active', NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
END $cat$;
