import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { booksProviders } from './books.providers';
import { DatabaseModule } from '../database.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    FilesModule,
    DatabaseModule,
  ],
  providers: [
    BooksService,
    ...booksProviders,
  ],
  controllers: [BooksController],
})
export class BooksModule {
}
