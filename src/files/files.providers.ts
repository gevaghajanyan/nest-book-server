import { Connection } from 'mongoose';

import { FilesSchema } from './files.schema';

export const filesProviders = [
  {
    provide: 'FILES_MODEL',
    useFactory: (connection: Connection) => connection.model('fs', FilesSchema, 'fs'),
    inject: ['DATABASE_CONNECTION'],
  },
];