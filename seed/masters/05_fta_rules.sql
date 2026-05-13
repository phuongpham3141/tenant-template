-- FTA preferential rates between key trading partners
-- Agreements: ACFTA (China-ASEAN), RCEP, CPTPP, VKFTA (Vietnam-Korea), EVFTA (Vietnam-EU)

INSERT INTO tax.fta_rule (id, agreement_code, origin_country, dest_country, hs_code, preferential_rate, requires_certificate_of_origin, effective_from, effective_to, notes) VALUES
-- ACFTA: China → Vietnam
(public.uuidv7(),'ACFTA','CN','VN','8517.12',0,TRUE,'2023-01-01',NULL,'Form E required'),
(public.uuidv7(),'ACFTA','CN','VN','6109.10',0,TRUE,'2023-01-01',NULL,'Form E required'),
(public.uuidv7(),'ACFTA','CN','VN','9503.00',0,TRUE,'2023-01-01',NULL,'Form E required'),
(public.uuidv7(),'ACFTA','CN','VN','9403.30',0,TRUE,'2023-01-01',NULL,'Form E required'),
(public.uuidv7(),'ACFTA','CN','VN','8471.30',0,TRUE,'2023-01-01',NULL,'Form E required'),
-- ACFTA: Vietnam → China
(public.uuidv7(),'ACFTA','VN','CN','0901.21',0,TRUE,'2023-01-01',NULL,'Form E required'),
(public.uuidv7(),'ACFTA','VN','CN','1006.30',0,TRUE,'2023-01-01',NULL,'Form E required'),
(public.uuidv7(),'ACFTA','VN','CN','1511.10',0,TRUE,'2023-01-01',NULL,'Form E required'),
-- RCEP: multilateral, lower-than-ACFTA for some lines
(public.uuidv7(),'RCEP','CN','VN','8528.72',2,TRUE,'2024-01-01','2029-12-31','RCEP staged reduction'),
(public.uuidv7(),'RCEP','VN','CN','6203.42',4,TRUE,'2024-01-01',NULL,'Form RCEP required'),
-- CPTPP: VN → Japan
(public.uuidv7(),'CPTPP','VN','JP','6109.10',0,TRUE,'2024-01-01',NULL,'Self-certification'),
(public.uuidv7(),'CPTPP','VN','JP','6403.99',0,TRUE,'2024-01-01',NULL,'Self-certification'),
-- VKFTA: VN ↔ Korea
(public.uuidv7(),'VKFTA','VN','KR','6109.10',0,TRUE,'2023-01-01',NULL,'Form AK'),
(public.uuidv7(),'VKFTA','KR','VN','8542.31',0,TRUE,'2023-01-01',NULL,'Form AK'),
-- EVFTA: VN ↔ EU (focus on key DE imports)
(public.uuidv7(),'EVFTA','VN','DE','0901.21',0,TRUE,'2024-01-01',NULL,'REX system'),
(public.uuidv7(),'EVFTA','VN','DE','6403.99',0,TRUE,'2024-01-01',NULL,'REX system'),
(public.uuidv7(),'EVFTA','DE','VN','8418.21',2,TRUE,'2024-01-01',NULL,'Origin declaration')
ON CONFLICT (agreement_code, origin_country, dest_country, hs_code, effective_from) DO UPDATE SET preferential_rate = EXCLUDED.preferential_rate;
