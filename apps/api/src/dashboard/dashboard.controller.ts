import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('households/:householdId/dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  getDashboard(@Param('householdId') householdId: string, @Request() req: any) {
    return this.dashboardService.getDashboard(req.user.id, householdId);
  }
}
