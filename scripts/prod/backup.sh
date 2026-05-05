#!/usr/bin/env bash
set -euo pipefail
TENANT_ID="${1:?Usage: $0 <tenant-id> <tenant-idx>}"
TENANT_IDX="${2:?Usage: $0 <tenant-id> <tenant-idx>}"
DATA_HOST="10.${TENANT_IDX}.0.2"
TS=$(date +%Y%m%d-%H%M%S)

for db in medusa payload; do
    echo "Backing up $db..."
    ssh "root@${DATA_HOST}" "docker compose -f /opt/tenant-${TENANT_ID}/data/docker-compose.yml exec -T postgres pg_dump -U postgres -d $db | gzip > /srv/postgres/backups/${db}-${TS}.sql.gz"
done
echo "Done. Files on ${DATA_HOST}:/srv/postgres/backups/"
