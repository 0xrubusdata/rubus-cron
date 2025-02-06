import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { IFetcher } from './IFetcher';
import { ContentMetadataService } from '../services/contentMetadata.service';

@Injectable()
export class EurostatFetcher implements IFetcher {
  constructor(private metadataService: ContentMetadataService) {}

  async fetchData(): Promise<any[]> {
    let results: any[] = [];
    const metadatas = await this.metadataService.getMetadataForSource('eurostat');

    for (const metadata of metadatas) {
      try {
        const response = await axios.get(metadata.url);
        const parsedData = await parseStringPromise(response.data, { explicitArray: false });

        if (parsedData.feed && parsedData.feed.entry) {
          const entries = Array.isArray(parsedData.feed.entry) ? parsedData.feed.entry : [parsedData.feed.entry];

          const formattedEntries = entries.map((entry: any) => ({
            title: entry.title,
            link: entry.link?.['$']?.href || '',
            publishedAt: new Date(entry.published),
            content: entry.summary?._ || '',
          }));

          results = [...results, ...formattedEntries];
        }
      } catch (error) {
        console.error(`Error fetching Eurostat Atom feed from ${metadata.url}:`, error);
      }
    }

    return results;
  }
}
