import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { FederalReserveLinksRepository } from '../repository/federalReserveLinks.repository';

@Injectable()
export class FederalReserveLinksFetcher {
  constructor(private readonly linksRepository: FederalReserveLinksRepository) {}

  async fetchData(): Promise<{ id: number; url: string; htmlContent: string; pdfLinks: string[] }[]> {
    console.log('🔍 Fetching unprocessed Federal Reserve links...');
  
    const links = await this.linksRepository.findAllUnprocessed();
  
    if (links.length === 0) {
      console.log('⚠️ No unprocessed links found.');
      return [];
    }
  
    console.log(`🔹 Found ${links.length} unprocessed links, fetching content...`);

    // ✅ On initialise Puppeteer ici pour éviter de l'ouvrir/fermer à chaque requête
    const browser = await puppeteer.launch({ headless: true });
    const results: { id: number; url: string; htmlContent: string; pdfLinks: string[] }[] = [];
  
    for (const link of links) {
      try {
        console.log(`🚀 Fetching page content: ${link.url}`);

        const page = await browser.newPage();
        await page.goto(link.url, { waitUntil: "domcontentloaded" });

        // Optionnel : Attendre un sélecteur spécifique si besoin
        await page.waitForSelector('body');

        // ✅ Récupère le contenu HTML complet de la page
        const htmlContent = await page.evaluate(() => {
          const articleDivs = document.querySelectorAll('#article div'); // 📌 Sélectionne tous les divs de l'article
          if (articleDivs.length >= 3) {
            const targetDiv = articleDivs[2] as HTMLElement; // 🔹 Cast explicite en HTMLElement
            return targetDiv.innerText.trim(); // ✅ Récupère proprement le texte du bon div
          }
          return ''; // 🔍 Sécurité : Si la structure est différente, renvoyer une chaîne vide
        });

        // ✅ Récupère tous les liens PDF
        const pdfLinks = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('a[href$=".pdf"]'))
            .map((a) => (a as HTMLAnchorElement).href.trim());
        });

        results.push({
          id: link.id,
          url: link.url,
          htmlContent,
          pdfLinks,
        });

        console.log(`✅ Successfully fetched: ${link.url}`);
        console.log(`🔗 Found ${pdfLinks.length} PDFs`);

        await page.close();
      } catch (error) {
        console.error(`❌ Error fetching ${link.url}:`, error.message);
      }
    }

    await browser.close();
  
    return results;
  }
}
