import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { FederalReserveDocumentsFetcher } from '../../src/data-fetchers/federalReserveDocumentsFetcher';
import { FederalReserveDocumentsRepository } from '../../src/repository/federalReserveDocuments.repository';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const federalReserveDocumentsRepository = app.get(FederalReserveDocumentsRepository);
  const fetcher = new FederalReserveDocumentsFetcher(federalReserveDocumentsRepository);

  try {
    console.log('🔹 Fetching raw data from Federal Reserve Documents...');
    const rawData = await fetcher.fetchData();

    if (rawData.length === 0) {
      console.warn('⚠️ No documents processed.');
    } else {
      console.log('✅ Fetched Data:', JSON.stringify(rawData, null, 2));
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await app.close();
  }
}

test();
