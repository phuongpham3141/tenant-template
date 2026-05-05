# tenant-template

Multi-tenant deployment template — **Medusa v2** + **Payload v3** + **Next.js 16 storefront**, with Postgres, Redis, MinIO, Meilisearch, Prometheus, Grafana, and Caddy reverse proxy.

Forked per customer (`tenant-acme`, `tenant-bigshop`, ...) and deployed on either:

- **Dev**: single Hyper-V VM, all-in-one Docker Compose (this repo's `compose-dev/`)
- **Prod**: 4 Proxmox VMs split as `app`/`data`/`storage`/`obs` (`compose-prod/`)

## Repo layout

```
tenant-template/
├── medusa/         — Medusa v2 backend
├── payload/        — Payload CMS v3 (Next.js)
├── storefront/     — Next.js 16 storefront
├── caddy/          — Caddyfile.dev + Caddyfile.prod
├── compose-dev/    — Dev all-in-one Docker Compose
├── compose-prod/   — 4 prod compose files (data/storage/app/obs)
├── observability/  — Prometheus + Grafana provisioning
├── scripts/        — dev, prod, ci ops scripts
├── .github/        — GitHub Actions workflows
└── docs/           — ARCHITECTURE, DEVELOPMENT, DEPLOYMENT, TROUBLESHOOTING
```

## Quick start (dev)

Pre-req: Docker + Docker Compose on a Linux VM, plus Windows hosts file pointing to that VM:

```
192.168.0.11    api.huayuesc.local admin.huayuesc.local cms.huayuesc.local shop.huayuesc.local metrics.huayuesc.local minio.huayuesc.local
```

Then:

```bash
cd compose-dev
cp .env.example .env
docker compose up -d
docker compose ps   # wait until everything is healthy
```

Open in browser:

- Storefront: http://shop.huayuesc.local
- Medusa Admin: http://admin.huayuesc.local
- Payload CMS: http://cms.huayuesc.local
- Grafana: http://metrics.huayuesc.local
- MinIO Console: http://minio.huayuesc.local

First boot takes 5-10 minutes (image pulls + npm installs inside containers).

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — service map, dev vs prod topology, image flow
- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) — daily workflow, branch strategy, fork → tenant flow
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — prod onboarding, rollback, backup, DR
- [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) — common failure modes
- [scripts/README.md](scripts/README.md) — script reference

## License

Proprietary. See [LICENSE](LICENSE).
