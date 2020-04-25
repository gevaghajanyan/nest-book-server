import { ApiProperty } from '@nestjs/swagger';

export class CategoriesDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;
}