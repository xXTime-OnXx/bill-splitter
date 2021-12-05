import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../domain/aggregate/user/user.type';
import { UserManager } from '../../../domain/usecase/user/user.manager';
import { UserQuery } from '../../../domain/usecase/user/user.query';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userManager: UserManager,
    private userQuery: UserQuery,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    if (await this.userManager.checkPassword(username, password)) {
      return await this.userQuery.find(username);
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
