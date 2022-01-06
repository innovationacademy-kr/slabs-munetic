#!/usr/bin/env sh
set -eu

LOCALHOST=localhost

if [ ${SERVER_HOST} != "$LOCALHOST" ]; then
  envsubst '${SERVER_HOST}' < /templates/default.conf.template > /etc/nginx/conf.d/default.conf
else
  envsubst '${SERVER_HOST}' < /templates/localhost.conf.template > /etc/nginx/conf.d/default.conf
fi

exec "$@"