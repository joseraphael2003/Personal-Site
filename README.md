# Portfolio — Jose Raphael V. Dichoso

Personal portfolio site: a Next.js single-page app with a GitHub contributions heatmap backed by a Neon PostgreSQL cache.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4**, Base UI, Framer Motion, GSAP, Lucide Icons
- **Drizzle ORM** + **pg** against Neon Serverless PostgreSQL (only a `github_cache` table; all site content is static in `src/data/portfolio.ts`)
- Deployed on **Vercel** (a scheduled cron hits `/api/cron/github` to refresh the contribution cache)

## Getting started

```bash
npm install
cp .env.example .env   # fill in the values below
npm run db:push        # create the github_cache table
npm run dev
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (Turbopack + TypeScript validation) |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | TypeScript type-check |
| `npm run db:push` | Push `src/db/schema.ts` to the database (drizzle-kit) |
| `npm run db:studio` | Open Drizzle Studio to inspect the database |

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | Neon PostgreSQL connection string, used by `src/db` and `drizzle-kit` |
| `CRON_SECRET` | production | Shared secret for `/api/cron/github`; requests without the matching `Authorization` header get a 401 (fail closed). Unset locally means the cron route always returns 401 |
