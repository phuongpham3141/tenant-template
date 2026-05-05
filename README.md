# tenant-template

Multi-tenant deployment template — Medusa v2 + Payload v3 + Next.js storefront.

## Quick start (dev)

```bash
cd compose-dev
cp .env.example .env
docker compose up -d
```

Wait until all services are healthy:

```bash
docker compose ps
```

Then add to your local `hosts` file:

```
192.168.0.11    api.huayuesc.local admin.huayuesc.local cms.huayuesc.local shop.huayuesc.local metrics.huayuesc.local minio.huayuesc.local
```

Open:
- Storefront: http://shop.huayuesc.local
- Medusa Admin: http://admin.huayuesc.local
- Payload CMS: http://cms.huayuesc.local
- Grafana: http://metrics.huayuesc.local
- MinIO Console: http://minio.huayuesc.local

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for detailed workflow.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Troubleshooting

See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).
