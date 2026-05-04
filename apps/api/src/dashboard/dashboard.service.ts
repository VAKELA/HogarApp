import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
    private tasksService: TasksService,
  ) {}

  async getDashboard(userId: string, householdId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Ensure instances exist for today
    await this.tasksService.generateInstances(householdId, today, tomorrow);

    // Get today's task instances
    const tasks = await this.prisma.taskInstance.findMany({
      where: {
        taskDef: { householdId },
        date: { gte: today, lt: tomorrow },
      },
      include: {
        taskDef: { include: { assignments: { include: { user: true } } } },
        completedBy: { select: { id: true, name: true, avatarUrl: true } },
      },
      orderBy: [{ taskDef: { priority: 'desc' } }, { createdAt: 'asc' }],
    });

    // Calculate progress
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'COMPLETED').length;
    const skipped = tasks.filter(t => t.status === 'SKIPPED').length;

    // Get household members for context
    const members = await this.prisma.user.findMany({
      where: { householdId },
      select: { id: true, name: true, avatarUrl: true, role: true },
    });

    return {
      date: today.toISOString(),
      tasks,
      progress: { total, completed, skipped, pending: total - completed - skipped },
      members,
    };
  }
}
