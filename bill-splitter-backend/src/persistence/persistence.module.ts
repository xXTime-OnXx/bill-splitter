import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { UserRepository } from '../domain/aggregate/user/user.repository';
import { UserRepositoryImpl } from './user/user.repository-impl';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        ({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
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
      inject: [],
    }),
  ],
  providers: [
    {
      useClass: UserRepositoryImpl,
      provide: UserRepository,
    },
  ],
  exports: [UserRepository],
})
export class PersistenceModule {}
