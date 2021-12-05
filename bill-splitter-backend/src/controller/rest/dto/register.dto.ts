import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/aggregate/user/user.type';
import { Role } from '../../../domain/aggregate/user/role.enum';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  public static toUser(registerDto: RegisterDto): User {
    return {
      id: undefined,
      username: registerDto.username,
      password: registerDto.password,
      email: registerDto.email,
      roles: [Role.USER],
    };
  }
}
