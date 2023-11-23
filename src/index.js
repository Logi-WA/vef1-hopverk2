import { empty } from './lib/elements.js';
import { renderFrontpage, renderProduct, searchAndRender } from './lib/ui.js';

/**
 * Fall sem keyrir við leit.
 * @param {SubmitEvent} e
 * @returns {Promise<void>}
 */
async function onSearch(e) {
  e.preventDefault();

  if (!e.target || !(e.target instanceof Element)) {
    return;
  }

  const { value } = e.target.querySelector('input') ?? {};

  if (!value) {
    return;
  }

  const mainElement = document.body.querySelector('.page-content');

  if (!mainElement) {
    console.error('main element not found');
    return;
  }

  await searchAndRender(mainElement, e.target, value);
  window.history.pushState({}, '', `/?query=${value}`);
}

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 */
function route() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('query');
  const id = params.get('id');

  const mainElement = document.body.querySelector('.page-content');

  if (!mainElement) {
    console.error('main element not found');
    return;
  }

  if (id) {
    renderProduct(mainElement, id);
  } else {
    renderFrontpage(mainElement, onSearch, query ?? undefined);
  }
}

// Bregst við því þegar við notum vafra til að fara til baka eða áfram.
window.onpopstate = () => {
  const mainElement = document.body.querySelector('.page-content');
  empty(mainElement);
  route();
};

// Athugum í byrjun hvað eigi að birta.
route();
