import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { FederalReserveFetcher } from '../../src/data-fetchers/federalReserveFetcher';
import { ContentMetadataService } from '../../src/services/contentMetadata.service';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const metadataService = app.get(ContentMetadataService);
  const fetcher = new FederalReserveFetcher(metadataService);

  console.log('🔹 Fetching raw data from Federal Reserve...');
  const rawData = await fetcher.fetchData();

  console.log('✅ Fetched Data:', JSON.stringify(rawData, null, 2));

  await app.close();
}

test();
