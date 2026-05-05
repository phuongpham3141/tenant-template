#!/usr/bin/env bash
set -euo pipefail
# Decrypts SOPS secrets and renders per-VM .env files for a tenant.
# Expects ./tenants/${TENANT_ID}/env.sops.yaml to exist.

TENANT_ID="${1:?Usage: $0 <tenant-id>}"
SECRETS_FILE="tenants/${TENANT_ID}/env.sops.yaml"

[[ -f "$SECRETS_FILE" ]] || { echo "Secrets file not found: $SECRETS_FILE"; exit 1; }
command -v sops >/dev/null || { echo "sops not installed"; exit 1; }
command -v yq >/dev/null   || { echo "yq not installed"; exit 1; }

SECRETS=$(sops --decrypt "$SECRETS_FILE")
get() { echo "$SECRETS" | yq "$1"; }
IDX=$(get '.idx')

# === DATA VM ===
{
  echo "TENANT_ID=${TENANT_ID}"
  echo "POSTGRES_USER=$(get '.postgres.user')"
  echo "POSTGRES_PASSWORD=$(get '.postgres.password')"
  echo "POSTGRES_DB_MEDUSA=medusa"
  echo "POSTGRES_DB_PAYLOAD=payload"
  echo "REDIS_PASSWORD=$(get '.redis.password')"
} > "/tmp/${TENANT_ID}-data.env"

# === STORAGE VM ===
{
  echo "TENANT_ID=${TENANT_ID}"
  echo "TENANT_DOMAIN=${TENANT_ID}.huayuesc.com"
  echo "MINIO_ROOT_USER=$(get '.minio.root_user')"
  echo "MINIO_ROOT_PASSWORD=$(get '.minio.root_password')"
  echo "MEILI_MASTER_KEY=$(get '.meili.master_key')"
} > "/tmp/${TENANT_ID}-storage.env"

# === APP VM ===
{
  echo "TENANT_ID=${TENANT_ID}"
  echo "TENANT_DOMAIN=${TENANT_ID}.huayuesc.com"
  echo "MEDUSA_VERSION=$(get '.medusa.version')"
  echo "PAYLOAD_VERSION=$(get '.payload.version')"
  echo "STOREFRONT_VERSION=$(get '.storefront.version')"
  echo "DATA_HOST=10.${IDX}.0.2"
  echo "STORAGE_HOST=10.${IDX}.0.3"
  echo "POSTGRES_USER=$(get '.postgres.user')"
  echo "POSTGRES_PASSWORD=$(get '.postgres.password')"
  echo "POSTGRES_DB_MEDUSA=medusa"
  echo "POSTGRES_DB_PAYLOAD=payload"
  echo "REDIS_PASSWORD=$(get '.redis.password')"
  echo "MEDUSA_JWT_SECRET=$(get '.medusa.jwt_secret')"
  echo "MEDUSA_COOKIE_SECRET=$(get '.medusa.cookie_secret')"
  echo "PAYLOAD_SECRET=$(get '.payload.secret')"
  echo "S3_ACCESS_KEY=$(get '.minio.access_key')"
  echo "S3_SECRET_KEY=$(get '.minio.secret_key')"
} > "/tmp/${TENANT_ID}-app.env"

# === OBS VM ===
{
  echo "TENANT_ID=${TENANT_ID}"
  echo "TENANT_DOMAIN=${TENANT_ID}.huayuesc.com"
  echo "GRAFANA_ADMIN_USER=$(get '.grafana.admin_user')"
  echo "GRAFANA_ADMIN_PASSWORD=$(get '.grafana.admin_password')"
  echo "GOOGLE_OAUTH_CLIENT_ID=$(get '.grafana.google_client_id')"
  echo "GOOGLE_OAUTH_CLIENT_SECRET=$(get '.grafana.google_client_secret')"
  echo "GRAFANA_ALLOWED_DOMAINS=$(get '.grafana.allowed_domains')"
} > "/tmp/${TENANT_ID}-obs.env"

echo "Rendered .env files in /tmp:"
ls -la /tmp/${TENANT_ID}-*.env
echo ""
echo "Next: scp /tmp/${TENANT_ID}-{role}.env root@10.${IDX}.0.{N}:/opt/tenant-${TENANT_ID}/{role}/.env"
