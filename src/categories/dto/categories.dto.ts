import { ApiProperty } from '@nestjs/swagger';

export class CategoriesDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;
}

export class CategoriesList {
  @ApiProperty({
    type: CategoriesDto,
    required: true,
    isArray: true,
  })
  data: CategoriesDto[];

  @ApiProperty({
    type: Number,
    required: true,
  })
  totalCount: number;
}
