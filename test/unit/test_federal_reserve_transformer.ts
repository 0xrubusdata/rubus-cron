import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { FederalReserveFetcher } from '../../src/data-fetchers/federalReserveFetcher';
import { ContentMetadataService } from '../../src/services/contentMetadata.service';
import { FederalReserveTransformer } from '../../src/transformers/federalReserveTransformer';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const metadataService = app.get(ContentMetadataService);
  const fetcher = new FederalReserveFetcher(metadataService);
  const transformer = new FederalReserveTransformer();

  console.log('🔹 Fetching raw data from Federal Reserve...');
  const rawData = await fetcher.fetchData();

  console.log('🔹 Transforming data...');
  const transformedData = transformer.transform(rawData);

  console.log('✅ Transformed Data:', JSON.stringify(transformedData, null, 2));

  await app.close();
}

test();
