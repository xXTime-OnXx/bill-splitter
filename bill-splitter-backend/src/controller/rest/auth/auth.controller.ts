import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from '../../security/auth/guard/local-auth.guard';
import {AuthService} from '../../security/auth/auth.service';
import {ApiBasicAuth, ApiTags} from '@nestjs/swagger';
import {UserManager} from '../../../domain/usecase/user/user.manager';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userManager: UserManager,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    await this.userManager.saveUser(registerDto.toCreateUser());
  }

  @ApiBasicAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(req.user);
  }
}
