import { Module } from '@nestjs/common';
import { EuroparlTransformer } from './europarlTransformer';

@Module({
  providers: [EuroparlTransformer], // 🔹 On enregistre le transformer Europarl
  exports: [EuroparlTransformer], // 🔹 On exporte pour qu'il soit accessible ailleurs
})
export class TransformersModule {}
