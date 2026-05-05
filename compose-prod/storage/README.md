# compose-prod/storage — VM Storage

MinIO (S3-compatible) + Meilisearch. Deployed on the storage VM (e.g. 10.X.0.3).

## Pre-reqs

- /srv/minio/data
- /srv/meilisearch/data

## Bring up

```bash
cp .env.example .env
docker compose up -d
```

MinIO Console at :9001, S3 API at :9000. Meilisearch at :7700.
