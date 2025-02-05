import { Injectable } from '@nestjs/common';
import { Europarl } from '../entities/europarl.entity';
import { EuroparlRepository } from 'src/repository/europarl.repository';

@Injectable()
export class EuroparlService {
  constructor(private readonly repository: EuroparlRepository) {}

  async saveData(data: Europarl[]) {
    await this.repository.save(data);
  }
}
