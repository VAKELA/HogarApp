# HogarApp — Arquitectura Técnica

## Stack Tecnológico (Confirmado)

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| **Frontend** | Next.js 15 (App Router) | SSR/SSG, PWA, gran ecosistema React |
| **Backend** | NestJS | TypeScript end-to-end, modular, WebSocket nativo |
| **Base de datos** | Supabase (PostgreSQL) | Auth + DB + Storage + Realtime integrados |
| **ORM** | Prisma | Schema declarativo, migraciones, tipos compartidos |
| **Tiempo real** | Socket.io (NestJS Gateway) | Control total sobre eventos, timers, estado en vivo |
| **Auth** | Supabase Auth | JWT, OAuth, magic links, manejo de sesiones |
| **Monorepo** | Turborepo | Builds paralelos, tipos compartidos, una fuente de verdad |
| **Deploy frontend** | Vercel | Integración nativa con Next.js, preview deploys |
| **Deploy backend** | Railway | Soporte WebSocket persistente, buen DX, PostgreSQL compatible |
| **Validación** | Zod | Compartido entre frontend y backend vía paquete shared |

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    Cliente (Navegador)                   │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              Next.js PWA (App Router)               │ │
│  │  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌──────┐ │ │
│  │  │Dashboard │ │Calendario│ │  Trueque   │ │Reglas│ │ │
│  │  └──────────┘ └──────────┘ └───────────┘ └──────┘ │ │
│  └─────────────────────────────────────────────────────┘ │
│           │ HTTP/REST          │ WebSocket (Socket.io)   │
└───────────┼────────────────────┼─────────────────────────┘
            │                    │
┌───────────┼────────────────────┼─────────────────────────┐
│           ▼                    ▼                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              NestJS API Server                       │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐ │ │
│  │  │Auth    │ │Tasks   │ │Barter  │ │  WebSocket   │ │ │
│  │  │Guard   │ │Module  │ │Module  │ │  Gateway     │ │ │
│  │  └────────┘ └────────┘ └────────┘ └──────────────┘ │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐ │ │
│  │  │Household│ │Calendar│ │Rules   │ │  Proposals   │ │ │
│  │  │Module  │ │Module  │ │Module  │ │  Module      │ │ │
│  │  └────────┘ └────────┘ └────────┘ └──────────────┘ │ │
│  └─────────────────────────────────────────────────────┘ │
│           │ Prisma Client                                │
└───────────┼──────────────────────────────────────────────┘
            │
┌───────────┼──────────────────────────────────────────────┐
│           ▼                                              │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              Supabase (PostgreSQL)                   │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐│ │
│  │  │   Auth   │ │ Database │ │  Storage (avatars,   ││ │
│  │  │  Service │ │ (Prisma) │ │  recetas, etc.)      ││ │
│  │  └──────────┘ └──────────┘ └──────────────────────┘│ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### Flujo de datos

1. **Cliente → NestJS**: Llamadas REST para CRUD (crear tarea, completar instancia, votar regla)
2. **NestJS → Supabase**: Prisma para operaciones de base de datos, Supabase Admin SDK para gestión de usuarios
3. **NestJS → Cliente (WebSocket)**: Eventos en tiempo real (tarea completada, alguien cocinando, nueva votación)
4. **Cliente → Supabase Auth**: Login, registro, gestión de sesión directamente (no pasa por NestJS)
5. **NestJS valida JWT de Supabase** en cada request para autenticar al usuario

---

## Estructura del Proyecto (Monorepo)

```
hogar-app/
├── apps/
│   ├── web/                    # Next.js 15 (App Router, PWA)
│   │   ├── src/
│   │   │   ├── app/            # Rutas y páginas
│   │   │   │   ├── (auth)/     # Login, registro
│   │   │   │   ├── (app)/      # Dashboard, calendario, tareas
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── calendar/
│   │   │   │   │   ├── tasks/
│   │   │   │   │   ├── barter/
│   │   │   │   │   ├── rules/
│   │   │   │   │   └── proposals/
│   │   │   │   └── layout.tsx
│   │   │   ├── components/     # Componentes UI
│   │   │   │   ├── ui/         # Componentes base (shadcn/ui)
│   │   │   │   ├── tasks/      # Componentes de dominio
│   │   │   │   ├── calendar/
│   │   │   │   └── barter/
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── lib/            # Utilidades, API client, WebSocket client
│   │   │   └── providers/     # Context providers (auth, theme, socket)
│   │   ├── public/             # PWA manifest, service worker, icons
│   │   ├── next.config.ts
│   │   └── package.json
│   │
│   └── api/                    # NestJS backend
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── auth/           # Auth guard, Supabase JWT validation
│       │   ├── households/     # Household CRUD, invitaciones
│       │   ├── users/          # Perfiles, membresía
│       │   ├── tasks/          # Task definitions, instances, assignments
│       │   ├── calendar/       # Calendar queries, task instances por fecha
│       │   ├── barter/         # Trueque de tareas
│       │   ├── rules/          # Reglas del hogar, votaciones
│       │   ├── proposals/      # Propuestas, votaciones
│       │   ├── notifications/  # Push notifications, in-app
│       │   └── gateway/        # WebSocket gateway (Socket.io)
│       ├── prisma/
│       │   └── schema.prisma
│       ├── nest-cli.json
│       └── package.json
│
├── packages/
│   ├── shared/                  # Tipos y constantes compartidos
│   │   ├── src/
│   │   │   ├── types/          # DTOs, interfaces, enums
│   │   │   ├── constants/      # Categorías, roles, estados
│   │   │   └── validation/    # Zod schemas compartidos
│   │   └── package.json
│   │
│   └── database/               # Prisma schema y migraciones
│       ├── prisma/
│       │   └── schema.prisma
│       ├── src/
│       │   └── index.ts        # Re-exporta PrismaClient
│       └── package.json
│
├── turbo.json                   # Turborepo config
├── package.json                  # Workspace root
├── tsconfig.base.json           # Base TS config compartido
└── .env.example                 # Variables de entorno template
```

### Notas sobre la estructura

- **`packages/database`** centraliza el schema de Prisma. Tanto `api` como `shared` dependen de este paquete.
- **`packages/shared`** exporta tipos, enums y schemas de Zod que `web` y `api` importan. Los tipos se derivan del schema de Prisma vía `packages/database`.
- **`apps/api/prisma/`** es un symlink o referencia a `packages/database/prisma/` — una sola fuente de verdad para el schema.
- **No hay API routes en Next.js** — toda la lógica de negocio vive en NestJS. Next.js solo maneja UI y auth callbacks.

---

## Modelo de Datos — Fase 1

### Diagrama ER

```
┌──────────────┐     ┌──────────────┐     ┌───────────────────┐
│  Household   │────<│     User      │     │  TaskDefinition   │
│──────────────│     │──────────────│     │───────────────────│
│ id           │     │ id           │────>│ id                │
│ name         │     │ email        │     │ title             │
│ inviteCode   │     │ name         │     │ description       │
│ timezone     │     │ avatarUrl    │     │ category          │
│ createdAt    │     │ role         │     │ priority          │
└──────────────┘     │ householdId  │     │ isRecurring       │
                     └──────────────┘     │ recurrencePattern │
                           │              │ dueDate           │
                           │              │ householdId       │
                           │              └───────────────────┘
                           │                      │
                     ┌─────┴──────┐          ┌────┴──────────────┐
                     │            │          │                     │
              ┌──────┴───┐  ┌────┴────────┐ │  ┌────────────────┴┐
              │TaskAssign │  │ BarterOffer  │ │  │  TaskInstance    │
              │──────────│  │─────────────│ │  │─────────────────│
              │ id       │  │ id          │ │  │ id              │
              │ taskDefId │  │ offeredBy   │ │  │ taskDefId       │
              │ userId   │  │ offeredTask │ │  │ date            │
              │ dayOfWeek│  │ wantedTask │ │  │ status          │
              │ order    │  │ status     │ │  │ completedAt     │
              └──────────┘  │ householdId│ │  │ completedBy     │
                            └─────────────┘ │  └─────────────────┘
                                            │
                                            └──> (generadas por scheduler)
```

### Schema Prisma — Fase 1

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Household ───────────────────────────────────────────

model Household {
  id         String   @id @default(uuid())
  name       String
  inviteCode String   @unique @default(cuid())
  timezone   String   @default("America/Santiago")
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  members    User[]
  tasks      TaskDefinition[]
  rules      Rule[]
  proposals  Proposal[]

  @@map("households")
}

// ─── User ─────────────────────────────────────────────────

enum UserRole {
  ADMIN
  MEMBER
}

model User {
  id           String   @id @default(uuid())
  supabaseId   String   @unique // referencia a auth.users en Supabase
  email        String   @unique
  name         String
  avatarUrl    String?
  role         UserRole @default(MEMBER)
  householdId  String
  household    Household @relation(fields: [householdId], references: [id], onDelete: Cascade)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  taskAssignments TaskAssignment[]
  barterOffers    BarterOffer[]
  completedInstances TaskInstance[] @relation("CompletedBy")

  @@map("users")
}

// ─── Task Definition ──────────────────────────────────────

enum TaskCategory {
  COOKING
  CLEANING
  SHOPPING
  MAINTENANCE
  ORGANIZATION
  OTHER
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

model TaskDefinition {
  id          String        @id @default(uuid())
  title       String
  description String?
  category    TaskCategory  @default(OTHER)
  priority    TaskPriority  @default(MEDIUM)
  householdId String
  household   Household     @relation(fields: [householdId], references: [id], onDelete: Cascade)

  // Recurrencia
  isRecurring      Boolean  @default(false)
  recurrencePattern String?  // JSON: { "type": "weekly", "days": [1,3], "interval": 1 }

  // Para tareas one-off
  dueDate DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  instances    TaskInstance[]
  assignments  TaskAssignment[]

  @@map("task_definitions")
}

// ─── Task Instance ────────────────────────────────────────

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  SKIPPED
}

model TaskInstance {
  id           String       @id @default(uuid())
  taskDefId    String
  taskDef      TaskDefinition @relation(fields: [taskDefId], references: [id], onDelete: Cascade)
  date         DateTime     // Fecha específica de esta instancia
  status       TaskStatus   @default(PENDING)
  completedAt  DateTime?
  completedById String?
  completedBy  User?        @relation("CompletedBy", fields: [completedById], references: [id])
  notes        String?
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt

  @@unique([taskDefId, date]) // Una instancia por tarea por día
  @@map("task_instances")
}

// ─── Task Assignment ──────────────────────────────────────

model TaskAssignment {
  id         String         @id @default(uuid())
  taskDefId  String
  taskDef    TaskDefinition @relation(fields: [taskDefId], references: [id], onDelete: Cascade)
  userId     String
  user       User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  dayOfWeek  Int?           // 0=Dom, 1=Lun, ..., 6=Sab (para asignaciones por día)
  order      Int?           // Posición en la rotación
  createdAt  DateTime       @default(now())

  @@unique([taskDefId, userId, dayOfWeek]) // No duplicar asignaciones
  @@map("task_assignments")
}
```

### Decisiones de modelo

- **TaskDefinition vs TaskInstance**: Las tareas recurrentes generan instancias por día. Marcar "cocinar el martes" completa la instancia, no la definición.
- **recurrencePattern como JSON**: Permite flexibilidad (diario, días específicos, mensual) sin tablas adicionales. Se valida con Zod en `packages/shared`.
- **householdId en todo**: Todas las entidades pertenecen a un hogar. Los queries siempre filtran por `householdId` para garantizar aislamiento.
- **inviteCode en Household**: Para que nuevos miembros se unan con un código simple.
- **supabaseId en User**: Vincula el usuario de la app con la cuenta de auth de Supabase.

---

## Autenticación

### Flujo

```
1. Usuario se registra/loguea vía Supabase Auth (email, OAuth, magic link)
2. Supabase devuelve JWT con { sub: supabaseUserId, email }
3. Cliente envía JWT en Authorization header a NestJS
4. NestJS AuthGuard valida el JWT contra Supabase
5. NestJS busca User en DB por supabaseId; si no existe, lo crea (auto-provisioning)
6. Request continúa con el User adjunto al contexto
```

### Reglas

- **Registro**: Crea un Household automáticamente o se une con inviteCode
- **Unirse a hogar**: El usuario existente ingresa el inviteCode del hogar
- **Roles**: ADMIN (creador del hogar) puede gestionar miembros; MEMBER es rol por defecto
- **Household scope**: Cada request está acotada al household del usuario autenticado. NestJS lo inyecta vía middleware.

---

## API REST — Fase 1

### Endpoints

```
# Auth (manejado por Supabase directamente)
POST   /auth/callback          # Supabase auth callback

# Households
POST   /households             # Crear hogar (auto al registrarse)
GET    /households/:id         # Info del hogar
PATCH  /households/:id         # Actualizar hogar
POST   /households/join        # Unirse con inviteCode
POST   /households/:id/invite  # Regenerar inviteCode

# Users
GET    /users/me               # Perfil propio
PATCH  /users/me               # Actualizar perfil
GET    /households/:id/members # Lista de miembros del hogar

# Task Definitions
POST   /households/:id/tasks              # Crear tarea
GET    /households/:id/tasks              # Listar tareas (filtros: category, isRecurring)
GET    /households/:id/tasks/:taskId      # Detalle de tarea
PATCH  /households/:id/tasks/:taskId      # Actualizar tarea
DELETE /households/:id/tasks/:taskId      # Eliminar tarea

# Task Instances
GET    /households/:id/instances?date=YYYY-MM-DD  # Instancias de un día
PATCH  /households/:id/instances/:id               # Actualizar estado (completar, skip)

# Task Assignments
POST   /households/:id/tasks/:taskId/assignments    # Asignar miembro
DELETE /households/:id/tasks/:taskId/assignments/:id # Remover asignación
PATCH  /households/:id/tasks/:taskId/assignments/reorder # Reordenar rotación

# Calendar
GET    /households/:id/calendar?month=YYYY-MM&memberId=  # Vista mensual
GET    /households/:id/calendar?week=YYYY-MM-DD&memberId= # Vista semanal
```

### Convenciones

- Todos los endpoints bajo `/households/:id/` requieren que el usuario autenticado sea miembro de ese hogar.
- Respuestas en JSON con estructura consistente: `{ data, meta }` para listas, `{ data }` para individuales.
- Errores con formato: `{ error: { code, message, details } }`.
- Paginación vía query params: `?page=1&limit=20`.

---

## Tiempo Real — WebSocket

### Canales por hogar

Cada hogar tiene un canal Socket.io: `household:{householdId}`. Los miembros se conectan al canal de su hogar al autenticarse.

### Eventos — Fase 1

```typescript
// Servidor → Cliente
"task:updated"        // Tarea creada, modificada o eliminada
"instance:completed"   // Alguien completó una instancia de tarea
"instance:updated"    // Estado de instancia cambió (skip, uncomplete)

// Cliente → Servidor
"task:subscribe"      // Unirse al canal del hogar
"task:unsubscribe"    // Salir del canal
```

### Eventos — Fases futuras

```typescript
// Fase 2: Trueque
"barter:created"      // Nueva oferta de trueque
"barter:accepted"     // Alguien aceptó un trueque
"barter:completed"    // Trueque completado

// Fase 3: Gobernanza
"rule:proposed"       // Nueva regla propuesta
"rule:voted"          // Voto en regla
"proposal:created"    // Nueva propuesta
"proposal:voted"      // Voto en propuesta

// Fase 5: Habitaciones
"cooking:started"     // Alguien empezó a cocinar
"cooking:timer"       // Actualización de timer
"cooking:finished"    // Cocina liberada
```

---

## PWA y Offline

### Estrategia

- **Service Worker** con Workbox (integrado en Next.js vía `next-pwa`)
- **Cache-first** para assets estáticos (JS, CSS, imágenes, fuentes)
- **Network-first** para datos de la API (siempre intentar fresco, fallback a cache)
- **Offline queue** para acciones del usuario (completar tarea, crear oferta) — se sincronizan al reconectar
- **IndexedDB** (vía Dexie.js) para datos offline: tareas del día, calendario del mes actual

### Datos offline prioritarios (Fase 1)

- Tareas del día de hoy (dashboard)
- Calendario del mes actual
- Lista de miembros del hogar
- Acciones pendientes de sincronizar (cola offline)

---

## Deploy

### Diagrama

```
                    ┌─────────────┐
                    │   Vercel    │
                    │  (Next.js)  │
                    └──────┬──────┘
                           │ HTTPS
                    ┌──────┴──────┐
                    │  Railway    │
                    │  (NestJS)   │
                    └──────┬──────┘
                           │ Prisma
                    ┌──────┴──────┐
                    │  Supabase   │
                    │ (PostgreSQL)│
                    └─────────────┘
```

### Configuración

- **Vercel**: Deploy automático desde `main`. Preview deploys desde PRs.
- **Railway**: Deploy automático desde `main`. Variables de entorno para `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CORS_ORIGIN`.
- **Supabase**: Proyecto único con PostgreSQL, Auth, Storage. Migraciones Prisma aplicadas desde Railway.
- **CORS**: NestJS permite requests solo desde el dominio de Vercel.
- **Dominio**: `hogarapp.cl` (o similar). Frontend en `hogarapp.cl`, API en `api.hogarapp.cl`.

---

## Testing

### Estrategia

| Tipo | Herramienta | Alcance |
|------|-------------|---------|
| **Unit** | Vitest | Lógica de negocio, servicios NestJS, hooks React |
| **Integration** | Vitest + Supabase local | API endpoints con DB real |
| **E2E** | Playwright | Flujos críticos: login, crear tarea, completar tarea, trueque |
| **Contract** | Zod schemas | Validación compartida frontend/backend |

### Prioridad de tests por fase

- **Fase 1**: Task CRUD, assignment rotation, instance generation, calendar queries
- **Fase 2**: Barter flow (offer → accept → complete), reputation calculation
- **Fase 3**: Voting majority calculation, rule lifecycle

---

## Decisiones Arquitectónicas Clave

| Decisión | Elección | Razón |
|----------|----------|-------|
| Monorepo vs repos separados | **Monorepo (Turborepo)** | Tipos compartidos, cambios atómicos, una fuente de verdad |
| API routes vs backend separado | **NestJS separado** | WebSocket persistente, lógica de negocio centralizada, no acoplada al frontend |
| REST vs GraphQL | **REST** | Suficiente para el dominio, más simple de implementar y depurar |
| Supabase Auth vs custom | **Supabase Auth** | No reinventar auth, JWT validado en NestJS, OAuth listo |
| Socket.io vs Supabase Realtime | **Socket.io** | Control total sobre eventos custom (timers, cooking status), no limitado a DB changes |
| Prisma vs Drizzle vs TypeORM | **Prisma** | Schema declarativo, migraciones automáticas, tipos generados, excelente DX |
| Zod vs Joi vs Yup | **Zod** | Inferencia de tipos TypeScript, compartido entre frontend y backend |
| Estado en frontend | **React Query + Zustand** | React Query para server state, Zustand para client state (auth, UI) |
| Componentes UI | **shadcn/ui** | Accesible, customisable, copia el código al proyecto, sin dependencia externa |