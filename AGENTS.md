# AGENTS.md — Agent Guidelines & Project Architecture

## 1. Project Overview & Identity
- **Owner**: Jose Raphael Dichoso (Computer Engineering student, Networks major)
- **Purpose**: Modern developer portfolio showcasing software, hardware/electronics, and leadership background.
- **Current State**: Active `remodel` branch.

## 2. Agent Operating Principles
- **Inform, Don't Block**: If a user request conflicts with stack choices, conventions, or architectural decisions in this document, briefly note the discrepancy and any relevant trade-offs, then follow the user's lead. The user's directive always overrides this document.
- **Verification First**: Before claiming work is done, verify behavior (builds, type checks, lint, or runtime checks) rather than assuming code works.
- **Keep It Lean**: Prefer minimal, focused solutions over speculative abstractions or unnecessary dependencies.

## 3. Tech Stack & Environment
- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI / Styling**: React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), Base UI (`@base-ui/react`), Lucide Icons, Framer Motion
- **Typography**: `DotGothic16` (display/headings, `font-display`) + `Space Mono` (text and in-card titles, `font-text`), in both themes
- **Database & Storage**: Neon Serverless PostgreSQL
- **ORM / Query Layer**: Drizzle ORM (`drizzle-orm`, `drizzle-kit`, `pg`)
- **Analytics**: Vercel Analytics & Speed Insights
- **Runtime / Package Manager**: Node.js v22+ / npm

## 4. Directory Layout & Key Locations
- `src/app/`: Next.js App Router pages, layout, and global styles (`globals.css`)
- `src/components/`: Reusable UI elements, layout wrappers, and section components
- `src/data/`: Static portfolio content (`portfolio.ts`) — the single source of truth for all visible copy
- `src/db/`:
  - `schema.ts`: Drizzle PostgreSQL schema definitions
  - `queries.ts`: Typed data access functions
  - `index.ts`: Database client connection (pg pool memoised on `globalThis`)
- `src/lib/`: Shared pure helpers (`github-contributions.ts`, `motion.ts`)
- `src/hooks/`: Reusable client hooks (`use-lightbox.ts`, `use-copy-email.ts`)
- `public/`: Static assets (`projects/`, `certifications/`, `involvement/`, `profile.png`)

## 5. Common Commands
- `npm run dev` — Run development server
- `npm run build` — Production build (Turbopack + TypeScript validation)
- `npx tsc --noEmit` — Run TypeScript type-check
- `npm run lint` — ESLint verification
- `npm run db:push` — Push `src/db/schema.ts` to the database (drizzle-kit)
- `npm run db:studio` — Open Drizzle Studio to inspect the database
- `neon branches list` — View Neon database branches

## 6. Coding & Architecture Conventions
- **Server vs Client Components**: Prefer Server Components by default; isolate `"use client"` to interactive islands (animations, interactive cards, modals).
- **Styling**: Use Tailwind CSS v4 utility classes. Avoid arbitrary inline styles unless dynamic positioning is strictly required. Use semantic colour tokens (`bg-page`, `text-ink`, `border-edge`, …) and the `light:` variant for light-only fixes; no raw hex/neutral utilities.
- **Data Fetching**: Use typed queries from `src/db/queries.ts`. Handle loading and empty states gracefully.
- **Content**: Site content is static in `src/data/portfolio.ts`; the DB holds only `github_cache`, read via `src/db/queries.ts`.
- **TypeScript**: Strict types throughout; no `any`. Ensure `npx tsc --noEmit` passes with 0 errors before completing any task.

## 7. Guardrails & Safety
- **Environment Secrets**: Never commit or log values from `.env` (Neon credentials). Copy `.env.example` and fill in `DATABASE_URL` and `CRON_SECRET`; see README for what each does.
- **Git Hygiene**: Keep commits focused and atomic with descriptive prefixes (`feat:`, `fix:`, `refactor:`).
- **Schema Changes**: Any change to database models must update `src/db/schema.ts` and reach the database via `npm run db:push` (drizzle-kit); there is no seed script — content lives in `src/data/portfolio.ts`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
