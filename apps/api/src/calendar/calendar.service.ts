import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async getMonthView(householdId: string, month: string, memberId?: string) {
    const parts = month.split('-').map(Number);
    const year = parts[0]!;
    const m = parts[1]!;
    const startDate = new Date(year, m - 1, 1);
    const endDate = new Date(year, m, 0, 23, 59, 59);

    return this.prisma.taskInstance.findMany({
      where: {
        taskDef: {
          householdId,
          ...(memberId && {
            assignments: { some: { userId: memberId } },
          }),
        },
        date: { gte: startDate, lte: endDate },
      },
      include: {
        taskDef: true,
        completedBy: { select: { id: true, name: true } },
      },
      orderBy: { date: 'asc' },
    });
  }

  async getWeekView(householdId: string, weekStart: string, memberId?: string) {
    const startDate = new Date(weekStart);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    endDate.setHours(23, 59, 59);

    return this.prisma.taskInstance.findMany({
      where: {
        taskDef: {
          householdId,
          ...(memberId && {
            assignments: { some: { userId: memberId } },
          }),
        },
        date: { gte: startDate, lte: endDate },
      },
      include: {
        taskDef: true,
        completedBy: { select: { id: true, name: true } },
      },
      orderBy: { date: 'asc' },
    });
  }
}
