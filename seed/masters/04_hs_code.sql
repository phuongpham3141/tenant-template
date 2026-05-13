-- HS Code master (subset of common B2B trade codes)
INSERT INTO tax.hs_code_master (code, description_en, description_vi, description_cn, chapter, section, mfn_rate, notes) VALUES
-- Electronics (Chapter 85)
('8517.12','Telephones for cellular networks','Điện thoại di động','移动电话','85','XVI',0,'WTO ITA zero-rated'),
('8528.72','Television receivers','Tivi','电视机','85','XVI',5,''),
('8517.62','Communication apparatus for transmission','Thiết bị truyền thông','通信设备','85','XVI',0,''),
('8504.40','Static converters (power supplies)','Bộ đổi nguồn','电源','85','XVI',2.5,''),
('8542.31','Electronic integrated circuits (processors)','Vi mạch tích hợp','集成电路','85','XVI',0,'WTO ITA'),
-- Textiles (Chapters 50-63)
('6109.10','T-shirts of cotton','Áo phông cotton','棉T恤','61','XI',16,'Subject to MFA'),
('6203.42','Men trousers of cotton','Quần dài nam cotton','男裤棉','62','XI',16,''),
('6204.62','Women trousers of cotton','Quần dài nữ cotton','女裤棉','62','XI',16,''),
('5208.39','Cotton fabric printed','Vải cotton in','棉布印花','52','XI',8,''),
-- Footwear (Chapter 64)
('6403.99','Footwear with leather upper','Giày da','皮鞋','64','XII',8,''),
('6404.19','Footwear with textile upper','Giày vải','布鞋','64','XII',8,''),
-- Machinery (Chapter 84)
('8429.51','Wheel loaders','Máy xúc lật','装载机','84','XVI',2,''),
('8471.30','Portable digital computers','Máy tính xách tay','便携电脑','84','XVI',0,'WTO ITA'),
('8418.21','Refrigerators (household)','Tủ lạnh gia dụng','家用冰箱','84','XVI',5,''),
-- Furniture (Chapter 94)
('9403.30','Wooden office furniture','Đồ gỗ văn phòng','木制办公家具','94','XX',5,''),
('9403.60','Wooden furniture (other)','Đồ gỗ khác','其他木家具','94','XX',5,''),
('9404.21','Mattresses, cellular rubber','Nệm cao su','橡胶床垫','94','XX',8,''),
-- Toys & Games (Chapter 95)
('9503.00','Toys & games','Đồ chơi','玩具','95','XX',0,''),
-- Plastics (Chapter 39)
('3923.30','Plastic bottles','Chai nhựa','塑料瓶','39','VII',6,''),
('3926.90','Plastic articles (other)','Sản phẩm nhựa khác','其他塑料制品','39','VII',6,''),
-- Foodstuffs (Chapters 16-22)
('1602.49','Prepared pork','Thịt heo chế biến','加工猪肉','16','IV',20,''),
('2009.89','Fruit juices (other)','Nước ép trái cây','果汁','20','IV',30,''),
-- Agricultural (Chapters 01-15)
('0901.21','Coffee, roasted, not decaffeinated','Cà phê rang','烘焙咖啡','09','II',15,''),
('1006.30','Semi-milled or wholly milled rice','Gạo xay xát','大米','10','II',5,''),
('1511.10','Crude palm oil','Dầu cọ thô','棕榈油','15','III',5,'')
ON CONFLICT (code) DO UPDATE SET description_en = EXCLUDED.description_en, mfn_rate = EXCLUDED.mfn_rate;
