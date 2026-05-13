-- AI Livestream seed: 3 demo personas + 1 sample script (electronics showcase, loopable 30min) + 6 starter clip library

DO $als$
DECLARE
  v_tenant_id UUID;
  v_supplier_id UUID;
  v_persona_vi UUID;
  v_persona_en UUID;
  v_persona_cn UUID;
  v_avatar_2d UUID;
  v_script_id UUID;
  v_seg_intro UUID;
  v_seg_product UUID;
  v_seg_cta UUID;
  v_seg_qa UUID;
  v_seg_outro UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RAISE NOTICE 'No tenant csr — skip ai livestream seed'; RETURN; END IF;
  SELECT id INTO v_supplier_id FROM identity.supplier WHERE slug = 'shenzhen-electronics' LIMIT 1;

  -- 1. Avatar asset (HeyGen-style 2D talking head, placeholder)
  INSERT INTO live.avatar_asset (
    id, tenant_id, asset_type, provider, provider_asset_id, display_name,
    thumbnail_url, idle_loop_url, resolution, aspect_ratio,
    cost_per_minute_micros, ready_for_realtime
  ) VALUES (
    public.uuidv7(), v_tenant_id, '2d_talking_head', 'heygen', 'avatar_demo_csr_anna',
    'Anna — Asian female, business casual',
    'https://placeholder.csr/anna-thumb.jpg', 'https://placeholder.csr/anna-idle.mp4',
    '1080p', '16:9', 150000, TRUE
  )
  ON CONFLICT DO NOTHING
  RETURNING id INTO v_avatar_2d;

  IF v_avatar_2d IS NULL THEN
    SELECT id INTO v_avatar_2d FROM live.avatar_asset WHERE provider_asset_id = 'avatar_demo_csr_anna' LIMIT 1;
  END IF;

  -- 2. Personas: Anna (vi/primary), Lily (en), Mei (cn) — all tied to same avatar for demo
  INSERT INTO live.ai_persona (
    id, tenant_id, supplier_id, slug, display_name_i18n, persona_description_i18n,
    voice_style, primary_locale, supported_locales, avatar_asset_id, voice_profile_ids,
    catchphrases_jsonb, status, created_at, updated_at
  ) VALUES
  (public.uuidv7(), v_tenant_id, v_supplier_id, 'anna-csr-vi',
   '{"vi":"Anna","en":"Anna","cn":"安娜"}'::jsonb,
   '{"vi":"Host AI tiếng Việt chuyên về điện tử","en":"Vietnamese AI host specializing in electronics","cn":"专注电子产品的越南AI主播"}'::jsonb,
   'friendly_sales', 'vi', ARRAY['vi','en','cn']::text[], v_avatar_2d, '{}'::jsonb,
   '["Hôm nay siêu deal!","Bạn ơi, kho sắp hết kìa","Đặt ngay đặt liền nhé"]'::jsonb,
   'active', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, v_supplier_id, 'lily-csr-en',
   '{"vi":"Lily","en":"Lily","cn":"莉莉"}'::jsonb,
   '{"vi":"Host AI tiếng Anh","en":"English AI host for global wholesale","cn":"英语AI主播"}'::jsonb,
   'energetic', 'en', ARRAY['vi','en','cn']::text[], v_avatar_2d, '{}'::jsonb,
   '["Best deal today!","Stock is running out","Order now before they''re gone"]'::jsonb,
   'active', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, v_supplier_id, 'mei-csr-cn',
   '{"vi":"Mei","en":"Mei","cn":"美"}'::jsonb,
   '{"vi":"Host AI tiếng Trung","en":"Mandarin AI host","cn":"中文AI主播专注B2B批发"}'::jsonb,
   'warm_advisor', 'cn', ARRAY['vi','en','cn']::text[], v_avatar_2d, '{}'::jsonb,
   '["今日超值优惠！","库存快没了哦","赶紧下单吧"]'::jsonb,
   'active', NOW(), NOW())
  ON CONFLICT (tenant_id, slug) DO NOTHING;

  SELECT id INTO v_persona_vi FROM live.ai_persona WHERE slug = 'anna-csr-vi' AND tenant_id = v_tenant_id;
  SELECT id INTO v_persona_en FROM live.ai_persona WHERE slug = 'lily-csr-en' AND tenant_id = v_tenant_id;
  SELECT id INTO v_persona_cn FROM live.ai_persona WHERE slug = 'mei-csr-cn' AND tenant_id = v_tenant_id;

  -- 3. Voice profiles per persona+locale (ElevenLabs voice IDs placeholder; replace via /admin/.../personas API after voice clone)
  INSERT INTO live.voice_profile (id, tenant_id, persona_id, locale, provider, provider_voice_id, gender, age_band, accent, is_clone, training_status, cost_per_1k_chars_micros) VALUES
  (public.uuidv7(), v_tenant_id, v_persona_vi, 'vi', 'elevenlabs', 'el_voice_vi_anna_demo', 'female', '25-35', 'northern', TRUE, 'ready', 300000),
  (public.uuidv7(), v_tenant_id, v_persona_vi, 'en', 'elevenlabs', 'el_voice_en_anna_demo', 'female', '25-35', 'neutral', TRUE, 'ready', 300000),
  (public.uuidv7(), v_tenant_id, v_persona_vi, 'cn', 'elevenlabs', 'el_voice_cn_anna_demo', 'female', '25-35', 'mandarin', TRUE, 'ready', 300000)
  ON CONFLICT DO NOTHING;

  UPDATE live.ai_persona SET voice_profile_ids = (
    SELECT jsonb_object_agg(locale, id::text) FROM live.voice_profile WHERE persona_id = v_persona_vi
  ) WHERE id = v_persona_vi;

  -- 4. Sample script — Electronics Showcase 30min Loop (vi master, dialogue per locale)
  INSERT INTO live.ai_stream_script (
    id, tenant_id, supplier_id, persona_id, name, description,
    supported_locales, total_duration_estimate_seconds, version, status, loop_until_stop,
    created_at, updated_at
  ) VALUES (
    public.uuidv7(), v_tenant_id, v_supplier_id, v_persona_vi,
    'Electronics Showcase — 30min Loop',
    'Demo loopable script: intro → 3 product showcases → CTA → Q&A → outro → loop',
    ARRAY['vi','en','cn']::text[], 1800, 1, 'approved', TRUE, NOW(), NOW()
  ) RETURNING id INTO v_script_id;

  -- 5. Segments
  INSERT INTO live.script_segment (id, tenant_id, script_id, segment_type, order_hint, dialogue_template_i18n, duration_seconds_estimate, created_at, updated_at)
  VALUES (public.uuidv7(), v_tenant_id, v_script_id, 'intro', 10,
    '{"vi":"Xin chào các bạn! Mình là {{persona_name}}, host AI của {{supplier_name}}. Hôm nay mình sẽ giới thiệu các sản phẩm điện tử siêu hot. Bắt đầu ngay nhé!","en":"Hi everyone! I''m {{persona_name}}, AI host from {{supplier_name}}. Today I''m showcasing hot electronics. Let''s dive in!","cn":"大家好！我是{{persona_name}}，{{supplier_name}}的AI主播。今天给大家介绍超热门的电子产品，开始吧！"}'::jsonb,
    30, NOW(), NOW())
  RETURNING id INTO v_seg_intro;

  INSERT INTO live.script_segment (id, tenant_id, script_id, segment_type, order_hint, dialogue_template_i18n, duration_seconds_estimate, created_at, updated_at)
  VALUES (public.uuidv7(), v_tenant_id, v_script_id, 'product_showcase', 20,
    '{"vi":"Đầu tiên là smartphone Android A50 — 6.5 inch, 4G LTE, 64GB, giá chỉ {{price}}. MOQ chỉ {{moq}} chiếc, hàng có sẵn xuất ngay.","en":"First up: Android Smartphone A50 — 6.5-inch, 4G LTE, 64GB, only {{price}}. MOQ {{moq}} pieces, in stock now.","cn":"首先介绍安卓智能手机 A50——6.5英寸，4G LTE，64GB，仅需{{price}}。起订量{{moq}}件，现货供应。"}'::jsonb,
    180, NOW(), NOW())
  RETURNING id INTO v_seg_product;

  INSERT INTO live.script_segment (id, tenant_id, script_id, segment_type, order_hint, dialogue_template_i18n, duration_seconds_estimate, created_at, updated_at)
  VALUES (public.uuidv7(), v_tenant_id, v_script_id, 'cta', 30,
    '{"vi":"Đặt ngay tại {{cta_url}}! Còn hơn 30 chiếc trong kho thôi, nhanh tay nhé!","en":"Order now at {{cta_url}}! Less than 30 left, hurry!","cn":"立即下单：{{cta_url}}！库存不到30件，抓紧时间！"}'::jsonb,
    20, NOW(), NOW())
  RETURNING id INTO v_seg_cta;

  INSERT INTO live.script_segment (id, tenant_id, script_id, segment_type, order_hint, dialogue_template_i18n, duration_seconds_estimate, created_at, updated_at)
  VALUES (public.uuidv7(), v_tenant_id, v_script_id, 'qa', 40,
    '{"vi":"Có câu hỏi nào không các bạn? Hãy chat ở bên dưới, mình trả lời ngay!","en":"Any questions? Drop them in chat and I''ll answer right away!","cn":"有什么问题吗？在聊天框留言，我马上回答！"}'::jsonb,
    120, NOW(), NOW())
  RETURNING id INTO v_seg_qa;

  INSERT INTO live.script_segment (id, tenant_id, script_id, segment_type, order_hint, dialogue_template_i18n, duration_seconds_estimate, created_at, updated_at)
  VALUES (public.uuidv7(), v_tenant_id, v_script_id, 'outro', 50,
    '{"vi":"Cảm ơn các bạn đã xem. Sản phẩm tiếp theo sẽ lên ngay sau quảng cáo. Ở lại nhé!","en":"Thanks for watching! Next product coming up after a quick break. Stay tuned!","cn":"感谢观看！稍后再来介绍下一款产品，敬请期待！"}'::jsonb,
    20, NOW(), NOW())
  RETURNING id INTO v_seg_outro;

  -- 6. Transitions: intro → product → cta → qa → outro → (loop back to intro)
  INSERT INTO live.script_transition_rule (id, tenant_id, from_segment_id, to_segment_id, condition_jsonb, weight, priority, description, created_at) VALUES
  (public.uuidv7(), v_tenant_id, v_seg_intro, v_seg_product, '{"randomFallback":true}'::jsonb, 1, 100, 'intro → product', NOW()),
  (public.uuidv7(), v_tenant_id, v_seg_product, v_seg_cta, '{"randomFallback":true}'::jsonb, 1, 100, 'product → cta', NOW()),
  (public.uuidv7(), v_tenant_id, v_seg_cta, v_seg_qa, '{"viewerCountGt":5}'::jsonb, 2, 50, 'cta → qa if engaged', NOW()),
  (public.uuidv7(), v_tenant_id, v_seg_cta, v_seg_outro, '{"randomFallback":true}'::jsonb, 1, 100, 'cta → outro fallback', NOW()),
  (public.uuidv7(), v_tenant_id, v_seg_qa, v_seg_outro, '{"randomFallback":true}'::jsonb, 1, 100, 'qa → outro', NOW()),
  (public.uuidv7(), v_tenant_id, v_seg_outro, v_seg_intro, '{"randomFallback":true}'::jsonb, 1, 100, 'outro → loop to intro', NOW());

  UPDATE live.ai_stream_script SET start_segment_id = v_seg_intro WHERE id = v_script_id;

  -- 7. B-roll clip library starter entries
  INSERT INTO live.asset_clip_library (id, tenant_id, supplier_id, clip_url, thumbnail_url, tags, use_case, duration_ms, resolution, language, created_at, updated_at) VALUES
  (public.uuidv7(), v_tenant_id, v_supplier_id, 'https://placeholder.csr/clips/intro-tech-1.mp4', 'https://placeholder.csr/clips/intro-tech-1.jpg', ARRAY['intro','electronics','warm'], 'intro', 10000, '1080p', 'en', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, v_supplier_id, 'https://placeholder.csr/clips/phone-closeup-1.mp4', 'https://placeholder.csr/clips/phone-closeup-1.jpg', ARRAY['smartphone','close_up','rotating'], 'close_up', 8000, '1080p', 'en', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, v_supplier_id, 'https://placeholder.csr/clips/factory-tour-1.mp4', 'https://placeholder.csr/clips/factory-tour-1.jpg', ARRAY['factory','assembly','quality'], 'b_roll_factory', 15000, '1080p', 'en', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, v_supplier_id, 'https://placeholder.csr/clips/warehouse-1.mp4', 'https://placeholder.csr/clips/warehouse-1.jpg', ARRAY['warehouse','stock','logistics'], 'b_roll_warehouse', 12000, '1080p', 'en', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, v_supplier_id, 'https://placeholder.csr/clips/testimonial-1.mp4', 'https://placeholder.csr/clips/testimonial-1.jpg', ARRAY['testimonial','customer','success'], 'testimonial', 20000, '1080p', 'en', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, v_supplier_id, 'https://placeholder.csr/clips/outro-thanks-1.mp4', 'https://placeholder.csr/clips/outro-thanks-1.jpg', ARRAY['outro','thanks','wave'], 'outro', 8000, '1080p', 'en', NOW(), NOW())
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'AI livestream seed: 3 personas + 1 avatar + 1 script (5 segments, 6 transitions) + 6 clips';
END $als$;
