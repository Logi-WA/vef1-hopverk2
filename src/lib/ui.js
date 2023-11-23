import { getProduct, getProducts, searchProducts } from './api.js';
import { el, card, empty } from './elements.js';

/**
 * Býr til leitarform.
 * @param {(e: SubmitEvent) => void} searchHandler Fall sem keyrt er þegar leitað er.
 * @param {string | undefined} query Leitarstrengur.
 * @returns {HTMLElement} Leitarform.
 */
export function renderSearchForm(searchHandler, query = undefined) {
  const search = el('input', {
    class: 'search-input',
    type: 'search',
    placeholder: 'Leita...',
    value: query ?? '',
  });
  const button = el(
    'button',
    { class: 'search-btn' },
    el('img', {
      class: 'search-icon',
      src: './icon/search.png',
      alt: '',
    }),
  );

  const container = el('form', { class: 'search-bar' }, search, button);
  container.addEventListener('submit', searchHandler);
  return container;
}

/**
 * Setur „loading state“ skilabað meðan gögn eru sótt.
 * @param {Element} parentElement Element sem á að birta skilbaoð í.
 * @param {Element | undefined} searchForm Leitarform sem á að gera óvirkt.
 */
function setLoading(parentElement, searchForm = undefined) {
  let loadingElement = parentElement.querySelector('.loading');

  if (!loadingElement) {
    loadingElement = el('div', { class: 'loading' }, 'Sæki gögn...');
    parentElement.appendChild(loadingElement);
  }

  if (!searchForm) {
    return;
  }

  const button = searchForm.querySelector('button');

  if (button) {
    button.setAttribute('disabled', 'disabled');
  }
}

/**
 * Fjarlægir „loading state“.
 * @param {Element} parentElement Element sem inniheldur skilaboð.
 * @param {Element | undefined} searchForm Leitarform sem á að gera virkt.
 */
function setNotLoading(parentElement, searchForm = undefined) {
  const loadingElement = parentElement.querySelector('.loading');

  if (loadingElement) {
    loadingElement.remove();
  }

  if (!searchForm) {
    return;
  }

  const disabledButton = searchForm.querySelector('button[disabled]');

  if (disabledButton) {
    disabledButton.removeAttribute('disabled');
  }
}

/**
 * Birta niðurstöður úr leit.
 * @param {import('./api.types.js').Product[] | null} results Niðurstöður úr leit
 */
function createSearchResults(results) {
  if (!results) {
    const error = el('p', { class: 'result' }, 'Villa við að sækja gögn.');
    return error;
  }

  if (results.length === 0) {
    const notFound = el('p', { class: 'result' }, 'Ekkert fannst.');
    return notFound;
  }

  const container = el('div', { class: 'result product-grid grid' });

  for (const result of results) {
    container.appendChild(card(result));
  }

  return container;
}

/**
 *
 * @param {Element} parentElement Element sem á að birta niðurstöður í.
 * @param {Element} searchForm Form sem á að gera óvirkt.
 * @param {string} query Leitarstrengur.
 */
export async function searchAndRender(parentElement, searchForm, query) {
  parentElement.querySelector('.result')?.remove();
  parentElement.querySelector('#newProds')?.remove();

  setLoading(parentElement, searchForm);
  const results = await searchProducts(query);
  setNotLoading(parentElement, searchForm);

  const resultsEl = createSearchResults(results);

  parentElement.appendChild(resultsEl);
}

/**
 * Sýna forsíðu, hugsanlega með leitarniðurstöðum.
 * @param {Element} parentElement Element sem á að innihalda forsíðu.
 * @param {(e: SubmitEvent) => void} searchHandler Fall sem keyrt er þegar leitað er.
 * @param {string | undefined} query Leitarorð, ef eitthvað, til að sýna niðurstöður fyrir.
 */
export async function renderFrontpage(
  parentElement,
  searchHandler,
  query = undefined,
) {
  const searchForm = renderSearchForm(searchHandler, query);
  parentElement.appendChild(searchForm);

  if (query) {
    searchAndRender(parentElement, searchForm, query);
    return;
  }

  const newProductsContainer = el(
    'div',
    { class: 'new-products', id: 'newProds' },
    el('h2', {}, 'Nýjar vörur'),
  );

  parentElement.appendChild(newProductsContainer);

  setLoading(newProductsContainer, searchForm);
  const results = await getProducts('6');
  setNotLoading(newProductsContainer, searchForm);

  const resultsEl = createSearchResults(results);

  newProductsContainer.appendChild(resultsEl);
}

/**
 * Sýna vöru.
 * @param {Element} parentElement Element sem á að innihalda vöru.
 * @param {string} id Auðkenni vöru.
 */
export async function renderProduct(parentElement, id) {
  empty(parentElement);

  setLoading(parentElement);
  const product = await getProduct(id);
  setNotLoading(parentElement);

  // Tómt og villu state, við gerum ekki greinarmun á þessu tvennu, ef við
  // myndum vilja gera það þyrftum við að skilgreina stöðu fyrir niðurstöðu
  if (!product) {
    parentElement.appendChild(el('p', {}, 'Villa við að sækja vöru!'));
    return;
  }

  const productInformation = el(
    'div',
    { class: 'product-information' },
    el('h1', { class: 'product-name' }, product.title),
    el(
      'p',
      { class: 'product-category' },
      `Flokkur: ${product.category_title}`,
    ),
    el('p', { class: 'product-price' }, `Verð: ${product.price} kr.-`),
    el('div', { class: 'product-text' }, el('p', {}, product.description)),
  );

  const productPage = el(
    'div',
    { class: 'page-product' },
    el('img', { class: 'product-img', src: product.image }),
    productInformation,
  );

  const relatedTitle = el(
    'h2',
    { class: 'category-header' },
    `Skoðaðu meira úr ${product.category_title}`,
  );

  parentElement.appendChild(productPage);
  parentElement.appendChild(relatedTitle);

  setLoading(parentElement);
  const results = await getProducts('3', product.category_title);
  setNotLoading(parentElement);

  const resultsEl = createSearchResults(results);

  parentElement.appendChild(resultsEl);
}

/**
 * Birtir allar vörur.
 * @param {Element} parentElement Element sem á að birta vörur í.
 */
export async function renderProducts(parentElement) {
  setLoading(parentElement);
  const results = await getProducts('30');
  setNotLoading(parentElement);

  const resultsEl = createSearchResults(results);

  parentElement.appendChild(resultsEl);
}
