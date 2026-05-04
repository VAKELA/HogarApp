import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
