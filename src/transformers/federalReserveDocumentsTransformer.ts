export class FederalReserveDocumentsTransformer {
  transform(data: { federalReserveLinkId: number; content: string }[]) {
    const groupedByReserveId: Record<number, string[]> = {};
    const toProcessed: number[] = [];

    for (const item of data) {
      const { federalReserveLinkId, content } = item;

      if (!groupedByReserveId[federalReserveLinkId]) {
        groupedByReserveId[federalReserveLinkId] = [];
      }
      groupedByReserveId[federalReserveLinkId].push(content);
      toProcessed.push(federalReserveLinkId);
    }

    const toPersist = Object.entries(groupedByReserveId).map(([federalReserveId, contents]) => ({
      federalReserveId: parseInt(federalReserveId),
      content: contents.join('\n\n---\n\n') // 🔥 Fusionne les textes avec un séparateur
    }));

    return { toPersist, toProcessed };
  }
}
