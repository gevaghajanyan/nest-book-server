import {
  Injectable,
  Inject, BadRequestException, NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { UsersService } from '../users/users.service';
import { SingUpDto } from './dto/singUp.dto';

@Injectable()
export class AuthService {
  @Inject()
  private readonly usersService: UsersService;

  @Inject()
  private readonly jwtService: JwtService;

  public async signIn({ email, password }) {
    const client = await this.usersService.findOne(email);
    if (!client) {
      throw new NotFoundException('INVAlID_USER_NAME');
    }
    const { password: clientPassword } = client;
    if (AuthService.getHash(password) === clientPassword) {
      return this.login(client);
    }
    return new NotFoundException('INVAlID_EMAIL_OR_PASSWORD');
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
    const payload = { username: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  static getHash(password: string): string {
    return crypto
      .createHmac('sha256', process.env.SECRET_KEY)
      .update(password)
      .digest('hex');
  }
}
