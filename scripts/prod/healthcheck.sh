#!/usr/bin/env bash
set -euo pipefail
TENANT_DOMAIN="${1:?Usage: $0 <tenant-domain>}"
HOSTS="api admin shop cms metrics minio"
EXIT=0
for h in $HOSTS; do
    URL="https://${h}.${TENANT_DOMAIN}"
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$URL" || echo "000")
    if [[ "$code" =~ ^(200|301|302|401|403)$ ]]; then
        echo "OK  $URL  $code"
    else
        echo "FAIL $URL  $code"
        EXIT=1
    fi
done
exit $EXIT
