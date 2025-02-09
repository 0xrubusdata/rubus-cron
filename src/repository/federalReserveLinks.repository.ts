import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FederalReserveLinks } from '../entities/federalReserveLinks.entity';

@Injectable()
export class FederalReserveLinksRepository {
  constructor(
    @InjectRepository(FederalReserveLinks)
    private readonly repository: Repository<FederalReserveLinks>,
  ) {}

  async save(data: FederalReserveLinks[]): Promise<FederalReserveLinks[]> {
    return await this.repository.save(data);
  }

  // Utilisation de insert() car on ne met jamais à jour ces liens
  async insertMany(links: FederalReserveLinks[]): Promise<void> {
    await this.repository.insert(links);
  }

  // Si jamais on veut récupérer tous les liens (utile pour la prochaine étape)
  async findAllUnprocessed(): Promise<FederalReserveLinks[]> {
    return this.repository.find({ where: { processed: false } });
  }

  async updateProcessedStatus(linkIds: number[]) {
    await this.repository.update({ id: In(linkIds) }, { processed: true });
  }

  async deleteOldUnprocessed(days: number): Promise<void> {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - days);
  
    await this.repository
      .createQueryBuilder()
      .delete()
      .where('processed = false')
      .andWhere('createdAt < :thresholdDate', { thresholdDate })
      .execute();
  }
  
}

