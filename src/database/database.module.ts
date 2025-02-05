import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresService } from './postgres.service';
import { Europarl } from './entities/europarl.entity';
import { UsBea } from './entities/usBea.entity';
import { FederalReserve } from './entities/federalreserve.entity';
import { Eurostat } from './entities/eurostat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'rubus',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Europarl, Eurostat, FederalReserve, UsBea]), // Intégration des entités
  ],
  providers: [PostgresService],
  exports: [PostgresService, TypeOrmModule],
})
export class DatabaseModule {}
