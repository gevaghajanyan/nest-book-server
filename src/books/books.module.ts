import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { booksProviders } from './books.providers';
import { DatabaseModule } from '../database.module';
import { FilesModule } from '../files/files.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    FilesModule,
    DatabaseModule,
    CategoriesModule,
  ],
  providers: [
    BooksService,
    ...booksProviders
  ],
  controllers: [BooksController],
})
export class BooksModule {
}
