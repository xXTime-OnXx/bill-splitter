import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private tempUser = {
    userId: 1,
    username: 'john',
    password: 'changeme',
  };

  async validateUser(username: string, pass: string): Promise<any> {
    // TODO: get user from service with correct password
    const user = this.tempUser;
    if (user && user.password === pass) {
      user.password = undefined;
      return user;
    }
    return null;
  }
}
