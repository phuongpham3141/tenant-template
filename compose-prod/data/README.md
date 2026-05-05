# compose-prod/data — VM Data

Postgres + PgBouncer + Redis. Deployed on the data VM (e.g. 10.X.0.2).

## Pre-reqs on host

ZFS datasets pre-created and mounted:
- /srv/postgres/data
- /srv/postgres/backups
- /srv/redis/data

## Bring up

```bash
cp .env.example .env
docker compose up -d
docker compose ps
```

Postgres listens on 5432, PgBouncer on 6432 (transaction-pooled). App VM connects to PgBouncer.
