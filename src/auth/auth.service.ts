import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { SingUpDto } from './dto/singUp.dto';
import { getHash } from '../code/helpers/paswortHash';

@Injectable()
export class AuthService {
  @Inject()
  private readonly usersService: UsersService;

  @Inject()
  private readonly jwtService: JwtService;

  public async signIn({ email, password }) {
    const client = await this.usersService.findOne(email);
    if (!client) {
      throw new BadRequestException('INVAlID_USER_NAME');
    }
    const { password: clientPassword } = client;
    if (getHash(password) === clientPassword) {
      return this.login(client);
    }
    throw new BadRequestException('INVAlID_EMAIL_OR_PASSWORD');
  }

  public async signUp(body: SingUpDto) {
    const { email } = body;
    const client = await this.usersService.findOne(email);
    if (client) {
      throw new BadRequestException('INVAlID_USER_NAME');
    }

    return this.usersService.createUser(body);
  }

  private async login(user: any) {
    const payload = { firstName: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
      expirationDate: 300,
    };
  }
}
