# Architecture

## Overview

`tenant-template` is a multi-service e-commerce stack designed to be **forked per tenant**. Each tenant gets its own GitHub repo (`tenant-acme`, `tenant-bigshop`, ...), independent versioning, independent deployment.

## Services

```
┌─────────────────┐
│   Storefront    │  Next.js 16, public URLs (shop.<tenant>.huayuesc.com)
│   (port 3001)   │
└────────┬────────┘
         │ HTTP (REST)
         ▼
┌─────────────────┐         ┌─────────────────┐
│   Medusa Server │ ◄────── │  Medusa Admin   │
│   (port 9000)   │         │  (built-in UI)  │
└────────┬────────┘         └─────────────────┘
         │
         │ + Medusa Worker (split-mode, async jobs)
         │
         ▼
┌─────────────────┐         ┌─────────────────┐
│   Postgres      │ ◄────── │   Payload CMS   │
│   (medusa +     │ +       │   (port 3000)   │  Marketing pages, media library
│    payload DBs) │ pgbouncer
└─────────────────┘         └─────────────────┘
         ▲                            │
         │                            ▼
┌─────────────────┐         ┌─────────────────┐
│      Redis      │         │     MinIO       │  S3-compatible object store
│  (cache + bus + │         │   (port 9000)   │  for media files, catalog images
│   workflow eng) │         └─────────────────┘
└─────────────────┘
```

## Dev vs Prod topology

### Dev (single VM)

All services in one `docker compose` stack on the dev VM. Caddy on `:80` routes `*.huayuesc.local` to internal services. Volumes are Docker-managed (named volumes).

### Prod (4-VM split per tenant)

| Role        | IP                    | Services                                              |
|-------------|-----------------------|-------------------------------------------------------|
| `app`       | `10.<idx>.0.1`        | Medusa server, Medusa worker, Payload CMS, Storefront |
| `data`      | `10.<idx>.0.2`        | Postgres, PgBouncer, Redis                            |
| `storage`   | `10.<idx>.0.3`        | MinIO, Meilisearch                                    |
| `obs`       | `10.<idx>.0.4`        | Prometheus, Alertmanager, Grafana, Loki               |

`<idx>` is per-tenant numeric ID (acme=1, bigshop=2, ...). A separate edge VM runs Caddy with HTTPS termination, fanning to the per-tenant app VM.

Volumes are bind-mounts to ZFS datasets (snapshot-friendly, host-managed).

## Image flow

- **Dev**: `docker compose up` builds locally from `medusa/`, `payload/`, `storefront/` source.
- **Prod**: GitHub Actions builds `ghcr.io/phuongpham3141/<service>-<tenant>:<version>` images. `compose-prod` only pulls.

## Scaling

- Medusa server can scale horizontally behind a load balancer (Caddy supports upstream pool). Sticky sessions not needed (JWT auth).
- Medusa worker scales independently of server.
- Postgres single-master with PgBouncer pooling. Read replica for analytics is out-of-scope for this template.
- Redis single instance, persistent (RDB snapshots).
