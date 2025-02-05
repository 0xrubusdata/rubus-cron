import { Injectable } from '@nestjs/common';
import { FederalReserve } from '../entities/federalreserve.entity';
import { FederalReserveRepository } from 'src/repository/federalReserve.repository';

@Injectable()
export class FederalReserveService {
  constructor(private readonly repository: FederalReserveRepository) {}

  async saveData(data: FederalReserve[]) {
    await this.repository.save(data);
  }
}
