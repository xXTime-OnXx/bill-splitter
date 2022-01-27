import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../security/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../../../domain/aggregate/user/role.enum';
import { RolesGuard } from '../../security/auth/guard/roles.guard';
import { Roles } from '../../security/auth/decorator/roles.decorator';
import { UserQuery } from '../../../domain/usecase/user/user.query';
import { UiUser } from '../../../domain/usecase/user/dto/ui-user';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private userQuery: UserQuery) {}

  @Roles(Role.USER)
  @Get()
  async getUser(@Request() req): Promise<UiUser> {
    return await this.userQuery.getUserInformation(req.user.id);
  }
}
