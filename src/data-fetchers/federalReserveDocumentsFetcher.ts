import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as pdf from 'pdf-parse';
import { FederalReserveDocumentsRepository } from '../repository/federalReserveDocuments.repository';

@Injectable()
export class FederalReserveDocumentsFetcher {
  constructor(private readonly documentsRepository: FederalReserveDocumentsRepository) {}

  async fetchData(): Promise<{ federalReserveLinkId: number; content: string }[]> {  // ✅ Format Aligné !
    console.log('🔍 Fetching unprocessed Federal Reserve documents...');
  
    const documents = await this.documentsRepository.findAllUnprocessed();
  
    if (documents.length === 0) {
      console.log('⚠️ No unprocessed documents found.');
      return [];
    }
  
    console.log(`🔹 Found ${documents.length} unprocessed documents, fetching content...`);

    const results: { federalReserveLinkId: number; content: string }[] = [];

    for (const document of documents) {
      try {
        console.log(`📥 Downloading PDF: ${document.url}`);

        // 🏗️ Télécharger le PDF
        const response = await axios.get(document.url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);

        // 🔍 Extraire le texte
        const pdfData = await pdf(buffer);

        // ✅ Ajouter au résultat avec le bon format
        results.push({
          federalReserveLinkId: document.federalReserveLinks.id, // 🔥 Lien correct avec FederalReserveLinks
          content: pdfData.text.trim(),
        });

        console.log(`✅ Extracted text from: ${document.url}`);
      } catch (error) {
        console.error(`❌ Error processing ${document.url}:`, error.message);
      }
    }

    return results;
  }
}
