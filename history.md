# Project History & Changelog

## 📌 Project Overview
- **Project Name:** sakib-portfolio
- **Repository:** `https://github.com/sakibRayhan21/sakib-portfolio.git`
- **Branch:** `master`
- **Workspace:** `d:\Project\Port folio`
- **Tech Stack:** Next.js 16 (React 19, Turbopack), Tailwind CSS v4, TypeScript, Prisma with PostgreSQL (`@prisma/adapter-pg`), Zod
- **Local Dev Server:** `http://localhost:3000`

---

## 📋 Task & Milestone Tracker

- [x] Initialized project repository and created `history.md`
- [x] Cloned GitHub repository (`sakib-portfolio`) into workspace
- [x] Installed project dependencies (`npm install`)
- [x] Generated Prisma Client (`npx prisma generate`)
- [x] Configured environment files (`.env.example`, `.env.local`)
- [x] Started local development server on `http://localhost:3000` (Verified 200 OK)
- [x] Generated resume project descriptions & bullet points
- [x] Identified database technology (PostgreSQL with Prisma ORM) and diagnosed paused cloud instance
- [x] Features, enhancements, or bug fixes requested by user: Portfolio personalization, inline add buttons, dynamic skills & projects, and full-featured Admin section
- [x] Testing & verification (API endpoints, Next.js build compilation, local dev runtime)

---

## 📖 Work Log

### Session: October 26, 2026
- **Task 1:** Created `history.md` to establish project documentation and change tracking.
- **Task 2:** Cloned repository `https://github.com/sakibRayhan21/sakib-portfolio.git` directly into workspace on branch `master`.
- **Task 3:** Installed npm dependencies, generated Prisma client, and created local environment configs ([.env.local](file:///d:/Project/Port%20folio/.env.local), [.env.example](file:///d:/Project/Port%20folio/.env.example)).
- **Task 4:** Launched Next.js Turbopack development server on `http://localhost:3000` and verified HTTP 200 response.
- **Task 5:** Documented tailored, impact-driven resume bullet points and project summaries.

### Session: October 28, 2026
- **Task 6:** Analyzed schema and configuration: identified database as **PostgreSQL** with **Prisma ORM** (`@prisma/adapter-pg`). Documented likely cloud providers (Supabase, Neon) where databases pause after inactivity and provided steps to restore.

### Session: October 29, 2026
- **Task 7:** Started local development server (`npm.cmd run dev` using Next.js 16 + Turbopack) on `http://localhost:3000` and verified HTTP 200 response.
- **Task 8:** Implemented full portfolio personalization system:
  - Built persistent data store ([lib/portfolio-store.ts](file:///d:/Project/Port%20folio/lib/portfolio-store.ts)) with JSON file storage ([data/portfolio.json](file:///d:/Project/Port%20folio/data/portfolio.json)) and defaults ([data/default-portfolio.json](file:///d:/Project/Port%20folio/data/default-portfolio.json)), preventing 500 downtime when PostgreSQL is paused or offline.
  - Implemented RESTful API endpoints for Projects, Skills, Profile, and Reset (`/api/projects`, `/api/projects/[id]`, `/api/skills`, `/api/skills/[id]`, `/api/profile`, `/api/reset`).
  - Added interactive "+ Add Skill" and "+ Add Project" buttons with modal forms directly in the portfolio sections.
  - Built a comprehensive Admin Dashboard at `/admin` ([app/admin/page.tsx](file:///d:/Project/Port%20folio/app/admin/page.tsx)) featuring authentication, Project Manager, Skill Manager, Profile/Bio Personalizer, and Data Backup/Export/Reset tools.
  - Added responsive Navbar Admin button and custom SVG icons ([components/Icons.tsx](file:///d:/Project/Port%20folio/components/Icons.tsx)).
  - Verified Next.js build compilation (`npm run build`) and runtime HTTP 200 responses.

---

## 🛠️ Architecture & Technical Decisions Log

- **Decision 001 - Project Tracking:** Established `history.md` as the continuous record of development progress, milestones, and technical choices.
- **Decision 002 - Stack Overview:**
  - **Framework:** Next.js 16 (App Router) + React 19 + Turbopack + TypeScript
  - **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
  - **ORM & DB:** Prisma ORM 7 (`@prisma/client`, `@prisma/adapter-pg`, `pg`) with resilient JSON file persistence adapter
  - **Validation:** Zod
- **Decision 003 - Local Environment:** Created [.env.local](file:///d:/Project/Port%20folio/.env.local) with placeholder database connection string to enable Prisma initialization without runtime errors.
- **Decision 004 - Zero-Downtime Data Architecture:** Created an asynchronous file-backed JSON store in `lib/portfolio-store.ts` so the portfolio functions immediately with full CRUD capabilities without requiring an active PostgreSQL daemon, while retaining standard REST API contracts.
