import puppeteer from 'puppeteer';

interface Property {
  image: string | null;
  url: string | null;
  price: string | null;
  title: string | null;
  address: string | null;
  size: string | null;
  bedrooms: string | null;
}

export const getLandingPage = async () => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await browser.newPage();

    // Configurar user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Configurar viewport
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto('https://www.portalinmobiliario.com/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    // Extraer información de múltiples propiedades
    const properties: Property[] = await page.evaluate(() => {
      const propertyElements = Array.from(document.querySelectorAll('.ui-item__wrapper'));
      return propertyElements.map((property) => {
        const image = property.querySelector('.ui-item__image-container img')?.getAttribute('src') || null;
        const url = property.querySelector('a')?.getAttribute('href') || null;
        const priceContext = property.querySelector('.ui-item__price_context_message')?.textContent?.trim() || '';
        const priceFraction = property.querySelector('.andes-money-amount__fraction')?.textContent?.trim() || '';
        const price = priceContext && priceFraction ? `${priceContext} ${priceFraction}` : null;
        const title = property.querySelector('.ui-item__top-title')?.textContent?.trim() || null;
        const address = property.querySelector('.ui-item__middle-title')?.textContent?.trim() || null;
        const size = Array.from(
          property.querySelectorAll('p[itemprop="name"]')
        )[0]?.textContent?.trim() || null;
        const bedrooms = Array.from(
          property.querySelectorAll('p[itemprop="name"]')
        )[1]?.textContent?.trim() || null;

        return { image, url, price, title, address, size, bedrooms };
      });
    });

    console.log(properties);
    return properties;
  } catch (error) {
    console.error('Error en el scraping:', error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
};
