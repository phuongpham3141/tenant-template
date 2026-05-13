-- Locale master
INSERT INTO admin.locale_master (code, name_native, name_english, rtl, fallback_locale, is_supported, sort_order) VALUES
('vi','Tiếng Việt','Vietnamese',FALSE,'en',TRUE,10),
('en','English','English',FALSE,NULL,TRUE,20),
('cn','中文','Chinese (Simplified)',FALSE,'en',TRUE,30),
('zh-TW','繁體中文','Chinese (Traditional)',FALSE,'cn',FALSE,40),
('ja','日本語','Japanese',FALSE,'en',FALSE,50),
('ko','한국어','Korean',FALSE,'en',FALSE,60),
('th','ภาษาไทย','Thai',FALSE,'en',FALSE,70),
('id','Bahasa Indonesia','Indonesian',FALSE,'en',FALSE,80)
ON CONFLICT (code) DO UPDATE SET is_supported = EXCLUDED.is_supported;
