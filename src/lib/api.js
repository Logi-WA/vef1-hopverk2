/**
 * API föll.
 * @see https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/
 */

/**
 * Sækjum týpurnar okkar.
 * @typedef {import('./api.types.js').Product} Product
 * @typedef {import('./api.types.js').ProductSearchResult} ProductSearchResult
 */

/** Grunnslóð á API */
const API_URL = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/';

/**
 * Skilar Promise sem bíður í gefnar millisekúndur.
 * @param {number} ms Tími til að sofa í millisekúndum.
 * @returns {Promise<void>}
 */
export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}

/**
 * Leita að vörum í API eftir leitarstreng.
 * @param {string} query Leitarstrengur.
 * @returns {Promise<Product[] | null>} Fylki af vörum eða `null` ef villa
 *  kom upp.
 */
export async function searchProducts(query) {
  const url = new URL('products', API_URL);
  url.searchParams.set('search', query);

  // await sleep(1000);

  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja gögn', e);
    return null;
  }

  if (!response.ok) {
    console.error('Fékk ekki 200 status frá API', response);
    return null;
  }

  /** @type {ProductSearchResult | null} */
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error('Villa við að lesa gögn', e);
    return null;
  }

  /** @type {Product[]} */
  const items = data?.items ?? [];

  return items;
}

/**
 * Skilar vörum eða `null` ef ekkert fannst.
 * @param {string | null} limit Hámarksfjöldi vara sem má skila.
 * @param {string | null} category Vöruflokkur sem vörurnar eiga að tilheyra ef tilgreint.
 * @returns {Promise<Product[] | null>} Vörur.
 */
export async function getProducts(limit = null, category = null) {
  const url = new URL('products', API_URL);
  if (limit) {
    url.searchParams.set('limit', limit);
  }
  if (category) {
    url.searchParams.set('category', category);
  }

  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja gögn', e);
    return null;
  }

  if (!response.ok) {
    console.error('Fékk ekki 200 status frá API', response);
    return null;
  }

  /** @type {ProductSearchResult | null} */
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error('Villa við að lesa gögn', e);
    return null;
  }

  /** @type {Product[]} */
  const items = data?.items ?? [];

  return items;
}

/**
 * Skilar vöru eftir auðkenni eða `null` ef ekkert fannst.
 * @param {string} id Auðkenni vöru.
 * @returns {Promise<Product | null>} Vara.
 */
export async function getProduct(id) {
  const url = new URL(`products/${id}`, API_URL);

  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja gögn', e);
    return null;
  }

  if (!response.ok) {
    console.error('Fékk ekki 200 status frá API', response);
    return null;
  }

  /** @type {Product} */
  let product;

  try {
    product = await response.json();
  } catch (e) {
    console.error('Villa við að lesa gögn', e);
    return null;
  }

  return product;
}