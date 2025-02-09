import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FederalReserveDocuments } from '../entities/federalReserveDocuments.entity';

@Injectable()
export class FederalReserveDocumentsRepository {
  constructor(
    @InjectRepository(FederalReserveDocuments)
    private readonly repository: Repository<FederalReserveDocuments>,
  ) {}

  // Utilisation de insert() car on ne met jamais à jour ces liens
  async insertMany(links: FederalReserveDocuments[]): Promise<void> {
    await this.repository.insert(links);
  }

  // Si jamais on veut récupérer tous les liens (utile pour la prochaine étape)
  async findAllUnprocessed(): Promise<FederalReserveDocuments[]> {
    return await this.repository.find({
      where: { processed: false },
      relations: ['federalReserveLinks'],  // ✅ Charge explicitement la relation
    });
  }
    
  async updateProcessedStatus(linkIds: number[]) {
    await this.repository.update({ federalReserveLinks: In(linkIds) }, { processed: true });
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

