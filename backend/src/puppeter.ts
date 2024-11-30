import puppeteer, { Page } from 'puppeteer';

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
      return propertyElements.slice(15).map((property) => {
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

export const getSearchedPage = async (contract: string, type: string, address: string) => {
  let browser = null;
  const contractSelector = '#\\:R2l5r\\:-trigger';
  const typeSelector = '#\\:R4l5r\\:-trigger';
  const citySelector = '#\\:Rml5r\\:';
  const buttonSearchSelector = '#\\:R355r\\:';
  const firstOptionSelector = '.andes-list__item:first-child .andes-list__item-action';

  const optiontSelectorSet = (option: string) => {
    switch (option) {
      case 'Venta':
        return '#\\:R2l5r\\:-menu-list-option-242075';
      case 'Arriendo':
        return '#\\:R2l5r\\:-menu-list-option-242073';
      case 'Arriendo Temporal':
        return '#\\:R2l5r\\:-menu-list-option-242074';
      default:
        return "";
    }
  };
  const propertyOptions = {
    Departamentos: '#\\:R4l5r\\:-menu-list-option-MLC1472_242062',
    Casas: '#\\:R4l5r\\:-menu-list-option-MLC1466_242060',
    Oficinas: '#\\:R4l5r\\:-menu-list-option-MLC1478_242067',
    Parcelas: '#\\:R4l5r\\:-menu-list-option-MLC1496_242070',
    locales: '#\\:R4l5r\\:-menu-list-option-MLC50610_242065',
    terrenos: '#\\:R4l5r\\:-menu-list-option-MLC152992_245004',
    sitios: '#\\:R4l5r\\:-menu-list-option-MLC50613_245008',
    bodegas: '#\\:R4l5r\\:-menu-list-option-MLC50564_245003',
    industriales: '#\\:R4l5r\\:-menu-list-option-MLC50617_245009',
    agricolas: '#\\:R4l5r\\:-menu-list-option-MLC50623_242059',
    otrosInmuebles: '#\\:R4l5r\\:-menu-list-option-MLC1892_242068',
    estacionamientos: '#\\:R4l5r\\:-menu-list-option-MLC50620_242064',
    loteos: '#\\:R4l5r\\:-menu-list-option-MLC1493_245010',
  };

  const optionContractToSelect = optiontSelectorSet(contract);
  const optionTypeToSelect = propertyOptions[type as keyof typeof propertyOptions];
  const addressToSearch = address;

  console.log(optionContractToSelect, optionTypeToSelect, addressToSearch);

  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
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

    await page.waitForSelector(contractSelector);
    await page.click(contractSelector)
    await page.waitForSelector(optionContractToSelect, { visible: true });
    await page.click(optionContractToSelect);


    await page.waitForSelector(typeSelector, { visible: true });
    await page.click(typeSelector);
    await page.waitForSelector(optionTypeToSelect, { visible: true });
    await page.click(optionTypeToSelect);


    async function fillInput(page: any, selector: string, value: string) {
      await page.waitForSelector(selector, { visible: true });
      await page.focus(selector);
      await page.type(selector, value);
    }


    await fillInput(page, citySelector, addressToSearch);
    await page.waitForSelector(firstOptionSelector, { visible: true });
    await page.click(firstOptionSelector);

    await page.waitForSelector(buttonSearchSelector, { visible: true });
    await Promise.all([
      page.click(buttonSearchSelector),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);
    console.log('Scrapping propiedades');


    await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve(null);
          }
        }, 100);
      });
    });

    async function getGridData(page: Page) {
      return await page.evaluate(() => {
        // Seleccionar los elementos que contienen las propiedades
        const gridItems = document.querySelectorAll('.ui-search-result__wrapper');
        const properties: Property[] = [];

        // Convertir la NodeList en un array y recorrerla
        const gridItemsArray = Array.from(gridItems);

        gridItemsArray.forEach((item) => {
          // Extraer la información de cada propiedad
          const image = item.querySelector('.ui-search-result__image img')?.getAttribute('src') || null;
          const url = item.querySelector('.ui-search-result__image.ui-search-link')?.getAttribute('href') || null;
          const price = item.querySelector('.andes-money-amount__fraction')?.textContent?.trim() || null;
          const title = item.querySelector('.ui-search-item__title-label-grid')?.textContent?.trim() || null;
          const address = item.querySelector('.ui-search-item__location-label')?.textContent?.trim() || null;

          // Atributos adicionales, como tamaño y número de dormitorios
          const attributes = item.querySelectorAll('.ui-search-card-attributes__attribute');
          const size = attributes[2]?.textContent?.trim() || null; // 28 a 60 m² útiles
          const bedrooms = attributes[0]?.textContent?.trim() || null; // 1 a 2 dormitorios

          // Agregar la propiedad al array
          properties.push({
            image,
            url,
            price,
            title,
            address,
            size,
            bedrooms,
          });
        });

        return properties;
      });
    }
    const gridData = await getGridData(page);
    return gridData;
  } catch (error) {
    console.error('Error en el scraping:', error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}