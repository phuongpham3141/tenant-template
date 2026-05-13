#!/usr/bin/env bash
# ClickHouse backup using clickhouse-backup tool to S3.
set -euo pipefail

: "${CH_HOST:?}"
: "${CH_USER:?}"
: "${CH_PASSWORD:?}"
: "${S3_BUCKET:?}"

BACKUP_NAME="csr-ch-$(date -u +%Y%m%d-%H%M)"
clickhouse-backup create "$BACKUP_NAME"
clickhouse-backup upload "$BACKUP_NAME"
echo "Uploaded $BACKUP_NAME"

# Cleanup local: keep last 3
clickhouse-backup delete local $(clickhouse-backup list local | tail -n +4 | awk '{print $1}') 2>/dev/null || true
