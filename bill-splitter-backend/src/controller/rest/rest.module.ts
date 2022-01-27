import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/security.module';
import { AuthController } from './auth/auth.controller';
import { DomainModule } from '../../domain/domain.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [SecurityModule, DomainModule],
  controllers: [AuthController, UserController],
  providers: [],
})
export class RestModule {}
