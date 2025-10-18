```markdown
# File Structure Documentation


Summary: 52 files. Import complexity distribution: 🟢 22, 🟡 18, 🔴 12


```text
/ (root)
├─ app.json 🟢 — Expo app configuration
├─ bun.lock 🟢 — Bun lockfile for deterministic installs
├─ eslint.config.js 🟢 — ESLint configuration
├─ package.json 🟡 — Project metadata, scripts, dependencies
├─ README.md 🟢 — Project overview and usage docs
├─ tsconfig.json 🟢 — TypeScript configuration
├─ .gitignore 🟢 — Git ignore rules
├─ .github/ (generated) — GitHub templates and CI
├─ filesExplainer.md — This file
├─ scripts.md — Scripts reference
├─ structure-analysis.md — Architecture and refactor plan
├─ sitemap — Route map and navigation
├─ .env.example — Environment variables template
├─ architecture.svg — System architecture diagram (vector)
├─ architecture.png — PNG reference (see note inside)
│
├─ assets/
│  └─ images/
│     ├─ icon.png — App icon
│     ├─ favicon.png — Favicon for web
│     ├─ splash-icon.png — Splash image
│     └─ adaptive-icon.png — Adaptive icon for Android
│
├─ app/
│  ├─ _layout.tsx 🔴 — Root stack navigation, providers (TRPC, React Query, AppContext)
│  ├─ +not-found.tsx 🟢 — 404 route
│  ├─ index.tsx 🟢 — Redirects to /splash
│  ├─ splash.tsx (not read) — Splash screen route
│  ├─ login.tsx 🔴 — Login screen with animations
│  ├─ signup.tsx 🟡 — Signup screen
│  ├─ calendar.tsx 🔴 — Content calendar with custom grid
│  ├─ comments.tsx 🟡 — Comments list with reply UI
│  ├─ profile.tsx 🔴 — Profile screen with stats and actions
│  ├─ settings.tsx 🔴 — Settings screen with language modal
│  ├─ (tabs)/
│  │  ├─ _layout.tsx 🟡 — Tabs with 5 routes
│  │  ├─ dashboard.tsx 🔴 — Analytics dashboard
│  │  ├─ messages.tsx 🔴 — Inbox of messages & comments
│  │  ├─ upload.tsx 🔴 — Composer and scheduler
│  │  ├─ connect.tsx 🔴 — Connect social accounts & API key
│  │  └─ subscription.tsx 🔴 — Plans, billing history, payment method
│
├─ backend/
│  ├─ hono.ts 🟡 — Hono server with TRPC bridge and CORS
│  ├─ db/
│  │  └─ schema.sql 🟢 — Postgres schema (users, posts, messages, analytics, social_accounts)
│  ├─ types/
│  │  ├─ env.ts 🟢 — Environment loader for server
│  │  └─ database.ts (not read) — DB typings (placeholder)
│  └─ trpc/
│     ├─ app-router.ts 🟡 — Root tRPC router composition and type export
│     ├─ create-context.ts 🟡 — TRPC context, Supabase client, helpers, superjson
│     ├─ middleware/
│     │  ├─ auth.ts 🟡 — protectedProcedure with Supabase auth
│     │  ├─ error-handler.ts 🟢 — Error helpers and wrapper
│     │  ├─ logging.ts 🟢 — Request timing logger
│     │  └─ rate-limit.ts 🟡 — In-memory rate limiter middleware
│     └─ routes/