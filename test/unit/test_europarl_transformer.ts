import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { EuroparlFetcher } from '../../src/data-fetchers/europarlFetcher';
import { ContentMetadataService } from '../../src/services/contentMetadata.service';
import { EuroparlTransformer } from '../../src/transformers/europarlTransformer';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const metadataService = app.get(ContentMetadataService);
  const fetcher = new EuroparlFetcher(metadataService);
  const transformer = new EuroparlTransformer();

  console.log('🔹 Fetching raw data...');
  const rawData = await fetcher.fetchData();

  console.log('🔹 Transforming data...');
  const transformedData = transformer.transform(rawData);

  console.log('✅ Transformed Data:', JSON.stringify(transformedData, null, 2));

  await app.close();
}

test();
