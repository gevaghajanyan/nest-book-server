import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'JWT_SECRET_KEY',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [
    UsersModule,
  ]
})
export class AuthModule {
}
