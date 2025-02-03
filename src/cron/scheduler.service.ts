import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    console.log('⏰ CRON JOB : Exécution toutes les heures !');
  }
}
