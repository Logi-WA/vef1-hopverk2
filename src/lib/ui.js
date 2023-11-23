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
  const button = el('button', { class: 'search-btn' },
    el('img', {
      class: 'search-icon',
      src: './icon/search.png',
      alt: ''
    })
  );

  const container = el('form', { class: 'search-bar' }, search, button);
  container.addEventListener('submit', searchHandler);
  return container;
}

/**
 * Setur „loading state“ skilabað meðan gögn eru sótt.
 * @param {HTMLElement} parentElement Element sem á að birta skilbaoð í.
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
 * @param {HTMLElement} parentElement Element sem inniheldur skilaboð.
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
 * @param {HTMLElement} parentElement Element sem á að birta niðurstöður í.
 * @param {Element} searchForm Form sem á að gera óvirkt.
 * @param {string} query Leitarstrengur.
 */
export async function searchAndRender(parentElement, searchForm, query) {
  const mainElement = parentElement.querySelector('.page-content');

  if (!mainElement) {
    console.warn('fann ekki page content element');
    return;
  }

  // Fjarlægja fyrri niðurstöður
  const resultElement = document.querySelector('.result');
  if (resultElement) {
    resultElement.remove();
  }

  setLoading(mainElement, searchForm);
  const results = await searchProducts(query);
  setNotLoading(mainElement, searchForm);

  const resultsEl = createSearchResults(results);

  mainElement.appendChild(resultsEl);
}

/**
 * Sýna forsíðu, hugsanlega með leitarniðurstöðum.
 * @param {HTMLElement} parentElement Element sem á að innihalda forsíðu.
 * @param {(e: SubmitEvent) => void} searchHandler Fall sem keyrt er þegar leitað er.
 * @param {string | undefined} query Leitarorð, ef eitthvað, til að sýna niðurstöður fyrir.
 */
export async function renderFrontpage(parentElement, searchHandler, query = undefined) {
  const searchForm = renderSearchForm(searchHandler, query);
  parentElement.appendChild(searchForm);

  if (query) {
    searchAndRender(parentElement, searchForm, query);
    return;
  }

  const newProductsContainer = el('div', { class: 'new-products', id: 'newProds' },
    el('h2', { }, 'Nýjar vörur')
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
 * @param {HTMLElement} parentElement Element sem á að innihalda vöru.
 * @param {string} id Auðkenni vöru.
 */
/* export async function renderProduct(parentElement, id) {
  const container = el('main', {});
  const backElement = el(
    'div',
    { class: 'back' },
    el('a', { href: '/' }, 'Til baka'),
  );

  parentElement.appendChild(container);

  setLoading(container);
  const result = await getLaunch(id);
  setNotLoading(container);

  // Tómt og villu state, við gerum ekki greinarmun á þessu tvennu, ef við
  // myndum vilja gera það þyrftum við að skilgreina stöðu fyrir niðurstöðu
  if (!result) {
    container.appendChild(el('p', {}, 'Villa við að sækja gögn um geimskot!'));
    container.appendChild(backElement);
    return;
  }

  const missionElement = result.mission
    ? el(
        'div',
        { class: 'mission' },
        el('h2', {}, `Geimferð: ${result.mission?.name ?? '*Engin lýsing*'}`),
        el('p', {}, result.mission?.description ?? '*Engin lýsing*'),
      )
    : el('p', {}, 'Engar upplýsingar um geimferð.');

  const launchElement = el(
    'article',
    { class: 'launch' },
    el(
      'section',
      { class: 'info' },
      el('h1', {}, result.name),
      el(
        'div',
        { class: 'window' },
        el('p', {}, `Gluggi opnast: ${result.window_start}`),
        el('p', {}, `Gluggi lokast: ${result.window_end}`),
      ),
      el(
        'div',
        { class: 'status' },
        el('h2', {}, `Staða: ${result.status.name}`),
        el('p', {}, result.status.description),
      ),
      missionElement,
    ),
    el('div', { class: 'image' }, el('img', { src: result.image, alt: '' })),
    backElement,
  );

  container.appendChild(launchElement);
} */