import { EuroparlFetcher } from './europarlFetcher';
import { IFetcher } from './IFetcher';
import { ContentMetadataService } from '../services/contentMetadata.service';
import { EurostatFetcher } from './eurostatFetcher';
import { FederalReserveFetcher } from './federalReserveFetcher';

export class FetcherFactory {
  static createFetcher(source: string, metadataService: ContentMetadataService): IFetcher {
    switch (source) {
      case 'europarl':
        return new EuroparlFetcher(metadataService);
      case 'eurostat':
        return new EurostatFetcher(metadataService);
      case 'federalreserve':
        return new FederalReserveFetcher(metadataService);
      case 'usbea':
        //return new UsBeaFetcher(metadataService);
      default:
        throw new Error(`Unknown data source: ${source}`);
    }
  }
}
