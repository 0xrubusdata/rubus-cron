import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FederalReserve } from '../entities/federalReserve.entity';

@Injectable()
export class FederalReserveRepository {
  constructor(
    @InjectRepository(FederalReserve)
    private readonly repository: Repository<FederalReserve>,
  ) {}

  async save(data: FederalReserve[]): Promise<FederalReserve[]> {
    return await this.repository.save(data);
  }
}
