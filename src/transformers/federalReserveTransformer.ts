import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class FederalReserveTransformer {
  transform(rawData: any[]): { toPersist: any[]; toLink: any[] } {
    const toPersist: any[] = [];
    const toLink: any[] = [];

    rawData.forEach((item) => {
      const cleanedContent = this.cleanHTML(item.content);

      // Vérifier si le lien doit être stocké dans federal_reserve_links
      const shouldStoreLink = !cleanedContent || cleanedContent.trim() === item.title.trim();

      // Ajouter à la persistance principale
      toPersist.push({
        title: item.title,
        link: item.link,
        category: item.category,
        publishedAt: new Date(item.publishedAt),
        content: shouldStoreLink ? null : cleanedContent,
      });

      // Ajouter à federal_reserve_links si nécessaire
      if (shouldStoreLink) {
        toLink.push({ url: item.link });
      }
    });

    return { toPersist, toLink };
  }

  private cleanHTML(html: string): string {
    const $ = cheerio.load(html);
    return $.text().trim(); // 🔹 Supprime les balises HTML et nettoie le texte
  }
}
