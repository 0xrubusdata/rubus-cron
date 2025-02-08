import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FederalReserveLinks } from '../entities/federalReserveLinks.entity';

@Injectable()
export class FederalReserveLinksRepository {
  constructor(
    @InjectRepository(FederalReserveLinks)
    private readonly repository: Repository<FederalReserveLinks>,
  ) {}

  // Utilisation de insert() car on ne met jamais à jour ces liens
  async insertMany(links: FederalReserveLinks[]): Promise<void> {
    await this.repository.insert(links);
  }

  // Si jamais on veut récupérer tous les liens (utile pour la prochaine étape)
  async findAllUnprocessed(): Promise<FederalReserveLinks[]> {
    return this.repository.find({ where: { processed: false } });
  }
}

