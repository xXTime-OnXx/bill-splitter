import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategy/local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { DomainModule } from '../../domain/domain.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DomainModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class SecurityModule {}
