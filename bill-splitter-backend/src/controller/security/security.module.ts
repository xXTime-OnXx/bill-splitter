import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/strategy/local.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class SecurityModule {}
