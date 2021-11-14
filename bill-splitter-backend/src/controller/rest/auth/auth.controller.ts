import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../../security/auth/guard/local-auth.guard';
import { AuthService } from '../../security/auth/auth.service';
import { JwtAuthGuard } from '../../security/auth/guard/jwt-auth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../security/auth/decorator/roles.decorator';
import { Role } from '../../../domain/aggregate/user/role.enum';
import { UserManager } from '../../../domain/usecase/user/user.manager';
import { User } from '../../../domain/aggregate/user/user.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userManager: UserManager,
  ) {}

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    await this.userManager.saveUser(user);
    return this.authService.login(user);
  }

  @ApiBasicAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER)
  @Get('profile')
  getProfile(@Request() req): Promise<void> {
    return req.user;
  }
}
