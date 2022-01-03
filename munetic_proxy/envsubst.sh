#!/usr/bin/env sh
set -eu

if [ ${SERVER_HOST}=='localhost' ]; then
  envsubst '${SERVER_HOST}' < /etc/nginx/templates/localhost.conf.template > /etc/nginx/conf.d/default.conf
else
  envsubst '${SERVER_HOST}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
fi

exec "$@"