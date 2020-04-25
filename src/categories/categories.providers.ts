import { Connection } from 'mongoose';

import { CategoriesSchema } from './categories.schema';

export const categoriesProviders = [
  {
    provide: 'CATEGORY_MODEL',
    useFactory: (connection: Connection) => connection.model('category', CategoriesSchema, 'category'),
    inject: ['DATABASE_CONNECTION'],
  },
];