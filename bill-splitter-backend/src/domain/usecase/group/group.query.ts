import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../../aggregate/group/group.repository';
import { UiGroup } from './dto/ui-gorup';

@Injectable()
export class GroupQuery {
  constructor(private groupRepository: GroupRepository) {}

  async search(userId: string): Promise<UiGroup[]> {
    return await this.groupRepository.search(userId);
  }
}
