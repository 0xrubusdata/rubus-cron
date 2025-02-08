import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContentMetadata } from '../entities/contentMetadata.entity';
import { Europarl } from '../entities/europarl.entity';
import { UsBea } from '../entities/usBea.entity';
import { FederalReserve } from '../entities/federalReserve.entity';
import { Eurostat } from '../entities/eurostat.entity';
import { PostgresService } from './postgres.service';
import { FederalReserveLinks } from '../entities/federalReserveLinks.entity';

@Module({
  imports: [
    ConfigModule, // 🔹 Assure que `.env` est bien chargé

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        autoLoadEntities: true,
        synchronize: process.env.ENV !== 'Production', // Désactive en prod
      }),
    }),

    TypeOrmModule.forFeature([ContentMetadata, Europarl, Eurostat, FederalReserve, FederalReserveLinks, UsBea]),
  ],
  providers: [PostgresService],
  exports: [PostgresService, TypeOrmModule],
})
export class DatabaseModule {}
