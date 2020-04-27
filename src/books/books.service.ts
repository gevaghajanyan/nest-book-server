import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';

import { BookInterface } from './interfaces/book.interface';
import { FilesService } from '../files/files.service';
import { GetBookQueryDto } from './dto/get-book-query.dto';

@Injectable()
export class BooksService {
  @Inject('BOOKS_MODEL')
  private readonly booksModel: Model<BookInterface>;

  @Inject()
  private readonly fileService: FilesService;

  public getBooks(query: GetBookQueryDto) {
    return BooksService.addPagination(
      this.booksModel.find(),
      query,
    ).exec();
  }

  public getTotalCount() {
    return this.booksModel.count({}).then(Number);
  }

  public getTopBooks(query: GetBookQueryDto) {
    return BooksService.addPagination(
      this.booksModel.find(),
      query,
    ).sort({ rate: 1 });
  }

  public getLastBooks(query: GetBookQueryDto) {
    return BooksService.addPagination(
      this.booksModel.find(),
      query,
    ).sort({ _id: 1 });
  }

  public getBookById(id: string) {
    return this.booksModel.findOne({ _id: id });
  }

  public deleteBook(id: string) {
    return this.booksModel.deleteOne({ _id: id });
  }

  public editBook(body) {
    return null;
  }

  public async addBook(body, files: any[]) {
    const uploadsFile = files.reduce((acc, file) => {
      acc[file.fieldname] = file;
      return acc;
    }, {
      image: null,
      file: null,
    });
    const {
      image,
      file,
    } = uploadsFile;

    const imageId = await this.fileService.uploadFile(image);
    const fileId = await this.fileService.uploadFile(file);
    const book = {
      ...body,
      image: imageId,
      file: fileId,
    };
    return this.booksModel.create(book);
  }

  static addPagination(request: any, query: GetBookQueryDto) {
    let { count, page } = query;

    count = Number(count);
    page = Number(page);
    return request
      .skip(page > 0 ? (page * count) : 0)
      .limit(count);
  }
}
