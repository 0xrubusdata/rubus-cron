import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { EurostatFetcher } from '../../src/data-fetchers/eurostatFetcher';
import { ContentMetadataService } from '../../src/services/contentMetadata.service';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const metadataService = app.get(ContentMetadataService);
  const fetcher = new EurostatFetcher(metadataService);

  console.log('🔹 Fetching raw data from Eurostat...');
  const rawData = await fetcher.fetchData();

  console.log('✅ Fetched Data:', JSON.stringify(rawData, null, 2));

  await app.close();
}

test();
