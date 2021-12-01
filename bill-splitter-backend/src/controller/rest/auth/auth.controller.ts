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
import { User } from '../../../domain/aggregate/user/user.type';
import { RegisterDto } from '../dto/register.dto';
import { UserQuery } from '../../../domain/usecase/user/user.query';
import { LoginDto } from '../dto/login.dto';
import { RolesGuard } from '../../security/auth/guard/roles.guard';
import { Roles } from '../../security/auth/decorator/roles.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userManager: UserManager,
    private userQuery: UserQuery,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    await this.userManager.saveUser(
      AuthController.mapRegisterDtoToUser(registerDto),
    );
  }

  @ApiBasicAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  // TODO: RolesGuard is executed before JwtAuthGuard without request.user being set
  @Roles(Role.USER)
  @Get('profile')
  getProfile(@Request() req): Promise<void> {
    console.log(req.user);
    return req.user;
  }

  private static mapRegisterDtoToUser(registerDto: RegisterDto): User {
    return {
      id: undefined,
      username: registerDto.username,
      password: registerDto.password,
      email: registerDto.email,
      roles: [Role.USER],
    };
  }
}
