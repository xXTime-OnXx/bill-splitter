import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../../security/auth/guard/local-auth.guard';
import { AuthService } from '../../security/auth/auth.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { UserManager } from '../../../domain/usecase/user/user.manager';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserQuery } from '../../../domain/usecase/user/user.query';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userQuery: UserQuery,
    private userManager: UserManager,
  ) {}

  @Get('exists/:username')
  async userExists(@Param('username') username: string): Promise<boolean> {
    return await this.userQuery.userExists(username);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<void> {
    await this.userManager.saveUser(RegisterDto.toCreateUser(registerDto));
  }

  @ApiBasicAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(req.user);
  }
}
