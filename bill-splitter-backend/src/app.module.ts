import { Module } from '@nestjs/common';
import { RestModule } from './controller/rest/rest.module';

@Module({
  imports: [RestModule],
})
export class AppModule {}
