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
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navegar a la página real
  await page.goto('https://www.portalinmobiliario.com/', { waitUntil: 'domcontentloaded' });

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

  await browser.close();
};
