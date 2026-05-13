-- Sample interpreters for VN sourcing

DO $intp$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO vn_sourcing.interpreter (id, tenant_id, user_id, languages, specialties,
    hourly_rate_usd_minor, rating, total_sessions, status, bio, created_at, updated_at) VALUES
  ('55555555-5555-5555-5555-555555555001'::uuid, v_tenant_id, NULL,
    ARRAY['vi','zh'], ARRAY['electronics','manufacturing','factory_visit'],
    3500, 4.8, 142, 'active',
    'Senior CN-VN interpreter, 8 years in electronics manufacturing. Based in Guangzhou.',
    NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555002'::uuid, v_tenant_id, NULL,
    ARRAY['vi','en','zh'], ARRAY['textile','garment','trade_show'],
    4500, 4.9, 89, 'active',
    'Trilingual interpreter (VN/EN/CN), specialized in textile and apparel.',
    NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555003'::uuid, v_tenant_id, NULL,
    ARRAY['vi','zh'], ARRAY['furniture','agriculture','negotiation'],
    2800, 4.6, 215, 'active',
    'CN-VN interpreter from Yiwu. Veteran of 200+ B2B negotiations.',
    NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
END $intp$;
