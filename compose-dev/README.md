# compose-dev — All-in-one dev stack

Single-VM development stack: Medusa + Payload + Storefront + Postgres + Redis + MinIO + Meilisearch + Prometheus + Grafana + Caddy.

## Quick start

```bash
cp .env.example .env
docker compose up -d
docker compose ps
```

First run takes 5-10 minutes (Docker pulls, npm installs in containers).

## Service access (via Caddy on :80)

| Service        | URL                                  |
|----------------|--------------------------------------|
| Storefront     | http://shop.huayuesc.local           |
| Medusa Admin   | http://admin.huayuesc.local          |
| Medusa API     | http://api.huayuesc.local            |
| Payload CMS    | http://cms.huayuesc.local            |
| Grafana        | http://metrics.huayuesc.local        |
| MinIO Console  | http://minio.huayuesc.local          |

Add the `huayuesc.local` hostnames to your hosts file (top-level README has the snippet).

## Direct ports

- Postgres: `localhost:5432`
- Redis: `localhost:6379`
- Meilisearch: `localhost:7700`

## Common ops

```bash
docker compose logs -f                # all
docker compose logs -f medusa-server  # one
docker compose down -v                # destroy + reset volumes
```

## Hot-reload

`../medusa/src`, `../payload/src`, `../storefront/src` are bind-mounted. Edit on host, see changes inside containers (HMR + Medusa watcher).
