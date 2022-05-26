import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../security/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../security/auth/guard/roles.guard';
import { Roles } from '../../security/auth/decorator/roles.decorator';
import { Role } from '../../../domain/aggregate/user/role.enum';
import { UiGroup } from '../../../domain/usecase/group/dto/ui-gorup';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupQuery } from '../../../domain/usecase/group/group.query';
import { GroupManager } from '../../../domain/usecase/group/group.manager';

@ApiTags('group')
@Controller('group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class GroupController {
  constructor(
    private groupQuery: GroupQuery,
    private groupManager: GroupManager,
  ) {}

  @Roles(Role.USER)
  @Get()
  async get(@Request() req): Promise<UiGroup[]> {
    return await this.groupQuery.search(req.group.sub);
  }

  @Roles(Role.USER)
  @Post('create')
  async create(
    @Request() req,
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<void> {
    await this.groupManager.create(req.group.sub, createGroupDto);
  }
}
