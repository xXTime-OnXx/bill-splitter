import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../security/auth/guard/local-auth.guard';
import { AuthService } from '../../security/auth/auth.service';
import { JwtAuthGuard } from '../../security/auth/guard/jwt-auth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBasicAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<void> {
    return req.user;
  }
}
