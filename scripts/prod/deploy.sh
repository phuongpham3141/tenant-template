#!/usr/bin/env bash
set -euo pipefail
# Deploys a tenant to its 4 VMs.

TENANT_ID="${1:?Usage: $0 <tenant-id> <tenant-idx>}"
TENANT_IDX="${2:?Usage: $0 <tenant-id> <tenant-idx>}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "=== Deploy tenant=$TENANT_ID idx=$TENANT_IDX ==="

# 1) Render envs from SOPS
"$SCRIPT_DIR/render-env.sh" "$TENANT_ID"

# 2) Push compose files + envs to each VM, then bring up
for spec in data:2 storage:3 app:1 obs:4; do
    role="${spec%:*}"
    n="${spec##*:}"
    host="10.${TENANT_IDX}.0.${n}"
    echo "[$role] -> $host"
    ssh "root@$host" "mkdir -p /opt/tenant-${TENANT_ID}/${role}"
    scp "/tmp/${TENANT_ID}-${role}.env" "root@$host:/opt/tenant-${TENANT_ID}/${role}/.env"
    rsync -az --delete "$ROOT_DIR/compose-prod/${role}/" "root@$host:/opt/tenant-${TENANT_ID}/${role}/"
done

# 3) Bring up data first, then storage, then app, then obs
for spec in data:2 storage:3 app:1 obs:4; do
    role="${spec%:*}"
    n="${spec##*:}"
    host="10.${TENANT_IDX}.0.${n}"
    ssh "root@$host" "cd /opt/tenant-${TENANT_ID}/${role} && docker compose pull && docker compose up -d"
done

echo "=== Deploy complete. Run scripts/prod/migrate.sh next if schema changes ==="
