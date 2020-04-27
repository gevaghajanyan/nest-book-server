import {
  Controller,
  Inject,
  UseInterceptors,
  Body,
  Param,
  Query,
  UploadedFiles,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { BooksService } from './books.service';
import { GetBookQueryDto } from './dto/get-book-query.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  @Inject()
  private readonly booksService: BooksService;

  @Get()
  public async getBooks(
    @Query() query: GetBookQueryDto,
  ) {
    const data = await this.booksService.getBooks(query);
    const totalCount = await this.booksService.getTotalCount();
    return {
      data,
      totalCount,
    };
  }

  @Get('tops')
  public getTopBooks(
    @Query() query: GetBookQueryDto,
  ) {
    return this.booksService.getTopBooks(query);
  }

  @Get('last')
  public getLastBooks(
    @Query() query: GetBookQueryDto,
  ) {
    return this.booksService.getLastBooks(query);
  }

  @Get(':id')
  public getBookById(
    @Param('id') id: string,
  ) {
    return this.booksService.getBookById(id);
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  public addBook(
    @UploadedFiles() files: any,
    @Body() body: any,
  ) {
    return this.booksService.addBook(body, files);
  }

  @Put(':id')
  public editBook(
    @Body() body: any,
  ) {
    return this.booksService.editBook(body);
  }

  @Delete(':id')
  public deleteBook(
    @Param('id') id: string,
  ) {
    return this.booksService.deleteBook(id);
  }
}
