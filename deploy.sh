#!/bin/bash
# =====================================================
# Script de deploy/atualização na VPS
# Rode: bash deploy.sh
# =====================================================

set -e

APP_DIR="/var/www/oficina-digital"

echo "Atualizando OficinaDigital..."

cd $APP_DIR

# Pull das mudanças
git pull origin main

# Instalar dependências
npm install

# Atualizar banco (se houver mudanças no schema)
npx prisma db push

# Build da aplicação
npm run build

# Reiniciar PM2
pm2 restart oficina-digital-api

echo "Deploy concluído!"
