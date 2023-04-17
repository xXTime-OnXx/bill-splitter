import {Injectable} from '@nestjs/common';
import {GroupRepository} from '../../domain/aggregate/group/group.repository';
import {CreateGroup} from '../../domain/usecase/group/dto/create-group';
import {GroupEntity} from './group.entity';
import {Group} from '../../domain/aggregate/group/group.type';
import {UserEntity} from '../user/user.entity';

@Injectable()
export class GroupRepositoryImpl extends GroupRepository {
    public async search(userId: string): Promise<Group[]> {
        return await GroupEntity.find({
            join: {
                alias: 'group',
                innerJoin: {
                    user: 'group.users',
                }
            },
            where: sq => {
                sq.where('user.id = :userId', {userId})
            }
        });
    }

    public async create(userId: string, createGroup: CreateGroup): Promise<void> {
        const groupEntity = new GroupEntity();
        groupEntity.name = createGroup.name;
        groupEntity.description = createGroup.description;
        groupEntity.users = [await UserEntity.findOne(userId)];
        await groupEntity.save();
    }
}
