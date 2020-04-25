import {
  Injectable,
  Inject,
} from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateCategoriesDto } from './dto/create-categories.dto';
import { CategoriesQueryDto } from './dto/categories-query.dto';

@Injectable()
export class CategoriesService {
  @Inject('CATEGORY_MODEL')
  private categoryModel: Model<any>;

  public getCategories(params: CategoriesQueryDto) {
    let { page, count } = params;
    page = Number(page);
    count = Number(count);
    return this.categoryModel
      .find()
      .skip(page > 0 ? (page * count) : 0)
      .limit(count)
      .exec();
  }

  public getTotalCount() {
    return null;
  }

  public addCategory(body: CreateCategoriesDto) {
    return this.categoryModel.create(body);
  }

  public deleteCategory(id: string) {
    return this.categoryModel.deleteOne({ _id: id });
  }
}
