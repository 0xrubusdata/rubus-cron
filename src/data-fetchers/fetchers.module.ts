import { Module } from '@nestjs/common';
import { EuroparlFetcher } from './europarlFetcher';
import { ContentMetadataService } from '../services/contentMetadata.service';

@Module({
  providers: [
    EuroparlFetcher, // 🔹 On enregistre le fetcher Europarl
    ContentMetadataService, // 🔹 Injecté car il est utilisé par le fetcher
  ],
  exports: [EuroparlFetcher], // 🔹 On exporte pour qu'il soit accessible ailleurs
})
export class FetchersModule {}
