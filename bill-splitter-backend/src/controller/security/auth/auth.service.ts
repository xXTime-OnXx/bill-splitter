import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../../domain/aggregate/user/role.enum';
import { User } from '../../../domain/aggregate/user/user.type';

@Injectable()
export class AuthService {
  private tempUser = {
    userId: 1,
    username: 'john',
    password: 'changeme',
    roles: [Role.USER],
  };

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // TODO: get user from service with correct password
    const user = this.tempUser;
    if (user && user.password === password) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
