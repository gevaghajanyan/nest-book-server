import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { RoleDto } from '../../role/dto/role.dto';

export class SingUpResponseDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  _id: string;

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
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: RoleDto,
  })
  role: RoleDto;
}
