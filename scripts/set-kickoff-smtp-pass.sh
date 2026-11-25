#!/usr/bin/env bash
# Uso: ./scripts/set-kickoff-smtp-pass.sh 'contraseña-de-hi@raulyn.com'
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ $# -lt 1 ]]; then
  echo "Falta la contraseña. Ejemplo:"
  echo "  ./scripts/set-kickoff-smtp-pass.sh 'tu-contraseña'"
  exit 1
fi

printf '%s' "$1" | npx vercel@latest env add SMTP_PASS production --force
echo "Redeploying production…"
npx vercel@latest deploy --prod --yes
echo "Listo. Prueba: https://www.raulyn.com/casa-creativa/kickoff"