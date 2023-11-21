import { getProduct, getProducts, searchProducts } from './api.js';
import { el } from './elements.js';

/**
 * Býr til leitarform.
 * @param {(e: SubmitEvent) => void} searchHandler Fall sem keyrt er þegar leitað er.
 * @param {string | undefined} query Leitarstrengur.
 * @returns {HTMLElement} Leitarform.
 */
export function renderSearchForm(searchHandler, query = undefined) {
  /*const search = el('input', {
    type: 'search',
    placeholder: 'Leitarorð',
    value: query ?? '',
  });
  const button = el('button', {}, 'Leita');

  const container = el('form', { class: 'search' }, search, button);
  container.addEventListener('submit', searchHandler);
  return container;*/
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
 * @param {string} query Leitarstrengur.
 */
function createSearchResults(results, query) {
  if (!results) {
    const error = el('p', { class: 'result' }, 'Villa við að sækja gögn.');
    return error;
  }

  if (results.length === 0) {
    const notFound = el('p', { class: 'result' }, 'Ekkert fannst.');
    return notFound;
  }

  const container = el('div', { class: 'product-grid' });

  for (const result of results) {
    const product = el('div', { class: 'grid-product' },
      el('img', { class: 'prod-img', src: result.image }),
      el('div', { class: 'prod-info' },
        el('div', {},
          el('p', { class: 'prod-name' }, result.title),
          el('p', { class: 'prod-category' }, result.category.title)
        ),
        el('p', { class: 'prod-price' }, result.price)
      )
    );
    container.appendChild(product);
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
  const mainElement = parentElement.querySelector('main');

  if (!mainElement) {
    console.warn('fann ekki <main> element');
    return;
  }

  // Fjarlægja fyrri niðurstöður
  const resultsElement = mainElement.querySelector('.results');
  if (resultsElement) {
    resultsElement.remove();
  }

  setLoading(mainElement, searchForm);
  const results = await searchProducts(query);
  setNotLoading(mainElement, searchForm);

  const resultsEl = createSearchResults(results, query);

  mainElement.appendChild(resultsEl);
}

/**
 * Sýna forsíðu, hugsanlega með leitarniðurstöðum.
 * @param {HTMLElement} parentElement Element sem á að innihalda forsíðu.
 * @param {(e: SubmitEvent) => void} searchHandler Fall sem keyrt er þegar leitað er.
 * @param {string | undefined} query Leitarorð, ef eitthvað, til að sýna niðurstöður fyrir.
 */
export function renderFrontpage(
  parentElement,
  searchHandler,
  query = undefined,
) {
  const heading = el('h1', {}, 'Geimskotaleitin 🚀');
  const searchForm = renderSearchForm(searchHandler, query);
  const container = el('main', {}, heading, searchForm);
  parentElement.appendChild(container);

  if (!query) {
    return;
  }

  searchAndRender(parentElement, searchForm, query);
}

/**
 * Sýna vöru.
 * @param {HTMLElement} parentElement Element sem á að innihalda vöru.
 * @param {string} id Auðkenni vöru.
 */
export async function renderProduct(parentElement, id) {
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
}