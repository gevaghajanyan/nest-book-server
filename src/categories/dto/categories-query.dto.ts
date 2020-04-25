import { ApiProperty } from '@nestjs/swagger';

export class CategoriesQueryDto {
  @ApiProperty({
    required: false,
  })
  page?: number;

  @ApiProperty({
    required: false,
  })
  count?: number;
}