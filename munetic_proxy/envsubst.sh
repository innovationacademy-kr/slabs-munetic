#!/usr/bin/env sh
set -eu

envsubst '${SERVER_HOST}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"