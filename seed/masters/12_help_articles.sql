-- Help articles bootstrap (synced to Payload after first deploy)
-- This is reference data; Payload owns the source of truth post-deploy.

DO $help$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO catalog.help_article_master (id, tenant_id, slug, title_i18n, category, audience, body_i18n, display_order, created_at, updated_at) VALUES
  (public.uuidv7(), v_tenant_id, 'getting-started-buyer',
    '{"vi":"Hướng dẫn bắt đầu cho người mua","en":"Getting started for buyers","cn":"买家入门指南"}'::jsonb,
    'getting_started', ARRAY['buyer'],
    '{"vi":"Đăng ký tài khoản → xác minh email → tìm kiếm nhà cung cấp → đặt RFQ...","en":"Sign up → verify email → search suppliers → submit RFQ...","cn":"注册账户 → 验证邮箱 → 搜索供应商 → 提交询价单..."}'::jsonb,
    10, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'kyc-document-list',
    '{"vi":"Danh sách giấy tờ KYC cần thiết","en":"Required KYC documents","cn":"所需KYC文件"}'::jsonb,
    'kyc', ARRAY['supplier'],
    '{"vi":"Giấy phép kinh doanh, CCCD/Passport, hoá đơn điện nước...","en":"Business license, ID/Passport, utility bills...","cn":"营业执照、身份证/护照、水电费账单..."}'::jsonb,
    20, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'escrow-explained',
    '{"vi":"Cơ chế Escrow hoạt động thế nào","en":"How escrow works","cn":"托管机制如何运作"}'::jsonb,
    'payments', ARRAY['all'],
    '{"vi":"Tiền được giữ trong tài khoản trung gian cho đến khi hoàn tất các milestone...","en":"Funds held in escrow until milestones complete...","cn":"资金托管直到里程碑完成..."}'::jsonb,
    30, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'fta-cert-of-origin',
    '{"vi":"Chứng nhận xuất xứ và ưu đãi FTA","en":"Certificate of Origin & FTA preferences","cn":"原产地证书与自贸区优惠"}'::jsonb,
    'shipping', ARRAY['buyer','supplier'],
    '{"vi":"Form E (ACFTA), Form RCEP, Form AK (VKFTA), REX (EVFTA)...","en":"Form E (ACFTA), Form RCEP, Form AK (VKFTA), REX (EVFTA)...","cn":"E表(ACFTA)、RCEP表、AK表(VKFTA)、REX(EVFTA)..."}'::jsonb,
    40, NOW(), NOW())
  ON CONFLICT (tenant_id, slug) DO NOTHING;
END $help$;
