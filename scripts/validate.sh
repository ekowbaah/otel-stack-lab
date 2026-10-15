#!/usr/bin/env sh
set -eu
docker compose config >/dev/null
echo "compose configuration is valid"
