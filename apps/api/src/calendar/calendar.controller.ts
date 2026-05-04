import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CalendarService } from './calendar.service';

@Controller('households/:householdId/calendar')
@UseGuards(AuthGuard)
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  getCalendar(
    @Param('householdId') householdId: string,
    @Query('month') month?: string,
    @Query('week') week?: string,
    @Query('memberId') memberId?: string,
  ) {
    if (month) {
      return this.calendarService.getMonthView(householdId, month, memberId);
    }
    if (week) {
      return this.calendarService.getWeekView(householdId, week, memberId);
    }
    // Default to current month
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return this.calendarService.getMonthView(householdId, currentMonth, memberId);
  }
}
