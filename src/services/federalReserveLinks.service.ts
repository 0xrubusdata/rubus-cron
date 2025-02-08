import { Injectable } from '@nestjs/common';
import { FederalReserve } from '../entities/federalReserve.entity';
import { FederalReserveDocuments } from '../entities/federalReserveDocuments.entity';
import { FederalReserveRepository } from '../repository/federalReserve.repository';
import { FederalReserveLinksRepository } from '../repository/federalReserveLinks.repository';
import { FederalReserveDocumentsRepository } from '../repository/federalReserveDocuments.repository';

@Injectable()
export class FederalReserveLinksService {
  constructor(
    private readonly repository: FederalReserveRepository,
    private readonly linksRepository: FederalReserveLinksRepository,
    private readonly documentsRepository: FederalReserveDocumentsRepository
  ) {}

  async saveData(
    toPersist: { id: number; content: string }[],
    toDocuments: { federalReserveLinkId: number; url: string }[]
  ) {
    // 🟢 1️⃣ Mettre à jour FederalReserve avec les nouveaux contenus
    if (toPersist.length > 0) {
      for (const item of toPersist) {
        await this.repository.updateContent(item.id, item.content);
      }
    }

    // 🟢 2️⃣ Marquer tous les liens traités comme "processed"
    const processedLinkIds = [...toPersist.map(p => p.id), ...toDocuments.map(d => d.federalReserveLinkId)];
    if (processedLinkIds.length > 0) {
      await this.linksRepository.updateProcessedStatus(processedLinkIds);
    }

    // 🟢 3️⃣ Insérer les nouveaux documents liés
    if (toDocuments.length > 0) {
      const documentsToSave = toDocuments.map((doc) => {
        const federalReserveDocument = new FederalReserveDocuments();
        federalReserveDocument.url = doc.url;
        federalReserveDocument.federalReserveLinks = { id: doc.federalReserveLinkId } as any;
        return federalReserveDocument;
      });

      if (documentsToSave.length > 0) {
        await this.documentsRepository.insertMany(documentsToSave);
      }
    }
  }
}
