#!/bin/bash
set -e
set -u

create_db() {
    local database=$1
    echo "Creating database '$database'"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" \
        -c "CREATE DATABASE $database;" \
        -c "GRANT ALL PRIVILEGES ON DATABASE $database TO $POSTGRES_USER;"
}

if [ -n "${POSTGRES_MULTIPLE_DATABASES:-}" ]; then
    echo "Multiple database creation: $POSTGRES_MULTIPLE_DATABASES"
    for db in $(echo "$POSTGRES_MULTIPLE_DATABASES" | tr ',' ' '); do
        create_db "$db"
    done
    echo "Multiple databases created"
fi
