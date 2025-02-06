import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { EuroparlFetcher } from '../../src/data-fetchers/europarlFetcher';
import { ContentMetadataService } from '../../src/services/contentMetadata.service';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const metadataService = app.get(ContentMetadataService);
  const fetcher = new EuroparlFetcher(metadataService);

  const data = await fetcher.fetchData();
  console.log('🔹 Data fetched:', JSON.stringify(data, null, 2));

  await app.close();
}

test();
