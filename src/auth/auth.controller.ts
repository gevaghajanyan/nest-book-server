import {
  Controller,
  Inject,
  Body,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SingUpDto } from './dto/singUp.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signIn')
  public sigIn(
    @Body() body: SignInDto,
  ) {
    return this.authService.signIn(body);
  }

  @Post('signUp')
  public signUp(
    @Body() body: SingUpDto,
  ) {
    return this.authService.signUp(body);
  }
}
