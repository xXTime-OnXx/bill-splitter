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
import { Role } from '../../../domain/aggregate/user/role.enum';
import { UserManager } from '../../../domain/usecase/user/user.manager';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RolesGuard } from '../../security/auth/guard/roles.guard';
import { Roles } from '../../security/auth/decorator/roles.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userManager: UserManager,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    await this.userManager.saveUser(RegisterDto.toUser(registerDto));
  }

  @ApiBasicAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('profile')
  getProfile(@Request() req): Promise<void> {
    return req.user;
  }
}
