import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { HouseholdsService } from './households.service';

@Controller('households')
@UseGuards(AuthGuard)
export class HouseholdsController {
  constructor(private householdsService: HouseholdsService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.householdsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; timezone?: string },
    @Request() req: any,
  ) {
    return this.householdsService.update(id, body);
  }

  @Post(':id/invite')
  regenerateInviteCode(@Param('id') id: string) {
    return this.householdsService.regenerateInviteCode(id);
  }

  @Post('join')
  join(@Body() body: { inviteCode: string }, @Request() req: any) {
    return this.householdsService.join(req.user.id, body.inviteCode);
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string) {
    return this.householdsService.getMembers(id);
  }
}
