import {
  Controller,
  Inject,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Inject()
  private readonly usersService: UsersService;

  @Get()
  public getUsers() {
    return this.usersService.getUsers();
  }

  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  public getUserById(
    @Param('id') id: string,
  ) {
    return this.usersService.getUserById(id);
  }
}
