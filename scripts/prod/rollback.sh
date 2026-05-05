#!/usr/bin/env bash
set -euo pipefail
TENANT_ID="${1:?Usage: $0 <tenant-id> <tenant-idx> <medusa-ver> <payload-ver> <storefront-ver>}"
TENANT_IDX="${2:?}"
MEDUSA_VER="${3:?}"
PAYLOAD_VER="${4:?}"
STOREFRONT_VER="${5:?}"
APP_HOST="10.${TENANT_IDX}.0.1"

echo "Rolling back tenant=$TENANT_ID..."
ssh "root@${APP_HOST}" "cd /opt/tenant-${TENANT_ID}/app && sed -i 's/^MEDUSA_VERSION=.*/MEDUSA_VERSION=${MEDUSA_VER}/' .env && sed -i 's/^PAYLOAD_VERSION=.*/PAYLOAD_VERSION=${PAYLOAD_VER}/' .env && sed -i 's/^STOREFRONT_VERSION=.*/STOREFRONT_VERSION=${STOREFRONT_VER}/' .env && docker compose pull && docker compose up -d"
echo "Rollback complete."
