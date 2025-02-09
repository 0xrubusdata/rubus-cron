import { Injectable } from '@nestjs/common';
import { FederalReserveRepository } from '../repository/federalReserve.repository';
import { FederalReserveDocumentsRepository } from '../repository/federalReserveDocuments.repository';

@Injectable()
export class FederalReserveDocumentsService {
  constructor(
    private readonly federalReserveRepository: FederalReserveRepository,
    private readonly federalReserveDocumentsRepository: FederalReserveDocumentsRepository
  ) {}

  async saveData(toPersist: { federalReserveId: number; content: string }[], toProcessed: number[]) {
    console.log(toPersist.length);
    console.log(toProcessed.length);
    // 🟢 1️⃣ Mettre à jour le contenu de FederalReserve avec les textes combinés
    if (toPersist.length > 0) {
      for (const item of toPersist) {
        // Récupérer l'ancien contenu si existant et l'ajouter au nouveau
        const existingRecord = await this.federalReserveRepository.findOneById(item.federalReserveId);
        const updatedContent = existingRecord?.content ? `${existingRecord.content}\n\n---\n\n${item.content}` : item.content;

        await this.federalReserveRepository.updateContent(item.federalReserveId, updatedContent);
      }
    }

    // 🟢 2️⃣ Marquer les documents comme traités
    if (toProcessed.length > 0) {
      await this.federalReserveDocumentsRepository.updateProcessedStatus(toProcessed);
    }
  }
}
