import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { DatabaseModule } from '../database.module';
import { categoriesProviders } from './categories.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    CategoriesService,
    ...categoriesProviders,
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {
}
