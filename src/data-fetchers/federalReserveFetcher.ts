import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { IFetcher } from './IFetcher';
import { ContentMetadataService } from '../services/contentMetadata.service';

@Injectable()
export class FederalReserveFetcher implements IFetcher {
  constructor(private metadataService: ContentMetadataService) {}

  async fetchData(): Promise<any[]> {
    let results: any[] = [];
    const metadatas = await this.metadataService.getMetadataForSource('federalreserve');

    for (const metadata of metadatas) {
      try {
        const response = await axios.get(metadata.url);
        const parsedData = await parseStringPromise(response.data, { explicitArray: false });

        if (parsedData.rss && parsedData.rss.channel && parsedData.rss.channel.item) {
          const entries = Array.isArray(parsedData.rss.channel.item)
            ? parsedData.rss.channel.item
            : [parsedData.rss.channel.item];

          const formattedEntries = entries.map((entry: any) => ({
            title: entry.title,
            link: entry.link,
            category: entry.category || 'General',
            publishedAt: new Date(entry.pubDate),
            content: entry.description || '',
          }));

          results = [...results, ...formattedEntries];
        }
      } catch (error) {
        console.error(`Error fetching Federal Reserve RSS feed from ${metadata.url}:`, error);
      }
    }

    return results;
  }
}
