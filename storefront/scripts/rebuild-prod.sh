#!/usr/bin/env bash
# Rebuild + restart the production storefront after editing code on dev.
# Public traffic (huayuesc.vn + /en /cn + en/cn subdomains) is served by this.
# --no-healthcheck: the baked wget healthcheck hits localhost which resolves to
# IPv6 (::1); the standalone server binds IPv4 0.0.0.0 only -> false "unhealthy".
# The app is reachable fine via Caddy (container name -> IPv4).
set -e
cd "$(dirname "$0")/.."
echo ">> building prod image..."
docker build --target production -t huayuesc-storefront:prod .
echo ">> restarting storefront-prod..."
docker rm -f storefront-prod 2>/dev/null || true
docker run -d --name storefront-prod --restart unless-stopped --no-healthcheck \
  --network tenant-template-dev_tenant_net \
  -p 192.168.40.3:18090:3001 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://api.huayuesc.local \
  -e NEXT_PUBLIC_BASE_URL=http://huayuesc.vn \
  huayuesc-storefront:prod
echo ">> done. test: curl -H \"Host: huayuesc.vn\" http://192.168.40.3:18080/"
