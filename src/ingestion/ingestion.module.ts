import { Module } from '@nestjs/common';
import { DataIngestionService } from './dataIngestion.service';
import { ServicesModule } from '../services/services.module';
import { FetchersModule } from '../data-fetchers/fetchers.module';
import { TransformersModule } from 'src/transformers/transformers.module';

@Module({
  imports: [FetchersModule, TransformersModule, ServicesModule],
  providers: [DataIngestionService],
  exports: [DataIngestionService],
})
export class IngestionModule {}
