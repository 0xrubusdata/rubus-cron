export class FederalReserveLinksTransformer {
    transform(data: { id: number; htmlContent: string; pdfLinks: string[] }[]) {
      const toPersist: { id: number; content: string }[] = [];
      const toDocuments: { federalReserveLinkId: number; url: string }[] = [];
  
      for (const item of data) {
        const content = item.htmlContent.trim();
        const hasPdf = item.pdfLinks.length > 0;
  
        // 🔥 Nouvelle règle pour filtrer le texte
        if (content.length > 1000 || (!hasPdf && content.length > 500)) {
          toPersist.push({
            id: item.id,
            content,
          });
        } else {
          // Si le texte est court et qu'il y a un PDF, on garde les PDF
          for (const pdfUrl of item.pdfLinks) {
            toDocuments.push({
              federalReserveLinkId: item.id,
              url: pdfUrl,
            });
          }
        }
      }
  
      return { toPersist, toDocuments };
    }
  }
  