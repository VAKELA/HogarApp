import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HouseholdsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const household = await this.prisma.household.findUnique({ where: { id } });
    if (!household) throw new NotFoundException('Household not found');
    return household;
  }

  async update(id: string, data: { name?: string; timezone?: string }) {
    return this.prisma.household.update({ where: { id }, data });
  }

  async regenerateInviteCode(id: string) {
    // Generate a simple unique code using crypto
    const crypto = await import('node:crypto');
    const code = crypto.randomUUID().slice(0, 8);
    return this.prisma.household.update({
      where: { id },
      data: { inviteCode: code },
    });
  }

  async join(userId: string, inviteCode: string) {
    const household = await this.prisma.household.findUnique({
      where: { inviteCode },
    });
    if (!household) throw new NotFoundException('Invalid invite code');

    await this.prisma.user.update({
      where: { id: userId },
      data: { householdId: household.id },
    });

    return household;
  }

  async getMembers(householdId: string) {
    return this.prisma.user.findMany({
      where: { householdId },
      select: { id: true, name: true, email: true, avatarUrl: true, role: true },
    });
  }
}
