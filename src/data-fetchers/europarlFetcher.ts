import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { Injectable } from '@nestjs/common';
import { ContentMetadataService } from '../services/contentMetadata.service';

@Injectable()
export class EuroparlFetcher {
  constructor(private readonly metadataService: ContentMetadataService) {}

  async fetchData(): Promise<any[]> {
    let results: any[] = [];
    const metadatas = await this.metadataService.getMetadataForSource('europarl');

    for (const metadata of metadatas) {
      try {
        console.log(`Fetching data from: ${metadata.url}`); // Debug
        const response = await axios.get(metadata.url);
        const parsedData = await parseStringPromise(response.data);

        // Extraction des articles
        const articles = parsedData.rss.channel[0].item.map((item: any) => ({
          title: item.title[0],
          link: item.link[0],
          publishedAt: new Date(item.pubDate[0]),
          content: item.description ? item.description[0] : '',
        }));

        results = [...results, ...articles];
      } catch (error) {
        console.error(`❌ Error fetching Europarl RSS feed from ${metadata.url}:`, error);
      }
    }

    return results;
  }
}
