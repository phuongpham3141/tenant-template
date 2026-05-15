-- Data integrity sanity checks across domains.
-- Returns rows = problems found. Empty result = healthy.

\echo '============================================================'
\echo 'CHECK 05 — Cross-domain data consistency'
\echo 'Empty result = healthy. Any row returned = anomaly to investigate.'
\echo '============================================================'

-- 5.1 Suppliers with no tenant
\echo '--- 5.1: Suppliers with NULL or non-existent tenant_id ---'
SELECT s.id, s.slug, s.tenant_id
FROM identity.supplier s
LEFT JOIN admin.tenant t ON t.id = s.tenant_id
WHERE s.deleted_at IS NULL
  AND (s.tenant_id IS NULL OR t.id IS NULL);

-- 5.2 Products belonging to non-existent supplier
\echo '--- 5.2: Products referencing missing supplier ---'
SELECT p.id, p.sku, p.supplier_id
FROM catalog.product p
LEFT JOIN identity.supplier s ON s.id = p.supplier_id
WHERE p.deleted_at IS NULL AND (s.id IS NULL OR s.deleted_at IS NOT NULL)
LIMIT 100;

-- 5.3 Orders referencing missing customer or supplier
\echo '--- 5.3: Orders with missing buyer/supplier ---'
SELECT o.id, o.customer_id, o.supplier_id
FROM ord."order" o
LEFT JOIN identity."user" u ON u.id = o.customer_id
LEFT JOIN identity.supplier s ON s.id = o.supplier_id
WHERE o.deleted_at IS NULL
  AND (u.id IS NULL OR s.id IS NULL)
LIMIT 100;

-- 5.4 Escrow with mismatched milestones (sum of milestone amounts != total)
\echo '--- 5.4: Escrows where sum of milestones != total_amount_minor ---'
SELECT e.id, e.total_amount_minor::bigint AS escrow_total,
       COALESCE(SUM(m.amount_minor)::bigint, 0) AS milestones_sum,
       (e.total_amount_minor::bigint - COALESCE(SUM(m.amount_minor)::bigint, 0)) AS diff
FROM payment.escrow e
LEFT JOIN payment.escrow_milestone m ON m.escrow_id = e.id
GROUP BY e.id, e.total_amount_minor
HAVING e.total_amount_minor::bigint <> COALESCE(SUM(m.amount_minor)::bigint, 0)
LIMIT 50;

-- 5.5 KYC documents not linked to any supplier
\echo '--- 5.5: Orphan KYC documents ---'
SELECT k.id, k.supplier_id, k.document_type
FROM identity.kyc_document k
LEFT JOIN identity.supplier s ON s.id = k.supplier_id
WHERE s.id IS NULL
LIMIT 100;

-- 5.6 Role assignments to non-existent users or roles
\echo '--- 5.6: User role assignments with missing user or role ---'
SELECT ra.id, ra.user_id, ra.role_id
FROM rbac.user_role_assignment ra
LEFT JOIN identity."user" u ON u.id = ra.user_id
LEFT JOIN rbac.role r ON r.id = ra.role_id
WHERE u.id IS NULL OR r.id IS NULL
LIMIT 100;

-- 5.7 Consent records with invalid scope (typo or unknown enum)
\echo '--- 5.7: Consent records with unrecognized scope ---'
SELECT c.id, c.user_id, c.scope
FROM gdpr.consent_record c
WHERE c.scope NOT IN ('marketing_email','marketing_sms','marketing_whatsapp','personalization','analytics','third_party_share','cookies_functional','cookies_analytics','cookies_marketing')
LIMIT 100;

-- 5.8 AI personas without any voice profile
\echo '--- 5.8: AI personas active without voice profile ---'
SELECT p.id, p.slug, p.status
FROM live.ai_persona p
LEFT JOIN live.voice_profile v ON v.persona_id = p.id
WHERE p.deleted_at IS NULL AND p.status = 'active' AND v.id IS NULL
LIMIT 50;

-- 5.9 Stream audio tracks for non-existent stream
\echo '--- 5.9: Stream audio tracks orphan ---'
SELECT sat.id, sat.stream_id, sat.locale
FROM live.stream_audio_track sat
LEFT JOIN live.livestream l ON l.id = sat.stream_id
WHERE l.id IS NULL
LIMIT 50;

-- 5.10 Payment transactions with currency mismatching processor's supported currencies
\echo '--- 5.10: Payments where currency unsupported by processor ---'
SELECT pt.id, pt.processor, pt.currency
FROM payment.payment_transaction pt
JOIN payment.payment_processor_master ppm ON ppm.code = pt.processor::text
WHERE NOT (pt.currency::text = ANY(ppm.supported_currencies))
LIMIT 100;

-- 5.11 i18n JSONB fields that are NOT objects (corrupt shape)
\echo '--- 5.11: Tables with malformed i18n JSONB ---'
SELECT 'identity.supplier' AS table_, id, jsonb_typeof(display_name_i18n) AS type
FROM identity.supplier
WHERE display_name_i18n IS NOT NULL AND jsonb_typeof(display_name_i18n) <> 'object'
LIMIT 20
UNION ALL
SELECT 'catalog.product', id, jsonb_typeof(title_i18n)
FROM catalog.product
WHERE title_i18n IS NOT NULL AND jsonb_typeof(title_i18n) <> 'object'
LIMIT 20
UNION ALL
SELECT 'catalog.category', id, jsonb_typeof(name_i18n)
FROM catalog.category
WHERE name_i18n IS NOT NULL AND jsonb_typeof(name_i18n) <> 'object'
LIMIT 20;

-- 5.12 Money amounts negative (should always be ≥0 unless explicit refund column)
\echo '--- 5.12: Negative money values in critical tables ---'
SELECT 'payment.escrow' AS table_, id, total_amount_minor
FROM payment.escrow WHERE total_amount_minor::bigint < 0 LIMIT 20
UNION ALL
SELECT 'payment.payment_transaction', id, amount_minor
FROM payment.payment_transaction WHERE amount_minor::bigint < 0 LIMIT 20
UNION ALL
SELECT 'ord."order"', id, total_minor
FROM ord."order" WHERE total_minor::bigint < 0 LIMIT 20;
