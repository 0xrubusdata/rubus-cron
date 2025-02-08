import { Module } from '@nestjs/common';
import { PersistDataService } from './persistData.service';
import { ContentMetadataService } from './contentMetadata.service';
import { RepositoriesModule } from '../repository/repositories.module';
import { EuroparlService } from './europarl.service';
import { EurostatService } from './eurostat.service';
import { FederalReserveService } from './federalReserve.service';
import { UsBeaService } from './usBea.service';
import { FederalReserveLinksService } from './federalReserveLinks.service';

@Module({
  imports: [RepositoriesModule],
  providers: [PersistDataService, ContentMetadataService, EuroparlService, EurostatService, FederalReserveService, FederalReserveLinksService, UsBeaService],
  exports: [PersistDataService, ContentMetadataService, EuroparlService, EurostatService, FederalReserveService, FederalReserveLinksService, UsBeaService],
})
export class ServicesModule {}
