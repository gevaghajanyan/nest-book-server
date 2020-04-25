import {
  Controller,
  Inject,
  UseInterceptors,
  Body,
  UploadedFile,
  Delete,
  Get,
  Post, Req, UploadedFiles,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { BooksService } from './books.service';
import { FilesService } from '../files/files.service';

@ApiTags('books')
@Controller('books')
export class BooksController {
  @Inject()
  private readonly booksService: BooksService;

  @Get()
  public getBooks() {
    return this.booksService.getBooks();
  }

  @Get('tops')
  public getTopBooks() {
    return null;
  }

  @Get(':id')
  public getBookById() {
    return null;
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  public addBook(
    @UploadedFiles() files: any,
    @Body() body: any,
  ) {
    return this.booksService.addBook(body, files[0]);
  }

  @Delete(':id')
  public deleteBook() {
    return null;
  }
}
