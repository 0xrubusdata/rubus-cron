import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { ContentMetadataService } from './services/contentMetadata.service';
import { ContentMetadataRepository } from './repository/contentMetadata.repository';
import { DataIngestionService } from './ingestion/dataIngestion.service';
import { RepositoriesModule } from './repository/repositories.module';
import { ServicesModule } from './services/services.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './cron/scheduler.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration], // 🔹 Charge `configuration.ts`
      isGlobal: true, // 🔹 Permet d'accéder aux variables partout
    }),
    DatabaseModule,
    RepositoriesModule,
    ServicesModule,
    ScheduleModule.forRoot()
  ],
  providers: [
    ContentMetadataService,
    ContentMetadataRepository,
    DataIngestionService,  // 🔹 Ajouter DataIngestionService
    ServicesModule,
    RepositoriesModule,
    SchedulerService
  ],
  exports: [
    ContentMetadataService, 
    ContentMetadataRepository,
    DataIngestionService,   // 🔹 Exporter pour qu'il soit accessible dans le test
    ServicesModule,
    RepositoriesModule,
    SchedulerService
  ],
})
export class AppModule {}
