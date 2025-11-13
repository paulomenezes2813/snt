# Dashboard SNT (Sistema Neural de Transporte)

Aplicação Full Stack para monitoramento de indicadores em quatro dimensões: Demanda, Oferta, Condução e Infraestrutura.

Tecnologias:
- API: Node.js + Express + Prisma + PostgreSQL
- Frontend: React + Vite (responsivo, adaptado ao mobile)
- Monorepo com workspaces (`apps/api` e `apps/web`)

## Pré-requisitos
- Node.js 18+
- PostgreSQL 14+

## Configuração do Banco
Crie a base de dados:
```sql
CREATE DATABASE arce_snt;
```

## Configuração de Ambiente
Crie o arquivo `.env` dentro de `apps/api` com base no exemplo abaixo (ou copie `env.example` para `.env`):

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/arce_snt?schema=public
```

## Instalação
Na raiz do projeto:
```bash
npm install
```

No workspace da API:
```bash
npm --workspace apps/api run prisma:generate
npm --workspace apps/api run prisma:migrate
npm --workspace apps/api run prisma:seed
```

## Desenvolvimento (API + Web juntos)
Na raiz:
```bash
npm run dev
```
- API: http://localhost:4000
- Web: http://localhost:5173

## Scripts Úteis
- Rodar apenas a API em dev:
```bash
npm run dev -w apps/api
```
- Rodar apenas o Web em dev:
```bash
npm run dev -w apps/web
```

## Endpoints Principais
- `GET /api/health` — status da API
- `GET /api/indicators/summary` — resumo das quatro dimensões
- `GET /api/indicators/demanda` — métricas de demanda
- `GET /api/indicators/oferta` — viagens com métricas de oferta
- `GET /api/indicators/conducao` — métricas de condução
- `GET /api/indicators/infraestrutura` — eventos atípicos
- `GET /api/vehicles?type=BUS|VAN` — listar veículos

## Estrutura de Pastas
```
apps/
  api/        # Express + Prisma
  web/        # React (Vite)
```

## Observações
- O frontend usa proxy do Vite para `/api` → `http://localhost:4000`.
- O layout é responsivo com menu lateral tipo "drawer" no mobile.


