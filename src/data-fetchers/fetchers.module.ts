import { Module } from '@nestjs/common';
import { EuroparlFetcher } from './europarlFetcher';
import { ContentMetadataService } from '../services/contentMetadata.service';
import { EurostatFetcher } from './eurostatFetcher';
import { FederalReserveFetcher } from './federalReserveFetcher';
import { FederalReserveDocumentsFetcher } from './federalReserveDocumentsFetcher';
import { FederalReserveLinksFetcher } from './federalReserveLinksFetcher';

@Module({
  providers: [
    EuroparlFetcher, // 🔹 On enregistre le fetcher Europarl
    EurostatFetcher,
    FederalReserveFetcher,
    FederalReserveLinksFetcher,
    FederalReserveDocumentsFetcher,
    ContentMetadataService, // 🔹 Injecté car il est utilisé par le fetcher
  ],
  exports: [EuroparlFetcher, EurostatFetcher, FederalReserveFetcher, FederalReserveLinksFetcher, FederalReserveDocumentsFetcher], // 🔹 On exporte pour qu'il soit accessible ailleurs
})
export class FetchersModule {}
