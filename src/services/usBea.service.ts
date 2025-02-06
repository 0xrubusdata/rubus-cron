import { Injectable } from '@nestjs/common';
import { UsBea } from '../entities/usBea.entity';
import { UsBeaRepository } from '../repository/usBea.repository';

@Injectable()
export class UsBeaService {
  constructor(private readonly repository: UsBeaRepository) {}

  async saveData(data: UsBea[]) {
    await this.repository.save(data);
  }
}
