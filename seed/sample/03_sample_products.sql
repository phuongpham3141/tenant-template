-- Sample products

DO $prod$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO catalog.product (id, tenant_id, supplier_id, sku, title_i18n, description_i18n, status,
    base_price_minor, base_currency, moq_min, moq_max, hs_code, category_id, tags, created_at, updated_at) VALUES
  ('33333333-3333-3333-3333-333333333001'::uuid, v_tenant_id, '11111111-1111-1111-1111-111111111102'::uuid,
    'SZE-PHONE-A50', '{"vi":"Điện thoại Android A50","en":"Android Smartphone A50","cn":"安卓智能手机 A50"}'::jsonb,
    '{"vi":"Smartphone Android 6.5 inch, 4G LTE, 64GB","en":"6.5-inch Android smartphone, 4G LTE, 64GB","cn":"6.5英寸安卓手机，4G LTE，64GB"}'::jsonb,
    'active', 8500000, 'VND', 50, 5000, '8517.12', '22222222-2222-2222-2222-222222222011'::uuid,
    ARRAY['smartphone','4g','wholesale'], NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333002'::uuid, v_tenant_id, '11111111-1111-1111-1111-111111111102'::uuid,
    'SZE-LAPTOP-B14', '{"vi":"Laptop B14 14 inch","en":"Laptop B14 14-inch","cn":"笔记本电脑 B14"}'::jsonb,
    '{"vi":"Laptop 14 inch, Intel i5, 8GB RAM, 256GB SSD","en":"14-inch laptop, Intel i5, 8GB RAM, 256GB SSD","cn":"14英寸笔记本，i5处理器"}'::jsonb,
    'active', 65000, 'CNY', 10, 1000, '8471.30', '22222222-2222-2222-2222-222222222012'::uuid,
    ARRAY['laptop','wholesale'], NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333003'::uuid, v_tenant_id, '11111111-1111-1111-1111-111111111101'::uuid,
    'GZT-EARBUDS', '{"vi":"Tai nghe Bluetooth","en":"Bluetooth Earbuds","cn":"蓝牙耳机"}'::jsonb,
    '{"vi":"Tai nghe không dây TWS","en":"Wireless TWS earbuds","cn":"真无线蓝牙耳机"}'::jsonb,
    'active', 4500, 'CNY', 100, NULL, '8517.62', '22222222-2222-2222-2222-222222222001'::uuid,
    ARRAY['audio','bluetooth','tws'], NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333004'::uuid, v_tenant_id, '11111111-1111-1111-1111-111111111103'::uuid,
    'YWT-PLUSH-BEAR', '{"vi":"Gấu bông 30cm","en":"Plush Teddy Bear 30cm","cn":"30厘米毛绒泰迪熊"}'::jsonb,
    '{"vi":"Gấu nhồi bông cao cấp","en":"Premium plush teddy bear","cn":"高级毛绒玩具"}'::jsonb,
    'active', 1200, 'CNY', 500, NULL, '9503.00', '22222222-2222-2222-2222-222222222004'::uuid,
    ARRAY['plush','toys','wholesale'], NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333005'::uuid, v_tenant_id, '11111111-1111-1111-1111-111111111104'::uuid,
    'DGF-DESK-ELITE', '{"vi":"Bàn văn phòng Elite","en":"Elite Office Desk","cn":"精英办公桌"}'::jsonb,
    '{"vi":"Bàn gỗ MDF 140x60cm","en":"MDF wooden desk 140x60cm","cn":"140x60厘米MDF办公桌"}'::jsonb,
    'active', 78000, 'CNY', 20, 500, '9403.30', '22222222-2222-2222-2222-222222222031'::uuid,
    ARRAY['office','furniture','desk'], NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333006'::uuid, v_tenant_id, '11111111-1111-1111-1111-111111111105'::uuid,
    'HCM-COFFEE-G1', '{"vi":"Cà phê Robusta G1","en":"Robusta Coffee Grade 1","cn":"罗布斯塔咖啡一级"}'::jsonb,
    '{"vi":"Cà phê Robusta xuất khẩu, sàng 18","en":"Export-grade Robusta coffee, screen 18","cn":"出口级罗布斯塔咖啡，18号筛"}'::jsonb,
    'active', 2200, 'USD', 1000, NULL, '0901.21', '22222222-2222-2222-2222-222222222051'::uuid,
    ARRAY['coffee','robusta','vn-export','bulk'], NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
END $prod$;
