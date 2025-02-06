import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { EurostatFetcher } from '../../src/data-fetchers/eurostatFetcher';
import { ContentMetadataService } from '../../src/services/contentMetadata.service';
import { EurostatTransformer } from '../../src/transformers/eurostatTransformer';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const metadataService = app.get(ContentMetadataService);
  const fetcher = new EurostatFetcher(metadataService);
  const transformer = new EurostatTransformer();

  console.log('🔹 Fetching raw data...');
  const rawData = await fetcher.fetchData();

  console.log('🔹 Transforming data...');
  const transformedData = transformer.transform(rawData);

  console.log('✅ Transformed Data:', JSON.stringify(transformedData, null, 2));

  await app.close();
}

test();
