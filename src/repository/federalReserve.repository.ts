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

  async updateContent(id: number, content: string): Promise<void> {
    await this.repository.update(id, { content });
  }

  async findOneById(id: number): Promise<FederalReserve | null> {
    return await this.repository.findOneBy({
      id: 1,
    })
  }
}
