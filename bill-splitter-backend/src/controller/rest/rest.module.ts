import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SecurityModule } from '../security/security.module';
import { AuthController } from './auth/auth.controller';
import { RolesGuard } from '../security/auth/guard/roles.guard';
import { DomainModule } from '../../domain/domain.module';

@Module({
  imports: [SecurityModule, DomainModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class RestModule {}
