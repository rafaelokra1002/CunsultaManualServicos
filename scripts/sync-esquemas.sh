#!/usr/bin/env bash
set -euo pipefail
: "${ESQUEMAS_DIR:?defina ESQUEMAS_DIR}"
: "${ESQUEMAS_HOST:?defina ESQUEMAS_HOST (user@servidor)}"
rsync -a --delete -e ssh public/esquemas/ "$ESQUEMAS_HOST:$ESQUEMAS_DIR/"
