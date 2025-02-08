import { Module } from '@nestjs/common';
import { EuroparlTransformer } from './europarlTransformer';
import { EurostatTransformer } from './eurostatTransformer';
import { FederalReserveTransformer } from './federalReserveTransformer';

@Module({
  providers: [EuroparlTransformer, EurostatTransformer, FederalReserveTransformer], // 🔹 On enregistre le transformer Europarl
  exports: [EuroparlTransformer, EurostatTransformer, FederalReserveTransformer], // 🔹 On exporte pour qu'il soit accessible ailleurs
})
export class TransformersModule {}
