import {
  Controller,
  Inject,
  Body,
  Param,
  Query,
  Delete,
  Post,
  Put,
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
import {
  CategoriesDto,
  CategoriesList,
} from './dto/categories.dto';
import { DeletedDto } from '../models/global';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  @Inject()
  private readonly categoriesService: CategoriesService;

  @Get()
  @ApiResponse({
    type: CategoriesList,
  })
  public async getCategories(
    @Query() query: CategoriesQueryDto,
  ): Promise<{
    data: CategoriesDto[];
    totalCount: number;
  }> {
    const data = await this.categoriesService.getCategories(query);
    const totalCount = await this.categoriesService.getTotalCount();
    return {
      data,
      totalCount,
    };
  }

  @ApiResponse({
    type: CategoriesDto,
    status: 201,
  })
  @Post()
  public addCategory(
    @Body() body: CreateCategoriesDto,
  ) {
    return this.categoriesService.addCategory(body);
  }

  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    type: CategoriesDto,
    status: 200,
  })
  @Put(':id')
  public editCategory(
    @Param('id') id: string,
    @Body() body: CreateCategoriesDto,
  ) {
    return this.categoriesService.editCategory(id, body);
  }

  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    type: DeletedDto,
    status: 200,
  })
  @Delete(':id')
  public deleteCategory(
    @Param('id') id: string,
  ) {
    return this.categoriesService.deleteCategory(id);
  }
}
