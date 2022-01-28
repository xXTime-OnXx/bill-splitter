import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {CreateUser} from '../../../../domain/usecase/user/dto/create-user';

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

  public toCreateUser(): CreateUser {
    return {
      username: this.username,
      avatar: null,
      password: this.password,
      email: this.email,
      roles: [],
    };
  }
}
