-- Migration 47: catalog → public product sync
-- Sprint 3 Phase 3 P3.3
-- Per Rule 6: schema change qua migration file
-- Created: 2026-05-15
--
-- Background:
--   Sprint 2 Day 5 P1.4-F2 audit phát hiện 2-tier architecture:
--   - catalog.product (canonical, multi-locale, supplier-rich) = 25 cybersilkroads products
--   - public.product (Medusa core, commerce-flow) = 4 default products
--
--   Sprint 3 P3.3 builds sync workflow để Medusa Admin + Storefront
--   /store/products endpoint thấy được cybersilkroads products.
--
-- Pattern:
--   - catalog.sync_product_to_public(uuid) — single product
--   - catalog.sync_all_products_to_public() — batch (status='published')
--   - ON CONFLICT (handle) DO UPDATE — idempotent re-run

BEGIN;

-- ============================================================
-- Single product sync function
-- ============================================================
CREATE OR REPLACE FUNCTION catalog.sync_product_to_public(p_catalog_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_catalog_row catalog.product%ROWTYPE;
  v_public_id TEXT;
  v_title TEXT;
  v_description TEXT;
BEGIN
  -- Get catalog row
  SELECT * INTO v_catalog_row
  FROM catalog.product
  WHERE id = p_catalog_id;

  IF NOT FOUND THEN
    RAISE WARNING 'catalog.product % not found', p_catalog_id;
    RETURN NULL;
  END IF;

  -- Extract Vietnamese title (default locale). Fallback en, then any first value.
  v_title := COALESCE(
    v_catalog_row.title_i18n->>'vi',
    v_catalog_row.title_i18n->>'en',
    (SELECT value::text FROM jsonb_each_text(v_catalog_row.title_i18n) LIMIT 1),
    'Untitled product'
  );

  v_description := COALESCE(
    v_catalog_row.description_i18n->>'vi',
    v_catalog_row.description_i18n->>'en',
    NULL
  );

  -- public.product.id format: 'prod_' + ULID-style ID
  -- Reuse catalog UUID with prefix
  v_public_id := 'prod_' || replace(v_catalog_row.id::text, '-', '');

  -- Upsert into public.product
  INSERT INTO public.product (
    id, handle, title, subtitle, description, status,
    is_giftcard, discountable, created_at, updated_at, metadata
  ) VALUES (
    v_public_id,
    v_catalog_row.handle,
    v_title,
    NULL,
    v_description,
    v_catalog_row.status,
    FALSE,
    TRUE,
    v_catalog_row.created_at,
    NOW(),
    jsonb_build_object(
      'catalog_id', v_catalog_row.id::text,
      'supplier_id', v_catalog_row.supplier_id::text,
      'tenant_id', v_catalog_row.tenant_id,
      'synced_at', NOW()::text,
      'sync_version', 1,
      'sync_source', 'catalog.product'
    )
  )
  ON CONFLICT (id) DO UPDATE SET
    handle = EXCLUDED.handle,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    status = EXCLUDED.status,
    updated_at = NOW(),
    metadata = jsonb_set(
      jsonb_set(
        COALESCE(public.product.metadata, '{}'::jsonb),
        '{synced_at}',
        to_jsonb(NOW()::text)
      ),
      '{sync_version}',
      to_jsonb(COALESCE((public.product.metadata->>'sync_version')::int, 0) + 1)
    )
  RETURNING id INTO v_public_id;

  RETURN v_public_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Batch sync function — all published products
-- ============================================================
CREATE OR REPLACE FUNCTION catalog.sync_all_products_to_public()
RETURNS TABLE(attempted INT, synced INT, failed INT) AS $$
DECLARE
  v_attempted INT := 0;
  v_synced INT := 0;
  v_failed INT := 0;
  v_product RECORD;
BEGIN
  FOR v_product IN
    SELECT id FROM catalog.product
    WHERE status = 'published' AND deleted_at IS NULL
  LOOP
    v_attempted := v_attempted + 1;
    BEGIN
      PERFORM catalog.sync_product_to_public(v_product.id);
      v_synced := v_synced + 1;
    EXCEPTION WHEN OTHERS THEN
      v_failed := v_failed + 1;
      RAISE WARNING 'Failed sync %: %', v_product.id, SQLERRM;
    END;
  END LOOP;

  RETURN QUERY SELECT v_attempted, v_synced, v_failed;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Migration log
-- ============================================================
INSERT INTO admin.migration_log (migration_file, status, applied_at, notes)
VALUES ('47_catalog_to_public_sync.sql', 'success', NOW(),
        'Sprint 3 Phase 3 P3.3. Sync workflow: catalog.product -> public.product. Functions: sync_product_to_public(uuid) + sync_all_products_to_public(). Sprint 4 task: Medusa subscriber wire-up after catalog UPDATE.');

COMMIT;
