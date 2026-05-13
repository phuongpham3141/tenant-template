-- Currency master with decimal precision
INSERT INTO admin.currency_master (code, name_en, name_vi, symbol, decimals, country_code) VALUES
('VND','Vietnamese Dong','Đồng Việt Nam','₫',0,'VN'),
('CNY','Chinese Yuan','Nhân dân tệ','¥',2,'CN'),
('USD','US Dollar','Đô la Mỹ','$',2,'US'),
('EUR','Euro','Euro','€',2,'DE'),
('JPY','Japanese Yen','Yên Nhật','¥',0,'JP'),
('KRW','South Korean Won','Won Hàn Quốc','₩',0,'KR'),
('HKD','Hong Kong Dollar','Đô la Hồng Kông','HK$',2,'HK'),
('TWD','New Taiwan Dollar','Đài tệ','NT$',2,'TW'),
('SGD','Singapore Dollar','Đô la Singapore','S$',2,'SG'),
('THB','Thai Baht','Bath Thái','฿',2,'TH'),
('IDR','Indonesian Rupiah','Rupiah Indonesia','Rp',2,'ID'),
('MYR','Malaysian Ringgit','Ringgit Malaysia','RM',2,'MY'),
('PHP','Philippine Peso','Peso Philippines','₱',2,'PH'),
('AUD','Australian Dollar','Đô la Úc','A$',2,'AU'),
('GBP','Pound Sterling','Bảng Anh','£',2,'GB'),
('AED','UAE Dirham','Dirham UAE','د.إ',2,'AE'),
('CAD','Canadian Dollar','Đô la Canada','C$',2,'CA'),
('INR','Indian Rupee','Rupee Ấn Độ','₹',2,'IN')
ON CONFLICT (code) DO UPDATE SET
  name_en = EXCLUDED.name_en, decimals = EXCLUDED.decimals;
