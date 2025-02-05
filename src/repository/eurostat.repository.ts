import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Eurostat } from '../entities/eurostat.entity';

@Injectable()
export class EurostatRepository {
  constructor(
    @InjectRepository(Eurostat)
    private readonly repository: Repository<Eurostat>,
  ) {}

  async save(data: Eurostat[]): Promise<void> {
    await this.repository.save(data);
  }
}
