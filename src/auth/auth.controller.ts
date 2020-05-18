import {
  Controller,
  Inject,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SingUpDto } from './dto/singUp.dto';
import { SignInResponseDto } from './dto/signInResponse.dto';
import { SingUpResponseDto } from './dto/singUpResponse.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signIn')
  @ApiOkResponse({
    schema: undefined,
    type: SignInResponseDto,
  })
  public sigIn(
    @Body() body: SignInDto,
  ) {
    return this.authService.signIn(body);
  }

  @Post('signUp')
  @ApiOkResponse({
    schema: undefined,
    type: SingUpResponseDto,
  })
  public signUp(
    @Body() body: SingUpDto,
  ) {
    return this.authService.signUp(body);
  }
}
