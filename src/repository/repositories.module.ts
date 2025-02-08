import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentMetadataRepository } from './contentMetadata.repository';
import { EuroparlRepository } from './europarl.repository';
import { ContentMetadata } from '../entities/contentMetadata.entity';
import { Europarl } from '../entities/europarl.entity';
import { EurostatRepository } from './eurostat.repository';
import { FederalReserveRepository } from './federalReserve.repository';
import { UsBeaRepository } from './usBea.repository';
import { Eurostat } from '../entities/eurostat.entity';
import { FederalReserve } from '../entities/federalReserve.entity';
import { UsBea } from '../entities/usBea.entity';
import { FederalReserveLinksRepository } from './federalReserveLinks.repository';
import { FederalReserveLinks } from '../entities/federalReserveLinks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentMetadata, Europarl, Eurostat, FederalReserve, FederalReserveLinks, UsBea])],
  providers: [ContentMetadataRepository, EuroparlRepository, EurostatRepository, FederalReserveRepository, FederalReserveLinksRepository, UsBeaRepository],
  exports: [ContentMetadataRepository, EuroparlRepository, EurostatRepository, FederalReserveRepository, FederalReserveLinksRepository, UsBeaRepository],
})
export class RepositoriesModule {}
