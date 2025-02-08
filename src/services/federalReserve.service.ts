import { Injectable } from '@nestjs/common';
import { FederalReserve } from '../entities/federalReserve.entity';
import { FederalReserveRepository } from '../repository/federalReserve.repository';
import { FederalReserveLinksRepository } from '../repository/federalReserveLinks.repository';
import { FederalReserveLinks } from '../entities/federalReserveLinks.entity';

@Injectable()
export class FederalReserveService {
  constructor(
    private readonly repository: FederalReserveRepository,
    private readonly linksRepository: FederalReserveLinksRepository
  ) {}

  async saveData(toPersist: FederalReserve[], toLink: { url: string }[]) {
    if (toPersist.length > 0) {
      const savedArticles = await this.repository.save(toPersist);
      
      if (toLink && toLink.length > 0) {  // 🔹 Vérifie que toLink est bien défini
        const linksToSave = toLink.map((link, index) => {
          const federalReserveLink = new FederalReserveLinks();
          federalReserveLink.url = link.url;
          federalReserveLink.federalReserve = savedArticles[index]; // 🔥 On passe l'entité complète
        
          return federalReserveLink;
        });
        
        if (linksToSave.length > 0) {
          await this.linksRepository.insertMany(linksToSave);
        }                
      }
    }
  }

}
