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
import { FederalReserve } from '../entities/federalreserve.entity';
import { UsBea } from '../entities/usBea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentMetadata, Europarl, Eurostat, FederalReserve, UsBea])],
  providers: [ContentMetadataRepository, EuroparlRepository, EurostatRepository, FederalReserveRepository, UsBeaRepository],
  exports: [ContentMetadataRepository, EuroparlRepository, EurostatRepository, FederalReserveRepository, UsBeaRepository],
})
export class RepositoriesModule {}
