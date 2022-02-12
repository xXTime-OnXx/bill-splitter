import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../../security/auth/guard/jwt-auth.guard';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Role} from '../../../domain/aggregate/user/role.enum';
import {RolesGuard} from '../../security/auth/guard/roles.guard';
import {Roles} from '../../security/auth/decorator/roles.decorator';
import {UserQuery} from '../../../domain/usecase/user/user.query';
import {UiUser} from '../../../domain/usecase/user/dto/ui-user';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserManager} from '../../../domain/usecase/user/user.manager';
import {UpdateAvatarDto} from './dto/update-avatar.dto';
import {UpdatePasswordDto} from './dto/update-password.dto';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private userQuery: UserQuery,
              private userManager: UserManager) {}

  @Roles(Role.USER)
  @Get()
  async get(@Request() req): Promise<UiUser> {
    return await this.userQuery.getUserInformation(req.user.sub);
  }

  @Roles(Role.USER)
  @Post('update')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.userManager.update(req.user.sub, updateUserDto);
  }

  @Roles(Role.USER)
  @Post('update/avatar')
  async updateAvatar(@Request() req, @Body() updateAvatarDto: UpdateAvatarDto): Promise<void> {
    await this.userManager.updateAvatar(req.user.sub, updateAvatarDto.avatar);
  }

  @Roles(Role.USER)
  @Post('update/password')
  async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto): Promise<void> {
    await this.userManager.updatePassword(req.user.sub, updatePasswordDto.password);
  }
}
