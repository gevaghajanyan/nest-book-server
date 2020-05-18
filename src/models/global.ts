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

export class HttpSuccessData<TYPE> {
  @ApiProperty({
    required: true,
  })
  data: TYPE;
}

export class DeletedDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'ok',
  })
  deleted: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '1',
  })
  id: string;

  constructor(id: string) {
    this.id = id;
    this.deleted = 'ok';
  }
}
