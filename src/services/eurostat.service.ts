import { Injectable } from '@nestjs/common';
import { Eurostat } from '../entities/eurostat.entity';
import { EurostatRepository } from '../repository/eurostat.repository';

@Injectable()
export class EurostatService {
  constructor(private readonly repository: EurostatRepository) {}

  async saveData(data: Eurostat[]) {
    await this.repository.save(data);
  }
}
