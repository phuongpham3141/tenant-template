-- Sample industry channels stored in Payload schema (referenced by storefront)

DO $ic$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;
  -- Payload entries are created via API; this is metadata stub for Medusa industry reference table
  INSERT INTO catalog.industry_channel_master (code, name_i18n, parent_code, display_order) VALUES
  ('electronics', '{"vi":"Điện tử","en":"Electronics","cn":"电子"}'::jsonb, NULL, 10),
  ('apparel', '{"vi":"May mặc","en":"Apparel","cn":"服装"}'::jsonb, NULL, 20),
  ('home-furniture', '{"vi":"Nội thất","en":"Home & Furniture","cn":"家居"}'::jsonb, NULL, 30),
  ('toys-games', '{"vi":"Đồ chơi","en":"Toys & Games","cn":"玩具"}'::jsonb, NULL, 40),
  ('agriculture', '{"vi":"Nông sản","en":"Agriculture","cn":"农业"}'::jsonb, NULL, 50),
  ('machinery', '{"vi":"Máy móc","en":"Machinery","cn":"机械"}'::jsonb, NULL, 60),
  ('automotive', '{"vi":"Phụ tùng ô tô","en":"Auto Parts","cn":"汽车配件"}'::jsonb, NULL, 70),
  ('consumer-electronics', '{"vi":"Điện tử tiêu dùng","en":"Consumer Electronics","cn":"消费电子"}'::jsonb, 'electronics', 11),
  ('industrial-electronics', '{"vi":"Điện tử công nghiệp","en":"Industrial Electronics","cn":"工业电子"}'::jsonb, 'electronics', 12)
  ON CONFLICT (code) DO UPDATE SET name_i18n = EXCLUDED.name_i18n;
END $ic$;
