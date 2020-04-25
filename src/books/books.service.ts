import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';

import { BookInterface } from './interfaces/book.interface';
import { FilesService } from '../files/files.service';

@Injectable()
export class BooksService {
  @Inject('BOOKS_MODEL')
  private readonly booksModel: Model<BookInterface>;

  @Inject()
  private readonly fileService: FilesService;

  public getBooks() {
    return this.booksModel
      .find()
      .exec();
  }

  public getTotalCount() {
    return null;
  }

  public getTopBooks() {
    return null;
  }

  public getBookById(id: string) {
    return this.booksModel.findOne({ _id: id });
  }

  public deleteBook() {
    return null;
  }

  public async addBook(body, image) {
    const _id = await this.fileService.uploadFile(image);
    return this.booksModel.create({
      ...body,
      image: _id,
    });
  }
}
