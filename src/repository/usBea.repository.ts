import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsBea } from '../entities/usBea.entity';

@Injectable()
export class UsBeaRepository {
  constructor(
    @InjectRepository(UsBea)
    private readonly repository: Repository<UsBea>,
  ) {}

  async save(data: UsBea[]): Promise<void> {
    await this.repository.save(data);
  }
}
