# Custom postgres image: pgvector + pg_partman
# Base: pgvector/pgvector:pg16 (Debian-based, has pgvector built-in)
# Add: postgresql-16-partman from Debian repos

FROM pgvector/pgvector:pg16

# Install pg_partman extension
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-16-partman \
    && rm -rf /var/lib/apt/lists/*

# Confirm extensions available (smoke test khi build)
# Note: Cannot run pg_available_extensions trong RUN vì Postgres chưa start
# Sẽ verify post-build qua docker compose exec

LABEL maintainer="huayuesc"
LABEL description="PostgreSQL 16 + pgvector + pg_partman for HUAYUE platform"
