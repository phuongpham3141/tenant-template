# compose-prod/app — VM App

Medusa server + worker + Payload CMS + Storefront. Deployed on the app VM (e.g. 10.X.0.1).

## Pre-reqs

- Logged in to ghcr.io/phuongpham3141 (docker login ghcr.io -u phuongpham3141)
- Data VM (Postgres on :6432 via pgbouncer, Redis on :6379) reachable
- Storage VM (MinIO on :9000) reachable

## Bring up

```bash
cp .env.example .env
docker compose pull
docker compose up -d
docker compose ps
```

Migration is **manual** in prod (see scripts/prod/migrate.sh).
