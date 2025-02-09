import { Injectable } from '@nestjs/common';
import { FederalReserveDocumentsRepository } from '../repository/federalReserveDocuments.repository';
import { FederalReserveLinksRepository } from '../repository/federalReserveLinks.repository';

@Injectable()
export class CleanJobService {
  constructor(
    private readonly documentsRepository: FederalReserveDocumentsRepository,
    private readonly linksRepository: FederalReserveLinksRepository
  ) {}

  async cleanOldEntries() {
    console.log('🧹 Running Clean Job...');

    // 🔍 Suppression des entrées non traitées après 3 jours
    await this.documentsRepository.deleteOldUnprocessed(3);
    await this.linksRepository.deleteOldUnprocessed(3);

    console.log('✅ Clean Job Completed!');
  }
}
