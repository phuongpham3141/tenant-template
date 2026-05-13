-- Sample suppliers (5 demo suppliers across major industries)

DO $sup$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO identity.supplier (id, tenant_id, slug, legal_name, display_name_i18n, country_code, operation_mode, can_sell_wholesale, can_sell_retail, can_act_as_agent, year_established, primary_industry_code, status, verification_tier, employee_count, annual_revenue_usd_minor, export_ratio_pct, certifications, tags, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111101'::uuid, v_tenant_id, 'guangzhou-tech', 'Guangzhou Tech Trading Co. Ltd',
    '{"vi":"Guangzhou Tech","en":"Guangzhou Tech","cn":"广州科技贸易"}'::jsonb,
    'CN', 'direct', TRUE, FALSE, FALSE, 2010, '8517', 'active', 5, 250, 50000000, 75,
    ARRAY['ISO 9001','BSCI'], ARRAY['electronics','wholesaler'], NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111102'::uuid, v_tenant_id, 'shenzhen-electronics', 'Shenzhen Electronics Mfg',
    '{"vi":"Shenzhen Electronics","en":"Shenzhen Electronics","cn":"深圳电子制造"}'::jsonb,
    'CN', 'direct', TRUE, TRUE, FALSE, 2005, '8542', 'active', 6, 1200, 500000000, 90,
    ARRAY['ISO 9001','RoHS','CE','FCC'], ARRAY['electronics','manufacturer','oem'], NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111103'::uuid, v_tenant_id, 'yiwu-toys', 'Yiwu International Toy Wholesale',
    '{"vi":"Yiwu Toys","en":"Yiwu Toys","cn":"义乌玩具批发"}'::jsonb,
    'CN', 'intermediary', TRUE, TRUE, TRUE, 2003, '9503', 'active', 4, 350, 80000000, 60,
    ARRAY['ICTI','EN71'], ARRAY['toys','wholesaler','small-orders'], NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111104'::uuid, v_tenant_id, 'dongguan-furniture', 'Dongguan Premium Furniture',
    '{"vi":"Dongguan Furniture","en":"Dongguan Furniture","cn":"东莞家具"}'::jsonb,
    'CN', 'direct', TRUE, TRUE, FALSE, 2008, '9403', 'active', 4, 800, 120000000, 70,
    ARRAY['FSC','BSCI'], ARRAY['furniture','manufacturer'], NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111105'::uuid, v_tenant_id, 'hcm-coffee-exporter', 'HCM Coffee Export Co',
    '{"vi":"HCM Cà phê Xuất khẩu","en":"HCM Coffee Export","cn":"胡志明咖啡出口"}'::jsonb,
    'VN', 'direct', TRUE, FALSE, FALSE, 2012, '0901', 'active', 4, 150, 25000000, 85,
    ARRAY['Rainforest Alliance','UTZ','Organic VN'], ARRAY['agriculture','coffee','vn-export'], NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
END $sup$;
