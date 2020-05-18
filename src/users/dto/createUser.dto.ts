import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { RoleDto } from '../../role/dto/role.dto';

export class CreateUserDto {
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

  @ApiProperty({
    required: true,
    type: String,
  })
  role: RoleDto;
}
