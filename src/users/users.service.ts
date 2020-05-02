import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { getHash } from '../code/helpers/paswortHash';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  @Inject('USERS_MODEL')
  private readonly usersModel: Model<any>;

  public getUsers() {
    return this.usersModel.find().exec();
  }

  public getUserById(id: string) {
    return this.usersModel.findOne({ _id: id });
  }

  public findOne(email: string) {
    return this.usersModel.findOne({ email: email.toLowerCase() });
  }

  public createUser(user: UserInterface) {
    return this.usersModel.create({
      ...user,
      password: getHash(user.password),
      email: user.email.toLowerCase(),
      created: new Date(),
    });
  }
}
