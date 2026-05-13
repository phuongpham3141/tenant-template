-- Prompt templates for AI livestream features

DO $alp$
DECLARE v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO ai.prompt_template (id, tenant_id, code, name, feature_code, model_id, fallback_model_id, system_prompt, user_prompt_template, parameters, status, created_at, updated_at) VALUES
  (public.uuidv7(), v_tenant_id, 'live_chat_response_v1', 'Live Chat Response',
    'live_chat_response', 'gpt-realtime', 'claude-haiku-4-5',
    'You are {{persona_name}}, a livestream host. Reply briefly (≤2 sentences), in {{locale}}, friendly and on-brand. Catchphrases: {{catchphrases}}. NEVER mention prices unless you have confirmed inventory. NEVER promise discounts without verification.',
    'Viewer asked: {{question}}',
    '{"temperature":0.6,"max_tokens":120}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'live_segment_dialogue_v1', 'Segment Dialogue Generator',
    'live_segment_dialogue', 'claude-sonnet-4-6', 'gpt-5',
    'You write natural livestream dialogue for an AI host. Tone: {{voice_style}}. Locale: {{locale}}. Persona: {{persona_name}}.',
    'Segment type: {{segment_type}}. Context: {{context}}. Generate 1-3 sentences of dialogue, suitable for TTS (no markdown, no emoji).',
    '{"temperature":0.5,"max_tokens":300}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'live_qa_answer_v1', 'Live Q&A Answer',
    'live_qa_answer', 'claude-sonnet-4-6', 'gpt-5-mini',
    'You answer B2B buyer questions during a livestream. Be concise, accurate, in {{locale}}. If you do not know, say so and offer to connect with sales.',
    'Product context: {{product_info}}. Question: {{question}}',
    '{"temperature":0.3,"max_tokens":200}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'live_product_pitch_v1', 'Product Pitch (dynamic)',
    'live_product_pitch', 'claude-sonnet-4-6', 'gpt-5',
    'You generate a 30-60s livestream product pitch for an AI host. Highlight USPs, social proof, urgency. Locale: {{locale}}.',
    'Product: {{product_name}}. Key specs: {{specs}}. Price/MOQ: {{price_moq}}. Stock: {{stock}}.',
    '{"temperature":0.6,"max_tokens":400}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'live_closing_cta_v1', 'Closing CTA',
    'live_closing_cta', 'claude-haiku-4-5', 'gpt-5-mini',
    'You write a short call-to-action for end of a livestream segment. Locale: {{locale}}. Urgent but not pushy.',
    'Action: {{action}}. URL: {{cta_url}}. Time remaining: {{time_remaining}}.',
    '{"temperature":0.5,"max_tokens":120}'::jsonb, 'published', NOW(), NOW())
  ON CONFLICT (tenant_id, code) DO UPDATE SET system_prompt = EXCLUDED.system_prompt, user_prompt_template = EXCLUDED.user_prompt_template;

  -- Email templates for quota notifications
  INSERT INTO email_mkt.template (id, tenant_id, code, name, category, subject_i18n, body_mjml, variables, is_transactional, created_at, updated_at) VALUES
  (public.uuidv7(), v_tenant_id, 'ai_livestream_quota_warning', 'AI Quota Warning', 'security',
    '{"vi":"Cảnh báo: AI Livestream đã dùng {{percent_used}}% quota","en":"Warning: AI Livestream at {{percent_used}}% quota","cn":"警告：AI 直播配额已用 {{percent_used}}%"}'::jsonb,
    '<mjml><mj-body><mj-text>AI livestream quota at {{percent_used}}%. Upgrade plan to avoid pause.</mj-text></mj-body></mjml>',
    '[{"key":"percent_used","required":true}]'::jsonb, FALSE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'ai_livestream_quota_paused', 'AI Quota Paused', 'security',
    '{"vi":"AI Livestream đã bị tạm dừng (vượt quota)","en":"AI Livestream paused (quota exceeded)","cn":"AI 直播已暂停（配额超额）"}'::jsonb,
    '<mjml><mj-body><mj-text>Stream {{stream_id}} paused. Upgrade plan to resume.</mj-text></mj-body></mjml>',
    '[{"key":"stream_id"}]'::jsonb, TRUE, NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'ai_persona_training_complete', 'Persona Training Complete', 'kyc',
    '{"vi":"Persona AI của bạn đã sẵn sàng","en":"Your AI persona is ready","cn":"您的 AI 主播已就绪"}'::jsonb,
    '<mjml><mj-body><mj-text>Persona {{persona_id}} finished training and is ready to host.</mj-text></mj-body></mjml>',
    '[{"key":"persona_id"}]'::jsonb, TRUE, NOW(), NOW())
  ON CONFLICT (tenant_id, code) DO UPDATE SET subject_i18n = EXCLUDED.subject_i18n;
END $alp$;
