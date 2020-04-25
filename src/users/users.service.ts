import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';

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

  public createUser(user: any) {
    return this.usersModel.create({
      ...user,
      email: user.email.toLowerCase(),
      created: new Date(),
    });
  }
}
