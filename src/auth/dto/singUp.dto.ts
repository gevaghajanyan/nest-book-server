import { ApiProperty } from '@nestjs/swagger';

export class SingUpDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  firstName: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  lastName: string;

  @ApiProperty({
    required: true,
    type: String,
  }) password: string;

  @ApiProperty({
    required: true,
    type: String,
  }) email: string;
}