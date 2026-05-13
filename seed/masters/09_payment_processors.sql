-- Payment processor master
INSERT INTO payment.payment_processor_master (code, display_name, supported_currencies, supported_countries, mode, three_ds_required, is_active) VALUES
('stripe','Stripe',ARRAY['USD','EUR','GBP','CAD','AUD','SGD','HKD','JPY'],ARRAY['US','GB','DE','FR','NL','SG','HK','JP','AU','CA'],'card',TRUE,TRUE),
('vnpay','VNPay',ARRAY['VND'],ARRAY['VN'],'bank_redirect',TRUE,TRUE),
('momo','MoMo',ARRAY['VND'],ARRAY['VN'],'wallet',FALSE,TRUE),
('zalopay','ZaloPay',ARRAY['VND'],ARRAY['VN'],'wallet',FALSE,TRUE),
('alipay','Alipay',ARRAY['CNY','HKD','USD'],ARRAY['CN','HK','TW'],'wallet',FALSE,TRUE),
('wechatpay','WeChat Pay',ARRAY['CNY','HKD'],ARRAY['CN','HK'],'wallet',FALSE,TRUE),
('internal_escrow','Internal Escrow Settlement',ARRAY['USD','VND','CNY','EUR'],ARRAY['*'],'escrow',FALSE,TRUE)
ON CONFLICT (code) DO UPDATE SET is_active = EXCLUDED.is_active;
