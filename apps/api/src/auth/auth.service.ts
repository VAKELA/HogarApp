import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private prisma: PrismaService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    );
  }

  async validateToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException('Invalid token');
    }

    return data.user;
  }

  async findOrCreateUser(supabaseId: string, email: string) {
    let user = await this.prisma.user.findUnique({
      where: { supabaseId },
    });

    if (!user) {
      // Auto-provision: create household for new user
      const household = await this.prisma.household.create({
        data: { name: 'Mi Hogar' },
      });

      user = await this.prisma.user.create({
        data: {
          supabaseId,
          email,
          name: email.split('@')[0] ?? email,
          role: 'ADMIN',
          householdId: household.id,
        },
      });
    }

    return user;
  }
}
