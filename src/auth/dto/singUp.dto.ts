import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsEmail } from 'class-validator'

export class SingUpDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  lastName: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  password: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;
}
