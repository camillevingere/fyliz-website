#!/usr/bin/env bash
# Échoue si une URL du sitemap ne répond pas 200
set -euo pipefail
site="${1:-https://fyliz.com}"
fails=0
for u in $(curl -s "$site/sitemap.xml" | grep -o '<loc>[^<]*' | sed 's/<loc>//'); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$u")
  [ "$code" = "200" ] || { echo "$code $u"; fails=$((fails+1)); }
done
echo "$fails URL(s) en erreur"
[ "$fails" -eq 0 ]
