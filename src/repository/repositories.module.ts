import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentMetadata } from '../entities/contentMetadata.entity';
import { Europarl } from '../entities/europarl.entity';
import { Eurostat } from '../entities/eurostat.entity';
import { FederalReserve } from '../entities/federalReserve.entity';
import { FederalReserveLinks } from '../entities/federalReserveLinks.entity';
import { FederalReserveDocuments } from '../entities/federalReserveDocuments.entity';

import { ContentMetadataRepository } from './contentMetadata.repository';
import { EuroparlRepository } from './europarl.repository';
import { EurostatRepository } from './eurostat.repository';
import { FederalReserveRepository } from './federalReserve.repository';
import { FederalReserveLinksRepository } from './federalReserveLinks.repository';
import { FederalReserveDocumentsRepository } from './federalReserveDocuments.repository';
import { UsBeaRepository } from './usBea.repository';
import { UsBea } from '../entities/usBea.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContentMetadata, 
      Europarl, 
      Eurostat, 
      FederalReserve, 
      FederalReserveLinks, 
      FederalReserveDocuments, 
      UsBea])
    ],
  providers: [
    ContentMetadataRepository, 
    EuroparlRepository, 
    EurostatRepository, 
    FederalReserveRepository, 
    FederalReserveLinksRepository, 
    FederalReserveDocumentsRepository, 
    UsBeaRepository
  ],
  exports: [
    ContentMetadataRepository, 
    EuroparlRepository, 
    EurostatRepository, 
    FederalReserveRepository, 
    FederalReserveLinksRepository, 
    FederalReserveDocumentsRepository,
    UsBeaRepository
  ],
})
export class RepositoriesModule {}
