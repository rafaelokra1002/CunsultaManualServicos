# 🏍️ MotoManual - Sistema de Manuais de Motocicletas

Sistema web para venda de acesso a manuais de serviço de motocicletas.

## Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Prisma ORM** + PostgreSQL
- **NextAuth.js** (JWT + Credentials)
- **TailwindCSS**
- **Zod** (validação)

## Pré-requisitos

- Node.js 18+
- PostgreSQL rodando (local ou Docker)

## Instalação

### 1. Clone e instale dependências

```bash
npm install
```

### 2. Configure o ambiente

Copie o arquivo de exemplo e edite com seus dados:

```bash
cp .env.example .env
```

Edite o `.env`:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/consulta_manual?schema=public"
NEXTAUTH_SECRET="gere-com-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

> Para gerar o secret: `openssl rand -base64 32`

### 3. Configure o banco de dados

```bash
# Gera o client do Prisma e aplica o schema no banco
npx prisma db push

# Popula o banco com dados de exemplo
npm run db:seed
```

### 4. Rode o projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Credenciais de Teste

| Tipo  | Email                | Senha     |
|-------|----------------------|-----------|
| Admin | admin@consulta.com   | admin123  |
| User  | usuario@teste.com    | user123   |

## Estrutura de Pastas

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx         # Tela de login
│   │   └── register/page.tsx      # Tela de cadastro
│   ├── admin/
│   │   ├── layout.tsx             # Layout admin com sidebar
│   │   ├── page.tsx               # Dashboard admin
│   │   ├── manuais/page.tsx       # CRUD de manuais
│   │   └── usuarios/page.tsx      # Gerenciar usuários
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts  # NextAuth handler
│   │   │   └── register/route.ts       # POST /api/auth/register
│   │   ├── manuais/route.ts            # GET/POST /api/manuais
│   │   └── users/
│   │       ├── route.ts                # GET /api/users
│   │       └── [id]/route.ts           # PATCH /api/users/:id
│   ├── conta-inativa/page.tsx     # Tela de conta inativa
│   ├── dashboard/
│   │   ├── layout.tsx             # Layout com sidebar
│   │   └── page.tsx               # Dashboard do usuário
│   ├── manuais/
│   │   ├── layout.tsx             # Layout com sidebar
│   │   └── page.tsx               # Listagem de manuais
│   ├── globals.css
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/
│   ├── AdminSidebar.tsx           # Sidebar do admin
│   ├── ManualCard.tsx             # Card de manual
│   ├── Providers.tsx              # SessionProvider
│   └── Sidebar.tsx                # Sidebar do usuário
├── lib/
│   ├── auth.ts                    # Config NextAuth
│   ├── prisma.ts                  # Singleton Prisma
│   └── validations.ts            # Schemas Zod
├── middleware.ts                  # Proteção de rotas
└── types/
    └── next-auth.d.ts             # Tipos do NextAuth
```

## Rotas da API

| Método | Rota                  | Descrição                   | Acesso  |
|--------|-----------------------|-----------------------------|---------|
| POST   | /api/auth/register    | Cadastro de usuário         | Público |
| POST   | /api/auth/[...nextauth] | Login (NextAuth)         | Público |
| GET    | /api/manuais          | Lista manuais (com filtros) | Auth    |
| POST   | /api/manuais          | Cria manual                 | Admin   |
| GET    | /api/users            | Lista usuários              | Admin   |
| PATCH  | /api/users/:id        | Ativar/desativar usuário    | Admin   |

## Regras de Acesso

- **Usuário `active=false`**: redirecionado para `/conta-inativa`
- **Usuário `active=true`**: acessa `/dashboard` e `/manuais`
- **Admin**: acessa tudo, incluindo `/admin`
- **Middleware** protege: `/dashboard`, `/manuais`, `/admin`

## Comandos Úteis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run db:studio    # Abre o Prisma Studio (GUI do banco)
npm run db:seed      # Popula banco com dados de teste
```
