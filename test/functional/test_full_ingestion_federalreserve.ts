import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { DataIngestionService } from '../../src/ingestion/dataIngestion.service';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ingestionService = app.get(DataIngestionService);

  console.log('🚀 Starting full ingestion process...');
  await ingestionService.ingestData('federalreserve');

  console.log('✅ Full ingestion process completed!');

  await app.close();
}

test();
