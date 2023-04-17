import {Injectable} from '@nestjs/common';
import {GroupRepository} from '../../aggregate/group/group.repository';
import {Group} from '../../aggregate/group/group.type';

@Injectable()
export class GroupQuery {
    constructor(private groupRepository: GroupRepository) {
    }

    async search(userId: string): Promise<Group[]> {
        return await this.groupRepository.search(userId);
    }
}
