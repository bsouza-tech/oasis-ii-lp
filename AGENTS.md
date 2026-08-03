# figma-make-app

Monorepo com `frontend` (Astro + React + Tailwind) e `backend` (API Hono).

## Development Server

Na raiz: `npm run dev` sobe backend (`8787`) e frontend (`8443`).

- Frontend preview: porta 8443
- Hot reload: alterações em `frontend/src` refletem imediatamente

## Project Structure

- `frontend/src/main` entry via Astro `src/pages/index.astro`
- `frontend/src/layouts/BaseLayout.astro` — layout + SEO + Pixel Meta
- `frontend/src/styles/global.css` — Tailwind CSS v4
- `frontend/package.json` — deps do frontend (sem DB)
- `backend/src/index.js` — API Hono
- `backend/.env` — secrets (`DATABASE_URL`, etc.)

## Architecture

`frontend → PUBLIC_API_URL → backend → Neon`

O frontend nunca acessa banco nem secrets. Supabase tem cliente stub no backend (`backend/src/db/supabase.js`) sem rotas de negócio ainda.

## Dependencies

- Frontend: React 19, Astro 5, Tailwind v4
- Backend: Hono, `@neondatabase/serverless`, Zod, `@supabase/supabase-js`

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` em `frontend/astro.config.mjs`. `frontend/src/index.css` / `global.css` importa Tailwind.

## Code quality

- Use double quotes for strings containing apostrophes.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
