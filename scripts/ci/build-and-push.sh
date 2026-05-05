#!/usr/bin/env bash
set -euo pipefail
# Build and push images for one tenant. Used by GitHub Actions or manually.

TENANT_ID="${1:?Usage: $0 <tenant-id> <version>}"
VERSION="${2:?Usage: $0 <tenant-id> <version>}"
REGISTRY="ghcr.io/phuongpham3141"

for svc in medusa payload storefront; do
    image="${REGISTRY}/${svc}-${TENANT_ID}:${VERSION}"
    echo "=== Build $image ==="
    docker buildx build \
        --platform linux/amd64 \
        --target production \
        -t "$image" \
        -t "${REGISTRY}/${svc}-${TENANT_ID}:latest" \
        --cache-from "type=registry,ref=${REGISTRY}/${svc}-${TENANT_ID}:cache" \
        --cache-to   "type=registry,ref=${REGISTRY}/${svc}-${TENANT_ID}:cache,mode=max" \
        --push \
        "./${svc}"
done
echo "=== All images pushed ==="
