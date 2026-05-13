-- Subscription plan tiers
INSERT INTO admin.subscription_plan (id, code, name, monthly_usd_minor, features, is_active, created_at, updated_at) VALUES
(public.uuidv7(), 'starter', 'Starter', 49900,
  '{"max_products":1000,"max_users":5,"max_storage_gb":10,"max_orders_month":500,"ai_credits_month":1000,"livestream_minutes_month":120,"sms_credits_month":100,"email_credits_month":10000,"support_sla_hours":48,"site_builder":false,"advanced_analytics":false,"custom_domain":false}'::jsonb,
  TRUE, NOW(), NOW()),
(public.uuidv7(), 'growth', 'Growth', 199900,
  '{"max_products":10000,"max_users":25,"max_storage_gb":100,"max_orders_month":5000,"ai_credits_month":20000,"livestream_minutes_month":1200,"sms_credits_month":2000,"email_credits_month":100000,"support_sla_hours":24,"site_builder":true,"advanced_analytics":true,"custom_domain":true,"api_calls_month":1000000}'::jsonb,
  TRUE, NOW(), NOW()),
(public.uuidv7(), 'enterprise', 'Enterprise', 999900,
  '{"max_products":-1,"max_users":-1,"max_storage_gb":-1,"max_orders_month":-1,"ai_credits_month":-1,"livestream_minutes_month":-1,"sms_credits_month":-1,"email_credits_month":-1,"support_sla_hours":2,"site_builder":true,"advanced_analytics":true,"custom_domain":true,"api_calls_month":-1,"dedicated_csr":true,"sla_99_99":true,"single_tenant_db":true,"sso_saml":true}'::jsonb,
  TRUE, NOW(), NOW())
ON CONFLICT (code) DO UPDATE SET monthly_usd_minor = EXCLUDED.monthly_usd_minor, features = EXCLUDED.features;
