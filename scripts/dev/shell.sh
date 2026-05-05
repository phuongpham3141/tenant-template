#!/usr/bin/env bash
set -euo pipefail
SERVICE="${1:-medusa-server}"
cd "$(dirname "$0")/../../compose-dev"
docker compose exec "$SERVICE" sh -c 'command -v bash >/dev/null && exec bash || exec sh'
