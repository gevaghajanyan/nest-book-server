import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  accessToken: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 300,
  })
  expirationDate: number;
}
