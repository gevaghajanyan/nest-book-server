import {
  Controller,
  Inject,
  Body,
  Param,
  Query,
  Delete,
  Post,
  Get,
} from '@nestjs/common';
import {
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { CategoriesQueryDto } from './dto/categories-query.dto';
import { CategoriesDto } from './dto/categories.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  @Inject()
  private readonly categoriesService: CategoriesService;

  @Get()
  @ApiResponse({
    type: CategoriesDto,
    isArray: true,
  })
  public getCategories(
    @Query() query: CategoriesQueryDto,
  ): Promise<CategoriesDto[]> {
    return this.categoriesService.getCategories(query);
  }

  @Post()
  public addCategory(
    @Body() body: CreateCategoriesDto,
  ) {
    return this.categoriesService.addCategory(body);
  }

  @ApiParam({
    name: 'id',
  })
  @Delete(':id')
  public deleteCategory(
    @Param('id') id: string,
  ) {
    return this.categoriesService.deleteCategory(id);
  }
}
