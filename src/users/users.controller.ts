import {
  Controller,
  Inject,
  Param,
  Get,
  Delete,
  Patch,
  Body,
  Put,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
import {
  DeletedDto,
  Pagination,
} from '../models/global';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Inject()
  private readonly usersService: UsersService;

  @Get()
  @ApiOkResponse({
    schema: undefined,
    type: UserDto,
    isArray: true,
  })
  public getUsers(
    @Query() query: Pagination,
  ) {
    return this.usersService.getUsers();
  }

  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  @ApiOkResponse({
    schema: undefined,
    type: UserDto,
  })
  public getUserById(
    @Param('id') id: string,
  ) {
    return this.usersService.getUserById(id);
  }

  @ApiParam({
    name: 'id',
  })
  @Post()
  @ApiOkResponse({
    schema: undefined,
    type: UserDto,
  })
  public createUser(
    @Param('id') id: string,
    @Body('id') body: CreateUserDto,
  ) {
    return this.usersService.updateUserById(id, body);
  }

  @Put(':id')
  @ApiOkResponse({
    schema: undefined,
    type: UserDto,
  })
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  public updateUserById(
    @Param('id') id: string,
    @Body('id') body: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, body);
  }

  @ApiParam({
    name: 'id',
  })
  @Delete(':id')
  @ApiOkResponse({
    schema: {
      example: {
        deleted: 'ok',
      },
    },
    type: DeletedDto,
  })
  public deleteUserById(
    @Param('id') id: string,
  ) {
    return this.usersService.getUserById(id);
  }
}
