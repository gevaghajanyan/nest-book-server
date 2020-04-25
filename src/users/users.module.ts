import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database.module';
import { usersProviders } from './users.providers';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    UsersService,
    ...usersProviders,
  ],
  controllers: [UsersController],
  exports: [
    DatabaseModule,
    UsersService,
    ...usersProviders,
  ]
})
export class UsersModule {
}
