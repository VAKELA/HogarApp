import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface RecurrencePattern {
  type: 'daily' | 'weekly' | 'monthly';
  interval?: number;
  days?: number[];
  dayOfMonth?: number;
}

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(householdId: string, data: {
    title: string;
    description?: string;
    category?: string;
    priority?: string;
    isRecurring?: boolean;
    recurrencePattern?: string;
    dueDate?: string;
  }) {
    return this.prisma.taskDefinition.create({
      data: {
        householdId,
        title: data.title,
        description: data.description,
        category: data.category as any || 'OTHER',
        priority: data.priority as any || 'MEDIUM',
        isRecurring: data.isRecurring ?? false,
        recurrencePattern: data.recurrencePattern,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  }

  async findAll(householdId: string, filters?: {
    category?: string;
    isRecurring?: boolean;
  }) {
    return this.prisma.taskDefinition.findMany({
      where: {
        householdId,
        ...(filters?.category && { category: filters.category as any }),
        ...(filters?.isRecurring !== undefined && { isRecurring: filters.isRecurring }),
      },
      include: { assignments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.taskDefinition.findUnique({
      where: { id },
      include: { assignments: { include: { user: true } } },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, data: Record<string, any>) {
    return this.prisma.taskDefinition.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.taskDefinition.delete({ where: { id } });
  }

  // Task Instances
  async getInstances(householdId: string, date: string) {
    const targetDate = new Date(date);
    return this.prisma.taskInstance.findMany({
      where: {
        taskDef: { householdId },
        date: {
          gte: new Date(targetDate.setHours(0, 0, 0, 0)),
          lt: new Date(targetDate.setHours(23, 59, 59, 999)),
        },
      },
      include: {
        taskDef: true,
        completedBy: { select: { id: true, name: true } },
      },
    });
  }

  async updateInstance(id: string, data: {
    status?: string;
    notes?: string;
  }, userId?: string) {
    const updateData: Record<string, any> = {};
    if (data.status) {
      updateData.status = data.status as any;
      if (data.status === 'COMPLETED') {
        updateData.completedAt = new Date();
        updateData.completedById = userId;
      }
    }
    if (data.notes) updateData.notes = data.notes;

    return this.prisma.taskInstance.update({
      where: { id },
      data: updateData,
    });
  }

  // Task Assignments
  async addAssignment(taskDefId: string, userId: string, dayOfWeek?: number, order?: number) {
    return this.prisma.taskAssignment.create({
      data: {
        taskDefId,
        userId,
        dayOfWeek,
        order,
      },
    });
  }

  async removeAssignment(assignmentId: string) {
    return this.prisma.taskAssignment.delete({
      where: { id: assignmentId },
    });
  }

  // ─── Instance Generation ────────────────────────────────────

  /**
   * Ensure task instances exist for every day in [startDate, endDate)
   * based on recurrence patterns and one-off dueDates.
   * Returns all instances in the range.
   */
  async generateInstances(householdId: string, startDate: Date, endDate: Date) {
    const taskDefs = await this.prisma.taskDefinition.findMany({
      where: { householdId },
    });

    // Fetch existing instances in range to avoid duplicates
    const existingInstances = await this.prisma.taskInstance.findMany({
      where: {
        taskDef: { householdId },
        date: { gte: startDate, lt: endDate },
      },
      select: { taskDefId: true, date: true },
    });

    const existingKeys = new Set(
      existingInstances.map(
        i => `${i.taskDefId}_${this.normalizeDate(i.date).toISOString()}`,
      ),
    );

    const toCreate: { taskDefId: string; date: Date }[] = [];
    const current = new Date(startDate);

    // Walk each day in the range
    while (current < endDate) {
      const dayStart = this.normalizeDate(current);

      for (const taskDef of taskDefs) {
        if (taskDef.isRecurring && taskDef.recurrencePattern) {
          const pattern: RecurrencePattern = JSON.parse(taskDef.recurrencePattern);
          if (this.matchesRecurrence(pattern, dayStart, taskDef.createdAt)) {
            const key = `${taskDef.id}_${dayStart.toISOString()}`;
            if (!existingKeys.has(key)) {
              toCreate.push({ taskDefId: taskDef.id, date: new Date(dayStart) });
            }
          }
        }
      }

      current.setDate(current.getDate() + 1);
    }

    // Handle one-off tasks with dueDate in the range
    for (const taskDef of taskDefs) {
      if (!taskDef.isRecurring && taskDef.dueDate) {
        const dueDate = this.normalizeDate(taskDef.dueDate);
        if (dueDate >= startDate && dueDate < endDate) {
          const key = `${taskDef.id}_${dueDate.toISOString()}`;
          if (!existingKeys.has(key)) {
            toCreate.push({ taskDefId: taskDef.id, date: new Date(dueDate) });
          }
        }
      }
    }

    // Batch create missing instances
    if (toCreate.length > 0) {
      await this.prisma.taskInstance.createMany({
        data: toCreate,
        skipDuplicates: true,
      });
    }

    // Return all instances for the range
    return this.prisma.taskInstance.findMany({
      where: {
        taskDef: { householdId },
        date: { gte: startDate, lt: endDate },
      },
      include: {
        taskDef: { include: { assignments: { include: { user: true } } } },
        completedBy: { select: { id: true, name: true } },
      },
      orderBy: [{ taskDef: { priority: 'desc' } }, { date: 'asc' }],
    });
  }

  /** Get today's tasks for the dashboard (ensure instances exist first). */
  async getTodayTasks(userId: string, householdId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Ensure instances exist for today
    await this.generateInstances(householdId, today, tomorrow);

    // Get all instances for today
    return this.prisma.taskInstance.findMany({
      where: {
        taskDef: { householdId },
        date: { gte: today, lt: tomorrow },
      },
      include: {
        taskDef: { include: { assignments: { include: { user: true } } } },
        completedBy: { select: { id: true, name: true } },
      },
      orderBy: [{ taskDef: { priority: 'desc' } }, { date: 'asc' }],
    });
  }

  // ─── Private Helpers ────────────────────────────────────────

  private normalizeDate(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private matchesRecurrence(pattern: RecurrencePattern, date: Date, createdAt: Date): boolean {
    switch (pattern.type) {
      case 'daily': {
        const interval = pattern.interval || 1;
        if (interval === 1) return true;
        const diffDays = Math.floor(
          (date.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24),
        );
        return diffDays >= 0 && diffDays % interval === 0;
      }
      case 'weekly': {
        const days = pattern.days || [];
        return days.includes(date.getDay());
      }
      case 'monthly': {
        return date.getDate() === pattern.dayOfMonth;
      }
      default:
        return false;
    }
  }
}
