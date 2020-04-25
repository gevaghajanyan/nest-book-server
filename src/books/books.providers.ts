import { Connection } from 'mongoose';

import { BooksSchema } from './books.schema';
import { BookInterface } from './interfaces/book.interface';

export const booksProviders = [
  {
    provide: 'BOOKS_MODEL',
    useFactory: (connection: Connection) => connection.model<BookInterface>('books', BooksSchema, 'books'),
    inject: ['DATABASE_CONNECTION'],
  },
];