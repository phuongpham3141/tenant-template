#!/usr/bin/env bash
# PostgreSQL restore from encrypted S3 backup.
set -euo pipefail

: "${PG_HOST:?must set}"
: "${PG_USER:?must set}"
: "${PG_PASSWORD:?must set}"
: "${PG_DB:?must set}"
: "${S3_BUCKET:?must set}"
: "${ENCRYPTION_KEY:?must set}"
: "${BACKUP_KEY:?must set — S3 object key, e.g., pg/2026/05/pg-medusa-20260511-0200.sql.gz.enc}"

LOCAL="/tmp/restore.sql.gz.enc"
export PGPASSWORD="$PG_PASSWORD"

echo "[$(date)] downloading $BACKUP_KEY"
aws s3 cp "s3://$S3_BUCKET/$BACKUP_KEY" "$LOCAL"

echo "[$(date)] decrypting + restoring → $PG_DB"
openssl enc -d -aes-256-gcm -pbkdf2 -pass env:ENCRYPTION_KEY -in "$LOCAL" \
  | gunzip \
  | pg_restore --clean --if-exists --jobs=8 -h "$PG_HOST" -U "$PG_USER" -d "$PG_DB"

rm -f "$LOCAL"
echo "[$(date)] restore complete."
