import { chromium } from 'playwright';

// =============================
// � SCRAPER REAL DO GOOGLE MAPS - 100% SEM DADOS MOCKADOS
// =============================
export async function scrapeGoogleMaps(keyword, city, options = {}) {
  const { maxItems = 20, retries = 3 } = options;
  let browser;

  const attemptScrape = async () => {
    let page;
    try {
      console.log(`\n📊 Analisando concorrência: ${keyword} em ${city}`);
      console.log(`🔍 Iniciando scraping REAL do Google Maps...`);

      browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-blink-features=AutomationControlled',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-breakpad',
          '--disable-client-side-phishing-detection',
          '--disable-default-apps',
          '--disable-hang-monitor',
          '--disable-ipc-flooding-protection',
          '--disable-popup-blocking',
          '--disable-prompt-on-repost',
          '--disable-sync'
        ]
      });

      // Criar contexto com user agent realista e stealth
      const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale: 'pt-BR',
        timezoneId: 'America/Sao_Paulo',
        geolocation: { latitude: -26.3045, longitude: -48.8487 },
        permissions: ['geolocation'],
      });

      const page = await context.newPage();

      // Stealth mode
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', {
          get: () => false,
        });
        Object.defineProperty(navigator, 'plugins', {
          get: () => [1, 2, 3, 4, 5],
        });
        Object.defineProperty(navigator, 'languages', {
          get: () => ['pt-BR', 'pt', 'en-US', 'en'],
        });
      });

      await page.setViewportSize({ width: 1366, height: 768 });
      await page.setDefaultNavigationTimeout(90000);
      await page.setDefaultTimeout(90000);

      const searchTerm = `${keyword} ${city}`;
      const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}/`;

      console.log(`📍 Navegando: ${searchTerm}`);

      try {
        await page.goto(searchUrl, {
          waitUntil: 'load',
          timeout: 30000
        });
      } catch {
        console.log('⚠️ Timeout - continuando mesmo assim...');
      }

      // Aguardar apenas o necessário
      await page.waitForTimeout(2000);

      // Buscar seletores em paralelo (mais rápido)
      const selectors = ['[role="option"]', '.Nv2PK', '[data-item-id]', 'div[role="button"]'];
      let elementFound = false;

      try {
        await Promise.race([
          ...selectors.map(sel => page.waitForSelector(sel, { timeout: 8000 }).then(() => { elementFound = true; })),
          page.waitForTimeout(8000)
        ]);
        if (elementFound) console.log('✓ Elementos encontrados');
      } catch {
        // Continuar mesmo se não encontrar
      }

      // Só faz scroll se realmente precisar (pula se conseguir 20+ itens)
      try {
        const scrollContainer = await page.locator('[role="region"]').first();
        let previousHeight = 0;
        let unchangedAttempts = 0;

        for (let scrollAttempt = 0; scrollAttempt < 3; scrollAttempt++) {
          const currentHeight = await scrollContainer.evaluate((el) => {
            el.scrollTop = el.scrollHeight;
            return el.scrollHeight;
          });

          if (currentHeight === previousHeight) {
            unchangedAttempts++;
            if (unchangedAttempts >= 1) break;
          } else {
            unchangedAttempts = 0;
          }

          previousHeight = currentHeight;
          await page.waitForTimeout(800);
        }
      } catch {
        // Scroll opcional - continua mesmo se falhar
      }

      // Verificação rápida de bloqueio (não analisa todo o texto)
      const bodyText = await page.textContent('body', { timeout: 2000 }).catch(() => '');
      if (bodyText && bodyText.includes('recaptcha')) {
        console.error('❌ Google bloqueou com recaptcha');
        throw new Error('Google recaptcha detected');
      }

      const competitorsData = await page.evaluate((maxItems) => {
        const results = [];
        const seenNames = new Set();

        let elements = document.querySelectorAll('[role="option"]');
        if (elements.length === 0) elements = document.querySelectorAll('.Nv2PK');
        if (elements.length === 0) elements = document.querySelectorAll('[data-item-id]');
        if (elements.length === 0) elements = document.querySelectorAll('div[role="button"]');
        if (elements.length === 0) elements = document.querySelectorAll('.x8hlje0');

        console.log(`[MAPS DOM] Encontrados ${elements.length} elementos`);

        // Processa apenas até maxItems (não maxItems * 2)
        for (let i = 0; i < Math.min(maxItems + 5, elements.length); i++) {
          try {
            const element = elements[i];
            if (!element || !element.innerText) continue;

            // Extrair link específico da empresa
            let companyMapsUrl = null;
            const link = element.querySelector('a[href*="maps"]') || element.querySelector('a[href]');
            if (link && link.href) {
              companyMapsUrl = link.href;
            }

            const fullText = element.innerText.trim();
            const lines = fullText.split('\n').filter((l) => l.trim());

            if (lines.length === 0) continue;

            const name = lines[0].trim();

            if (!name || name.length < 2 || seenNames.has(name)) continue;
            if (name.length > 100) continue;

            let rating = null;
            const ratingPatterns = [
              /(\d+[.,]\d+)\s*[★⭐]/,
              /[★⭐]\s*(\d+[.,]\d+)/,
              /(\d+[.,]\d+)\s*\(/,
              /(\d{1,2}[.,]\d)(?:\s|$)/,
              /Avaliacao:\s*(\d+[.,]\d+)/i,
              /Rating:\s*(\d+[.,]\d+)/i
            ];

            for (const pattern of ratingPatterns) {
              const match = fullText.match(pattern);
              if (match && match[1]) {
                const val = parseFloat(match[1].replace(',', '.'));
                if (val >= 0.1 && val <= 5) {
                  rating = val;
                  break;
                }
              }
            }

            let reviews = null;
            const reviewPatterns = [
              /\((\d{1,6})\s*(?:avaliação|avaliações|review|reviews|resenha|resenhas)\)/i,
              /(\d{1,6})\s*(?:avaliação|avaliações|review|reviews|resenha|resenhas)/i,
              /\((\d{1,6})\)/
            ];

            for (const pattern of reviewPatterns) {
              const match = fullText.match(pattern);
              if (match && match[1]) {
                const val = parseInt(match[1].replace(/[.,]/g, ''));
                if (val > 0 && val < 10000000) {
                  reviews = val;
                  break;
                }
              }
            }

            if (name && name.length >= 2 && name.length <= 100 && !seenNames.has(name)) {
              // Descartar anúncios patrocinados e termos genéricos
              if (/^(patrocinado|anuncio|ad|resultado de anuncio)/i.test(name)) {
                continue;
              }

              seenNames.add(name);
              results.push({
                name,
                rating,
                reviews,
                rawText: fullText.substring(0, 150),
                mapsUrl: companyMapsUrl  // URL específica da empresa
              });
            }
          } catch (e) {
            // Silenciar erros individuais
          }
        }

        return results.slice(0, maxItems);
      }, maxItems);

      console.log(
        `✅ Extraídos ${competitorsData.length} resultados REAIS do Google Maps DOM`
      );

      if (competitorsData && competitorsData.length > 0) {
        const competitors = competitorsData.map((comp, idx) => ({
          id: idx,
          name: comp.name,
          rating: comp.rating,
          reviews: comp.reviews,
          address: `${city}, Brasil`,
          phone: null,
          website: comp.rawText || null,
          mapsUrl: comp.mapsUrl || `https://www.google.com/maps/search/${encodeURIComponent(comp.name + ' ' + city)}/`,
          establishedYears: null,
          weeklyViews: null,
          source: 'google-maps-real'
        }));

        const validCompetitors = competitors.filter((c) => c.name);

        await context.close();
        await browser.close();
        console.log(`🎯 ✅ ${validCompetitors.length} empresas REAIS extraídas\n`);

        validCompetitors.slice(0, 5).forEach((c) => {
          console.log(
            `  • ${c.name} | Rating: ${c.rating !== null ? c.rating.toFixed(1) + '⭐' : 'N/A'
            } | Reviews: ${c.reviews || 'N/A'}`
          );
        });

        return validCompetitors;
      }

      await context.close();
      await browser.close();
      console.log(`⚠️ Nenhum dado foi encontrado no Google Maps\n`);
      return [];
    } catch (err) {
      console.error(`❌ Erro na extração: ${err.message}`);
      if (browser) {
        try {
          await browser.close();
        } catch (e) { }
      }
      throw err;
    }
  };

  // Retry logic
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(attempt > 1 ? `\n🔄 Tentativa ${attempt}/${retries}...` : '');
      return await attemptScrape();
    } catch (err) {
      if (attempt === retries) {
        console.error(`❌ Falhou apos ${retries} tentativas`);
        return [];
      }
      console.log(`⚠️ Tentativa ${attempt} falhou, aguardando antes de retry...`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  return [];
}