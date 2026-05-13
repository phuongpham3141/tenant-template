-- Transactional email templates (MJML simplified to HTML for seed)

DO $emt$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO email_mkt.template (id, tenant_id, code, name, category, subject_i18n, body_mjml, variables, is_transactional, created_at, updated_at) VALUES
  (public.uuidv7(), v_tenant_id, 'order_confirmation_buyer', 'Order Confirmation (Buyer)', 'order',
    '{"vi":"Đơn hàng {{order_id}} đã được xác nhận","en":"Order {{order_id}} confirmed","cn":"订单 {{order_id}} 已确认"}'::jsonb,
    '<mjml><mj-body><mj-section><mj-column><mj-text>Hi {{customer_name}},</mj-text><mj-text>Order {{order_id}} confirmed. Total: {{total}}.</mj-text></mj-column></mj-section></mj-body></mjml>',
    '[{"key":"order_id","required":true},{"key":"customer_name"},{"key":"total"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'order_received_supplier', 'New Order (Supplier)', 'order',
    '{"vi":"Đơn hàng mới {{order_id}}","en":"New order {{order_id}}","cn":"新订单 {{order_id}}"}'::jsonb,
    '<mjml><mj-body><mj-section><mj-column><mj-text>You have a new order: {{order_id}}.</mj-text></mj-column></mj-section></mj-body></mjml>',
    '[{"key":"order_id","required":true}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'rfq_invitation', 'RFQ Invitation', 'order',
    '{"vi":"Yêu cầu báo giá mới: {{rfq_id}}","en":"New RFQ: {{rfq_id}}","cn":"新询价单: {{rfq_id}}"}'::jsonb,
    '<mjml><mj-body><mj-text>You are invited to quote on {{rfq_id}}.</mj-text></mj-body></mjml>',
    '[{"key":"rfq_id","required":true}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'rfq_new_quote', 'New Quote Received', 'order',
    '{"vi":"Báo giá mới cho RFQ {{rfq_id}}","en":"New quote on RFQ {{rfq_id}}","cn":"询价 {{rfq_id}} 收到新报价"}'::jsonb,
    '<mjml><mj-body><mj-text>You received a new quote on {{rfq_id}}.</mj-text></mj-body></mjml>',
    '[{"key":"rfq_id"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'rfq_quote_accepted', 'Quote Accepted', 'order',
    '{"vi":"Báo giá đã được chấp nhận","en":"Your quote was accepted","cn":"您的报价已被接受"}'::jsonb,
    '<mjml><mj-body><mj-text>Your quote on {{rfq_id}} was accepted.</mj-text></mj-body></mjml>',
    '[{"key":"rfq_id"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'escrow_funded_supplier', 'Escrow Funded', 'payment',
    '{"vi":"Tiền đặt cọc đã được nạp","en":"Escrow {{escrow_id}} funded","cn":"托管资金 {{escrow_id}} 已注入"}'::jsonb,
    '<mjml><mj-body><mj-text>Escrow {{escrow_id}} has been funded.</mj-text></mj-body></mjml>',
    '[{"key":"escrow_id"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'escrow_milestone_released', 'Milestone Released', 'payment',
    '{"vi":"Milestone {{milestone_id}} đã được giải ngân","en":"Milestone {{milestone_id}} released","cn":"里程碑 {{milestone_id}} 已释放"}'::jsonb,
    '<mjml><mj-body><mj-text>Milestone {{milestone_id}} released for escrow {{escrow_id}}.</mj-text></mj-body></mjml>',
    '[{"key":"escrow_id"},{"key":"milestone_id"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'escrow_refunded_buyer', 'Escrow Refunded', 'payment',
    '{"vi":"Hoàn tiền: {{escrow_id}}","en":"Refund: {{escrow_id}}","cn":"退款: {{escrow_id}}"}'::jsonb,
    '<mjml><mj-body><mj-text>Refund processed for escrow {{escrow_id}}. Reason: {{reason}}.</mj-text></mj-body></mjml>',
    '[{"key":"escrow_id"},{"key":"reason"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'kyc_document_rejected', 'KYC Rejected', 'kyc',
    '{"vi":"Tài liệu KYC bị từ chối","en":"KYC document rejected","cn":"KYC 文档被拒绝"}'::jsonb,
    '<mjml><mj-body><mj-text>Your KYC document was rejected. Reason: {{reason}}.</mj-text></mj-body></mjml>',
    '[{"key":"document_id"},{"key":"reason"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'supplier_tier_promoted', 'Verification Tier Upgraded', 'kyc',
    '{"vi":"Bạn đã được nâng cấp xác minh","en":"Verification tier upgraded","cn":"验证等级已提升"}'::jsonb,
    '<mjml><mj-body><mj-text>You have been promoted from tier {{from_tier}} to tier {{to_tier}}.</mj-text></mj-body></mjml>',
    '[{"key":"from_tier"},{"key":"to_tier"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'welcome_buyer', 'Welcome (Buyer)', 'welcome',
    '{"vi":"Chào mừng đến với Cybersilkroads","en":"Welcome to Cybersilkroads","cn":"欢迎来到 Cybersilkroads"}'::jsonb,
    '<mjml><mj-body><mj-text>Welcome {{customer_name}}!</mj-text></mj-body></mjml>',
    '[{"key":"customer_name"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'password_reset', 'Password Reset', 'security',
    '{"vi":"Đặt lại mật khẩu","en":"Reset your password","cn":"重置密码"}'::jsonb,
    '<mjml><mj-body><mj-text>Click here to reset: {{reset_url}}. Expires in 30 minutes.</mj-text></mj-body></mjml>',
    '[{"key":"reset_url","required":true}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'livestream_starting_soon', 'Livestream Starting', 'marketing',
    '{"vi":"Live sắp bắt đầu","en":"Livestream starting soon","cn":"直播即将开始"}'::jsonb,
    '<mjml><mj-body><mj-text>{{supplier_name}} is going live in 15 minutes. {{stream_url}}</mj-text></mj-body></mjml>',
    '[{"key":"stream_id"},{"key":"stream_url"},{"key":"supplier_name"}]'::jsonb, FALSE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'gdpr_dsr_sla_warning', 'GDPR DSR SLA Warning', 'security',
    '{"vi":"Cảnh báo SLA yêu cầu GDPR","en":"GDPR DSR SLA warning","cn":"GDPR DSR SLA 警告"}'::jsonb,
    '<mjml><mj-body><mj-text>DSR {{dsr_id}} for user {{user_id}} due in &lt;5 days.</mj-text></mj-body></mjml>',
    '[{"key":"dsr_id"},{"key":"user_id"}]'::jsonb, TRUE, NOW(), NOW())
  ON CONFLICT (tenant_id, code) DO UPDATE SET subject_i18n = EXCLUDED.subject_i18n, body_mjml = EXCLUDED.body_mjml, updated_at = NOW();
END $emt$;
