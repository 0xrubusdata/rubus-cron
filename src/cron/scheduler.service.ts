import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataIngestionService } from '../ingestion/dataIngestion.service';
import { CleanJobService } from '../services/cleanJob.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly ingestionService: DataIngestionService,
    private readonly cleanJobService: CleanJobService
  ) {}

  @Cron('0 1 * * *') // 🕐 01:00 AM - Europarl
  async handleEuroparlCron() {
    console.log('⏰ Running Europarl Ingestion...');
    await this.ingestionService.ingestData('europarl');
    console.log('✅ Europarl Ingestion Complete!');
  }

  @Cron('0 2 * * *') // 🕑 02:00 AM - Eurostat
  async handleEurostatCron() {
    console.log('⏰ Running Eurostat Ingestion...');
    await this.ingestionService.ingestData('eurostat');
    console.log('✅ Eurostat Ingestion Complete!');
  }

  @Cron('0 3 * * *') // 🕒 03:00 AM - Federal Reserve
  async handleFederalReserveCron() {
    console.log('⏰ Running Federal Reserve Ingestion...');
    await this.ingestionService.ingestData('federalreserve');
    console.log('✅ Federal Reserve Ingestion Complete!');
  }

  @Cron('0 4 * * *') // 🕓 04:00 AM - Parsing des liens Fed
  async handleFederalReserveLinksCron() {
    console.log('⏰ Running Federal Reserve Links Processing...');
    await this.ingestionService.ingestData('federalreservelinks');
    console.log('✅ Federal Reserve Links Processing Complete!');
  }

  @Cron('0 5 * * *') // 🕔 05:00 AM - Parsing des documents Fed
  async handleFederalReserveDocumentsCron() {
    console.log('⏰ Running Federal Reserve Documents Processing...');
    await this.ingestionService.ingestData('federalreservedocuments');
    console.log('✅ Federal Reserve Documents Processing Complete!');
  }


  @Cron('0 6 * * *') // 🕕 06:00 AM chaque jour
  async handleCleanJob() {
    console.log('🧹 Running Scheduled Clean Job...');
    await this.cleanJobService.cleanOldEntries();
    console.log('✅ Scheduled Clean Job Complete!');
  }

}
