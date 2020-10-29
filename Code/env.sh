#!/usr/bin/env sh

find './usr/share/nginx/sense' -name '*.js' -exec sed -i -e 's/API_BASE_URL/'"${API_BASE_URL}"'/g' {} \;

nginx -g "daemon off;";
