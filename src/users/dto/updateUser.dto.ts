import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { RoleDto } from '../../role/dto/role.dto';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    type: String,
  })
  firstName?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  lastName?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
    type: RoleDto,
  })
  role?: RoleDto;
}
