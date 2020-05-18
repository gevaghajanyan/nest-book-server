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
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { BooksService } from './books.service';
import { GetBookQueryDto } from './dto/get-book-query.dto';
import {
  BookDataDto,
  BookDto,
} from './dto/book.dto';
import { DeletedDto } from '../models/global';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  @Inject()
  private readonly booksService: BooksService;

  @Get()
  @ApiOkResponse({
    schema: undefined,
    type: BookDataDto,
  })
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
  @ApiOkResponse({
    schema: undefined,
    type: BookDataDto,
  })
  public getTopBooks(
    @Query() query: GetBookQueryDto,
  ) {
    return this.booksService.getTopBooks(query);
  }

  @Get('last')
  @ApiOkResponse({
    schema: undefined,
    type: BookDataDto,
  })
  public getLastBooks(
    @Query() query: GetBookQueryDto,
  ) {
    return this.booksService.getLastBooks(query);
  }

  @Get(':id')
  @ApiOkResponse({
    schema: undefined,
    type: BookDto,
  })
  public getBookById(
    @Param('id') id: string,
  ) {
    return this.booksService.getBookById(id);
  }

  @Post()
  @ApiBody({
    type: CreateBookDto,
    required: true,
  })
  @ApiOkResponse({
    schema: undefined,
    type: BookDto,
  })
  @UseInterceptors(AnyFilesInterceptor())
  public addBook(
    @UploadedFiles() files: any,
    @Body() body: any,
  ) {
    return this.booksService.addBook(body, files);
  }

  @Put(':id')
  @ApiBody({
    type: CreateBookDto,
    required: true,
  })
  @ApiOkResponse({
    schema: undefined,
    type: BookDto,
  })
  public editBook(
    @Body() body: any,
  ) {
    return this.booksService.editBook(body);
  }

  @Delete(':id')
  @ApiOkResponse({
    schema: undefined,
    type: DeletedDto,
  })
  public deleteBook(
    @Param('id') id: string,
  ) {
    return this.booksService.deleteBook(id);
  }
}
