#!/bin/bash
# =====================================================
# Script de setup da VPS para OficinaDigital
# Rode como root: sudo bash setup-vps.sh
# =====================================================

set -e

echo "======================================"
echo " OficinaDigital - Setup da VPS"
echo "======================================"

# 1. Atualizar sistema
echo "[1/7] Atualizando sistema..."
apt update && apt upgrade -y

# 2. Instalar Node.js 20 LTS
echo "[2/7] Instalando Node.js 20..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"

# 3. Instalar PM2
echo "[3/7] Instalando PM2..."
npm install -g pm2

# 4. Instalar PostgreSQL
echo "[4/7] Instalando PostgreSQL..."
if ! command -v psql &> /dev/null; then
    apt install -y postgresql postgresql-contrib
fi
systemctl enable postgresql
systemctl start postgresql

# 5. Criar banco e usuário
echo "[5/7] Configurando banco de dados..."
read -p "Senha para o usuário do banco (oficina_user): " DB_PASS
sudo -u postgres psql -c "CREATE USER oficina_user WITH PASSWORD '$DB_PASS';" 2>/dev/null || echo "Usuário já existe"
sudo -u postgres psql -c "CREATE DATABASE oficina_digital OWNER oficina_user;" 2>/dev/null || echo "Banco já existe"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE oficina_digital TO oficina_user;"

# 6. Instalar Nginx
echo "[6/7] Instalando Nginx..."
apt install -y nginx
systemctl enable nginx

# 7. Instalar Certbot (SSL)
echo "[7/7] Instalando Certbot..."
apt install -y certbot python3-certbot-nginx

echo ""
echo "======================================"
echo " Setup concluído!"
echo "======================================"
echo ""
echo "Próximos passos:"
echo ""
echo "1. Clone/copie o projeto para /var/www/oficina-digital/"
echo "   mkdir -p /var/www/oficina-digital"
echo ""
echo "2. Copie o .env.vps.example para .env e configure:"
echo "   cp .env.vps.example .env"
echo "   nano .env"
echo ""
echo "3. Instale dependências e faça o build:"
echo "   cd /var/www/oficina-digital"
echo "   npm install"
echo "   npx prisma db push"
echo "   npm run build"
echo ""
echo "4. Configure o Nginx:"
echo "   cp nginx.conf /etc/nginx/sites-available/oficina-digital"
echo "   ln -sf /etc/nginx/sites-available/oficina-digital /etc/nginx/sites-enabled/"
echo "   rm -f /etc/nginx/sites-enabled/default"
echo "   nano /etc/nginx/sites-available/oficina-digital  # altere o domínio"
echo "   nginx -t && systemctl reload nginx"
echo ""
echo "5. Gere o certificado SSL:"
echo "   certbot --nginx -d api.seudominio.com"
echo ""
echo "6. Inicie com PM2:"
echo "   mkdir -p /var/log/oficina-digital"
echo "   cd /var/www/oficina-digital"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo "   pm2 startup"
echo ""
echo "7. Na Vercel, adicione a variável de ambiente:"
echo "   NEXT_PUBLIC_API_URL=https://api.seudominio.com"
echo ""
echo "   E garanta que NEXTAUTH_SECRET é igual nos dois ambientes."
echo ""
echo "DATABASE_URL para o .env:"
echo "   postgresql://oficina_user:${DB_PASS}@localhost:5432/oficina_digital"
echo ""
