-- Curated autocomplete completions + did-you-mean typo corrections.
-- These bootstrap the dropdown before real query traffic accumulates.

DO $search_seed$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN
    RAISE NOTICE 'No tenant csr — skipping search seed';
    RETURN;
  END IF;

  -- Helper local function to insert one completion against multiple prefixes (sliced from completion).
  PERFORM 1; -- noop

  INSERT INTO search.search_autocomplete_suggestion
    (id, tenant_id, query_prefix, completion, popularity_score, locale, last_seen_at, click_through_rate)
  VALUES
    -- Vietnamese
    (public.uuidv7(), v_tenant_id, 'đ', 'điện thoại di động', 950, 'vi', NOW(), 0.18),
    (public.uuidv7(), v_tenant_id, 'đi', 'điện thoại di động', 950, 'vi', NOW(), 0.18),
    (public.uuidv7(), v_tenant_id, 'điện', 'điện thoại di động', 950, 'vi', NOW(), 0.18),
    (public.uuidv7(), v_tenant_id, 'điện', 'điện tử tiêu dùng', 720, 'vi', NOW(), 0.14),
    (public.uuidv7(), v_tenant_id, 'điện', 'điện tử công nghiệp', 410, 'vi', NOW(), 0.09),
    (public.uuidv7(), v_tenant_id, 'la', 'laptop văn phòng', 680, 'vi', NOW(), 0.16),
    (public.uuidv7(), v_tenant_id, 'lap', 'laptop văn phòng', 680, 'vi', NOW(), 0.16),
    (public.uuidv7(), v_tenant_id, 'tai', 'tai nghe bluetooth', 590, 'vi', NOW(), 0.20),
    (public.uuidv7(), v_tenant_id, 'tai n', 'tai nghe bluetooth', 590, 'vi', NOW(), 0.20),
    (public.uuidv7(), v_tenant_id, 'q', 'quần áo trẻ em', 520, 'vi', NOW(), 0.12),
    (public.uuidv7(), v_tenant_id, 'qu', 'quần áo trẻ em', 520, 'vi', NOW(), 0.12),
    (public.uuidv7(), v_tenant_id, 'qu', 'quà tặng doanh nghiệp', 480, 'vi', NOW(), 0.10),
    (public.uuidv7(), v_tenant_id, 'g', 'gấu bông', 410, 'vi', NOW(), 0.15),
    (public.uuidv7(), v_tenant_id, 'gấ', 'gấu bông', 410, 'vi', NOW(), 0.15),
    (public.uuidv7(), v_tenant_id, 'bà', 'bàn văn phòng', 380, 'vi', NOW(), 0.11),
    (public.uuidv7(), v_tenant_id, 'bàn', 'bàn văn phòng', 380, 'vi', NOW(), 0.11),
    (public.uuidv7(), v_tenant_id, 'cà', 'cà phê robusta xuất khẩu', 360, 'vi', NOW(), 0.13),
    (public.uuidv7(), v_tenant_id, 'cà ph', 'cà phê robusta xuất khẩu', 360, 'vi', NOW(), 0.13),
    (public.uuidv7(), v_tenant_id, 'g', 'gạo xuất khẩu', 290, 'vi', NOW(), 0.10),
    (public.uuidv7(), v_tenant_id, 'gạ', 'gạo xuất khẩu', 290, 'vi', NOW(), 0.10),
    (public.uuidv7(), v_tenant_id, 'gi', 'giày da nam', 250, 'vi', NOW(), 0.09),
    (public.uuidv7(), v_tenant_id, 'giày', 'giày da nam', 250, 'vi', NOW(), 0.09),
    (public.uuidv7(), v_tenant_id, 'm', 'mỹ phẩm', 220, 'vi', NOW(), 0.08),
    (public.uuidv7(), v_tenant_id, 'mỹ', 'mỹ phẩm', 220, 'vi', NOW(), 0.08),
    (public.uuidv7(), v_tenant_id, 'nh', 'nhà cung cấp Trung Quốc', 180, 'vi', NOW(), 0.07),
    (public.uuidv7(), v_tenant_id, 'nhà', 'nhà cung cấp Trung Quốc', 180, 'vi', NOW(), 0.07),
    -- English
    (public.uuidv7(), v_tenant_id, 's', 'smartphone wholesale', 880, 'en', NOW(), 0.19),
    (public.uuidv7(), v_tenant_id, 'sm', 'smartphone wholesale', 880, 'en', NOW(), 0.19),
    (public.uuidv7(), v_tenant_id, 'sma', 'smartphone wholesale', 880, 'en', NOW(), 0.19),
    (public.uuidv7(), v_tenant_id, 'b', 'bluetooth earbuds', 750, 'en', NOW(), 0.21),
    (public.uuidv7(), v_tenant_id, 'bl', 'bluetooth earbuds', 750, 'en', NOW(), 0.21),
    (public.uuidv7(), v_tenant_id, 'l', 'laptop oem manufacturer', 690, 'en', NOW(), 0.15),
    (public.uuidv7(), v_tenant_id, 'la', 'laptop oem manufacturer', 690, 'en', NOW(), 0.15),
    (public.uuidv7(), v_tenant_id, 'c', 'cotton t-shirt bulk', 620, 'en', NOW(), 0.14),
    (public.uuidv7(), v_tenant_id, 'co', 'cotton t-shirt bulk', 620, 'en', NOW(), 0.14),
    (public.uuidv7(), v_tenant_id, 'p', 'plush teddy bear', 480, 'en', NOW(), 0.18),
    (public.uuidv7(), v_tenant_id, 'pl', 'plush teddy bear', 480, 'en', NOW(), 0.18),
    (public.uuidv7(), v_tenant_id, 'o', 'office furniture', 420, 'en', NOW(), 0.13),
    (public.uuidv7(), v_tenant_id, 'of', 'office furniture', 420, 'en', NOW(), 0.13),
    (public.uuidv7(), v_tenant_id, 'r', 'robusta coffee export grade', 350, 'en', NOW(), 0.16),
    (public.uuidv7(), v_tenant_id, 'rob', 'robusta coffee export grade', 350, 'en', NOW(), 0.16),
    (public.uuidv7(), v_tenant_id, 'g', 'guangzhou supplier', 310, 'en', NOW(), 0.09),
    (public.uuidv7(), v_tenant_id, 'gu', 'guangzhou supplier', 310, 'en', NOW(), 0.09),
    (public.uuidv7(), v_tenant_id, 's', 'shenzhen electronics', 290, 'en', NOW(), 0.10),
    (public.uuidv7(), v_tenant_id, 'sh', 'shenzhen electronics', 290, 'en', NOW(), 0.10),
    (public.uuidv7(), v_tenant_id, 'y', 'yiwu wholesale market', 260, 'en', NOW(), 0.11),
    -- Chinese
    (public.uuidv7(), v_tenant_id, '手', '手机批发', 920, 'cn', NOW(), 0.20),
    (public.uuidv7(), v_tenant_id, '手机', '手机批发', 920, 'cn', NOW(), 0.20),
    (public.uuidv7(), v_tenant_id, '蓝', '蓝牙耳机', 780, 'cn', NOW(), 0.19),
    (public.uuidv7(), v_tenant_id, '蓝牙', '蓝牙耳机', 780, 'cn', NOW(), 0.19),
    (public.uuidv7(), v_tenant_id, '笔', '笔记本电脑', 690, 'cn', NOW(), 0.16),
    (public.uuidv7(), v_tenant_id, '笔记', '笔记本电脑', 690, 'cn', NOW(), 0.16),
    (public.uuidv7(), v_tenant_id, '玩', '玩具批发', 540, 'cn', NOW(), 0.17),
    (public.uuidv7(), v_tenant_id, '玩具', '玩具批发', 540, 'cn', NOW(), 0.17),
    (public.uuidv7(), v_tenant_id, '家', '家具出口', 480, 'cn', NOW(), 0.13),
    (public.uuidv7(), v_tenant_id, '家具', '家具出口', 480, 'cn', NOW(), 0.13),
    (public.uuidv7(), v_tenant_id, '咖', '咖啡豆', 360, 'cn', NOW(), 0.14),
    (public.uuidv7(), v_tenant_id, '咖啡', '咖啡豆', 360, 'cn', NOW(), 0.14),
    (public.uuidv7(), v_tenant_id, '服', '服装供应商', 320, 'cn', NOW(), 0.10),
    (public.uuidv7(), v_tenant_id, '服装', '服装供应商', 320, 'cn', NOW(), 0.10),
    (public.uuidv7(), v_tenant_id, '越', '越南供应商', 290, 'cn', NOW(), 0.09),
    (public.uuidv7(), v_tenant_id, '越南', '越南供应商', 290, 'cn', NOW(), 0.09),
    (public.uuidv7(), v_tenant_id, '工', '工厂直供', 240, 'cn', NOW(), 0.08),
    (public.uuidv7(), v_tenant_id, '工厂', '工厂直供', 240, 'cn', NOW(), 0.08),
    (public.uuidv7(), v_tenant_id, '广', '广州科技', 220, 'cn', NOW(), 0.07),
    (public.uuidv7(), v_tenant_id, '广州', '广州科技', 220, 'cn', NOW(), 0.07);

  -- Did-you-mean (typo corrections)
  INSERT INTO search.search_did_you_mean
    (id, tenant_id, misspelled_input, suggested_query, locale, manual_override, confidence)
  VALUES
    (public.uuidv7(), v_tenant_id, 'dien thoai', 'điện thoại', 'vi', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'dien thoai di dong', 'điện thoại di động', 'vi', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'tai nghe', 'tai nghe bluetooth', 'vi', TRUE, 0.90),
    (public.uuidv7(), v_tenant_id, 'gau bong', 'gấu bông', 'vi', TRUE, 0.98),
    (public.uuidv7(), v_tenant_id, 'gao xk', 'gạo xuất khẩu', 'vi', TRUE, 0.95),
    (public.uuidv7(), v_tenant_id, 'ca phe', 'cà phê', 'vi', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'giay da', 'giày da', 'vi', TRUE, 0.98),
    (public.uuidv7(), v_tenant_id, 'my pham', 'mỹ phẩm', 'vi', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'ban van phong', 'bàn văn phòng', 'vi', TRUE, 0.97),
    (public.uuidv7(), v_tenant_id, 'tu lanh', 'tủ lạnh', 'vi', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'iphon', 'iphone', 'en', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'samsng', 'samsung', 'en', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'bluetoth', 'bluetooth', 'en', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'laptp', 'laptop', 'en', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'wholsale', 'wholesale', 'en', TRUE, 0.98),
    (public.uuidv7(), v_tenant_id, 'manufactor', 'manufacturer', 'en', TRUE, 0.98),
    (public.uuidv7(), v_tenant_id, 'guangzou', 'guangzhou', 'en', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'shengzhen', 'shenzhen', 'en', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, 'yi wu', 'yiwu', 'en', TRUE, 0.99),
    (public.uuidv7(), v_tenant_id, '手机批', '手机批发', 'cn', TRUE, 0.95);

  -- Bootstrap trending terms (24h) — will be overwritten by trending-rebuilder job
  INSERT INTO search.trending_search_term
    (id, tenant_id, term, locale, period, trend_score, change_pct_vs_prior, last_computed_at)
  VALUES
    (public.uuidv7(), v_tenant_id, 'điện thoại di động', 'vi', '24h', 9.2, 15, NOW()),
    (public.uuidv7(), v_tenant_id, 'tai nghe bluetooth', 'vi', '24h', 7.8, 22, NOW()),
    (public.uuidv7(), v_tenant_id, 'gấu bông', 'vi', '24h', 6.4, 8, NOW()),
    (public.uuidv7(), v_tenant_id, 'cà phê robusta', 'vi', '24h', 5.5, 30, NOW()),
    (public.uuidv7(), v_tenant_id, 'bàn văn phòng', 'vi', '24h', 4.7, 5, NOW()),
    (public.uuidv7(), v_tenant_id, 'smartphone wholesale', 'en', '24h', 8.5, 18, NOW()),
    (public.uuidv7(), v_tenant_id, 'bluetooth earbuds', 'en', '24h', 7.2, 12, NOW()),
    (public.uuidv7(), v_tenant_id, 'plush teddy bear', 'en', '24h', 6.1, 25, NOW()),
    (public.uuidv7(), v_tenant_id, 'office furniture', 'en', '24h', 5.0, 7, NOW()),
    (public.uuidv7(), v_tenant_id, 'robusta coffee export', 'en', '24h', 4.4, 35, NOW()),
    (public.uuidv7(), v_tenant_id, '手机批发', 'cn', '24h', 8.9, 20, NOW()),
    (public.uuidv7(), v_tenant_id, '蓝牙耳机', 'cn', '24h', 7.5, 15, NOW()),
    (public.uuidv7(), v_tenant_id, '玩具批发', 'cn', '24h', 5.9, 28, NOW()),
    (public.uuidv7(), v_tenant_id, '家具出口', 'cn', '24h', 4.6, 10, NOW()),
    (public.uuidv7(), v_tenant_id, '越南咖啡', 'cn', '24h', 4.2, 40, NOW())
  ON CONFLICT (tenant_id, term, locale, period, geo_country) DO UPDATE
  SET trend_score = EXCLUDED.trend_score, change_pct_vs_prior = EXCLUDED.change_pct_vs_prior, last_computed_at = NOW();

  RAISE NOTICE 'Search seed: autocomplete + did-you-mean + trending inserted';
END $search_seed$;
