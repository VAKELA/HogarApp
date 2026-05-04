// Task categories
export const TASK_CATEGORIES = ['COOKING', 'CLEANING', 'SHOPPING', 'MAINTENANCE', 'ORGANIZATION', 'OTHER'] as const;
export type TaskCategory = (typeof TASK_CATEGORIES)[number];

// Task priorities
export const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

// Task statuses
export const TASK_STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

// User roles
export const USER_ROLES = ['ADMIN', 'MEMBER'] as const;
export type UserRole = (typeof USER_ROLES)[number];

// Rule categories
export const RULE_CATEGORIES = ['COEXISTENCE', 'CLEANING', 'SCHEDULES', 'VISITS', 'OTHER'] as const;
export type RuleCategory = (typeof RULE_CATEGORIES)[number];

// Rule statuses
export const RULE_STATUSES = ['PROPOSED', 'ACTIVE', 'REMOVED'] as const;
export type RuleStatus = (typeof RULE_STATUSES)[number];

// Proposal statuses
export const PROPOSAL_STATUSES = ['PROPOSED', 'VOTING', 'APPROVED', 'REJECTED', 'IN_EXECUTION', 'COMPLETED'] as const;
export type ProposalStatus = (typeof PROPOSAL_STATUSES)[number];

// Proposal priorities
export const PROPOSAL_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;
export type ProposalPriority = (typeof PROPOSAL_PRIORITIES)[number];

// Barter statuses
export const BARTER_STATUSES = ['OPEN', 'ACCEPTED', 'COMPLETED', 'CANCELLED'] as const;
export type BarterStatus = (typeof BARTER_STATUSES)[number];

// Days of week (0=Sunday, matching JS Date)
export const DAYS_OF_WEEK = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'] as const;
export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

// Default timezone
export const DEFAULT_TIMEZONE = 'America/Santiago';
