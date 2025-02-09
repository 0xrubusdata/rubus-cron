import { EuroparlFetcher } from './europarlFetcher';
import { IFetcher } from './IFetcher';
import { ContentMetadataService } from '../services/contentMetadata.service';
import { EurostatFetcher } from './eurostatFetcher';
import { FederalReserveFetcher } from './federalReserveFetcher';
import { FederalReserveLinksFetcher } from './federalReserveLinksFetcher';
import { FederalReserveLinksRepository } from '../repository/federalReserveLinks.repository';

import { FederalReserveDocumentsRepository } from '../repository/federalReserveDocuments.repository';
import { FederalReserveDocumentsFetcher } from './federalReserveDocumentsFetcher';

export class FetcherFactory {
  static createFetcher(
    source: string,
    metadataService?: ContentMetadataService,
    linksRepository?: FederalReserveLinksRepository,
    documentsRepository?: FederalReserveDocumentsRepository
  ): IFetcher {
    switch (source) {
      case 'europarl':
        return new EuroparlFetcher(metadataService!);
      case 'eurostat':
        return new EurostatFetcher(metadataService!);
      case 'federalreserve':
        return new FederalReserveFetcher(metadataService!);
      case 'federalreservelinks':
        return new FederalReserveLinksFetcher(linksRepository!);
      case 'federalreservedocuments':
          return new FederalReserveDocumentsFetcher(documentsRepository!);
      default:
        throw new Error(`Unknown data source: ${source}`);
    }
  }
}
