import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConnectionOptions} from 'typeorm';
import {UserRepository} from '../domain/aggregate/user/user.repository';
import {UserRepositoryImpl} from './user/user.repository-impl';
import {ConfigService} from '@nestjs/config';
import {GroupRepositoryImpl} from './group/group.repository.impl';
import {GroupRepository} from '../domain/aggregate/group/group.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        ({
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: 'bill-splitter',
          password: 'bill-splitter',
          database: 'bill-splitter',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migration/**/*{.ts,.js}'],
          cli: {
            migrationsDir: __dirname + '/migration',
          },
          migrationsRun: true,
          synchronize: true,
        } as ConnectionOptions),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      useClass: UserRepositoryImpl,
      provide: UserRepository,
    },
    {
      useClass: GroupRepositoryImpl,
      provide: GroupRepository,
    },
  ],
  exports: [UserRepository, GroupRepository],
})
export class PersistenceModule {}
