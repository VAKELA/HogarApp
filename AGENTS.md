# AGENTS.md — HogarApp

## Project

Home task distribution app (HogarApp). Greenfield — no code yet. Requirements and phased roadmap are in `README.md`.

## Architecture Decisions (settled)

- **PWA** (mobile-first, offline-first)
- **Real-time**: Socket.io via NestJS Gateway (not Supabase Realtime — need custom events like cooking timers)
- **Auth**: Supabase Auth (JWT validated in NestJS, household-scoped membership)
- **Database**: Supabase PostgreSQL with Prisma ORM
- **Frontend**: Next.js 15 (App Router) — deployed on Vercel
- **Backend**: NestJS — deployed on Railway (needs persistent WebSocket)
- **Monorepo**: Turborepo with shared types/validation (Zod)
- **UI**: shadcn/ui + Tailwind CSS
- **State**: React Query (server) + Zustand (client)
- **Full architecture**: `docs/ARCHITECTURE.md`
- **Phased delivery** — do not jump ahead. Build in order:

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Users, tasks (one-off + recurring), dashboard, calendar | Not started |
| 2 | Task barter system (no money/points — direct exchange) | Not started |
| 3 | House rules (majority vote required), proposals board | Not started |
| 4 | Shared expenses, common fund, allowances, contribution tracking | Not started |
| 5 | Room sections (kitchen: recipes/timers/cook status; bathrooms: last clean/next assignee) | Not started |
| 6 | Voice assistant, push notifications | Not started |
| 7 | IoT / smart home integration | Not started |

## Key Domain Constraints

- **Barter, not currency**: task exchange uses direct swaps, never points or money. Design data models accordingly.
- **Rules require majority vote** (>50% of household members) to add/modify/remove. Not admin-only.
- **Recurring tasks** are completed per-instance (mark Tuesday's cooking done, not the whole series).
- **Household-scoped**: all data belongs to a household. Users are members of exactly one household.
- **Usable by minors**: UI must be simple enough for children (allowances, task claiming).

## Conventions

- Language: Spanish for UI, English for code
- All dates/times: local timezone of the household
- README.md contains the original user prompt at the bottom — preserve it when editing