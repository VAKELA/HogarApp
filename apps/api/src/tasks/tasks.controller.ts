import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TasksService } from './tasks.service';

@Controller('households/:householdId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(
    @Param('householdId') householdId: string,
    @Body() body: { title: string; description?: string; category?: string; priority?: string; isRecurring?: boolean; recurrencePattern?: string; dueDate?: string },
  ) {
    return this.tasksService.create(householdId, body);
  }

  @Get()
  findAll(
    @Param('householdId') householdId: string,
    @Query('category') category?: string,
    @Query('isRecurring') isRecurring?: string,
  ) {
    return this.tasksService.findAll(householdId, {
      category,
      isRecurring: isRecurring === 'true' ? true : isRecurring === 'false' ? false : undefined,
    });
  }

  @Get('today')
  getTodayTasks(@Param('householdId') householdId: string, @Request() req: any) {
    return this.tasksService.getTodayTasks(req.user.id, householdId);
  }

  @Get(':taskId')
  findOne(@Param('taskId') taskId: string) {
    return this.tasksService.findOne(taskId);
  }

  @Patch(':taskId')
  update(@Param('taskId') taskId: string, @Body() body: Record<string, any>) {
    return this.tasksService.update(taskId, body);
  }

  @Delete(':taskId')
  delete(@Param('taskId') taskId: string) {
    return this.tasksService.delete(taskId);
  }

  // Task Instances
  @Get(':householdId/instances')
  getInstances(
    @Param('householdId') householdId: string,
    @Query('date') date: string,
  ) {
    return this.tasksService.getInstances(householdId, date);
  }

  @Patch('instances/:instanceId')
  updateInstance(
    @Param('instanceId') instanceId: string,
    @Body() body: { status?: string; notes?: string },
    @Request() req: any,
  ) {
    return this.tasksService.updateInstance(instanceId, body, req.user.id);
  }

  @Patch('instances/:instanceId/complete')
  completeInstance(@Param('instanceId') instanceId: string, @Request() req: any) {
    return this.tasksService.updateInstance(instanceId, { status: 'COMPLETED' }, req.user.id);
  }

  @Patch('instances/:instanceId/skip')
  skipInstance(@Param('instanceId') instanceId: string, @Request() req: any) {
    return this.tasksService.updateInstance(instanceId, { status: 'SKIPPED' }, req.user.id);
  }

  // Task Assignments
  @Post(':taskId/assignments')
  addAssignment(
    @Param('taskId') taskDefId: string,
    @Body() body: { userId: string; dayOfWeek?: number; order?: number },
  ) {
    return this.tasksService.addAssignment(
      taskDefId,
      body.userId,
      body.dayOfWeek,
      body.order,
    );
  }

  @Delete(':taskId/assignments/:assignmentId')
  removeAssignment(@Param('assignmentId') assignmentId: string) {
    return this.tasksService.removeAssignment(assignmentId);
  }
}
