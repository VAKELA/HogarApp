import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  me(@Request() req: any) {
    return this.usersService.me(req.user.id);
  }

  @Patch('me')
  update(
    @Body() body: { name?: string; avatarUrl?: string },
    @Request() req: any,
  ) {
    return this.usersService.update(req.user.id, body);
  }
}
