import { Module } from '@nestjs/common';
import { EuroparlTransformer } from './europarlTransformer';
import { EurostatTransformer } from './eurostatTransformer';
import { FederalReserveTransformer } from './federalReserveTransformer';
import { FederalReserveLinksTransformer } from './federalReserveLinksTransformer';
import { FederalReserveDocumentsTransformer } from './federalReserveDocumentsTransformer';

@Module({
  providers: [EuroparlTransformer, EurostatTransformer, FederalReserveTransformer, FederalReserveLinksTransformer, FederalReserveDocumentsTransformer], // 🔹 On enregistre le transformer Europarl
  exports: [EuroparlTransformer, EurostatTransformer, FederalReserveTransformer, FederalReserveLinksTransformer, FederalReserveDocumentsTransformer], // 🔹 On exporte pour qu'il soit accessible ailleurs
})
export class TransformersModule {}
