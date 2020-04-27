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

  @ApiParam({
    name: 'id',
  })
  @Put(':id')
  public editCategory(
    @Param('id') id: string,
    @Body() body: CreateCategoriesDto,
  ) {
    return this.categoriesService.editCategory(id, body);
  }
}
