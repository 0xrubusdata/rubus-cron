import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { FederalReserveLinksFetcher } from '../../src/data-fetchers/federalReserveLinksFetcher';
import { FederalReserveLinksTransformer } from '../../src/transformers/federalReserveLinksTransformer';
import { FederalReserveLinksRepository } from '../../src/repository/federalReserveLinks.repository';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const linksRepository = app.get(FederalReserveLinksRepository);
  const fetcher = new FederalReserveLinksFetcher(linksRepository);
  const transformer = new FederalReserveLinksTransformer();

  console.log('🔹 Fetching raw HTML content from Federal Reserve links...');
  const rawData = await fetcher.fetchData();

  console.log('🔹 Transforming HTML content...');
  const transformedData = transformer.transform(rawData);

  console.log('✅ Transformed Data:', JSON.stringify(transformedData, null, 2));

  await app.close();
}

test();
