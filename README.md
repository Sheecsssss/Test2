# M&A Staffing – Netlify + Next.js + Prisma

Ready-to-deploy web app for internal staffing management (M&A).\
Built with Next.js (App Router), Prisma, PostgreSQL. Netlify config included.

## One-click deploy (Netlify)
1. Push this folder to a **new GitHub repo**.
2. In Netlify: **New site from Git**, pick the repo.
3. Set environment variables (see `.env.example`):
   - `DATABASE_URL` (e.g., Neon or RDS)
   - `DIRECT_URL` (optional, often same as DATABASE_URL)
   - `NEXTAUTH_URL` (your Netlify URL, e.g. https://your-site.netlify.app)
   - `NEXTAUTH_SECRET` (random 32+ chars)
4. Deploy. After first deploy, run migrations:
   - Use Netlify CLI or a one-off deploy command:
     ```bash
     npx prisma migrate deploy
     npx tsx prisma/seed.ts
     ```
   Or run locally with the same `DATABASE_URL`.

## Local dev
```bash
pnpm i
cp .env.example .env
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```
App: http://localhost:3000

## Notes
- For production, prefer **Neon** (serverless Postgres) and **Prisma Accelerate** or PgBouncer to manage connections.
- If you need background jobs, use **Netlify Scheduled Functions** (see `netlify/functions/weekly-snapshot.ts`).
