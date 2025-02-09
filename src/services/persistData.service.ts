import { Injectable } from '@nestjs/common';
import { EuroparlService } from './europarl.service';
import { EurostatService } from './eurostat.service';
import { FederalReserveService } from './federalReserve.service';
import { FederalReserveLinksService } from './federalReserveLinks.service';
import { UsBeaService } from './usBea.service';
import { FederalReserveDocumentsService } from './federalReserveDocuments.service';

@Injectable()
export class PersistDataService {
  constructor(
    private readonly europarlService: EuroparlService,
    private readonly eurostatService: EurostatService,
    private readonly federalReserveService: FederalReserveService,
    private readonly federalReserveLinksService: FederalReserveLinksService, 
    private readonly federalReserveDocumentsService: FederalReserveDocumentsService,
    private readonly usBeaService: UsBeaService,
  ) {}

  async persist(source: string, data: any) {
    switch (source) {
      case 'europarl':
        await this.europarlService.saveData(data);
        break;
      case 'eurostat':
        await this.eurostatService.saveData(data);
        break;
      case 'federalreserve':
        await this.federalReserveService.saveData(data.toPersist, data.toLink);
        break;
      case 'federalreservelinks':  
        await this.federalReserveLinksService.saveData(data.toPersist, data.toDocuments);
        break;
      case 'federalreservedocuments':  
        await this.federalReserveDocumentsService.saveData(data.toPersist, data.toProcessed);
        break;  
      case 'usbea':
        await this.usBeaService.saveData(data);
        break;
      default:
        throw new Error(`Unknown data source: ${source}`);
    }
  }
}
