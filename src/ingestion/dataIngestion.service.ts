import { Injectable } from '@nestjs/common';
import { FetcherFactory } from '../data-fetchers/fetcherFactory';
import { PersistDataService } from '../services/persistData.service';
import { EuroparlTransformer } from '../transformers/europarlTransformer';
import { ContentMetadataService } from '../services/contentMetadata.service';
import { EurostatTransformer } from '../transformers/eurostatTransformer';
import { FederalReserveTransformer } from '../transformers/federalReserveTransformer';
import { FederalReserveLinksTransformer } from '../transformers/federalReserveLinksTransformer';
import { FederalReserveDocumentsRepository } from '../repository/federalReserveDocuments.repository';
import { FederalReserveLinksRepository } from '../repository/federalReserveLinks.repository';

@Injectable()
export class DataIngestionService {
  constructor(
    private readonly persistDataService: PersistDataService,
    private readonly metadataService: ContentMetadataService,
    private readonly linksRepository: FederalReserveLinksRepository,
    private readonly documentsRepository: FederalReserveDocumentsRepository
  ) {}

  async ingestData(source: string): Promise<void> {
    console.log(`🔹 Fetching data for source: ${source}...`);

    // 📌 Création dynamique du Fetcher
    const fetcher = FetcherFactory.createFetcher(
      source,
      this.metadataService,
      this.linksRepository,
      this.documentsRepository
    );
    
    const rawData = await fetcher.fetchData();

    if (!rawData.length) {
      console.log(`⚠️ No data found for source: ${source}`);
      return;
    }

    console.log(`🔹 Transforming data for source: ${source}...`);

    // 📌 Sélection du Transformer
    let transformer;
    switch (source) {
      case 'europarl':
        transformer = new EuroparlTransformer();
        break;
      case 'eurostat':
        transformer = new EurostatTransformer();
        break;  
      case 'federalreserve':
        transformer = new FederalReserveTransformer();
        break;    
      case 'federalreservelinks':
        transformer = new FederalReserveLinksTransformer();
        break;      
      default:
        throw new Error(`🚨 No transformer found for source: ${source}`);
    }

    const transformedData = transformer.transform(rawData);

    console.log(`🔹 Persisting data for source: ${source}...`);

    // 📌 Persistance des données en BDD
    await this.persistDataService.persist(source, transformedData);

    console.log(`✅ Data ingestion complete for source: ${source}`);
  }
}
