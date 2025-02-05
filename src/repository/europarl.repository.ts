import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Europarl } from '../entities/europarl.entity';

@Injectable()
export class EuroparlRepository {
  constructor(
    @InjectRepository(Europarl)
    private readonly repository: Repository<Europarl>,
  ) {}

  async save(data: Europarl[]): Promise<void> {
    await this.repository.save(data);
  }
}
