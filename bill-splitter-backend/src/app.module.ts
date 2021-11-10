import { Module } from '@nestjs/common';
import { RestModule } from './controller/rest/rest.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RestModule,
    ConfigModule.forRoot({
      envFilePath: ['./environment/dev.env', './environment/prod.env'],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
