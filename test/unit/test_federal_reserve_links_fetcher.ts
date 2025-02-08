import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { FederalReserveLinksFetcher } from '../../src/data-fetchers/federalReserveLinksFetcher';
import { FederalReserveLinksRepository } from '../../src/repository/federalReserveLinks.repository';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const federalReserveLinksRepository = app.get(FederalReserveLinksRepository);
  const fetcher = new FederalReserveLinksFetcher(federalReserveLinksRepository);

  console.log('🔹 Fetching raw data from Federal Reserve Links...');
  const rawData = await fetcher.fetchData();

  console.log('✅ Fetched Data:', JSON.stringify(rawData, null, 2));

  await app.close();
}

test();
