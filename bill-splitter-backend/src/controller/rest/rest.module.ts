import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/security.module';
import { AuthController } from './auth/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../security/auth/guard/roles.guard';

@Module({
  imports: [SecurityModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class RestModule {}
