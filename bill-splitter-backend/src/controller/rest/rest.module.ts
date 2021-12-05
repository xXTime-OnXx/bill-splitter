import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/security.module';
import { AuthController } from './auth/auth.controller';
import { DomainModule } from '../../domain/domain.module';

@Module({
  imports: [SecurityModule, DomainModule],
  controllers: [AuthController],
  providers: [],
})
export class RestModule {}
