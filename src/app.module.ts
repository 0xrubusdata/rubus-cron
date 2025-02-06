import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { ContentMetadataService } from './services/contentMetadata.service';
import { ContentMetadataRepository } from './repository/contentMetadata.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration], // 🔹 Charge `configuration.ts`
      isGlobal: true, // 🔹 Permet d'accéder aux variables partout
    }),
    DatabaseModule,
  ],
  providers: [
    ContentMetadataService,
    ContentMetadataRepository,
  ],
  exports: [
    ContentMetadataService, 
    ContentMetadataRepository,
  ],
})
export class AppModule {}
