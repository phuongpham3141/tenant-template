-- ============================================================================
-- MINIMUM DATASET — đủ để UI fetch ra dữ liệu hiển thị
-- ============================================================================
-- Bao gồm:
--   - 3 users (1 admin + 1 B2B buyer + 1 B2C buyer)
--   - 7 suppliers (1 mỗi verification tier 0..6)
--   - 13 categories (4 levels deep)
--   - 25 products phân bố qua suppliers + categories
--   - 2 RFQs + 3 quotes (1 awarded, 1 open)
--
-- An toàn để re-run: dùng ON CONFLICT + WHERE NOT EXISTS guards.
-- ============================================================================

\set ON_ERROR_STOP on

DO $seed$
DECLARE
  v_already_seeded  BOOLEAN;
  v_admin_id        UUID;
  v_buyer_b2b_id    UUID;
  v_buyer_b2c_id    UUID;

  -- Suppliers (tier 0..6)
  v_sup_t0 UUID; v_sup_t1 UUID; v_sup_t2 UUID;
  v_sup_t3 UUID; v_sup_t4 UUID; v_sup_t5 UUID; v_sup_t6 UUID;

  -- Categories
  v_cat_electronics UUID; v_cat_mobile UUID; v_cat_smartphone UUID; v_cat_smartphone_premium UUID;
  v_cat_audio UUID; v_cat_earbuds UUID;
  v_cat_apparel UUID; v_cat_tshirt UUID;
  v_cat_furniture UUID; v_cat_office UUID;
  v_cat_toys UUID;
  v_cat_food UUID; v_cat_coffee UUID;

  v_now TIMESTAMPTZ := NOW();
BEGIN

  -- Idempotency guard
  SELECT EXISTS (SELECT 1 FROM identity.supplier WHERE slug='foshan-newbie-trading' AND tenant_id='csr')
    INTO v_already_seeded;
  IF v_already_seeded THEN
    RAISE NOTICE 'Minimum dataset already seeded — skipping (delete existing rows first to re-run)';
    RETURN;
  END IF;

  -- ============================================================================
  -- 0. UNITS OF MEASURE (prerequisite for products + rfqs)
  -- ============================================================================
  INSERT INTO common.unit_master (code, label_i18n, symbol, category, display_order) VALUES
  ('pieces',  '{"vi":"cái","en":"piece","cn":"件"}'::jsonb,    'pcs',  'count',     10),
  ('boxes',   '{"vi":"hộp","en":"box","cn":"盒"}'::jsonb,      'box',  'packaging', 20),
  ('bags',    '{"vi":"bao","en":"bag","cn":"袋"}'::jsonb,      'bag',  'packaging', 30),
  ('cartons', '{"vi":"thùng","en":"carton","cn":"箱"}'::jsonb, 'ctn',  'packaging', 40),
  ('pallets', '{"vi":"pallet","en":"pallet","cn":"托盘"}'::jsonb,'plt','packaging', 50),
  ('kg',      '{"vi":"kg","en":"kilogram","cn":"千克"}'::jsonb, 'kg',  'weight',    60),
  ('tons',    '{"vi":"tấn","en":"ton","cn":"吨"}'::jsonb,      't',    'weight',    70),
  ('meters',  '{"vi":"mét","en":"meter","cn":"米"}'::jsonb,    'm',    'length',    80),
  ('liters',  '{"vi":"lít","en":"liter","cn":"升"}'::jsonb,    'L',    'volume',    90),
  ('pairs',   '{"vi":"đôi","en":"pair","cn":"双"}'::jsonb,     'pair', 'count',     100),
  ('sets',    '{"vi":"bộ","en":"set","cn":"套"}'::jsonb,       'set',  'count',     110)
  ON CONFLICT (code) DO NOTHING;

  -- ============================================================================
  -- 1. USERS — 3 demo accounts
  -- ============================================================================
  INSERT INTO identity."user" (
    id, tenant_id, email, phone, password_hash, role,
    primary_locale, primary_currency, country_code,
    is_b2b, company_name, email_verified_at, identity_verified_at,
    metadata, created_at, updated_at
  ) VALUES
  (uuidv7(), 'csr', 'admin@cybersilkroads.vn', '+84901000001',
   '$2b$10$placeholder.bcrypt.hash.replace.in.prod.0000000000000000000', 'admin',
   'vi', 'VND', 'VN', false, 'Cybersilkroads Ops', v_now, v_now,
   '{"seed":"minimum","display_name":"Admin Cybersilkroads"}'::jsonb, v_now, v_now),
  (uuidv7(), 'csr', 'buyer.b2b@huayuesc.test', '+84901000002',
   '$2b$10$placeholder.bcrypt.hash.replace.in.prod.0000000000000000000', 'buyer',
   'vi', 'VND', 'VN', true, 'Công ty TNHH Thương mại Hoa Việt', v_now, v_now,
   '{"seed":"minimum","display_name":"Phương Phạm","buyer_segment":"importer"}'::jsonb, v_now, v_now),
  (uuidv7(), 'csr', 'buyer.b2c@huayuesc.test', '+84901000003',
   '$2b$10$placeholder.bcrypt.hash.replace.in.prod.0000000000000000000', 'buyer',
   'vi', 'VND', 'VN', false, NULL, v_now, NULL,
   '{"seed":"minimum","display_name":"Nguyễn An","buyer_segment":"retail"}'::jsonb, v_now, v_now)
  ON CONFLICT (tenant_id, email) DO NOTHING;

  SELECT id INTO v_admin_id     FROM identity."user" WHERE email='admin@cybersilkroads.vn' AND tenant_id='csr';
  SELECT id INTO v_buyer_b2b_id FROM identity."user" WHERE email='buyer.b2b@huayuesc.test' AND tenant_id='csr';
  SELECT id INTO v_buyer_b2c_id FROM identity."user" WHERE email='buyer.b2c@huayuesc.test' AND tenant_id='csr';

  RAISE NOTICE '  Users: admin=%, b2b_buyer=%, b2c_buyer=%', v_admin_id, v_buyer_b2b_id, v_buyer_b2c_id;

  -- ============================================================================
  -- 2. SUPPLIERS — 7 (1 per verification tier 0..6)
  -- ============================================================================
  -- Tier 0 — Unverified (newly registered, no docs)
  INSERT INTO identity.supplier (
    id, tenant_id, slug, legal_name, display_name_i18n, supplier_type,
    country_code, province, city, primary_currency, support_languages,
    verification_tier, is_audited, years_in_business, employee_count_bracket, annual_revenue_bracket,
    tags, logo_url, cover_image_url,
    rating_overall, total_reviews, response_rate_pct, avg_response_hours, on_time_shipping_pct,
    accepts_oem_odm, accepts_sample_orders, sells_b2b, sells_b2c,
    approved_at, metadata, created_at, updated_at
  ) VALUES
  (uuidv7(), 'csr', 'foshan-newbie-trading', 'Foshan Newbie Trading Co.',
   '{"vi":"Foshan Newbie Trading","en":"Foshan Newbie Trading","cn":"佛山新手贸易"}'::jsonb,
   'trading_company', 'CN', 'Guangdong', 'Foshan', 'CNY', ARRAY['cn','en']::text[],
   0, false, 1, '1_10', 'under_1m',
   ARRAY['new','small','foshan']::text[],
   'https://placeholder.csr/logo/foshan-newbie.png', NULL,
   NULL, 0, NULL, NULL, NULL,
   false, true, true, false,
   NULL, '{"seed":"minimum","note":"Tier 0 newcomer"}'::jsonb, v_now, v_now),

  -- Tier 1 — Basic verified (email + phone + business license)
  (uuidv7(), 'csr', 'yiwu-small-goods', 'Yiwu Small Goods Wholesale',
   '{"vi":"Yiwu Hàng Tiêu Dùng","en":"Yiwu Small Goods","cn":"义乌小商品批发"}'::jsonb,
   'dealer_distributor', 'CN', 'Zhejiang', 'Yiwu', 'CNY', ARRAY['cn','vi','en']::text[],
   1, false, 3, '11_50', 'under_1m',
   ARRAY['toys','yiwu','small-orders']::text[],
   'https://placeholder.csr/logo/yiwu.png', 'https://placeholder.csr/cover/yiwu.jpg',
   4.2, 38, 88.5, 4.5, 92.0,
   false, true, true, true,
   v_now - INTERVAL '6 months', '{"seed":"minimum"}'::jsonb, v_now, v_now),

  -- Tier 2 — Audited basic
  (uuidv7(), 'csr', 'guangzhou-electronics-trader', 'Guangzhou Electronics Trading Co.',
   '{"vi":"Guangzhou Điện Tử","en":"Guangzhou Electronics","cn":"广州电子贸易"}'::jsonb,
   'trading_company', 'CN', 'Guangdong', 'Guangzhou', 'CNY', ARRAY['cn','en','vi']::text[],
   2, true, 5, '11_50', '1m_5m',
   ARRAY['electronics','accessories','guangzhou']::text[],
   'https://placeholder.csr/logo/gz-tech.png', 'https://placeholder.csr/cover/gz-tech.jpg',
   4.5, 156, 92.0, 3.2, 95.0,
   true, true, true, true,
   v_now - INTERVAL '1 year', '{"seed":"minimum","audit_org":"SGS"}'::jsonb, v_now, v_now),

  -- Tier 3 — Factory verified (factory inspection passed)
  (uuidv7(), 'csr', 'shenzhen-mobile-mfg', 'Shenzhen Mobile Manufacturing Ltd.',
   '{"vi":"Shenzhen Mobile Manufacturing","en":"Shenzhen Mobile Mfg","cn":"深圳移动制造"}'::jsonb,
   'factory', 'CN', 'Guangdong', 'Shenzhen', 'CNY', ARRAY['cn','en','vi']::text[],
   3, true, 8, '201_500', '5m_20m',
   ARRAY['smartphone','factory','oem','shenzhen']::text[],
   'https://placeholder.csr/logo/szm.png', 'https://placeholder.csr/cover/szm.jpg',
   4.6, 423, 96.0, 2.1, 97.5,
   true, true, true, false,
   v_now - INTERVAL '2 years', '{"seed":"minimum","audit_org":"BV","cert":"ISO9001"}'::jsonb, v_now, v_now),

  -- Tier 4 — Gold member (3+ years + high rating)
  (uuidv7(), 'csr', 'dongguan-premium-furniture', 'Dongguan Premium Furniture Group',
   '{"vi":"Đông Hoản Nội Thất Cao Cấp","en":"Dongguan Premium Furniture","cn":"东莞精品家具集团"}'::jsonb,
   'factory', 'CN', 'Guangdong', 'Dongguan', 'CNY', ARRAY['cn','en','vi']::text[],
   4, true, 12, '501_1000', '20m_100m',
   ARRAY['furniture','wooden','export','dongguan','premium']::text[],
   'https://placeholder.csr/logo/dgpf.png', 'https://placeholder.csr/cover/dgpf.jpg',
   4.8, 892, 98.5, 1.5, 98.8,
   true, true, true, true,
   v_now - INTERVAL '3 years', '{"seed":"minimum","cert":["FSC","BSCI","ISO14001"]}'::jsonb, v_now, v_now),

  -- Tier 5 — Platinum (5+ years, $5M+ GMV)
  (uuidv7(), 'csr', 'qingdao-textile-export', 'Qingdao Textile Export Group',
   '{"vi":"Qingdao Dệt May Xuất Khẩu","en":"Qingdao Textile Export","cn":"青岛纺织出口集团"}'::jsonb,
   'factory', 'CN', 'Shandong', 'Qingdao', 'CNY', ARRAY['cn','en','vi','ko']::text[],
   5, true, 18, '1001_plus', '20m_100m',
   ARRAY['textile','apparel','export','platinum','qingdao']::text[],
   'https://placeholder.csr/logo/qte.png', 'https://placeholder.csr/cover/qte.jpg',
   4.9, 2145, 99.2, 0.8, 99.3,
   true, true, true, true,
   v_now - INTERVAL '5 years', '{"seed":"minimum","cert":["GOTS","OEKO-TEX","BSCI"]}'::jsonb, v_now, v_now),

  -- Tier 6 — Diamond (≥$5M/year, top tier)
  (uuidv7(), 'csr', 'vn-coffee-export-corp', 'Vietnam Coffee Export Corporation',
   '{"vi":"Tổng Công ty Xuất khẩu Cà phê Việt Nam","en":"Vietnam Coffee Export Corp","cn":"越南咖啡出口公司"}'::jsonb,
   'factory', 'VN', 'Đắk Lắk', 'Buôn Ma Thuột', 'VND', ARRAY['vi','en','cn','ja']::text[],
   6, true, 25, '1001_plus', '100m_plus',
   ARRAY['coffee','robusta','export','vn','diamond','origin-vn']::text[],
   'https://placeholder.csr/logo/vncec.png', 'https://placeholder.csr/cover/vncec.jpg',
   4.95, 5832, 99.7, 0.5, 99.5,
   false, true, true, true,
   v_now - INTERVAL '8 years', '{"seed":"minimum","cert":["Rainforest","UTZ","Organic","Fair Trade"],"origin_country":"VN"}'::jsonb, v_now, v_now);

  SELECT id INTO v_sup_t0 FROM identity.supplier WHERE slug='foshan-newbie-trading'    AND tenant_id='csr';
  SELECT id INTO v_sup_t1 FROM identity.supplier WHERE slug='yiwu-small-goods'         AND tenant_id='csr';
  SELECT id INTO v_sup_t2 FROM identity.supplier WHERE slug='guangzhou-electronics-trader' AND tenant_id='csr';
  SELECT id INTO v_sup_t3 FROM identity.supplier WHERE slug='shenzhen-mobile-mfg'      AND tenant_id='csr';
  SELECT id INTO v_sup_t4 FROM identity.supplier WHERE slug='dongguan-premium-furniture' AND tenant_id='csr';
  SELECT id INTO v_sup_t5 FROM identity.supplier WHERE slug='qingdao-textile-export'   AND tenant_id='csr';
  SELECT id INTO v_sup_t6 FROM identity.supplier WHERE slug='vn-coffee-export-corp'    AND tenant_id='csr';

  RAISE NOTICE '  Suppliers t0..t6: %, %, %, %, %, %, %',
    v_sup_t0, v_sup_t1, v_sup_t2, v_sup_t3, v_sup_t4, v_sup_t5, v_sup_t6;

  -- ============================================================================
  -- 3. CATEGORY TREE — 4 levels deep
  -- ============================================================================
  -- Level 0 (root) → Level 1 → Level 2 → Level 3
  -- Electronics > Mobile > Smartphones > Premium

  INSERT INTO taxonomy.medusa_category (id, tenant_id, name, handle, parent_category_id, rank, is_active, metadata, created_at, updated_at) VALUES
  -- L0
  (uuidv7(), 'csr', 'Electronics',          'electronics', NULL, 1, true, '{"name_i18n":{"vi":"Điện tử","en":"Electronics","cn":"电子产品"}}'::jsonb, v_now, v_now),
  (uuidv7(), 'csr', 'Apparel & Textiles',   'apparel',     NULL, 2, true, '{"name_i18n":{"vi":"Thời trang & Dệt may","en":"Apparel & Textiles","cn":"服装纺织"}}'::jsonb, v_now, v_now),
  (uuidv7(), 'csr', 'Home & Furniture',     'home-furniture', NULL, 3, true, '{"name_i18n":{"vi":"Nhà cửa & Nội thất","en":"Home & Furniture","cn":"家居家具"}}'::jsonb, v_now, v_now),
  (uuidv7(), 'csr', 'Toys & Games',         'toys',        NULL, 4, true, '{"name_i18n":{"vi":"Đồ chơi","en":"Toys & Games","cn":"玩具游戏"}}'::jsonb, v_now, v_now),
  (uuidv7(), 'csr', 'Food & Beverage',      'food-beverage', NULL, 5, true, '{"name_i18n":{"vi":"Thực phẩm & Đồ uống","en":"Food & Beverage","cn":"食品饮料"}}'::jsonb, v_now, v_now)
  ON CONFLICT (tenant_id, handle) DO NOTHING;

  SELECT id INTO v_cat_electronics FROM taxonomy.medusa_category WHERE handle='electronics' AND tenant_id='csr';
  SELECT id INTO v_cat_apparel     FROM taxonomy.medusa_category WHERE handle='apparel'     AND tenant_id='csr';
  SELECT id INTO v_cat_furniture   FROM taxonomy.medusa_category WHERE handle='home-furniture' AND tenant_id='csr';
  SELECT id INTO v_cat_toys        FROM taxonomy.medusa_category WHERE handle='toys'        AND tenant_id='csr';
  SELECT id INTO v_cat_food        FROM taxonomy.medusa_category WHERE handle='food-beverage' AND tenant_id='csr';

  -- L1 under Electronics
  INSERT INTO taxonomy.medusa_category (id, tenant_id, name, handle, parent_category_id, rank, is_active, metadata, created_at, updated_at) VALUES
  (uuidv7(), 'csr', 'Mobile & Communication', 'mobile-communication', v_cat_electronics, 1, true, '{"name_i18n":{"vi":"Di động & Truyền thông","en":"Mobile & Communication","cn":"移动通讯"}}'::jsonb, v_now, v_now),
  (uuidv7(), 'csr', 'Audio & Headphones',     'audio',               v_cat_electronics, 2, true, '{"name_i18n":{"vi":"Âm thanh & Tai nghe","en":"Audio & Headphones","cn":"音频耳机"}}'::jsonb, v_now, v_now)
  ON CONFLICT (tenant_id, handle) DO NOTHING;

  SELECT id INTO v_cat_mobile FROM taxonomy.medusa_category WHERE handle='mobile-communication' AND tenant_id='csr';
  SELECT id INTO v_cat_audio  FROM taxonomy.medusa_category WHERE handle='audio' AND tenant_id='csr';

  -- L1 under Apparel
  INSERT INTO taxonomy.medusa_category (id, tenant_id, name, handle, parent_category_id, rank, is_active, metadata, created_at, updated_at) VALUES
  (uuidv7(), 'csr', 'T-Shirts & Casual', 't-shirts', v_cat_apparel, 1, true, '{"name_i18n":{"vi":"Áo phông","en":"T-Shirts","cn":"T恤"}}'::jsonb, v_now, v_now)
  ON CONFLICT (tenant_id, handle) DO NOTHING;
  SELECT id INTO v_cat_tshirt FROM taxonomy.medusa_category WHERE handle='t-shirts' AND tenant_id='csr';

  -- L1 under Furniture
  INSERT INTO taxonomy.medusa_category (id, tenant_id, name, handle, parent_category_id, rank, is_active, metadata, created_at, updated_at) VALUES
  (uuidv7(), 'csr', 'Office Furniture', 'office-furniture', v_cat_furniture, 1, true, '{"name_i18n":{"vi":"Đồ gỗ văn phòng","en":"Office Furniture","cn":"办公家具"}}'::jsonb, v_now, v_now)
  ON CONFLICT (tenant_id, handle) DO NOTHING;
  SELECT id INTO v_cat_office FROM taxonomy.medusa_category WHERE handle='office-furniture' AND tenant_id='csr';

  -- L1 under Food
  INSERT INTO taxonomy.medusa_category (id, tenant_id, name, handle, parent_category_id, rank, is_active, metadata, created_at, updated_at) VALUES
  (uuidv7(), 'csr', 'Coffee & Tea', 'coffee-tea', v_cat_food, 1, true, '{"name_i18n":{"vi":"Cà phê & Trà","en":"Coffee & Tea","cn":"咖啡茶饮"}}'::jsonb, v_now, v_now)
  ON CONFLICT (tenant_id, handle) DO NOTHING;
  SELECT id INTO v_cat_coffee FROM taxonomy.medusa_category WHERE handle='coffee-tea' AND tenant_id='csr';

  -- L2 under Mobile
  INSERT INTO taxonomy.medusa_category (id, tenant_id, name, handle, parent_category_id, rank, is_active, metadata, created_at, updated_at) VALUES
  (uuidv7(), 'csr', 'Smartphones', 'smartphones', v_cat_mobile, 1, true, '{"name_i18n":{"vi":"Điện thoại thông minh","en":"Smartphones","cn":"智能手机"}}'::jsonb, v_now, v_now)
  ON CONFLICT (tenant_id, handle) DO NOTHING;
  SELECT id INTO v_cat_smartphone FROM taxonomy.medusa_category WHERE handle='smartphones' AND tenant_id='csr';

  -- L2 under Audio
  INSERT INTO taxonomy.medusa_category (id, tenant_id, name, handle, parent_category_id, rank, is_active, metadata, created_at, updated_at) VALUES
  (uuidv7(), 'csr', 'Wireless Earbuds', 'wireless-earbuds', v_cat_audio, 1, true, '{"name_i18n":{"vi":"Tai nghe không dây","en":"Wireless Earbuds","cn":"无线耳机"}}'::jsonb, v_now, v_now)
  ON CONFLICT (tenant_id, handle) DO NOTHING;
  SELECT id INTO v_cat_earbuds FROM taxonomy.medusa_category WHERE handle='wireless-earbuds' AND tenant_id='csr';

  -- L3 under Smartphones (deepest leaf)
  INSERT INTO taxonomy.medusa_category (id, tenant_id, name, handle, parent_category_id, rank, is_active, metadata, created_at, updated_at) VALUES
  (uuidv7(), 'csr', 'Premium Smartphones', 'smartphones-premium', v_cat_smartphone, 1, true, '{"name_i18n":{"vi":"Điện thoại cao cấp","en":"Premium Smartphones","cn":"高端智能手机"}}'::jsonb, v_now, v_now)
  ON CONFLICT (tenant_id, handle) DO NOTHING;
  SELECT id INTO v_cat_smartphone_premium FROM taxonomy.medusa_category WHERE handle='smartphones-premium' AND tenant_id='csr';

  RAISE NOTICE '  Categories: 13 categories across 4 levels (deepest leaf: smartphones-premium)';

  -- ============================================================================
  -- 4. PRODUCTS — 25 products distributed across suppliers/categories
  -- ============================================================================

  -- Helper: insert each product with explicit slug uniqueness
  -- Skipping product_variant for minimum dataset (storefront can show product without variants for MVP)

  INSERT INTO catalog.product (
    id, tenant_id, supplier_id, brand_id, title_i18n, handle, description_i18n,
    status, moq_quantity, unit_code, lead_time_days_min, lead_time_days_max,
    origin_country, weight_kg, thumbnail_url, badges,
    is_sample_eligible, customs_hs_code,
    default_audience, audiences_available, published_at, metadata, created_at, updated_at
  )
  SELECT
    uuidv7() AS id, 'csr' AS tenant_id, supplier_id, NULL::uuid AS brand_id,
    title_i18n::jsonb, handle, desc_i18n::jsonb,
    'published' AS status, moq, unit_code, lead_min::smallint, lead_max::smallint,
    origin, weight, thumbnail, badges::text[],
    true AS is_sample_eligible, hs_code,
    'b2b_wholesale' AS default_audience, ARRAY['b2b_wholesale']::text[],
    v_now AS published_at, '{"seed":"minimum"}'::jsonb, v_now, v_now
  FROM (VALUES
    -- Smartphones from Shenzhen Mobile Mfg (tier 3) — 5 products
    (v_sup_t3, '{"vi":"Smartphone Android 6.5 inch 64GB","en":"Android Smartphone 6.5\" 64GB","cn":"安卓智能手机6.5寸64GB"}', 'sm-android-65-64gb',
     '{"vi":"Smartphone 6.5 inch màn OLED, RAM 4GB, ROM 64GB, pin 5000mAh, 4G LTE","en":"6.5-inch OLED, 4GB RAM, 64GB ROM, 5000mAh battery, 4G LTE","cn":"6.5寸OLED屏，4GB内存，64GB存储，5000mAh电池"}',
     100, 'pieces', 14, 21, 'CN', 0.180, 'https://placeholder.csr/p/smartphone-a50.jpg', ARRAY['best-seller','new']::text[], '85171200'),
    (v_sup_t3, '{"vi":"Smartphone Premium 6.7 inch 256GB","en":"Premium Smartphone 6.7\" 256GB","cn":"高端智能手机6.7寸256GB"}', 'sm-premium-67-256gb',
     '{"vi":"Flagship 6.7 inch AMOLED 120Hz, RAM 8GB, ROM 256GB, camera 108MP","en":"Flagship 6.7\" AMOLED 120Hz, 8GB RAM, 256GB, 108MP camera","cn":"旗舰6.7寸AMOLED 120Hz，8GB+256GB，1亿像素"}',
     50, 'pieces', 21, 28, 'CN', 0.205, 'https://placeholder.csr/p/smartphone-premium.jpg', ARRAY['premium']::text[], '85171200'),
    (v_sup_t3, '{"vi":"Smartphone Rugged Outdoor IP68","en":"Rugged Smartphone IP68","cn":"户外三防手机 IP68"}', 'sm-rugged-ip68',
     '{"vi":"Chống nước IP68, pin 10000mAh, màn 6.0 inch, dùng cho công trường","en":"IP68 waterproof, 10000mAh battery, 6.0\" display, construction-grade","cn":"IP68防水，10000mAh电池，6.0寸屏，工业级"}',
     200, 'pieces', 18, 25, 'CN', 0.380, 'https://placeholder.csr/p/smartphone-rugged.jpg', ARRAY['durable']::text[], '85171200'),
    (v_sup_t3, '{"vi":"Tablet Android 10 inch","en":"Android Tablet 10\"","cn":"安卓平板电脑10寸"}', 'tablet-android-10',
     '{"vi":"Tablet 10 inch, 4GB RAM, 64GB, WiFi+4G, dùng cho giáo dục","en":"10\" tablet, 4GB RAM, 64GB, WiFi+4G, education-grade","cn":"10寸平板，4GB+64GB，WiFi+4G，教育版"}',
     30, 'pieces', 14, 21, 'CN', 0.520, 'https://placeholder.csr/p/tablet-10.jpg', ARRAY[]::text[], '84713000'),
    (v_sup_t3, '{"vi":"Phụ kiện sạc nhanh 65W","en":"Fast Charger 65W","cn":"65W快充充电器"}', 'charger-65w',
     '{"vi":"Sạc nhanh GaN 65W, hỗ trợ PD/QC4+","en":"65W GaN fast charger, PD/QC4+ support","cn":"65W氮化镓快充，PD/QC4+"}',
     500, 'pieces', 7, 14, 'CN', 0.120, 'https://placeholder.csr/p/charger-65w.jpg', ARRAY['accessory']::text[], '85044010'),

    -- Earbuds from Guangzhou Electronics (tier 2) — 4 products
    (v_sup_t2, '{"vi":"Tai nghe TWS Bluetooth 5.3","en":"TWS Earbuds Bluetooth 5.3","cn":"真无线耳机蓝牙5.3"}', 'earbuds-tws-bt53',
     '{"vi":"True Wireless Bluetooth 5.3, chống ồn ANC, pin 30h tổng","en":"TWS BT 5.3, ANC, 30h total battery","cn":"真无线蓝牙5.3，主动降噪，总续航30小时"}',
     500, 'pieces', 10, 18, 'CN', 0.060, 'https://placeholder.csr/p/earbuds-tws.jpg', ARRAY['best-seller']::text[], '85176200'),
    (v_sup_t2, '{"vi":"Tai nghe gaming có dây RGB","en":"Wired Gaming Headset RGB","cn":"有线游戏耳机RGB"}', 'headset-gaming-rgb',
     '{"vi":"Gaming headset RGB, driver 50mm, jack 3.5mm + USB","en":"Gaming RGB headset, 50mm driver, 3.5mm + USB","cn":"游戏耳机RGB，50mm单元，3.5mm+USB"}',
     200, 'pieces', 12, 20, 'CN', 0.280, 'https://placeholder.csr/p/headset-gaming.jpg', ARRAY['gaming']::text[], '85183000'),
    (v_sup_t2, '{"vi":"Loa bluetooth di động chống nước","en":"Portable Bluetooth Speaker Waterproof","cn":"便携蓝牙音箱防水"}', 'speaker-bt-waterproof',
     '{"vi":"Loa bluetooth 20W, IPX7, pin 15h","en":"20W bluetooth speaker, IPX7, 15h battery","cn":"20W蓝牙音箱，IPX7，续航15小时"}',
     300, 'pieces', 14, 21, 'CN', 0.450, 'https://placeholder.csr/p/speaker-bt.jpg', ARRAY[]::text[], '85182200'),
    (v_sup_t2, '{"vi":"Cáp USB-C to USB-C 100W","en":"USB-C to USB-C Cable 100W","cn":"USB-C 100W数据线"}', 'cable-usbc-100w',
     '{"vi":"Cáp USB-C 100W PD, 2m, vỏ dù","en":"USB-C 100W PD cable, 2m, braided","cn":"USB-C 100W PD，2米，编织线"}',
     1000, 'pieces', 7, 14, 'CN', 0.080, 'https://placeholder.csr/p/cable-usbc.jpg', ARRAY['accessory']::text[], '85444900'),

    -- T-shirts from Qingdao Textile (tier 5) — 4 products
    (v_sup_t5, '{"vi":"Áo thun cotton 180gsm","en":"Cotton T-Shirt 180gsm","cn":"180克纯棉T恤"}', 'tshirt-cotton-180',
     '{"vi":"T-shirt cotton 100% 180gsm, OEM logo, GOTS certified","en":"100% cotton 180gsm, OEM logo, GOTS certified","cn":"100%纯棉180克，定制logo，GOTS认证"}',
     500, 'pieces', 20, 35, 'CN', 0.180, 'https://placeholder.csr/p/tshirt-cotton.jpg', ARRAY['eco','gots']::text[], '61091000'),
    (v_sup_t5, '{"vi":"Polo shirt pique cotton","en":"Cotton Pique Polo Shirt","cn":"棉质珠地网眼Polo衫"}', 'polo-pique-cotton',
     '{"vi":"Polo cotton pique 200gsm, có cổ, button placket","en":"Cotton pique polo 200gsm, collar, button placket","cn":"棉质珠地Polo 200克，领子，门襟"}',
     300, 'pieces', 25, 40, 'CN', 0.220, 'https://placeholder.csr/p/polo.jpg', ARRAY[]::text[], '61053000'),
    (v_sup_t5, '{"vi":"Hoodie nỉ bông unisex","en":"Cotton Fleece Unisex Hoodie","cn":"棉质摇粒绒帽衫"}', 'hoodie-fleece',
     '{"vi":"Hoodie unisex 320gsm cotton fleece, có khoá kéo","en":"Unisex hoodie 320gsm cotton fleece, zipper","cn":"中性帽衫320克棉摇粒绒，拉链"}',
     200, 'pieces', 30, 45, 'CN', 0.480, 'https://placeholder.csr/p/hoodie.jpg', ARRAY[]::text[], '61102000'),
    (v_sup_t5, '{"vi":"Quần jeans denim 14oz","en":"Denim Jeans 14oz","cn":"14盎司牛仔裤"}', 'jeans-denim-14oz',
     '{"vi":"Jeans denim 14oz, rigid, OEM size","en":"14oz rigid denim jeans, OEM sizing","cn":"14盎司硬质牛仔裤，定制尺码"}',
     200, 'pieces', 30, 45, 'CN', 0.620, 'https://placeholder.csr/p/jeans.jpg', ARRAY[]::text[], '62034220'),

    -- Furniture from Dongguan Premium (tier 4) — 3 products
    (v_sup_t4, '{"vi":"Bàn làm việc gỗ óc chó 140cm","en":"Walnut Office Desk 140cm","cn":"胡桃木办公桌140厘米"}', 'desk-walnut-140',
     '{"vi":"Bàn làm việc gỗ óc chó nguyên khối 140x70x75cm, FSC","en":"Solid walnut desk 140x70x75cm, FSC certified","cn":"实木胡桃木办公桌140x70x75，FSC认证"}',
     20, 'pieces', 35, 60, 'CN', 38.000, 'https://placeholder.csr/p/desk-walnut.jpg', ARRAY['premium','fsc']::text[], '94033099'),
    (v_sup_t4, '{"vi":"Ghế công thái học ergonomic","en":"Ergonomic Office Chair","cn":"人体工学办公椅"}', 'chair-ergonomic',
     '{"vi":"Ghế ergonomic mesh, lumbar support, hand rest 3D, BIFMA","en":"Ergonomic mesh chair, lumbar support, 3D armrest, BIFMA","cn":"人体工学网椅，腰托，3D扶手，BIFMA认证"}',
     50, 'pieces', 28, 50, 'CN', 18.500, 'https://placeholder.csr/p/chair-ergo.jpg', ARRAY['premium','bifma']::text[], '94013000'),
    (v_sup_t4, '{"vi":"Tủ tài liệu 4 ngăn gỗ sồi","en":"Oak 4-Drawer Filing Cabinet","cn":"橡木四抽文件柜"}', 'cabinet-oak-4drawer',
     '{"vi":"Tủ gỗ sồi 4 ngăn, có khoá, 50x60x130cm","en":"Oak 4-drawer cabinet, lock, 50x60x130cm","cn":"橡木四抽文件柜，带锁，50x60x130"}',
     30, 'pieces', 35, 60, 'CN', 45.000, 'https://placeholder.csr/p/cabinet-oak.jpg', ARRAY[]::text[], '94033099'),

    -- Toys from Yiwu (tier 1) — 4 products
    (v_sup_t1, '{"vi":"Gấu bông Teddy 30cm","en":"Teddy Bear 30cm","cn":"30厘米泰迪熊"}', 'plush-teddy-30',
     '{"vi":"Gấu bông Teddy 30cm, vải nhung mềm, an toàn EN71","en":"Teddy bear 30cm, soft plush, EN71 safe","cn":"泰迪熊30厘米，柔软毛绒，EN71安全标准"}',
     500, 'pieces', 15, 25, 'CN', 0.300, 'https://placeholder.csr/p/teddy-30.jpg', ARRAY['en71','best-seller']::text[], '95030049'),
    (v_sup_t1, '{"vi":"Bộ xếp hình LEGO-style 500 mảnh","en":"Building Blocks Set 500pcs","cn":"500件积木套装"}', 'blocks-500pcs',
     '{"vi":"Bộ xếp hình 500 mảnh, nhựa ABS, tương thích LEGO","en":"500-piece building blocks, ABS plastic, LEGO-compatible","cn":"500件积木，ABS塑料，兼容乐高"}',
     200, 'pieces', 15, 25, 'CN', 0.850, 'https://placeholder.csr/p/blocks.jpg', ARRAY[]::text[], '95030075'),
    (v_sup_t1, '{"vi":"Búp bê thời trang 30cm","en":"Fashion Doll 30cm","cn":"30厘米时装娃娃"}', 'doll-fashion-30',
     '{"vi":"Búp bê thời trang 30cm với 5 bộ quần áo","en":"30cm fashion doll with 5 outfits","cn":"30厘米时装娃娃，配5套服装"}',
     300, 'pieces', 18, 28, 'CN', 0.220, 'https://placeholder.csr/p/doll.jpg', ARRAY[]::text[], '95023000'),
    (v_sup_t1, '{"vi":"Xe đua RC điều khiển từ xa","en":"RC Racing Car","cn":"遥控赛车"}', 'rc-car-racing',
     '{"vi":"Xe đua RC 1:24, tốc độ 25km/h, pin 2400mAh","en":"RC racing car 1:24, 25km/h, 2400mAh battery","cn":"遥控赛车1:24，时速25公里，2400mAh电池"}',
     150, 'pieces', 20, 30, 'CN', 0.580, 'https://placeholder.csr/p/rc-car.jpg', ARRAY[]::text[], '95030035'),

    -- Coffee from Vietnam (tier 6) — 3 products
    (v_sup_t6, '{"vi":"Cà phê Robusta hạt rang S18","en":"Robusta Roasted Beans S18","cn":"罗布斯塔烘焙咖啡豆S18"}', 'coffee-robusta-s18',
     '{"vi":"Cà phê Robusta Việt Nam hạt rang sàng S18, đóng bao 60kg","en":"Vietnamese Robusta roasted screen 18, 60kg bag","cn":"越南罗布斯塔烘焙咖啡豆，S18筛，60公斤袋装"}',
     10, 'bags', 7, 14, 'VN', 60.000, 'https://placeholder.csr/p/coffee-robusta.jpg', ARRAY['origin-vn','diamond','best-seller']::text[], '09012100'),
    (v_sup_t6, '{"vi":"Cà phê Arabica Cầu Đất specialty","en":"Cau Dat Arabica Specialty","cn":"求达阿拉比卡精品咖啡"}', 'coffee-arabica-caudat',
     '{"vi":"Arabica Cầu Đất Đà Lạt, washed, fruity notes, 60kg jute bag","en":"Cau Dat Arabica washed, fruity notes, 60kg jute","cn":"求达阿拉比卡水洗，果香，60公斤麻袋"}',
     5, 'bags', 7, 14, 'VN', 60.000, 'https://placeholder.csr/p/coffee-arabica.jpg', ARRAY['specialty','origin-vn']::text[], '09012100'),
    (v_sup_t6, '{"vi":"Cà phê hoà tan 3-in-1","en":"Instant Coffee 3-in-1","cn":"3合1速溶咖啡"}', 'coffee-instant-3in1',
     '{"vi":"Cà phê hoà tan 3-in-1 (cà phê + đường + sữa), gói 18g x 50","en":"3-in-1 instant coffee (coffee+sugar+creamer), 18g x 50 sachets","cn":"3合1速溶咖啡（咖啡+糖+奶），18克x50包"}',
     100, 'boxes', 14, 21, 'VN', 1.000, 'https://placeholder.csr/p/coffee-instant.jpg', ARRAY[]::text[], '21011200'),

    -- Sample from Foshan (tier 0) — 2 products to show low-tier listings exist
    (v_sup_t0, '{"vi":"Đèn LED bàn USB","en":"USB LED Desk Lamp","cn":"USB桌面LED灯"}', 'lamp-led-usb',
     '{"vi":"Đèn LED bàn USB 5W, có dimmer","en":"USB LED desk lamp 5W, dimmer","cn":"USB桌灯5W，可调光"}',
     100, 'pieces', 14, 21, 'CN', 0.250, 'https://placeholder.csr/p/lamp-led.jpg', ARRAY[]::text[], '94052000'),
    (v_sup_t0, '{"vi":"Ổ cắm thông minh WiFi","en":"WiFi Smart Plug","cn":"WiFi智能插座"}', 'plug-smart-wifi',
     '{"vi":"Ổ cắm thông minh WiFi 10A, hỗ trợ Alexa/Google","en":"WiFi smart plug 10A, Alexa/Google","cn":"WiFi智能插座10A，支持Alexa/Google"}',
     200, 'pieces', 18, 25, 'CN', 0.100, 'https://placeholder.csr/p/smart-plug.jpg', ARRAY[]::text[], '85365090')
  ) AS t(supplier_id, title_i18n, handle, desc_i18n, moq, unit_code, lead_min, lead_max, origin, weight, thumbnail, badges, hs_code);

  RAISE NOTICE '  Products: 25 inserted across 7 suppliers / 6 leaf categories';

  -- ============================================================================
  -- 5. RFQs — 2 demo RFQs (1 with quote awarded, 1 open)
  -- ============================================================================

  -- RFQ #1: B2B buyer cần Robusta — already awarded to Diamond supplier (tier 6)
  WITH rfq_1 AS (
    INSERT INTO rfq.rfq (
      id, tenant_id, code, buyer_id, title_i18n, description_i18n, category_id,
      target_quantity, unit_code, budget_min_usd_minor, budget_max_usd_minor,
      desired_port, urgency, secured_trading_required, visibility,
      target_supplier_country_codes, target_verification_tier_min,
      status, published_at, expires_at, metadata, created_at, updated_at
    ) VALUES (
      uuidv7(), 'csr', 'RFQ-DEMO-001', v_buyer_b2b_id,
      '{"vi":"Cần Robusta xuất khẩu 5 container 20ft","en":"Need 5x20ft Robusta for export","cn":"求购5个20英尺罗布斯塔咖啡集装箱"}'::jsonb,
      '{"vi":"Tìm Robusta Việt Nam rang sàng S18, target 5 cont 20ft FOB HCMC, giao trong 30 ngày, EU compliant","en":"Looking for VN Robusta roasted S18, 5x20ft FOB HCMC, delivery in 30 days, EU compliant","cn":"求越南罗布斯塔S18烘焙咖啡，5个20英尺集装箱FOB胡志明，30天交货，符合欧盟标准"}'::jsonb,
      v_cat_coffee, 90000, 'kg', 180000000, 220000000,
      'HCMC', 'normal', true, 'public',
      ARRAY['VN']::text[], 4,
      'awarded', v_now - INTERVAL '7 days', v_now + INTERVAL '14 days',
      '{"seed":"minimum","incoterms":"FOB","payment":"L/C 30%"}'::jsonb,
      v_now - INTERVAL '10 days', v_now
    )
    RETURNING id
  )
  INSERT INTO rfq.rfq_quote (
    id, tenant_id, rfq_id, supplier_id, version,
    unit_price_minor, currency, unit_price_usd_minor, total_price_usd_minor,
    lead_time_days, validity_days, shipping_terms,
    payment_terms_i18n, moq, notes_i18n, attachment_urls,
    status, submitted_at, accepted_at, expires_at, metadata
  )
  SELECT
    uuidv7(), 'csr', (SELECT id FROM rfq_1), v_sup_t6, 1,
    2200000, 'USD', 2200, 198000000,
    21, 14, 'fob',
    '{"vi":"L/C 30% trả trước, 70% trước khi giao","en":"L/C 30% down, 70% before shipping","cn":"信用证30%首付，70%发货前"}'::jsonb,
    10, '{"vi":"Giá đặc biệt cho khách hàng VIP","en":"Special pricing for VIP","cn":"VIP客户特价"}'::jsonb,
    ARRAY['https://placeholder.csr/quote/001-spec.pdf']::text[],
    'accepted', v_now - INTERVAL '5 days', v_now - INTERVAL '3 days', v_now + INTERVAL '10 days',
    '{"seed":"minimum"}'::jsonb;

  -- RFQ #2: B2B buyer cần smartphones — vẫn đang quoting
  WITH rfq_2 AS (
    INSERT INTO rfq.rfq (
      id, tenant_id, code, buyer_id, title_i18n, description_i18n, category_id,
      target_quantity, unit_code, budget_min_usd_minor, budget_max_usd_minor,
      desired_port, urgency, secured_trading_required, visibility,
      target_supplier_country_codes, target_verification_tier_min,
      status, published_at, expires_at, metadata, created_at, updated_at
    ) VALUES (
      uuidv7(), 'csr', 'RFQ-DEMO-002', v_buyer_b2b_id,
      '{"vi":"Cần 2000 smartphone Android cho phân phối VN","en":"Need 2000 Android smartphones for VN distribution","cn":"需要2000台安卓智能手机用于越南分销"}'::jsonb,
      '{"vi":"Cần 2000 smartphone Android 6.5 inch 4G LTE, OEM logo, FCC+CE, giao 45 ngày","en":"Need 2000 Android 6.5\" 4G LTE smartphones, OEM logo, FCC+CE, 45-day delivery","cn":"求2000台6.5寸4G LTE安卓手机，OEM logo，FCC+CE认证，45天交货"}'::jsonb,
      v_cat_smartphone, 2000, 'pieces', 160000000, 200000000,
      'Haiphong', 'fast', true, 'public',
      ARRAY['CN']::text[], 3,
      'quoting', v_now - INTERVAL '3 days', v_now + INTERVAL '11 days',
      '{"seed":"minimum","oem_required":true}'::jsonb,
      v_now - INTERVAL '4 days', v_now
    )
    RETURNING id
  ),
  -- 2 supplier quotes cho RFQ này (Shenzhen Mobile + Guangzhou Electronics)
  q1 AS (
    INSERT INTO rfq.rfq_quote (
      id, tenant_id, rfq_id, supplier_id, version,
      unit_price_minor, currency, unit_price_usd_minor, total_price_usd_minor,
      lead_time_days, validity_days, shipping_terms,
      payment_terms_i18n, moq, notes_i18n, status, submitted_at, expires_at, metadata
    )
    SELECT uuidv7(), 'csr', (SELECT id FROM rfq_2), v_sup_t3, 1,
      83000, 'USD', 83, 166000000,
      35, 14, 'fob',
      '{"vi":"T/T 30/70","en":"T/T 30/70","cn":"T/T 30/70"}'::jsonb,
      500, '{"vi":"OEM logo miễn phí cho đơn ≥1000pcs","en":"Free OEM logo for orders ≥1000pcs","cn":"≥1000台免费OEM logo"}'::jsonb,
      'submitted', v_now - INTERVAL '2 days', v_now + INTERVAL '12 days',
      '{"seed":"minimum"}'::jsonb
    RETURNING id
  )
  INSERT INTO rfq.rfq_quote (
    id, tenant_id, rfq_id, supplier_id, version,
    unit_price_minor, currency, unit_price_usd_minor, total_price_usd_minor,
    lead_time_days, validity_days, shipping_terms,
    payment_terms_i18n, moq, notes_i18n, status, submitted_at, expires_at, metadata
  )
  SELECT uuidv7(), 'csr', (SELECT id FROM rfq_2), v_sup_t2, 1,
    87500, 'USD', 87, 174000000,
    30, 14, 'cif',
    '{"vi":"L/C at sight","en":"L/C at sight","cn":"即期信用证"}'::jsonb,
    300, '{"vi":"CIF Haiphong, BHHH bao gồm","en":"CIF Haiphong, insurance included","cn":"CIF海防，含保险"}'::jsonb,
    'submitted', v_now - INTERVAL '1 day', v_now + INTERVAL '13 days',
    '{"seed":"minimum"}'::jsonb;

  RAISE NOTICE '  RFQs: 2 (RFQ-DEMO-001 awarded, RFQ-DEMO-002 quoting with 2 supplier quotes)';

  RAISE NOTICE '════════════════════════════════════════';
  RAISE NOTICE '  MINIMUM DATASET seed completed.';
  RAISE NOTICE '════════════════════════════════════════';
END $seed$;
