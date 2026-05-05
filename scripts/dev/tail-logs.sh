#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../compose-dev"
docker compose logs -f --tail 100 "$@"
