import { Connection } from 'mongoose';

import { UsersSchema } from './users.schema';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) => connection.model('users', UsersSchema, 'users'),
    inject: ['DATABASE_CONNECTION'],
  },
];
