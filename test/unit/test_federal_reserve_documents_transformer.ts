import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { FederalReserveDocumentsFetcher } from '../../src/data-fetchers/federalReserveDocumentsFetcher';
import { FederalReserveDocumentsTransformer } from '../../src/transformers/federalReserveDocumentsTransformer';
import { FederalReserveDocumentsRepository } from '../../src/repository/federalReserveDocuments.repository';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const federalReserveDocumentsRepository = app.get(FederalReserveDocumentsRepository);
  const fetcher = new FederalReserveDocumentsFetcher(federalReserveDocumentsRepository);
  const transformer = new FederalReserveDocumentsTransformer();

  console.log('🔹 Fetching raw data from Federal Reserve Documents...');
  const rawData = await fetcher.fetchData();

  console.log('🔹 Transforming data...');
  const transformedData = transformer.transform(rawData);

  console.log('✅ Transformed Data:', JSON.stringify(transformedData, null, 2));

  await app.close();
}

test();
