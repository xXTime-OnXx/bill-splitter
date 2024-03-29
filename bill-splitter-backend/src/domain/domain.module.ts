import {Module} from '@nestjs/common';
import {UserManager} from './usecase/user/user.manager';
import {HashingService} from './usecase/utils/hashing.service';
import {PersistenceModule} from '../persistence/persistence.module';
import {UserQuery} from './usecase/user/user.query';
import {GroupManager} from './usecase/group/group.manager';
import {GroupQuery} from './usecase/group/group.query';

const managers = [UserManager, GroupManager];

const queries = [UserQuery, GroupQuery];

const services = [HashingService];

@Module({
  imports: [PersistenceModule],
  providers: [...managers, ...queries, ...services],
  exports: [...managers, ...queries],
})
export class DomainModule {}
