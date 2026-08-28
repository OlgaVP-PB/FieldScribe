#!/bin/sh
# Serve requires a start-up script at the container WORKDIR.
exec nginx -c /etc/nginx/nginx.conf -g 'daemon off;'
