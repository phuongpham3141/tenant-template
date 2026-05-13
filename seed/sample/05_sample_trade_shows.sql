-- Sample trade shows (Canton Fair, VIFA, China Plus One)
DO $ts$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO event.trade_show (id, tenant_id, slug, name_i18n, short_name, edition_number,
    organizer_name, industry_codes, venue, start_date, end_date,
    introduction_i18n, registration_url, stats, status, created_at, updated_at) VALUES
  ('44444444-4444-4444-4444-444444444001'::uuid, v_tenant_id, 'canton-fair-2026-spring',
    '{"vi":"Hội chợ Quảng Châu 2026 Xuân","en":"Canton Fair 2026 Spring","cn":"广交会 2026 春季"}'::jsonb,
    'Canton Fair', '139th Edition',
    'China Foreign Trade Centre', ARRAY['electronics','apparel','home-furniture','machinery'],
    '{"name":"Guangzhou International Convention and Exhibition Center","city":"Guangzhou","country":"CN","lat":23.0967,"lng":113.3258}'::jsonb,
    '2026-04-15', '2026-05-05',
    '{"vi":"Hội chợ thương mại lớn nhất Trung Quốc","en":"China''s largest trade fair","cn":"中国最大的贸易展会"}'::jsonb,
    'https://www.cantonfair.org.cn',
    '{"exhibitor_count":25000,"visitor_count":210000,"booth_space_sqm":1180000}'::jsonb,
    'active', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444002'::uuid, v_tenant_id, 'vifa-2026',
    '{"vi":"VIFA EXPO 2026","en":"VIFA EXPO 2026","cn":"越南家具展 2026"}'::jsonb,
    'VIFA', '2026',
    'HAWA Vietnam Handicraft Wood Association', ARRAY['home-furniture'],
    '{"name":"SECC HCMC","city":"HCMC","country":"VN","lat":10.7768,"lng":106.7009}'::jsonb,
    '2026-03-09', '2026-03-12',
    '{"vi":"Triển lãm Đồ gỗ và Mỹ nghệ","en":"Vietnam Furniture & Handicrafts Expo","cn":"越南家具与工艺品博览会"}'::jsonb,
    'https://vifaexpo.com',
    '{"exhibitor_count":500,"visitor_count":18000}'::jsonb,
    'active', NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
END $ts$;
