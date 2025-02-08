import { Module } from '@nestjs/common';
import { EuroparlFetcher } from './europarlFetcher';
import { ContentMetadataService } from '../services/contentMetadata.service';
import { EurostatFetcher } from './eurostatFetcher';
import { FederalReserveFetcher } from './federalReserveFetcher';

@Module({
  providers: [
    EuroparlFetcher, // 🔹 On enregistre le fetcher Europarl
    EurostatFetcher,
    FederalReserveFetcher,
    ContentMetadataService, // 🔹 Injecté car il est utilisé par le fetcher
  ],
  exports: [EuroparlFetcher, EurostatFetcher], // 🔹 On exporte pour qu'il soit accessible ailleurs
})
export class FetchersModule {}
