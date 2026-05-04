# PRD: HogarApp — Home Task Distribution Platform

## Problem Statement

Household members lack a centralized, fair system to manage shared responsibilities. Tasks get forgotten, workload falls unevenly on some members, and there's no transparent way to exchange duties, set house rules democratically, or track who contributes what. Existing solutions are either too rigid (fixed schedules without flexibility) or too simplistic (basic checklists without recurring logic, barter, or governance). Families — including minors — need an app that adapts to how households actually work: with negotiation, voting, and direct task swaps rather than point systems or money.

## Solution

HogarApp is a PWA that gives every household member a personal dashboard of their responsibilities, a calendar view of upcoming tasks, and tools for fair collaboration. It introduces a barter-based task economy (no money, no points — just direct swaps), democratic house rules requiring majority vote, and room-specific sections that surface live context (who's cooking, when was the bathroom last cleaned). The platform evolves across 7 phases from a focused task manager to a full household operating system with voice control and IoT integration.

---

## User Stories

### Phase 1 — Users, Tasks, Dashboard & Calendar

1. As a household member, I want to create a user profile with my name and avatar, so that other members can identify me
2. As a household creator, I want my household to be created automatically when I sign up, so that I can start using the app immediately
3. As a household admin, I want to generate and share an invite code, so that other members can join my household
4. As a new member, I want to join an existing household by entering an invite code, so that I can participate in shared tasks
5. As a household member, I want to create a one-off task (e.g. "hang a shelf"), so that it appears on the dashboard of the assigned member
6. As a household member, I want to create a one-off task without assigning it, so that any member can claim it
7. As a household member, I want to assign a priority (low, medium, high, urgent) and category (cooking, cleaning, shopping, maintenance, organization, other) to a task, so that it's organized and visible appropriately
8. As a household member, I want to set an optional due date on a one-off task, so that it appears on the correct day in the calendar
9. As a household member, I want to create a recurring task (e.g. "cook lunch on Tuesdays"), so that it automatically appears on the right days
10. As a household member, I want to define recurrence patterns (daily, specific weekdays, monthly, custom), so that tasks match our actual schedule
11. As a household member, I want to assign a recurring task to a specific person for a specific day, so that rotation is explicit (e.g. "Maria cooks on Mondays, Juan on Tuesdays")
12. As a household member, I want to set up automatic rotation for a recurring task, so that responsibility cycles through assigned members fairly
13. As a household member, I want to mark a single instance of a recurring task as completed (not the whole series), so that Tuesday's cooking is done but Wednesday's is still pending
14. As a household member, I want to skip a task instance (e.g. I'm sick today), so that it's recorded as skipped without penalty
15. As a household member, I want to see my tasks for today on a dashboard, so that I know what I need to do right now
16. As a household member, I want to see a progress indicator for today's tasks (e.g. 3/5 completed), so that I can gauge how much is left
17. As a household member, I want to quickly mark a task as completed from the dashboard, so that I don't have to navigate to a detail page
18. As a household member, I want to view a monthly calendar with tasks assigned to each day, so that I can plan ahead
19. As a household member, I want to switch between monthly, weekly, and daily calendar views, so that I can see the right level of detail
20. As a household member, I want to filter the calendar by member, category, or task type (one-off vs recurring), so that I can focus on what's relevant
21. As a household member, I want to click on a calendar day to see all tasks for that day, so that I can review details
22. As a household member, I want visual indicators on calendar days showing task density (many/few tasks), so that I can spot busy days at a glance
23. As a household member, I want to receive a notification when a task is due soon, so that I don't forget
24. As a household member, I want to change a task's status from pending to in-progress to completed, so that others can see what I'm working on

### Phase 2 — Task Barter System

25. As a household member, I want to offer a task swap (e.g. "I'll do the dishes if you cook for me"), so that I can negotiate responsibilities directly
26. As a household member, I want to request help with a task and offer something in return (e.g. "Can someone cook for me? I'll clean the bathroom"), so that I can get help when I need it
27. As a household member, I want to accept a barter offer from another member, so that the swap is formalized
28. As a household member, I want to make a counter-offer on a barter request, so that we can negotiate until both sides agree
29. As a household member, I want both sides of a barter agreement to be tracked as separate task reassignments, so that the swap is reflected in our schedules
30. As a household member, I want to mark my side of a barter as completed, so that progress is tracked
31. As a household member, I want to see when both sides of a barter are completed so the agreement is closed, so that there's closure
32. As a household member, I want to see a history of all my past barter exchanges, so that I can review how we've helped each other
33. As a household member, I want to see a reliability indicator for each member (do they follow through on swaps?), so that I know who to trust
34. As a household member, I want to see statistics of how many times I've helped vs been helped, so that I can see if the balance is fair
35. As a household member, I want to be notified when someone posts a barter offer, so that I can respond quickly

### Phase 3 — House Rules & Proposals Board

36. As a household member, I want to propose a new house rule, so that it enters a voting period
37. As a household member, I want to vote for or against a proposed rule, so that my voice counts
38. As a household member, I want a rule to be automatically added when it receives majority approval (>50% of members), so that rules reflect the will of the household
39. As a household member, I want to propose modifying an existing rule, so that rules can evolve
40. As a household member, I want to propose removing a rule, so that outdated rules can be eliminated
41. As a household member, I want to see all current house rules on a dedicated page, so that I can review them anytime
42. As a household member, I want rules to be categorized (coexistence, cleaning, schedules, visits, etc.), so that they're organized
43. As a household member, I want to create a proposal (e.g. "replace the washing machine"), so that the household can decide together
44. As a household member, I want to add a description, estimated cost, and priority to a proposal, so that others have context
45. As a household member, I want to vote on proposals (for, against, abstain), so that decisions are democratic
46. As a household member, I want to comment on proposals, so that we can discuss before voting
47. As a household member, I want proposals to have a lifecycle (proposed → voting → approved/rejected → in execution → completed), so that progress is tracked
48. As a household member, I want to choose the voting type for a proposal (simple majority >50%, qualified majority 2/3, unanimity), so that important decisions require more consensus
49. As a household member, I want to set a configurable voting period (e.g. 3 days), so that votes don't stay open forever
50. As a household member, I want to be notified when a new rule is proposed or a vote opens, so that I can participate
51. As a household member, I want to see who voted what on a rule or proposal, so that voting is transparent

### Phase 4 — Shared Expenses & Contribution Tracking

52. As a household member, I want to contribute money to a common fund, so that shared expenses can be paid from it
53. As a household member, I want to record shared expenses paid from the common fund, so that we know where the money goes
54. As a household member, I want to see the balance of the common fund (total contributions minus expenses), so that we know if we're covered
55. As a household member who earns income, I want to record my income contribution to the household, so that my financial contribution is tracked
56. As a household admin, I want to set up an allowance for a minor member, so that they receive a configurable amount
57. As a household admin, I want to see how each minor spends their allowance, so that I can guide them
58. As a household member, I want to see who pays each utility bill (electricity, water, internet, gas), so that contribution is attributed correctly
59. As a household member, I want to see a percentage breakdown of each member's financial contribution, so that I can see if the distribution is fair
60. As a household member, I want expenses to be automatically divided among members proportionally to income, so that the math is done for me
61. As a household member, I want to see debts and balances between members, so that we can settle up
62. As a household member, I want to receive alerts for upcoming bill payments, so that nothing is missed
63. As a household member, I want to see a complete transaction history, so that everything is transparent
64. As a household member, I want visual charts (pie charts, bar charts) showing contribution and expense distribution, so that data is easy to understand

### Phase 5 — Room Sections

65. As a household member, I want to enter a kitchen section and see the family recipe book, so that I can find what to cook
66. As a household member, I want to add a recipe to the family recipe book, so that others can cook it too
67. As a household member, I want to start a cooking timer in real time, so that everyone knows something is being cooked
68. As a household member, I want to see what is currently being cooked and by whom, so that I know the kitchen is occupied
69. As a household member, I want to see who is responsible for cooking today (based on the recurring task assignment), so that I know whose turn it is
70. As a household member, I want to see who is responsible for cleaning after cooking, so that cleanup is assigned
71. As a household member, I want to see a history of past meals and who cooked them, so that we can plan variety
72. As a household member, I want to see when a bathroom was last cleaned and by whom, so that I know its current state
73. As a household member, I want to see who is next responsible for cleaning a bathroom, so that I know whose turn it is
74. As a household member, I want to see an urgency indicator on a bathroom (e.g. "overdue for cleaning"), so that I know when action is needed
75. As a household member, I want to use a standard cleaning checklist for each bathroom, so that nothing is missed
76. As a household member, I want to see sections for other rooms (living room, bedrooms, laundry), so that each space has relevant context
77. As a household member, I want the room section system to be extensible, so that new room types can be added over time

### Phase 6 — Voice Assistant & Notifications

78. As a household member, I want to say "I completed the cooking task" and have it marked as done, so that I don't need to open the app
79. As a household member, I want to say "I need help with cleaning" and have it posted as a help request, so that others are notified
80. As a household member, I want to say "I'm starting to cook" and have the kitchen section update in real time, so that others know
81. As a household member, I want to ask "what do I have to do today?" and hear my task list, so that I can check without looking at my phone
82. As a household member, I want to receive a push notification when someone starts cooking, so that I know the kitchen is occupied
83. As a household member, I want the cooking notification to include what's being cooked, who's cooking, and an estimated completion time, so that I can plan around it
84. As a household member, I want to enable a "do not disturb" mode for the kitchen, so that the cook isn't interrupted
85. As a household member, I want to receive push notifications for task reminders, new proposals, active votes, and barter offers, so that I stay informed
86. As a household member, I want to integrate with existing voice assistants (Alexa, Google Assistant, Siri), so that I can use the devices I already have

### Phase 7 — IoT & Smart Home Integration

87. As a household member, I want the app to receive data from smart home sensors (motion, temperature, humidity), so that room status is updated automatically
88. As a household member, I want AI assistants in the house to announce what's happening (e.g. "Juan is cooking, kitchen available in 30 minutes"), so that I'm informed without checking the app
89. As a household member, I want the app to be a passive information source that smart home devices pull from, so that the app doesn't need to be opened to be useful
90. As a household member, I want automations triggered by sensor data (e.g. motion detected in kitchen → notify members), so that context flows automatically
91. As a household member, I want a unified dashboard showing both sensor data and task data, so that I see the full picture of my home

---

## Implementation Decisions

### Architecture

- **Monorepo** managed with Turborepo: `apps/web` (Next.js 15), `apps/api` (NestJS), `packages/shared` (Zod schemas, types, constants), `packages/database` (Prisma schema + client)
- **Backend separated from frontend**: NestJS handles all business logic and WebSocket events. Next.js handles UI rendering and auth callbacks only — no API routes in Next.js
- **Supabase Auth** handles registration, login, OAuth, magic links. NestJS validates Supabase JWTs via an AuthGuard. Client authenticates directly with Supabase, sends JWT to NestJS
- **Socket.io via NestJS Gateway** for real-time events (not Supabase Realtime) — needed for custom events like cooking timers, live status updates
- **REST API** (not GraphQL) — sufficient for the domain, simpler to implement and debug
- **Deploy**: Vercel (frontend), Railway (backend), Supabase (PostgreSQL + Auth + Storage)

### Modules

The system is organized into the following deep modules, each with a clear interface and testable in isolation:

1. **Auth Module** — Supabase JWT validation, auto-provisioning of User records on first login, household-scoped context injection via NestJS middleware. Interface: `AuthGuard` decorator + `@CurrentUser()` param decorator
2. **Household Module** — CRUD for households, invite code generation and regeneration, member listing, role management (ADMIN/MEMBER). Interface: REST endpoints under `/households/:id`
3. **Task Module** — Split into three sub-modules:
   - **TaskDefinition Service** — Create, update, delete task definitions (one-off and recurring). Validates recurrence patterns via Zod. Interface: CRUD endpoints + `generateInstances(dateRange)` method
   - **TaskInstance Service** — Generate instances from definitions for a date range, update status (complete, skip, uncomplete). Interface: `GET /instances?date=` + `PATCH /instances/:id`
   - **TaskAssignment Service** — Assign members to task definitions, manage rotation order, resolve who is assigned for a given date. Interface: assignment CRUD + `getAssignee(taskDefId, date)` method
4. **Calendar Module** — Aggregates task instances for a given date range, filtered by member/category/type. Interface: `GET /calendar?month=&memberId=`
5. **Barter Module** — Create offers, accept/counter offers, track agreement lifecycle (offered → accepted → both completed → closed), compute reputation scores. Interface: REST endpoints + WebSocket events
6. **Rules Module** — Propose rules, open voting, calculate majority (>50% of members), auto-add/remove rules on threshold. Interface: REST endpoints + WebSocket events
7. **Proposals Module** — Create proposals with description/cost/priority, manage lifecycle states, voting with configurable type (simple majority, qualified 2/3, unanimity) and period. Interface: REST endpoints + WebSocket events
8. **WebSocket Gateway** — Manages Socket.io connections per household room (`household:{id}`), broadcasts events to household members, handles subscribe/unsubscribe. Interface: event emitters consumed by other modules
9. **Notification Module** — Push notifications (Firebase Cloud Messaging), in-app notification feed. Triggered by events from other modules. Interface: `send(userId, notification)` method called by modules
10. **Room Sections Module** (Phase 5) — Kitchen: recipes CRUD, cooking status (who's cooking, timer, what's being cooked), cleaning assignment. Bathroom: last cleaned, next assignee, urgency indicator, cleaning checklist. Extensible to other rooms
11. **Expenses Module** (Phase 4) — Common fund contributions/withdrawals, allowance management, income tracking, utility bill assignment, automatic proportional division, balance calculation between members
12. **Voice Module** (Phase 6) — Web Speech API integration, command parsing (complete task, request help, start cooking, query today's tasks), integration with external assistants
13. **IoT Module** (Phase 7) — MQTT broker integration, sensor data ingestion, automation rules engine, bidirectional sync with app state

### Data Model

- **Household** — top-level tenant. All data is household-scoped. Every query filters by `householdId`
- **User** — linked to Supabase Auth via `supabaseId`. Belongs to exactly one household. Role: ADMIN or MEMBER
- **TaskDefinition** — the template for a task. Can be one-off (`isRecurring: false, dueDate: Date`) or recurring (`isRecurring: true, recurrencePattern: JSON`). `recurrencePattern` is validated by Zod schemas in `packages/shared`
- **TaskInstance** — a concrete occurrence of a task on a specific date. Generated by a scheduler from TaskDefinitions. Unique per `(taskDefId, date)`. Status: PENDING → IN_PROGRESS → COMPLETED or SKIPPED
- **TaskAssignment** — links a User to a TaskDefinition, optionally for a specific `dayOfWeek` and with a rotation `order`. Used to resolve "who is responsible on Tuesday?"
- **BarterOffer** (Phase 2) — offered task, wanted task, offered by, status (open/accepted/completed/cancelled), household-scoped
- **Rule** (Phase 3) — title, description, category, proposed by, status (proposed/active/removed), requires majority vote to activate
- **Vote** (Phase 3) — polymorphic (can belong to Rule or Proposal), voter, direction (for/against/abstain)
- **Proposal** (Phase 3) — title, description, estimated cost, priority, lifecycle states, voting type, voting period

### API Contract

- All endpoints prefixed with `/households/:id/` require the authenticated user to be a member of that household
- Response format: `{ data, meta }` for lists (with pagination in `meta`), `{ data }` for single resources
- Error format: `{ error: { code, message, details } }`
- Pagination via query params: `?page=1&limit=20`
- All dates in responses are ISO 8601, interpreted in the household's timezone

### Auth Flow

1. Client authenticates with Supabase Auth (email/password, OAuth, magic link)
2. Supabase returns JWT containing `{ sub: supabaseUserId, email }`
3. Client sends JWT in `Authorization: Bearer <token>` header to NestJS
4. NestJS `AuthGuard` validates JWT against Supabase, extracts `supabaseId`
5. NestJS looks up User by `supabaseId`; if not found, auto-creates (auto-provisioning)
6. Request proceeds with User object attached to request context
7. Household-scoped middleware injects `householdId` from User into all downstream queries

### Offline Strategy

- Service Worker with Workbox (via `next-pwa`)
- Cache-first for static assets, network-first for API data
- Offline queue for mutations (complete task, create barter offer) — replayed on reconnect
- IndexedDB (Dexie.js) for offline data: today's tasks, current month calendar, household members
- All offline mutations are queued and synced when connectivity returns

---

## Testing Decisions

### What makes a good test

- Tests verify **external behavior** (API responses, WebSocket events, UI interactions), not implementation details
- Tests use the same Zod validation schemas that the production code uses — if a schema rejects input, the test confirms the rejection
- Tests are independent: each test sets up its own household, users, and tasks; no shared mutable state between tests
- Tests cover the **household-scoped isolation** boundary: a user from household A must never see household B's data

### Modules to test

| Module | Test Type | Priority |
|--------|-----------|----------|
| **TaskDefinition Service** | Unit (Vitest) | P0 — core domain logic, recurrence pattern validation |
| **TaskInstance Service** | Unit (Vitest) | P0 — instance generation from definitions, status transitions |
| **TaskAssignment Service** | Unit (Vitest) | P0 — rotation resolution, "who's assigned on Tuesday?" |
| **Calendar Module** | Integration (Vitest + DB) | P0 — date range queries, filtering by member/category |
| **Auth Guard** | Unit (Vitest) | P0 — JWT validation, auto-provisioning, household scoping |
| **Barter Module** | Unit + Integration | P1 — offer lifecycle, counter-offer, reputation calculation |
| **Rules Module** | Unit (Vitest) | P1 — majority calculation, rule lifecycle |
| **Proposals Module** | Unit (Vitest) | P1 — voting types, lifecycle transitions |
| **WebSocket Gateway** | Integration | P1 — event broadcasting to household room |
| **E2E: Login → Create Task → Complete** | E2E (Playwright) | P0 — critical path |
| **E2E: Barter Flow** | E2E (Playwright) | P1 — offer → accept → complete |
| **E2E: Rule Voting** | E2E (Playwright) | P1 — propose → vote → majority → rule active |

### Prior art

- No prior tests exist (greenfield project). The test infrastructure will be established as part of Phase 1 scaffolding.

---

## Out of Scope

- **Phase 4+ features** will not be implemented until Phase 1 is complete and stable. The data model accounts for future phases but the UI and API endpoints are Phase 1 only for now
- **Mobile native apps** (iOS/Android) — PWA is the mobile strategy. No React Native or native wrappers
- **Internationalization** beyond Spanish UI — the app targets Spanish-speaking households initially
- **Email notifications** — push notifications and in-app feed only for now
- **Admin dashboard** — no separate admin panel; household ADMIN role has limited extra permissions (manage members, regenerate invite code)
- **Multi-household membership** — a user belongs to exactly one household. Switching or belonging to multiple households is not supported
- **Dark mode** — will be added later; Phase 1 ships light mode only
- **Analytics / usage tracking** — no telemetry or analytics in Phase 1
- **Rate limiting / abuse prevention** — will be added before public launch but not in Phase 1 MVP
- **Data export** — no CSV/JSON export in Phase 1

## Further Notes

- The project follows a **phased delivery model**. Each phase must be complete and stable before the next begins. No jumping ahead.
- All UI text is in **Spanish**; all code (variables, comments, commits) is in **English**.
- All dates and times are displayed in the **household's local timezone** (stored as `timezone` on the Household model, defaulting to `America/Santiago`).
- The **barter system is explicitly not currency-based** — no points, no money, no credits. Only direct task-for-task swaps. This is a core domain constraint that affects data modeling.
- **Rules require majority vote** (>50% of household members) to be added, modified, or removed. This is not an admin-only action. This is a core domain constraint.
- **Recurring tasks are completed per-instance** — marking Tuesday's cooking done does not affect Wednesday's. This is a core domain constraint that drives the TaskDefinition/TaskInstance split.
- The app must be **usable by minors** — simple UI, clear language, allowance tracking in Phase 4.
- The `packages/shared` package is the single source of truth for Zod validation schemas, TypeScript types, and domain constants. Both `apps/web` and `apps/api` import from this package. Never duplicate type definitions.
- The `packages/database` package owns the Prisma schema. Both `apps/api` and `packages/shared` depend on it. The Prisma client is re-exported from this package.
- Full architecture details, ER diagrams, Prisma schema, API endpoints, and WebSocket events are documented in `docs/ARCHITECTURE.md`.