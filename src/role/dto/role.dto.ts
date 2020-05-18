import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  _id: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  name: string;
}
