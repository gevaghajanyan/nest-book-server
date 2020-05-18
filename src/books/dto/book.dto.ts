import { ApiProperty } from '@nestjs/swagger';
import { CategoriesDto } from '../../categories/dto/categories.dto';

export class BookDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  _id: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  title: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  pageCount: number;

  @ApiProperty({
    required: true,
    type: Date,
  })
  published: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  shortDescription: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  longDescription: string;

  @ApiProperty({
    required: true,
    type: CategoriesDto,
    isArray: true,
  })
  categories: CategoriesDto[];

  @ApiProperty({
    required: false,
    type: Number,
  })
  rate: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  image: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  file: string;
}

export class BookDataDto {
  @ApiProperty({
    type: BookDto,
    isArray: true,
    required: true,
  })
  data: BookDto[];

  @ApiProperty({
    type: Number,
    required: true,
  })
  totalCount: number;

}
