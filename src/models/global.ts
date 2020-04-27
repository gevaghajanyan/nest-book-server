import { ApiProperty } from '@nestjs/swagger';

export class Pagination {

  @ApiProperty({
    required: false,
  })
  page?: number;

  @ApiProperty({
    required: false,
  })
  count?: number;
}

