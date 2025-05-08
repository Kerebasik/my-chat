import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../generated/prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 0,
    /* eslint-disable */
    @Query('orderBy') orderBy: string | undefined,
    @Query('where') where: string | undefined,
    /* eslint-enable */
  ): Promise<User[] | []> {
    return this.usersService.users({
      skip: Number(limit * page),
      take: Number(limit),
    });
  }

  @Get(':id')
  getProfile(@Param('id') id: number): Promise<User | null> {
    return this.usersService.user({ id: Number(id) });
  }
}
