#!/usr/bin/env bash
# PostgreSQL daily logical + WAL archive backup.
# Logical via pg_dump → S3.
# Continuous WAL via wal-g (configure separately).
set -euo pipefail

: "${BACKUP_DATE:=$(date -u +%Y%m%d-%H%M)}"
: "${PG_HOST:?must set}"
: "${PG_USER:?must set}"
: "${PG_PASSWORD:?must set}"
: "${PG_DB:?must set}"
: "${S3_BUCKET:?must set}"
: "${ENCRYPTION_KEY:?must set}"

OUT="/tmp/pg-${PG_DB}-${BACKUP_DATE}.sql.gz.enc"
export PGPASSWORD="$PG_PASSWORD"

echo "[$(date)] starting pg_dump $PG_DB"
pg_dump -h "$PG_HOST" -U "$PG_USER" -d "$PG_DB" -Fc --jobs=8 \
  | gzip -9 \
  | openssl enc -aes-256-gcm -pbkdf2 -salt -pass env:ENCRYPTION_KEY -out "$OUT"

aws s3 cp "$OUT" "s3://$S3_BUCKET/pg/$(date -u +%Y/%m)/$(basename "$OUT")"
rm -f "$OUT"
echo "[$(date)] uploaded $(basename "$OUT")"

# Retention: keep last 30 dailies, 12 monthlies, 7 yearlies (lifecycle policy on bucket).
echo "Done."
