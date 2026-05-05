#!/usr/bin/env bash
set -euo pipefail
# Run Medusa + Payload migrations against tenant prod.

TENANT_ID="${1:?Usage: $0 <tenant-id> <tenant-idx>}"
TENANT_IDX="${2:?Usage: $0 <tenant-id> <tenant-idx>}"
APP_HOST="10.${TENANT_IDX}.0.1"
DATA_HOST="10.${TENANT_IDX}.0.2"
TS=$(date +%Y%m%d-%H%M%S)

echo "=== Migrate tenant=$TENANT_ID idx=$TENANT_IDX ==="

echo "[1/3] Backup database (medusa)..."
ssh "root@${DATA_HOST}" "docker compose -f /opt/tenant-${TENANT_ID}/data/docker-compose.yml exec -T postgres pg_dump -U postgres -d medusa | gzip > /srv/postgres/backups/medusa-pre-migrate-${TS}.sql.gz"

echo "[2/3] Migrate Medusa..."
ssh "root@${APP_HOST}" "docker compose -f /opt/tenant-${TENANT_ID}/app/docker-compose.yml exec -T medusa-server npx medusa db:migrate"

echo "[3/3] Migrate Payload..."
ssh "root@${APP_HOST}" "docker compose -f /opt/tenant-${TENANT_ID}/app/docker-compose.yml exec -T payload-cms npx payload migrate"

echo "=== Migrations complete ==="
