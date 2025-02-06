import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class EurostatTransformer {
  transform(rawData: any[]): any[] {
    return rawData
      .filter((item) => item.content && item.content.trim() !== '') // 🔹 Ignore les entrées vides
      .map((item) => {
        const cleanedContent = this.cleanHTML(item.content);
        return {
          title: item.title,
          link: item.link,
          publishedAt: new Date(item.publishedAt),
          summary: this.extractSummary(cleanedContent),
          content: cleanedContent,
        };
      });
  }

  private cleanHTML(html: string): string {
    const $ = cheerio.load(html);
    return $.text().trim(); // 🔹 Supprime les balises HTML et espaces inutiles
  }

  private extractSummary(content: string): string {
    return content.split('.').slice(0, 2).join('.') + '.'; // 🔹 Prend les 2 premières phrases
  }
}
