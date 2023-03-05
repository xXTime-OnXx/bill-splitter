import { Group } from './group.type';
import { CreateGroup } from '../../usecase/group/dto/create-group';

export abstract class GroupRepository {
  abstract search(userId: string): Promise<Group[]>;
  abstract create(userId: string, createGroup: CreateGroup): Promise<void>;
}
