import { z } from 'zod';

// ─── Recurrence Pattern ──────────────────────────────────

export const recurrencePatternSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('daily'),
    interval: z.number().int().min(1).default(1),
  }),
  z.object({
    type: z.literal('weekly'),
    days: z.array(z.number().int().min(0).max(6)).min(1),
    interval: z.number().int().min(1).default(1),
  }),
  z.object({
    type: z.literal('monthly'),
    dayOfMonth: z.number().int().min(1).max(31),
    interval: z.number().int().min(1).default(1),
  }),
]);

export type RecurrencePattern = z.infer<typeof recurrencePatternSchema>;

// ─── Task ─────────────────────────────────────────────────

export const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  category: z.enum(['COOKING', 'CLEANING', 'SHOPPING', 'MAINTENANCE', 'ORGANIZATION', 'OTHER']).default('OTHER'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  isRecurring: z.boolean().default(false),
  recurrencePattern: recurrencePatternSchema.optional(),
  dueDate: z.string().datetime().optional(),
  assigneeIds: z.array(z.string().uuid()).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const updateTaskInstanceSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED']).optional(),
  notes: z.string().max(500).optional(),
});

// ─── Household ────────────────────────────────────────────

export const createHouseholdSchema = z.object({
  name: z.string().min(1).max(100),
  timezone: z.string().default('America/Santiago'),
});

export const joinHouseholdSchema = z.object({
  inviteCode: z.string().min(1),
});

// ─── User ─────────────────────────────────────────────────

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  avatarUrl: z.string().url().optional(),
});

// ─── Barter (Phase 2) ────────────────────────────────────

export const createBarterOfferSchema = z.object({
  offeredTask: z.string().min(1).max(500),
  wantedTask: z.string().min(1).max(500),
});

// ─── Rule (Phase 3) ──────────────────────────────────────

export const createRuleSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  category: z.enum(['COEXISTENCE', 'CLEANING', 'SCHEDULES', 'VISITS', 'OTHER']).default('OTHER'),
});

// ─── Proposal (Phase 3) ──────────────────────────────────

export const createProposalSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  estimatedCost: z.number().nonnegative().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
});

// ─── Vote ─────────────────────────────────────────────────

export const voteSchema = z.object({
  direction: z.enum(['FOR', 'AGAINST', 'ABSTAIN']),
});

// ─── API Response ─────────────────────────────────────────

export const paginatedQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginatedQuery = z.infer<typeof paginatedQuerySchema>;

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
