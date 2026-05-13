# Cybersilkroads — Database Migrations

PostgreSQL 16 + ClickHouse schema migrations for Cybersilkroads marketplace.

## Stack

- **PostgreSQL 16** — primary OLTP (~440 entities)
- **ClickHouse** — high-volume append-only analytics (~30 entities)
- **Payload v3** — CMS schema (managed by Payload, ~35 entities)

## Migration files

Run files in order (00 → 38). Each file is idempotent (safe to re-run).

| File | Purpose | Status |
|---|---|---|
| `00_extensions.sql` | PG extensions + helper functions | ✅ R14 M1 |
| `01_schemas.sql` | 38 schemas + roles + privileges | ✅ R14 M1 |
| `02_tenant_foundation.sql` | Domain 38: Multi-tenant config (11 tables) | ✅ R14 M1 |
| `03_identity.sql` | Domain 1: user, supplier, dealer, KYC | 🔄 R14 M2 |
| `04_auth_security.sql` | Domain 30: sessions, MFA, passkey | 🔄 R14 M2 |
| `05_rbac.sql` | Domain 31: permissions, roles | 🔄 R14 M2 |
| `06_gdpr_privacy.sql` | Domain 32: consent, DSR, retention | 🔄 R14 M2 |
| `07_catalog.sql` | Domain 2 + 3 + 14: product/taxonomy/master SKU | 🔄 R14 M2 |
| `08_cart_checkout.sql` | Domain 4 | 🔄 R14 M3 |
| `09_order_rfq.sql` | Domain 5 + B2B approval | 🔄 R14 M3 |
| `10_payment_escrow.sql` | Domain 6 + 35 | 🔄 R14 M3 |
| `11_fulfillment.sql` | Domain 7 + 17 + 18 | 🔄 R14 M3 |
| `12_dispute_compliance.sql` | Domain 8 | 🔄 R14 M3 |
| `13_brand_protection.sql` | Domain 15 | 🔄 R14 M4 |
| `14_fraud_ml.sql` | Domain 22 ML | 🔄 R14 M4 |
| `15_search_infra.sql` | Domain 33 | 🔄 R14 M4 |
| `16_tax_engine.sql` | Domain 34 | 🔄 R14 M4 |
| `17_notification_bus.sql` | Domain 36 | 🔄 R14 M4 |
| `18_experimentation.sql` | Domain 37 | 🔄 R14 M4 |
| `19_b2c_features.sql` | Domain 13 | 🔄 R14 M4 |
| `20_communication.sql` | Domain 11 (15 entities + negotiation) | 🔄 R14 M4 |
| `21_customer_service.sql` | Domain 19 | 🔄 R14 M4 |
| `22_subscription.sql` | Domain 20 | 🔄 R14 M4 |
| `23_supplier_site_builder.sql` | Domain 12 (18 entities) | 🔄 R14 M5 |
| `24_advertising.sql` | Domain 16 (17 entities) | 🔄 R14 M5 |
| `25_email_marketing.sql` | Email automation (14 entities) | 🔄 R14 M5 |
| `26_account_health.sql` | Domain 26 | 🔄 R14 M5 |
| `27_csr_sustainability.sql` | Domain 25 | 🔄 R14 M5 |
| `28_media_layer.sql` | Domain 27 (28 entities) | 🔄 R14 M5 |
| `29_live_commerce.sql` | Domain 28 (48 entities) | 🔄 R14 M5 |
| `30_ai_domain.sql` | Domain 22 AI (15 entities) | 🔄 R14 M5 |
| `31_personalization.sql` | Domain 23 | 🔄 R14 M5 |
| `32_public_api.sql` | Domain 21 | 🔄 R14 M5 |
| `33_audit_event_sourcing.sql` | Domain 29 (partitioned) | 🔄 R14 M5 |
| `34_vn_sourcing.sql` | Domain 39 (34 entities) | 🔄 R14 M5 |
| `35_rls_policies.sql` | RLS policies for all tenant-scoped tables | 🔄 R14 M6 |
| `36_indexes_advanced.sql` | HNSW pgvector + advanced GIN | 🔄 R14 M6 |
| `37_triggers_audit.sql` | Audit triggers attached to all tables | 🔄 R14 M6 |
| `38_pg_partman_setup.sql` | Partition setup for high-volume tables | 🔄 R14 M6 |

## ClickHouse schemas

| File | Purpose |
|---|---|
| `clickhouse/schema/01_databases.sql` | Databases + replication |
| `clickhouse/schema/02_audit_event.sql` | Audit event tables + MV |
| `clickhouse/schema/03_high_volume_tables.sql` | 29 CH tables |
| `clickhouse/schema/04_materialized_views.sql` | Pre-aggregated views |
| `clickhouse/schema/05_dictionaries.sql` | External dictionaries from PG |

## How to run

```bash
# On VM medusa-dev
ssh medusa-dev

# Connect to PG container
docker exec -it dev-postgres psql -U postgres -d medusa

# Run all migrations
\i /workspace/medusa/migrations/00_extensions.sql
\i /workspace/medusa/migrations/01_schemas.sql
\i /workspace/medusa/migrations/02_tenant_foundation.sql
# ... etc
```

Or apply all at once:

```bash
for f in /workspace/medusa/migrations/*.sql; do
  echo "Applying $f"
  docker exec -i dev-postgres psql -U postgres -d medusa < "$f"
done
```

## Conventions

All entities follow standard template:

- `id` UUID v7 PK
- `tenant_id` VARCHAR(20) — multi-tenant isolation
- `created_at`, `updated_at`, `deleted_at` timestamps
- `version` INT — optimistic locking
- `metadata` JSONB — free-form extension

See `13-master-consolidation.html` for full schema reference.

## Helper functions (from `00_extensions.sql`)

- `public.uuidv7()` — Generate time-ordered UUID
- `public.trigger_set_timestamp()` — Auto-update `updated_at` + version
- `public.trigger_emit_audit_event()` — Emit to audit log on changes
- `public.soft_delete()` — INSTEAD OF DELETE → mark `deleted_at`
- `public.has_permission(user_id, key)` — RBAC check
- `public.current_tenant_id()` — Read `app.current_tenant` session var
- `public.current_user_id()` — Read `app.current_user_id` session var
- `public.i18n_get(jsonb, locale)` — Read i18n field with fallback
- `public.money_format(amount_minor, currency, units)` — Format money

## Session context (set by app middleware on every request)

```sql
SET LOCAL app.current_tenant = 'csr';
SET LOCAL app.current_user_id = '<uuid>';
SET LOCAL app.current_actor_type = 'user';  -- or 'admin', 'system', 'ai'
```

## Migration log

Check applied migrations:

```sql
SELECT migration_file, applied_at, status
FROM admin.migration_log
ORDER BY applied_at;
```
