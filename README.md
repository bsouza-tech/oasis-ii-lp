# Oásis II — Página de vendas

Arquitetura:

```
frontend → API (backend) → Neon
```

## Pastas

- `frontend/` — Astro + React (estático). Só usa `PUBLIC_API_URL`.
- `backend/` — API Hono. Secrets e acesso a Neon/Supabase ficam aqui.

## Desenvolvimento

1. Copie os envs:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Preencha `DATABASE_URL` em `backend/.env`.

3. Instale e suba os dois serviços:

```bash
npm install
npm run dev
```

- Frontend: http://localhost:8443  
- Backend: http://localhost:8787  

## Variáveis

**Backend (`backend/.env`)**

- `DATABASE_URL` — Neon (obrigatório)
- `PORT` — padrão `8787`
- `CORS_ORIGINS` — origens do frontend
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — opcional (cliente pronto, sem rotas ainda)

**Frontend (`frontend/.env`)**

- `PUBLIC_API_URL` — URL pública da API (ex.: `http://localhost:8787`)

## Endpoints

- `GET /health`
- `GET /leads/check-email?email=`
- `POST /leads/submit`
- `POST /leads/whatsapp-clicked`
