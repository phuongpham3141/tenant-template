#!/usr/bin/env bash
set -euo pipefail
# Wipes the dev Postgres volume and re-creates the 2 DBs.

cd "$(dirname "$0")/../../compose-dev"
docker compose stop medusa-server payload-cms storefront 2>/dev/null || true
docker compose rm -fsv postgres
docker volume rm tenant-template-dev_postgres_data 2>/dev/null || true
docker compose up -d postgres
echo "Postgres reset. medusa-server will re-migrate on next start."
