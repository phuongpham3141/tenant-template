-- AI prompt templates seed (also editable via Payload AIPromptTemplate collection)

DO $prompts$
DECLARE
  v_tenant_id UUID;
BEGIN
  SELECT id INTO v_tenant_id FROM admin.tenant WHERE slug = 'csr' LIMIT 1;
  IF v_tenant_id IS NULL THEN RETURN; END IF;

  INSERT INTO ai.prompt_template (id, tenant_id, code, name, feature_code, model_id, fallback_model_id, system_prompt, user_prompt_template, parameters, status, created_at, updated_at) VALUES
  (public.uuidv7(), v_tenant_id, 'product_translation_v1', 'Product Translation',
    'product_translation', 'claude-sonnet-4-6', 'gpt-5-mini',
    'You are a professional product copywriter specializing in cross-border e-commerce CN<->VN<->EN. Maintain brand voice; do not invent specs.',
    'Translate the following product title and description to {{target_locale}}. Preserve technical terms. Title: {{title}}\nDescription: {{description}}\n\nReturn JSON: {"title": "", "description": ""}',
    '{"temperature":0.2,"max_tokens":1024,"cache_ttl_seconds":86400}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'product_seo_meta_v1', 'SEO Meta Generation',
    'seo_meta', 'claude-haiku-4-5', 'gpt-5-mini',
    'You generate SEO-optimized meta titles and descriptions for B2B marketplace products. Be specific, include key attributes, and stay under length limits.',
    'Generate SEO meta for {{locale}} locale:\nTitle: {{title}}\nCategory: {{category}}\nKey attributes: {{attributes}}\n\nReturn JSON: {"meta_title": " <=60 chars", "meta_description": " <=160 chars", "keywords": ["k1","k2"]}',
    '{"temperature":0.4,"max_tokens":512,"cache_ttl_seconds":604800}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'image_alt_v1', 'Image Alt Text',
    'image_alt', 'claude-haiku-4-5', 'gpt-5-mini',
    'You write accessible, descriptive alt text for product imagery. Short and factual.',
    'Generate alt text in {{locale}} for the attached image of product: {{product_title}}. Max 120 chars.',
    '{"temperature":0.3,"max_tokens":200,"cache_ttl_seconds":2592000}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'rfq_matching_v1', 'RFQ Supplier Matching',
    'rfq_matching', 'claude-sonnet-4-6', 'gpt-5',
    'You match B2B RFQs to suppliers based on category, capability, capacity, and reputation. Return ranked supplier IDs.',
    'RFQ: {{rfq_summary}}\nCandidate suppliers: {{candidates}}\nReturn JSON array of {supplier_id, match_score 0-1, reasoning}.',
    '{"temperature":0.1,"max_tokens":1024,"cache_ttl_seconds":3600}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'chat_translate_v1', 'Chat Real-time Translate',
    'chat_translate', 'claude-haiku-4-5', 'gpt-5-mini',
    'You translate B2B negotiation chat messages between CN/VN/EN preserving tone and intent. Output translation only.',
    'Translate from {{source_locale}} to {{target_locale}}: {{message}}',
    '{"temperature":0.2,"max_tokens":600,"cache_ttl_seconds":0}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'chat_summary_v1', 'Conversation Summary',
    'chat_summary', 'claude-sonnet-4-6', 'gpt-5',
    'You summarize B2B chat conversations into key facts: parties, products, prices, terms, next steps.',
    'Summarize this conversation:\n{{messages}}',
    '{"temperature":0.3,"max_tokens":1024}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'visual_search_v1', 'Visual Product Search',
    'visual_search', 'gpt-5', 'claude-sonnet-4-6',
    'You analyze a product image and extract searchable attributes: category, color, material, style.',
    'Analyze the attached product image and return JSON {category, colors[], material, style, descriptors[]}.',
    '{"temperature":0.1,"max_tokens":512,"cache_ttl_seconds":86400}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'live_highlight_v1', 'Live Commerce Highlight',
    'live_highlight', 'claude-haiku-4-5', 'gpt-5-mini',
    'You select highlight moments from livestream transcripts: product showcases, peak engagement, key sales moments.',
    'Transcript window: {{transcript}}\nReturn JSON array of {start_ms, end_ms, reason, product_id?}.',
    '{"temperature":0.2,"max_tokens":1024}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'spam_fraud_v1', 'Spam/Fraud Detection',
    'spam_fraud', 'claude-haiku-4-5', NULL,
    'You score user-submitted content for spam, fraud, scam patterns. Be strict on phishing and counterfeit listings.',
    'Content: {{content}}\nContext: {{context}}\nReturn JSON {risk_score 0-1, categories[], reasoning}.',
    '{"temperature":0.0,"max_tokens":512}'::jsonb, 'published', NOW(), NOW()),
  (public.uuidv7(), v_tenant_id, 'compliance_check_v1', 'Compliance Check',
    'compliance', 'claude-sonnet-4-6', 'gpt-5',
    'You verify product listings against export/import compliance rules: sanctions, restricted goods, IP infringement, HS code accuracy.',
    'Product: {{product_json}}\nDestination: {{destination_country}}\nReturn JSON {pass_fail, flags[], recommended_hs}.',
    '{"temperature":0.1,"max_tokens":1024}'::jsonb, 'published', NOW(), NOW())
  ON CONFLICT (tenant_id, code) DO UPDATE SET system_prompt = EXCLUDED.system_prompt, user_prompt_template = EXCLUDED.user_prompt_template;
END $prompts$;
