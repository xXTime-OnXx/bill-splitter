import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../../aggregate/group/group.repository';
import { CreateGroup } from './dto/create-group';

@Injectable()
export class GroupManager {
  constructor(private groupRepository: GroupRepository) {}

  async create(userId: string, createGroup: CreateGroup): Promise<void> {
    await this.groupRepository.create(userId, createGroup);
  }
}
