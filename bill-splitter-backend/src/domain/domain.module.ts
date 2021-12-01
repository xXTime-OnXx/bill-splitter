import { Module } from '@nestjs/common';
import { UserManager } from './usecase/user/user.manager';
import { HashingService } from './usecase/utils/hashing.service';
import {PersistenceModule} from "../persistence/persistence.module";

const managers = [UserManager];

const queries = [];

const services = [HashingService];

@Module({
  imports: [
      PersistenceModule,
  ],
  providers: [...managers, ...queries, ...services],
  exports: [...managers, ...queries],
})
export class DomainModule {}
